{
    "boxes": [
        {
            "box": {
                "maxclass": "comment",
                "text": "Serge Wavefolder",
                "patching_rect": [ 30.0, 15.0, 200.0, 24.0 ],
                "fontsize": 14.0,
                "fontface": 1,
                "numinlets": 1,
                "numoutlets": 0,
                "id": "obj-1"
            }
        },
        {
            "box": {
                "maxclass": "bpatcher",
                "viewvisibility": 1,
                "offset": [ 0.0, 0.0 ],
                "lockeddragscroll": 0,
                "clickthrough": 0,
                "enablehscroll": 0,
                "enablevscroll": 0,
                "lockedsize": 0,
                "bgmode": 0,
                "border": 0,
                "patching_rect": [ 30.0, 50.0, 225.0, 95.0 ],
                "numinlets": 0,
                "numoutlets": 1,
                "outlettype": [ "signal" ],
                "name": "demosound.maxpat",
                "args": [ "@module", 3, "@vol", -99 ],
                "id": "obj-2"
            }
        },
        {
            "box": {
                "maxclass": "meter~",
                "patching_rect": [ 30.0, 155.0, 225.0, 17.0 ],
                "numinlets": 1,
                "numoutlets": 1,
                "outlettype": [ "float" ],
                "id": "obj-3"
            }
        },
        {
            "box": {
                "maxclass": "spectroscope~",
                "patching_rect": [ 270.0, 50.0, 300.0, 100.0 ],
                "numinlets": 2,
                "numoutlets": 1,
                "outlettype": [ "" ],
                "id": "obj-4"
            }
        },
        {
            "box": {
                "maxclass": "comment",
                "text": "Drive (V)",
                "patching_rect": [ 30.0, 185.0, 65.0, 20.0 ],
                "numinlets": 1,
                "numoutlets": 0,
                "id": "obj-5"
            }
        },
        {
            "box": {
                "maxclass": "flonum",
                "patching_rect": [ 30.0, 207.0, 55.0, 22.0 ],
                "parameter_enable": 0,
                "numinlets": 1,
                "numoutlets": 2,
                "format": 6,
                "minimum": 0.1,
                "outlettype": [ "", "bang" ],
                "maximum": 10.0,
                "id": "obj-6"
            }
        },
        {
            "box": {
                "maxclass": "comment",
                "text": "Stages (1-5)",
                "patching_rect": [ 110.0, 185.0, 80.0, 20.0 ],
                "numinlets": 1,
                "numoutlets": 0,
                "id": "obj-7"
            }
        },
        {
            "box": {
                "maxclass": "number",
                "patching_rect": [ 110.0, 207.0, 50.0, 22.0 ],
                "parameter_enable": 0,
                "numinlets": 1,
                "numoutlets": 2,
                "minimum": 1,
                "outlettype": [ "", "bang" ],
                "maximum": 5,
                "id": "obj-8"
            }
        },
        {
            "box": {
                "maxclass": "newobj",
                "text": "gen~",
                "patching_rect": [ 30.0, 245.0, 283.0, 22.0 ],
                "numinlets": 3,
                "numoutlets": 1,
                "outlettype": [ "signal" ],
                "id": "obj-9",
                "patcher": {
                    "fileversion": 1,
                    "appversion": {
                        "major": 9,
                        "minor": 1,
                        "revision": 3,
                        "architecture": "x64",
                        "modernui": 1
                    },
                    "classnamespace": "dsp.gen",
                    "rect": [ 58.0, 106.0, 900.0, 700.0 ],
                    "boxes": [
                        {
                            "box": {
                                "maxclass": "newobj",
                                "text": "in 1 input",
                                "patching_rect": [ 41.0, 14.0, 57.0, 22.0 ],
                                "numinlets": 0,
                                "numoutlets": 1,
                                "outlettype": [ "" ],
                                "id": "obj-1"
                            }
                        },
                        {
                            "box": {
                                "maxclass": "newobj",
                                "text": "in 2 drive",
                                "patching_rect": [ 449.0, 14.0, 57.0, 22.0 ],
                                "numinlets": 0,
                                "numoutlets": 1,
                                "outlettype": [ "" ],
                                "id": "obj-2"
                            }
                        },
                        {
                            "box": {
                                "maxclass": "newobj",
                                "text": "in 3 stages",
                                "patching_rect": [ 858.0, 14.0, 65.0, 22.0 ],
                                "numinlets": 0,
                                "numoutlets": 1,
                                "outlettype": [ "" ],
                                "id": "obj-5"
                            }
                        },
                        {
                            "box": {
                                "maxclass": "codebox",
                                "patching_rect": [ 41.0, 59.0, 836.0, 580.0 ],
                                "fontsize": 12.0,
                                "numinlets": 3,
                                "fontname": "<Monospaced>",
                                "numoutlets": 1,
                                "fontface": 0,
                                "outlettype": [ "" ],
                                "id": "obj-3",
                                "code": "// Serge Wavefolder (multi-stage)\r\n// Based on Esqueda, Pontynen, Parker & Bilbao (2017)\r\n// Ported from MATLAB to GenExpr\r\n\r\nHistory drive_smooth(1);\r\n\r\n// Component values (1N914 diode)\r\nR  = 33000;\r\nIs = 2.52e-9;\r\nNd = 1.752;\r\nVT = 0.026;\r\n\r\n// Smooth drive to avoid zipper noise\r\ndrive_smooth = mix(in2, drive_smooth, 0.999);\r\nsig = in1 * drive_smooth * 5;\r\nnstages = clip(in3, 1, 5);\r\n\r\nfor (s = 1; s <= 5; s += 1) {\r\n    if (s <= nstages) {\r\n        Vin = sig;\r\n        lam = sign(Vin);\r\n        arg = max((R * Is / (Nd * VT)) * exp((lam * (Vin + lam * R * Is)) / (Nd * VT)), 0);\r\n\r\n        // Lambert W initial guess (Pade approximants)\r\n        w = 0;\r\n        if (arg < 0.14546954290661823) {\r\n            num = 1 + 5.931375839364438*arg + 11.39220550532913*arg*arg + 7.33888339911111*arg*arg*arg + 0.653449016991959*arg*arg*arg*arg;\r\n            den = 1 + 6.931373689597704*arg + 16.82349461388016*arg*arg + 16.43072324143226*arg*arg*arg + 5.115235195211697*arg*arg*arg*arg;\r\n            w = arg * num / den;\r\n        } else if (arg < 8.706658967856612) {\r\n            num = 1 + 2.4450530707265568*arg + 1.3436642259582265*arg*arg + 0.14844005539759195*arg*arg*arg + 0.0008047501729130*arg*arg*arg*arg;\r\n            den = 1 + 3.4447089864860025*arg + 3.2924898573719523*arg*arg + 0.9164600188031222*arg*arg*arg + 0.05306864044833221*arg*arg*arg*arg;\r\n            w = arg * num / den;\r\n        } else {\r\n            la = log(arg);\r\n            lb = log(la);\r\n            ia = 1/la;\r\n            w = la - lb + (lb*ia) * 0.5*lb*(lb-2)*(ia*ia) + (1.0/6.0)*(2*lb*lb - 9*lb + 6)*(ia*ia*ia);\r\n        }\r\n\r\n        // Fritsch refinement\r\n        for (m = 1; m <= 4; m += 1) {\r\n            w1 = w + 1;\r\n            zz = log(arg) - log(max(w, 1e-20)) - w;\r\n            qq = 2 * w1 * (w1 + (2.0/3.0) * zz);\r\n            err = (zz / w1) * ((qq - zz) / (qq - 2*zz));\r\n            w = w * (1 + err);\r\n        }\r\n\r\n        sig = Vin + 2 * (lam*R*Is - lam*Nd*VT*w);\r\n    }\r\n}\r\n\r\nout1 = sig;"
                            }
                        },
                        {
                            "box": {
                                "maxclass": "newobj",
                                "text": "out 1",
                                "patching_rect": [ 41.0, 660.0, 35.0, 22.0 ],
                                "numinlets": 1,
                                "numoutlets": 0,
                                "id": "obj-4"
                            }
                        }
                    ],
                    "lines": [
                        {
                            "patchline": {
                                "source": [ "obj-1", 0 ],
                                "destination": [ "obj-3", 0 ]
                            }
                        },
                        {
                            "patchline": {
                                "source": [ "obj-2", 0 ],
                                "destination": [ "obj-3", 1 ]
                            }
                        },
                        {
                            "patchline": {
                                "source": [ "obj-5", 0 ],
                                "destination": [ "obj-3", 2 ]
                            }
                        },
                        {
                            "patchline": {
                                "source": [ "obj-3", 0 ],
                                "destination": [ "obj-4", 0 ]
                            }
                        }
                    ]
                }
            }
        },
        {
            "box": {
                "maxclass": "scope~",
                "patching_rect": [ 185.0, 290.0, 130.0, 130.0 ],
                "bufsize": 256,
                "numinlets": 2,
                "numoutlets": 0,
                "calccount": 2,
                "id": "obj-10"
            }
        },
        {
            "box": {
                "maxclass": "spectroscope~",
                "patching_rect": [ 330.0, 290.0, 300.0, 100.0 ],
                "numinlets": 2,
                "numoutlets": 1,
                "outlettype": [ "" ],
                "id": "obj-11"
            }
        },
        {
            "box": {
                "maxclass": "live.gain~",
                "varname": "live.gain~",
                "patching_rect": [ 30.0, 290.0, 48.0, 136.0 ],
                "parameter_enable": 1,
                "numinlets": 2,
                "numoutlets": 5,
                "outlettype": [ "signal", "signal", "", "float", "list" ],
                "lastchannelcount": 0,
                "id": "obj-12",
                "saved_attribute_attributes": {
                    "valueof": {
                        "parameter_initial": [ -22 ],
                        "parameter_initial_enable": 1,
                        "parameter_longname": "live.gain~",
                        "parameter_mmax": 6.0,
                        "parameter_mmin": -70.0,
                        "parameter_modmode": 0,
                        "parameter_shortname": "live.gain~",
                        "parameter_type": 0,
                        "parameter_unitstyle": 4
                    }
                }
            }
        },
        {
            "box": {
                "maxclass": "ezdac~",
                "patching_rect": [ 30.0, 445.0, 45.0, 45.0 ],
                "numinlets": 2,
                "numoutlets": 0,
                "id": "obj-13"
            }
        },
        {
            "box": {
                "maxclass": "comment",
                "text": "GenExpr Serge wavefolder\n(Esqueda, Pontynen,\nParker & Bilbao 2017)\nwith Lambert W / Fritsch",
                "linecount": 4,
                "patching_rect": [ 270.0, 160.0, 160.0, 60.0 ],
                "numinlets": 1,
                "numoutlets": 0,
                "id": "obj-14"
            }
        },
        {
            "box": {
                "maxclass": "message",
                "text": "reload",
                "patching_rect": [ 190.0, 207.0, 42.0, 22.0 ],
                "numinlets": 2,
                "numoutlets": 1,
                "outlettype": [ "" ],
                "id": "obj-15"
            }
        },
        {
            "box": {
                "maxclass": "newobj",
                "text": "loadbang",
                "patching_rect": [ 580.0, 130.0, 58.0, 22.0 ],
                "numinlets": 1,
                "numoutlets": 1,
                "outlettype": [ "bang" ],
                "hidden": 1,
                "id": "obj-16"
            }
        },
        {
            "box": {
                "maxclass": "message",
                "text": "1.",
                "patching_rect": [ 535.0, 160.0, 29.5, 22.0 ],
                "numinlets": 2,
                "numoutlets": 1,
                "outlettype": [ "" ],
                "hidden": 1,
                "id": "obj-17"
            }
        },
        {
            "box": {
                "maxclass": "message",
                "text": "3",
                "patching_rect": [ 590.0, 160.0, 29.5, 22.0 ],
                "numinlets": 2,
                "numoutlets": 1,
                "outlettype": [ "" ],
                "hidden": 1,
                "id": "obj-18"
            }
        }
    ],
    "lines": [
        {
            "patchline": {
                "source": [ "obj-16", 0 ],
                "destination": [ "obj-17", 0 ],
                "hidden": 1,
                "order": 0
            }
        },
        {
            "patchline": {
                "source": [ "obj-16", 0 ],
                "destination": [ "obj-18", 0 ],
                "hidden": 1,
                "order": 1
            }
        },
        {
            "patchline": {
                "source": [ "obj-17", 0 ],
                "destination": [ "obj-6", 0 ],
                "hidden": 1
            }
        },
        {
            "patchline": {
                "source": [ "obj-18", 0 ],
                "destination": [ "obj-8", 0 ],
                "hidden": 1
            }
        },
        {
            "patchline": {
                "source": [ "obj-2", 0 ],
                "destination": [ "obj-4", 0 ],
                "order": 0
            }
        },
        {
            "patchline": {
                "source": [ "obj-2", 0 ],
                "destination": [ "obj-3", 0 ],
                "order": 1
            }
        },
        {
            "patchline": {
                "source": [ "obj-2", 0 ],
                "destination": [ "obj-9", 0 ],
                "order": 2
            }
        },
        {
            "patchline": {
                "source": [ "obj-6", 0 ],
                "destination": [ "obj-9", 1 ]
            }
        },
        {
            "patchline": {
                "source": [ "obj-8", 0 ],
                "destination": [ "obj-9", 2 ]
            }
        },
        {
            "patchline": {
                "source": [ "obj-15", 0 ],
                "destination": [ "obj-9", 0 ]
            }
        },
        {
            "patchline": {
                "source": [ "obj-9", 0 ],
                "destination": [ "obj-11", 0 ],
                "order": 0
            }
        },
        {
            "patchline": {
                "source": [ "obj-9", 0 ],
                "destination": [ "obj-10", 0 ],
                "order": 1
            }
        },
        {
            "patchline": {
                "source": [ "obj-9", 0 ],
                "destination": [ "obj-12", 1 ],
                "order": 2
            }
        },
        {
            "patchline": {
                "source": [ "obj-9", 0 ],
                "destination": [ "obj-12", 0 ],
                "order": 3
            }
        },
        {
            "patchline": {
                "source": [ "obj-12", 0 ],
                "destination": [ "obj-13", 0 ]
            }
        },
        {
            "patchline": {
                "source": [ "obj-12", 1 ],
                "destination": [ "obj-13", 1 ]
            }
        }
    ],
    "appversion": {
        "major": 9,
        "minor": 1,
        "revision": 3,
        "architecture": "x64",
        "modernui": 1
    },
    "classnamespace": "box"
}
