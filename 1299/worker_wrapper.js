try {
    importScripts("js/event.js");
} catch (e) {
    console.log(e);

}

// new code starts here

(() => {
    "use strict";

    function e(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
        return n
    }

    function t(t, r) {
        return function(e) {
            if (Array.isArray(e)) return e
        }(t) || function(e, t) {
            var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (null != r) {
                var n, o, a, s, i = [],
                    c = !0,
                    u = !1;
                try {
                    if (a = (r = r.call(e)).next, 0 === t) {
                        if (Object(r) !== r) return;
                        c = !1
                    } else
                        for (; !(c = (n = a.call(r)).done) && (i.push(n.value), i.length !== t); c = !0);
                } catch (e) {
                    u = !0, o = e
                } finally {
                    try {
                        if (!c && null != r.return && (s = r.return(), Object(s) !== s)) return
                    } finally {
                        if (u) throw o
                    }
                }
                return i
            }
        }(t, r) || function(t, r) {
            if (t) {
                if ("string" == typeof t) return e(t, r);
                var n = Object.prototype.toString.call(t).slice(8, -1);
                return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? e(t, r) : void 0
            }
        }(t, r) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function r(e) {
        return r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }, r(e)
    }

    function n(e) {
        var t = function(e, t) {
            if ("object" != r(e) || !e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 !== n) {
                var o = n.call(e, "string");
                if ("object" != r(o)) return o;
                throw new TypeError("@@toPrimitive must return a primitive value.")
            }
            return String(e)
        }(e);
        return "symbol" == r(t) ? t : String(t)
    }

    function o(e, t) {
        for (var r = 0; r < t.length; r++) {
            var o = t[r];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, n(o.key), o)
        }
    }
    var a = function() {
        function e() {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e)
        }
        var t, r;
        return t = e, r = [{
            key: "getStorage",
            value: function(e) {
                return e ? new Promise((function(t, r) {
                    chrome.storage.sync.get([e], (function(n) {
                        if (chrome.runtime.lastError) return r(chrome.runtime.lastError);
                        t(n[e])
                    }))
                })) : null
            }
        }, {
            key: "getAllStorage",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
                return e.length ? new Promise((function(t, r) {
                    chrome.storage.sync.get(e, (function(e) {
                        if (chrome.runtime.lastError) return r(chrome.runtime.lastError);
                        t(e)
                    }))
                })) : Promise.resolve({})
            }
        }, {
            key: "setStorage",
            value: function(e, t) {
                return new Promise((function(r, n) {
                    var o = {};
                    o[e] = t, chrome.storage.sync.set(o, (function() {
                        if (chrome.runtime.lastError) return n(chrome.runtime.lastError);
                        r(t)
                    }))
                }))
            }
        }, {
            key: "setAllStorage",
            value: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                return new Promise((function(t, r) {
                    chrome.storage.sync.set(e, (function() {
                        if (chrome.runtime.lastError) return r(chrome.runtime.lastError);
                        t(!0)
                    }))
                }))
            }
        }], null && o(t.prototype, null), r && o(t, r), Object.defineProperty(t, "prototype", {
            writable: !1
        }), e
    }();
    const s = "screen_short_visible",
        i = "screen_short_all",
        c = "screen_short_area",
        u = "start_all_screen",
        l = "current_screen_data_contents",
        d = "screen_data_for_editor",
        f = "screen_area_start",
        m = "show_screen_area",
        h = "screen_short_end",
        b = "screen_download",
        y = "upload_editor",
        p = "area_copy",
        g = "screen_end",
        v = "hidden_scroll",
        w = "show_scroll",
        _ = "download_blob",
        S = "get_record_state";
    let P = (e = 21) => crypto.getRandomValues(new Uint8Array(e)).reduce(((e, t) => e + ((t &= 63) < 36 ? t.toString(36) : t < 62 ? (t - 26).toString(36).toUpperCase() : t > 62 ? "-" : "_")), "");
    var M, A = {};

    function k(e, t, r, n) {
        chrome.tabs.captureVisibleTab(t[0].windowId, {
            format: "png"
        }).then((function(o) {
            return A[r].screen.push({
                base64: o,
                data: e.data
            }), e && "final" !== e.status ? chrome.tabs.sendMessage(t[0].id, {
                type: l,
                isfirst: n
            }) : Promise.resolve("end")
        })).then((function(e) {
            "end" !== e ? (A[r].pageHeight = e.screenHeight, delete e.screenHeight, setTimeout((function() {
                k(e, t, r, 0)
            }), 500)) : chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }).then((function(e) {
                chrome.tabs.sendMessage(e[0].id, {
                    type: h
                }), chrome.tabs.sendMessage(e[0].id, {
                    type: w
                })
            })).then((function() {
				var fkdkkfd = r + "&buttonId=fullpagenewyy";
                chrome.tabs.create({
			 // url: "editor/editor.html?nanoId=" + r

                   url: "editor/editor.html?nanoId=" + fkdkkfd
				   
				//url : "editor/editor.html?nanoId=" + r + "&buttonId=visiblenewyy";

                })
            }))
        }))
    }

    function I(e, r, n) {
        "start" === e.status && (M = P(), A[M] = {
            type: "area"
        }, A[M].screen = [], A[M].pageHeight = e.pageHeight, A[M].pageWidth = e.pageWidth), chrome.tabs.query({
            active: !0,
            currentWindow: !0
        }).then((function(e) {
            return Promise.all([chrome.tabs.captureVisibleTab(e[0].windowId, {
                format: "png"
            }), Promise.resolve(e)])
        })).then((function(r) {
            var n = t(r, 2),
                o = n[0],
                a = n[1];
            return A[M].screen.push({
                base64: o,
                data: e.data
            }), "final" !== e.status && e.scroll ? chrome.tabs.sendMessage(a[0].id, {
                type: l,
                isfirst: "start" === e.status
            }) : Promise.resolve("end")
        })).then((function(e) {
            "end" !== e ? setTimeout((function() {
                I(e, "save")
            }), 500) : "save" === r ? chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }).then((function(e) {
                return chrome.tabs.sendMessage(e[0].id, {
                    type: w
                }), chrome.tabs.sendMessage(e[0].id, {
                    type: g
                })
            })).then((function() {
				var fkdkkfd = M + "&buttonId=selectnewyy";

                chrome.tabs.create({
                // url: "editor/editor.html?nanoId=" + M
				 url: "editor/editor.html?nanoId=" + fkdkkfd
				// url : "editor/editor.html?nanoId=" + M + "&buttonId=selectnewyy";
  
                })
            })) : "copy" === r && chrome.tabs.sendMessage(n.tab.id, {
                type: p,
                data: A[M]
            })
        }))
    }

    function T(e, t) {
        chrome.downloads.download({
            url: e,
            filename: "SCRSHT_".concat(Date.now(), ".").concat(t)
        })
    }
    chrome.runtime.onMessage.addListener((function(e, r, n) {
        switch (e.type) {
            case s:
                chrome.tabs.query({
                    active: !0,
                    currentWindow: !0
                }).then((function(e) {
                    return chrome.tabs.sendMessage(e[0].id, {
                        type: v
                    }).then((function(t) {
                        return new Promise((function(t, r) {
                            setTimeout((function() {
                                t(e)
                            }), 300)
                        }))
                    }))
                })).then((function(e) {
                    return chrome.tabs.captureVisibleTab(e[0].windowId, {
                        format: "png"
                    }).then((function(t) {
                        return setTimeout((function() {
                            chrome.tabs.sendMessage(e[0].id, {
                                type: w
                            })
                        }), 300), Promise.resolve(t)
                    }))
                })).then((function(e) {
                    return M = P(), A[M] = {
                        type: "visible"
                    }, A[M].screen = [{
                        base64: e,
                        data: {
                            top: 0
                        }
                    }], Promise.resolve("end")
                })).then((function(e) {
					var fkdkkfd = M + "&buttonId=visiblenewyy";

                    chrome.tabs.create({
						
						 url: "editor/editor.html?nanoId=" + fkdkkfd
                    //   url: "editor/editor.html?nanoId=" + M
					 // url : "editor/editor.html?nanoId=" + M + "&buttonId=selectnewyy7777"; 
                    })
                })), n();
                break;
            case i:
                chrome.tabs.query({
                    active: !0,
                    currentWindow: !0
                }).then((function(e) {
                    return Promise.all([chrome.tabs.sendMessage(e[0].id, {
                        type: u
                    }), Promise.resolve(e), chrome.tabs.sendMessage(e[0].id, {
                        type: v
                    })])
                })).then((function(e) {
                    var r = t(e, 2),
                        n = r[0],
                        o = r[1];
                    "start" === n.status && (M = P(), A[M] = {
                        type: "all"
                    }, A[M].screen = [], A[M].pageWidth = n.pageWidth, A[M].pageHeight = n.pageHeight, setTimeout((function() {
                        k(n, o, M, 1)
                    }), 500))
                })), n();
                break;
            // case c:
			// console.log('5555555');
                // chrome.tabs.query({
                    // active: !0,
                    // currentWindow: !0
                // }).then((function(e) {
                    // chrome.tabs.sendMessage(e[0].id, {

                        // type: m
                    // }), chrome.tabs.sendMessage(e[0].id, {
                        // type: v
                    // })
                // })), n();
                // break;
				
			case c:
    console.log('Case "c" entered');  // Log when this case is reached
    console.log('Attempting to query current tab...');
    
    chrome.tabs.query({
        active: !0,
        currentWindow: !0
    }).then((function(e) {
        console.log('Tab query successful, found tabs:', e);  // Log the tabs found
        
        if (!e || e.length === 0) {
            console.error('No active tab found in current window');
            return;
        }

        const currentTab = e[0];
        console.log('Attempting to send messages to tab ID:', currentTab.id);
        
        try {
            console.log('Sending message with type:', m);
            chrome.tabs.sendMessage(currentTab.id, {
                type: m
            }, function(response) {
                if (chrome.runtime.lastError) {
                    console.error('Error sending message type m:', chrome.runtime.lastError.message);
                } else {
                    console.log('Message type m sent successfully, response:', response);
                }
            });

            console.log('Sending message with type:', v);
            chrome.tabs.sendMessage(currentTab.id, {
                type: v
            }, function(response) {
                if (chrome.runtime.lastError) {
                    console.error('Error sending message type v:', chrome.runtime.lastError.message);
                } else {
                    console.log('Message type v sent successfully, response:', response);
                }
            });
        } catch (err) {
            console.error('Exception while sending messages:', err);
        }
    })).catch(err => {
        console.error('Tab query failed:', err);
    });
    
    try {
        n();
        console.log('Function n() executed successfully');
    } catch (err) {
        console.error('Error executing function n():', err);
    }
    break;	
				
				
				
            case d:
                n(A[e.nanoId]);
                break;
            case f:
                I(e.data, e.model, r);
                break;
            case b:
                T(e.data, e.suffix);
                break;
            case y:
                o = e.data, a = e.id, A[a] = o, n(e.id);
                break;
            case _:
                T(e.url, e.suffix);
                break;
            case S:
                n("stop")
        }
        var o, a
    })), chrome.runtime.onInstalled.addListener((function(e) {
        "install" === e.reason && a.setAllStorage({
            visibleArea: "A",
            wholePagenew: "B",
            selectAreanew: "C",
            saveImageType: "image/png",
            darkModel: !1,
            popupActive: "screen-shot"
        })
    }))
})();

// here is new code to trigger that screen recorder

 // ==================== GIF RECORDER USING chrome.desktopCapture (WORKS ON X.COM, WIX, EVERYWHERE) ====================

const OFFSCREEN_URL = "offscreen.html";
let isGifRecording = false;

async function ensureOffscreenDocument() {
    if (chrome.offscreen.hasDocument) {
        const hasDoc = await chrome.offscreen.hasDocument();
        if (hasDoc) {
            return;
        }
    }

    await chrome.offscreen.createDocument({
        url: OFFSCREEN_URL,
        reasons: ["USER_MEDIA"],
        justification: "Record the active tab as an animated GIF"
    });
}

async function requestTabStreamId() {
    return new Promise(resolve => {
        chrome.desktopCapture.chooseDesktopMedia(["tab"], streamId => {
            resolve(streamId || null);
        });
    });
}

async function beginGifRecording(area) {
    if (isGifRecording) {
        return;
    }

    await ensureOffscreenDocument();
    const streamId = await requestTabStreamId();

    if (!streamId) {
        return;
    }

    isGifRecording = true;
    chrome.runtime.sendMessage({
        type: "START_GIF_RECORDING",
        streamId,
        area
    });
}

function endGifRecording() {
    if (!isGifRecording) {
        return;
    }

    isGifRecording = false;
    chrome.runtime.sendMessage({
        type: "STOP_GIF_RECORDING"
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message && message.action === "startGifCapture") {
        beginGifRecording(message.area || { x: 0, y: 0, width: 800, height: 600 });
        return true;
    }

    if (message && message.action === "stopGifCapture") {
        endGifRecording();
        return false;
    }

    if (message && message.type === "GIF_FINISHED" && message.blobUrl) {
        isGifRecording = false;
        chrome.downloads.download({
            url: message.blobUrl,
            filename: `scrsht-${Date.now()}.gif`,
            saveAs: true
        });
        return false;
    }

    return false;
});
 
 
 