for (
  var n,
    aa =
      "function" == typeof Object.defineProperties
        ? Object.defineProperty
        : function (a, b, c) {
            a != Array.prototype && a != Object.prototype && (a[b] = c.value);
          },
    t = "undefined" != typeof window && window === this ? this : "undefined" != typeof global && null != global ? global : this,
    ba = ["Array", "prototype", "fill"],
    ca = 0;
  ca < ba.length - 1;
  ca++
) {
  var da = ba[ca];
  da in t || (t[da] = {});
  t = t[da];
}
var ea = ba[ba.length - 1],
  fa = t[ea],
  ha = fa
    ? fa
    : function (a, b, c) {
        var d = this.length || 0;
        0 > b && (b = Math.max(0, d + b));
        if (null == c || c > d) c = d;
        c = Number(c);
        0 > c && (c = Math.max(0, d + c));
        for (b = Number(b || 0); b < c; b++) this[b] = a;
        return this;
      };
ha != fa &&
  null != ha &&
  aa(t, ea, {
    configurable: !0,
    writable: !0,
    value: ha,
  });

function ia() {
  var a = [
      ["edge", /Edge\/([0-9\._]+)/],
      ["chrome", /Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
      ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/],
      ["opera", /Opera\/([0-9\.]+)(?:\s|$)/],
      ["ie", /Trident\/7\.0.*rv\:([0-9\.]+)\).*Gecko$/],
      ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
      ["ie", /MSIE\s(7\.0)/],
      ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/],
      ["android", /Android\s([0-9\.]+)/],
      ["ios", /iPad\;\sCPU\sOS\s([0-9\._]+)/],
      ["ios", /iPhone\;\sCPU\siPhone\sOS\s([0-9\._]+)/],
      ["safari", /Safari\/([0-9\._]+)/],
    ],
    b,
    c = [];
  for (b = 0; b < a.length; b++) {
    var d = b;
    var f = a[b];
    f = f.concat(f[1].exec(navigator.userAgent));
    a[d] = f;
    a[b][2] && c.push(a[b]);
  }
  for (b = (a = c[0]) && a[3].split(/[._]/).slice(0, 3); b && 3 > b.length; ) b.push("0");
  c = {};
  c.name = a && a[0];
  c.version = b && b.join(".");
  c.versionInt = parseInt(c.version, 10);
  return c;
}

 

function ja(a) {
  function b() {
    d ||
      (d = $("<div></div>")
        .css({
          position: "absolute",
          top: -9999,
          left: -9999,
          width: "auto",
          height: "auto",
          padding: 0,
          margin: 0,
          webkitTransform: c.css("webkitTransform"),
          webkitTransformOrigin: c.css("webkitTransformOrigin"),
          resize: "none",
        })
        .appendTo(document.getElementsByTagName("body")[0]));
    d.css({
      fontSize: c.css("fontSize"),
      fontFamily: c.css("fontFamily"),
      lineHeight: c.css("lineHeight"),
    });
    var b = a.value.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;").replace(/$/, "&nbsp;").replace(/\n/g, "&nbsp;<br/>").replace(/\s/g, "&nbsp;"),
      e = b.split("<br/>").length - 1;
    d.html(b);
    c.css({
      width: d.width() + f + "px",
    });
    c.attr("rows", e + 2);
  }
  var c = $(a),
    d = null,
    f = Number.parseInt(c.css("font-size"));
  c.css({
    overflow: "hidden",
    fontWeight: "800",
  });
  c.keyup(b).keydown(b).keypress(b).change(b).change();
}

function w(a, b) {
  this.x = this.y = 0;
  "undefined" !== typeof a && "undefined" !== typeof b && ((this.x = a), (this.y = b));
}
w.prototype.isEqual = function (a) {
  return this.x === a.x && this.y === a.y;
};

function A(a, b) {
  this.c = this.b = 0;
  "undefined" !== typeof a && "undefined" !== typeof b && ((this.c = a), (this.b = b));
}
A.prototype.isEqual = function (a) {
  return this.c === a.c && this.b === a.b;
};

function F(a, b) {
  this.x = this.c = this.y = this.b = 0;
  a && ("undefined" !== typeof a.T && "undefined" !== typeof a.V && "undefined" !== typeof a.U && "undefined" !== typeof a.W ? ((this.x = Math.min(a.T, a.U)), (this.c = Math.abs(a.U - a.T)), (this.y = Math.min(a.V, a.W)), (this.b = Math.abs(a.W - a.V))) : "undefined" !== typeof a.x && "undefined" !== typeof a.y && "undefined" !== typeof a.c && "undefined" !== typeof a.b ? ((this.x = a.x), (this.c = a.c), (this.y = a.y), (this.b = a.b)) : "undefined" !== typeof a.left && "undefined" !== typeof a.top && "undefined" !== typeof a.right && "undefined" !== typeof a.bottom ? ((this.x = a.left), (this.c = a.right - a.left), (this.y = a.top), (this.b = a.top - a.bottom)) : "undefined" !== typeof a.x && "undefined" !== typeof a.y && "undefined" !== typeof b.c && "undefined" !== typeof b.b && ((this.x = a.x), (this.c = b.c), (this.y = a.y), (this.b = b.b)));
}

function ka(a, b, c) {
  b = null == b ? 1 : b;
  c = null == c ? b : c;
  a.x -= b;
  a.y -= c;
  a.c += 2 * b;
  a.b += 2 * c;
}

function I(a, b) {
  return b.x >= a.x && b.x <= a.x + a.c && b.y >= a.y && b.y <= a.y + a.b;
}

function la(a, b) {
  return I(a, ma(b)) && I(a, J(b)) && I(a, L(b)) && I(a, M(b));
}

function na(a, b) {
  var c = a.x,
    d = a.y,
    f = b.x,
    k = b.y;
  var e = c + a.c;
  a = d + a.b;
  var g = f + b.c;
  b = k + b.b;
  c < f && (c = f);
  d < k && (d = k);
  e > g && (e = g);
  a > b && (a = b);
  e -= c;
  a -= d;
  return 0 < e && 0 < a
    ? new F({
        x: c,
        y: d,
        c: e,
        b: a,
      })
    : new F();
}
F.prototype.isEqual = function (a) {
  a = new F(a);
  return this.x === a.x && this.y === a.y && this.c === a.c && this.b === a.b;
};
F.prototype.A = function () {
  return 0 === this.c || 0 === this.b;
};

function ma(a) {
  return new w(a.x, a.y);
}

function J(a) {
  return new w(a.x + a.c, a.y);
}

function L(a) {
  return new w(a.x, a.y + a.b);
}

function M(a) {
  return new w(a.x + a.c, a.y + a.b);
}
F.prototype.size = function () {
  return new A(this.c, this.b);
};

function oa(a, b) {
  if (la(b, a)) {
    var c = b.b / 2,
      d = a.b / 2;
    a.x = b.x + b.c / 2 - a.c / 2;
    a.y = b.y + c - d;
  }
}
var N = {
  Ka: function (a, b) {
    return new F({
      x: Math.min(a.x, b.x),
      y: Math.min(a.y, b.y),
      c: Math.abs(a.x - b.x),
      b: Math.abs(a.y - b.y),
    });
  },
  K: function (a, b) {
    return new F({
      T: a.x - b,
      V: a.y - b,
      U: a.x + b,
      W: a.y + b,
    });
  },
  bb: function (a, b, c) {
    return a.x == b.x
      ? new F({
          T: Math.min(a.x, c.x),
          U: Math.max(a.x, c.x),
          V: Math.min(a.y, b.y),
          W: Math.max(a.y, b.y),
        })
      : new F({
          T: Math.min(a.x, b.x),
          U: Math.max(a.x, b.x),
          V: Math.min(a.y, c.y),
          W: Math.max(a.y, c.y),
        });
  },
};
var pa = {
    ma: function (a) {
      return a + Math.random();
    },
    sb: function (a) {
      for (var b = a.length, c, d; 0 !== b; ) (d = Math.floor(Math.random() * b)), --b, (c = a[b]), (a[b] = a[d]), (a[d] = c);
      return a;
    },
    rb: function (a, b) {
      return Math.floor(Math.random() * (b - a + 1) + a);
    },
  },
  qa = {
    Va: function (a) {
      var b = window.location.href;
      b = b.substring(b.indexOf("?") + 1);
      -1 != b.indexOf("#") && (b = b.split("#")[1]);
      b = b.split("&");
      for (var c = 0; c < b.length; c++) {
        var d = b[c].split("=");
        if (1 < d.length && d[0] == a) return d[1];
      }
      return null;
    },
  },
  O = {
    na: function (a) {
      a = /matrix\([^\)]+\)/.exec(window.getComputedStyle(a)["-webkit-transform"]);
      var b = {
        x: 1,
        y: 1,
      };
      a && ((a = a[0].replace("matrix(", "").replace(")", "").split(", ")), (b.x = parseFloat(a[0])), (b.y = parseFloat(a[3])));
      return b;
    },
    ra: function (a) {
      1 != window.devicePixelRatio && ((a.style.webkitTransform = "scale(" + 1 / window.devicePixelRatio + ")"), (a.style.webkitTransformOrigin = "0 0"));
    },
    Oa: function (a, b) {
      a.style.webkitTransform = b.style.webkitTransform;
      a.style.webkitTransformOrigin = b.style.webkitTransformOrigin;
    },
    La: function (a, b, c) {
      a.style.position = "absolute";
      a.style.left = b + "px";
      a.style.top = c + "px";
    },
  },
  P = {
    extend: function (a, b) {
      function c() {}
      c.prototype = b.prototype;
      a.prototype = new c();
      a.prototype.constructor = a;
      a.s = b.prototype;
    },
  },
  ra = {
    hb: function (a, b, c) {
      var d = pa.ma(a);
      a = {};
      a[d] = b;
      chrome.storage.local.set(a, function () {
        c && c(d);
      });
    },
    pb: function (a, b) {
      chrome.storage.local.get(a, function (c) {
        chrome.storage.local.remove(a, function () {
          b && b(c[a]);
        });
      });
    },
  },
  R = (function () {
    var a = [
      [-12, 0],
      [-12, -4],
      [0, 0],
      [-12, 4],
    ];
    return {
      cb: function (a, c, d, f, k, e, g) {
        var b = a.fillStyle,
          h = a.strokeStyle;
        a.beginPath();
        a.fillStyle = g;
        a.moveTo(c + e, d);
        a.lineTo(c + f - e, d);
        a.quadraticCurveTo(c + f, d, c + f, d + e);
        a.lineTo(c + f, d + k - e);
        a.quadraticCurveTo(c + f, d + k, c + f - e, d + k);
        a.lineTo(c + e, d + k);
        a.quadraticCurveTo(c, d + k, c, d + k - e);
        a.lineTo(c, d + e);
        a.quadraticCurveTo(c, d, c + e, d);
        a.fill();
        a.closePath();
        a.fillStyle = b;
        a.strokeStyle = h;
      },
      Qa: function (b, c, d, f, k, e, g) {
        b.strokeStyle = e;
        b.fillStyle = e;
        b.lineWidth = g;
        e = Math.atan2(k - d, f - c);
        var y = g / 2;
        g = [];
        for (var h in a) g.push([a[h][0] * y, a[h][1] * y]);
        if (0 == e) var v = g;
        else {
          h = [];
          for (v in g) {
            y = g[v][0];
            var E = g[v][1];
            h.push([y * Math.cos(e) - E * Math.sin(e), y * Math.sin(e) + E * Math.cos(e)]);
          }
          v = h;
        }
        e = [];
        for (var K in v) e.push([v[K][0] + f, v[K][1] + k]);
        b.beginPath();
        b.moveTo(e[0][0], e[0][1]);
        for (var l in e) 0 < l && b.lineTo(e[l][0], e[l][1]);
        b.lineTo(e[0][0], e[0][1]);
        b.fill();
        Math.sqrt(Math.pow(f - c, 2) + Math.pow(k - d, 2)) > Math.sqrt(Math.pow(e[0][0] - c, 2) + Math.pow(e[0][1] - d, 2)) && (b.beginPath(), b.moveTo(c, d), b.lineTo(e[0][0], e[0][1]), b.stroke());
      },
      sa: function (a, c, d, f, k) {
        var b = a.lineWidth / 2;
        c = new F({
          x: c,
          y: d,
          c: f,
          b: k,
        });
        ka(c, -b, -b);

        a.strokeRect(c.x, c.y, c.c, c.b);
      },
    };
  })();
  
  

  
function sa(a) {
  
  function b() {
    $(window).off("mouseup", b);
    $(window).off("mousemove", c);
    return !1;
  }

  function c(b) {
    O.La(a, b.pageX - d, b.pageY - f);
    return !1;
  }
  var d = 0,
    f = 0;
  $(a).on("mousedown", function (k) {
    if (k.target === a) {
      var e = $(a);
      $(window).on("mouseup", b);
      e = e.offset();
      d = k.pageX - e.left;
      f = k.pageY - e.top;
      $(window).on("mousemove", c);
      return !1;
    }
    return !0;
  });
}
var S = {
    f: function (a) {
      return chrome.i18n.getMessage(a);
    },
  },
  ta = (function () {
    function a(a) {
      var b = "unknown";
      -1 != a.navigator.appVersion.indexOf("Win") ? (b = "windows") : -1 != a.navigator.appVersion.indexOf("Mac") ? (b = "macos") : -1 != a.navigator.appVersion.indexOf("X11") ? (b = "unix") : -1 != a.navigator.appVersion.indexOf("Linux") && (b = "linux");
      return b;
    }
    return {
      ob: a,
      Da: function (b) {
        var c = {
          id: "ctrl",
          display: "Ctrl",
        };
        "macos" === a(b) &&
          (c = {
            id: "meta",
            display: "\u2318",
          });
        return c;
      },
    };
  })();
(function () {
  function a() {
    $("#announce_do_not_show").is(":checked")
      ? b(function () {
          $("#announce").hide();
        })
      : $("#announce").hide();
    return !1;
  }

  function b(a) {
    chrome.storage.local.get("scrsht_announces", function (b) {
      b.scrsht_announces || (b.scrsht_announces = {});
      b.scrsht_announces["ann_" + null.id] = "do_not_show";
      chrome.storage.local.set(b, function () {
        a();
      });
    });
  }
  $(function () {
    $("#announce_hide").click(a).html(S.f("screenshot_plugin_close"));
    $("#announce_close_cross").click(a);
    $("#announce_do_not_show_label").html(S.f("screenshot_plugin_announce_do_not_show"));
  });
})();

function ua(a) {
  this.a = a;
  this.Za = this.a.getContext("2d");
}
ua.prototype.v = function () {
  return new A(this.a.width, this.a.height);
};

function T(a, b) {
  var c = a.a.getBoundingClientRect();
  a = O.na(a.a);
  return new F({
    x: b.x * a.x + c.left + $(document).scrollLeft(),
    y: b.y * a.y + c.top + $(document).scrollTop(),
    c: b.c * a.x,
    b: b.b * a.y,
  });
}

function va(a, b) {
  var c = a.a.getBoundingClientRect();
  a = O.na(a.a);
  return new w(Math.round((b.x - c.left - $(document).scrollLeft()) / a.x), Math.round((b.y - c.top - $(document).scrollTop()) / a.y));
}

function U(a, b) {
  return va(a, new w(b.pageX, b.pageY));
}

function wa(a) {
  var b = document.getElementsByTagName("body")[0].appendChild(document.createElement("canvas"));
  wa.s.constructor.call(this, b);
  this.Fa = a;
  O.Oa(this.a, this.Fa);
  this.ua();
}
P.extend(wa, ua);
wa.prototype.ua = function () {
  var a = $(this.Fa);
  this.a.width = a.width();
  this.a.height = a.height();
  this.a.style.position = "absolute";
  this.a.style.left = a.offset().left + "px";
  this.a.style.top = a.offset().top + "px";
};

function xa(a) {
  var b = {
      ja: "selectStart",
      N: "selectEnd",
      L: "redraw",
    },
    c = (function () {
      function a() {
        d = new F();
        d = {b: 6390, y: 0, c: 2430, x: 0}
        y = !1;
      }

      function b(a) {
        d = a;
        y = !0;
        a = 3 * window.devicePixelRatio;
        var b = Math.floor(d.c / 2),
          c = Math.floor(d.b / 2);
        h.right = N.K(new w(d.x + d.c, d.y + c), a);
        h.left = N.K(new w(d.x, d.y + c), a);
        h.top = N.K(new w(d.x + b, d.y), a);
        h.bottom = N.K(new w(d.x + b, d.y + d.b), a);
        h.topleft = N.K(new w(d.x, d.y), a);
        h.topright = N.K(new w(d.x + d.c, d.y), a);
        h.bottomleft = N.K(new w(d.x, d.y + d.b), a);
        h.bottomright = N.K(new w(d.x + d.c, d.y + d.b), a);
        h.move = d;
      }

      function c(a) {
        if (y) for (var b in h) if (!a(h[b], b)) break;
      }
      var d = new F(),
        y = !1,
        h = {},
        v = null;
      return {
        set: b,
        get: function () {
          return d;
        },
        clear: a,
        Ya: function () {
          return y;
        },
        oa: function (a) {
          var b = "none";
          y &&
            c(function (c, d) {
              c = new F(c);
              ka(c, 1);
              return I(c, a) ? ((b = d), !1) : !0;
            });
          return b;
        },
        lb: c,
        Ba: function () {
          v = d;
        },
        restore: function () {
          v ? b(v) : a();
        },
      };
    })(),
    d = (function () {
      function a(a) {
        console.log(a);
        if (G) return !0;
        
        console.log(l);
        
        a = U(l, a);
        K();
        clearInterval(ssssss);
        // "move" === c.oa(a) && K();
        return !1;
      }

      function d(a) {
        1 !== a.which && y();
        return !1;
      }

      function e(a) {
        m = a = U(l, a);
        if (G) return !0;
        switch (B) {
          case "left":
          case "right":
          case "top":
          case "bottom":
            c.set(N.bb(u, H, a));
            break;
          case "topleft":
          case "topright":
          case "bottomleft":
          case "bottomright":
            c.set(N.Ka(u, a));
            break;
          case "move":
            var b = l.v();
            c.set(
              new F({
                T: Math.min(Math.max(a.x - C.left, 0), b.c),
                V: Math.min(Math.max(a.y - C.top, 0), b.b),
                U: Math.max(Math.min(a.x + C.right, b.c), 0),
                W: Math.max(Math.min(a.y + C.bottom, b.b), 0),
              })
            );
        }
        E();
        v(a);
        return !1;
      }

      function g() {
        y();
        return !1;
      }

      function y() {
        B = "none";
        H = u = C = null;
        var a = l.a;
        $(a).off("mouseup", g);
        $(a).off("mouseenter", d);
        c.get().A() ? (c.restore(), E()) : c.Ba();
        z[b.N].fire({
          rect: T(l, c.get()),
        });
      }

      function h(a) {
        if (1 != a.which || G) return !0;
        a = U(l, a);
        B = c.oa(a);
        switch (B) {
          case "left":
            u = J(c.get());
            H = M(c.get());
            break;
          case "right":
            u = ma(c.get());
            H = L(c.get());
            break;
          case "top":
            u = L(c.get());
            H = M(c.get());
            break;
          case "bottom":
            u = ma(c.get());
            H = J(c.get());
            break;
          case "topleft":
            u = M(c.get());
            break;
          case "topright":
            u = L(c.get());
            break;
          case "bottomleft":
            u = J(c.get());
            break;
          case "bottomright":
            u = ma(c.get());
            break;
          case "move":
            var r = c.get();
            C = {
              left: a.x - r.x,
              top: a.y - r.y,
              right: r.x + r.c - a.x,
              bottom: r.y + r.b - a.y,
            };
            break;
          case "none":
            u = a;
            B = "bottomright";
            break;
          default:
            alert("ERROR onMouseDown -> switch -> default");
        }
        a = l.a;
        $(a).on("mouseup", g);
        $(a).on("mouseenter", d);
        z[b.ja].fire();
        return !1;
      }

      function v(a) {
        var b = "none";
        "none" !== B ? (b = B) : a && (b = c.oa(a));
        a = l.a;
        switch (b) {
          case "left":
          case "right":
            a.style.cursor = "ew-resize";
            break;
          case "top":
          case "bottom":
            a.style.cursor = "ns-resize";
            break;
          case "topright":
          case "bottomleft":
            a.style.cursor = "nesw-resize";
            break;
          case "topleft":
          case "bottomright":
            a.style.cursor = "nwse-resize";
            break;
          case "move":
            a.style.cursor = "move";
            break;
          default:
            a.style.cursor = "default";
        }
      }

      function E() {
        z[b.L].fire(null);
      }

      function K() {
        var a = c.get(),
        
          d = new F(new w(0, 0), l.v());
		console.log(d);  
		  //F {b: 3039, y: 0, c: 1366, x: 0} 
      a.isEqual(d) && p ? c.set(p) : ((p = a), c.set(d));
	  // if (typeof a.isEqual === "function") {
    // a.isEqual(d) && p ? c.set(p) : ((p = a), c.set(d));
// } else {
    // console.error("a.isEqual is not a function. Object:", a);
// }
	  
	  
        c.Ba();
        E();
        z[b.N].fire({
          rect: T(l, c.get()),
        });
      }
      var l = null,
        u = null,
        H = null,
        B = "none",
        C = null,
        p = null,
        z = {};
      z[b.ja] = $.Callbacks();
      z[b.N] = $.Callbacks();
      z[b.L] = $.Callbacks();
      var G = !1,
        m = null,
        D = S.f("screenshot_plugin_tooltip");
      return {
        pa: function (b) {
          l = new ua(b);
          E();
          b = l.a;
          $(b).on("mousedown", h);
          $(b).on("mousemove", e);
          // console.log(b, a);
          $(b).on("dblclick", a);
        },
        clear: function () {
          c.clear();
          E();
        },
        I: function () {
          return c.get();
        },
        D: b,
        attachEvent: function (a, b) {
          "undefined" !== typeof z[a] && z[a].add(b);
        },
        detachEvent: function (a, b) {
          "undefined" !== typeof z[a] && z[a].remove(b);
        },
        lock: function () {
          G = !0;
          l.a.style.cursor = "default";
          B = "none";
        },
        unlock: function () {
          G = !1;
          m && v(m);
        },
        ga: function (a, b) {
          if (a && b)
            if (c.Ya()) {
              var d = c.get();
              b.fillStyle = "rgba(0, 0, 0, 0.5)";
              b.fillRect(0, 0, a.width, d.y);
              b.fillRect(0, d.y, d.x, a.height - d.y);
              b.fillRect(d.x, d.y + d.b, a.width - d.x, a.height - d.y - d.b);
              b.fillRect(d.x + d.c, d.y, a.width - d.x - d.c, d.b);
              b.lineWidth = 1 * window.devicePixelRatio;
              b.lineJoin = "miter";
              b.strokeStyle = "white";
              R.sa(b, d.x, d.y, d.c, d.b);
              b.strokeStyle = "black";
              b.setLineDash([6]);
              R.sa(b, d.x, d.y, d.c, d.b);
              b.setLineDash([]);
              b.fillStyle = "black";
              b.strokeStyle = "white";
              c.lb(function (a, c) {
                "none" !== c && "move" !== c && (b.fillRect(a.x, a.y, a.c, a.b), R.sa(b, a.x, a.y, a.c, a.b));
                return !0;
              });
              var e = 14 * window.devicePixelRatio;
              b.font = e + "px Helvetica";
              b.fillStyle = "white";
              b.textBaseline = "top";
              a = d.c + "x" + d.b;
              var r = new A(b.measureText(a).width, e);
              e = 3 * window.devicePixelRatio;
              r = new A(r.c + 2 * e, r.b + 2 * e);
              var f = null;
              f = new F(new w(d.x, d.y - 5 * window.devicePixelRatio - r.b), r);
              R.cb(b, f.x, f.y, f.c, f.b, 3 * window.devicePixelRatio, "rgba(0,0,0,0.8)", "rgba(0,0,0,0.8)");
              b.fillText(a, f.x + e, f.y + e - 1 * window.devicePixelRatio);
            } else (b.fillStyle = "rgba(0, 0, 0, 0.5)"), b.fillRect(0, 0, a.width, a.height), (e = 50 * window.devicePixelRatio), (b.font = e + "px Helvetica"), (b.fillStyle = "rgba(255, 255, 255, 0.5)"), (b.textBaseline = "top"), (r = new A(b.measureText(D).width, e)), (d = new F(new w(), r)), oa(d, new F(new w(), new A(a.width, a.height))), b.fillText(D, d.x, d.y);
        },
        eb: K,
        offset: function (a, d) {
          var e = new F(c.get());
          e.x += a;
          e.y += d;
          a = new F(new w(0, 0), l.v());
          e = na(e, a);
          e.size().isEqual(c.get().size()) &&
            (c.set(e),
            E(),
            z[b.N].fire({
              rect: T(l, c.get()),
            }));
        },
        da: function (a, d) {
          var e = new F(c.get());
          e.c += a;
          e.b += d;
          e.A() ||
            ((a = new F(new w(0, 0), l.v())),
            (e = na(e, a)),
            c.set(e),
            E(),
            z[b.N].fire({
              rect: T(l, c.get()),
            }));
        },
      };
    })();
  d.pa(a);
  return d;
}

function V(a, b) {
  this.l = a;
  this.ab = b;
  this.a = null;
  this.o = "default";
  this.ka();
}
V.prototype.ka = function () {
  this.l.id = this.l.id || pa.ma("item_");
};
V.prototype.la = function () {};
V.prototype.getState = function () {
  return this.o;
};

function ya(a, b) {
  ya.s.constructor.apply(this, arguments);
  this.a = document.createElement("div");
  this.a.id = this.l.id;
  this.a.className = "toolbar-separator";
}
P.extend(ya, V);

function yax(a, b) {
  yax.s.constructor.apply(this, arguments);
  this.a = document.createElement("div");
  this.a.id = this.l.id;
  this.a.className = "toolbar-separator";
}
P.extend(yax, V);

function W(a, b) {
  W.s.constructor.apply(this, arguments);
  this.ka();
  this.za();
  za(this);
}
P.extend(W, V);
W.prototype.ka = function () {};
W.prototype.za = function () {
  this.a = document.createElement("img");
  this.a.id = this.l.id;
  this.a.alt = this.l.caption;
  this.a.title = this.l.caption;
  //	this.a.datatip = this.l.caption;
  //	this.a.setAttribute('data-tip', ''+this.l.caption+'');

  //	this.a.tabindex = "1";
  this.a.className = "toolbar-button tooltip";
  Aa(this);
};

function za(a) {
  $(a.a).on("click", function () {
    var b = a.ab;
    b.O[b.X.C].fire(a.l.id);
    return !1;
  });
  $(a.a).on("mousedown", !1);
  $(a.a).on("mouseover", function () {
    Ba(a);
  });
  $(a.a).on("mouseout", function () {
    "active" != a.o && Aa(a);
  });
}

function Aa(a) {
  a.a.src = a.l.g;
  a.a.srcset = a.l.h + " 2x";
}

function Ba(a) {
  a.a.src = a.l.i;
  a.a.srcset = a.l.j + " 2x";
}
W.prototype.la = function () {
  "active" == this.o ? Ba(this) : Aa(this);
};

function Ca(a, b) {
  Ca.s.constructor.apply(this, arguments);
  this.l.u(this);
}
P.extend(Ca, W);
Ca.prototype.za = function () {
  this.a = document.createElement("canvas");
  this.a.id = this.l.id;
  this.a.className = "toolbar-button-owner-draw";
  this.a.title = this.l.caption;
  this.a.width = 26 * window.devicePixelRatio;
  this.a.height = 27 * window.devicePixelRatio;
  this.a.getContext("2d").scale(window.devicePixelRatio, window.devicePixelRatio);
};

function Da(a) {
  this.H = a;
  this.P = [];
  this.O = {};
  this.O[this.X.C] = $.Callbacks();
  this.H.id = this.H.id || pa.ma("toolbar_");
  this.H.layout = this.H.layout || [];
  this.a = document.createElement("div");
  this.a.id = this.H.id;
  this.a.className = "toolbar " + this.H.className;
  document.getElementsByTagName("body")[0].appendChild(this.a);
  for (a = 0; a < this.H.layout.length; a++)
    if ("copy" != this.H.layout[a].id || "function" === typeof navigator.clipboard.write) {
      var b = this.H.layout[a];
      var c = null;
      "button" === b.type ? (c = new W(b, this)) : "button_owner_draw" === b.type ? (c = new Ca(b, this)) : "separator" === b.type && (c = new ya(b, this)) && (c = new yax(b, this));
      if ((b = c)) this.P.push(b), this.a.appendChild(b.a);
    }
}
n = Da.prototype;
n.X = {
  C: "buttonClicked",
};
n.setPosition = function (a, b) {
  null == b && "undefined" !== typeof a.x && "undefined" !== typeof a.y ? ((this.a.style.left = a.x + "px"), (this.a.style.top = a.y + "px")) : ((this.a.style.left = a + "px"), (this.a.style.top = b + "px"));
};
n.v = function () {
  return new A($(this.a).outerWidth(), $(this.a).outerHeight());
};
n.I = function () {
  var a = $(this.a).offset();
  return new F(new w(a.left, a.top), this.v());
};
n.hide = function () {
  $(this.a).hide();
};
n.show = function () {
  $(this.a).show();
};
n.attachEvent = function (a, b) {
  "undefined" !== typeof this.O[a] && this.O[a].add(b);
};
n.detachEvent = function (a, b) {
  "undefined" !== typeof this.O[a] && this.O[a].remove(b);
};

function Ea(a) {
  for (var b = 0; b < a.P.length; b++) {
    var c = a.P[b];
    c.o = "default";
    c.la();
  }
}

function applyToolbarSettings() {
  toggleClassForToolbarItem("arrow", "show_arrow");
  toggleClassForToolbarItem("arrow_rect", "show_arrow_rect");
  toggleClassForToolbarItem("arrow_circle", "show_arrow_circle");
  toggleClassForToolbarItem("arrow_line", "show_arrow_line");
  toggleClassForToolbarItem("curly_braces", "show_curly_braces");
  toggleClassForToolbarItem("brackets", "show_brackets");
  toggleClassForToolbarItem("pencil", "show_pencil");
  toggleClassForToolbarItem("marker", "show_marker");
    toggleClassForToolbarItem("blur", "show_blur");

  toggleClassForToolbarItem("circle", "show_circle");
  toggleClassForToolbarItem("rectangle", "show_rectangle");
  toggleClassForToolbarItem("text", "show_text");
  toggleClassForToolbarItem("line", "show_line");
  toggleClassForToolbarItem("undo", "show_undo");
}
// Helper function to toggle the hide_tooool class
function toggleClassForToolbarItem(elementId, localStorageKey) {
  const element = document.getElementById(elementId);
  if (element) {
    const shouldHide = localStorage.getItem(localStorageKey) === "0";
    if (shouldHide) {
      element.classList.add("hide_tooool");
    } else {
      element.classList.remove("hide_tooool");
    }
  }
}

setTimeout(function () {
  applyToolbarSettings();
}, 2500);

function Fa(a, b) {
  for (var c = 0; c < a.P.length; c++) if (a.P[c].l.id === b) return a.P[c];
  return null;
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const advancedSettingBtn = document.getElementById("advanced_settinggg");

    if (advancedSettingBtn) {
      document.getElementById("advanced_settinggg").addEventListener("click", function () {
        document.getElementById("settingsPopup").style.display = "block"; // Show the settings popup

        document.getElementById("toggle_arrow").checked = localStorage.getItem("show_arrow") === "1";
        document.getElementById("toggle_arrow_rect").checked = localStorage.getItem("show_arrow_rect") === "1";
        document.getElementById("toggle_arrow_circle").checked = localStorage.getItem("show_arrow_circle") === "1";
        document.getElementById("toggle_arrow_line").checked = localStorage.getItem("show_arrow_line") === "1";
        document.getElementById("toggle_curly_braces").checked = localStorage.getItem("show_curly_braces") === "1";
        document.getElementById("toggle_brackets").checked = localStorage.getItem("show_brackets") === "1";
        document.getElementById("toggle_pencil").checked = localStorage.getItem("show_pencil") === "1";
        document.getElementById("toggle_marker").checked = localStorage.getItem("show_marker") === "1";
		        document.getElementById("toggle_blur").checked = localStorage.getItem("show_blur") === "1";

        document.getElementById("toggle_circle").checked = localStorage.getItem("show_circle") === "1";
        document.getElementById("toggle_rectangle").checked = localStorage.getItem("show_rectangle") === "1";
        document.getElementById("toggle_text").checked = localStorage.getItem("show_text") === "1";
        document.getElementById("toggle_line").checked = localStorage.getItem("show_line") === "1";
        document.getElementById("toggle_undo").checked = localStorage.getItem("show_undo") === "1";
      });

      // Close the settings popup
      document.getElementById("closePopupBtn").addEventListener("click", function () {
        document.getElementById("settingsPopup").style.display = "none"; // Hide the settings popup
      });

      // Function to save settings in localStorage
      document.getElementById("saveSettingsBtn").addEventListener("click", function () {
        // Save settings for each toolbar button
        localStorage.setItem("show_arrow", document.getElementById("toggle_arrow").checked ? "1" : "0");
        localStorage.setItem("show_arrow_rect", document.getElementById("toggle_arrow_rect").checked ? "1" : "0");
        localStorage.setItem("show_arrow_circle", document.getElementById("toggle_arrow_circle").checked ? "1" : "0");
        localStorage.setItem("show_pencil", document.getElementById("toggle_pencil").checked ? "1" : "0");
        localStorage.setItem("show_marker", document.getElementById("toggle_marker").checked ? "1" : "0");
		localStorage.setItem("show_blur", document.getElementById("toggle_blur").checked ? "1" : "0");

        localStorage.setItem("show_undo", document.getElementById("toggle_undo").checked ? "1" : "0");

        localStorage.setItem("show_arrow_line", document.getElementById("toggle_arrow_line").checked ? "1" : "0");
        localStorage.setItem("show_curly_braces", document.getElementById("toggle_curly_braces").checked ? "1" : "0");
        localStorage.setItem("show_brackets", document.getElementById("toggle_brackets").checked ? "1" : "0");
        localStorage.setItem("show_circle", document.getElementById("toggle_circle").checked ? "1" : "0");
        localStorage.setItem("show_rectangle", document.getElementById("toggle_rectangle").checked ? "1" : "0");
        localStorage.setItem("show_text", document.getElementById("toggle_text").checked ? "1" : "0");
        localStorage.setItem("show_line", document.getElementById("toggle_line").checked ? "1" : "0");

        // Apply the settings immediately
        applyToolbarSettings();
        alert("Settings saved!");
        document.getElementById("settingsPopup").style.display = "none"; // Hide the popup
      });

      // Function to apply settings to the toolbar

      // Load and apply settings when the page loads
      document.addEventListener("DOMContentLoaded", function () {
        // Set default values if not already set in localStorage
        if (localStorage.getItem("show_arrow") === null) localStorage.setItem("show_arrow", "1");
        if (localStorage.getItem("show_arrow_rect") === null) localStorage.setItem("show_arrow_rect", "1");
        if (localStorage.getItem("show_arrow_circle") === null) localStorage.setItem("show_arrow_circle", "1");
        if (localStorage.getItem("show_pencil") === null) localStorage.setItem("show_pencil", "1");
        if (localStorage.getItem("show_marker") === null) localStorage.setItem("show_marker", "1");
		if (localStorage.getItem("show_blur") === null) localStorage.setItem("show_blur", "1");

        if (localStorage.getItem("show_undo") === null) localStorage.setItem("show_undo", "1");

        if (localStorage.getItem("show_arrow_rect") === null) localStorage.setItem("show_arrow_rect", "1");
        if (localStorage.getItem("show_arrow_line") === null) localStorage.setItem("show_arrow_line", "1");
        if (localStorage.getItem("show_curly_braces") === null) localStorage.setItem("show_curly_braces", "1");
        if (localStorage.getItem("show_brackets") === null) localStorage.setItem("show_brackets", "1");
        if (localStorage.getItem("show_circle") === null) localStorage.setItem("show_circle", "1");
        if (localStorage.getItem("show_rectangle") === null) localStorage.setItem("show_rectangle", "1");
        if (localStorage.getItem("show_text") === null) localStorage.setItem("show_text", "1");
        if (localStorage.getItem("show_line") === null) localStorage.setItem("show_line", "1");

        // Apply the saved settings
        applyToolbarSettings();

        // Set the checkboxes in the popup to reflect the saved settings
        document.getElementById("toggle_arrow").checked = localStorage.getItem("show_arrow") === "1";
        document.getElementById("toggle_arrow_rect").checked = localStorage.getItem("show_arrow_rect") === "1";
        document.getElementById("toggle_arrow_circle").checked = localStorage.getItem("show_arrow_circle") === "1";
        document.getElementById("toggle_pencil").checked = localStorage.getItem("show_pencil") === "1";
        document.getElementById("toggle_marker").checked = localStorage.getItem("show_marker") === "1";
		document.getElementById("toggle_blur").checked = localStorage.getItem("show_blur") === "1";

        document.getElementById("toggle_undo").checked = localStorage.getItem("show_undo") === "1";

        document.getElementById("toggle_arrow_line").checked = localStorage.getItem("show_arrow_line") === "1";
        document.getElementById("toggle_curly_braces").checked = localStorage.getItem("show_curly_braces") === "1";
        document.getElementById("toggle_brackets").checked = localStorage.getItem("show_brackets") === "1";
        document.getElementById("toggle_circle").checked = localStorage.getItem("show_circle") === "1";
        document.getElementById("toggle_rectangle").checked = localStorage.getItem("show_rectangle") === "1";
        document.getElementById("toggle_text").checked = localStorage.getItem("show_text") === "1";
        document.getElementById("toggle_line").checked = localStorage.getItem("show_line") === "1";

        toggleClassForToolbarItem("arrow", "show_arrow");
        toggleClassForToolbarItem("arrow_rect", "show_arrow_rect");
        toggleClassForToolbarItem("arrow_circle", "show_arrow_circle");
        toggleClassForToolbarItem("arrow_line", "show_arrow_line");
        toggleClassForToolbarItem("curly_braces", "show_curly_braces");
        toggleClassForToolbarItem("brackets", "show_brackets");
        toggleClassForToolbarItem("pencil", "show_pencil");
        toggleClassForToolbarItem("marker", "show_marker");
		        toggleClassForToolbarItem("blur", "show_blur");

        toggleClassForToolbarItem("circle", "show_circle");
        toggleClassForToolbarItem("rectangle", "show_rectangle");
        toggleClassForToolbarItem("text", "show_text");
        toggleClassForToolbarItem("line", "show_line");
        toggleClassForToolbarItem("undo", "show_undo");
      });
    }

    // document.getElementById('advanced_feature_arrow').addEventListener('click', openLinkInNewTab);
  }, 2000);
});

document.addEventListener("DOMContentLoaded", function () {
  setInterval(function () {
    var toolbarEdit = document.getElementById("toolbar_edit");

    var toolbarEditLeft = parseInt(toolbarEdit.style.left, 10);
    var toolbarEditTop = parseInt(toolbarEdit.style.top, 10);

	toolbarEdit.style.position = 'fixed';
	    toolbarEdit.style.top = "100px"; 

    var toolbarEditytt = document.getElementById("toolbar_actions");
	toolbarEditytt.style.position = 'fixed';



    var newLeft = toolbarEditLeft + 30 + "px";
    var newtopppp = toolbarEditTop + 1 + "px";

    var toolbarAdvanced = document.getElementById("toolbar_advanced");
    toolbarAdvanced.style.left = newLeft;
	toolbarAdvanced.style.position = 'fixed';

    toolbarAdvanced.style.zIndex = 5;

   // toolbarAdvanced.style.top = newtopppp; 
	    toolbarAdvanced.style.top = "100px"; 


    var newLeft2 = toolbarEditLeft + 60 + "px";
 
    var toolbarAdvanced2 = document.getElementById("toolbar_advanced2");
    toolbarAdvanced2.style.left = newLeft2;
	toolbarAdvanced2.style.position = 'fixed';

    toolbarAdvanced2.style.zIndex = 5;

   // toolbarAdvanced.style.top = newtopppp; 
	    toolbarAdvanced2.style.top = "100px"; 




  }, 200);

  function showRandomAnchor() {
    const announceDiv = document.getElementById("announce_message");
    const anchors = announceDiv.getElementsByTagName("a");

    for (let i = 0; i < anchors.length; i++) {
      anchors[i].style.display = "none";
    }

    const randomIndex = Math.floor(Math.random() * anchors.length);

    anchors[randomIndex].style.display = "block";
  }

  showRandomAnchor();




  




  function createSettingsMenu() {
    let menuscrs = document.getElementById("settings-menuscrs");

    // If the menu doesn't exist, create and append it
    if (!menuscrs) {
      menuscrs = document.createElement("div");
      menuscrs.id = "settings-menuscrs";
      menuscrs.style.display = "none";
      menuscrs.style.position = "absolute";
      menuscrs.style.background = "#fff";
      menuscrs.style.border = "1px solid #ccc";
      menuscrs.style.padding = "5px";
      menuscrs.style.zIndex = "1000";
      menuscrs.style.borderRadius = "5px";

      var markerFillOption5 = localStorage.getItem("markerFillOption5") || "1";
      var markerFillOption5valle = localStorage.getItem("markerFillOption5valle") || "option-remove";

      var markerText = markerFillOption5 === "1" ? "Remove Highlighter" : "Add Highlighter";

      setTimeout(function () {
        document.getElementById("announce").style.display = "block";
      }, 20000000);













      menuscrs.innerHTML = `
                <div id="option-1" alt="thickness 12px" title="thickness 12px" class="menuscrs-item" style="cursor: pointer;padding: 4px 5px 4px 5px;">12 Px</div>
                <div id="option-2" alt="thickness 24px" title="thickness 24px"  class="menuscrs-item" style="cursor: pointer;padding: 4px 5px 4px 5px;">24 px</div>
                <div id="option-3" alt="thickness 36px" title="thickness 36px"   class="menuscrs-item" style="cursor: pointer;padding: 4px 5px 4px 5px;">36 px</div><div id="option-4" alt="thickness 48px" title="thickness 48px"   class="menuscrs-item" style="cursor: pointer; padding: 4px 5px 4px 5px;">48 Px</div><div id="${markerFillOption5valle === "0" ? "option-remove" : "option-5"}" alt="Marker Auto fill" title="Marker Auto fill" class="menuscrs-item" style="cursor: pointer; padding: 4px 5px 4px 5px;">${markerText}</div><div id="option-color" alt="Marker Color" title="Marker Color" class="menuscrs-item" style="cursor: pointer; padding: 4px 5px 4px 5px;">
         Color: 
        <input type="color" id="markerColorPicker" style="width: 50px; cursor: pointer;" />
    </div>
	

            `;

      const toolbarEdit = document.getElementById("toolbar_edit");
      if (toolbarEdit) {
        toolbarEdit.appendChild(menuscrs);
      }

      const storedColor = localStorage.getItem("markerColor");
      if (storedColor) {
        document.getElementById("markerColorPicker").value = storedColor;
      }

      document.getElementById("markerColorPicker").addEventListener("input", function (event) {
        const selectedColor = event.target.value;
        localStorage.setItem("markerColor", selectedColor);
        console.log("Marker color selected:", selectedColor);
      });

      document.getElementById("option-1").addEventListener("click", function () {
        localStorage.setItem("customfontscrsht", "1");
        menuscrs.style.display = "none";
      });

      document.getElementById("option-2").addEventListener("click", function () {
        localStorage.setItem("customfontscrsht", "2");
        menuscrs.style.display = "none";
      });

      document.getElementById("option-3").addEventListener("click", function () {
        localStorage.setItem("customfontscrsht", "3");
        menuscrs.style.display = "none";
      });

      document.getElementById("option-4").addEventListener("click", function () {
        localStorage.setItem("customfontscrsht", "4");
        menuscrs.style.display = "none";
      });

      // document.getElementById('option-5').addEventListener('click', function() {
      // localStorage.setItem('markerFillOption5', '1');
      // menuscrs.style.display = 'none';
      // });

      // Attach event listener dynamically to the correct element
      let optionElement = document.getElementById(markerFillOption5valle === "0" ? "option-remove" : "option-5");

      optionElement.addEventListener("click", function () {
        // Get the current value of markerFillOption5
        let currentMarkerValue = localStorage.getItem("markerFillOption5") || "1";

        // Toggle between '0' and '1'
        let newMarkerValue = currentMarkerValue === "1" ? "0" : "1";

        // Set the new value in local storage
        localStorage.setItem("markerFillOption5", newMarkerValue);

        // Update the markerFillOption5valle accordingly
        localStorage.setItem("markerFillOption5valle", newMarkerValue === "1" ? "option-5" : "option-remove");

        // Hide the menu
        menuscrs.style.display = "none";

        // Optionally, you can update the UI or menu content dynamically after the change
        // updateMenu();
      });

      // Hide the menu when clicking outside of the menu or gear icon
      document.addEventListener("click", function (event) {
        const gearIcon = document.getElementById("settings_gear");
        if (!gearIcon.contains(event.target) && !menuscrs.contains(event.target)) {
          menuscrs.style.display = "none";
        }
      });
    }
  }

  // Function to toggle the menu
  function toggleSettingsMenu() {
    const gearIcon = document.getElementById("settings_gear");
    const menuscrs = document.getElementById("settings-menuscrs");
    if (gearIcon && menuscrs) {
      const rectyy = gearIcon.getBoundingClientRect();
      // menuscrs.style.left = `${rectyy.left}px`;
      // menuscrs.style.top = `${rectyy.top - menuscrs.offsetHeight}px`;
      menuscrs.style.left = "34px";
      menuscrs.style.top = "0px";
      menuscrs.style.display = menuscrs.style.display === "block" ? "none" : "block";
    }
  }

  // Observe the DOM for the addition of the 'settings_gear' element
  const observer = new MutationObserver(function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        const gearIcon = document.getElementById("settings_gear");
        if (gearIcon) {
          createSettingsMenu();
          gearIcon.addEventListener("click", toggleSettingsMenu);
          observer.disconnect(); // Stop observing once the element is found
          break;
        }
      }
    }
  });

  // Start observing the document body for added child nodes
  observer.observe(document.body, { childList: true, subtree: true });
});

function Ga() {
  function a(a) {
    if ("share" === a) {
      if ($(f.a).is(":visible")) {
        f.hide();
      } else {
        if ((f.show(), (a = (a = Fa(d, "share")) ? a.a.getBoundingClientRect() : null))) {
          var b = f.v(),
            k = a.left + (a.right - a.left) / 2;
          a.bottom + 6 + b.b < window.innerHeight ? (f.setPosition(k - b.c / 2, a.bottom + 6), $(f.a).addClass("drop-down").removeClass("drop-up")) : (f.setPosition(k - b.c / 2, a.top - 8 - b.b), $(f.a).addClass("drop-up").removeClass("drop-down"));
        }
      }
    } else {
      e[c.C].fire(a);
    }
  }

  function b() {
    d.hide();
    f.hide();
    k.hide();
    z.hide(); // Ensure the new column also hides
	 zpiy.hide();
  }

  var c = {
      C: "buttonClicked",
    },
    d = null,
    f = null,
    k = null,
    z = null, // New toolbar variable for the new vertical column
	  zpiy = null,
    e = {};

  e[c.C] = $.Callbacks();
  var g = ta.Da(window).display;

  (y = {
    id: "toolbar_actions",
    className: "toolbar-horizontal",
    layout: [
      {
        id: "upload",
        type: "button",
        caption: S.f("screenshot_plugin_upload") + " (" + g + "+D)",
        g: "/toolbar_res/hor_upload.png",
        h: "/toolbar_res/hor_upload@2x.png",
        i: "/toolbar_res/hor_upload_hover.png",
        j: "/toolbar_res/hor_upload_hover@2x.png",
      },
      {
        id: "save",
        type: "button",
        caption: S.f("screenshot_plugin_save") + " (" + g + "+S)",
        g: "/toolbar_res/hor_save.png",
        h: "/toolbar_res/hor_save@2x.png",
        i: "/toolbar_res/hor_save_hover.png",
        j: "/toolbar_res/hor_save_hover@2x.png",
      }, 
      {
        id: "pdf",
        type: "button",
        caption: S.f("screenshot_plugin_save") + " (" + g + "+S)",
        g: "/toolbar_res/icon-download-pdf.png",
        h: "/toolbar_res/icon-download-pdf-hover.png",
        i: "/toolbar_res/icon-download-pdf.png",
        j: "/toolbar_res/icon-download-pdf-hover.png",
      },

	  
      {
        id: "copy",
        type: "button",
        caption: S.f("screenshot_plugin_copy") + " (" + g + "+C, Paste any where)",
        g: "/toolbar_res/hor_copy.png",
        h: "/toolbar_res/hor_copy@2x.png",
        i: "/toolbar_res/hor_copy_hover.png",
        j: "/toolbar_res/hor_copy_hover@2x.png",
      },

      {
        id: "share",
        type: "button",
        caption: S.f("screenshot_plugin_share"),
        g: "/toolbar_res/hor_share.png",
        h: "/toolbar_res/hor_share@2x.png",
        i: "/toolbar_res/hor_share_hover.png",
        j: "/toolbar_res/hor_share_hover@2x.png",
      },
      // {
      // id: "search_google",
      // type: "button",
      // caption: S.f("screenshot_plugin_share_googlesearch"),
      // g: "/toolbar_res/hor_search.png",
      // h: "/toolbar_res/hor_search@2x.png",
      // i: "/toolbar_res/hor_search_hover.png",
      // j: "/toolbar_res/hor_search_hover@2x.png"
      // },

      {
        id: "print",
        type: "button",
        caption: S.f("screenshot_plugin_print") + " (" + g + "+P)",
        g: "/toolbar_res/hor_print.png",
        h: "/toolbar_res/hor_print@2x.png",
        i: "/toolbar_res/hor_print_hover.png",
        j: "/toolbar_res/hor_print_hover@2x.png",
      },
      {
        type: "separator",
      },
      {
        id: "close",
        type: "button",
        caption: S.f("screenshot_plugin_close") + " (" + g + "+X)",
        g: "/toolbar_res/hor_close.png",
        h: "/toolbar_res/hor_close@2x.png",
        i: "/toolbar_res/hor_close_hover.png",
        j: "/toolbar_res/hor_close_hover@2x.png",
      },
    ],
  }),
    (h = {
      id: "toolbar_share",
      className: "subtoolbar-horizontal",
      layout: [
        {
          id: "share_whatsapp",
          type: "button",
          caption: S.f("screenshot_plugin_share_whatsapp"),
          g: "/toolbar_res/share_whatsapp.png",
          h: "/toolbar_res/share_whatsapp@2x.png",
          i: "/toolbar_res/share_whatsapp_hover.png",
          j: "/toolbar_res/share_whatsapp_hover@2x.png",
        },
        {
          id: "share_twitter",
          type: "button",
          caption: S.f("screenshot_plugin_share_twitter"),
          g: "/toolbar_res/share_twitter.png",
          h: "/toolbar_res/share_twitter@2x.png",
          i: "/toolbar_res/share_twitter_hover.png",
          j: "/toolbar_res/share_twitter_hover@2x.png",
        },
        {
          id: "share_facebook",
          type: "button",
          caption: S.f("screenshot_plugin_share_facebook"),
          g: "/toolbar_res/share_facebook.png",
          h: "/toolbar_res/share_facebook@2x.png",
          i: "/toolbar_res/share_facebook_hover.png",
          j: "/toolbar_res/share_facebook_hover@2x.png",
        },
        {
          id: "share_vk",
          type: "button",
          caption: S.f("screenshot_plugin_share_vk"),
          g: "/toolbar_res/share_vk.png",
          h: "/toolbar_res/share_vk@2x.png",
          i: "/toolbar_res/share_vk_hover.png",
          j: "/toolbar_res/share_vk_hover@2x.png",
        },
        {
          id: "share_pinterest",
          type: "button",
          caption: S.f("screenshot_plugin_share_pinterest"),
          g: "/toolbar_res/share_pinterest.png",
          h: "/toolbar_res/share_pinterest@2x.png",
          i: "/toolbar_res/share_pinterest_hover.png",
          j: "/toolbar_res/share_pinterest_hover@2x.png",
        },
      ],
    });
  g = {
    id: "toolbar_edit",
    className: "toolbar-vertical",
    layout: [
      {
        id: "settings_gear", // New gear icon
        type: "button",
        caption: S.f("screenshot_plugin_edit_settings"),
        g: "/toolbar_res/settings_gear.png",
        h: "/toolbar_res/settings_gear@2x.png",
        i: "/toolbar_res/settings_gear_hover.png",
        j: "/toolbar_res/settings_gear_hover@2x.png",
      },

      {
        id: "arrow",
        type: "button",
        caption: S.f("screenshot_plugin_edit_arrow"),
        g: "/toolbar_res/draw_arrow.png",
        h: "/toolbar_res/draw_arrow@2x.png",
        i: "/toolbar_res/draw_arrow_hover.png",
        j: "/toolbar_res/draw_arrow_hover@2x.png",
      },

      {
        id: "pencil",
        type: "button",
        caption: S.f("screenshot_plugin_edit_pencil"),
        g: "/toolbar_res/draw_pencil.png",
        h: "/toolbar_res/draw_pencil@2x.png",
        i: "/toolbar_res/draw_pencil_hover.png",
        j: "/toolbar_res/draw_pencil_hover@2x.png",
      },
      {
        id: "marker",
        type: "button",
        caption: S.f("screenshot_plugin_edit_marker"),
        g: "/toolbar_res/draw_marker.png",
        h: "/toolbar_res/draw_marker@2x.png",
        i: "/toolbar_res/draw_marker_hover.png",
        j: "/toolbar_res/draw_marker_hover@2x.png",
      },
	        {
        id: "blur",
        type: "button",
        caption: S.f("screenshot_plugin_edit_blur"),
        g: "/toolbar_res/ic-blur.png",
        h: "/toolbar_res/ic-blur.png",
        i: "/toolbar_res/ic-blur.png",
        j: "/toolbar_res/ic-blur.png",
      },
      {
        id: "circle",
        type: "button",
        caption: S.f("screenshot_plugin_edit_circ"),
        g: "/toolbar_res/draw_circle.png",
        h: "/toolbar_res/draw_circle@2x.png",
        i: "/toolbar_res/draw_circle_hover.png",
        j: "/toolbar_res/draw_circle_hover@2x.png",
      },

      {
        id: "rectangle",
        type: "button",
        caption: S.f("screenshot_plugin_edit_rect"),
        g: "/toolbar_res/draw_rectangle.png",
        h: "/toolbar_res/draw_rectangle@2x.png",
        i: "/toolbar_res/draw_rectangle_hover.png",
        j: "/toolbar_res/draw_rectangle_hover@2x.png",
      },
      {
        id: "text",
        type: "button",
        caption: S.f("screenshot_plugin_edit_text"),
        g: "/toolbar_res/draw_text.png",
        h: "/toolbar_res/draw_text@2x.png",
        i: "/toolbar_res/draw_text_hover.png",
        j: "/toolbar_res/draw_text_hover@2x.png",
      },

      {
        id: "line",
        type: "button",
        caption: S.f("screenshot_plugin_edit_line"),
        g: "/toolbar_res/draw_line.png",
        h: "/toolbar_res/draw_line@2x.png",
        i: "/toolbar_res/draw_line_hover.png",
        j: "/toolbar_res/draw_line_hover@2x.png",
      },

      {
        id: "color",
        type: "button_owner_draw",
        caption: S.f("screenshot_plugin_edit_color"),
        Aa: {
          color: "#ff0000",
        },
        u: function (a) {
          var b = a.a;
          if (b && b.getContext) {
            var c = b.getContext("2d");
            c.clearRect(0, 0, b.width, b.height);
            c.fillStyle = a.l.Aa.color;
            c.fillRect(6, 5, 16, 17);
            a = new Image();
            a.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAbCAYAAABiFp9rAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAHpJREFUeNpi/P//PwM9ABMDncCoRaMWjVo0atGoRVQELJRoZmRkjGdgYFBEE77/////hdT2kSKRYtQJuhUrVtivWLHCnmZBB7MkPDzcAcaPiIg4iDWYKanKGRkZG7CJ////v4HaQXeHSDHKfDRaMoxaRBYAAAAA//8DAKjqHdwtNtzFAAAAAElFTkSuQmCC";
            c.drawImage(a, 0.5, 0.5);
          }
        },
      },
      {
        type: "separator",
      },
      {
        id: "undo",
        type: "button",
        caption: S.f("screenshot_plugin_edit_undo") + " (" + g + "+Z)",
        g: "/toolbar_res/draw_undo.png",
        h: "/toolbar_res/draw_undo@2x.png",
        i: "/toolbar_res/draw_undo_hover.png",
        j: "/toolbar_res/draw_undo_hover@2x.png",
      },
    ],
  };

  // New vertical toolbar z
  var z = {
    id: "toolbar_advanced",
    className: "toolbar-vertical",
    layout: [
      {
        id: "advanced_settinggg",
        type: "button",
        caption: S.f("screenshot_plugin_settinggg"),
        g: "/toolbar_res/settings_gear.png",
        h: "/toolbar_res/settings_gear@2x.png",
        i: "/toolbar_res/settings_gear_hover.png",
        j: "/toolbar_res/settings_gear_hover@2x.png",
      },
      {
        id: "advanced_feature_arrow4",
        type: "button",
        caption: S.f("screenshot_plugin_edit_arrow3"),
        g: "/toolbar_res/draw_st4n.png",
        h: "/toolbar_res/draw_st4n@2x.png",
        i: "/toolbar_res/draw_st4n_hover.png",
        j: "/toolbar_res/draw_st4n_hover@2x.png",
      },
      {
        id: "advanced_feature_arrow5",
        type: "button",
        caption: S.f("screenshot_plugin_edit_arrow3"),
        g: "/toolbar_res/draw_st4n.png",
        h: "/toolbar_res/draw_st4n@2x.png",
        i: "/toolbar_res/draw_st4n_hover.png",
        j: "/toolbar_res/draw_st4n_hover@2x.png",
      },
      {
        id: "advanced_feature_arrow6",
        type: "button",
        caption: S.f("screenshot_plugin_edit_arrow3"),
        g: "/toolbar_res/draw_st6n.png",
        h: "/toolbar_res/draw_st6n@2x.png",
        i: "/toolbar_res/draw_st6n_hover.png",
        j: "/toolbar_res/draw_st6n_hover@2x.png",
      },

      {
        id: "advanced_feature_arrow",
        type: "button",
        caption: S.f("screenshot_plugin_edit_arrow"),
        g: "/toolbar_res/curved-arrow.png",
        h: "/toolbar_res/curved-arrow@2x.png",
        i: "/toolbar_res/curved-arrow_hover.png",
        j: "/toolbar_res/curved-arrow_hover@2x.png",
      },
      {
        id: "advanced_feature_arrow2",
        type: "button",
        caption: S.f("screenshot_plugin_edit_arrow2"),
        g: "/toolbar_res/draw_question.png",
        h: "/toolbar_res/draw_question@2x.png",
        i: "/toolbar_res/draw_question_hover.png",
        j: "/toolbar_res/draw_question_hover@2x.png",
      },
      {
        id: "advanced_feature_arrow3",
        type: "button",
        caption: S.f("screenshot_plugin_edit_arrow3"),
        g: "/toolbar_res/draw_st2n.png",
        h: "/toolbar_res/draw_st2n@2x.png",
        i: "/toolbar_res/draw_st2n_hover.png",
        j: "/toolbar_res/draw_st2n_hover@2x.png",
      },
      {
        id: "arrow_rect",
        type: "button",
        caption: S.f("screenshot_plugin_edit_arrow_rect"),
        g: "/toolbar_res/draw_arrow_rect.png",
        h: "/toolbar_res/draw_arrow_rect@2x.png",
        i: "/toolbar_res/draw_arrow_rect_hover.png",
        j: "/toolbar_res/draw_arrow_rect_hover@2x.png",
      },

      {
        id: "arrow_circle",
        type: "button",
        caption: S.f("screenshot_plugin_edit_arrow_circle"),
        g: "/toolbar_res/draw_arrow_circle.png",
        h: "/toolbar_res/draw_arrow_circle@2x.png",
        i: "/toolbar_res/draw_arrow_circle_hover.png",
        j: "/toolbar_res/draw_arrow_circle_hover@2x.png",
      },
      {
        id: "arrow_line",
        type: "button",
        caption: S.f("screenshot_plugin_edit_arrow"),
        g: "/toolbar_res/draw_arrow_line.png",
        h: "/toolbar_res/draw_arrow_line@2x.png",
        i: "/toolbar_res/draw_arrow_line_hover.png",
        j: "/toolbar_res/draw_arrow_line_hover@2x.png",
      },

      {
        id: "curly_braces",
        type: "button",
        caption: S.f("screenshot_curly_braces"),
        g: "/toolbar_res/draw_curly_line.png",
        h: "/toolbar_res/draw_curly_line@2x.png",
        i: "/toolbar_res/draw_curly_line_hover.png",
        j: "/toolbar_res/draw_curly_line_hover@2x.png",
      },
      {
        id: "brackets",
        type: "button",
        caption: S.f("screenshot_curly_braces"),
        g: "/toolbar_res/draw_brackets.png",
        h: "/toolbar_res/draw_brackets@2x.png",
        i: "/toolbar_res/draw_brackets_hover.png",
        j: "/toolbar_res/draw_brackets_hover@2x.png",
      },
    ],
  };


  var zpiy = {
    id: "toolbar_advanced2",
    className: "toolbar-vertical",
    layout: [
      {
        id: "advanced_feature_curve1",
        type: "button",
        caption: S.f("edit_curve1"),
        g: "/toolbar_res/curve11.png",
        h: "/toolbar_res/curve11.png",
        i: "/toolbar_res/curve11_hover.png",
        j: "/toolbar_res/curve11_hover.png",
      },
      {
        id: "advanced_feature_curve2",
        type: "button",
        caption: S.f("edit_curve1"),
        g: "/toolbar_res/curve22.png",
        h: "/toolbar_res/curve22.png",
        i: "/toolbar_res/curve22_hover.png",
        j: "/toolbar_res/curve22_hover.png",
      },
      {
        id: "advanced_feature_curve3",
        type: "button",
        caption: S.f("edit_curve1"),
        g: "/toolbar_res/curve33.png",
        h: "/toolbar_res/curve33.png",
        i: "/toolbar_res/curve33_hover.png",
        j: "/toolbar_res/curve33_hover.png",
      },

      {
        id: "advanced_feature_curve4",
        type: "button",
        caption: S.f("edit_curve1"),
        g: "/toolbar_res/curve44.png",
        h: "/toolbar_res/curve44.png",
        i: "/toolbar_res/curve44_hover.png",
        j: "/toolbar_res/curve44_hover.png",
      },
      {
        id: "advanced_feature_curve5",
        type: "button",
        caption: S.f("edit_curve1"),
        g: "/toolbar_res/curve55.png",
        h: "/toolbar_res/curve55.png",
        i: "/toolbar_res/curve55_hover.png",
        j: "/toolbar_res/curve55_hover.png",
      },
      {
        id: "advanced_feature_curve6",
        type: "button",
        caption: S.f("edit_curve1"),
        g: "/toolbar_res/curve66.png",
        h: "/toolbar_res/curve66.png",
        i: "/toolbar_res/curve66_hover.png",
        j: "/toolbar_res/curve66_hover.png",
      },
      {
        id: "advanced_feature_curve7",
        type: "button",
        caption: S.f("edit_curve1"),
       g: "/toolbar_res/curve77.png",
        h: "/toolbar_res/curve77.png",
        i: "/toolbar_res/curve77_hover.png",
        j: "/toolbar_res/curve77_hover.png",
      },

      {
        id: "advanced_feature_curve8",
        type: "button",
        caption: S.f("edit_curve1"),
         g: "/toolbar_res/curve88.png",
        h: "/toolbar_res/curve88.png",
        i: "/toolbar_res/curve88_hover.png",
        j: "/toolbar_res/curve88_hover.png",
      },
      {
        id: "advanced_feature_curve9",
        type: "button",
        caption: S.f("edit_curve1"),
        g: "/toolbar_res/curve99.png",
        h: "/toolbar_res/curve99.png",
        i: "/toolbar_res/curve99_hover.png",
        j: "/toolbar_res/curve99_hover.png",
      },

   /*    {
        id: "advanced_feature_curve10",
        type: "button",
        caption: S.f("screenshot_plugin_edit_curve10"),
        g: "/toolbar_res/curved-arrow.png",
        h: "/toolbar_res/curved-arrow@2x.png",
        i: "/toolbar_res/curved-arrow_hover.png",
        j: "/toolbar_res/curved-arrow_hover@2x.png",
      },
      {
        id: "advanced_feature_curve11",
        type: "button",
        caption: S.f("screenshot_plugin_edit_curve11"),
        g: "/toolbar_res/curved-arrow.png",
        h: "/toolbar_res/curved-arrow@2x.png",
        i: "/toolbar_res/curved-arrow_hover.png",
        j: "/toolbar_res/curved-arrow_hover@2x.png",
      }, */
    ],
  };



  // Initialize and attach events to the toolbars
  d = new Da(y);
  d.attachEvent(d.X.C, a);

  f = new Da(h);
  f.attachEvent(f.X.C, a);

  k = new Da(g);
  k.attachEvent(k.X.C, a);

  z = new Da(z); // Initialize the new toolbar for advanced features
  z.attachEvent(z.X.C, a); // Attach event to the new toolbar

  zpiy = new Da(zpiy); // Initialize the new toolbar for advanced features
  zpiy.attachEvent(zpiy.X.C, a); // Attach event to the new toolbar



  b(); // Ensure all toolbars are hidden initially

  return {
    ua: function (a) {
      var b = new F({
          x: 0,
          y: 0,
          c: window.innerWidth,
          b: window.innerHeight,
        }),
        c = d.v(),
        e = [],
        f = d.v();
      var g = M(a);
      e.push(new w(Math.max(g.x - f.c, 0), g.y + 5));
      g = J(a);
      e.push(new w(Math.max(g.x - f.c, 0), g.y - 5 - f.b));
      g = L(a);
      e.push(new w(g.x - 5 - f.c, g.y - f.b));
      g = M(a);
      e.push(new w(g.x + 5, g.y - f.b));
      g = M(a);
      e.push(new w(g.x - 5 - f.c, g.y - 5 - f.b));
      for (g = 0; g < e.length; g++)
        if (la(b, new F(e[g], c))) {
          d.setPosition(e[g]);
          break;
        }
      c = d.I();
      e = k.v();
      f = [];
      g = d.v();
      var h = k.v(),
        v = d.I();
      var p = M(a);
      f.push(new w(p.x + 5, Math.max(p.y - h.b, 0)));
      p = L(a);
      f.push(new w(p.x - 5 - h.c, Math.max(p.y - h.b, 0)));
      p = M(a);
      f.push(new w(p.x - 5 - h.c, Math.max(p.y - 5 - h.b, 0)));
      p = M(a);
      f.push(new w(v.x + v.c + 5, Math.max(p.y - 5 - h.b, 0)));
      p = L(a);
      f.push(new w(v.x - 5 - h.c, Math.max(p.y - h.b, 0)));
      p = M(a);
      f.push(new w(p.x - h.c, p.y + 5 + g.b + 5));
      p = J(a);
      f.push(new w(p.x - h.c, p.y - 5 - g.b - 5 - h.b));
      for (g = 0; g < f.length; g++)
        if (((a = new F(f[g], e)), la(b, a) && na(a, c).A())) {
          k.setPosition(f[g]);
          break;
        }
    },
    Ea: b,
    Ma: function () {
      d.show();
      k.show();
      z.show(); // Ensure the new column is shown when the toolbars are shown
	    zpiy.show();
    },
    Mazy: function () {
      d.show();
      k.show();
      z.show(); // Show the new toolbar
	  zpiy.show(); 
    },
    D: c,
    attachEvent: function (a, b) {
      "undefined" !== typeof e[a] && e[a].add(b);
    },
    detachEvent: function (a, b) {
      "undefined" !== typeof e[a] && e[a].remove(b);
    },
    gb: function (a, b) {
      Ea(k);
      if ((a = Fa(k, a))) (a.o = b), a.la();
    },
    Ca: function () {
      Ea(k);
    },
    ta: function (a) {
      var b = Fa(k, "color");
      b.l.Aa.color = a;
      b.l.u(b);
    },
  };
}

function Ha(a) {
  a = a || {};
  var b = null,
    c = null,
    d = a.color || "#ff0000",
    f = a.width || 10,
    k = a.fontFamily || "Helvetica";
  c = document.createElement("textarea");
  c.spellcheck = !1;
  b = document.createElement("div");
  b.appendChild(c);
  b.style.tb = "999999";
  b.style.background = "none";
  b.style.border = "dashed black 1px";
  b.style.padding = 2 * window.devicePixelRatio + "px";
  b.style.margin = "2px";
  b.style.cursor = "move";
  c.style.background = "none";
  c.style.border = "none";
  c.style.outline = "none";
  c.style.resize = "none";
  c.style.padding = "0";
  c.style.margin = "0";
  c.style.color = d;
  c.style.font = f + "px " + k;
  document.getElementsByTagName("body")[0].appendChild(b);
  O.ra(b);
  O.La(b, a.Ja.x, a.Ja.y);
  ja(c);
  sa(b);
  c.focus();
  return {
    Wa: function () {
      return c ? c.value : null;
    },
    Ua: function () {
      return b ? $(c).offset() : null;
    },
    Ta: function () {
      return Number.parseInt(window.getComputedStyle(c).height) / c.rows;
    },
    fb: function () {
      b.parentNode.removeChild(b);
      c = b = null;
    },
    R: function (a) {
      d = a;
      c.style.color = d;
    },
    Z: function (a) {
      f = a;
      c.style.fontSize = f + "px";
      $(c).change();
    },
  };
}

function Ia(a) {
  a = a || {};
  this.$a = a.S || "line";
  this.F = a.color || "#ff0000";
  this.w = a.width || 10;
  this.Ia = a.qb || 1;
  this.o = "new";
}
n = Ia.prototype;
n.getState = function () {
  return this.o;
};
n.u = function () {
  alert("not implemented");
};
n.setStart = function () {
  alert("not implemented");
};
n.setEnd = function () {
  alert("not implemented");
};
n.ba = function () {
  alert("not implemented");
};
n.A = function () {
  alert("not implemented");
};
n.R = function () {};
n.Z = function (a) {
  "drawing" == this.o && (this.w = a);
};

function Ja(a) {
  Ja.s.constructor.apply(this, arguments);
}
P.extend(Ja, Ia);

function X(a) {
  X.s.constructor.apply(this, arguments);
  this.G = this.M = null;
}
P.extend(X, Ja);
X.prototype.setStart = function (a) {
  this.G = this.M = a;
  this.o = "drawing";
};
X.prototype.setEnd = function (a) {
  a && (this.G = a);
  this.o = "finished";
};
X.prototype.ba = function (a) {
  "drawing" === this.o && (this.G = a);
};
X.prototype.A = function () {
  return null == this.M || null == this.G;
};

function Y(a) {
  Y.s.constructor.apply(this, arguments);
  this.m = [];
}
P.extend(Y, Ja);
Y.prototype.setStart = function (a) {
  this.m = [];
  this.m.push(a);
  this.o = "drawing";
};
Y.prototype.setEnd = function (a) {
  a && this.m.push(a);
  this.o = "finished";
};
Y.prototype.ba = function (a) {
  if ("drawing" === this.o) {
    var b = this.m[this.m.length - 1];
    Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2)) >= this.w / 8 && this.m.push(a);
  }
};
Y.prototype.A = function () {
  return 0 == this.m.length;
};

function Ka(a) {
  a = a || {};
  a.S = "line";
  Ka.s.constructor.apply(this, arguments);
}
P.extend(Ka, X);
Ka.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";
  a.strokeStyle = this.F;

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;
  //  a.lineWidth = this.w * window.devicePixelRatio;
  a.lineWidth = this.w * window.devicePixelRatio * customFontScrSht;

  a.beginPath();
  a.moveTo(this.M.x, this.M.y);
  a.lineTo(this.G.x, this.G.y);
  a.stroke();
};

// let customFontScrSht = localStorage.getItem('customfontscrsht');
// customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;

function hexToRgba(hex, opacity) {
  hex = hex.replace("#", "");

  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function La(a) {
  a = a || {};
  a.S = "arrow";
  La.s.constructor.apply(this, arguments);
}
P.extend(La, X);
La.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;

  const adjustedWidth = this.w * window.devicePixelRatio * customFontScrSht;

  // const adjustedWidth = this.w * window.devicePixelRatio * 2;

  //  R.Qa(a, this.M.x, this.M.y, this.G.x, this.G.y, this.F, this.w * window.devicePixelRatio)

  R.Qa(a, this.M.x, this.M.y, this.G.x, this.G.y, this.F, adjustedWidth);
};

// copyright design

function La_advanced_feature_arrow(a) {
  a = a || {};
  a.S = "advanced_feature_arrow4";
  La.s.constructor.apply(this, arguments);
}

// Extend the base function to inherit properties
P.extend(La_advanced_feature_arrow, La);

La_advanced_feature_arrow.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";
  a.strokeStyle = this.F; // Set stroke style to current color

  // Retrieve thickness modifier from localStorage (user-defined)
  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2; // Default to 2 if not set

  // Calculate the starting and ending thickness using the custom value
  const startThickness = customFontScrSht * 1; // Adjust starting thickness
  const endThickness = startThickness * 6; // Ending thickness is 4x the starting

  // Adjust arrowhead size to match the line thickness
  const arrowHeadSize = endThickness * 2; // Arrowhead size to fit the line

  // Get the actual start and end points of the arrow from cursor drag
  const startPoint = this.M; // Where the user starts the drag (mouse down)
  const endPoint = this.G; // Where the user ends the drag (mouse up)

  // Calculate the differences between start and end points
  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const angle = Math.atan2(dy, dx); // Angle of the line

  // Calculate the full line length (from start to end of drag)
  const fullLineLength = Math.sqrt(dx * dx + dy * dy);

  // Calculate where the line should stop (base of the arrowhead)
  const adjustedLineLength = fullLineLength - arrowHeadSize;

  // Normalize the direction of the line based on the drag
  const directionX = dx / fullLineLength;
  const directionY = dy / fullLineLength;

  // Draw the arrow's line with gradually increasing thickness
  const numSegments = 200; // Increase the number of segments for smoother drawing
  for (let i = 0; i < numSegments; i++) {
    const t1 = i / numSegments;
    const t2 = (i + 1) / numSegments;

    // Calculate segment start and end points using the adjusted line length
    const x1 = startPoint.x + t1 * adjustedLineLength * directionX;
    const y1 = startPoint.y + t1 * adjustedLineLength * directionY;
    const x2 = startPoint.x + t2 * adjustedLineLength * directionX;
    const y2 = startPoint.y + t2 * adjustedLineLength * directionY;

    // Gradually increase the line's thickness from start to end
    const currentThickness = startThickness + t1 * (endThickness - startThickness);

    // Set line width for each segment
    a.lineWidth = currentThickness;

    // Draw each segment separately to ensure thickness is applied
    a.beginPath();
    a.moveTo(x1, y1);
    a.lineTo(x2, y2);
    a.stroke(); // Apply stroke immediately for each segment
  }

  // Calculate the coordinates for the base of the arrowhead
  const arrowBaseX = startPoint.x + adjustedLineLength * directionX;
  const arrowBaseY = startPoint.y + adjustedLineLength * directionY;

  // Now calculate the tip of the arrowhead (where the line is pointing)
  const arrowTipX = endPoint.x;
  const arrowTipY = endPoint.y;

  // Now calculate the two side points of the arrowhead's base, ensuring they are rotated correctly
  const arrowBaseX1 = arrowBaseX - arrowHeadSize * Math.cos(angle - Math.PI / 6);
  const arrowBaseY1 = arrowBaseY - arrowHeadSize * Math.sin(angle - Math.PI / 6);
  const arrowBaseX2 = arrowBaseX - arrowHeadSize * Math.cos(angle + Math.PI / 6);
  const arrowBaseY2 = arrowBaseY - arrowHeadSize * Math.sin(angle + Math.PI / 6);

  // Draw the arrowhead
  a.beginPath();
  a.moveTo(arrowTipX, arrowTipY); // Tip of the arrow
  a.lineTo(arrowBaseX1, arrowBaseY1);
  a.lineTo(arrowBaseX2, arrowBaseY2);
  a.closePath();
  a.fillStyle = this.F;
  a.fill(); // Fill the arrowhead with the current color
};

// copyright design

function La_advanced_feature_arrow2(a) {
  a = a || {};
  a.S = "question_mark";
  La.s.constructor.apply(this, arguments);
}

P.extend(La_advanced_feature_arrow2, La);

La_advanced_feature_arrow2.prototype.u = function (a) {
  const startPoint = this.M;
  const endPoint = this.G;

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;

  const distance = Math.hypot(endPoint.x - startPoint.x, endPoint.y - startPoint.y);
  const scaleFactor = distance / 100;

  a.lineJoin = "round";
  a.lineCap = "round";
  a.strokeStyle = this.F;
  a.lineWidth = 3 * scaleFactor * customFontScrSht;

  const arcRadius = 30 * scaleFactor;
  const arcCenterXxxx = startPoint.x;
  const arcCenterYyyy = startPoint.y + arcRadius;

  a.beginPath();
  a.arc(arcCenterXxxx, arcCenterYyyy, arcRadius, Math.PI + 0.5, 0.5 * Math.PI, false);
  a.stroke();

  const lineStartX = arcCenterXxxx;
  const lineStartY = arcCenterYyyy + arcRadius;

  const lineEndY = lineStartY + 30 * scaleFactor;
  a.moveTo(lineStartX, lineStartY);
  a.lineTo(lineStartX, lineEndY);
  a.stroke();

  const dotRadius = 5 * scaleFactor * customFontScrSht;
  a.beginPath();
  a.arc(lineStartX, lineEndY + 20 * scaleFactor, dotRadius, 0, 2 * Math.PI);
  a.fillStyle = this.F;
  a.fill();
};

// copyright design

function La_advanced_feature_arrow3(a) {
  a = a || {};
  a.S = "corner_highlight";
  La.s.constructor.apply(this, arguments);
}

P.extend(La_advanced_feature_arrow3, La);

La_advanced_feature_arrow3.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";
  a.strokeStyle = this.F;

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;
  var finallwidthhrtrr = customFontScrSht / 3;

  a.lineWidth = this.w * window.devicePixelRatio * finallwidthhrtrr;

  //   let markerFillOption5 = localStorage.getItem('markerFillOption5');
  let markerFillOption5 = localStorage.getItem("markerFillOption5") || "1";

  var b = N.Ka(this.M, this.G);

  if (markerFillOption5 === "1") {
    if (this.F.startsWith("rgb")) {
      a.fillStyle = this.F.replace("rgb", "rgba").replace(")", ", 0.2)");
    } else if (this.F.startsWith("#")) {
      let markerColor = localStorage.getItem("markerColor") || "#ffff00"; // Default yellow
      let rgbaMarkerColor = hexToRgba(markerColor, 0.3); // Convert hex to rgba
      a.fillStyle = rgbaMarkerColor;
    } else {
      let markerColor = localStorage.getItem("markerColor") || "#ffff00"; // Default yellow
      let rgbaMarkerColor = hexToRgba(markerColor, 0.3); // Convert hex to rgba
      a.fillStyle = rgbaMarkerColor;
    }

    a.fillRect(b.x, b.y, b.c, b.b);
  }

  const cornerSize = 40;
  a.beginPath();
  a.moveTo(b.x, b.y);
  a.lineTo(b.x + cornerSize, b.y);
  a.moveTo(b.x, b.y);
  a.lineTo(b.x, b.y + cornerSize);
  a.stroke();

  a.beginPath();
  a.moveTo(b.x + b.c, b.y + b.b);
  a.lineTo(b.x + b.c - cornerSize, b.y + b.b);
  a.moveTo(b.x + b.c, b.y + b.b);
  a.lineTo(b.x + b.c, b.y + b.b - cornerSize);
  a.stroke();
};

// copyright design

function La_advanced_feature_arrow4(a) {
  a = a || {};
  a.S = "advanced_feature_arrow4";
  La.s.constructor.apply(this, arguments);
}

P.extend(La_advanced_feature_arrow4, La);

La_advanced_feature_arrow4.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";
  a.strokeStyle = this.F;

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;

  const startThickness = customFontScrSht * 1;
  const endThickness = startThickness * 6;

  const arrowHeadSize = endThickness * 2;

  const startPoint = this.M;
  const endPoint = this.G;

  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const angle = Math.atan2(dy, dx);

  const fullLineLength = Math.sqrt(dx * dx + dy * dy);

  const adjustedLineLength = fullLineLength - arrowHeadSize;

  const directionX = dx / fullLineLength;
  const directionY = dy / fullLineLength;

  const numSegments = 200;
  for (let i = 0; i < numSegments; i++) {
    const t1 = i / numSegments;
    const t2 = (i + 1) / numSegments;

    const x1 = startPoint.x + t1 * adjustedLineLength * directionX;
    const y1 = startPoint.y + t1 * adjustedLineLength * directionY;
    const x2 = startPoint.x + t2 * adjustedLineLength * directionX;
    const y2 = startPoint.y + t2 * adjustedLineLength * directionY;

    const currentThickness = startThickness + t1 * (endThickness - startThickness);

    a.lineWidth = currentThickness;

    a.beginPath();
    a.moveTo(x1, y1);
    a.lineTo(x2, y2);
    a.stroke();
  }

  const arrowBaseX = startPoint.x + adjustedLineLength * directionX;
  const arrowBaseY = startPoint.y + adjustedLineLength * directionY;

  const arrowTipX = endPoint.x;
  const arrowTipY = endPoint.y;

  const arrowHeadLineLength = arrowHeadSize * 1.2;

  const arrowHeadX1 = arrowBaseX - arrowHeadLineLength * Math.cos(angle - Math.PI / 4);
  const arrowHeadY1 = arrowBaseY - arrowHeadLineLength * Math.sin(angle - Math.PI / 4);

  const arrowHeadX2 = arrowBaseX - arrowHeadLineLength * Math.cos(angle + Math.PI / 4);
  const arrowHeadY2 = arrowBaseY - arrowHeadLineLength * Math.sin(angle + Math.PI / 4);

  a.beginPath();
  a.moveTo(arrowBaseX, arrowBaseY);
  a.lineTo(arrowHeadX1, arrowHeadY1);
  a.lineTo(arrowTipX, arrowTipY);
  a.lineTo(arrowHeadX2, arrowHeadY2);
  a.closePath();

  a.fillStyle = this.F;
  a.fill();

  a.lineWidth = 3;
  a.stroke();
};

// copyright design




function La_advanced_feature_curve1(a) {
  a = a || {};
  a.S = "advanced_feature_curve1";
  La.s.constructor.apply(this, arguments);
}

P.extend(La_advanced_feature_curve1, La);

La_advanced_feature_curve1.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";
  a.strokeStyle = this.F;

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;

  const startThickness = customFontScrSht * 1;
  const endThickness = startThickness * 6;
  const arrowHeadSize = endThickness * 2;

  const startPoint = this.M;
  const endPoint = this.G;

  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;

  // Define control points for a Bézier curve
  const controlPoint1 = {
    x: startPoint.x + dx / 3,
    y: startPoint.y + dy / 3 + (Math.abs(dx) * 0.3)
  };
  const controlPoint2 = {
    x: endPoint.x - dx / 3,
    y: endPoint.y - dy / 3 + (Math.abs(dx) * 0.3)
  };

  // Calculate the approximate length of the Bézier curve
  let pathLength = 0;
  const numSegmentsForLength = 100;
  let prevX = startPoint.x;
  let prevY = startPoint.y;
  for (let i = 1; i <= numSegmentsForLength; i++) {
    const t = i / numSegmentsForLength;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;
    const dxSegment = x - prevX;
    const dySegment = y - prevY;
    pathLength += Math.sqrt(dxSegment * dxSegment + dySegment * dySegment);
    prevX = x;
    prevY = y;
  }

  // Adjust the curve length to account for the arrowhead
  const adjustedPathLength = pathLength - arrowHeadSize;

  // Draw the curved line with increasing thickness
  const numSegments = 200;
  let totalLengthDrawn = 0;
  prevX = startPoint.x;
  prevY = startPoint.y;
  for (let i = 0; i < numSegments; i++) {
    const t1 = i / numSegments;
    const t2 = (i + 1) / numSegments;

    const mt1 = 1 - t1;
    const mt2 = 1 - t2;
    const x1 = mt1 * mt1 * mt1 * startPoint.x + 3 * mt1 * mt1 * t1 * controlPoint1.x + 3 * mt1 * t1 * t1 * controlPoint2.x + t1 * t1 * t1 * endPoint.x;
    const y1 = mt1 * mt1 * mt1 * startPoint.y + 3 * mt1 * mt1 * t1 * controlPoint1.y + 3 * mt1 * t1 * t1 * controlPoint2.y + t1 * t1 * t1 * endPoint.y;
    const x2 = mt2 * mt2 * mt2 * startPoint.x + 3 * mt2 * mt2 * t2 * controlPoint1.x + 3 * mt2 * t2 * t2 * controlPoint2.x + t2 * t2 * t2 * endPoint.x;
    const y2 = mt2 * mt2 * mt2 * startPoint.y + 3 * mt2 * mt2 * t2 * controlPoint1.y + 3 * mt2 * t2 * t2 * controlPoint2.y + t2 * t2 * t2 * endPoint.y;

    const segmentLength = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    totalLengthDrawn += segmentLength;
    const segmentFraction = totalLengthDrawn / pathLength;

    if (totalLengthDrawn > adjustedPathLength) break;

    const currentThickness = startThickness + segmentFraction * (endThickness - startThickness);
    a.lineWidth = currentThickness;
    a.beginPath();
    a.moveTo(x1, y1);
    a.lineTo(x2, y2);
    a.stroke();
  }

  // Calculate the arrowhead position and orientation
  let arrowBaseX = endPoint.x;
  let arrowBaseY = endPoint.y;
  totalLengthDrawn = 0;
  prevX = startPoint.x;
  prevY = startPoint.y;
  for (let i = 0; i <= numSegmentsForLength; i++) {
    const t = i / numSegmentsForLength;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;
    if (i > 0) {
      const dxSegment = x - prevX;
      const dySegment = y - prevY;
      totalLengthDrawn += Math.sqrt(dxSegment * dxSegment + dySegment * dySegment);
    }
    if (totalLengthDrawn >= adjustedPathLength) {
      arrowBaseX = x;
      arrowBaseY = y;
      break;
    }
    prevX = x;
    prevY = y;
  }

  // Calculate direction at the end of the curve
  const tEnd = 0.99;
  const mtEnd = 1 - tEnd;
  const xEnd = mtEnd * mtEnd * mtEnd * startPoint.x + 3 * mtEnd * mtEnd * tEnd * controlPoint1.x + 3 * mtEnd * tEnd * tEnd * controlPoint2.x + tEnd * tEnd * tEnd * endPoint.x;
  const yEnd = mtEnd * mtEnd * mtEnd * startPoint.y + 3 * mtEnd * mtEnd * tEnd * controlPoint1.y + 3 * mtEnd * tEnd * tEnd * controlPoint2.y + tEnd * tEnd * tEnd * endPoint.y;
  const dxEnd = endPoint.x - xEnd;
  const dyEnd = endPoint.y - yEnd;
  const angle = Math.atan2(dyEnd, dxEnd);

  const arrowTipX = endPoint.x;
  const arrowTipY = endPoint.y;

  const arrowHeadLineLength = arrowHeadSize * 1.2;
  const arrowHeadX1 = arrowBaseX - arrowHeadLineLength * Math.cos(angle - Math.PI / 4);
  const arrowHeadY1 = arrowBaseY - arrowHeadLineLength * Math.sin(angle - Math.PI / 4);
  const arrowHeadX2 = arrowBaseX - arrowHeadLineLength * Math.cos(angle + Math.PI / 4);
  const arrowHeadY2 = arrowBaseY - arrowHeadLineLength * Math.sin(angle + Math.PI / 4);

  a.beginPath();
  a.moveTo(arrowBaseX, arrowBaseY);
  a.lineTo(arrowHeadX1, arrowHeadY1);
  a.lineTo(arrowTipX, arrowTipY);
  a.lineTo(arrowHeadX2, arrowHeadY2);
  a.closePath();

  a.fillStyle = this.F;
  a.fill();

  a.lineWidth = 3;
  a.stroke();
};


function La_advanced_feature_curve2(a) {
  a = a || {};
  a.S = "advanced_feature_curve2";
  La.s.constructor.apply(this, arguments);
}

P.extend(La_advanced_feature_curve2, La);

La_advanced_feature_curve2.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";
  a.strokeStyle = this.F;

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;

  // const strokeWidth = customFontScrSht * 1;
    const strokeWidth = customFontScrSht * 4;

  const arrowHeadSize = strokeWidth * 3;

  const startPoint = this.M;
  const endPoint = this.G;

  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;

  // Define control points for a smooth Bézier curve
  const controlPoint1 = {
    x: startPoint.x + dx * 0.25,
    y: startPoint.y + dy * 0.25 + (Math.abs(dx) * 0.5)
  };
  const controlPoint2 = {
    x: endPoint.x - dx * 0.25,
    y: endPoint.y - dy * 0.25 + (Math.abs(dx) * 0.5)
  };

  // Calculate the approximate length of the Bézier curve
  let pathLength = 0;
  const numSegmentsForLength = 100;
  let prevX = startPoint.x;
  let prevY = startPoint.y;
  for (let i = 1; i <= numSegmentsForLength; i++) {
    const t = i / numSegmentsForLength;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;
    const dxSegment = x - prevX;
    const dySegment = y - prevY;
    pathLength += Math.sqrt(dxSegment * dxSegment + dySegment * dySegment);
    prevX = x;
    prevY = y;
  }

  // Adjust the curve length to account for the arrowhead
  const adjustedPathLength = pathLength - arrowHeadSize;

  // Draw the curved line with consistent thickness
  const numSegments = 200;
  let totalLengthDrawn = 0;
  prevX = startPoint.x;
  prevY = startPoint.y;
  a.lineWidth = strokeWidth;
  a.beginPath();
  a.moveTo(startPoint.x, startPoint.y);
  for (let i = 1; i <= numSegments; i++) {
    const t = i / numSegments;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;

    const segmentLength = Math.sqrt((x - prevX) * (x - prevX) + (y - prevY) * (y - prevY));
    totalLengthDrawn += segmentLength;

    if (totalLengthDrawn > adjustedPathLength) break;

    a.lineTo(x, y);
    prevX = x;
    prevY = y;
  }
  a.stroke();

  // Calculate the arrowhead position
  let arrowBaseX = 0;
  let arrowBaseY = 0;
  totalLengthDrawn = 0;
  prevX = startPoint.x;
  prevY = startPoint.y;
  for (let i = 0; i <= numSegmentsForLength; i++) {
    const t = i / numSegmentsForLength;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;
    if (i > 0) {
      const dxSegment = x - prevX;
      const dySegment = y - prevY;
      totalLengthDrawn += Math.sqrt(dxSegment * dxSegment + dySegment * dySegment);
    }
    if (totalLengthDrawn >= adjustedPathLength) {
      arrowBaseX = x;
      arrowBaseY = y;
      break;
    }
    prevX = x;
    prevY = y;
  }

  // Calculate direction at the end of the curve
  const tEnd = 0.99;
  const mtEnd = 1 - tEnd;
  const xEnd = mtEnd * mtEnd * mtEnd * startPoint.x + 3 * mtEnd * mtEnd * tEnd * controlPoint1.x + 3 * mtEnd * tEnd * tEnd * controlPoint2.x + tEnd * tEnd * tEnd * endPoint.x;
  const yEnd = mtEnd * mtEnd * mtEnd * startPoint.y + 3 * mtEnd * mtEnd * tEnd * controlPoint1.y + 3 * mtEnd * tEnd * tEnd * controlPoint2.y + tEnd * tEnd * tEnd * endPoint.y;
  const dxEnd = endPoint.x - xEnd;
  const dyEnd = endPoint.y - yEnd;
  const lengthEnd = Math.sqrt(dxEnd * dxEnd + dyEnd * dyEnd) || 1;
  const directionXEnd = dxEnd / lengthEnd;
  const directionYEnd = dyEnd / lengthEnd;

  const perpDirectionX = -directionYEnd;
  const perpDirectionY = directionXEnd;
  const arrowBaseWidth = strokeWidth * 1.5;

  // Draw the arrowhead as two simple lines
  a.beginPath();
  a.lineWidth = strokeWidth;
  a.moveTo(endPoint.x, endPoint.y);
  a.lineTo(arrowBaseX + arrowBaseWidth * perpDirectionX, arrowBaseY + arrowBaseWidth * perpDirectionY);
  a.stroke();

  a.beginPath();
  a.moveTo(endPoint.x, endPoint.y);
  a.lineTo(arrowBaseX - arrowBaseWidth * perpDirectionX, arrowBaseY - arrowBaseWidth * perpDirectionY);
  a.stroke();
};

function La_advanced_feature_curve3(a) {
  a = a || {};
  a.S = "advanced_feature_curve3";
  La.s.constructor.apply(this, arguments);
}

P.extend(La_advanced_feature_curve3, La);

La_advanced_feature_curve3.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";
  a.strokeStyle = this.F;

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;

  const strokeWidth = customFontScrSht * 4;
  const baseArrowHeadSize = strokeWidth * 3;

  const startPoint = this.M;
  const endPoint = this.G;

  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const fullLength = Math.sqrt(dx * dx + dy * dy);
  const arrowHeadSize = baseArrowHeadSize + (fullLength * 0.1); // Scale arrowhead by 10% of length

  // Define control points for a smooth Bézier curve
  const controlPoint1 = {
    x: startPoint.x + dx * 0.25,
    y: startPoint.y + dy * 0.25 + (Math.abs(dx) * 0.5)
  };
  const controlPoint2 = {
    x: endPoint.x - dx * 0.25,
    y: endPoint.y - dy * 0.25 + (Math.abs(dx) * 0.5)
  };

  // Calculate the approximate length of the Bézier curve
  let pathLength = 0;
  const numSegmentsForLength = 100;
  let prevX = startPoint.x;
  let prevY = startPoint.y;
  for (let i = 1; i <= numSegmentsForLength; i++) {
    const t = i / numSegmentsForLength;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;
    const dxSegment = x - prevX;
    const dySegment = y - prevY;
    pathLength += Math.sqrt(dxSegment * dxSegment + dySegment * dySegment);
    prevX = x;
    prevY = y;
  }

  // Adjust the curve length to account for the arrowhead and gap
  const adjustedPathLength = pathLength - arrowHeadSize - (strokeWidth * 1.0);
        const adjustedPathLengthline = adjustedPathLength+50; // Added offset to create gap

  // Draw the curved line with consistent thickness
  const numSegments = 200;
  let totalLengthDrawn = 0;
  prevX = startPoint.x;
  prevY = startPoint.y;
  a.lineWidth = strokeWidth;
  a.beginPath();
  a.moveTo(startPoint.x, startPoint.y);
  for (let i = 1; i <= numSegments; i++) {
    const t = i / numSegments;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;

    const segmentLength = Math.sqrt((x - prevX) * (x - prevX) + (y - prevY) * (y - prevY));
    totalLengthDrawn += segmentLength;

    if (totalLengthDrawn > adjustedPathLengthline) break;

    a.lineTo(x, y);
    prevX = x;
    prevY = y;
  }
  a.stroke();

  // Calculate the arrowhead position
  let arrowBaseX = 0;
  let arrowBaseY = 0;
  totalLengthDrawn = 0;
  prevX = startPoint.x;
  prevY = startPoint.y;
  for (let i = 0; i <= numSegmentsForLength; i++) {
    const t = i / numSegmentsForLength;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;
    if (i > 0) {
      const dxSegment = x - prevX;
      const dySegment = y - prevY;
      totalLengthDrawn += Math.sqrt(dxSegment * dxSegment + dySegment * dySegment);
    }
    if (totalLengthDrawn >= adjustedPathLength) {
      arrowBaseX = x;
      arrowBaseY = y;
      break;
    }
    prevX = x;
    prevY = y;
  }

  // Calculate direction at the end of the curve
  const tEnd = 0.99;
  const mtEnd = 1 - tEnd;
  const xEnd = mtEnd * mtEnd * mtEnd * startPoint.x + 3 * mtEnd * mtEnd * tEnd * controlPoint1.x + 3 * mtEnd * tEnd * tEnd * controlPoint2.x + tEnd * tEnd * tEnd * endPoint.x;
  const yEnd = mtEnd * mtEnd * mtEnd * startPoint.y + 3 * mtEnd * mtEnd * tEnd * controlPoint1.y + 3 * mtEnd * tEnd * tEnd * controlPoint2.y + tEnd * tEnd * tEnd * endPoint.y;
  const dxEnd = endPoint.x - xEnd;
  const dyEnd = endPoint.y - yEnd;
  const lengthEnd = Math.sqrt(dxEnd * dxEnd + dyEnd * dyEnd) || 1;
  const directionXEnd = dxEnd / lengthEnd;
  const directionYEnd = dyEnd / lengthEnd;

  const perpDirectionX = -directionYEnd;
  const perpDirectionY = directionXEnd;
  const arrowBaseWidth = strokeWidth * 2.0;

  // Define thicknesses for the arrowhead lines
  const bottomArrowHeadThickness = strokeWidth * 1.0;
  const topArrowHeadThickness = strokeWidth * 0.8;

  // Determine top and bottom wings
  const topWingX = arrowBaseX + arrowBaseWidth * perpDirectionX;
  const topWingY = arrowBaseY + arrowBaseWidth * perpDirectionY;
  const bottomWingX = arrowBaseX - arrowBaseWidth * perpDirectionX;
  const bottomWingY = arrowBaseY - arrowBaseWidth * perpDirectionY;

  // Draw the top wing of the arrowhead
  a.beginPath();
  a.lineWidth = topArrowHeadThickness;
  a.moveTo(endPoint.x, endPoint.y);
  a.lineTo(topWingX, topWingY);
  a.stroke();

  // Draw the bottom wing of the arrowhead
  a.beginPath();
  a.lineWidth = bottomArrowHeadThickness;
  a.moveTo(endPoint.x, endPoint.y);
  a.lineTo(bottomWingX, bottomWingY);
  a.stroke();
};

function La_advanced_feature_curve4(a) {
  a = a || {};
  a.S = "advanced_feature_curve4";
  La.s.constructor.apply(this, arguments);
}

P.extend(La_advanced_feature_curve4, La);

La_advanced_feature_curve4.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";
  a.strokeStyle = this.F;

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;

  const strokeWidth = customFontScrSht * 4;
  const baseArrowHeadSize = strokeWidth * 3;

  const startPoint = this.M;
  const endPoint = this.G;

  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const fullLength = Math.sqrt(dx * dx + dy * dy);
  const arrowHeadSize = baseArrowHeadSize + (fullLength * 0.12);

  // Define control points for a smooth Bézier curve
  const controlPoint1 = {
    x: startPoint.x + dx * 0.25,
    y: startPoint.y + dy * 0.25 + (Math.abs(dx) * 0.5)
  };
  const controlPoint2 = {
    x: endPoint.x - dx * 0.25,
    y: endPoint.y - dy * 0.25 + (Math.abs(dx) * 0.5)
  };

  // Calculate the approximate length of the Bézier curve
  let pathLength = 0;
  const numSegmentsForLength = 100;
  let prevX = startPoint.x;
  let prevY = startPoint.y;
  for (let i = 1; i <= numSegmentsForLength; i++) {
    const t = i / numSegmentsForLength;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;
    const dxSegment = x - prevX;
    const dySegment = y - prevY;
    pathLength += Math.sqrt(dxSegment * dxSegment + dySegment * dySegment);
    prevX = x;
    prevY = y;
  }

  // Adjust the curve length to account for the arrowhead and gap
  const adjustedPathLength = pathLength - arrowHeadSize - (strokeWidth * 1.0);
        const adjustedPathLengthline = adjustedPathLength+50; // Added offset to create gap

  // Draw the main curved line with consistent thickness
  const numSegments = 200;
  let totalLengthDrawn = 0;
  prevX = startPoint.x;
  prevY = startPoint.y;
  a.lineWidth = strokeWidth;
  a.beginPath();
  a.moveTo(startPoint.x, startPoint.y);
  for (let i = 1; i <= numSegments; i++) {
    const t = i / numSegments;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;

    const segmentLength = Math.sqrt((x - prevX) * (x - prevX) + (y - prevY) * (y - prevY));
    totalLengthDrawn += segmentLength;

    if (totalLengthDrawn > adjustedPathLengthline) break;

    a.lineTo(x, y);
    prevX = x;
    prevY = y;
  }
  a.stroke();

  // Draw the thin line above the curve, from 20% to 80% of the adjusted path length
  const startPercentage = 0.2;
  const endPercentage = 0.8;
  const startLength = adjustedPathLength * startPercentage;
  const endLength = adjustedPathLength * endPercentage;

  totalLengthDrawn = 0;
  prevX = startPoint.x;
  prevY = startPoint.y;
  a.lineWidth = strokeWidth * 0.4;
  a.beginPath();
  let startedDrawing = false;
  let initialPerpDirectionX = 0;
  let initialPerpDirectionY = 0;

  // Determine the initial perpendicular direction
  for (let i = 0; i <= numSegmentsForLength; i++) {
    const t = i / numSegmentsForLength;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;

    let directionXAtPoint = 0;
    let directionYAtPoint = 0;
    if (i < numSegmentsForLength) {
      const tNext = (i + 1) / numSegmentsForLength;
      const mtNext = 1 - tNext;
      const xNext = mtNext * mtNext * mtNext * startPoint.x + 3 * mtNext * mtNext * tNext * controlPoint1.x + 3 * mtNext * tNext * tNext * controlPoint2.x + tNext * tNext * tNext * endPoint.x;
      const yNext = mtNext * mtNext * mtNext * startPoint.y + 3 * mtNext * mtNext * tNext * controlPoint1.y + 3 * mtNext * tNext * tNext * controlPoint2.y + tNext * tNext * tNext * endPoint.y;
      const dxDir = xNext - x;
      const dyDir = yNext - y;
      const lengthDir = Math.sqrt(dxDir * dxDir + dyDir * dyDir) || 1;
      directionXAtPoint = dxDir / lengthDir;
      directionYAtPoint = dyDir / lengthDir;
    } else {
      directionXAtPoint = dx / fullLength;
      directionYAtPoint = dy / fullLength;
    }

    if (i > 0) {
      const dxSegment = x - prevX;
      const dySegment = y - prevY;
      totalLengthDrawn += Math.sqrt(dxSegment * dxSegment + dySegment * dySegment);
    }

    if (totalLengthDrawn >= startLength && (initialPerpDirectionX === 0 && initialPerpDirectionY === 0)) {
      initialPerpDirectionX = -directionYAtPoint;
      initialPerpDirectionY = directionXAtPoint;
      const crossProduct = directionXAtPoint * dy - directionYAtPoint * dx;
      if (dx > 0) {
        if (crossProduct > 0) {
          initialPerpDirectionX = -initialPerpDirectionX;
          initialPerpDirectionY = -initialPerpDirectionY;
        }
      } else {
        if (crossProduct < 0) {
          initialPerpDirectionX = -initialPerpDirectionX;
          initialPerpDirectionY = -initialPerpDirectionY;
        }
      }
    }

    if (totalLengthDrawn > endLength) break;

    prevX = x;
    prevY = y;
  }

  // Reset for drawing the small line
  totalLengthDrawn = 0;
  prevX = startPoint.x;
  prevY = startPoint.y;
  for (let i = 0; i <= numSegmentsForLength; i++) {
    const t = i / numSegmentsForLength;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;

    let directionXAtPoint = 0;
    let directionYAtPoint = 0;
    if (i < numSegmentsForLength) {
      const tNext = (i + 1) / numSegmentsForLength;
      const mtNext = 1 - tNext;
      const xNext = mtNext * mtNext * mtNext * startPoint.x + 3 * mtNext * mtNext * tNext * controlPoint1.x + 3 * mtNext * tNext * tNext * controlPoint2.x + tNext * tNext * tNext * endPoint.x;
      const yNext = mtNext * mtNext * mtNext * startPoint.y + 3 * mtNext * mtNext * tNext * controlPoint1.y + 3 * mtNext * tNext * tNext * controlPoint2.y + tNext * tNext * tNext * endPoint.y;
      const dxDir = xNext - x;
      const dyDir = yNext - y;
      const lengthDir = Math.sqrt(dxDir * dxDir + dyDir * dyDir) || 1;
      directionXAtPoint = dxDir / lengthDir;
      directionYAtPoint = dyDir / lengthDir;
    } else {
      directionXAtPoint = dx / fullLength;
      directionYAtPoint = dy / fullLength;
    }

    let perpDirectionX = -directionYAtPoint;
    let perpDirectionY = directionXAtPoint;
    const dotProduct = perpDirectionX * initialPerpDirectionX + perpDirectionY * initialPerpDirectionY;
    if (dotProduct < 0) {
      perpDirectionX = -perpDirectionX;
      perpDirectionY = -perpDirectionY;
    }

    const offsetAbove = strokeWidth * 1.2;
    const offsetX = x + offsetAbove * perpDirectionX;
    const offsetY = y + offsetAbove * perpDirectionY;

    if (i > 0) {
      const dxSegment = x - prevX;
      const dySegment = y - prevY;
      totalLengthDrawn += Math.sqrt(dxSegment * dxSegment + dySegment * dySegment);
    }

    if (!startedDrawing && totalLengthDrawn >= startLength) {
      a.moveTo(offsetX, offsetY);
      startedDrawing = true;
    } else if (startedDrawing && totalLengthDrawn <= endLength) {
      a.lineTo(offsetX, offsetY);
    }

    if (totalLengthDrawn > endLength) break;

    prevX = x;
    prevY = y;
  }
  a.stroke();

  // Calculate the arrowhead position
  let arrowBaseX = 0;
  let arrowBaseY = 0;
  totalLengthDrawn = 0;
  prevX = startPoint.x;
  prevY = startPoint.y;
  for (let i = 0; i <= numSegmentsForLength; i++) {
    const t = i / numSegmentsForLength;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;
    if (i > 0) {
      const dxSegment = x - prevX;
      const dySegment = y - prevY;
      totalLengthDrawn += Math.sqrt(dxSegment * dxSegment + dySegment * dySegment);
    }
    if (totalLengthDrawn >= adjustedPathLength) {
      arrowBaseX = x;
      arrowBaseY = y;
      break;
    }
    prevX = x;
    prevY = y;
  }

  // Calculate direction at the end of the curve
  const tEnd = 0.99;
  const mtEnd = 1 - tEnd;
  const xEnd = mtEnd * mtEnd * mtEnd * startPoint.x + 3 * mtEnd * mtEnd * tEnd * controlPoint1.x + 3 * mtEnd * tEnd * tEnd * controlPoint2.x + tEnd * tEnd * tEnd * endPoint.x;
  const yEnd = mtEnd * mtEnd * mtEnd * startPoint.y + 3 * mtEnd * mtEnd * tEnd * controlPoint1.y + 3 * mtEnd * tEnd * tEnd * controlPoint2.y + tEnd * tEnd * tEnd * endPoint.y;
  const dxEnd = endPoint.x - xEnd;
  const dyEnd = endPoint.y - yEnd;
  const lengthEnd = Math.sqrt(dxEnd * dxEnd + dyEnd * dyEnd) || 1;
  const directionXEnd = dxEnd / lengthEnd;
  const directionYEnd = dyEnd / lengthEnd;

  const perpDirectionX = -directionYEnd;
  const perpDirectionY = directionXEnd;
  const arrowBaseWidth = strokeWidth * 2.0;

  // Define thicknesses for the arrowhead lines
  const bottomArrowHeadThickness = strokeWidth * 1.0;
  const topArrowHeadThickness = strokeWidth * 0.8;

  // Determine top and bottom wings
  const topWingX = arrowBaseX + arrowBaseWidth * perpDirectionX;
  const topWingY = arrowBaseY + arrowBaseWidth * perpDirectionY;
  const bottomWingX = arrowBaseX - arrowBaseWidth * perpDirectionX;
  const bottomWingY = arrowBaseY - arrowBaseWidth * perpDirectionY;

  // Draw the top wing of the arrowhead
  a.beginPath();
  a.lineWidth = topArrowHeadThickness;
  a.moveTo(endPoint.x, endPoint.y);
  a.lineTo(topWingX, topWingY);
  a.stroke();

  // Draw the bottom wing of the arrowhead
  a.beginPath();
  a.lineWidth = bottomArrowHeadThickness;
  a.moveTo(endPoint.x, endPoint.y);
  a.lineTo(bottomWingX, bottomWingY);
  a.stroke();
};


function La_advanced_feature_curve5(a) {
  a = a || {};
  a.S = "advanced_feature_curve5";
  La.s.constructor.apply(this, arguments);
}

P.extend(La_advanced_feature_curve5, La);

La_advanced_feature_curve5.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";
  a.strokeStyle = this.F;

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;

  const strokeWidth = customFontScrSht * 4;
  const headLength = strokeWidth * 4;
  const headWidth = strokeWidth * 3;

  const startPoint = this.M;
  const endPoint = this.G;

  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const fullLength = Math.sqrt(dx * dx + dy * dy);

  // Define control points for a smooth Bézier curve
  const controlPoint1 = {
    x: startPoint.x + dx * 0.25,
    y: startPoint.y + dy * 0.25 + (Math.abs(dx) * 0.5)
  };
  const controlPoint2 = {
    x: endPoint.x - dx * 0.25,
    y: endPoint.y - dy * 0.25 + (Math.abs(dx) * 0.5)
  };

  // Calculate the approximate length of the Bézier curve
  let pathLength = 0;
  const numSegmentsForLength = 100;
  let prevX = startPoint.x;
  let prevY = startPoint.y;
  for (let i = 1; i <= numSegmentsForLength; i++) {
    const t = i / numSegmentsForLength;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;
    const dxSegment = x - prevX;
    const dySegment = y - prevY;
    pathLength += Math.sqrt(dxSegment * dxSegment + dySegment * dySegment);
    prevX = x;
    prevY = y;
  }

  // Adjust the curve length to account for the arrowhead
  const adjustedPathLength = pathLength - headLength;
  const adjustedPathLengthfinal = adjustedPathLength+11;

  // Draw the curved line with consistent thickness
  const numSegments = 200;
  let totalLengthDrawn = 0;
  prevX = startPoint.x;
  prevY = startPoint.y;
  a.lineWidth = strokeWidth;
  a.beginPath();
  a.moveTo(startPoint.x, startPoint.y);
  for (let i = 1; i <= numSegments; i++) {
    const t = i / numSegments;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;

    const segmentLength = Math.sqrt((x - prevX) * (x - prevX) + (y - prevY) * (y - prevY));
    totalLengthDrawn += segmentLength;

    if (totalLengthDrawn > adjustedPathLengthfinal) break;

    a.lineTo(x, y);
    prevX = x;
    prevY = y;
  }
  a.stroke();

  // Calculate the arrowhead base position
  let arrowBaseX = 0;
  let arrowBaseY = 0;
  totalLengthDrawn = 0;
  prevX = startPoint.x;
  prevY = startPoint.y;
  for (let i = 0; i <= numSegmentsForLength; i++) {
    const t = i / numSegmentsForLength;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;
    if (i > 0) {
      const dxSegment = x - prevX;
      const dySegment = y - prevY;
      totalLengthDrawn += Math.sqrt(dxSegment * dxSegment + dySegment * dySegment);
    }
    if (totalLengthDrawn >= adjustedPathLength) {
      arrowBaseX = x;
      arrowBaseY = y;
      break;
    }
    prevX = x;
    prevY = y;
  }

  // Calculate direction at the end of the curve for the arrowhead
  const tEnd = 0.99;
  const mtEnd = 1 - tEnd;
  const xEnd = mtEnd * mtEnd * mtEnd * startPoint.x + 3 * mtEnd * mtEnd * tEnd * controlPoint1.x + 3 * mtEnd * tEnd * tEnd * controlPoint2.x + tEnd * tEnd * tEnd * endPoint.x;
  const yEnd = mtEnd * mtEnd * mtEnd * startPoint.y + 3 * mtEnd * mtEnd * tEnd * controlPoint1.y + 3 * mtEnd * tEnd * tEnd * controlPoint2.y + tEnd * tEnd * tEnd * endPoint.y;
  const dxEnd = endPoint.x - xEnd;
  const dyEnd = endPoint.y - yEnd;
  const lengthEnd = Math.sqrt(dxEnd * dxEnd + dyEnd * dyEnd) || 1;
  const angle = Math.atan2(dyEnd, dxEnd);

  // Draw the arrowhead triangle
  const perpAngle = angle + Math.PI / 2;
  const x1 = arrowBaseX + (headWidth / 2) * Math.cos(perpAngle);
  const y1 = arrowBaseY + (headWidth / 2) * Math.sin(perpAngle);
  const x2 = arrowBaseX - (headWidth / 2) * Math.cos(perpAngle);
  const y2 = arrowBaseY - (headWidth / 2) * Math.sin(perpAngle);

  a.beginPath();
  a.moveTo(endPoint.x, endPoint.y);
  a.lineTo(x1, y1);
  a.lineTo(x2, y2);
  a.closePath();
  a.fillStyle = this.F;
  a.fill();
};

function La_advanced_feature_curve6(a) {
  a = a || {};
  a.S = "advanced_feature_curve6";
  La.s.constructor.apply(this, arguments);
}

P.extend(La_advanced_feature_curve6, La);

La_advanced_feature_curve6.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";
  a.strokeStyle = this.F;

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;

  const strokeWidth = customFontScrSht * 4; // Adjusted to match ArrowStyle18's default strokeWidth scaling
  const arrowHeadSize = strokeWidth * 3;
  const arrowWidth = arrowHeadSize * 0.8;

  const startPoint = this.M;
  const endPoint = this.G;

  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const fullLength = Math.sqrt(dx * dx + dy * dy);

  // Define control points for a smooth Bézier curve
  const controlPoint1 = {
    x: startPoint.x + dx * 0.25,
    y: startPoint.y + dy * 0.25 + (Math.abs(dx) * 0.5)
  };
  const controlPoint2 = {
    x: endPoint.x - dx * 0.25,
    y: endPoint.y - dy * 0.25 + (Math.abs(dx) * 0.5)
  };

  // Calculate the approximate length of the Bézier curve
  let pathLength = 0;
  const numSegmentsForLength = 100;
  let prevX = startPoint.x;
  let prevY = startPoint.y;
  for (let i = 1; i <= numSegmentsForLength; i++) {
    const t = i / numSegmentsForLength;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;
    const dxSegment = x - prevX;
    const dySegment = y - prevY;
    pathLength += Math.sqrt(dxSegment * dxSegment + dySegment * dySegment);
    prevX = x;
    prevY = y;
  }

  // Adjust the curve length to account for the arrowhead
  const adjustedPathLength = pathLength - arrowHeadSize;

  // Draw the curved line with consistent thickness
  const numSegments = 200;
  let totalLengthDrawn = 0;
  prevX = startPoint.x;
  prevY = startPoint.y;
  a.lineWidth = strokeWidth;
  a.beginPath();
  a.moveTo(startPoint.x, startPoint.y);
  for (let i = 1; i <= numSegments; i++) {
    const t = i / numSegments;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;

    const segmentLength = Math.sqrt((x - prevX) * (x - prevX) + (y - prevY) * (y - prevY));
    totalLengthDrawn += segmentLength;

    if (totalLengthDrawn > adjustedPathLength) break;

    a.lineTo(x, y);
    prevX = x;
    prevY = y;
  }
  a.stroke();

  // Calculate the arrowhead base position
  let shaftEndX = 0;
  let shaftEndY = 0;
  totalLengthDrawn = 0;
  prevX = startPoint.x;
  prevY = startPoint.y;
  for (let i = 0; i <= numSegmentsForLength; i++) {
    const t = i / numSegmentsForLength;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;
    if (i > 0) {
      const dxSegment = x - prevX;
      const dySegment = y - prevY;
      totalLengthDrawn += Math.sqrt(dxSegment * dxSegment + dySegment * dySegment);
    }
    if (totalLengthDrawn >= adjustedPathLength) {
      shaftEndX = x;
      shaftEndY = y;
      break;
    }
    prevX = x;
    prevY = y;
  }

  // Calculate direction at the end of the curve for the arrowhead
  const tEnd = 0.99;
  const mtEnd = 1 - tEnd;
  const xEnd = mtEnd * mtEnd * mtEnd * startPoint.x + 3 * mtEnd * mtEnd * tEnd * controlPoint1.x + 3 * mtEnd * tEnd * tEnd * controlPoint2.x + tEnd * tEnd * tEnd * endPoint.x;
  const yEnd = mtEnd * mtEnd * mtEnd * startPoint.y + 3 * mtEnd * mtEnd * tEnd * controlPoint1.y + 3 * mtEnd * tEnd * tEnd * controlPoint2.y + tEnd * tEnd * tEnd * endPoint.y;
  const dxEnd = endPoint.x - xEnd;
  const dyEnd = endPoint.y - yEnd;
  const lengthEnd = Math.sqrt(dxEnd * dxEnd + dyEnd * dyEnd) || 1;
  const directionXEnd = dxEnd / lengthEnd;
  const directionYEnd = dyEnd / lengthEnd;

  const perpX = -directionYEnd;
  const perpY = directionXEnd;
  const halfBase = arrowWidth / 2;

  const baseX1 = shaftEndX + halfBase * perpX;
  const baseY1 = shaftEndY + halfBase * perpY;
  const baseX2 = shaftEndX - halfBase * perpX;
  const baseY2 = shaftEndY - halfBase * perpY;

  // Draw the arrowhead
  a.beginPath();
  a.moveTo(endPoint.x, endPoint.y);
  a.lineTo(baseX1, baseY1);
  a.lineTo(baseX2, baseY2);
  a.closePath();
  a.fillStyle = this.F;
  a.fill();
  a.stroke();
};

function La_advanced_feature_curve7(a) {
  a = a || {};
  a.S = "advanced_feature_curve7";
  La.s.constructor.apply(this, arguments);
}

P.extend(La_advanced_feature_curve7, La);

La_advanced_feature_curve7.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;

  const strokeWidth = customFontScrSht * 4;
  const headLength = strokeWidth * 4;
  const headWidth = strokeWidth * 3;

  const startPoint = this.M;
  const endPoint = this.G;

  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const fullLength = Math.sqrt(dx * dx + dy * dy);

  // Define control points for a smooth Bézier curve (from ArrowStyle13 logic)
  const controlPoint1 = {
    x: startPoint.x + dx / 3,
    y: startPoint.y + dy / 3 + (Math.abs(dx) * 0.3)
  };
  const controlPoint2 = {
    x: endPoint.x - dx / 3,
    y: endPoint.y - dy / 3 + (Math.abs(dx) * 0.3)
  };

  // Calculate the approximate length of the Bézier curve
  let pathLength = 0;
  const numSegmentsForLength = 100;
  let prevX = startPoint.x;
  let prevY = startPoint.y;
  for (let i = 1; i <= numSegmentsForLength; i++) {
    const t = i / numSegmentsForLength;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;
    const dxSegment = x - prevX;
    const dySegment = y - prevY;
    pathLength += Math.sqrt(dxSegment * dxSegment + dySegment * dySegment);
    prevX = x;
    prevY = y;
  }

  // Adjust the curve length to account for the arrowhead
  const adjustedPathLength = pathLength - headLength;

  // Create a linear gradient for the curve
  const gradient = a.createLinearGradient(
    startPoint.x, startPoint.y, // Start at the beginning of the curve
    endPoint.x, endPoint.y // End at the end of the curve
  );
  gradient.addColorStop(0, this.F); // Start with the stroke color
  gradient.addColorStop(1, `rgba(${parseInt(this.F.slice(1, 3), 16)}, ${parseInt(this.F.slice(3, 5), 16)}, ${parseInt(this.F.slice(5, 7), 16)}, 0.5)`); // Lighter shade

  // Draw the curved line with gradient
  const numSegments = 200;
  let totalLengthDrawn = 0;
  prevX = startPoint.x;
  prevY = startPoint.y;
  a.lineWidth = strokeWidth;
  a.strokeStyle = gradient;
  a.beginPath();
  a.moveTo(startPoint.x, startPoint.y);
  for (let i = 1; i <= numSegments; i++) {
    const t = i / numSegments;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;

    const segmentLength = Math.sqrt((x - prevX) * (x - prevX) + (y - prevY) * (y - prevY));
    totalLengthDrawn += segmentLength;

    if (totalLengthDrawn > adjustedPathLength) {
      const overshoot = totalLengthDrawn - adjustedPathLength;
      const fraction = (segmentLength - overshoot) / segmentLength;
      const adjustedX = prevX + fraction * (x - prevX);
      const adjustedY = prevY + fraction * (y - prevY);
      a.lineTo(adjustedX, adjustedY);
      break;
    }

    a.lineTo(x, y);
    prevX = x;
    prevY = y;
  }
  a.stroke();

  // Calculate the arrowhead base position
  let arrowBaseX = endPoint.x;
  let arrowBaseY = endPoint.y;
  totalLengthDrawn = 0;
  prevX = startPoint.x;
  prevY = startPoint.y;
  for (let i = 0; i <= numSegmentsForLength; i++) {
    const t = i / numSegmentsForLength;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;
    if (i > 0) {
      const dxSegment = x - prevX;
      const dySegment = y - prevY;
      totalLengthDrawn += Math.sqrt(dxSegment * dxSegment + dySegment * dySegment);
    }
    if (totalLengthDrawn >= adjustedPathLength) {
      arrowBaseX = x;
      arrowBaseY = y;
      break;
    }
    prevX = x;
    prevY = y;
  }

  // Calculate direction at the end of the curve for the arrowhead
  const tEnd = 0.99;
  const mtEnd = 1 - tEnd;
  const xEnd = mtEnd * mtEnd * mtEnd * startPoint.x + 3 * mtEnd * mtEnd * tEnd * controlPoint1.x + 3 * mtEnd * tEnd * tEnd * controlPoint2.x + tEnd * tEnd * tEnd * endPoint.x;
  const yEnd = mtEnd * mtEnd * mtEnd * startPoint.y + 3 * mtEnd * mtEnd * tEnd * controlPoint1.y + 3 * mtEnd * tEnd * tEnd * controlPoint2.y + tEnd * tEnd * tEnd * endPoint.y;
  const dxEnd = endPoint.x - xEnd;
  const dyEnd = endPoint.y - yEnd;
  const angle = Math.atan2(dyEnd, dxEnd);

  // Draw the arrowhead (ArrowStyle17 logic with gradient fill)
  const arrowBaseXForHead = endPoint.x - headLength * Math.cos(angle);
  const arrowBaseYForHead = endPoint.y - headLength * Math.sin(angle);

  const perpAngle = angle + Math.PI / 2;
  const x1 = arrowBaseXForHead + (headWidth / 2) * Math.cos(perpAngle);
  const y1 = arrowBaseYForHead + (headWidth / 2) * Math.sin(perpAngle);
  const x2 = arrowBaseXForHead - (headWidth / 2) * Math.cos(perpAngle);
  const y2 = arrowBaseYForHead - (headWidth / 2) * Math.sin(perpAngle);

  // Create a linear gradient for the arrowhead
  const headGradient = a.createLinearGradient(
    endPoint.x, endPoint.y, // Start at the tip
    arrowBaseXForHead, arrowBaseYForHead // End at the base
  );
  headGradient.addColorStop(0, this.F); // Start with the stroke color
  headGradient.addColorStop(1, `rgba(${parseInt(this.F.slice(1, 3), 16)}, ${parseInt(this.F.slice(3, 5), 16)}, ${parseInt(this.F.slice(5, 7), 16)}, 0.5)`); // Lighter shade

  a.beginPath();
  a.moveTo(endPoint.x, endPoint.y);
  a.lineTo(x1, y1);
  a.lineTo(x2, y2);
  a.closePath();
  a.fillStyle = headGradient;
  a.fill();
};




function La_advanced_feature_curve8(a) {
  a = a || {};
  a.S = "advanced_feature_curve8";
  La.s.constructor.apply(this, arguments);
}

P.extend(La_advanced_feature_curve8, La);

La_advanced_feature_curve8.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";
  a.strokeStyle = this.F;

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;

  const strokeWidth = customFontScrSht * 4; // Adjusted to match ArrowStyle20's default strokeWidth scaling
  const arrowHeadSize = strokeWidth * 4; // Increased from 3 to 4 for a longer arrowhead
  const arrowWidth = arrowHeadSize * 0.8;

  const startPoint = this.M;
  const endPoint = this.G;

  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const fullLength = Math.sqrt(dx * dx + dy * dy);

  // Define control points for a smooth Bézier curve (from ArrowStyle13 logic)
  const controlPoint1 = {
    x: startPoint.x + dx / 3,
    y: startPoint.y + dy / 3 + (Math.abs(dx) * 0.3)
  };
  const controlPoint2 = {
    x: endPoint.x - dx / 3,
    y: endPoint.y - dy / 3 + (Math.abs(dx) * 0.3)
  };

  // Calculate the approximate length of the Bézier curve
  let pathLength = 0;
  const numSegmentsForLength = 100;
  let prevX = startPoint.x;
  let prevY = startPoint.y;
  for (let i = 1; i <= numSegmentsForLength; i++) {
    const t = i / numSegmentsForLength;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;
    const dxSegment = x - prevX;
    const dySegment = y - prevY;
    pathLength += Math.sqrt(dxSegment * dxSegment + dySegment * dySegment);
    prevX = x;
    prevY = y;
  }

  // Adjust the curve length to account for the arrowhead
  const adjustedPathLength = pathLength - arrowHeadSize;

  // Draw the curved line with consistent thickness
  const numSegments = 200;
  let totalLengthDrawn = 0;
  prevX = startPoint.x;
  prevY = startPoint.y;
  a.lineWidth = strokeWidth;
  a.beginPath();
  a.moveTo(startPoint.x, startPoint.y);
  for (let i = 1; i <= numSegments; i++) {
    const t = i / numSegments;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;

    const segmentLength = Math.sqrt((x - prevX) * (x - prevX) + (y - prevY) * (y - prevY));
    totalLengthDrawn += segmentLength;

    if (totalLengthDrawn > adjustedPathLength) {
      const overshoot = totalLengthDrawn - adjustedPathLength;
      const fraction = (segmentLength - overshoot) / segmentLength;
      const adjustedX = prevX + fraction * (x - prevX);
      const adjustedY = prevY + fraction * (y - prevY);
      a.lineTo(adjustedX, adjustedY);
      break;
    }

    a.lineTo(x, y);
    prevX = x;
    prevY = y;
  }
  a.stroke();

  // Calculate the arrowhead base position
  let shaftEndX = endPoint.x;
  let shaftEndY = endPoint.y;
  totalLengthDrawn = 0;
  prevX = startPoint.x;
  prevY = startPoint.y;
  for (let i = 0; i <= numSegmentsForLength; i++) {
    const t = i / numSegmentsForLength;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;
    if (i > 0) {
      const dxSegment = x - prevX;
      const dySegment = y - prevY;
      totalLengthDrawn += Math.sqrt(dxSegment * dxSegment + dySegment * dySegment);
    }
    if (totalLengthDrawn >= adjustedPathLength) {
      shaftEndX = x;
      shaftEndY = y;
      break;
    }
    prevX = x;
    prevY = y;
  }

  // Calculate direction at the end of the curve for the arrowhead
  const tEnd = 0.99;
  const mtEnd = 1 - tEnd;
  const xEnd = mtEnd * mtEnd * mtEnd * startPoint.x + 3 * mtEnd * mtEnd * tEnd * controlPoint1.x + 3 * mtEnd * tEnd * tEnd * controlPoint2.x + tEnd * tEnd * tEnd * endPoint.x;
  const yEnd = mtEnd * mtEnd * mtEnd * startPoint.y + 3 * mtEnd * mtEnd * tEnd * controlPoint1.y + 3 * mtEnd * tEnd * tEnd * controlPoint2.y + tEnd * tEnd * tEnd * endPoint.y;
  const dxEnd = endPoint.x - xEnd;
  const dyEnd = endPoint.y - yEnd;
  const lengthEnd = Math.sqrt(dxEnd * dxEnd + dyEnd * dyEnd) || 1;
  const directionX = dxEnd / lengthEnd;
  const directionY = dyEnd / lengthEnd;

  // Draw the arrowhead with white center and colored border
  const perpX = -directionY;
  const perpY = directionX;
  const halfBase = arrowWidth / 2;

  const baseX1 = shaftEndX + halfBase * perpX;
  const baseY1 = shaftEndY + halfBase * perpY;
  const baseX2 = shaftEndX - halfBase * perpX;
  const baseY2 = shaftEndY - halfBase * perpY;

  // First pass: White fill for arrowhead
  a.beginPath();
  a.moveTo(endPoint.x, endPoint.y);
  a.lineTo(baseX1, baseY1);
  a.lineTo(baseX2, baseY2);
  a.closePath();
  a.fillStyle = 'white';
  a.fill();

  // Second pass: Colored border for arrowhead
  a.lineWidth = strokeWidth * 0.6;
  a.strokeStyle = this.F;
  a.stroke();
};




function La_advanced_feature_curve9(a) {
  a = a || {};
  a.S = "advanced_feature_curve9";
  La.s.constructor.apply(this, arguments);
}

P.extend(La_advanced_feature_curve9, La);

La_advanced_feature_curve9.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";
  a.strokeStyle = this.F;

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;

  const strokeWidth = customFontScrSht * 4;
  const headLength = strokeWidth * 4;
  const headWidth = strokeWidth * 3;

  const startPoint = this.M;
  const endPoint = this.G;

  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const fullLength = Math.sqrt(dx * dx + dy * dy);

  // Define control points for a smooth Bézier curve (from ArrowStyle13 logic)
  const controlPoint1 = {
    x: startPoint.x + dx / 3,
    y: startPoint.y + dy / 3 + (Math.abs(dx) * 0.3)
  };
  const controlPoint2 = {
    x: endPoint.x - dx / 3,
    y: endPoint.y - dy / 3 + (Math.abs(dx) * 0.3)
  };

  // Calculate the approximate length of the Bézier curve
  let pathLength = 0;
  const numSegmentsForLength = 100;
  let prevX = startPoint.x;
  let prevY = startPoint.y;
  for (let i = 1; i <= numSegmentsForLength; i++) {
    const t = i / numSegmentsForLength;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;
    const dxSegment = x - prevX;
    const dySegment = y - prevY;
    pathLength += Math.sqrt(dxSegment * dxSegment + dySegment * dySegment);
    prevX = x;
    prevY = y;
  }

  // Adjust the curve length to account for the arrowhead
  const adjustedPathLength = pathLength - headLength;

  // Draw the curved line with a white center and colored border
  const numSegments = 200;
  let totalLengthDrawn = 0;
  prevX = startPoint.x;
  prevY = startPoint.y;

  // First pass: Draw the inner white line
  a.strokeStyle = 'white';
  a.lineWidth = strokeWidth;
  a.beginPath();
  a.moveTo(startPoint.x, startPoint.y);
  for (let i = 1; i <= numSegments; i++) {
    const t = i / numSegments;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;

    const segmentLength = Math.sqrt((x - prevX) * (x - prevX) + (y - prevY) * (y - prevY));
    totalLengthDrawn += segmentLength;

    if (totalLengthDrawn > adjustedPathLength) {
      const overshoot = totalLengthDrawn - adjustedPathLength;
      const fraction = (segmentLength - overshoot) / segmentLength;
      const adjustedX = prevX + fraction * (x - prevX);
      const adjustedY = prevY + fraction * (y - prevY);
      a.lineTo(adjustedX, adjustedY);
      break;
    }

    a.lineTo(x, y);
    prevX = x;
    prevY = y;
  }
  a.stroke();

  // Second pass: Draw the outer colored border
  totalLengthDrawn = 0;
  prevX = startPoint.x;
  prevY = startPoint.y;
  a.strokeStyle = this.F;
  a.lineWidth = strokeWidth * 0.6;
  a.beginPath();
  a.moveTo(startPoint.x, startPoint.y);
  for (let i = 1; i <= numSegments; i++) {
    const t = i / numSegments;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;

    const segmentLength = Math.sqrt((x - prevX) * (x - prevX) + (y - prevY) * (y - prevY));
    totalLengthDrawn += segmentLength;

    if (totalLengthDrawn > adjustedPathLength) {
      const overshoot = totalLengthDrawn - adjustedPathLength;
      const fraction = (segmentLength - overshoot) / segmentLength;
      const adjustedX = prevX + fraction * (x - prevX);
      const adjustedY = prevY + fraction * (y - prevY);
      a.lineTo(adjustedX, adjustedY);
      break;
    }

    a.lineTo(x, y);
    prevX = x;
    prevY = y;
  }
  a.stroke();

  // Calculate the arrowhead base position
  let arrowBaseX = endPoint.x;
  let arrowBaseY = endPoint.y;
  totalLengthDrawn = 0;
  prevX = startPoint.x;
  prevY = startPoint.y;
  for (let i = 0; i <= numSegmentsForLength; i++) {
    const t = i / numSegmentsForLength;
    const mt = 1 - t;
    const x = mt * mt * mt * startPoint.x + 3 * mt * mt * t * controlPoint1.x + 3 * mt * t * t * controlPoint2.x + t * t * t * endPoint.x;
    const y = mt * mt * mt * startPoint.y + 3 * mt * mt * t * controlPoint1.y + 3 * mt * t * t * controlPoint2.y + t * t * t * endPoint.y;
    if (i > 0) {
      const dxSegment = x - prevX;
      const dySegment = y - prevY;
      totalLengthDrawn += Math.sqrt(dxSegment * dxSegment + dySegment * dySegment);
    }
    if (totalLengthDrawn >= adjustedPathLength) {
      arrowBaseX = x;
      arrowBaseY = y;
      break;
    }
    prevX = x;
    prevY = y;
  }

  // Calculate direction at the end of the curve for the arrowhead
  const tEnd = 0.99;
  const mtEnd = 1 - tEnd;
  const xEnd = mtEnd * mtEnd * mtEnd * startPoint.x + 3 * mtEnd * mtEnd * tEnd * controlPoint1.x + 3 * mtEnd * tEnd * tEnd * controlPoint2.x + tEnd * tEnd * tEnd * endPoint.x;
  const yEnd = mtEnd * mtEnd * mtEnd * startPoint.y + 3 * mtEnd * mtEnd * tEnd * controlPoint1.y + 3 * mtEnd * tEnd * tEnd * controlPoint2.y + tEnd * tEnd * tEnd * endPoint.y;
  const dxEnd = endPoint.x - xEnd;
  const dyEnd = endPoint.y - yEnd;
  const angle = Math.atan2(dyEnd, dxEnd);

  // Draw the arrowhead (ArrowStyle17 logic with border)
  const arrowBaseXForHead = endPoint.x - headLength * Math.cos(angle);
  const arrowBaseYForHead = endPoint.y - headLength * Math.sin(angle);

  const perpAngle = angle + Math.PI / 2;
  const x1 = arrowBaseXForHead + (headWidth / 2) * Math.cos(perpAngle);
  const y1 = arrowBaseYForHead + (headWidth / 2) * Math.sin(perpAngle);
  const x2 = arrowBaseXForHead - (headWidth / 2) * Math.cos(perpAngle);
  const y2 = arrowBaseYForHead - (headWidth / 2) * Math.sin(perpAngle);

  // First pass: White fill for arrowhead
  a.beginPath();
  a.moveTo(endPoint.x, endPoint.y);
  a.lineTo(x1, y1);
  a.lineTo(x2, y2);
  a.closePath();
  a.fillStyle = 'white';
  a.fill();

  // Second pass: Colored border for arrowhead
  a.lineWidth = strokeWidth * 0.6;
  a.strokeStyle = this.F;
  a.stroke();
};



















function La_advanced_feature_arrow5(a) {
  a = a || {};
  a.S = "advanced_feature_arrow5";
  La.s.constructor.apply(this, arguments);
}

P.extend(La_advanced_feature_arrow5, La);

La_advanced_feature_arrow5.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;

  const startThickness = customFontScrSht * 1;
  const endThickness = startThickness * 6;

  const arrowHeadSize = endThickness * 2;

  const outlineThickness = customFontScrSht * 2;

  const startPoint = this.M;
  const endPoint = this.G;

  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const angle = Math.atan2(dy, dx);

  const fullLineLength = Math.sqrt(dx * dx + dy * dy);

  const adjustedLineLength = fullLineLength - arrowHeadSize;

  const directionX = dx / fullLineLength;
  const directionY = dy / fullLineLength;

  let backgroundColor = getComputedStyle(document.getElementById("content")).backgroundColor;

  let rgb = backgroundColor.match(/\d+/g).map(Number);
  let luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];

  let outlineColor = luminance < 50 ? "white" : "black";
  //console.log(luminance);

  const numSegments = 200;
  a.strokeStyle = outlineColor;
  for (let i = 0; i < numSegments; i++) {
    const t1 = i / numSegments;
    const t2 = (i + 1) / numSegments;

    const x1 = startPoint.x + t1 * adjustedLineLength * directionX;
    const y1 = startPoint.y + t1 * adjustedLineLength * directionY;
    const x2 = startPoint.x + t2 * adjustedLineLength * directionX;
    const y2 = startPoint.y + t2 * adjustedLineLength * directionY;

    const currentThickness = startThickness + t1 * (endThickness - startThickness);

    a.lineWidth = currentThickness + outlineThickness;

    if (t2 * adjustedLineLength < adjustedLineLength) {
      a.beginPath();
      a.moveTo(x1, y1);
      a.lineTo(x2, y2);
      a.stroke();
    }
  }

  a.strokeStyle = this.F;
  for (let i = 0; i < numSegments; i++) {
    const t1 = i / numSegments;
    const t2 = (i + 1) / numSegments;

    const x1 = startPoint.x + t1 * adjustedLineLength * directionX;
    const y1 = startPoint.y + t1 * adjustedLineLength * directionY;
    const x2 = startPoint.x + t2 * adjustedLineLength * directionX;
    const y2 = startPoint.y + t2 * adjustedLineLength * directionY;

    const currentThickness = startThickness + t1 * (endThickness - startThickness);

    a.lineWidth = currentThickness;

    a.beginPath();
    a.moveTo(x1, y1);
    a.lineTo(x2, y2);
    a.stroke();
  }

  const arrowBaseX = startPoint.x + adjustedLineLength * directionX;
  const arrowBaseY = startPoint.y + adjustedLineLength * directionY;
  const arrowTipX = endPoint.x;
  const arrowTipY = endPoint.y;

  const arrowHeadX1 = arrowBaseX - arrowHeadSize * Math.cos(angle - Math.PI / 4);
  const arrowHeadY1 = arrowBaseY - arrowHeadSize * Math.sin(angle - Math.PI / 4);
  const arrowHeadX2 = arrowBaseX - arrowHeadSize * Math.cos(angle + Math.PI / 4);
  const arrowHeadY2 = arrowBaseY - arrowHeadSize * Math.sin(angle + Math.PI / 4);

  a.beginPath();
  a.moveTo(arrowBaseX, arrowBaseY);
  a.lineTo(arrowHeadX1, arrowHeadY1);
  a.lineTo(arrowTipX, arrowTipY);
  a.lineTo(arrowHeadX2, arrowHeadY2);
  a.closePath();
  a.lineWidth = outlineThickness + 2;
  a.strokeStyle = outlineColor;
  a.stroke();

  a.beginPath();
  a.moveTo(arrowBaseX, arrowBaseY);
  a.lineTo(arrowHeadX1, arrowHeadY1);
  a.lineTo(arrowTipX, arrowTipY);
  a.lineTo(arrowHeadX2, arrowHeadY2);
  a.closePath();
  a.fillStyle = this.F;
  a.fill();

  a.lineWidth = 3;
  a.strokeStyle = this.F;
  a.stroke();
};

// copyright design

function La_advanced_feature_arrow6(a) {
  a = a || {};
  a.S = "advanced_feature_arrow6";
  La.s.constructor.apply(this, arguments);
}

P.extend(La_advanced_feature_arrow6, La);

La_advanced_feature_arrow6.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;

  const startThickness = customFontScrSht * 1;
  const endThickness = startThickness * 6;
  const arrowHeadSize = endThickness * 2;
  const outlineThickness = customFontScrSht * 2;

  const startPoint = this.M;
  const endPoint = this.G;
  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const angle = Math.atan2(dy, dx);
  const fullLineLength = Math.sqrt(dx * dx + dy * dy);
  const adjustedLineLength = fullLineLength - arrowHeadSize;

  const directionX = dx / fullLineLength;
  const directionY = dy / fullLineLength;

  let backgroundColor = getComputedStyle(document.getElementById("content")).backgroundColor;
  let rgb = backgroundColor.match(/\d+/g).map(Number);
  let luminance = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  let outlineColor = luminance < 50 ? "white" : "black";

  const numSegments = 200;
  a.strokeStyle = outlineColor;
  for (let i = 0; i < numSegments; i++) {
    const t1 = i / numSegments;
    const t2 = (i + 1) / numSegments;

    const x1 = startPoint.x + t1 * adjustedLineLength * directionX;
    const y1 = startPoint.y + t1 * adjustedLineLength * directionY;
    const x2 = startPoint.x + t2 * adjustedLineLength * directionX;
    const y2 = startPoint.y + t2 * adjustedLineLength * directionY;

    const currentThickness = startThickness + t1 * (endThickness - startThickness);

    a.lineWidth = currentThickness + outlineThickness;

    if (t2 * adjustedLineLength < adjustedLineLength) {
      a.beginPath();
      a.moveTo(x1, y1);
      a.lineTo(x2, y2);
      a.stroke();
    }
  }

  a.strokeStyle = this.F;
  for (let i = 0; i < numSegments; i++) {
    const t1 = i / numSegments;
    const t2 = (i + 1) / numSegments;

    const x1 = startPoint.x + t1 * adjustedLineLength * directionX;
    const y1 = startPoint.y + t1 * adjustedLineLength * directionY;
    const x2 = startPoint.x + t2 * adjustedLineLength * directionX;
    const y2 = startPoint.y + t2 * adjustedLineLength * directionY;

    const currentThickness = startThickness + t1 * (endThickness - startThickness);

    a.lineWidth = currentThickness;

    a.beginPath();
    a.moveTo(x1, y1);
    a.lineTo(x2, y2);
    a.stroke();
  }

  const arrowBaseX = startPoint.x + adjustedLineLength * directionX;
  const arrowBaseY = startPoint.y + adjustedLineLength * directionY;
  const arrowTipX = endPoint.x;
  const arrowTipY = endPoint.y;

  const arrowHeadX1 = arrowBaseX - arrowHeadSize * Math.cos(angle - Math.PI / 4);
  const arrowHeadY1 = arrowBaseY - arrowHeadSize * Math.sin(angle - Math.PI / 4);
  const arrowHeadX2 = arrowBaseX - arrowHeadSize * Math.cos(angle + Math.PI / 4);
  const arrowHeadY2 = arrowBaseY - arrowHeadSize * Math.sin(angle + Math.PI / 4);

  a.beginPath();
  a.moveTo(arrowBaseX, arrowBaseY);
  a.lineTo(arrowHeadX1, arrowHeadY1);
  a.lineTo(arrowTipX, arrowTipY);
  a.lineTo(arrowHeadX2, arrowHeadY2);
  a.closePath();
  a.lineWidth = outlineThickness + 2;
  a.strokeStyle = outlineColor;
  a.stroke();

  a.beginPath();
  a.moveTo(arrowBaseX, arrowBaseY);
  a.lineTo(arrowHeadX1, arrowHeadY1);
  a.lineTo(arrowTipX, arrowTipY);
  a.lineTo(arrowHeadX2, arrowHeadY2);
  a.closePath();
  a.fillStyle = this.F;
  a.fill();
  a.lineWidth = 3;
  a.strokeStyle = this.F;
  a.stroke();

  const markerLength = fullLineLength / 2;
  let markerStartX, markerEndX;

  if (startPoint.x < endPoint.x) {
    markerStartX = arrowTipX;
    markerEndX = markerStartX + markerLength;
  } else {
    markerStartX = arrowTipX - markerLength;
    markerEndX = arrowTipX;
  }

  a.beginPath();
  a.moveTo(markerStartX, arrowTipY);
  a.lineTo(markerEndX, arrowTipY);
  a.strokeStyle = this.F;
  a.lineWidth = 2;
  a.stroke();

  let baseLineWidth = customFontScrSht / 2;
  let highlightHeight = baseLineWidth + 65;
  let markerColor = localStorage.getItem("markerColor") || "#ffff00";

  let rgbaMarkerColor = hexToRgba(markerColor, 0.3);
  a.fillStyle = rgbaMarkerColor;

  a.fillRect(markerStartX, arrowTipY - highlightHeight, markerLength, highlightHeight);
};




function Ma(a) {
  a = a || {};
  a.S = "rectangle";
  Ma.s.constructor.apply(this, arguments);
}
P.extend(Ma, X);
Ma.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";
  a.strokeStyle = this.F;

  // a.lineWidth = this.w * window.devicePixelRatio*2;
  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;

  a.lineWidth = this.w * window.devicePixelRatio * customFontScrSht;

  var b = N.Ka(this.M, this.G);
  a.strokeRect(b.x, b.y, b.c, b.b);
  console.log(b.x, b.y, b.c, b.b);
};

// copyright design

// new rectanlge starts here
function La_rect(a) {
  a = a || {};
  a.S = "highlighter";
  La_rect.s.constructor.apply(this, arguments);
}
P.extend(La_rect, X);

La_rect.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";
  a.strokeStyle = this.F;

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;
  var finallwidthhrtrr = customFontScrSht / 3;

  a.lineWidth = this.w * window.devicePixelRatio * finallwidthhrtrr;

  var b = N.Ka(this.M, this.G);

  let markerFillOption5 = localStorage.getItem("markerFillOption5") || "1";

  if (markerFillOption5 === "1") {
    if (this.F.startsWith("rgb")) {
      a.fillStyle = this.F.replace("rgb", "rgba").replace(")", ", 0.2)");
    } else if (this.F.startsWith("#")) {
      let markerColor = localStorage.getItem("markerColor") || "#ffff00"; // Default to yellow hex color

      let rgbaMarkerColor = hexToRgba(markerColor, 0.3);

      a.fillStyle = rgbaMarkerColor;
    } else {
      let markerColor = localStorage.getItem("markerColor") || "#ffff00"; // Default to yellow hex color

      let rgbaMarkerColor = hexToRgba(markerColor, 0.3);

      a.fillStyle = rgbaMarkerColor;
    }

    a.fillRect(b.x, b.y, b.c, b.b);
  }

  a.strokeRect(b.x, b.y, b.c, b.b);
  console.log(b.x, b.y, b.c, b.b);

  let startX = b.x;
  let startY = b.y + b.b;

  let adjustedLineLength = b.c * 2;
  a.lineWidth = (this.w * window.devicePixelRatio * finallwidthhrtrr) / 2;

  let endX = startX - adjustedLineLength * Math.cos(Math.PI / 4);
  let endY = startY + adjustedLineLength * Math.sin(Math.PI / 4);

  // Draw the line
  a.beginPath();
  a.moveTo(startX, startY);
  a.lineTo(endX, endY);
  a.stroke();
};

// copyright design

function La_cir(a) {
  a = a || {};
  a.S = "highlighter";
  La_cir.s.constructor.apply(this, arguments);
}

P.extend(La_cir, X);

La_cir.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";
  a.strokeStyle = this.F || "red";

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;
  var finalLineWidth = customFontScrSht / 3;

  a.lineWidth = this.w * window.devicePixelRatio * finalLineWidth;

  var b = N.Ka(this.M, this.G);
  let centerX = b.x + b.c / 2;
  let centerY = b.y + b.b / 2;
  let radius = Math.min(b.c, b.b) / 2;

  let markerFillOption5 = localStorage.getItem("markerFillOption5") || "1";

  if (markerFillOption5 === "1") {
    if (this.F.startsWith("rgb")) {
      a.fillStyle = this.F.replace("rgb", "rgba").replace(")", ", 0.3)");
    } else if (this.F.startsWith("#")) {
      let markerColor = localStorage.getItem("markerColor") || "#ffff00";

      let rgbaMarkerColor = hexToRgba(markerColor, 0.3);

      a.fillStyle = rgbaMarkerColor;
    } else {
      let markerColor = localStorage.getItem("markerColor") || "#ffff00";

      let rgbaMarkerColor = hexToRgba(markerColor, 0.3);

      a.fillStyle = rgbaMarkerColor;
    }
    a.beginPath();
    a.arc(centerX, centerY, radius, 0, 2 * Math.PI); // Full circle
    a.fill();
  }

  a.beginPath();
  a.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  a.stroke();

  let angle = Math.PI / 4;

  let startX = centerX - radius * Math.cos(angle);
  let startY = centerY + radius * Math.sin(angle);

  let lineLength = radius * 4;

  let endX = startX - lineLength * Math.sin(angle);
  let endY = startY + lineLength * Math.cos(angle);

  a.lineWidth = (this.w * window.devicePixelRatio * finalLineWidth) / 2;

  a.beginPath();
  a.moveTo(startX, startY);
  a.lineTo(endX, endY);
  a.stroke();
};

// copyright design



function La_line(a) {
  a = a || {};
  a.S = "highlighter";
  La_line.s.constructor.apply(this, arguments);
}
P.extend(La_line, X);

La_line.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";
  a.strokeStyle = this.F;

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;
  var finalllwidtth = customFontScrSht / 3;
  let baseLineWidth = this.w * window.devicePixelRatio * finalllwidtth;

  let markerFillOption5 = localStorage.getItem("markerFillOption5") || "1";

  if (markerFillOption5 === "1") {
    a.lineWidth = baseLineWidth * 2;

    let startX = this.M.x;
    let startY = this.M.y;
    let startYyy = this.M.y + 5;

    let horizontalLength = this.G.x - this.M.x;
    let horizontalEndX = this.G.x;

    a.beginPath();
    a.moveTo(startX, startY);
    a.lineTo(horizontalEndX, startY);
    a.stroke();

    let highlightHeight = baseLineWidth + 55;
    let markerColor = localStorage.getItem("markerColor") || "#ffff00";

    let rgbaMarkerColor = hexToRgba(markerColor, 0.3);

    a.fillStyle = rgbaMarkerColor;

    a.fillRect(startX, startYyy - highlightHeight, horizontalEndX - startX, highlightHeight);

    a.lineWidth = baseLineWidth / 1.5;
    let diagonalLength = horizontalLength * 2;
    let diagonalEndX = startX - diagonalLength * Math.cos(Math.PI / 4);
    let diagonalEndY = startY + diagonalLength * Math.sin(Math.PI / 4);
    a.beginPath();
    a.moveTo(startX, startY);
    a.lineTo(diagonalEndX, diagonalEndY);
    a.stroke();
  } else {
    a.lineWidth = baseLineWidth * 2;

    let startX = this.M.x;
    let startY = this.M.y;

    let horizontalLength = this.G.x - this.M.x;
    let horizontalEndX = this.G.x;

    a.beginPath();
    a.moveTo(startX, startY);
    a.lineTo(horizontalEndX, startY);
    a.stroke();

    a.lineWidth = baseLineWidth / 1.5;
    let diagonalLength = horizontalLength * 2.5;
    let diagonalEndX = startX - diagonalLength * Math.cos(Math.PI / 4);
    let diagonalEndY = startY + diagonalLength * Math.sin(Math.PI / 4);
    a.beginPath();
    a.moveTo(startX, startY);
    a.lineTo(diagonalEndX, diagonalEndY);
    a.stroke();
  }
};


 










function La_blur(a) {
  a = a || {};
  a.S = "blur";
  La_blur.s.constructor.apply(this, arguments);
}
P.extend(La_blur, X);

La_blur.prototype.u = function (ctx) {
  try {
    const blurStrength = 4; // Strong blur
    const overlayOpacity = 0.96; // Semi-transparent overlay for enhanced effect
    const overlayColor = `rgba(255, 255, 255, ${overlayOpacity})`;

    // Calculate the selected area with slight padding
    const padding = 10; // Extra pixels for the blur bleed
    const startX = Math.min(this.M.x, this.G.x) - padding;
    const startY = Math.min(this.M.y, this.G.y) - padding;
    const width = Math.abs(this.G.x - this.M.x) + 2 * padding;
    const height = Math.abs(this.G.y - this.M.y) + 2 * padding;

    // Debug: Log the calculated dimensions
 //   console.log("Blur Area -> StartX:", startX, "StartY:", startY, "Width:", width, "Height:", height);

    // Ensure valid dimensions
    if (width <= 0 || height <= 0) {
      console.warn("Invalid blur area dimensions", { startX, startY, width, height });
      return;
    }

    // Create an offscreen canvas to handle the blur effect
    const offscreenCanvas = document.createElement("canvas");
    offscreenCanvas.width = width;
    offscreenCanvas.height = height;
    const offscreenCtx = offscreenCanvas.getContext("2d");

    // Copy the selected area from the main canvas
    const imageData = ctx.getImageData(
      Math.max(0, startX),
      Math.max(0, startY),
      Math.min(ctx.canvas.width, width),
      Math.min(ctx.canvas.height, height)
    );
    offscreenCtx.putImageData(imageData, 0, 0);

    // Apply blur using CSS filter
    offscreenCtx.filter = `blur(${blurStrength}px)`;
    offscreenCtx.drawImage(offscreenCanvas, 0, 0);

    // Get the blurred image and draw it back on the main canvas
    const blurredImageData = offscreenCtx.getImageData(0, 0, width, height);
    ctx.putImageData(blurredImageData, Math.max(0, startX), Math.max(0, startY));

    // Add a semi-transparent overlay to enhance the blur effect
    ctx.fillStyle = overlayColor;
    ctx.fillRect(startX, startY, width, height);
  } catch (error) {
    console.error("Error applying blur effect:", error);
  }
}











// copyright design

function La_curly(a) {
  a = a || {};
  a.S = "curly";
  La_curly.s.constructor.apply(this, arguments);
}
P.extend(La_curly, X);

La_curly.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";
  a.strokeStyle = this.F;

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;
  var finalWidth = customFontScrSht / 3;
  let baseLineWidth = this.w * window.devicePixelRatio * finalWidth;

  let braceHeight = this.G.y - this.M.y || 100;
  let braceWidth = 10;
  let startX = this.M.x;
  let startY = this.M.y;

  a.lineWidth = baseLineWidth * 2;

  let braceOffsetX = this.G.x - this.M.x || 100;

  let markerFillOption5 = localStorage.getItem("markerFillOption5") || "1";

  if (markerFillOption5 === "1") {
    let markerColor = localStorage.getItem("markerColor") || "#ffff00";

    let rgbaMarkerColor = hexToRgba(markerColor, 0.3);

    a.fillStyle = rgbaMarkerColor;

    a.fillRect(startX, startY, braceOffsetX, braceHeight);
  }

  a.beginPath();
  a.moveTo(startX, startY);

  a.bezierCurveTo(startX - braceWidth * 2, startY + braceHeight * 0.25, startX + braceWidth * 2, startY + braceHeight * 0.25, startX, startY + braceHeight * 0.5);

  a.bezierCurveTo(startX - braceWidth * 2, startY + braceHeight * 0.75, startX + braceWidth * 2, startY + braceHeight * 0.75, startX, startY + braceHeight);
  a.stroke();

  a.beginPath();
  a.moveTo(startX + braceOffsetX, startY);

  a.bezierCurveTo(startX + braceOffsetX + braceWidth * 2, startY + braceHeight * 0.25, startX + braceOffsetX - braceWidth * 2, startY + braceHeight * 0.25, startX + braceOffsetX, startY + braceHeight * 0.5);

  a.bezierCurveTo(startX + braceOffsetX + braceWidth * 2, startY + braceHeight * 0.75, startX + braceOffsetX - braceWidth * 2, startY + braceHeight * 0.75, startX + braceOffsetX, startY + braceHeight);
  a.stroke();
};

// copyright design

function La_brackets(a) {
  a = a || {};
  a.S = "brackets";
  La_brackets.s.constructor.apply(this, arguments);
}
P.extend(La_brackets, X);

La_brackets.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";
  a.strokeStyle = this.F;

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;
  var finalWidth = customFontScrSht / 3;
  let baseLineWidth = this.w * window.devicePixelRatio * finalWidth;

  let bracketHeight = this.G.y - this.M.y || 100;
  let bracketWidth = 20;
  let startX = this.M.x;
  let startY = this.M.y;

  a.lineWidth = baseLineWidth * 2;

  let bracketOffsetX = this.G.x - this.M.x || 100;

  let markerFillOption5 = localStorage.getItem("markerFillOption5") || "1";

  if (markerFillOption5 === "1") {
    let markerColor = localStorage.getItem("markerColor") || "#ffff00";

    let rgbaMarkerColor = hexToRgba(markerColor, 0.3);

    a.fillStyle = rgbaMarkerColor;

    a.fillRect(startX, startY, bracketOffsetX, bracketHeight);
  }

  a.beginPath();
  a.moveTo(startX, startY);
  a.lineTo(startX, startY + bracketHeight);

  a.moveTo(startX, startY + bracketHeight);
  a.lineTo(startX + bracketWidth, startY + bracketHeight);

  a.moveTo(startX, startY);
  a.lineTo(startX + bracketWidth, startY);
  a.stroke();

  a.beginPath();
  a.moveTo(startX + bracketOffsetX, startY);
  a.lineTo(startX + bracketOffsetX, startY + bracketHeight);

  a.moveTo(startX + bracketOffsetX, startY + bracketHeight);
  a.lineTo(startX + bracketOffsetX - bracketWidth, startY + bracketHeight);

  a.moveTo(startX + bracketOffsetX, startY);
  a.lineTo(startX + bracketOffsetX - bracketWidth, startY);
  a.stroke();
};

// new rectablge ends here

function Mazy(a) {
  a = a || {};
  a.S = "circle";
  Mazy.s.constructor.apply(this, arguments);
}
P.extend(Mazy, X);
Mazy.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";
  a.strokeStyle = this.F;
  // a.lineWidth = this.w * window.devicePixelRatio*2;
  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;

  a.lineWidth = this.w * window.devicePixelRatio * customFontScrSht;

  a.beginPath();
  var b = N.Ka(this.M, this.G);
  //a.arc(b.x, b.y, b.c, b.b, 55)
  a.ellipse(b.x, b.y, b.c, b.b, 0, 0, Math.PI * 2);

  a.stroke();
};

// new circle ends here

function Oa(a) {
  a = a || {};
  a.S = "pencil";
  Oa.s.constructor.apply(this, arguments);
}
P.extend(Oa, Y);
Oa.prototype.u = function (a) {
  a.lineJoin = "round";
  a.lineCap = "round";
  a.strokeStyle = this.F;
  //  a.lineWidth = this.w * window.devicePixelRatio*2;

  let customFontScrSht = localStorage.getItem("customfontscrsht");
  customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;
  a.lineWidth = this.w * window.devicePixelRatio * customFontScrSht;

  if (1 == this.m.length || (2 == this.m.length && this.m[0].isEqual(this.m[1]))) (a.fillStyle = this.F), a.beginPath(), a.arc(this.m[0].x, this.m[0].y, (this.w / 2) * window.devicePixelRatio, 0, 2 * Math.PI, !1), a.fill();
  else {
    a.beginPath();
    a.moveTo(this.m[0].x, this.m[0].y);
    for (var b = 1; b < this.m.length; b++) a.lineTo(this.m[b].x, this.m[b].y);
    a.stroke();
  }
};

function Pa(a) {
  a = a || {};
  a.S = "marker";
  Pa.s.constructor.apply(this, arguments);
  this.Ia = 0.5;
}
P.extend(Pa, Oa);
Pa.prototype.u = function (a) {
  var b = a.globalAlpha;
  a.globalAlpha = this.Ia;
  Pa.s.u.apply(this, arguments);
  a.globalAlpha = b;
};

function Qa(a) {
  a = a || {};
  a.S = "text";
  Qa.s.constructor.apply(this, arguments);
  this.Ga = a.canvas;
  this.B = null;
  this.qa = "";
  this.J = null;
  this.Ha = "Arial";
  this.fa = 0;
}
P.extend(Qa, Ia);
n = Qa.prototype;
n.u = function (a) {
  if ("drawing" !== this.o && "finished" === this.o) {
    let customFontScrSht = localStorage.getItem("customfontscrsht");
    customFontScrSht = customFontScrSht ? parseFloat(customFontScrSht) : 2;
    // a.font = this.w * window.devicePixelRatio + 12 + "px " + this.Ha;
    a.font = this.w * window.devicePixelRatio * customFontScrSht + "px " + this.Ha;

    // a.font = this.w * window.devicePixelRatio + "px " + this.Ha ;

    a.fillStyle = this.F;
    a.fontWeight = "800";

    a.textBaseline = "top";
    for (var b = this.qa.split("\n"), c = 0; c < b.length; c++) a.fillText(b[c], this.J.x, this.J.y + c * this.fa);
  }
};
n.setStart = function () {};
n.setEnd = function (a) {
  if (a) {
    var b = this.Ga;
    var c = b.a.getBoundingClientRect();
    b = O.na(b.a);
    c = new w(a.x * b.x + c.left + $(document).scrollLeft(), a.y * b.y + c.top + $(document).scrollTop());
    this.B = Ha({
      Ja: c,
      color: this.F,
      width: this.w * window.devicePixelRatio,
      fontFamily: this.Ha,
    });
    this.J = a;
  }
  this.o = "drawing";
};
n.ba = function () {};
n.A = function () {
  return 0 == this.qa.length;
};
n.R = function (a) {
  this.F = a;
  this.B && this.B.R(this.F);
};
n.Z = function (a) {
  this.w = a;
  this.B && this.B.Z(this.w * window.devicePixelRatio);
};

function Ra(a) {
  function b() {
    q = null;
    h();
  }

  function c(a) {
    if (!v() || p === l.Y) return !0;
    a = U(z, a);
    m && m.ba(a);
    q = a;
    h();
    return !1;
  }

  function d(a) {
    1 != a.which && k(null);
    return !1;
  }

  function f(a) {
    if (1 != a.which) return !0;
    a = a ? U(z, a) : null;
    k(a);
    return !1;
  }

  function k(a) {
    var b = z.a;
    $(b).off("mouseup", f);
    $(b).off("mouseenter", d);
    m && m.setEnd(a);
    h();
    D[u.ha].fire();
  }

  function e(a) {
    if (1 != a.which || !v()) return !0;
    g();
    var b = {
      color: H,
      width: y(),
    };
    switch (p) {
      case l.wa:
        m = new Ka(b);
        break;
      case l.va:
        m = new La(b);
        break;
      case l.va_rect:
        m = new La_rect(b);
        break;
      case l.va_cir:
        m = new La_cir(b);
        break;
      case l.va_line:
        m = new La_line(b);
        break;
	   case l.va_blur:
        m = new La_blur(b);
        break;
			
		
      case l.va_curly:
        m = new La_curly(b);
        break;
      case l.va_advanced_feature_arrow:
        m = new La_advanced_feature_arrow(b);
        break;
      case l.va_advanced_feature_arrow2:
        m = new La_advanced_feature_arrow2(b);
        break;
      case l.va_advanced_feature_arrow3:
        m = new La_advanced_feature_arrow3(b);
        break;
      case l.va_advanced_feature_arrow4:
        m = new La_advanced_feature_arrow4(b);
        break;
      case l.va_advanced_feature_curve1:
        m = new La_advanced_feature_curve1(b);
        break;		
	      case l.va_advanced_feature_curve2:
        m = new La_advanced_feature_curve2(b);
        break;		
	      case l.va_advanced_feature_curve3:
        m = new La_advanced_feature_curve3(b);
        break;		
	      case l.va_advanced_feature_curve4:
        m = new La_advanced_feature_curve4(b);
        break;		
	      case l.va_advanced_feature_curve5:
        m = new La_advanced_feature_curve5(b);
        break;
      case l.va_advanced_feature_curve6:
        m = new La_advanced_feature_curve6(b);
        break;	
      case l.va_advanced_feature_curve7:
        m = new La_advanced_feature_curve7(b);
        break;	
      case l.va_advanced_feature_curve8:
        m = new La_advanced_feature_curve8(b);
        break;	
      case l.va_advanced_feature_curve9:
        m = new La_advanced_feature_curve9(b);
        break;	
      case l.va_advanced_feature_curve10:
        m = new La_advanced_feature_curve10(b);
        break;	
      case l.va_advanced_feature_curve11:
        m = new La_advanced_feature_curve11(b);
        break;			
		
		
		
      case l.va_advanced_feature_arrow5:
        m = new La_advanced_feature_arrow5(b);
        break;
      case l.va_advanced_feature_arrow6:
        m = new La_advanced_feature_arrow6(b);
        break;
      case l.va_brackets:
        m = new La_brackets(b);
        break;
      case l.ya:
        m = new Ma(b);
        break;
      case l.yax:
        m = new Mazy(b);
        break;

      case l.xa:
        m = new Oa(b);
        break;
      case l.aa:
        b.color = B;
        m = new Pa(b);
        break;
      case l.Y:
        b.canvas = z;
        m = new Qa(b);
        break;
      case l.selection:
        m = new SelectionTool(b);
        break;
      default:
        console.log("_startNewObject: no such tool");
    }
    m && ((a = U(z, a)), m.setStart(a));
    h();
    a = z.a;
    $(a).on("mouseup", f);
    $(a).on("mouseenter", d);
    D[u.ia].fire();
    return !1;
  }

  function g() {
    if (m) {
      if (m.$a === l.Y) {
        var a = m;
        a.qa = a.B.Wa();
        a.fa = a.B.Ta();
        var b = a.B.Ua();
        a.J = va(a.Ga, new w(b.left, b.top));
        "firefox" == ia().name ? (a.J.y += Math.round(a.fa / 10)) : "chrome" == ia().name && (a.J.y += Math.ceil(a.fa / 100));
        a.B.fb();
        a.B = null;
        a.o = "finished";
        h();
      }
      m.A() || G.push(m);
      m = null;
    }
  }

  function y() {
    var a = 0;
    switch (p) {
      case l.wa:
      case l.va:
      case l.ya:
      case l.yax:
      case l.xa:
        a = 2 * C + 3;
        break;
      case l.aa:
        a = 2 * C + 16;
        break;
      case l.Y:
        a = 4 * C + 16;
    }
    return a;
  }

  function h() {
    D[u.L].fire(null);
  }

  function v() {
    return null !== p;
  }

  function E() {
    K(null);
    h();
  }

  function K(a) {
    g();
    p = a;
  }
  var l = {
      xa: "pencil",
      wa: "line",
      va: "arrow",
      va_rect: "arrow_rect",
      va_cir: "arrow_circle",
      va_line: "arrow_line",
	  va_blur: "blur",
      va_curly: "curly_braces",
      va_advanced_feature_arrow: "advanced_feature_arrow",
      va_advanced_feature_arrow2: "advanced_feature_arrow2",
      va_advanced_feature_arrow3: "advanced_feature_arrow3",
      va_advanced_feature_arrow4: "advanced_feature_arrow4",
      va_advanced_feature_arrow5: "advanced_feature_arrow5",
      va_advanced_feature_arrow6: "advanced_feature_arrow6",

      va_advanced_feature_curve1: "advanced_feature_curve1",
      va_advanced_feature_curve2: "advanced_feature_curve2",
      va_advanced_feature_curve3: "advanced_feature_curve3",
      va_advanced_feature_curve4: "advanced_feature_curve4",
      va_advanced_feature_curve5: "advanced_feature_curve5",
      va_advanced_feature_curve6: "advanced_feature_curve6",
      va_advanced_feature_curve7: "advanced_feature_curve7",
      va_advanced_feature_curve8: "advanced_feature_curve8",
      va_advanced_feature_curve9: "advanced_feature_curve9",
      va_advanced_feature_curve10: "advanced_feature_curve10",
      va_advanced_feature_curve11: "advanced_feature_curve11",


      va_brackets: "brackets",
      yax: "circle",
      ya: "rectangle",
      aa: "marker",
      Y: "text",
      selection: "selection", // 新增工具类型
    },
    u = {
      ia: "selectStart",
      ha: "selectEnd",
      L: "redraw",
    },
    H = window.localStorage.mainColor || "#ff0000",
    B = window.localStorage.markerColor || "#ffff00",
    C = 0,
    p = null,
    z = new ua(a),
    G = [],
    m = null,
    D = {},
    q = null;
  D[u.ia] = $.Callbacks();
  D[u.ha] = $.Callbacks();
  D[u.L] = $.Callbacks();
  (function () {
    var a = z.a;
    $(a).on("mousedown", e);
    $(a).on("mousemove", c);
    $(a).on("mouseleave", b);
  })();
  return {
    ib: K,
    R: function (a) {
      p === l.aa ? ((B = a), (window.localStorage.markerColor = B)) : ((H = a), (window.localStorage.mainColor = H));
      m && m.R(a);
    },
    ca: function () {
      return p === l.aa ? B : H;
    },
    jb: E,
    ea: v,
    Sa: function () {
      return p;
    },
    ga: function (a, b) {
      if (a && b) {
        for (a = 0; a < G.length; a++) G[a].u(b);
        m && m.u(b);
        v() && p !== l.Y && q && ((a = y()), (b.lineJoin = "round"), (b.strokeStyle = "black"), (b.lineWidth = 1 * window.devicePixelRatio), b.beginPath(), b.arc(q.x, q.y, (a / 2) * window.devicePixelRatio, 0, 2 * Math.PI, !0), b.stroke());
      }
    },
    kb: function () {
      g();
      G.pop();
      0 === G.length && E();
      h();
    },
    Pa: function () {
      v() && 0 < C && (--C, m && m.Z(y()), h());
    },
    Xa: function () {
      v() && 10 > C && ((C += 1), m && m.Z(y()), h());
    },
    mb: l,
    D: u,
    attachEvent: function (a, b) {
      "undefined" !== typeof D[a] && D[a].add(b);
    },
    detachEvent: function (a, b) {
      "undefined" !== typeof D[a] && D[a].remove(b);
    },
  };
}

function Sa() {
  function a(a) {
    var b = document.createElement("canvas");
    b.width = a.c;
    b.height = a.b;
    var c = b.getContext("2d"),
      f = new Image();
    f.src = d;
    c.drawImage(f, a.x, a.y, a.c, a.b, 0, 0, a.c, a.b);
    return b;
  }

  function b(a, b) {
    var c = new Image();
    c.src = a;
    c.onload = function () {
      var d = c.width * window.devicePixelRatio,
        e = c.height * window.devicePixelRatio,
        f = document.createElement("canvas");
      f.width = d;
      f.height = e;
      f.getContext("2d").drawImage(c, 0, 0, c.width, c.height, 0, 0, d, e);
      a = f.toDataURL();
      b(a);
    };
  }
  var c = null,
    d = null;
  return {
    load: function (a, k) {
      c = a;
      chrome.runtime.sendMessage(
        {
          name: "load_screenshot",
          id: c,
        },
        function (a) {
          "firefox" != ia().name || 1 == window.devicePixelRatio
            ? ((d = a), k(d))
            : b(a, function (a) {
                d = a;
                k(d);
              });
        }
      );
    },
    nb: function (b) {
      return a(b).toDataURL();
    },
    Ra: a,
  };
}
var Zuyy = new Date().toLocaleTimeString().replaceAll(":", "_").replaceAll(" ", "_");
var finalfilenamme = "scrsht.com_" + Zuyy + ".png";

async function mergeImages(backgroundBase64, foregroundBase64) {
  return new Promise((resolve) => {
    // 创建一个新的 Image 对象
    const backgroundImage = new Image();
    const foregroundImage = new Image();

    // 设置跨域属性以避免 CORS 错误
    backgroundImage.crossOrigin = "Anonymous";
    foregroundImage.crossOrigin = "Anonymous";

    // 处理背景图加载完成
    backgroundImage.onload = () => {
      // 处理前景图加载完成
      foregroundImage.onload = async () => {
        // 创建 Canvas 元素
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // 设置 Canvas 大小为背景图大小
        canvas.width = backgroundImage.width;
        canvas.height = backgroundImage.height;

        // 在 Canvas 上绘制背景图和前景图
        ctx.drawImage(backgroundImage, 0, 0);
        ctx.drawImage(foregroundImage, 0, 0); // 根据需要调整位置

        // 获取新的 Base64 字符串
        const newBase64 = canvas.toDataURL("image/png");

        let src = await cropImage(newBase64, xys[0][0], xys[0][1], xys[3][0] - xys[0][0], xys[3][1] - xys[0][1]);
        resolve(src);
      };

      // 设置前景图的 src
      foregroundImage.src = foregroundBase64;
    };

    // 设置背景图的 src
    backgroundImage.src = backgroundBase64;
  });
}

function cropImage(base64Image, sourceX, sourceY, sourceWidth, sourceHeight) {
  // 创建一个新的 Image 对象
  const image = new Image();

  // 返回一个 Promise，以便处理异步加载图像
  return new Promise((resolve, reject) => {
    image.onload = () => {
      // 创建画布
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // 设置画布大小
      canvas.width = sourceWidth;
      canvas.height = sourceHeight;

      // 绘制指定区域
      ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, sourceWidth, sourceHeight);

      // 获取裁剪后的图像的 Base64 数据
      const croppedImage = canvas.toDataURL("image/png");
      resolve(croppedImage);
    };

    image.onerror = () => {
      reject(new Error("Image load error"));
    };

    // 设置图像的 src 属性为 Base64 数据
    image.src = base64Image;
  });
}

var Z = (function () {
    async function a(a) {
      console.log(a);
      //把这个canvas转换成base64
      a = a.toDataURL("image/png");






      // if (window.location.href.includes("&mode=allShow") || window.location.href.includes("&mode=allPage")) {
      //   const canvas = document.createElement("canvas");
      //   const ctx = canvas.getContext("2d");
      //   let image = document.querySelector("#content img");
      //   canvas.width = image.width;
      //   canvas.height = image.height;
      //   ctx.drawImage(image, 0, 0);
      //   const background = canvas.toDataURL("image/png");
      //   console.log(background);

      //   a = await mergeImages(background, a);
      //   console.log(a);
      // }else{
      //   console.log(a);

      //   a = await cropImage(a, xys[0][0] +5, xys[0][1] + 5, xys[3][0] - xys[0][0] -5,xys[3][1] - xys[0][1] -5 );
      // }
      //   console.log(xys[0][0] +5, xys[0][1] + 5, xys[3][0] - xys[0][0] -5,xys[3][1] - xys[0][1] -5);
      //   console.log(a);

      chrome.downloads.download(
        {
          url: a,
          filename: finalfilenamme,
          saveAs: !0,
        },
        function (a) {
          a
            ? (function e(a) {
                chrome.downloads.search(
                  {
                    id: a,
                  },
                  function (b) {
                    b[0] &&
                      ("in_progress" === b[0].state
                        ? window.setTimeout(function () {
                            e(a);
                          }, 100)
                        : c());
                  }
                );
              })(a)
            : c();
        }
      );
    }

    function b(a) {
      function b(a) {
        e && e == a.id && a.state && "in_progress" != a.state.current && (URL.revokeObjectURL(d), browser.downloads.onChanged.removeListener(b), c());
      }
      a = Uint8Array.from(atob(a.split(",")[1]), function (a) {
        return a.charCodeAt(0);
      });
      var d = URL.createObjectURL(
          new Blob([a], {
            type: "image/png",
          })
        ),
        e;
      browser.downloads.onChanged.addListener(b);
      browser.downloads
        .download({
          url: d,
          filename: "Screenshot.png",
        })
        .then(function (a) {
          e = a;
        });
    }

    function c() {
      chrome.runtime.sendMessage(
        {
          name: "close_screenshot_window",
        },
        function () {}
      );
    }
    return {
      close: c,
      upload: function (a) {
        a.dataUrl &&
          ra.hb("upload_scrn_", a, function (a) {
            chrome.runtime.sendMessage(
              {
                name: "upload_screenshot",
                id: a,
              },
              function () {
                c();
              }
            );
          });
      },
      save: function (c) {
        c && ("firefox" == ia().name ? b(c) : a(c));
      },
pdf: function (base64Image) {
    try {
        if (!base64Image) {
            console.error("No Base64 image data provided.");
            return;
        }

     //    console.log("Base64 image type:", typeof base64Image);

        if (typeof base64Image !== "string") {
            if (base64Image instanceof HTMLCanvasElement) {
                 base64Image = base64Image.toDataURL("image/png");
            } else if (base64Image instanceof HTMLImageElement) {
                 base64Image = base64Image.src;
            } else {
                console.error("Unsupported Base64 image type:", base64Image);
                return;
            }
        }

      //  console.log("Base64 image data:", base64Image);

        // Ensure the Base64 string has the correct prefix
        if (!base64Image.startsWith("data:image")) {
          //  console.warn("Base64 image does not have a valid prefix. Adding 'data:image/png;base64,' prefix.");
            base64Image = `data:image/png;base64,${base64Image}`;
        }

        // Import jsPDF
        const { jsPDF } = window.jspdf;

        // Create a new Image element to load the Base64 image
        const image = new Image();
        image.onload = () => {
            // Retrieve the actual dimensions of the image
            const imageWidth = image.naturalWidth;
            const imageHeight = image.naturalHeight;

         //   console.log("Image dimensions:", { width: imageWidth, height: imageHeight });

            // Convert dimensions to points (1 pt = 0.75 pixels at 96 DPI)
            const pdfWidth = imageWidth * 0.75;
            const pdfHeight = imageHeight * 0.75;

            console.log("PDF dimensions (points):", { width: pdfWidth, height: pdfHeight });

            // Initialize the PDF with custom dimensions
            const pdf = new jsPDF({
                orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
                unit: "pt",
                format: [pdfWidth, pdfHeight],
            });

            // Add the image to the PDF
            pdf.addImage(base64Image, "PNG", 0, 0, pdfWidth, pdfHeight);
var Zuyy11 = new Date().toLocaleTimeString().replaceAll(":", "_").replaceAll(" ", "_");
var finalfilenammeyy = "scrsht.com_" + Zuyy11 + ".pdf";
            // Save the generated PDF
            pdf.save(finalfilenammeyy);
        };

        image.onerror = (err) => {
            console.error("Error loading image for PDF generation.", err);
        };

        // Assign the Base64 image source
        image.src = base64Image;
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
}





,


   
      Na: function (a) {
        a = new ClipboardItem({
          "image/png": a,
        });
        navigator.clipboard.write([a]).then(
          function () {
            c();
          },
          function () {}
        );
      },
      print: function (a) {
        if (a) {
          var b = document.createElement("iframe");
          b.style.visibility = "hidden";
          b.style.position = "fixed";
          b.style.width = "0";
          b.style.height = "0";
          b.style.right = "0";
          b.style.bottom = "0";
          b.onload = function () {
            var c = b.contentWindow.document,
              d = c.getElementsByTagName("body")[0];
            d.style.margin = "0";
            d.style.padding = "0";
            d.style.textAlign = "center";
            c = c.createElement("img");
            c.onload = function () {
              b.contentWindow.print();
            };
            c.src = a;
            O.ra(c);
            d.appendChild(c);
          };
          document.getElementsByTagName("body")[0].appendChild(b);
        }
      },
    };
  })(),
  Ta = (function () {
    function a() {
      $(window).on("mousewheel", function (a) {
        x.ea() && (0 < a.deltaY ? c() : 0 > a.deltaY && d());
      });
      $(window).on("contextmenu", !1);
    }

    function b() {
      function a(a, b) {
        $(window).on("keydown", null, a, b);
      }

      function b(a, b) {
        $(window).on("keydown", null, a, b);
        $(document).on("keydown", "textarea", a, b);
      }
      var g = ta.Da(window).id;
      b("esc", f);
      b(g + "+=", d);
      b(g + "+-", c);
      b(g + "+c", function () {
        l();
        return !1;
      });
      b(g + "+s", function () {
        e();
        Z.save(B());
        return !1;
      });
      b(g + "+y", function () {
        e();
        Z.pdf(B());
        return !1;
      });	  
	  
      b(g + "+x", function () {
        e();
        Z.close();
        return !1;
      });
      b(g + "+d", function () {
        u();
        return !1;
      });
      b(g + "+p", function () {
        e();
        Z.print(B());
        return !1;
      });
      b(g + "+z", function () {
        K();
        return !1;
      });
      a(g + "+a", function () {
        q.eb();
        return !1;
      });
      a("up", function () {
        q.offset(0, -1);
        return !1;
      });
      a("down", function () {
        q.offset(0, 1);
        return !1;
      });
      a("left", function () {
        q.offset(-1, 0);
        return !1;
      });
      a("right", function () {
        q.offset(1, 0);
        return !1;
      });
      a("shift+up", function () {
        q.da(0, -1);
        return !1;
      });
      a("shift+down", function () {
        q.da(0, 1);
        return !1;
      });
      a("shift+left", function () {
        q.da(-1, 0);
        return !1;
      });
      a("shift+right", function () {
        q.da(1, 0);
        return !1;
      });
    }

    function c() {
      x.Pa();
      return !1;
    }

    function d() {
      x.Xa();
      return !1;
    }

    function f() {
      x.ea() ? e() : Z.close();
    }

    function k(a) {
      switch (a) {
        case "close":
          e();
          Z.close();
          break;
        case "upload":
          u();
          break;
        case "save":
          Z.save(mySrc());
          // e();
          break;  
	   case "pdf":
          Z.pdf(mySrcpdf());
          // e();
          break;   	  
        case "copy":
          l();
          break;
        case "print":
          e();
          Z.print(B());
          break;
        case "search_google":
          u("search_google");
          break;
        case "share_whatsapp":
          u("share_whatsapp");
          break;
        case "share_twitter":
          u("share_twitter");
          break;
        case "share_facebook":
          u("share_facebook");
          break;
        case "share_vk":
          u("share_vk");
          break;
        case "share_pinterest":
          u("share_pinterest");
          break;
        case "pencil":
        case "line":
        case "arrow":
        case "arrow_rect":
        case "arrow_circle":
        case "arrow_line":
        case "curly_braces":
		case "blur":
        case "advanced_feature_arrow":
        case "advanced_feature_arrow2":
        case "advanced_feature_arrow3":
        case "advanced_feature_arrow4":
        case "advanced_feature_arrow5":
        case "advanced_feature_arrow6":
		case "advanced_feature_curve1":
        case "advanced_feature_curve2":
        case "advanced_feature_curve3":
        case "advanced_feature_curve4":
        case "advanced_feature_curve5":
        case "advanced_feature_curve6":
        case "advanced_feature_curve7":
        case "advanced_feature_curve8":
        case "advanced_feature_curve9":
        case "advanced_feature_curve10":
        case "advanced_feature_curve11":
        case "brackets":
        case "circle":
        case "rectangle":
        case "marker":
		case "blur":
        case "text":
        case "selection":
          x.ea() && x.Sa() === a ? e() : (x.ib(a), r.gb(a, "active"), r.ta(x.ca()), q.lock());
          break;
        case "undo":
          K();
      }
    }

    function e() {
      x.jb();
      r.Ca();
      q.unlock();
    }

    function g(a) {
      var b = Q.a,
        c = Q.Za;
      b && c && (c.clearRect(0, 0, b.width, b.height), x.ga(b, c, a), q.ga(b, c, a));
    }

    function y() {
      r.Ma();
    }

    function yx() {
      r.Mazy();
    }

    function h() {
      r.Ea();
    }

    function v(a) {
      a.rect.A() || (r.Ma(), r.ua(a.rect));
    }

    document.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      K();
    });

    function vx(a) {
      a.rect.A() || (r.Mazy(), r.ua(a.rect));
    }

    function E() {
      r.Ea();
    }

    function K() {
      x.kb();
      x.ea() || (r.Ca(), q.unlock());
      //	console.log('55664645');
    }

    function l() {
      e();
      var a = C();
      a &&
        a.toBlob(function (a) {
          Z.Na(a);
        }, "image/png");
    }
    function mySrc() {
      var a = C();
      console.log(a);
      return a;
    }

    function mySrcpdf() {
      var a = C();
      console.log(a);
      return a;
    }
    function u(a) {
      e();
      Z.upload(H(a));
    }

    function H(a) {
      var b = {
        dataUrl: B(),
        size: q.I().size(),
        dpr: window.devicePixelRatio,
      };
      a && (b.cmdAfterUpload = a);
      return b;
    }

    function B() {
      var a = C();
      return null != a ? a.toDataURL() : null;
    }

    function C() {
      if (q.I().A()) return null;
      var a = D.Ra(q.I()),
        b = q.I(),
        c = a.getContext("2d");
      c.translate(-b.x, -b.y);
      x.ga(a, c, null);
      return a;
    }

    function p() {
      $("#color").colpick({
        colorScheme: "dark",
        layout: "rgbhex",
        color: x.ca(),
        onShow: function (a) {
          $("#color").colpickSetColor(x.ca(), !0);
          var b = M(T(Q, q.I())),
            c = Math.max(b.x - 3 - $(a).width(), 0);
          b = Math.max(b.y - 3 - $(a).height(), 0);
          $(a).css({
            left: c + "px",
            top: b + "px",
          });
        },
        onSubmit: function (a, b, c, d) {
          a = "#" + b;
          r.ta(a);
          x.R(a);
          $(d).colpickHide();
        },
      });
      $(Q.a).on("mousedown", function () {
        $("#color").colpickHide();
      });
      r.ta(x.ca());
    }

    function z(a) {
      if (m.complete) a && a();
      else
        $(m).on("load", function Na() {
          $(m).off("load", Na);
          a && a();
        });
    }




    function G(a) {
      var b = document.getElementById("content");
      b && ((m = document.createElement("img")), (m.src = a), O.ra(m), b.appendChild(m));
    }
    var m = null,
      D = null,
      q = null,
      r = null,
      x = null,
      Q = null;
    return {
      pa: function () {
        r = Ga();
        r.attachEvent(r.D.C, k);
        D = Sa();
        D.load(qa.Va("id"), function (c) {
          G(c);
          z(function () {
            Q = new wa(m);
            x = Ra(Q.a);
            x.attachEvent(x.D.ia, h);
            x.attachEvent(x.D.ha, y);
            x.attachEvent(x.D.L, g);
            q = xa(Q.a);
            q.attachEvent(q.D.ja, E);
            q.attachEvent(q.D.N, v);
            q.attachEvent(q.D.L, g);
            q.clear();
            p();
            b();
            a();
          });
        });
      },
    };
  })();
jQuery(function () {
  Ta.pa();
});

function SelectionTool(a) {
  this.color = a.color || "#ff0000";
  this.width = a.width || 10;
  this.start = null;
  this.end = null;
  this.state = "new";
}

SelectionTool.prototype.setStart = function (a) {
  this.start = a;
  this.state = "drawing";
};

SelectionTool.prototype.setEnd = function (a) {
  this.end = a;
  this.state = "finished";
};

SelectionTool.prototype.ba = function (a) {
  if (this.state === "drawing") {
    this.end = a;
  }
};

SelectionTool.prototype.u = function (a) {
  if (this.start && this.end) {
    a.strokeStyle = this.color;
    a.lineWidth = this.width;
    a.strokeRect(this.start.x, this.start.y, this.end.x - this.start.x, this.end.y - this.start.y);
    console.log(this.start.x, this.start.y, this.end.x - this.start.x, this.end.y - this.start.y);
  }
};

SelectionTool.prototype.A = function () {
  return !this.start || !this.end;
};


let xys = [];
let ssssss
// if(window.location.href.includes('mode=allShow') || window.location.href.includes('mode=allPage') ){
	if(
	window.location.href.includes('mode=allShow') || 
	window.location.href.includes('mode=allPage')  || 
	window.location.href.includes('mode=capturesave')  || 
	window.location.href.includes('mode=capturecopy')

	){

	
	
  ssssss = setInterval(() => {
   const targetElement = $('body > canvas');

// 计算元素的中心坐标
const rect = targetElement[0].getBoundingClientRect();
const centerX = rect.left + rect.width / 2;
const centerY = rect.top + rect.height / 2;

// 创建一个新的 jQuery 事件对象
const event = $.Event("dblclick", {
    bubbles: true,
    cancelable: true,
    clientX: centerX,
    clientY: centerY,
    button: 0, // 0 表示左键
    buttons: 1 // 表示当前按下的按钮
});

// 触发事件
targetElement.trigger(event);
   
  }, 100);
}






 










