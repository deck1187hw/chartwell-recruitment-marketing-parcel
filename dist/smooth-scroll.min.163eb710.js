// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"assets/js/smooth-scroll.min.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! Copyright (c) Go Make Things, LLC

https://github.com/cferdinandi/smooth-scroll

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS 
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
!function (a, b) {
  "function" == typeof define && define.amd ? define([], b(a)) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = b(a) : a.smoothScroll = b(a);
}("undefined" != typeof global ? global : this.window || this.global, function (a) {
  "use strict";

  var d,
      e,
      f,
      g,
      h,
      i,
      j,
      b = {},
      c = "querySelector" in document && "addEventListener" in a,
      k = {
    selector: "[data-scroll]",
    selectorHeader: null,
    speed: 500,
    easing: "easeInOutCubic",
    offset: 0,
    callback: function callback() {}
  },
      l = function l() {
    var a = {},
        b = !1,
        c = 0,
        d = arguments.length;
    "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (b = arguments[0], c++);

    for (var e = function e(c) {
      for (var d in c) {
        Object.prototype.hasOwnProperty.call(c, d) && (b && "[object Object]" === Object.prototype.toString.call(c[d]) ? a[d] = l(!0, a[d], c[d]) : a[d] = c[d]);
      }
    }; c < d; c++) {
      var f = arguments[c];
      e(f);
    }

    return a;
  },
      m = function m(a) {
    return Math.max(a.scrollHeight, a.offsetHeight, a.clientHeight);
  },
      n = function n(a, b) {
    var e,
        f,
        c = b.charAt(0),
        d = "classList" in document.documentElement;

    for ("[" === c && (b = b.substr(1, b.length - 2), e = b.split("="), e.length > 1 && (f = !0, e[1] = e[1].replace(/"/g, "").replace(/'/g, ""))); a && a !== document && 1 === a.nodeType; a = a.parentNode) {
      if ("." === c) if (d) {
        if (a.classList.contains(b.substr(1))) return a;
      } else if (new RegExp("(^|\\s)" + b.substr(1) + "(\\s|$)").test(a.className)) return a;
      if ("#" === c && a.id === b.substr(1)) return a;

      if ("[" === c && a.hasAttribute(e[0])) {
        if (!f) return a;
        if (a.getAttribute(e[0]) === e[1]) return a;
      }

      if (a.tagName.toLowerCase() === b) return a;
    }

    return null;
  },
      o = function o(a) {
    "#" === a.charAt(0) && (a = a.substr(1));

    for (var e, b = String(a), c = b.length, d = -1, f = "", g = b.charCodeAt(0); ++d < c;) {
      if (e = b.charCodeAt(d), 0 === e) throw new InvalidCharacterError("Invalid character: the input contains U+0000.");
      f += e >= 1 && e <= 31 || 127 == e || 0 === d && e >= 48 && e <= 57 || 1 === d && e >= 48 && e <= 57 && 45 === g ? "\\" + e.toString(16) + " " : e >= 128 || 45 === e || 95 === e || e >= 48 && e <= 57 || e >= 65 && e <= 90 || e >= 97 && e <= 122 ? b.charAt(d) : "\\" + b.charAt(d);
    }

    return "#" + f;
  },
      p = function p(a, b) {
    var c;
    return "easeInQuad" === a && (c = b * b), "easeOutQuad" === a && (c = b * (2 - b)), "easeInOutQuad" === a && (c = b < .5 ? 2 * b * b : -1 + (4 - 2 * b) * b), "easeInCubic" === a && (c = b * b * b), "easeOutCubic" === a && (c = --b * b * b + 1), "easeInOutCubic" === a && (c = b < .5 ? 4 * b * b * b : (b - 1) * (2 * b - 2) * (2 * b - 2) + 1), "easeInQuart" === a && (c = b * b * b * b), "easeOutQuart" === a && (c = 1 - --b * b * b * b), "easeInOutQuart" === a && (c = b < .5 ? 8 * b * b * b * b : 1 - 8 * --b * b * b * b), "easeInQuint" === a && (c = b * b * b * b * b), "easeOutQuint" === a && (c = 1 + --b * b * b * b * b), "easeInOutQuint" === a && (c = b < .5 ? 16 * b * b * b * b * b : 1 + 16 * --b * b * b * b * b), c || b;
  },
      q = function q(a, b, c) {
    var d = 0;
    if (a.offsetParent) do {
      d += a.offsetTop, a = a.offsetParent;
    } while (a);
    return d = Math.max(d - b - c, 0), Math.min(d, s() - r());
  },
      r = function r() {
    return Math.max(document.documentElement.clientHeight, a.innerHeight || 0);
  },
      s = function s() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
  },
      t = function t(a) {
    return a && "object" == (typeof JSON === "undefined" ? "undefined" : _typeof(JSON)) && "function" == typeof JSON.parse ? JSON.parse(a) : {};
  },
      u = function u(a) {
    return a ? m(a) + a.offsetTop : 0;
  },
      v = function v(b, c, d) {
    d || (b.focus(), document.activeElement.id !== b.id && (b.setAttribute("tabindex", "-1"), b.focus(), b.style.outline = "none"), a.scrollTo(0, c));
  };

  b.animateScroll = function (b, c, e) {
    var f = t(c ? c.getAttribute("data-options") : null),
        i = l(d || k, e || {}, f),
        m = "[object Number]" === Object.prototype.toString.call(b),
        n = m || !b.tagName ? null : b;

    if (m || n) {
      var o = a.pageYOffset;
      i.selectorHeader && !g && (g = document.querySelector(i.selectorHeader)), h || (h = u(g));

      var z,
          A,
          r = m ? b : q(n, h, parseInt(i.offset, 10)),
          w = r - o,
          x = s(),
          y = 0,
          B = function B(d, e, f) {
        var g = a.pageYOffset;
        (d == e || g == e || a.innerHeight + g >= x) && (clearInterval(f), v(b, e, m), i.callback(b, c));
      },
          C = function C() {
        y += 16, z = y / parseInt(i.speed, 10), z = z > 1 ? 1 : z, A = o + w * p(i.easing, z), a.scrollTo(0, Math.floor(A)), B(A, r, j);
      },
          D = function D() {
        clearInterval(j), j = setInterval(C, 16);
      };

      0 === a.pageYOffset && a.scrollTo(0, 0), D();
    }
  };

  var w = function w(c) {
    a.location.hash;
    e && (e.id = e.getAttribute("data-scroll-id"), b.animateScroll(e, f), e = null, f = null);
  },
      x = function x(b) {
    if (0 === b.button && !b.metaKey && !b.ctrlKey && (f = n(b.target, d.selector), f && "a" === f.tagName.toLowerCase() && f.hostname === a.location.hostname && f.pathname === a.location.pathname && /#/.test(f.href))) {
      var c = o(f.hash);

      if ("#" === c) {
        b.preventDefault(), e = document.body;
        var g = e.id ? e.id : "smooth-scroll-top";
        return e.setAttribute("data-scroll-id", g), e.id = "", void (a.location.hash.substring(1) === g ? w() : a.location.hash = g);
      }

      e = document.querySelector(c), e && (e.setAttribute("data-scroll-id", e.id), e.id = "", f.hash === a.location.hash && (b.preventDefault(), w()));
    }
  },
      y = function y(a) {
    i || (i = setTimeout(function () {
      i = null, h = u(g);
    }, 66));
  };

  return b.destroy = function () {
    d && (document.removeEventListener("click", x, !1), a.removeEventListener("resize", y, !1), d = null, e = null, f = null, g = null, h = null, i = null, j = null);
  }, b.init = function (e) {
    c && (b.destroy(), d = l(k, e || {}), g = d.selectorHeader ? document.querySelector(d.selectorHeader) : null, h = u(g), document.addEventListener("click", x, !1), a.addEventListener("hashchange", w, !1), g && a.addEventListener("resize", y, !1));
  }, b;
});
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57620" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/js/smooth-scroll.min.js"], null)
//# sourceMappingURL=/smooth-scroll.min.163eb710.js.map