/* ============================================================
   FUZZBOX PHYSICS — Output Recorder
   Intercepts all audio going to speakers and records to WAV.
   Load this script in <head> BEFORE any page scripts.
   ============================================================ */
(function () {
  'use strict';

  let _ctx = null;
  let _recNode = null;
  let _recording = false;
  let _buffers = [[], []];
  let _sampleRate = 44100;
  const _destNodes = new Set();   // nodes connected to destination

  // ---- Intercept AudioContext creation ----
  const OrigAC = window.AudioContext || window.webkitAudioContext;
  if (!OrigAC) return;

  function WrappedAC() {
    const instance = new OrigAC();
    if (!_ctx) {
      _ctx = instance;
      _sampleRate = instance.sampleRate;
    }
    return instance;
  }
  WrappedAC.prototype = OrigAC.prototype;
  window.AudioContext = WrappedAC;
  if (window.webkitAudioContext) window.webkitAudioContext = WrappedAC;

  // ---- Intercept connect() to track nodes going to destination ----
  const origConnect = AudioNode.prototype.connect;
  const origDisconnect = AudioNode.prototype.disconnect;

  AudioNode.prototype.connect = function (dest) {
    var result = origConnect.apply(this, arguments);
    if (_ctx && dest === _ctx.destination) {
      _destNodes.add(this);
      // If already recording, also route to recorder
      if (_recNode && _recording) {
        try { origConnect.call(this, _recNode); } catch (e) { /* ignore */ }
      }
    }
    return result;
  };

  AudioNode.prototype.disconnect = function () {
    _destNodes.delete(this);
    return origDisconnect.apply(this, arguments);
  };

  // ---- Build the record button ----
  function injectUI() {
    var btn = document.createElement('button');
    btn.id = 'fuzzbox-rec-btn';
    btn.title = 'Record output to WAV';
    btn.innerHTML = '<span style="display:block;width:18px;height:18px;border-radius:50%;background:#cc3333;margin:auto"></span>';

    Object.assign(btn.style, {
      position: 'fixed', bottom: '24px', right: '24px', zIndex: '99999',
      width: '48px', height: '48px', borderRadius: '50%',
      background: '#1a1a1a', border: '2px solid #333', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.5)', transition: 'box-shadow 0.2s',
      padding: '0'
    });

    var timer = document.createElement('span');
    timer.id = 'fuzzbox-rec-timer';
    Object.assign(timer.style, {
      position: 'fixed', bottom: '76px', right: '16px', zIndex: '99999',
      fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px',
      color: '#cc3333', display: 'none', background: '#0a0a0a',
      padding: '2px 8px', borderRadius: '4px', border: '1px solid #333'
    });

    document.body.appendChild(btn);
    document.body.appendChild(timer);

    var timerInterval = null;
    var startTime = 0;

    btn.addEventListener('click', function () {
      if (!_ctx) { alert('No audio context — play some audio first.'); return; }
      if (_ctx.state === 'suspended') _ctx.resume();

      if (!_recording) {
        startRecording();
        btn.style.boxShadow = '0 0 16px rgba(204,51,51,0.8)';
        btn.querySelector('span').style.animation = 'fuzzbox-rec-pulse 1s ease-in-out infinite';
        timer.style.display = 'block';
        startTime = Date.now();
        timerInterval = setInterval(function () {
          var s = Math.floor((Date.now() - startTime) / 1000);
          var m = Math.floor(s / 60);
          timer.textContent = String(m).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
        }, 250);
      } else {
        stopRecording();
        btn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.5)';
        btn.querySelector('span').style.animation = 'none';
        timer.style.display = 'none';
        clearInterval(timerInterval);
      }
    });

    var style = document.createElement('style');
    style.textContent = '@keyframes fuzzbox-rec-pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }';
    document.head.appendChild(style);
  }

  // ---- Recording logic ----
  function startRecording() {
    _buffers = [[], []];
    _recording = true;

    _recNode = _ctx.createScriptProcessor(4096, 2, 2);
    _recNode.onaudioprocess = function (e) {
      if (!_recording) return;
      _buffers[0].push(new Float32Array(e.inputBuffer.getChannelData(0)));
      _buffers[1].push(new Float32Array(e.inputBuffer.getChannelData(1)));
    };
    // ScriptProcessorNode must be connected to destination to fire
    origConnect.call(_recNode, _ctx.destination);

    // Connect all nodes currently routed to destination into the recorder too
    _destNodes.forEach(function (node) {
      try { origConnect.call(node, _recNode); } catch (e) { /* ignore */ }
    });
  }

  function stopRecording() {
    _recording = false;
    if (!_recNode) return;

    // Disconnect recorder node from everything
    try { origDisconnect.call(_recNode); } catch (e) { /* ok */ }

    // Merge buffers
    var length = _buffers[0].reduce(function (n, b) { return n + b.length; }, 0);
    if (length === 0) return;

    var merged = [new Float32Array(length), new Float32Array(length)];
    for (var ch = 0; ch < 2; ch++) {
      var offset = 0;
      for (var i = 0; i < _buffers[ch].length; i++) {
        merged[ch].set(_buffers[ch][i], offset);
        offset += _buffers[ch][i].length;
      }
    }

    var wav = encodeWAV(merged, _sampleRate);
    var blob = new Blob([wav], { type: 'audio/wav' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = makeFilename();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(url); }, 5000);

    _buffers = [[], []];
    _recNode = null;
  }

  // ---- WAV encoder (16-bit stereo PCM) ----
  function encodeWAV(channels, sampleRate) {
    var numChannels = channels.length;
    var length = channels[0].length;
    var bytesPerSample = 2;
    var blockAlign = numChannels * bytesPerSample;
    var dataSize = length * blockAlign;
    var buffer = new ArrayBuffer(44 + dataSize);
    var view = new DataView(buffer);

    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, 'data');
    view.setUint32(40, dataSize, true);

    var offset = 44;
    for (var i = 0; i < length; i++) {
      for (var ch = 0; ch < numChannels; ch++) {
        var s = channels[ch][i];
        s = Math.max(-1, Math.min(1, s));
        view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        offset += 2;
      }
    }
    return buffer;
  }

  function writeString(view, offset, str) {
    for (var i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  }

  // ---- Filename from page title + timestamp ----
  function makeFilename() {
    var title = document.title || 'recording';
    var name = title
      .replace(/FUZZBOX PHYSICS/i, '')
      .replace(/Fuzzbox Physics/i, '')
      .replace(/[—–\-|:]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9\-]/g, '')
      .toLowerCase() || 'recording';

    var now = new Date();
    var stamp = now.getFullYear()
      + '-' + String(now.getMonth() + 1).padStart(2, '0')
      + '-' + String(now.getDate()).padStart(2, '0')
      + '_' + String(now.getHours()).padStart(2, '0')
      + '-' + String(now.getMinutes()).padStart(2, '0')
      + '-' + String(now.getSeconds()).padStart(2, '0');

    return name + '_' + stamp + '.wav';
  }

  // ---- Init on DOM ready ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectUI);
  } else {
    injectUI();
  }
})();
