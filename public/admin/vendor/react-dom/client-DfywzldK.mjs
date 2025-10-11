import hy from "react";
import dy from "react-dom";
var ac = {}, U0 = { exports: {} }, D0 = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(l) {
  function a(M, B) {
    var _ = M.length;
    M.push(B);
    l: for (; 0 < _; ) {
      var r = _ - 1 >>> 1, fl = M[r];
      if (0 < e(fl, B))
        M[r] = B, M[_] = fl, _ = r;
      else break l;
    }
  }
  function t(M) {
    return M.length === 0 ? null : M[0];
  }
  function u(M) {
    if (M.length === 0) return null;
    var B = M[0], _ = M.pop();
    if (_ !== B) {
      M[0] = _;
      l: for (var r = 0, fl = M.length, ku = fl >>> 1; r < ku; ) {
        var ru = 2 * (r + 1) - 1, En = M[ru], Ja = ru + 1, Iu = M[Ja];
        if (0 > e(En, _))
          Ja < fl && 0 > e(Iu, En) ? (M[r] = Iu, M[Ja] = _, r = Ja) : (M[r] = En, M[ru] = _, r = ru);
        else if (Ja < fl && 0 > e(Iu, _))
          M[r] = Iu, M[Ja] = _, r = Ja;
        else break l;
      }
    }
    return B;
  }
  function e(M, B) {
    var _ = M.sortIndex - B.sortIndex;
    return _ !== 0 ? _ : M.id - B.id;
  }
  if (l.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
    var n = performance;
    l.unstable_now = function() {
      return n.now();
    };
  } else {
    var f = Date, c = f.now();
    l.unstable_now = function() {
      return f.now() - c;
    };
  }
  var i = [], h = [], g = 1, b = null, m = 3, S = !1, A = !1, U = !1, Z = !1, y = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, d = typeof setImmediate < "u" ? setImmediate : null;
  function z(M) {
    for (var B = t(h); B !== null; ) {
      if (B.callback === null) u(h);
      else if (B.startTime <= M)
        u(h), B.sortIndex = B.expirationTime, a(i, B);
      else break;
      B = t(h);
    }
  }
  function E(M) {
    if (U = !1, z(M), !A)
      if (t(i) !== null)
        A = !0, H || (H = !0, sa());
      else {
        var B = t(h);
        B !== null && Mn(E, B.startTime - M);
      }
  }
  var H = !1, T = -1, O = 5, N = -1;
  function X() {
    return Z ? !0 : !(l.unstable_now() - N < O);
  }
  function Ql() {
    if (Z = !1, H) {
      var M = l.unstable_now();
      N = M;
      var B = !0;
      try {
        l: {
          A = !1, U && (U = !1, v(T), T = -1), S = !0;
          var _ = m;
          try {
            a: {
              for (z(M), b = t(i); b !== null && !(b.expirationTime > M && X()); ) {
                var r = b.callback;
                if (typeof r == "function") {
                  b.callback = null, m = b.priorityLevel;
                  var fl = r(
                    b.expirationTime <= M
                  );
                  if (M = l.unstable_now(), typeof fl == "function") {
                    b.callback = fl, z(M), B = !0;
                    break a;
                  }
                  b === t(i) && u(i), z(M);
                } else u(i);
                b = t(i);
              }
              if (b !== null) B = !0;
              else {
                var ku = t(h);
                ku !== null && Mn(
                  E,
                  ku.startTime - M
                ), B = !1;
              }
            }
            break l;
          } finally {
            b = null, m = _, S = !1;
          }
          B = void 0;
        }
      } finally {
        B ? sa() : H = !1;
      }
    }
  }
  var sa;
  if (typeof d == "function")
    sa = function() {
      d(Ql);
    };
  else if (typeof MessageChannel < "u") {
    var Ic = new MessageChannel(), my = Ic.port2;
    Ic.port1.onmessage = Ql, sa = function() {
      my.postMessage(null);
    };
  } else
    sa = function() {
      y(Ql, 0);
    };
  function Mn(M, B) {
    T = y(function() {
      M(l.unstable_now());
    }, B);
  }
  l.unstable_IdlePriority = 5, l.unstable_ImmediatePriority = 1, l.unstable_LowPriority = 4, l.unstable_NormalPriority = 3, l.unstable_Profiling = null, l.unstable_UserBlockingPriority = 2, l.unstable_cancelCallback = function(M) {
    M.callback = null;
  }, l.unstable_forceFrameRate = function(M) {
    0 > M || 125 < M ? console.error(
      "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
    ) : O = 0 < M ? Math.floor(1e3 / M) : 5;
  }, l.unstable_getCurrentPriorityLevel = function() {
    return m;
  }, l.unstable_next = function(M) {
    switch (m) {
      case 1:
      case 2:
      case 3:
        var B = 3;
        break;
      default:
        B = m;
    }
    var _ = m;
    m = B;
    try {
      return M();
    } finally {
      m = _;
    }
  }, l.unstable_requestPaint = function() {
    Z = !0;
  }, l.unstable_runWithPriority = function(M, B) {
    switch (M) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        M = 3;
    }
    var _ = m;
    m = M;
    try {
      return B();
    } finally {
      m = _;
    }
  }, l.unstable_scheduleCallback = function(M, B, _) {
    var r = l.unstable_now();
    switch (typeof _ == "object" && _ !== null ? (_ = _.delay, _ = typeof _ == "number" && 0 < _ ? r + _ : r) : _ = r, M) {
      case 1:
        var fl = -1;
        break;
      case 2:
        fl = 250;
        break;
      case 5:
        fl = 1073741823;
        break;
      case 4:
        fl = 1e4;
        break;
      default:
        fl = 5e3;
    }
    return fl = _ + fl, M = {
      id: g++,
      callback: B,
      priorityLevel: M,
      startTime: _,
      expirationTime: fl,
      sortIndex: -1
    }, _ > r ? (M.sortIndex = _, a(h, M), t(i) === null && M === t(h) && (U ? (v(T), T = -1) : U = !0, Mn(E, _ - r))) : (M.sortIndex = fl, a(i, M), A || S || (A = !0, H || (H = !0, sa()))), M;
  }, l.unstable_shouldYield = X, l.unstable_wrapCallback = function(M) {
    var B = m;
    return function() {
      var _ = m;
      m = B;
      try {
        return M.apply(this, arguments);
      } finally {
        m = _;
      }
    };
  };
})(D0);
U0.exports = D0;
var Sy = U0.exports;
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nl = Sy, O0 = hy, gy = dy;
function s(l) {
  var a = "https://react.dev/errors/" + l;
  if (1 < arguments.length) {
    a += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var t = 2; t < arguments.length; t++)
      a += "&args[]=" + encodeURIComponent(arguments[t]);
  }
  return "Minified React error #" + l + "; visit " + a + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function o0(l) {
  return !(!l || l.nodeType !== 1 && l.nodeType !== 9 && l.nodeType !== 11);
}
function Ru(l) {
  var a = l, t = l;
  if (l.alternate) for (; a.return; ) a = a.return;
  else {
    l = a;
    do
      a = l, (a.flags & 4098) !== 0 && (t = a.return), l = a.return;
    while (l);
  }
  return a.tag === 3 ? t : null;
}
function H0(l) {
  if (l.tag === 13) {
    var a = l.memoizedState;
    if (a === null && (l = l.alternate, l !== null && (a = l.memoizedState)), a !== null) return a.dehydrated;
  }
  return null;
}
function N0(l) {
  if (l.tag === 31) {
    var a = l.memoizedState;
    if (a === null && (l = l.alternate, l !== null && (a = l.memoizedState)), a !== null) return a.dehydrated;
  }
  return null;
}
function Pc(l) {
  if (Ru(l) !== l)
    throw Error(s(188));
}
function by(l) {
  var a = l.alternate;
  if (!a) {
    if (a = Ru(l), a === null) throw Error(s(188));
    return a !== l ? null : l;
  }
  for (var t = l, u = a; ; ) {
    var e = t.return;
    if (e === null) break;
    var n = e.alternate;
    if (n === null) {
      if (u = e.return, u !== null) {
        t = u;
        continue;
      }
      break;
    }
    if (e.child === n.child) {
      for (n = e.child; n; ) {
        if (n === t) return Pc(e), l;
        if (n === u) return Pc(e), a;
        n = n.sibling;
      }
      throw Error(s(188));
    }
    if (t.return !== u.return) t = e, u = n;
    else {
      for (var f = !1, c = e.child; c; ) {
        if (c === t) {
          f = !0, t = e, u = n;
          break;
        }
        if (c === u) {
          f = !0, u = e, t = n;
          break;
        }
        c = c.sibling;
      }
      if (!f) {
        for (c = n.child; c; ) {
          if (c === t) {
            f = !0, t = n, u = e;
            break;
          }
          if (c === u) {
            f = !0, u = n, t = e;
            break;
          }
          c = c.sibling;
        }
        if (!f) throw Error(s(189));
      }
    }
    if (t.alternate !== u) throw Error(s(190));
  }
  if (t.tag !== 3) throw Error(s(188));
  return t.stateNode.current === t ? l : a;
}
function _0(l) {
  var a = l.tag;
  if (a === 5 || a === 26 || a === 27 || a === 6) return l;
  for (l = l.child; l !== null; ) {
    if (a = _0(l), a !== null) return a;
    l = l.sibling;
  }
  return null;
}
var w = Object.assign, zy = Symbol.for("react.element"), Pu = Symbol.for("react.transitional.element"), fu = Symbol.for("react.portal"), bt = Symbol.for("react.fragment"), B0 = Symbol.for("react.strict_mode"), nf = Symbol.for("react.profiler"), q0 = Symbol.for("react.consumer"), fa = Symbol.for("react.context"), tc = Symbol.for("react.forward_ref"), ff = Symbol.for("react.suspense"), cf = Symbol.for("react.suspense_list"), uc = Symbol.for("react.memo"), Aa = Symbol.for("react.lazy"), vf = Symbol.for("react.activity"), sy = Symbol.for("react.memo_cache_sentinel"), li = Symbol.iterator;
function Pt(l) {
  return l === null || typeof l != "object" ? null : (l = li && l[li] || l["@@iterator"], typeof l == "function" ? l : null);
}
var Ay = Symbol.for("react.client.reference");
function yf(l) {
  if (l == null) return null;
  if (typeof l == "function")
    return l.$$typeof === Ay ? null : l.displayName || l.name || null;
  if (typeof l == "string") return l;
  switch (l) {
    case bt:
      return "Fragment";
    case nf:
      return "Profiler";
    case B0:
      return "StrictMode";
    case ff:
      return "Suspense";
    case cf:
      return "SuspenseList";
    case vf:
      return "Activity";
  }
  if (typeof l == "object")
    switch (l.$$typeof) {
      case fu:
        return "Portal";
      case fa:
        return l.displayName || "Context";
      case q0:
        return (l._context.displayName || "Context") + ".Consumer";
      case tc:
        var a = l.render;
        return l = l.displayName, l || (l = a.displayName || a.name || "", l = l !== "" ? "ForwardRef(" + l + ")" : "ForwardRef"), l;
      case uc:
        return a = l.displayName || null, a !== null ? a : yf(l.type) || "Memo";
      case Aa:
        a = l._payload, l = l._init;
        try {
          return yf(l(a));
        } catch {
        }
    }
  return null;
}
var cu = Array.isArray, D = O0.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, R = gy.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ra = {
  pending: !1,
  data: null,
  method: null,
  action: null
}, mf = [], zt = -1;
function rl(l) {
  return { current: l };
}
function vl(l) {
  0 > zt || (l.current = mf[zt], mf[zt] = null, zt--);
}
function L(l, a) {
  zt++, mf[zt] = l.current, l.current = a;
}
var kl = rl(null), Du = rl(null), Ba = rl(null), _e = rl(null);
function Be(l, a) {
  switch (L(Ba, a), L(Du, l), L(kl, null), a.nodeType) {
    case 9:
    case 11:
      l = (l = a.documentElement) && (l = l.namespaceURI) ? f0(l) : 0;
      break;
    default:
      if (l = a.tagName, a = a.namespaceURI)
        a = f0(a), l = rv(a, l);
      else
        switch (l) {
          case "svg":
            l = 1;
            break;
          case "math":
            l = 2;
            break;
          default:
            l = 0;
        }
  }
  vl(kl), L(kl, l);
}
function Gt() {
  vl(kl), vl(Du), vl(Ba);
}
function hf(l) {
  l.memoizedState !== null && L(_e, l);
  var a = kl.current, t = rv(a, l.type);
  a !== t && (L(Du, l), L(kl, t));
}
function qe(l) {
  Du.current === l && (vl(kl), vl(Du)), _e.current === l && (vl(_e), Gu._currentValue = ra);
}
var Un, ai;
function wa(l) {
  if (Un === void 0)
    try {
      throw Error();
    } catch (t) {
      var a = t.stack.trim().match(/\n( *(at )?)/);
      Un = a && a[1] || "", ai = -1 < t.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < t.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
  return `
` + Un + l + ai;
}
var Dn = !1;
function On(l, a) {
  if (!l || Dn) return "";
  Dn = !0;
  var t = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var u = {
      DetermineComponentFrameRoot: function() {
        try {
          if (a) {
            var b = function() {
              throw Error();
            };
            if (Object.defineProperty(b.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(b, []);
              } catch (S) {
                var m = S;
              }
              Reflect.construct(l, [], b);
            } else {
              try {
                b.call();
              } catch (S) {
                m = S;
              }
              l.call(b.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (S) {
              m = S;
            }
            (b = l()) && typeof b.catch == "function" && b.catch(function() {
            });
          }
        } catch (S) {
          if (S && m && typeof S.stack == "string")
            return [S.stack, m.stack];
        }
        return [null, null];
      }
    };
    u.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var e = Object.getOwnPropertyDescriptor(
      u.DetermineComponentFrameRoot,
      "name"
    );
    e && e.configurable && Object.defineProperty(
      u.DetermineComponentFrameRoot,
      "name",
      { value: "DetermineComponentFrameRoot" }
    );
    var n = u.DetermineComponentFrameRoot(), f = n[0], c = n[1];
    if (f && c) {
      var i = f.split(`
`), h = c.split(`
`);
      for (e = u = 0; u < i.length && !i[u].includes("DetermineComponentFrameRoot"); )
        u++;
      for (; e < h.length && !h[e].includes(
        "DetermineComponentFrameRoot"
      ); )
        e++;
      if (u === i.length || e === h.length)
        for (u = i.length - 1, e = h.length - 1; 1 <= u && 0 <= e && i[u] !== h[e]; )
          e--;
      for (; 1 <= u && 0 <= e; u--, e--)
        if (i[u] !== h[e]) {
          if (u !== 1 || e !== 1)
            do
              if (u--, e--, 0 > e || i[u] !== h[e]) {
                var g = `
` + i[u].replace(" at new ", " at ");
                return l.displayName && g.includes("<anonymous>") && (g = g.replace("<anonymous>", l.displayName)), g;
              }
            while (1 <= u && 0 <= e);
          break;
        }
    }
  } finally {
    Dn = !1, Error.prepareStackTrace = t;
  }
  return (t = l ? l.displayName || l.name : "") ? wa(t) : "";
}
function Ty(l, a) {
  switch (l.tag) {
    case 26:
    case 27:
    case 5:
      return wa(l.type);
    case 16:
      return wa("Lazy");
    case 13:
      return l.child !== a && a !== null ? wa("Suspense Fallback") : wa("Suspense");
    case 19:
      return wa("SuspenseList");
    case 0:
    case 15:
      return On(l.type, !1);
    case 11:
      return On(l.type.render, !1);
    case 1:
      return On(l.type, !0);
    case 31:
      return wa("Activity");
    default:
      return "";
  }
}
function ti(l) {
  try {
    var a = "", t = null;
    do
      a += Ty(l, t), t = l, l = l.return;
    while (l);
    return a;
  } catch (u) {
    return `
Error generating stack: ` + u.message + `
` + u.stack;
  }
}
var df = Object.prototype.hasOwnProperty, ec = nl.unstable_scheduleCallback, on = nl.unstable_cancelCallback, My = nl.unstable_shouldYield, Ey = nl.unstable_requestPaint, Hl = nl.unstable_now, Uy = nl.unstable_getCurrentPriorityLevel, Y0 = nl.unstable_ImmediatePriority, Q0 = nl.unstable_UserBlockingPriority, Ye = nl.unstable_NormalPriority, Dy = nl.unstable_LowPriority, X0 = nl.unstable_IdlePriority, Oy = nl.log, oy = nl.unstable_setDisableYieldValue, ju = null, Nl = null;
function Oa(l) {
  if (typeof Oy == "function" && oy(l), Nl && typeof Nl.setStrictMode == "function")
    try {
      Nl.setStrictMode(ju, l);
    } catch {
    }
}
var _l = Math.clz32 ? Math.clz32 : _y, Hy = Math.log, Ny = Math.LN2;
function _y(l) {
  return l >>>= 0, l === 0 ? 32 : 31 - (Hy(l) / Ny | 0) | 0;
}
var le = 256, ae = 262144, te = 4194304;
function $a(l) {
  var a = l & 42;
  if (a !== 0) return a;
  switch (l & -l) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
      return 64;
    case 128:
      return 128;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
      return l & 261888;
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return l & 3932160;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return l & 62914560;
    case 67108864:
      return 67108864;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 0;
    default:
      return l;
  }
}
function en(l, a, t) {
  var u = l.pendingLanes;
  if (u === 0) return 0;
  var e = 0, n = l.suspendedLanes, f = l.pingedLanes;
  l = l.warmLanes;
  var c = u & 134217727;
  return c !== 0 ? (u = c & ~n, u !== 0 ? e = $a(u) : (f &= c, f !== 0 ? e = $a(f) : t || (t = c & ~l, t !== 0 && (e = $a(t))))) : (c = u & ~n, c !== 0 ? e = $a(c) : f !== 0 ? e = $a(f) : t || (t = u & ~l, t !== 0 && (e = $a(t)))), e === 0 ? 0 : a !== 0 && a !== e && (a & n) === 0 && (n = e & -e, t = a & -a, n >= t || n === 32 && (t & 4194048) !== 0) ? a : e;
}
function Vu(l, a) {
  return (l.pendingLanes & ~(l.suspendedLanes & ~l.pingedLanes) & a) === 0;
}
function By(l, a) {
  switch (l) {
    case 1:
    case 2:
    case 4:
    case 8:
    case 64:
      return a + 250;
    case 16:
    case 32:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return -1;
    case 67108864:
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function G0() {
  var l = te;
  return te <<= 1, (te & 62914560) === 0 && (te = 4194304), l;
}
function Hn(l) {
  for (var a = [], t = 0; 31 > t; t++) a.push(l);
  return a;
}
function pu(l, a) {
  l.pendingLanes |= a, a !== 268435456 && (l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0);
}
function qy(l, a, t, u, e, n) {
  var f = l.pendingLanes;
  l.pendingLanes = t, l.suspendedLanes = 0, l.pingedLanes = 0, l.warmLanes = 0, l.expiredLanes &= t, l.entangledLanes &= t, l.errorRecoveryDisabledLanes &= t, l.shellSuspendCounter = 0;
  var c = l.entanglements, i = l.expirationTimes, h = l.hiddenUpdates;
  for (t = f & ~t; 0 < t; ) {
    var g = 31 - _l(t), b = 1 << g;
    c[g] = 0, i[g] = -1;
    var m = h[g];
    if (m !== null)
      for (h[g] = null, g = 0; g < m.length; g++) {
        var S = m[g];
        S !== null && (S.lane &= -536870913);
      }
    t &= ~b;
  }
  u !== 0 && Z0(l, u, 0), n !== 0 && e === 0 && l.tag !== 0 && (l.suspendedLanes |= n & ~(f & ~a));
}
function Z0(l, a, t) {
  l.pendingLanes |= a, l.suspendedLanes &= ~a;
  var u = 31 - _l(a);
  l.entangledLanes |= a, l.entanglements[u] = l.entanglements[u] | 1073741824 | t & 261930;
}
function C0(l, a) {
  var t = l.entangledLanes |= a;
  for (l = l.entanglements; t; ) {
    var u = 31 - _l(t), e = 1 << u;
    e & a | l[u] & a && (l[u] |= a), t &= ~e;
  }
}
function R0(l, a) {
  var t = a & -a;
  return t = (t & 42) !== 0 ? 1 : nc(t), (t & (l.suspendedLanes | a)) !== 0 ? 0 : t;
}
function nc(l) {
  switch (l) {
    case 2:
      l = 1;
      break;
    case 8:
      l = 4;
      break;
    case 32:
      l = 16;
      break;
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      l = 128;
      break;
    case 268435456:
      l = 134217728;
      break;
    default:
      l = 0;
  }
  return l;
}
function fc(l) {
  return l &= -l, 2 < l ? 8 < l ? (l & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
}
function j0() {
  var l = R.p;
  return l !== 0 ? l : (l = window.event, l === void 0 ? 32 : iy(l.type));
}
function ui(l, a) {
  var t = R.p;
  try {
    return R.p = l, a();
  } finally {
    R.p = t;
  }
}
var xa = Math.random().toString(36).slice(2), ml = "__reactFiber$" + xa, Ml = "__reactProps$" + xa, Wt = "__reactContainer$" + xa, Sf = "__reactEvents$" + xa, Yy = "__reactListeners$" + xa, Qy = "__reactHandles$" + xa, ei = "__reactResources$" + xa, Ku = "__reactMarker$" + xa;
function cc(l) {
  delete l[ml], delete l[Ml], delete l[Sf], delete l[Yy], delete l[Qy];
}
function st(l) {
  var a = l[ml];
  if (a) return a;
  for (var t = l.parentNode; t; ) {
    if (a = t[Wt] || t[ml]) {
      if (t = a.alternate, a.child !== null || t !== null && t.child !== null)
        for (l = m0(l); l !== null; ) {
          if (t = l[ml]) return t;
          l = m0(l);
        }
      return a;
    }
    l = t, t = l.parentNode;
  }
  return null;
}
function wt(l) {
  if (l = l[ml] || l[Wt]) {
    var a = l.tag;
    if (a === 5 || a === 6 || a === 13 || a === 31 || a === 26 || a === 27 || a === 3)
      return l;
  }
  return null;
}
function iu(l) {
  var a = l.tag;
  if (a === 5 || a === 26 || a === 27 || a === 6) return l.stateNode;
  throw Error(s(33));
}
function Nt(l) {
  var a = l[ei];
  return a || (a = l[ei] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), a;
}
function il(l) {
  l[Ku] = !0;
}
var V0 = /* @__PURE__ */ new Set(), p0 = {};
function ct(l, a) {
  Zt(l, a), Zt(l + "Capture", a);
}
function Zt(l, a) {
  for (p0[l] = a, l = 0; l < a.length; l++)
    V0.add(a[l]);
}
var Xy = RegExp(
  "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
), ni = {}, fi = {};
function Gy(l) {
  return df.call(fi, l) ? !0 : df.call(ni, l) ? !1 : Xy.test(l) ? fi[l] = !0 : (ni[l] = !0, !1);
}
function Se(l, a, t) {
  if (Gy(a))
    if (t === null) l.removeAttribute(a);
    else {
      switch (typeof t) {
        case "undefined":
        case "function":
        case "symbol":
          l.removeAttribute(a);
          return;
        case "boolean":
          var u = a.toLowerCase().slice(0, 5);
          if (u !== "data-" && u !== "aria-") {
            l.removeAttribute(a);
            return;
          }
      }
      l.setAttribute(a, "" + t);
    }
}
function ue(l, a, t) {
  if (t === null) l.removeAttribute(a);
  else {
    switch (typeof t) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        l.removeAttribute(a);
        return;
    }
    l.setAttribute(a, "" + t);
  }
}
function Pl(l, a, t, u) {
  if (u === null) l.removeAttribute(t);
  else {
    switch (typeof u) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        l.removeAttribute(t);
        return;
    }
    l.setAttributeNS(a, t, "" + u);
  }
}
function Gl(l) {
  switch (typeof l) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return l;
    case "object":
      return l;
    default:
      return "";
  }
}
function K0(l) {
  var a = l.type;
  return (l = l.nodeName) && l.toLowerCase() === "input" && (a === "checkbox" || a === "radio");
}
function Zy(l, a, t) {
  var u = Object.getOwnPropertyDescriptor(
    l.constructor.prototype,
    a
  );
  if (!l.hasOwnProperty(a) && typeof u < "u" && typeof u.get == "function" && typeof u.set == "function") {
    var e = u.get, n = u.set;
    return Object.defineProperty(l, a, {
      configurable: !0,
      get: function() {
        return e.call(this);
      },
      set: function(f) {
        t = "" + f, n.call(this, f);
      }
    }), Object.defineProperty(l, a, {
      enumerable: u.enumerable
    }), {
      getValue: function() {
        return t;
      },
      setValue: function(f) {
        t = "" + f;
      },
      stopTracking: function() {
        l._valueTracker = null, delete l[a];
      }
    };
  }
}
function gf(l) {
  if (!l._valueTracker) {
    var a = K0(l) ? "checked" : "value";
    l._valueTracker = Zy(
      l,
      a,
      "" + l[a]
    );
  }
}
function x0(l) {
  if (!l) return !1;
  var a = l._valueTracker;
  if (!a) return !0;
  var t = a.getValue(), u = "";
  return l && (u = K0(l) ? l.checked ? "true" : "false" : l.value), l = u, l !== t ? (a.setValue(l), !0) : !1;
}
function Qe(l) {
  if (l = l || (typeof document < "u" ? document : void 0), typeof l > "u") return null;
  try {
    return l.activeElement || l.body;
  } catch {
    return l.body;
  }
}
var Cy = /[\n"\\]/g;
function Rl(l) {
  return l.replace(
    Cy,
    function(a) {
      return "\\" + a.charCodeAt(0).toString(16) + " ";
    }
  );
}
function bf(l, a, t, u, e, n, f, c) {
  l.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? l.type = f : l.removeAttribute("type"), a != null ? f === "number" ? (a === 0 && l.value === "" || l.value != a) && (l.value = "" + Gl(a)) : l.value !== "" + Gl(a) && (l.value = "" + Gl(a)) : f !== "submit" && f !== "reset" || l.removeAttribute("value"), a != null ? zf(l, f, Gl(a)) : t != null ? zf(l, f, Gl(t)) : u != null && l.removeAttribute("value"), e == null && n != null && (l.defaultChecked = !!n), e != null && (l.checked = e && typeof e != "function" && typeof e != "symbol"), c != null && typeof c != "function" && typeof c != "symbol" && typeof c != "boolean" ? l.name = "" + Gl(c) : l.removeAttribute("name");
}
function L0(l, a, t, u, e, n, f, c) {
  if (n != null && typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" && (l.type = n), a != null || t != null) {
    if (!(n !== "submit" && n !== "reset" || a != null)) {
      gf(l);
      return;
    }
    t = t != null ? "" + Gl(t) : "", a = a != null ? "" + Gl(a) : t, c || a === l.value || (l.value = a), l.defaultValue = a;
  }
  u = u ?? e, u = typeof u != "function" && typeof u != "symbol" && !!u, l.checked = c ? l.checked : !!u, l.defaultChecked = !!u, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (l.name = f), gf(l);
}
function zf(l, a, t) {
  a === "number" && Qe(l.ownerDocument) === l || l.defaultValue === "" + t || (l.defaultValue = "" + t);
}
function _t(l, a, t, u) {
  if (l = l.options, a) {
    a = {};
    for (var e = 0; e < t.length; e++)
      a["$" + t[e]] = !0;
    for (t = 0; t < l.length; t++)
      e = a.hasOwnProperty("$" + l[t].value), l[t].selected !== e && (l[t].selected = e), e && u && (l[t].defaultSelected = !0);
  } else {
    for (t = "" + Gl(t), a = null, e = 0; e < l.length; e++) {
      if (l[e].value === t) {
        l[e].selected = !0, u && (l[e].defaultSelected = !0);
        return;
      }
      a !== null || l[e].disabled || (a = l[e]);
    }
    a !== null && (a.selected = !0);
  }
}
function J0(l, a, t) {
  if (a != null && (a = "" + Gl(a), a !== l.value && (l.value = a), t == null)) {
    l.defaultValue !== a && (l.defaultValue = a);
    return;
  }
  l.defaultValue = t != null ? "" + Gl(t) : "";
}
function W0(l, a, t, u) {
  if (a == null) {
    if (u != null) {
      if (t != null) throw Error(s(92));
      if (cu(u)) {
        if (1 < u.length) throw Error(s(93));
        u = u[0];
      }
      t = u;
    }
    t == null && (t = ""), a = t;
  }
  t = Gl(a), l.defaultValue = t, u = l.textContent, u === t && u !== "" && u !== null && (l.value = u), gf(l);
}
function Ct(l, a) {
  if (a) {
    var t = l.firstChild;
    if (t && t === l.lastChild && t.nodeType === 3) {
      t.nodeValue = a;
      return;
    }
  }
  l.textContent = a;
}
var Ry = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " "
  )
);
function ci(l, a, t) {
  var u = a.indexOf("--") === 0;
  t == null || typeof t == "boolean" || t === "" ? u ? l.setProperty(a, "") : a === "float" ? l.cssFloat = "" : l[a] = "" : u ? l.setProperty(a, t) : typeof t != "number" || t === 0 || Ry.has(a) ? a === "float" ? l.cssFloat = t : l[a] = ("" + t).trim() : l[a] = t + "px";
}
function w0(l, a, t) {
  if (a != null && typeof a != "object")
    throw Error(s(62));
  if (l = l.style, t != null) {
    for (var u in t)
      !t.hasOwnProperty(u) || a != null && a.hasOwnProperty(u) || (u.indexOf("--") === 0 ? l.setProperty(u, "") : u === "float" ? l.cssFloat = "" : l[u] = "");
    for (var e in a)
      u = a[e], a.hasOwnProperty(e) && t[e] !== u && ci(l, e, u);
  } else
    for (var n in a)
      a.hasOwnProperty(n) && ci(l, n, a[n]);
}
function ic(l) {
  if (l.indexOf("-") === -1) return !1;
  switch (l) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var jy = /* @__PURE__ */ new Map([
  ["acceptCharset", "accept-charset"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
  ["crossOrigin", "crossorigin"],
  ["accentHeight", "accent-height"],
  ["alignmentBaseline", "alignment-baseline"],
  ["arabicForm", "arabic-form"],
  ["baselineShift", "baseline-shift"],
  ["capHeight", "cap-height"],
  ["clipPath", "clip-path"],
  ["clipRule", "clip-rule"],
  ["colorInterpolation", "color-interpolation"],
  ["colorInterpolationFilters", "color-interpolation-filters"],
  ["colorProfile", "color-profile"],
  ["colorRendering", "color-rendering"],
  ["dominantBaseline", "dominant-baseline"],
  ["enableBackground", "enable-background"],
  ["fillOpacity", "fill-opacity"],
  ["fillRule", "fill-rule"],
  ["floodColor", "flood-color"],
  ["floodOpacity", "flood-opacity"],
  ["fontFamily", "font-family"],
  ["fontSize", "font-size"],
  ["fontSizeAdjust", "font-size-adjust"],
  ["fontStretch", "font-stretch"],
  ["fontStyle", "font-style"],
  ["fontVariant", "font-variant"],
  ["fontWeight", "font-weight"],
  ["glyphName", "glyph-name"],
  ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
  ["glyphOrientationVertical", "glyph-orientation-vertical"],
  ["horizAdvX", "horiz-adv-x"],
  ["horizOriginX", "horiz-origin-x"],
  ["imageRendering", "image-rendering"],
  ["letterSpacing", "letter-spacing"],
  ["lightingColor", "lighting-color"],
  ["markerEnd", "marker-end"],
  ["markerMid", "marker-mid"],
  ["markerStart", "marker-start"],
  ["overlinePosition", "overline-position"],
  ["overlineThickness", "overline-thickness"],
  ["paintOrder", "paint-order"],
  ["panose-1", "panose-1"],
  ["pointerEvents", "pointer-events"],
  ["renderingIntent", "rendering-intent"],
  ["shapeRendering", "shape-rendering"],
  ["stopColor", "stop-color"],
  ["stopOpacity", "stop-opacity"],
  ["strikethroughPosition", "strikethrough-position"],
  ["strikethroughThickness", "strikethrough-thickness"],
  ["strokeDasharray", "stroke-dasharray"],
  ["strokeDashoffset", "stroke-dashoffset"],
  ["strokeLinecap", "stroke-linecap"],
  ["strokeLinejoin", "stroke-linejoin"],
  ["strokeMiterlimit", "stroke-miterlimit"],
  ["strokeOpacity", "stroke-opacity"],
  ["strokeWidth", "stroke-width"],
  ["textAnchor", "text-anchor"],
  ["textDecoration", "text-decoration"],
  ["textRendering", "text-rendering"],
  ["transformOrigin", "transform-origin"],
  ["underlinePosition", "underline-position"],
  ["underlineThickness", "underline-thickness"],
  ["unicodeBidi", "unicode-bidi"],
  ["unicodeRange", "unicode-range"],
  ["unitsPerEm", "units-per-em"],
  ["vAlphabetic", "v-alphabetic"],
  ["vHanging", "v-hanging"],
  ["vIdeographic", "v-ideographic"],
  ["vMathematical", "v-mathematical"],
  ["vectorEffect", "vector-effect"],
  ["vertAdvY", "vert-adv-y"],
  ["vertOriginX", "vert-origin-x"],
  ["vertOriginY", "vert-origin-y"],
  ["wordSpacing", "word-spacing"],
  ["writingMode", "writing-mode"],
  ["xmlnsXlink", "xmlns:xlink"],
  ["xHeight", "x-height"]
]), Vy = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function ge(l) {
  return Vy.test("" + l) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : l;
}
function ca() {
}
var sf = null;
function vc(l) {
  return l = l.target || l.srcElement || window, l.correspondingUseElement && (l = l.correspondingUseElement), l.nodeType === 3 ? l.parentNode : l;
}
var At = null, Bt = null;
function ii(l) {
  var a = wt(l);
  if (a && (l = a.stateNode)) {
    var t = l[Ml] || null;
    l: switch (l = a.stateNode, a.type) {
      case "input":
        if (bf(
          l,
          t.value,
          t.defaultValue,
          t.defaultValue,
          t.checked,
          t.defaultChecked,
          t.type,
          t.name
        ), a = t.name, t.type === "radio" && a != null) {
          for (t = l; t.parentNode; ) t = t.parentNode;
          for (t = t.querySelectorAll(
            'input[name="' + Rl(
              "" + a
            ) + '"][type="radio"]'
          ), a = 0; a < t.length; a++) {
            var u = t[a];
            if (u !== l && u.form === l.form) {
              var e = u[Ml] || null;
              if (!e) throw Error(s(90));
              bf(
                u,
                e.value,
                e.defaultValue,
                e.defaultValue,
                e.checked,
                e.defaultChecked,
                e.type,
                e.name
              );
            }
          }
          for (a = 0; a < t.length; a++)
            u = t[a], u.form === l.form && x0(u);
        }
        break l;
      case "textarea":
        J0(l, t.value, t.defaultValue);
        break l;
      case "select":
        a = t.value, a != null && _t(l, !!t.multiple, a, !1);
    }
  }
}
var Nn = !1;
function $0(l, a, t) {
  if (Nn) return l(a, t);
  Nn = !0;
  try {
    var u = l(a);
    return u;
  } finally {
    if (Nn = !1, (At !== null || Bt !== null) && (zn(), At && (a = At, l = Bt, Bt = At = null, ii(a), l)))
      for (a = 0; a < l.length; a++) ii(l[a]);
  }
}
function Ou(l, a) {
  var t = l.stateNode;
  if (t === null) return null;
  var u = t[Ml] || null;
  if (u === null) return null;
  t = u[a];
  l: switch (a) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (u = !u.disabled) || (l = l.type, u = !(l === "button" || l === "input" || l === "select" || l === "textarea")), l = !u;
      break l;
    default:
      l = !1;
  }
  if (l) return null;
  if (t && typeof t != "function")
    throw Error(
      s(231, a, typeof t)
    );
  return t;
}
var ha = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Af = !1;
if (ha)
  try {
    var lu = {};
    Object.defineProperty(lu, "passive", {
      get: function() {
        Af = !0;
      }
    }), window.addEventListener("test", lu, lu), window.removeEventListener("test", lu, lu);
  } catch {
    Af = !1;
  }
var oa = null, yc = null, be = null;
function F0() {
  if (be) return be;
  var l, a = yc, t = a.length, u, e = "value" in oa ? oa.value : oa.textContent, n = e.length;
  for (l = 0; l < t && a[l] === e[l]; l++) ;
  var f = t - l;
  for (u = 1; u <= f && a[t - u] === e[n - u]; u++) ;
  return be = e.slice(l, 1 < u ? 1 - u : void 0);
}
function ze(l) {
  var a = l.keyCode;
  return "charCode" in l ? (l = l.charCode, l === 0 && a === 13 && (l = 13)) : l = a, l === 10 && (l = 13), 32 <= l || l === 13 ? l : 0;
}
function ee() {
  return !0;
}
function vi() {
  return !1;
}
function El(l) {
  function a(t, u, e, n, f) {
    this._reactName = t, this._targetInst = e, this.type = u, this.nativeEvent = n, this.target = f, this.currentTarget = null;
    for (var c in l)
      l.hasOwnProperty(c) && (t = l[c], this[c] = t ? t(n) : n[c]);
    return this.isDefaultPrevented = (n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === !1) ? ee : vi, this.isPropagationStopped = vi, this;
  }
  return w(a.prototype, {
    preventDefault: function() {
      this.defaultPrevented = !0;
      var t = this.nativeEvent;
      t && (t.preventDefault ? t.preventDefault() : typeof t.returnValue != "unknown" && (t.returnValue = !1), this.isDefaultPrevented = ee);
    },
    stopPropagation: function() {
      var t = this.nativeEvent;
      t && (t.stopPropagation ? t.stopPropagation() : typeof t.cancelBubble != "unknown" && (t.cancelBubble = !0), this.isPropagationStopped = ee);
    },
    persist: function() {
    },
    isPersistent: ee
  }), a;
}
var it = {
  eventPhase: 0,
  bubbles: 0,
  cancelable: 0,
  timeStamp: function(l) {
    return l.timeStamp || Date.now();
  },
  defaultPrevented: 0,
  isTrusted: 0
}, nn = El(it), xu = w({}, it, { view: 0, detail: 0 }), py = El(xu), _n, Bn, au, fn = w({}, xu, {
  screenX: 0,
  screenY: 0,
  clientX: 0,
  clientY: 0,
  pageX: 0,
  pageY: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  getModifierState: mc,
  button: 0,
  buttons: 0,
  relatedTarget: function(l) {
    return l.relatedTarget === void 0 ? l.fromElement === l.srcElement ? l.toElement : l.fromElement : l.relatedTarget;
  },
  movementX: function(l) {
    return "movementX" in l ? l.movementX : (l !== au && (au && l.type === "mousemove" ? (_n = l.screenX - au.screenX, Bn = l.screenY - au.screenY) : Bn = _n = 0, au = l), _n);
  },
  movementY: function(l) {
    return "movementY" in l ? l.movementY : Bn;
  }
}), yi = El(fn), Ky = w({}, fn, { dataTransfer: 0 }), xy = El(Ky), Ly = w({}, xu, { relatedTarget: 0 }), qn = El(Ly), Jy = w({}, it, {
  animationName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), Wy = El(Jy), wy = w({}, it, {
  clipboardData: function(l) {
    return "clipboardData" in l ? l.clipboardData : window.clipboardData;
  }
}), $y = El(wy), Fy = w({}, it, { data: 0 }), mi = El(Fy), ky = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, ry = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Iy = {
  Alt: "altKey",
  Control: "ctrlKey",
  Meta: "metaKey",
  Shift: "shiftKey"
};
function Py(l) {
  var a = this.nativeEvent;
  return a.getModifierState ? a.getModifierState(l) : (l = Iy[l]) ? !!a[l] : !1;
}
function mc() {
  return Py;
}
var lm = w({}, xu, {
  key: function(l) {
    if (l.key) {
      var a = ky[l.key] || l.key;
      if (a !== "Unidentified") return a;
    }
    return l.type === "keypress" ? (l = ze(l), l === 13 ? "Enter" : String.fromCharCode(l)) : l.type === "keydown" || l.type === "keyup" ? ry[l.keyCode] || "Unidentified" : "";
  },
  code: 0,
  location: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  repeat: 0,
  locale: 0,
  getModifierState: mc,
  charCode: function(l) {
    return l.type === "keypress" ? ze(l) : 0;
  },
  keyCode: function(l) {
    return l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  },
  which: function(l) {
    return l.type === "keypress" ? ze(l) : l.type === "keydown" || l.type === "keyup" ? l.keyCode : 0;
  }
}), am = El(lm), tm = w({}, fn, {
  pointerId: 0,
  width: 0,
  height: 0,
  pressure: 0,
  tangentialPressure: 0,
  tiltX: 0,
  tiltY: 0,
  twist: 0,
  pointerType: 0,
  isPrimary: 0
}), hi = El(tm), um = w({}, xu, {
  touches: 0,
  targetTouches: 0,
  changedTouches: 0,
  altKey: 0,
  metaKey: 0,
  ctrlKey: 0,
  shiftKey: 0,
  getModifierState: mc
}), em = El(um), nm = w({}, it, {
  propertyName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), fm = El(nm), cm = w({}, fn, {
  deltaX: function(l) {
    return "deltaX" in l ? l.deltaX : "wheelDeltaX" in l ? -l.wheelDeltaX : 0;
  },
  deltaY: function(l) {
    return "deltaY" in l ? l.deltaY : "wheelDeltaY" in l ? -l.wheelDeltaY : "wheelDelta" in l ? -l.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), im = El(cm), vm = w({}, it, {
  newState: 0,
  oldState: 0
}), ym = El(vm), mm = [9, 13, 27, 32], hc = ha && "CompositionEvent" in window, mu = null;
ha && "documentMode" in document && (mu = document.documentMode);
var hm = ha && "TextEvent" in window && !mu, k0 = ha && (!hc || mu && 8 < mu && 11 >= mu), di = " ", Si = !1;
function r0(l, a) {
  switch (l) {
    case "keyup":
      return mm.indexOf(a.keyCode) !== -1;
    case "keydown":
      return a.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function I0(l) {
  return l = l.detail, typeof l == "object" && "data" in l ? l.data : null;
}
var Tt = !1;
function dm(l, a) {
  switch (l) {
    case "compositionend":
      return I0(a);
    case "keypress":
      return a.which !== 32 ? null : (Si = !0, di);
    case "textInput":
      return l = a.data, l === di && Si ? null : l;
    default:
      return null;
  }
}
function Sm(l, a) {
  if (Tt)
    return l === "compositionend" || !hc && r0(l, a) ? (l = F0(), be = yc = oa = null, Tt = !1, l) : null;
  switch (l) {
    case "paste":
      return null;
    case "keypress":
      if (!(a.ctrlKey || a.altKey || a.metaKey) || a.ctrlKey && a.altKey) {
        if (a.char && 1 < a.char.length)
          return a.char;
        if (a.which) return String.fromCharCode(a.which);
      }
      return null;
    case "compositionend":
      return k0 && a.locale !== "ko" ? null : a.data;
    default:
      return null;
  }
}
var gm = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0
};
function gi(l) {
  var a = l && l.nodeName && l.nodeName.toLowerCase();
  return a === "input" ? !!gm[l.type] : a === "textarea";
}
function P0(l, a, t, u) {
  At ? Bt ? Bt.push(u) : Bt = [u] : At = u, a = re(a, "onChange"), 0 < a.length && (t = new nn(
    "onChange",
    "change",
    null,
    t,
    u
  ), l.push({ event: t, listeners: a }));
}
var hu = null, ou = null;
function bm(l) {
  $v(l, 0);
}
function cn(l) {
  var a = iu(l);
  if (x0(a)) return l;
}
function bi(l, a) {
  if (l === "change") return a;
}
var l1 = !1;
if (ha) {
  var Yn;
  if (ha) {
    var Qn = "oninput" in document;
    if (!Qn) {
      var zi = document.createElement("div");
      zi.setAttribute("oninput", "return;"), Qn = typeof zi.oninput == "function";
    }
    Yn = Qn;
  } else Yn = !1;
  l1 = Yn && (!document.documentMode || 9 < document.documentMode);
}
function si() {
  hu && (hu.detachEvent("onpropertychange", a1), ou = hu = null);
}
function a1(l) {
  if (l.propertyName === "value" && cn(ou)) {
    var a = [];
    P0(
      a,
      ou,
      l,
      vc(l)
    ), $0(bm, a);
  }
}
function zm(l, a, t) {
  l === "focusin" ? (si(), hu = a, ou = t, hu.attachEvent("onpropertychange", a1)) : l === "focusout" && si();
}
function sm(l) {
  if (l === "selectionchange" || l === "keyup" || l === "keydown")
    return cn(ou);
}
function Am(l, a) {
  if (l === "click") return cn(a);
}
function Tm(l, a) {
  if (l === "input" || l === "change")
    return cn(a);
}
function Mm(l, a) {
  return l === a && (l !== 0 || 1 / l === 1 / a) || l !== l && a !== a;
}
var ql = typeof Object.is == "function" ? Object.is : Mm;
function Hu(l, a) {
  if (ql(l, a)) return !0;
  if (typeof l != "object" || l === null || typeof a != "object" || a === null)
    return !1;
  var t = Object.keys(l), u = Object.keys(a);
  if (t.length !== u.length) return !1;
  for (u = 0; u < t.length; u++) {
    var e = t[u];
    if (!df.call(a, e) || !ql(l[e], a[e]))
      return !1;
  }
  return !0;
}
function Ai(l) {
  for (; l && l.firstChild; ) l = l.firstChild;
  return l;
}
function Ti(l, a) {
  var t = Ai(l);
  l = 0;
  for (var u; t; ) {
    if (t.nodeType === 3) {
      if (u = l + t.textContent.length, l <= a && u >= a)
        return { node: t, offset: a - l };
      l = u;
    }
    l: {
      for (; t; ) {
        if (t.nextSibling) {
          t = t.nextSibling;
          break l;
        }
        t = t.parentNode;
      }
      t = void 0;
    }
    t = Ai(t);
  }
}
function t1(l, a) {
  return l && a ? l === a ? !0 : l && l.nodeType === 3 ? !1 : a && a.nodeType === 3 ? t1(l, a.parentNode) : "contains" in l ? l.contains(a) : l.compareDocumentPosition ? !!(l.compareDocumentPosition(a) & 16) : !1 : !1;
}
function u1(l) {
  l = l != null && l.ownerDocument != null && l.ownerDocument.defaultView != null ? l.ownerDocument.defaultView : window;
  for (var a = Qe(l.document); a instanceof l.HTMLIFrameElement; ) {
    try {
      var t = typeof a.contentWindow.location.href == "string";
    } catch {
      t = !1;
    }
    if (t) l = a.contentWindow;
    else break;
    a = Qe(l.document);
  }
  return a;
}
function dc(l) {
  var a = l && l.nodeName && l.nodeName.toLowerCase();
  return a && (a === "input" && (l.type === "text" || l.type === "search" || l.type === "tel" || l.type === "url" || l.type === "password") || a === "textarea" || l.contentEditable === "true");
}
var Em = ha && "documentMode" in document && 11 >= document.documentMode, Mt = null, Tf = null, du = null, Mf = !1;
function Mi(l, a, t) {
  var u = t.window === t ? t.document : t.nodeType === 9 ? t : t.ownerDocument;
  Mf || Mt == null || Mt !== Qe(u) || (u = Mt, "selectionStart" in u && dc(u) ? u = { start: u.selectionStart, end: u.selectionEnd } : (u = (u.ownerDocument && u.ownerDocument.defaultView || window).getSelection(), u = {
    anchorNode: u.anchorNode,
    anchorOffset: u.anchorOffset,
    focusNode: u.focusNode,
    focusOffset: u.focusOffset
  }), du && Hu(du, u) || (du = u, u = re(Tf, "onSelect"), 0 < u.length && (a = new nn(
    "onSelect",
    "select",
    null,
    a,
    t
  ), l.push({ event: a, listeners: u }), a.target = Mt)));
}
function Wa(l, a) {
  var t = {};
  return t[l.toLowerCase()] = a.toLowerCase(), t["Webkit" + l] = "webkit" + a, t["Moz" + l] = "moz" + a, t;
}
var Et = {
  animationend: Wa("Animation", "AnimationEnd"),
  animationiteration: Wa("Animation", "AnimationIteration"),
  animationstart: Wa("Animation", "AnimationStart"),
  transitionrun: Wa("Transition", "TransitionRun"),
  transitionstart: Wa("Transition", "TransitionStart"),
  transitioncancel: Wa("Transition", "TransitionCancel"),
  transitionend: Wa("Transition", "TransitionEnd")
}, Xn = {}, e1 = {};
ha && (e1 = document.createElement("div").style, "AnimationEvent" in window || (delete Et.animationend.animation, delete Et.animationiteration.animation, delete Et.animationstart.animation), "TransitionEvent" in window || delete Et.transitionend.transition);
function vt(l) {
  if (Xn[l]) return Xn[l];
  if (!Et[l]) return l;
  var a = Et[l], t;
  for (t in a)
    if (a.hasOwnProperty(t) && t in e1)
      return Xn[l] = a[t];
  return l;
}
var n1 = vt("animationend"), f1 = vt("animationiteration"), c1 = vt("animationstart"), Um = vt("transitionrun"), Dm = vt("transitionstart"), Om = vt("transitioncancel"), i1 = vt("transitionend"), v1 = /* @__PURE__ */ new Map(), Ef = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
  " "
);
Ef.push("scrollEnd");
function Wl(l, a) {
  v1.set(l, a), ct(a, [l]);
}
var Xe = typeof reportError == "function" ? reportError : function(l) {
  if (typeof window == "object" && typeof window.ErrorEvent == "function") {
    var a = new window.ErrorEvent("error", {
      bubbles: !0,
      cancelable: !0,
      message: typeof l == "object" && l !== null && typeof l.message == "string" ? String(l.message) : String(l),
      error: l
    });
    if (!window.dispatchEvent(a)) return;
  } else if (typeof process == "object" && typeof process.emit == "function") {
    process.emit("uncaughtException", l);
    return;
  }
  console.error(l);
}, Xl = [], Ut = 0, Sc = 0;
function vn() {
  for (var l = Ut, a = Sc = Ut = 0; a < l; ) {
    var t = Xl[a];
    Xl[a++] = null;
    var u = Xl[a];
    Xl[a++] = null;
    var e = Xl[a];
    Xl[a++] = null;
    var n = Xl[a];
    if (Xl[a++] = null, u !== null && e !== null) {
      var f = u.pending;
      f === null ? e.next = e : (e.next = f.next, f.next = e), u.pending = e;
    }
    n !== 0 && y1(t, e, n);
  }
}
function yn(l, a, t, u) {
  Xl[Ut++] = l, Xl[Ut++] = a, Xl[Ut++] = t, Xl[Ut++] = u, Sc |= u, l.lanes |= u, l = l.alternate, l !== null && (l.lanes |= u);
}
function gc(l, a, t, u) {
  return yn(l, a, t, u), Ge(l);
}
function yt(l, a) {
  return yn(l, null, null, a), Ge(l);
}
function y1(l, a, t) {
  l.lanes |= t;
  var u = l.alternate;
  u !== null && (u.lanes |= t);
  for (var e = !1, n = l.return; n !== null; )
    n.childLanes |= t, u = n.alternate, u !== null && (u.childLanes |= t), n.tag === 22 && (l = n.stateNode, l === null || l._visibility & 1 || (e = !0)), l = n, n = n.return;
  return l.tag === 3 ? (n = l.stateNode, e && a !== null && (e = 31 - _l(t), l = n.hiddenUpdates, u = l[e], u === null ? l[e] = [a] : u.push(a), a.lane = t | 536870912), n) : null;
}
function Ge(l) {
  if (50 < Eu)
    throw Eu = 0, xf = null, Error(s(185));
  for (var a = l.return; a !== null; )
    l = a, a = l.return;
  return l.tag === 3 ? l.stateNode : null;
}
var Dt = {};
function om(l, a, t, u) {
  this.tag = l, this.key = t, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = a, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = u, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ol(l, a, t, u) {
  return new om(l, a, t, u);
}
function bc(l) {
  return l = l.prototype, !(!l || !l.isReactComponent);
}
function va(l, a) {
  var t = l.alternate;
  return t === null ? (t = Ol(
    l.tag,
    a,
    l.key,
    l.mode
  ), t.elementType = l.elementType, t.type = l.type, t.stateNode = l.stateNode, t.alternate = l, l.alternate = t) : (t.pendingProps = a, t.type = l.type, t.flags = 0, t.subtreeFlags = 0, t.deletions = null), t.flags = l.flags & 65011712, t.childLanes = l.childLanes, t.lanes = l.lanes, t.child = l.child, t.memoizedProps = l.memoizedProps, t.memoizedState = l.memoizedState, t.updateQueue = l.updateQueue, a = l.dependencies, t.dependencies = a === null ? null : { lanes: a.lanes, firstContext: a.firstContext }, t.sibling = l.sibling, t.index = l.index, t.ref = l.ref, t.refCleanup = l.refCleanup, t;
}
function m1(l, a) {
  l.flags &= 65011714;
  var t = l.alternate;
  return t === null ? (l.childLanes = 0, l.lanes = a, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = t.childLanes, l.lanes = t.lanes, l.child = t.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = t.memoizedProps, l.memoizedState = t.memoizedState, l.updateQueue = t.updateQueue, l.type = t.type, a = t.dependencies, l.dependencies = a === null ? null : {
    lanes: a.lanes,
    firstContext: a.firstContext
  }), l;
}
function se(l, a, t, u, e, n) {
  var f = 0;
  if (u = l, typeof l == "function") bc(l) && (f = 1);
  else if (typeof l == "string")
    f = qh(
      l,
      t,
      kl.current
    ) ? 26 : l === "html" || l === "head" || l === "body" ? 27 : 5;
  else
    l: switch (l) {
      case vf:
        return l = Ol(31, t, a, e), l.elementType = vf, l.lanes = n, l;
      case bt:
        return Ia(t.children, e, n, a);
      case B0:
        f = 8, e |= 24;
        break;
      case nf:
        return l = Ol(12, t, a, e | 2), l.elementType = nf, l.lanes = n, l;
      case ff:
        return l = Ol(13, t, a, e), l.elementType = ff, l.lanes = n, l;
      case cf:
        return l = Ol(19, t, a, e), l.elementType = cf, l.lanes = n, l;
      default:
        if (typeof l == "object" && l !== null)
          switch (l.$$typeof) {
            case fa:
              f = 10;
              break l;
            case q0:
              f = 9;
              break l;
            case tc:
              f = 11;
              break l;
            case uc:
              f = 14;
              break l;
            case Aa:
              f = 16, u = null;
              break l;
          }
        f = 29, t = Error(
          s(130, l === null ? "null" : typeof l, "")
        ), u = null;
    }
  return a = Ol(f, t, a, e), a.elementType = l, a.type = u, a.lanes = n, a;
}
function Ia(l, a, t, u) {
  return l = Ol(7, l, u, a), l.lanes = t, l;
}
function Gn(l, a, t) {
  return l = Ol(6, l, null, a), l.lanes = t, l;
}
function h1(l) {
  var a = Ol(18, null, null, 0);
  return a.stateNode = l, a;
}
function Zn(l, a, t) {
  return a = Ol(
    4,
    l.children !== null ? l.children : [],
    l.key,
    a
  ), a.lanes = t, a.stateNode = {
    containerInfo: l.containerInfo,
    pendingChildren: null,
    implementation: l.implementation
  }, a;
}
var Ei = /* @__PURE__ */ new WeakMap();
function jl(l, a) {
  if (typeof l == "object" && l !== null) {
    var t = Ei.get(l);
    return t !== void 0 ? t : (a = {
      value: l,
      source: a,
      stack: ti(a)
    }, Ei.set(l, a), a);
  }
  return {
    value: l,
    source: a,
    stack: ti(a)
  };
}
var Ot = [], ot = 0, Ze = null, Nu = 0, Zl = [], Cl = 0, ja = null, wl = 1, $l = "";
function ea(l, a) {
  Ot[ot++] = Nu, Ot[ot++] = Ze, Ze = l, Nu = a;
}
function d1(l, a, t) {
  Zl[Cl++] = wl, Zl[Cl++] = $l, Zl[Cl++] = ja, ja = l;
  var u = wl;
  l = $l;
  var e = 32 - _l(u) - 1;
  u &= ~(1 << e), t += 1;
  var n = 32 - _l(a) + e;
  if (30 < n) {
    var f = e - e % 5;
    n = (u & (1 << f) - 1).toString(32), u >>= f, e -= f, wl = 1 << 32 - _l(a) + e | t << e | u, $l = n + l;
  } else
    wl = 1 << n | t << e | u, $l = l;
}
function zc(l) {
  l.return !== null && (ea(l, 1), d1(l, 1, 0));
}
function sc(l) {
  for (; l === Ze; )
    Ze = Ot[--ot], Ot[ot] = null, Nu = Ot[--ot], Ot[ot] = null;
  for (; l === ja; )
    ja = Zl[--Cl], Zl[Cl] = null, $l = Zl[--Cl], Zl[Cl] = null, wl = Zl[--Cl], Zl[Cl] = null;
}
function S1(l, a) {
  Zl[Cl++] = wl, Zl[Cl++] = $l, Zl[Cl++] = ja, wl = a.id, $l = a.overflow, ja = l;
}
var hl = null, W = null, G = !1, qa = null, Vl = !1, Uf = Error(s(519));
function Va(l) {
  var a = Error(
    s(
      418,
      1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
      ""
    )
  );
  throw _u(jl(a, l)), Uf;
}
function Ui(l) {
  var a = l.stateNode, t = l.type, u = l.memoizedProps;
  switch (a[ml] = l, a[Ml] = u, t) {
    case "dialog":
      q("cancel", a), q("close", a);
      break;
    case "iframe":
    case "object":
    case "embed":
      q("load", a);
      break;
    case "video":
    case "audio":
      for (t = 0; t < Qu.length; t++)
        q(Qu[t], a);
      break;
    case "source":
      q("error", a);
      break;
    case "img":
    case "image":
    case "link":
      q("error", a), q("load", a);
      break;
    case "details":
      q("toggle", a);
      break;
    case "input":
      q("invalid", a), L0(
        a,
        u.value,
        u.defaultValue,
        u.checked,
        u.defaultChecked,
        u.type,
        u.name,
        !0
      );
      break;
    case "select":
      q("invalid", a);
      break;
    case "textarea":
      q("invalid", a), W0(a, u.value, u.defaultValue, u.children);
  }
  t = u.children, typeof t != "string" && typeof t != "number" && typeof t != "bigint" || a.textContent === "" + t || u.suppressHydrationWarning === !0 || kv(a.textContent, t) ? (u.popover != null && (q("beforetoggle", a), q("toggle", a)), u.onScroll != null && q("scroll", a), u.onScrollEnd != null && q("scrollend", a), u.onClick != null && (a.onclick = ca), a = !0) : a = !1, a || Va(l, !0);
}
function Di(l) {
  for (hl = l.return; hl; )
    switch (hl.tag) {
      case 5:
      case 31:
      case 13:
        Vl = !1;
        return;
      case 27:
      case 3:
        Vl = !0;
        return;
      default:
        hl = hl.return;
    }
}
function ht(l) {
  if (l !== hl) return !1;
  if (!G) return Di(l), G = !0, !1;
  var a = l.tag, t;
  if ((t = a !== 3 && a !== 27) && ((t = a === 5) && (t = l.type, t = !(t !== "form" && t !== "button") || $f(l.type, l.memoizedProps)), t = !t), t && W && Va(l), Di(l), a === 13) {
    if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
    W = y0(l);
  } else if (a === 31) {
    if (l = l.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(317));
    W = y0(l);
  } else
    a === 27 ? (a = W, La(l.type) ? (l = If, If = null, W = l) : W = a) : W = hl ? Kl(l.stateNode.nextSibling) : null;
  return !0;
}
function tt() {
  W = hl = null, G = !1;
}
function Cn() {
  var l = qa;
  return l !== null && (Al === null ? Al = l : Al.push.apply(
    Al,
    l
  ), qa = null), l;
}
function _u(l) {
  qa === null ? qa = [l] : qa.push(l);
}
var Df = rl(null), mt = null, ia = null;
function Ma(l, a, t) {
  L(Df, a._currentValue), a._currentValue = t;
}
function ya(l) {
  l._currentValue = Df.current, vl(Df);
}
function Of(l, a, t) {
  for (; l !== null; ) {
    var u = l.alternate;
    if ((l.childLanes & a) !== a ? (l.childLanes |= a, u !== null && (u.childLanes |= a)) : u !== null && (u.childLanes & a) !== a && (u.childLanes |= a), l === t) break;
    l = l.return;
  }
}
function of(l, a, t, u) {
  var e = l.child;
  for (e !== null && (e.return = l); e !== null; ) {
    var n = e.dependencies;
    if (n !== null) {
      var f = e.child;
      n = n.firstContext;
      l: for (; n !== null; ) {
        var c = n;
        n = e;
        for (var i = 0; i < a.length; i++)
          if (c.context === a[i]) {
            n.lanes |= t, c = n.alternate, c !== null && (c.lanes |= t), Of(
              n.return,
              t,
              l
            ), u || (f = null);
            break l;
          }
        n = c.next;
      }
    } else if (e.tag === 18) {
      if (f = e.return, f === null) throw Error(s(341));
      f.lanes |= t, n = f.alternate, n !== null && (n.lanes |= t), Of(f, t, l), f = null;
    } else f = e.child;
    if (f !== null) f.return = e;
    else
      for (f = e; f !== null; ) {
        if (f === l) {
          f = null;
          break;
        }
        if (e = f.sibling, e !== null) {
          e.return = f.return, f = e;
          break;
        }
        f = f.return;
      }
    e = f;
  }
}
function $t(l, a, t, u) {
  l = null;
  for (var e = a, n = !1; e !== null; ) {
    if (!n) {
      if ((e.flags & 524288) !== 0) n = !0;
      else if ((e.flags & 262144) !== 0) break;
    }
    if (e.tag === 10) {
      var f = e.alternate;
      if (f === null) throw Error(s(387));
      if (f = f.memoizedProps, f !== null) {
        var c = e.type;
        ql(e.pendingProps.value, f.value) || (l !== null ? l.push(c) : l = [c]);
      }
    } else if (e === _e.current) {
      if (f = e.alternate, f === null) throw Error(s(387));
      f.memoizedState.memoizedState !== e.memoizedState.memoizedState && (l !== null ? l.push(Gu) : l = [Gu]);
    }
    e = e.return;
  }
  l !== null && of(
    a,
    l,
    t,
    u
  ), a.flags |= 262144;
}
function Ce(l) {
  for (l = l.firstContext; l !== null; ) {
    if (!ql(
      l.context._currentValue,
      l.memoizedValue
    ))
      return !0;
    l = l.next;
  }
  return !1;
}
function ut(l) {
  mt = l, ia = null, l = l.dependencies, l !== null && (l.firstContext = null);
}
function dl(l) {
  return g1(mt, l);
}
function ne(l, a) {
  return mt === null && ut(l), g1(l, a);
}
function g1(l, a) {
  var t = a._currentValue;
  if (a = { context: a, memoizedValue: t, next: null }, ia === null) {
    if (l === null) throw Error(s(308));
    ia = a, l.dependencies = { lanes: 0, firstContext: a }, l.flags |= 524288;
  } else ia = ia.next = a;
  return t;
}
var Hm = typeof AbortController < "u" ? AbortController : function() {
  var l = [], a = this.signal = {
    aborted: !1,
    addEventListener: function(t, u) {
      l.push(u);
    }
  };
  this.abort = function() {
    a.aborted = !0, l.forEach(function(t) {
      return t();
    });
  };
}, Nm = nl.unstable_scheduleCallback, _m = nl.unstable_NormalPriority, tl = {
  $$typeof: fa,
  Consumer: null,
  Provider: null,
  _currentValue: null,
  _currentValue2: null,
  _threadCount: 0
};
function Ac() {
  return {
    controller: new Hm(),
    data: /* @__PURE__ */ new Map(),
    refCount: 0
  };
}
function Lu(l) {
  l.refCount--, l.refCount === 0 && Nm(_m, function() {
    l.controller.abort();
  });
}
var Su = null, Hf = 0, Rt = 0, qt = null;
function Bm(l, a) {
  if (Su === null) {
    var t = Su = [];
    Hf = 0, Rt = Lc(), qt = {
      status: "pending",
      value: void 0,
      then: function(u) {
        t.push(u);
      }
    };
  }
  return Hf++, a.then(Oi, Oi), a;
}
function Oi() {
  if (--Hf === 0 && Su !== null) {
    qt !== null && (qt.status = "fulfilled");
    var l = Su;
    Su = null, Rt = 0, qt = null;
    for (var a = 0; a < l.length; a++) (0, l[a])();
  }
}
function qm(l, a) {
  var t = [], u = {
    status: "pending",
    value: null,
    reason: null,
    then: function(e) {
      t.push(e);
    }
  };
  return l.then(
    function() {
      u.status = "fulfilled", u.value = a;
      for (var e = 0; e < t.length; e++) (0, t[e])(a);
    },
    function(e) {
      for (u.status = "rejected", u.reason = e, e = 0; e < t.length; e++)
        (0, t[e])(void 0);
    }
  ), u;
}
var oi = D.S;
D.S = function(l, a) {
  _v = Hl(), typeof a == "object" && a !== null && typeof a.then == "function" && Bm(l, a), oi !== null && oi(l, a);
};
var Pa = rl(null);
function Tc() {
  var l = Pa.current;
  return l !== null ? l : x.pooledCache;
}
function Ae(l, a) {
  a === null ? L(Pa, Pa.current) : L(Pa, a.pool);
}
function b1() {
  var l = Tc();
  return l === null ? null : { parent: tl._currentValue, pool: l };
}
var Ft = Error(s(460)), Mc = Error(s(474)), mn = Error(s(542)), Re = { then: function() {
} };
function Hi(l) {
  return l = l.status, l === "fulfilled" || l === "rejected";
}
function z1(l, a, t) {
  switch (t = l[t], t === void 0 ? l.push(a) : t !== a && (a.then(ca, ca), a = t), a.status) {
    case "fulfilled":
      return a.value;
    case "rejected":
      throw l = a.reason, _i(l), l;
    default:
      if (typeof a.status == "string") a.then(ca, ca);
      else {
        if (l = x, l !== null && 100 < l.shellSuspendCounter)
          throw Error(s(482));
        l = a, l.status = "pending", l.then(
          function(u) {
            if (a.status === "pending") {
              var e = a;
              e.status = "fulfilled", e.value = u;
            }
          },
          function(u) {
            if (a.status === "pending") {
              var e = a;
              e.status = "rejected", e.reason = u;
            }
          }
        );
      }
      switch (a.status) {
        case "fulfilled":
          return a.value;
        case "rejected":
          throw l = a.reason, _i(l), l;
      }
      throw lt = a, Ft;
  }
}
function Fa(l) {
  try {
    var a = l._init;
    return a(l._payload);
  } catch (t) {
    throw t !== null && typeof t == "object" && typeof t.then == "function" ? (lt = t, Ft) : t;
  }
}
var lt = null;
function Ni() {
  if (lt === null) throw Error(s(459));
  var l = lt;
  return lt = null, l;
}
function _i(l) {
  if (l === Ft || l === mn)
    throw Error(s(483));
}
var Yt = null, Bu = 0;
function fe(l) {
  var a = Bu;
  return Bu += 1, Yt === null && (Yt = []), z1(Yt, l, a);
}
function tu(l, a) {
  a = a.props.ref, l.ref = a !== void 0 ? a : null;
}
function ce(l, a) {
  throw a.$$typeof === zy ? Error(s(525)) : (l = Object.prototype.toString.call(a), Error(
    s(
      31,
      l === "[object Object]" ? "object with keys {" + Object.keys(a).join(", ") + "}" : l
    )
  ));
}
function s1(l) {
  function a(y, v) {
    if (l) {
      var d = y.deletions;
      d === null ? (y.deletions = [v], y.flags |= 16) : d.push(v);
    }
  }
  function t(y, v) {
    if (!l) return null;
    for (; v !== null; )
      a(y, v), v = v.sibling;
    return null;
  }
  function u(y) {
    for (var v = /* @__PURE__ */ new Map(); y !== null; )
      y.key !== null ? v.set(y.key, y) : v.set(y.index, y), y = y.sibling;
    return v;
  }
  function e(y, v) {
    return y = va(y, v), y.index = 0, y.sibling = null, y;
  }
  function n(y, v, d) {
    return y.index = d, l ? (d = y.alternate, d !== null ? (d = d.index, d < v ? (y.flags |= 67108866, v) : d) : (y.flags |= 67108866, v)) : (y.flags |= 1048576, v);
  }
  function f(y) {
    return l && y.alternate === null && (y.flags |= 67108866), y;
  }
  function c(y, v, d, z) {
    return v === null || v.tag !== 6 ? (v = Gn(d, y.mode, z), v.return = y, v) : (v = e(v, d), v.return = y, v);
  }
  function i(y, v, d, z) {
    var E = d.type;
    return E === bt ? g(
      y,
      v,
      d.props.children,
      z,
      d.key
    ) : v !== null && (v.elementType === E || typeof E == "object" && E !== null && E.$$typeof === Aa && Fa(E) === v.type) ? (v = e(v, d.props), tu(v, d), v.return = y, v) : (v = se(
      d.type,
      d.key,
      d.props,
      null,
      y.mode,
      z
    ), tu(v, d), v.return = y, v);
  }
  function h(y, v, d, z) {
    return v === null || v.tag !== 4 || v.stateNode.containerInfo !== d.containerInfo || v.stateNode.implementation !== d.implementation ? (v = Zn(d, y.mode, z), v.return = y, v) : (v = e(v, d.children || []), v.return = y, v);
  }
  function g(y, v, d, z, E) {
    return v === null || v.tag !== 7 ? (v = Ia(
      d,
      y.mode,
      z,
      E
    ), v.return = y, v) : (v = e(v, d), v.return = y, v);
  }
  function b(y, v, d) {
    if (typeof v == "string" && v !== "" || typeof v == "number" || typeof v == "bigint")
      return v = Gn(
        "" + v,
        y.mode,
        d
      ), v.return = y, v;
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case Pu:
          return d = se(
            v.type,
            v.key,
            v.props,
            null,
            y.mode,
            d
          ), tu(d, v), d.return = y, d;
        case fu:
          return v = Zn(
            v,
            y.mode,
            d
          ), v.return = y, v;
        case Aa:
          return v = Fa(v), b(y, v, d);
      }
      if (cu(v) || Pt(v))
        return v = Ia(
          v,
          y.mode,
          d,
          null
        ), v.return = y, v;
      if (typeof v.then == "function")
        return b(y, fe(v), d);
      if (v.$$typeof === fa)
        return b(
          y,
          ne(y, v),
          d
        );
      ce(y, v);
    }
    return null;
  }
  function m(y, v, d, z) {
    var E = v !== null ? v.key : null;
    if (typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint")
      return E !== null ? null : c(y, v, "" + d, z);
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case Pu:
          return d.key === E ? i(y, v, d, z) : null;
        case fu:
          return d.key === E ? h(y, v, d, z) : null;
        case Aa:
          return d = Fa(d), m(y, v, d, z);
      }
      if (cu(d) || Pt(d))
        return E !== null ? null : g(y, v, d, z, null);
      if (typeof d.then == "function")
        return m(
          y,
          v,
          fe(d),
          z
        );
      if (d.$$typeof === fa)
        return m(
          y,
          v,
          ne(y, d),
          z
        );
      ce(y, d);
    }
    return null;
  }
  function S(y, v, d, z, E) {
    if (typeof z == "string" && z !== "" || typeof z == "number" || typeof z == "bigint")
      return y = y.get(d) || null, c(v, y, "" + z, E);
    if (typeof z == "object" && z !== null) {
      switch (z.$$typeof) {
        case Pu:
          return y = y.get(
            z.key === null ? d : z.key
          ) || null, i(v, y, z, E);
        case fu:
          return y = y.get(
            z.key === null ? d : z.key
          ) || null, h(v, y, z, E);
        case Aa:
          return z = Fa(z), S(
            y,
            v,
            d,
            z,
            E
          );
      }
      if (cu(z) || Pt(z))
        return y = y.get(d) || null, g(v, y, z, E, null);
      if (typeof z.then == "function")
        return S(
          y,
          v,
          d,
          fe(z),
          E
        );
      if (z.$$typeof === fa)
        return S(
          y,
          v,
          d,
          ne(v, z),
          E
        );
      ce(v, z);
    }
    return null;
  }
  function A(y, v, d, z) {
    for (var E = null, H = null, T = v, O = v = 0, N = null; T !== null && O < d.length; O++) {
      T.index > O ? (N = T, T = null) : N = T.sibling;
      var X = m(
        y,
        T,
        d[O],
        z
      );
      if (X === null) {
        T === null && (T = N);
        break;
      }
      l && T && X.alternate === null && a(y, T), v = n(X, v, O), H === null ? E = X : H.sibling = X, H = X, T = N;
    }
    if (O === d.length)
      return t(y, T), G && ea(y, O), E;
    if (T === null) {
      for (; O < d.length; O++)
        T = b(y, d[O], z), T !== null && (v = n(
          T,
          v,
          O
        ), H === null ? E = T : H.sibling = T, H = T);
      return G && ea(y, O), E;
    }
    for (T = u(T); O < d.length; O++)
      N = S(
        T,
        y,
        O,
        d[O],
        z
      ), N !== null && (l && N.alternate !== null && T.delete(
        N.key === null ? O : N.key
      ), v = n(
        N,
        v,
        O
      ), H === null ? E = N : H.sibling = N, H = N);
    return l && T.forEach(function(Ql) {
      return a(y, Ql);
    }), G && ea(y, O), E;
  }
  function U(y, v, d, z) {
    if (d == null) throw Error(s(151));
    for (var E = null, H = null, T = v, O = v = 0, N = null, X = d.next(); T !== null && !X.done; O++, X = d.next()) {
      T.index > O ? (N = T, T = null) : N = T.sibling;
      var Ql = m(y, T, X.value, z);
      if (Ql === null) {
        T === null && (T = N);
        break;
      }
      l && T && Ql.alternate === null && a(y, T), v = n(Ql, v, O), H === null ? E = Ql : H.sibling = Ql, H = Ql, T = N;
    }
    if (X.done)
      return t(y, T), G && ea(y, O), E;
    if (T === null) {
      for (; !X.done; O++, X = d.next())
        X = b(y, X.value, z), X !== null && (v = n(X, v, O), H === null ? E = X : H.sibling = X, H = X);
      return G && ea(y, O), E;
    }
    for (T = u(T); !X.done; O++, X = d.next())
      X = S(T, y, O, X.value, z), X !== null && (l && X.alternate !== null && T.delete(X.key === null ? O : X.key), v = n(X, v, O), H === null ? E = X : H.sibling = X, H = X);
    return l && T.forEach(function(sa) {
      return a(y, sa);
    }), G && ea(y, O), E;
  }
  function Z(y, v, d, z) {
    if (typeof d == "object" && d !== null && d.type === bt && d.key === null && (d = d.props.children), typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case Pu:
          l: {
            for (var E = d.key; v !== null; ) {
              if (v.key === E) {
                if (E = d.type, E === bt) {
                  if (v.tag === 7) {
                    t(
                      y,
                      v.sibling
                    ), z = e(
                      v,
                      d.props.children
                    ), z.return = y, y = z;
                    break l;
                  }
                } else if (v.elementType === E || typeof E == "object" && E !== null && E.$$typeof === Aa && Fa(E) === v.type) {
                  t(
                    y,
                    v.sibling
                  ), z = e(v, d.props), tu(z, d), z.return = y, y = z;
                  break l;
                }
                t(y, v);
                break;
              } else a(y, v);
              v = v.sibling;
            }
            d.type === bt ? (z = Ia(
              d.props.children,
              y.mode,
              z,
              d.key
            ), z.return = y, y = z) : (z = se(
              d.type,
              d.key,
              d.props,
              null,
              y.mode,
              z
            ), tu(z, d), z.return = y, y = z);
          }
          return f(y);
        case fu:
          l: {
            for (E = d.key; v !== null; ) {
              if (v.key === E)
                if (v.tag === 4 && v.stateNode.containerInfo === d.containerInfo && v.stateNode.implementation === d.implementation) {
                  t(
                    y,
                    v.sibling
                  ), z = e(v, d.children || []), z.return = y, y = z;
                  break l;
                } else {
                  t(y, v);
                  break;
                }
              else a(y, v);
              v = v.sibling;
            }
            z = Zn(d, y.mode, z), z.return = y, y = z;
          }
          return f(y);
        case Aa:
          return d = Fa(d), Z(
            y,
            v,
            d,
            z
          );
      }
      if (cu(d))
        return A(
          y,
          v,
          d,
          z
        );
      if (Pt(d)) {
        if (E = Pt(d), typeof E != "function") throw Error(s(150));
        return d = E.call(d), U(
          y,
          v,
          d,
          z
        );
      }
      if (typeof d.then == "function")
        return Z(
          y,
          v,
          fe(d),
          z
        );
      if (d.$$typeof === fa)
        return Z(
          y,
          v,
          ne(y, d),
          z
        );
      ce(y, d);
    }
    return typeof d == "string" && d !== "" || typeof d == "number" || typeof d == "bigint" ? (d = "" + d, v !== null && v.tag === 6 ? (t(y, v.sibling), z = e(v, d), z.return = y, y = z) : (t(y, v), z = Gn(d, y.mode, z), z.return = y, y = z), f(y)) : t(y, v);
  }
  return function(y, v, d, z) {
    try {
      Bu = 0;
      var E = Z(
        y,
        v,
        d,
        z
      );
      return Yt = null, E;
    } catch (T) {
      if (T === Ft || T === mn) throw T;
      var H = Ol(29, T, null, y.mode);
      return H.lanes = z, H.return = y, H;
    } finally {
    }
  };
}
var et = s1(!0), A1 = s1(!1), Ta = !1;
function Ec(l) {
  l.updateQueue = {
    baseState: l.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, lanes: 0, hiddenCallbacks: null },
    callbacks: null
  };
}
function Nf(l, a) {
  l = l.updateQueue, a.updateQueue === l && (a.updateQueue = {
    baseState: l.baseState,
    firstBaseUpdate: l.firstBaseUpdate,
    lastBaseUpdate: l.lastBaseUpdate,
    shared: l.shared,
    callbacks: null
  });
}
function Ya(l) {
  return { lane: l, tag: 0, payload: null, callback: null, next: null };
}
function Qa(l, a, t) {
  var u = l.updateQueue;
  if (u === null) return null;
  if (u = u.shared, (C & 2) !== 0) {
    var e = u.pending;
    return e === null ? a.next = a : (a.next = e.next, e.next = a), u.pending = a, a = Ge(l), y1(l, null, t), a;
  }
  return yn(l, u, a, t), Ge(l);
}
function gu(l, a, t) {
  if (a = a.updateQueue, a !== null && (a = a.shared, (t & 4194048) !== 0)) {
    var u = a.lanes;
    u &= l.pendingLanes, t |= u, a.lanes = t, C0(l, t);
  }
}
function Rn(l, a) {
  var t = l.updateQueue, u = l.alternate;
  if (u !== null && (u = u.updateQueue, t === u)) {
    var e = null, n = null;
    if (t = t.firstBaseUpdate, t !== null) {
      do {
        var f = {
          lane: t.lane,
          tag: t.tag,
          payload: t.payload,
          callback: null,
          next: null
        };
        n === null ? e = n = f : n = n.next = f, t = t.next;
      } while (t !== null);
      n === null ? e = n = a : n = n.next = a;
    } else e = n = a;
    t = {
      baseState: u.baseState,
      firstBaseUpdate: e,
      lastBaseUpdate: n,
      shared: u.shared,
      callbacks: u.callbacks
    }, l.updateQueue = t;
    return;
  }
  l = t.lastBaseUpdate, l === null ? t.firstBaseUpdate = a : l.next = a, t.lastBaseUpdate = a;
}
var _f = !1;
function bu() {
  if (_f) {
    var l = qt;
    if (l !== null) throw l;
  }
}
function zu(l, a, t, u) {
  _f = !1;
  var e = l.updateQueue;
  Ta = !1;
  var n = e.firstBaseUpdate, f = e.lastBaseUpdate, c = e.shared.pending;
  if (c !== null) {
    e.shared.pending = null;
    var i = c, h = i.next;
    i.next = null, f === null ? n = h : f.next = h, f = i;
    var g = l.alternate;
    g !== null && (g = g.updateQueue, c = g.lastBaseUpdate, c !== f && (c === null ? g.firstBaseUpdate = h : c.next = h, g.lastBaseUpdate = i));
  }
  if (n !== null) {
    var b = e.baseState;
    f = 0, g = h = i = null, c = n;
    do {
      var m = c.lane & -536870913, S = m !== c.lane;
      if (S ? (Q & m) === m : (u & m) === m) {
        m !== 0 && m === Rt && (_f = !0), g !== null && (g = g.next = {
          lane: 0,
          tag: c.tag,
          payload: c.payload,
          callback: null,
          next: null
        });
        l: {
          var A = l, U = c;
          m = a;
          var Z = t;
          switch (U.tag) {
            case 1:
              if (A = U.payload, typeof A == "function") {
                b = A.call(Z, b, m);
                break l;
              }
              b = A;
              break l;
            case 3:
              A.flags = A.flags & -65537 | 128;
            case 0:
              if (A = U.payload, m = typeof A == "function" ? A.call(Z, b, m) : A, m == null) break l;
              b = w({}, b, m);
              break l;
            case 2:
              Ta = !0;
          }
        }
        m = c.callback, m !== null && (l.flags |= 64, S && (l.flags |= 8192), S = e.callbacks, S === null ? e.callbacks = [m] : S.push(m));
      } else
        S = {
          lane: m,
          tag: c.tag,
          payload: c.payload,
          callback: c.callback,
          next: null
        }, g === null ? (h = g = S, i = b) : g = g.next = S, f |= m;
      if (c = c.next, c === null) {
        if (c = e.shared.pending, c === null)
          break;
        S = c, c = S.next, S.next = null, e.lastBaseUpdate = S, e.shared.pending = null;
      }
    } while (!0);
    g === null && (i = b), e.baseState = i, e.firstBaseUpdate = h, e.lastBaseUpdate = g, n === null && (e.shared.lanes = 0), Ka |= f, l.lanes = f, l.memoizedState = b;
  }
}
function T1(l, a) {
  if (typeof l != "function")
    throw Error(s(191, l));
  l.call(a);
}
function M1(l, a) {
  var t = l.callbacks;
  if (t !== null)
    for (l.callbacks = null, l = 0; l < t.length; l++)
      T1(t[l], a);
}
var jt = rl(null), je = rl(0);
function Bi(l, a) {
  l = ba, L(je, l), L(jt, a), ba = l | a.baseLanes;
}
function Bf() {
  L(je, ba), L(jt, jt.current);
}
function Uc() {
  ba = je.current, vl(jt), vl(je);
}
var Yl = rl(null), pl = null;
function Ea(l) {
  var a = l.alternate;
  L(I, I.current & 1), L(Yl, l), pl === null && (a === null || jt.current !== null || a.memoizedState !== null) && (pl = l);
}
function qf(l) {
  L(I, I.current), L(Yl, l), pl === null && (pl = l);
}
function E1(l) {
  l.tag === 22 ? (L(I, I.current), L(Yl, l), pl === null && (pl = l)) : Ua();
}
function Ua() {
  L(I, I.current), L(Yl, Yl.current);
}
function Dl(l) {
  vl(Yl), pl === l && (pl = null), vl(I);
}
var I = rl(0);
function Ve(l) {
  for (var a = l; a !== null; ) {
    if (a.tag === 13) {
      var t = a.memoizedState;
      if (t !== null && (t = t.dehydrated, t === null || kf(t) || rf(t)))
        return a;
    } else if (a.tag === 19 && (a.memoizedProps.revealOrder === "forwards" || a.memoizedProps.revealOrder === "backwards" || a.memoizedProps.revealOrder === "unstable_legacy-backwards" || a.memoizedProps.revealOrder === "together")) {
      if ((a.flags & 128) !== 0) return a;
    } else if (a.child !== null) {
      a.child.return = a, a = a.child;
      continue;
    }
    if (a === l) break;
    for (; a.sibling === null; ) {
      if (a.return === null || a.return === l) return null;
      a = a.return;
    }
    a.sibling.return = a.return, a = a.sibling;
  }
  return null;
}
var da = 0, o = null, K = null, ll = null, pe = !1, Qt = !1, nt = !1, Ke = 0, qu = 0, Xt = null, Ym = 0;
function F() {
  throw Error(s(321));
}
function Dc(l, a) {
  if (a === null) return !1;
  for (var t = 0; t < a.length && t < l.length; t++)
    if (!ql(l[t], a[t])) return !1;
  return !0;
}
function Oc(l, a, t, u, e, n) {
  return da = n, o = a, a.memoizedState = null, a.updateQueue = null, a.lanes = 0, D.H = l === null || l.memoizedState === null ? P1 : Zc, nt = !1, n = t(u, e), nt = !1, Qt && (n = D1(
    a,
    t,
    u,
    e
  )), U1(l), n;
}
function U1(l) {
  D.H = Yu;
  var a = K !== null && K.next !== null;
  if (da = 0, ll = K = o = null, pe = !1, qu = 0, Xt = null, a) throw Error(s(300));
  l === null || ul || (l = l.dependencies, l !== null && Ce(l) && (ul = !0));
}
function D1(l, a, t, u) {
  o = l;
  var e = 0;
  do {
    if (Qt && (Xt = null), qu = 0, Qt = !1, 25 <= e) throw Error(s(301));
    if (e += 1, ll = K = null, l.updateQueue != null) {
      var n = l.updateQueue;
      n.lastEffect = null, n.events = null, n.stores = null, n.memoCache != null && (n.memoCache.index = 0);
    }
    D.H = lv, n = a(t, u);
  } while (Qt);
  return n;
}
function Qm() {
  var l = D.H, a = l.useState()[0];
  return a = typeof a.then == "function" ? Ju(a) : a, l = l.useState()[0], (K !== null ? K.memoizedState : null) !== l && (o.flags |= 1024), a;
}
function oc() {
  var l = Ke !== 0;
  return Ke = 0, l;
}
function Hc(l, a, t) {
  a.updateQueue = l.updateQueue, a.flags &= -2053, l.lanes &= ~t;
}
function Nc(l) {
  if (pe) {
    for (l = l.memoizedState; l !== null; ) {
      var a = l.queue;
      a !== null && (a.pending = null), l = l.next;
    }
    pe = !1;
  }
  da = 0, ll = K = o = null, Qt = !1, qu = Ke = 0, Xt = null;
}
function gl() {
  var l = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  return ll === null ? o.memoizedState = ll = l : ll = ll.next = l, ll;
}
function P() {
  if (K === null) {
    var l = o.alternate;
    l = l !== null ? l.memoizedState : null;
  } else l = K.next;
  var a = ll === null ? o.memoizedState : ll.next;
  if (a !== null)
    ll = a, K = l;
  else {
    if (l === null)
      throw o.alternate === null ? Error(s(467)) : Error(s(310));
    K = l, l = {
      memoizedState: K.memoizedState,
      baseState: K.baseState,
      baseQueue: K.baseQueue,
      queue: K.queue,
      next: null
    }, ll === null ? o.memoizedState = ll = l : ll = ll.next = l;
  }
  return ll;
}
function hn() {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
}
function Ju(l) {
  var a = qu;
  return qu += 1, Xt === null && (Xt = []), l = z1(Xt, l, a), a = o, (ll === null ? a.memoizedState : ll.next) === null && (a = a.alternate, D.H = a === null || a.memoizedState === null ? P1 : Zc), l;
}
function dn(l) {
  if (l !== null && typeof l == "object") {
    if (typeof l.then == "function") return Ju(l);
    if (l.$$typeof === fa) return dl(l);
  }
  throw Error(s(438, String(l)));
}
function _c(l) {
  var a = null, t = o.updateQueue;
  if (t !== null && (a = t.memoCache), a == null) {
    var u = o.alternate;
    u !== null && (u = u.updateQueue, u !== null && (u = u.memoCache, u != null && (a = {
      data: u.data.map(function(e) {
        return e.slice();
      }),
      index: 0
    })));
  }
  if (a == null && (a = { data: [], index: 0 }), t === null && (t = hn(), o.updateQueue = t), t.memoCache = a, t = a.data[a.index], t === void 0)
    for (t = a.data[a.index] = Array(l), u = 0; u < l; u++)
      t[u] = sy;
  return a.index++, t;
}
function Sa(l, a) {
  return typeof a == "function" ? a(l) : a;
}
function Te(l) {
  var a = P();
  return Bc(a, K, l);
}
function Bc(l, a, t) {
  var u = l.queue;
  if (u === null) throw Error(s(311));
  u.lastRenderedReducer = t;
  var e = l.baseQueue, n = u.pending;
  if (n !== null) {
    if (e !== null) {
      var f = e.next;
      e.next = n.next, n.next = f;
    }
    a.baseQueue = e = n, u.pending = null;
  }
  if (n = l.baseState, e === null) l.memoizedState = n;
  else {
    a = e.next;
    var c = f = null, i = null, h = a, g = !1;
    do {
      var b = h.lane & -536870913;
      if (b !== h.lane ? (Q & b) === b : (da & b) === b) {
        var m = h.revertLane;
        if (m === 0)
          i !== null && (i = i.next = {
            lane: 0,
            revertLane: 0,
            gesture: null,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null
          }), b === Rt && (g = !0);
        else if ((da & m) === m) {
          h = h.next, m === Rt && (g = !0);
          continue;
        } else
          b = {
            lane: 0,
            revertLane: h.revertLane,
            gesture: null,
            action: h.action,
            hasEagerState: h.hasEagerState,
            eagerState: h.eagerState,
            next: null
          }, i === null ? (c = i = b, f = n) : i = i.next = b, o.lanes |= m, Ka |= m;
        b = h.action, nt && t(n, b), n = h.hasEagerState ? h.eagerState : t(n, b);
      } else
        m = {
          lane: b,
          revertLane: h.revertLane,
          gesture: h.gesture,
          action: h.action,
          hasEagerState: h.hasEagerState,
          eagerState: h.eagerState,
          next: null
        }, i === null ? (c = i = m, f = n) : i = i.next = m, o.lanes |= b, Ka |= b;
      h = h.next;
    } while (h !== null && h !== a);
    if (i === null ? f = n : i.next = c, !ql(n, l.memoizedState) && (ul = !0, g && (t = qt, t !== null)))
      throw t;
    l.memoizedState = n, l.baseState = f, l.baseQueue = i, u.lastRenderedState = n;
  }
  return e === null && (u.lanes = 0), [l.memoizedState, u.dispatch];
}
function jn(l) {
  var a = P(), t = a.queue;
  if (t === null) throw Error(s(311));
  t.lastRenderedReducer = l;
  var u = t.dispatch, e = t.pending, n = a.memoizedState;
  if (e !== null) {
    t.pending = null;
    var f = e = e.next;
    do
      n = l(n, f.action), f = f.next;
    while (f !== e);
    ql(n, a.memoizedState) || (ul = !0), a.memoizedState = n, a.baseQueue === null && (a.baseState = n), t.lastRenderedState = n;
  }
  return [n, u];
}
function O1(l, a, t) {
  var u = o, e = P(), n = G;
  if (n) {
    if (t === void 0) throw Error(s(407));
    t = t();
  } else t = a();
  var f = !ql(
    (K || e).memoizedState,
    t
  );
  if (f && (e.memoizedState = t, ul = !0), e = e.queue, qc(N1.bind(null, u, e, l), [
    l
  ]), e.getSnapshot !== a || f || ll !== null && ll.memoizedState.tag & 1) {
    if (u.flags |= 2048, Vt(
      9,
      { destroy: void 0 },
      H1.bind(
        null,
        u,
        e,
        t,
        a
      ),
      null
    ), x === null) throw Error(s(349));
    n || (da & 127) !== 0 || o1(u, a, t);
  }
  return t;
}
function o1(l, a, t) {
  l.flags |= 16384, l = { getSnapshot: a, value: t }, a = o.updateQueue, a === null ? (a = hn(), o.updateQueue = a, a.stores = [l]) : (t = a.stores, t === null ? a.stores = [l] : t.push(l));
}
function H1(l, a, t, u) {
  a.value = t, a.getSnapshot = u, _1(a) && B1(l);
}
function N1(l, a, t) {
  return t(function() {
    _1(a) && B1(l);
  });
}
function _1(l) {
  var a = l.getSnapshot;
  l = l.value;
  try {
    var t = a();
    return !ql(l, t);
  } catch {
    return !0;
  }
}
function B1(l) {
  var a = yt(l, 2);
  a !== null && Tl(a, l, 2);
}
function Yf(l) {
  var a = gl();
  if (typeof l == "function") {
    var t = l;
    if (l = t(), nt) {
      Oa(!0);
      try {
        t();
      } finally {
        Oa(!1);
      }
    }
  }
  return a.memoizedState = a.baseState = l, a.queue = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: Sa,
    lastRenderedState: l
  }, a;
}
function q1(l, a, t, u) {
  return l.baseState = t, Bc(
    l,
    K,
    typeof u == "function" ? u : Sa
  );
}
function Xm(l, a, t, u, e) {
  if (gn(l)) throw Error(s(485));
  if (l = a.action, l !== null) {
    var n = {
      payload: e,
      action: l,
      next: null,
      isTransition: !0,
      status: "pending",
      value: null,
      reason: null,
      listeners: [],
      then: function(f) {
        n.listeners.push(f);
      }
    };
    D.T !== null ? t(!0) : n.isTransition = !1, u(n), t = a.pending, t === null ? (n.next = a.pending = n, Y1(a, n)) : (n.next = t.next, a.pending = t.next = n);
  }
}
function Y1(l, a) {
  var t = a.action, u = a.payload, e = l.state;
  if (a.isTransition) {
    var n = D.T, f = {};
    D.T = f;
    try {
      var c = t(e, u), i = D.S;
      i !== null && i(f, c), qi(l, a, c);
    } catch (h) {
      Qf(l, a, h);
    } finally {
      n !== null && f.types !== null && (n.types = f.types), D.T = n;
    }
  } else
    try {
      n = t(e, u), qi(l, a, n);
    } catch (h) {
      Qf(l, a, h);
    }
}
function qi(l, a, t) {
  t !== null && typeof t == "object" && typeof t.then == "function" ? t.then(
    function(u) {
      Yi(l, a, u);
    },
    function(u) {
      return Qf(l, a, u);
    }
  ) : Yi(l, a, t);
}
function Yi(l, a, t) {
  a.status = "fulfilled", a.value = t, Q1(a), l.state = t, a = l.pending, a !== null && (t = a.next, t === a ? l.pending = null : (t = t.next, a.next = t, Y1(l, t)));
}
function Qf(l, a, t) {
  var u = l.pending;
  if (l.pending = null, u !== null) {
    u = u.next;
    do
      a.status = "rejected", a.reason = t, Q1(a), a = a.next;
    while (a !== u);
  }
  l.action = null;
}
function Q1(l) {
  l = l.listeners;
  for (var a = 0; a < l.length; a++) (0, l[a])();
}
function X1(l, a) {
  return a;
}
function Qi(l, a) {
  if (G) {
    var t = x.formState;
    if (t !== null) {
      l: {
        var u = o;
        if (G) {
          if (W) {
            a: {
              for (var e = W, n = Vl; e.nodeType !== 8; ) {
                if (!n) {
                  e = null;
                  break a;
                }
                if (e = Kl(
                  e.nextSibling
                ), e === null) {
                  e = null;
                  break a;
                }
              }
              n = e.data, e = n === "F!" || n === "F" ? e : null;
            }
            if (e) {
              W = Kl(
                e.nextSibling
              ), u = e.data === "F!";
              break l;
            }
          }
          Va(u);
        }
        u = !1;
      }
      u && (a = t[0]);
    }
  }
  return t = gl(), t.memoizedState = t.baseState = a, u = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: X1,
    lastRenderedState: a
  }, t.queue = u, t = k1.bind(
    null,
    o,
    u
  ), u.dispatch = t, u = Yf(!1), n = Gc.bind(
    null,
    o,
    !1,
    u.queue
  ), u = gl(), e = {
    state: a,
    dispatch: null,
    action: l,
    pending: null
  }, u.queue = e, t = Xm.bind(
    null,
    o,
    e,
    n,
    t
  ), e.dispatch = t, u.memoizedState = l, [a, t, !1];
}
function Xi(l) {
  var a = P();
  return G1(a, K, l);
}
function G1(l, a, t) {
  if (a = Bc(
    l,
    a,
    X1
  )[0], l = Te(Sa)[0], typeof a == "object" && a !== null && typeof a.then == "function")
    try {
      var u = Ju(a);
    } catch (f) {
      throw f === Ft ? mn : f;
    }
  else u = a;
  a = P();
  var e = a.queue, n = e.dispatch;
  return t !== a.memoizedState && (o.flags |= 2048, Vt(
    9,
    { destroy: void 0 },
    Gm.bind(null, e, t),
    null
  )), [u, n, l];
}
function Gm(l, a) {
  l.action = a;
}
function Gi(l) {
  var a = P(), t = K;
  if (t !== null)
    return G1(a, t, l);
  P(), a = a.memoizedState, t = P();
  var u = t.queue.dispatch;
  return t.memoizedState = l, [a, u, !1];
}
function Vt(l, a, t, u) {
  return l = { tag: l, create: t, deps: u, inst: a, next: null }, a = o.updateQueue, a === null && (a = hn(), o.updateQueue = a), t = a.lastEffect, t === null ? a.lastEffect = l.next = l : (u = t.next, t.next = l, l.next = u, a.lastEffect = l), l;
}
function Z1() {
  return P().memoizedState;
}
function Me(l, a, t, u) {
  var e = gl();
  o.flags |= l, e.memoizedState = Vt(
    1 | a,
    { destroy: void 0 },
    t,
    u === void 0 ? null : u
  );
}
function Sn(l, a, t, u) {
  var e = P();
  u = u === void 0 ? null : u;
  var n = e.memoizedState.inst;
  K !== null && u !== null && Dc(u, K.memoizedState.deps) ? e.memoizedState = Vt(a, n, t, u) : (o.flags |= l, e.memoizedState = Vt(
    1 | a,
    n,
    t,
    u
  ));
}
function Zi(l, a) {
  Me(8390656, 8, l, a);
}
function qc(l, a) {
  Sn(2048, 8, l, a);
}
function Zm(l) {
  o.flags |= 4;
  var a = o.updateQueue;
  if (a === null)
    a = hn(), o.updateQueue = a, a.events = [l];
  else {
    var t = a.events;
    t === null ? a.events = [l] : t.push(l);
  }
}
function C1(l) {
  var a = P().memoizedState;
  return Zm({ ref: a, nextImpl: l }), function() {
    if ((C & 2) !== 0) throw Error(s(440));
    return a.impl.apply(void 0, arguments);
  };
}
function R1(l, a) {
  return Sn(4, 2, l, a);
}
function j1(l, a) {
  return Sn(4, 4, l, a);
}
function V1(l, a) {
  if (typeof a == "function") {
    l = l();
    var t = a(l);
    return function() {
      typeof t == "function" ? t() : a(null);
    };
  }
  if (a != null)
    return l = l(), a.current = l, function() {
      a.current = null;
    };
}
function p1(l, a, t) {
  t = t != null ? t.concat([l]) : null, Sn(4, 4, V1.bind(null, a, l), t);
}
function Yc() {
}
function K1(l, a) {
  var t = P();
  a = a === void 0 ? null : a;
  var u = t.memoizedState;
  return a !== null && Dc(a, u[1]) ? u[0] : (t.memoizedState = [l, a], l);
}
function x1(l, a) {
  var t = P();
  a = a === void 0 ? null : a;
  var u = t.memoizedState;
  if (a !== null && Dc(a, u[1]))
    return u[0];
  if (u = l(), nt) {
    Oa(!0);
    try {
      l();
    } finally {
      Oa(!1);
    }
  }
  return t.memoizedState = [u, a], u;
}
function Qc(l, a, t) {
  return t === void 0 || (da & 1073741824) !== 0 && (Q & 261930) === 0 ? l.memoizedState = a : (l.memoizedState = t, l = qv(), o.lanes |= l, Ka |= l, t);
}
function L1(l, a, t, u) {
  return ql(t, a) ? t : jt.current !== null ? (l = Qc(l, t, u), ql(l, a) || (ul = !0), l) : (da & 42) === 0 || (da & 1073741824) !== 0 && (Q & 261930) === 0 ? (ul = !0, l.memoizedState = t) : (l = qv(), o.lanes |= l, Ka |= l, a);
}
function J1(l, a, t, u, e) {
  var n = R.p;
  R.p = n !== 0 && 8 > n ? n : 8;
  var f = D.T, c = {};
  D.T = c, Gc(l, !1, a, t);
  try {
    var i = e(), h = D.S;
    if (h !== null && h(c, i), i !== null && typeof i == "object" && typeof i.then == "function") {
      var g = qm(
        i,
        u
      );
      su(
        l,
        a,
        g,
        Bl(l)
      );
    } else
      su(
        l,
        a,
        u,
        Bl(l)
      );
  } catch (b) {
    su(
      l,
      a,
      { then: function() {
      }, status: "rejected", reason: b },
      Bl()
    );
  } finally {
    R.p = n, f !== null && c.types !== null && (f.types = c.types), D.T = f;
  }
}
function Cm() {
}
function Xf(l, a, t, u) {
  if (l.tag !== 5) throw Error(s(476));
  var e = W1(l).queue;
  J1(
    l,
    e,
    a,
    ra,
    t === null ? Cm : function() {
      return w1(l), t(u);
    }
  );
}
function W1(l) {
  var a = l.memoizedState;
  if (a !== null) return a;
  a = {
    memoizedState: ra,
    baseState: ra,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Sa,
      lastRenderedState: ra
    },
    next: null
  };
  var t = {};
  return a.next = {
    memoizedState: t,
    baseState: t,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Sa,
      lastRenderedState: t
    },
    next: null
  }, l.memoizedState = a, l = l.alternate, l !== null && (l.memoizedState = a), a;
}
function w1(l) {
  var a = W1(l);
  a.next === null && (a = l.alternate.memoizedState), su(
    l,
    a.next.queue,
    {},
    Bl()
  );
}
function Xc() {
  return dl(Gu);
}
function $1() {
  return P().memoizedState;
}
function F1() {
  return P().memoizedState;
}
function Rm(l) {
  for (var a = l.return; a !== null; ) {
    switch (a.tag) {
      case 24:
      case 3:
        var t = Bl();
        l = Ya(t);
        var u = Qa(a, l, t);
        u !== null && (Tl(u, a, t), gu(u, a, t)), a = { cache: Ac() }, l.payload = a;
        return;
    }
    a = a.return;
  }
}
function jm(l, a, t) {
  var u = Bl();
  t = {
    lane: u,
    revertLane: 0,
    gesture: null,
    action: t,
    hasEagerState: !1,
    eagerState: null,
    next: null
  }, gn(l) ? r1(a, t) : (t = gc(l, a, t, u), t !== null && (Tl(t, l, u), I1(t, a, u)));
}
function k1(l, a, t) {
  var u = Bl();
  su(l, a, t, u);
}
function su(l, a, t, u) {
  var e = {
    lane: u,
    revertLane: 0,
    gesture: null,
    action: t,
    hasEagerState: !1,
    eagerState: null,
    next: null
  };
  if (gn(l)) r1(a, e);
  else {
    var n = l.alternate;
    if (l.lanes === 0 && (n === null || n.lanes === 0) && (n = a.lastRenderedReducer, n !== null))
      try {
        var f = a.lastRenderedState, c = n(f, t);
        if (e.hasEagerState = !0, e.eagerState = c, ql(c, f))
          return yn(l, a, e, 0), x === null && vn(), !1;
      } catch {
      } finally {
      }
    if (t = gc(l, a, e, u), t !== null)
      return Tl(t, l, u), I1(t, a, u), !0;
  }
  return !1;
}
function Gc(l, a, t, u) {
  if (u = {
    lane: 2,
    revertLane: Lc(),
    gesture: null,
    action: u,
    hasEagerState: !1,
    eagerState: null,
    next: null
  }, gn(l)) {
    if (a) throw Error(s(479));
  } else
    a = gc(
      l,
      t,
      u,
      2
    ), a !== null && Tl(a, l, 2);
}
function gn(l) {
  var a = l.alternate;
  return l === o || a !== null && a === o;
}
function r1(l, a) {
  Qt = pe = !0;
  var t = l.pending;
  t === null ? a.next = a : (a.next = t.next, t.next = a), l.pending = a;
}
function I1(l, a, t) {
  if ((t & 4194048) !== 0) {
    var u = a.lanes;
    u &= l.pendingLanes, t |= u, a.lanes = t, C0(l, t);
  }
}
var Yu = {
  readContext: dl,
  use: dn,
  useCallback: F,
  useContext: F,
  useEffect: F,
  useImperativeHandle: F,
  useLayoutEffect: F,
  useInsertionEffect: F,
  useMemo: F,
  useReducer: F,
  useRef: F,
  useState: F,
  useDebugValue: F,
  useDeferredValue: F,
  useTransition: F,
  useSyncExternalStore: F,
  useId: F,
  useHostTransitionStatus: F,
  useFormState: F,
  useActionState: F,
  useOptimistic: F,
  useMemoCache: F,
  useCacheRefresh: F
};
Yu.useEffectEvent = F;
var P1 = {
  readContext: dl,
  use: dn,
  useCallback: function(l, a) {
    return gl().memoizedState = [
      l,
      a === void 0 ? null : a
    ], l;
  },
  useContext: dl,
  useEffect: Zi,
  useImperativeHandle: function(l, a, t) {
    t = t != null ? t.concat([l]) : null, Me(
      4194308,
      4,
      V1.bind(null, a, l),
      t
    );
  },
  useLayoutEffect: function(l, a) {
    return Me(4194308, 4, l, a);
  },
  useInsertionEffect: function(l, a) {
    Me(4, 2, l, a);
  },
  useMemo: function(l, a) {
    var t = gl();
    a = a === void 0 ? null : a;
    var u = l();
    if (nt) {
      Oa(!0);
      try {
        l();
      } finally {
        Oa(!1);
      }
    }
    return t.memoizedState = [u, a], u;
  },
  useReducer: function(l, a, t) {
    var u = gl();
    if (t !== void 0) {
      var e = t(a);
      if (nt) {
        Oa(!0);
        try {
          t(a);
        } finally {
          Oa(!1);
        }
      }
    } else e = a;
    return u.memoizedState = u.baseState = e, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: l,
      lastRenderedState: e
    }, u.queue = l, l = l.dispatch = jm.bind(
      null,
      o,
      l
    ), [u.memoizedState, l];
  },
  useRef: function(l) {
    var a = gl();
    return l = { current: l }, a.memoizedState = l;
  },
  useState: function(l) {
    l = Yf(l);
    var a = l.queue, t = k1.bind(null, o, a);
    return a.dispatch = t, [l.memoizedState, t];
  },
  useDebugValue: Yc,
  useDeferredValue: function(l, a) {
    var t = gl();
    return Qc(t, l, a);
  },
  useTransition: function() {
    var l = Yf(!1);
    return l = J1.bind(
      null,
      o,
      l.queue,
      !0,
      !1
    ), gl().memoizedState = l, [!1, l];
  },
  useSyncExternalStore: function(l, a, t) {
    var u = o, e = gl();
    if (G) {
      if (t === void 0)
        throw Error(s(407));
      t = t();
    } else {
      if (t = a(), x === null)
        throw Error(s(349));
      (Q & 127) !== 0 || o1(u, a, t);
    }
    e.memoizedState = t;
    var n = { value: t, getSnapshot: a };
    return e.queue = n, Zi(N1.bind(null, u, n, l), [
      l
    ]), u.flags |= 2048, Vt(
      9,
      { destroy: void 0 },
      H1.bind(
        null,
        u,
        n,
        t,
        a
      ),
      null
    ), t;
  },
  useId: function() {
    var l = gl(), a = x.identifierPrefix;
    if (G) {
      var t = $l, u = wl;
      t = (u & ~(1 << 32 - _l(u) - 1)).toString(32) + t, a = "_" + a + "R_" + t, t = Ke++, 0 < t && (a += "H" + t.toString(32)), a += "_";
    } else
      t = Ym++, a = "_" + a + "r_" + t.toString(32) + "_";
    return l.memoizedState = a;
  },
  useHostTransitionStatus: Xc,
  useFormState: Qi,
  useActionState: Qi,
  useOptimistic: function(l) {
    var a = gl();
    a.memoizedState = a.baseState = l;
    var t = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: null,
      lastRenderedState: null
    };
    return a.queue = t, a = Gc.bind(
      null,
      o,
      !0,
      t
    ), t.dispatch = a, [l, a];
  },
  useMemoCache: _c,
  useCacheRefresh: function() {
    return gl().memoizedState = Rm.bind(
      null,
      o
    );
  },
  useEffectEvent: function(l) {
    var a = gl(), t = { impl: l };
    return a.memoizedState = t, function() {
      if ((C & 2) !== 0)
        throw Error(s(440));
      return t.impl.apply(void 0, arguments);
    };
  }
}, Zc = {
  readContext: dl,
  use: dn,
  useCallback: K1,
  useContext: dl,
  useEffect: qc,
  useImperativeHandle: p1,
  useInsertionEffect: R1,
  useLayoutEffect: j1,
  useMemo: x1,
  useReducer: Te,
  useRef: Z1,
  useState: function() {
    return Te(Sa);
  },
  useDebugValue: Yc,
  useDeferredValue: function(l, a) {
    var t = P();
    return L1(
      t,
      K.memoizedState,
      l,
      a
    );
  },
  useTransition: function() {
    var l = Te(Sa)[0], a = P().memoizedState;
    return [
      typeof l == "boolean" ? l : Ju(l),
      a
    ];
  },
  useSyncExternalStore: O1,
  useId: $1,
  useHostTransitionStatus: Xc,
  useFormState: Xi,
  useActionState: Xi,
  useOptimistic: function(l, a) {
    var t = P();
    return q1(t, K, l, a);
  },
  useMemoCache: _c,
  useCacheRefresh: F1
};
Zc.useEffectEvent = C1;
var lv = {
  readContext: dl,
  use: dn,
  useCallback: K1,
  useContext: dl,
  useEffect: qc,
  useImperativeHandle: p1,
  useInsertionEffect: R1,
  useLayoutEffect: j1,
  useMemo: x1,
  useReducer: jn,
  useRef: Z1,
  useState: function() {
    return jn(Sa);
  },
  useDebugValue: Yc,
  useDeferredValue: function(l, a) {
    var t = P();
    return K === null ? Qc(t, l, a) : L1(
      t,
      K.memoizedState,
      l,
      a
    );
  },
  useTransition: function() {
    var l = jn(Sa)[0], a = P().memoizedState;
    return [
      typeof l == "boolean" ? l : Ju(l),
      a
    ];
  },
  useSyncExternalStore: O1,
  useId: $1,
  useHostTransitionStatus: Xc,
  useFormState: Gi,
  useActionState: Gi,
  useOptimistic: function(l, a) {
    var t = P();
    return K !== null ? q1(t, K, l, a) : (t.baseState = l, [l, t.queue.dispatch]);
  },
  useMemoCache: _c,
  useCacheRefresh: F1
};
lv.useEffectEvent = C1;
function Vn(l, a, t, u) {
  a = l.memoizedState, t = t(u, a), t = t == null ? a : w({}, a, t), l.memoizedState = t, l.lanes === 0 && (l.updateQueue.baseState = t);
}
var Gf = {
  enqueueSetState: function(l, a, t) {
    l = l._reactInternals;
    var u = Bl(), e = Ya(u);
    e.payload = a, t != null && (e.callback = t), a = Qa(l, e, u), a !== null && (Tl(a, l, u), gu(a, l, u));
  },
  enqueueReplaceState: function(l, a, t) {
    l = l._reactInternals;
    var u = Bl(), e = Ya(u);
    e.tag = 1, e.payload = a, t != null && (e.callback = t), a = Qa(l, e, u), a !== null && (Tl(a, l, u), gu(a, l, u));
  },
  enqueueForceUpdate: function(l, a) {
    l = l._reactInternals;
    var t = Bl(), u = Ya(t);
    u.tag = 2, a != null && (u.callback = a), a = Qa(l, u, t), a !== null && (Tl(a, l, t), gu(a, l, t));
  }
};
function Ci(l, a, t, u, e, n, f) {
  return l = l.stateNode, typeof l.shouldComponentUpdate == "function" ? l.shouldComponentUpdate(u, n, f) : a.prototype && a.prototype.isPureReactComponent ? !Hu(t, u) || !Hu(e, n) : !0;
}
function Ri(l, a, t, u) {
  l = a.state, typeof a.componentWillReceiveProps == "function" && a.componentWillReceiveProps(t, u), typeof a.UNSAFE_componentWillReceiveProps == "function" && a.UNSAFE_componentWillReceiveProps(t, u), a.state !== l && Gf.enqueueReplaceState(a, a.state, null);
}
function ft(l, a) {
  var t = a;
  if ("ref" in a) {
    t = {};
    for (var u in a)
      u !== "ref" && (t[u] = a[u]);
  }
  if (l = l.defaultProps) {
    t === a && (t = w({}, t));
    for (var e in l)
      t[e] === void 0 && (t[e] = l[e]);
  }
  return t;
}
function av(l) {
  Xe(l);
}
function tv(l) {
  console.error(l);
}
function uv(l) {
  Xe(l);
}
function xe(l, a) {
  try {
    var t = l.onUncaughtError;
    t(a.value, { componentStack: a.stack });
  } catch (u) {
    setTimeout(function() {
      throw u;
    });
  }
}
function ji(l, a, t) {
  try {
    var u = l.onCaughtError;
    u(t.value, {
      componentStack: t.stack,
      errorBoundary: a.tag === 1 ? a.stateNode : null
    });
  } catch (e) {
    setTimeout(function() {
      throw e;
    });
  }
}
function Zf(l, a, t) {
  return t = Ya(t), t.tag = 3, t.payload = { element: null }, t.callback = function() {
    xe(l, a);
  }, t;
}
function ev(l) {
  return l = Ya(l), l.tag = 3, l;
}
function nv(l, a, t, u) {
  var e = t.type.getDerivedStateFromError;
  if (typeof e == "function") {
    var n = u.value;
    l.payload = function() {
      return e(n);
    }, l.callback = function() {
      ji(a, t, u);
    };
  }
  var f = t.stateNode;
  f !== null && typeof f.componentDidCatch == "function" && (l.callback = function() {
    ji(a, t, u), typeof e != "function" && (Xa === null ? Xa = /* @__PURE__ */ new Set([this]) : Xa.add(this));
    var c = u.stack;
    this.componentDidCatch(u.value, {
      componentStack: c !== null ? c : ""
    });
  });
}
function Vm(l, a, t, u, e) {
  if (t.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
    if (a = t.alternate, a !== null && $t(
      a,
      t,
      e,
      !0
    ), t = Yl.current, t !== null) {
      switch (t.tag) {
        case 31:
        case 13:
          return pl === null ? $e() : t.alternate === null && k === 0 && (k = 3), t.flags &= -257, t.flags |= 65536, t.lanes = e, u === Re ? t.flags |= 16384 : (a = t.updateQueue, a === null ? t.updateQueue = /* @__PURE__ */ new Set([u]) : a.add(u), rn(l, u, e)), !1;
        case 22:
          return t.flags |= 65536, u === Re ? t.flags |= 16384 : (a = t.updateQueue, a === null ? (a = {
            transitions: null,
            markerInstances: null,
            retryQueue: /* @__PURE__ */ new Set([u])
          }, t.updateQueue = a) : (t = a.retryQueue, t === null ? a.retryQueue = /* @__PURE__ */ new Set([u]) : t.add(u)), rn(l, u, e)), !1;
      }
      throw Error(s(435, t.tag));
    }
    return rn(l, u, e), $e(), !1;
  }
  if (G)
    return a = Yl.current, a !== null ? ((a.flags & 65536) === 0 && (a.flags |= 256), a.flags |= 65536, a.lanes = e, u !== Uf && (l = Error(s(422), { cause: u }), _u(jl(l, t)))) : (u !== Uf && (a = Error(s(423), {
      cause: u
    }), _u(
      jl(a, t)
    )), l = l.current.alternate, l.flags |= 65536, e &= -e, l.lanes |= e, u = jl(u, t), e = Zf(
      l.stateNode,
      u,
      e
    ), Rn(l, e), k !== 4 && (k = 2)), !1;
  var n = Error(s(520), { cause: u });
  if (n = jl(n, t), Mu === null ? Mu = [n] : Mu.push(n), k !== 4 && (k = 2), a === null) return !0;
  u = jl(u, t), t = a;
  do {
    switch (t.tag) {
      case 3:
        return t.flags |= 65536, l = e & -e, t.lanes |= l, l = Zf(t.stateNode, u, l), Rn(t, l), !1;
      case 1:
        if (a = t.type, n = t.stateNode, (t.flags & 128) === 0 && (typeof a.getDerivedStateFromError == "function" || n !== null && typeof n.componentDidCatch == "function" && (Xa === null || !Xa.has(n))))
          return t.flags |= 65536, e &= -e, t.lanes |= e, e = ev(e), nv(
            e,
            l,
            t,
            u
          ), Rn(t, e), !1;
    }
    t = t.return;
  } while (t !== null);
  return !1;
}
var Cc = Error(s(461)), ul = !1;
function yl(l, a, t, u) {
  a.child = l === null ? A1(a, null, t, u) : et(
    a,
    l.child,
    t,
    u
  );
}
function Vi(l, a, t, u, e) {
  t = t.render;
  var n = a.ref;
  if ("ref" in u) {
    var f = {};
    for (var c in u)
      c !== "ref" && (f[c] = u[c]);
  } else f = u;
  return ut(a), u = Oc(
    l,
    a,
    t,
    f,
    n,
    e
  ), c = oc(), l !== null && !ul ? (Hc(l, a, e), ga(l, a, e)) : (G && c && zc(a), a.flags |= 1, yl(l, a, u, e), a.child);
}
function pi(l, a, t, u, e) {
  if (l === null) {
    var n = t.type;
    return typeof n == "function" && !bc(n) && n.defaultProps === void 0 && t.compare === null ? (a.tag = 15, a.type = n, fv(
      l,
      a,
      n,
      u,
      e
    )) : (l = se(
      t.type,
      null,
      u,
      a,
      a.mode,
      e
    ), l.ref = a.ref, l.return = a, a.child = l);
  }
  if (n = l.child, !Rc(l, e)) {
    var f = n.memoizedProps;
    if (t = t.compare, t = t !== null ? t : Hu, t(f, u) && l.ref === a.ref)
      return ga(l, a, e);
  }
  return a.flags |= 1, l = va(n, u), l.ref = a.ref, l.return = a, a.child = l;
}
function fv(l, a, t, u, e) {
  if (l !== null) {
    var n = l.memoizedProps;
    if (Hu(n, u) && l.ref === a.ref)
      if (ul = !1, a.pendingProps = u = n, Rc(l, e))
        (l.flags & 131072) !== 0 && (ul = !0);
      else
        return a.lanes = l.lanes, ga(l, a, e);
  }
  return Cf(
    l,
    a,
    t,
    u,
    e
  );
}
function cv(l, a, t, u) {
  var e = u.children, n = l !== null ? l.memoizedState : null;
  if (l === null && a.stateNode === null && (a.stateNode = {
    _visibility: 1,
    _pendingMarkers: null,
    _retryCache: null,
    _transitions: null
  }), u.mode === "hidden") {
    if ((a.flags & 128) !== 0) {
      if (n = n !== null ? n.baseLanes | t : t, l !== null) {
        for (u = a.child = l.child, e = 0; u !== null; )
          e = e | u.lanes | u.childLanes, u = u.sibling;
        u = e & ~n;
      } else u = 0, a.child = null;
      return Ki(
        l,
        a,
        n,
        t,
        u
      );
    }
    if ((t & 536870912) !== 0)
      a.memoizedState = { baseLanes: 0, cachePool: null }, l !== null && Ae(
        a,
        n !== null ? n.cachePool : null
      ), n !== null ? Bi(a, n) : Bf(), E1(a);
    else
      return u = a.lanes = 536870912, Ki(
        l,
        a,
        n !== null ? n.baseLanes | t : t,
        t,
        u
      );
  } else
    n !== null ? (Ae(a, n.cachePool), Bi(a, n), Ua(), a.memoizedState = null) : (l !== null && Ae(a, null), Bf(), Ua());
  return yl(l, a, e, t), a.child;
}
function vu(l, a) {
  return l !== null && l.tag === 22 || a.stateNode !== null || (a.stateNode = {
    _visibility: 1,
    _pendingMarkers: null,
    _retryCache: null,
    _transitions: null
  }), a.sibling;
}
function Ki(l, a, t, u, e) {
  var n = Tc();
  return n = n === null ? null : { parent: tl._currentValue, pool: n }, a.memoizedState = {
    baseLanes: t,
    cachePool: n
  }, l !== null && Ae(a, null), Bf(), E1(a), l !== null && $t(l, a, u, !0), a.childLanes = e, null;
}
function Ee(l, a) {
  return a = Le(
    { mode: a.mode, children: a.children },
    l.mode
  ), a.ref = l.ref, l.child = a, a.return = l, a;
}
function xi(l, a, t) {
  return et(a, l.child, null, t), l = Ee(a, a.pendingProps), l.flags |= 2, Dl(a), a.memoizedState = null, l;
}
function pm(l, a, t) {
  var u = a.pendingProps, e = (a.flags & 128) !== 0;
  if (a.flags &= -129, l === null) {
    if (G) {
      if (u.mode === "hidden")
        return l = Ee(a, u), a.lanes = 536870912, vu(null, l);
      if (qf(a), (l = W) ? (l = Pv(
        l,
        Vl
      ), l = l !== null && l.data === "&" ? l : null, l !== null && (a.memoizedState = {
        dehydrated: l,
        treeContext: ja !== null ? { id: wl, overflow: $l } : null,
        retryLane: 536870912,
        hydrationErrors: null
      }, t = h1(l), t.return = a, a.child = t, hl = a, W = null)) : l = null, l === null) throw Va(a);
      return a.lanes = 536870912, null;
    }
    return Ee(a, u);
  }
  var n = l.memoizedState;
  if (n !== null) {
    var f = n.dehydrated;
    if (qf(a), e)
      if (a.flags & 256)
        a.flags &= -257, a = xi(
          l,
          a,
          t
        );
      else if (a.memoizedState !== null)
        a.child = l.child, a.flags |= 128, a = null;
      else throw Error(s(558));
    else if (ul || $t(l, a, t, !1), e = (t & l.childLanes) !== 0, ul || e) {
      if (u = x, u !== null && (f = R0(u, t), f !== 0 && f !== n.retryLane))
        throw n.retryLane = f, yt(l, f), Tl(u, l, f), Cc;
      $e(), a = xi(
        l,
        a,
        t
      );
    } else
      l = n.treeContext, W = Kl(f.nextSibling), hl = a, G = !0, qa = null, Vl = !1, l !== null && S1(a, l), a = Ee(a, u), a.flags |= 4096;
    return a;
  }
  return l = va(l.child, {
    mode: u.mode,
    children: u.children
  }), l.ref = a.ref, a.child = l, l.return = a, l;
}
function Ue(l, a) {
  var t = a.ref;
  if (t === null)
    l !== null && l.ref !== null && (a.flags |= 4194816);
  else {
    if (typeof t != "function" && typeof t != "object")
      throw Error(s(284));
    (l === null || l.ref !== t) && (a.flags |= 4194816);
  }
}
function Cf(l, a, t, u, e) {
  return ut(a), t = Oc(
    l,
    a,
    t,
    u,
    void 0,
    e
  ), u = oc(), l !== null && !ul ? (Hc(l, a, e), ga(l, a, e)) : (G && u && zc(a), a.flags |= 1, yl(l, a, t, e), a.child);
}
function Li(l, a, t, u, e, n) {
  return ut(a), a.updateQueue = null, t = D1(
    a,
    u,
    t,
    e
  ), U1(l), u = oc(), l !== null && !ul ? (Hc(l, a, n), ga(l, a, n)) : (G && u && zc(a), a.flags |= 1, yl(l, a, t, n), a.child);
}
function Ji(l, a, t, u, e) {
  if (ut(a), a.stateNode === null) {
    var n = Dt, f = t.contextType;
    typeof f == "object" && f !== null && (n = dl(f)), n = new t(u, n), a.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null, n.updater = Gf, a.stateNode = n, n._reactInternals = a, n = a.stateNode, n.props = u, n.state = a.memoizedState, n.refs = {}, Ec(a), f = t.contextType, n.context = typeof f == "object" && f !== null ? dl(f) : Dt, n.state = a.memoizedState, f = t.getDerivedStateFromProps, typeof f == "function" && (Vn(
      a,
      t,
      f,
      u
    ), n.state = a.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof n.getSnapshotBeforeUpdate == "function" || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (f = n.state, typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount(), f !== n.state && Gf.enqueueReplaceState(n, n.state, null), zu(a, u, n, e), bu(), n.state = a.memoizedState), typeof n.componentDidMount == "function" && (a.flags |= 4194308), u = !0;
  } else if (l === null) {
    n = a.stateNode;
    var c = a.memoizedProps, i = ft(t, c);
    n.props = i;
    var h = n.context, g = t.contextType;
    f = Dt, typeof g == "object" && g !== null && (f = dl(g));
    var b = t.getDerivedStateFromProps;
    g = typeof b == "function" || typeof n.getSnapshotBeforeUpdate == "function", c = a.pendingProps !== c, g || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (c || h !== f) && Ri(
      a,
      n,
      u,
      f
    ), Ta = !1;
    var m = a.memoizedState;
    n.state = m, zu(a, u, n, e), bu(), h = a.memoizedState, c || m !== h || Ta ? (typeof b == "function" && (Vn(
      a,
      t,
      b,
      u
    ), h = a.memoizedState), (i = Ta || Ci(
      a,
      t,
      i,
      u,
      m,
      h,
      f
    )) ? (g || typeof n.UNSAFE_componentWillMount != "function" && typeof n.componentWillMount != "function" || (typeof n.componentWillMount == "function" && n.componentWillMount(), typeof n.UNSAFE_componentWillMount == "function" && n.UNSAFE_componentWillMount()), typeof n.componentDidMount == "function" && (a.flags |= 4194308)) : (typeof n.componentDidMount == "function" && (a.flags |= 4194308), a.memoizedProps = u, a.memoizedState = h), n.props = u, n.state = h, n.context = f, u = i) : (typeof n.componentDidMount == "function" && (a.flags |= 4194308), u = !1);
  } else {
    n = a.stateNode, Nf(l, a), f = a.memoizedProps, g = ft(t, f), n.props = g, b = a.pendingProps, m = n.context, h = t.contextType, i = Dt, typeof h == "object" && h !== null && (i = dl(h)), c = t.getDerivedStateFromProps, (h = typeof c == "function" || typeof n.getSnapshotBeforeUpdate == "function") || typeof n.UNSAFE_componentWillReceiveProps != "function" && typeof n.componentWillReceiveProps != "function" || (f !== b || m !== i) && Ri(
      a,
      n,
      u,
      i
    ), Ta = !1, m = a.memoizedState, n.state = m, zu(a, u, n, e), bu();
    var S = a.memoizedState;
    f !== b || m !== S || Ta || l !== null && l.dependencies !== null && Ce(l.dependencies) ? (typeof c == "function" && (Vn(
      a,
      t,
      c,
      u
    ), S = a.memoizedState), (g = Ta || Ci(
      a,
      t,
      g,
      u,
      m,
      S,
      i
    ) || l !== null && l.dependencies !== null && Ce(l.dependencies)) ? (h || typeof n.UNSAFE_componentWillUpdate != "function" && typeof n.componentWillUpdate != "function" || (typeof n.componentWillUpdate == "function" && n.componentWillUpdate(u, S, i), typeof n.UNSAFE_componentWillUpdate == "function" && n.UNSAFE_componentWillUpdate(
      u,
      S,
      i
    )), typeof n.componentDidUpdate == "function" && (a.flags |= 4), typeof n.getSnapshotBeforeUpdate == "function" && (a.flags |= 1024)) : (typeof n.componentDidUpdate != "function" || f === l.memoizedProps && m === l.memoizedState || (a.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && m === l.memoizedState || (a.flags |= 1024), a.memoizedProps = u, a.memoizedState = S), n.props = u, n.state = S, n.context = i, u = g) : (typeof n.componentDidUpdate != "function" || f === l.memoizedProps && m === l.memoizedState || (a.flags |= 4), typeof n.getSnapshotBeforeUpdate != "function" || f === l.memoizedProps && m === l.memoizedState || (a.flags |= 1024), u = !1);
  }
  return n = u, Ue(l, a), u = (a.flags & 128) !== 0, n || u ? (n = a.stateNode, t = u && typeof t.getDerivedStateFromError != "function" ? null : n.render(), a.flags |= 1, l !== null && u ? (a.child = et(
    a,
    l.child,
    null,
    e
  ), a.child = et(
    a,
    null,
    t,
    e
  )) : yl(l, a, t, e), a.memoizedState = n.state, l = a.child) : l = ga(
    l,
    a,
    e
  ), l;
}
function Wi(l, a, t, u) {
  return tt(), a.flags |= 256, yl(l, a, t, u), a.child;
}
var pn = {
  dehydrated: null,
  treeContext: null,
  retryLane: 0,
  hydrationErrors: null
};
function Kn(l) {
  return { baseLanes: l, cachePool: b1() };
}
function xn(l, a, t) {
  return l = l !== null ? l.childLanes & ~t : 0, a && (l |= ol), l;
}
function iv(l, a, t) {
  var u = a.pendingProps, e = !1, n = (a.flags & 128) !== 0, f;
  if ((f = n) || (f = l !== null && l.memoizedState === null ? !1 : (I.current & 2) !== 0), f && (e = !0, a.flags &= -129), f = (a.flags & 32) !== 0, a.flags &= -33, l === null) {
    if (G) {
      if (e ? Ea(a) : Ua(), (l = W) ? (l = Pv(
        l,
        Vl
      ), l = l !== null && l.data !== "&" ? l : null, l !== null && (a.memoizedState = {
        dehydrated: l,
        treeContext: ja !== null ? { id: wl, overflow: $l } : null,
        retryLane: 536870912,
        hydrationErrors: null
      }, t = h1(l), t.return = a, a.child = t, hl = a, W = null)) : l = null, l === null) throw Va(a);
      return rf(l) ? a.lanes = 32 : a.lanes = 536870912, null;
    }
    var c = u.children;
    return u = u.fallback, e ? (Ua(), e = a.mode, c = Le(
      { mode: "hidden", children: c },
      e
    ), u = Ia(
      u,
      e,
      t,
      null
    ), c.return = a, u.return = a, c.sibling = u, a.child = c, u = a.child, u.memoizedState = Kn(t), u.childLanes = xn(
      l,
      f,
      t
    ), a.memoizedState = pn, vu(null, u)) : (Ea(a), Rf(a, c));
  }
  var i = l.memoizedState;
  if (i !== null && (c = i.dehydrated, c !== null)) {
    if (n)
      a.flags & 256 ? (Ea(a), a.flags &= -257, a = Ln(
        l,
        a,
        t
      )) : a.memoizedState !== null ? (Ua(), a.child = l.child, a.flags |= 128, a = null) : (Ua(), c = u.fallback, e = a.mode, u = Le(
        { mode: "visible", children: u.children },
        e
      ), c = Ia(
        c,
        e,
        t,
        null
      ), c.flags |= 2, u.return = a, c.return = a, u.sibling = c, a.child = u, et(
        a,
        l.child,
        null,
        t
      ), u = a.child, u.memoizedState = Kn(t), u.childLanes = xn(
        l,
        f,
        t
      ), a.memoizedState = pn, a = vu(null, u));
    else if (Ea(a), rf(c)) {
      if (f = c.nextSibling && c.nextSibling.dataset, f) var h = f.dgst;
      f = h, u = Error(s(419)), u.stack = "", u.digest = f, _u({ value: u, source: null, stack: null }), a = Ln(
        l,
        a,
        t
      );
    } else if (ul || $t(l, a, t, !1), f = (t & l.childLanes) !== 0, ul || f) {
      if (f = x, f !== null && (u = R0(f, t), u !== 0 && u !== i.retryLane))
        throw i.retryLane = u, yt(l, u), Tl(f, l, u), Cc;
      kf(c) || $e(), a = Ln(
        l,
        a,
        t
      );
    } else
      kf(c) ? (a.flags |= 192, a.child = l.child, a = null) : (l = i.treeContext, W = Kl(
        c.nextSibling
      ), hl = a, G = !0, qa = null, Vl = !1, l !== null && S1(a, l), a = Rf(
        a,
        u.children
      ), a.flags |= 4096);
    return a;
  }
  return e ? (Ua(), c = u.fallback, e = a.mode, i = l.child, h = i.sibling, u = va(i, {
    mode: "hidden",
    children: u.children
  }), u.subtreeFlags = i.subtreeFlags & 65011712, h !== null ? c = va(
    h,
    c
  ) : (c = Ia(
    c,
    e,
    t,
    null
  ), c.flags |= 2), c.return = a, u.return = a, u.sibling = c, a.child = u, vu(null, u), u = a.child, c = l.child.memoizedState, c === null ? c = Kn(t) : (e = c.cachePool, e !== null ? (i = tl._currentValue, e = e.parent !== i ? { parent: i, pool: i } : e) : e = b1(), c = {
    baseLanes: c.baseLanes | t,
    cachePool: e
  }), u.memoizedState = c, u.childLanes = xn(
    l,
    f,
    t
  ), a.memoizedState = pn, vu(l.child, u)) : (Ea(a), t = l.child, l = t.sibling, t = va(t, {
    mode: "visible",
    children: u.children
  }), t.return = a, t.sibling = null, l !== null && (f = a.deletions, f === null ? (a.deletions = [l], a.flags |= 16) : f.push(l)), a.child = t, a.memoizedState = null, t);
}
function Rf(l, a) {
  return a = Le(
    { mode: "visible", children: a },
    l.mode
  ), a.return = l, l.child = a;
}
function Le(l, a) {
  return l = Ol(22, l, null, a), l.lanes = 0, l;
}
function Ln(l, a, t) {
  return et(a, l.child, null, t), l = Rf(
    a,
    a.pendingProps.children
  ), l.flags |= 2, a.memoizedState = null, l;
}
function wi(l, a, t) {
  l.lanes |= a;
  var u = l.alternate;
  u !== null && (u.lanes |= a), Of(l.return, a, t);
}
function Jn(l, a, t, u, e, n) {
  var f = l.memoizedState;
  f === null ? l.memoizedState = {
    isBackwards: a,
    rendering: null,
    renderingStartTime: 0,
    last: u,
    tail: t,
    tailMode: e,
    treeForkCount: n
  } : (f.isBackwards = a, f.rendering = null, f.renderingStartTime = 0, f.last = u, f.tail = t, f.tailMode = e, f.treeForkCount = n);
}
function vv(l, a, t) {
  var u = a.pendingProps, e = u.revealOrder, n = u.tail;
  u = u.children;
  var f = I.current, c = (f & 2) !== 0;
  if (c ? (f = f & 1 | 2, a.flags |= 128) : f &= 1, L(I, f), yl(l, a, u, t), u = G ? Nu : 0, !c && l !== null && (l.flags & 128) !== 0)
    l: for (l = a.child; l !== null; ) {
      if (l.tag === 13)
        l.memoizedState !== null && wi(l, t, a);
      else if (l.tag === 19)
        wi(l, t, a);
      else if (l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === a) break l;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === a)
          break l;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
  switch (e) {
    case "forwards":
      for (t = a.child, e = null; t !== null; )
        l = t.alternate, l !== null && Ve(l) === null && (e = t), t = t.sibling;
      t = e, t === null ? (e = a.child, a.child = null) : (e = t.sibling, t.sibling = null), Jn(
        a,
        !1,
        e,
        t,
        n,
        u
      );
      break;
    case "backwards":
    case "unstable_legacy-backwards":
      for (t = null, e = a.child, a.child = null; e !== null; ) {
        if (l = e.alternate, l !== null && Ve(l) === null) {
          a.child = e;
          break;
        }
        l = e.sibling, e.sibling = t, t = e, e = l;
      }
      Jn(
        a,
        !0,
        t,
        null,
        n,
        u
      );
      break;
    case "together":
      Jn(
        a,
        !1,
        null,
        null,
        void 0,
        u
      );
      break;
    default:
      a.memoizedState = null;
  }
  return a.child;
}
function ga(l, a, t) {
  if (l !== null && (a.dependencies = l.dependencies), Ka |= a.lanes, (t & a.childLanes) === 0)
    if (l !== null) {
      if ($t(
        l,
        a,
        t,
        !1
      ), (t & a.childLanes) === 0)
        return null;
    } else return null;
  if (l !== null && a.child !== l.child)
    throw Error(s(153));
  if (a.child !== null) {
    for (l = a.child, t = va(l, l.pendingProps), a.child = t, t.return = a; l.sibling !== null; )
      l = l.sibling, t = t.sibling = va(l, l.pendingProps), t.return = a;
    t.sibling = null;
  }
  return a.child;
}
function Rc(l, a) {
  return (l.lanes & a) !== 0 ? !0 : (l = l.dependencies, !!(l !== null && Ce(l)));
}
function Km(l, a, t) {
  switch (a.tag) {
    case 3:
      Be(a, a.stateNode.containerInfo), Ma(a, tl, l.memoizedState.cache), tt();
      break;
    case 27:
    case 5:
      hf(a);
      break;
    case 4:
      Be(a, a.stateNode.containerInfo);
      break;
    case 10:
      Ma(
        a,
        a.type,
        a.memoizedProps.value
      );
      break;
    case 31:
      if (a.memoizedState !== null)
        return a.flags |= 128, qf(a), null;
      break;
    case 13:
      var u = a.memoizedState;
      if (u !== null)
        return u.dehydrated !== null ? (Ea(a), a.flags |= 128, null) : (t & a.child.childLanes) !== 0 ? iv(l, a, t) : (Ea(a), l = ga(
          l,
          a,
          t
        ), l !== null ? l.sibling : null);
      Ea(a);
      break;
    case 19:
      var e = (l.flags & 128) !== 0;
      if (u = (t & a.childLanes) !== 0, u || ($t(
        l,
        a,
        t,
        !1
      ), u = (t & a.childLanes) !== 0), e) {
        if (u)
          return vv(
            l,
            a,
            t
          );
        a.flags |= 128;
      }
      if (e = a.memoizedState, e !== null && (e.rendering = null, e.tail = null, e.lastEffect = null), L(I, I.current), u) break;
      return null;
    case 22:
      return a.lanes = 0, cv(
        l,
        a,
        t,
        a.pendingProps
      );
    case 24:
      Ma(a, tl, l.memoizedState.cache);
  }
  return ga(l, a, t);
}
function yv(l, a, t) {
  if (l !== null)
    if (l.memoizedProps !== a.pendingProps)
      ul = !0;
    else {
      if (!Rc(l, t) && (a.flags & 128) === 0)
        return ul = !1, Km(
          l,
          a,
          t
        );
      ul = (l.flags & 131072) !== 0;
    }
  else
    ul = !1, G && (a.flags & 1048576) !== 0 && d1(a, Nu, a.index);
  switch (a.lanes = 0, a.tag) {
    case 16:
      l: {
        var u = a.pendingProps;
        if (l = Fa(a.elementType), a.type = l, typeof l == "function")
          bc(l) ? (u = ft(l, u), a.tag = 1, a = Ji(
            null,
            a,
            l,
            u,
            t
          )) : (a.tag = 0, a = Cf(
            null,
            a,
            l,
            u,
            t
          ));
        else {
          if (l != null) {
            var e = l.$$typeof;
            if (e === tc) {
              a.tag = 11, a = Vi(
                null,
                a,
                l,
                u,
                t
              );
              break l;
            } else if (e === uc) {
              a.tag = 14, a = pi(
                null,
                a,
                l,
                u,
                t
              );
              break l;
            }
          }
          throw a = yf(l) || l, Error(s(306, a, ""));
        }
      }
      return a;
    case 0:
      return Cf(
        l,
        a,
        a.type,
        a.pendingProps,
        t
      );
    case 1:
      return u = a.type, e = ft(
        u,
        a.pendingProps
      ), Ji(
        l,
        a,
        u,
        e,
        t
      );
    case 3:
      l: {
        if (Be(
          a,
          a.stateNode.containerInfo
        ), l === null) throw Error(s(387));
        u = a.pendingProps;
        var n = a.memoizedState;
        e = n.element, Nf(l, a), zu(a, u, null, t);
        var f = a.memoizedState;
        if (u = f.cache, Ma(a, tl, u), u !== n.cache && of(
          a,
          [tl],
          t,
          !0
        ), bu(), u = f.element, n.isDehydrated)
          if (n = {
            element: u,
            isDehydrated: !1,
            cache: f.cache
          }, a.updateQueue.baseState = n, a.memoizedState = n, a.flags & 256) {
            a = Wi(
              l,
              a,
              u,
              t
            );
            break l;
          } else if (u !== e) {
            e = jl(
              Error(s(424)),
              a
            ), _u(e), a = Wi(
              l,
              a,
              u,
              t
            );
            break l;
          } else {
            switch (l = a.stateNode.containerInfo, l.nodeType) {
              case 9:
                l = l.body;
                break;
              default:
                l = l.nodeName === "HTML" ? l.ownerDocument.body : l;
            }
            for (W = Kl(l.firstChild), hl = a, G = !0, qa = null, Vl = !0, t = A1(
              a,
              null,
              u,
              t
            ), a.child = t; t; )
              t.flags = t.flags & -3 | 4096, t = t.sibling;
          }
        else {
          if (tt(), u === e) {
            a = ga(
              l,
              a,
              t
            );
            break l;
          }
          yl(l, a, u, t);
        }
        a = a.child;
      }
      return a;
    case 26:
      return Ue(l, a), l === null ? (t = d0(
        a.type,
        null,
        a.pendingProps,
        null
      )) ? a.memoizedState = t : G || (t = a.type, l = a.pendingProps, u = Ie(
        Ba.current
      ).createElement(t), u[ml] = a, u[Ml] = l, Sl(u, t, l), il(u), a.stateNode = u) : a.memoizedState = d0(
        a.type,
        l.memoizedProps,
        a.pendingProps,
        l.memoizedState
      ), null;
    case 27:
      return hf(a), l === null && G && (u = a.stateNode = ly(
        a.type,
        a.pendingProps,
        Ba.current
      ), hl = a, Vl = !0, e = W, La(a.type) ? (If = e, W = Kl(u.firstChild)) : W = e), yl(
        l,
        a,
        a.pendingProps.children,
        t
      ), Ue(l, a), l === null && (a.flags |= 4194304), a.child;
    case 5:
      return l === null && G && ((e = u = W) && (u = sh(
        u,
        a.type,
        a.pendingProps,
        Vl
      ), u !== null ? (a.stateNode = u, hl = a, W = Kl(u.firstChild), Vl = !1, e = !0) : e = !1), e || Va(a)), hf(a), e = a.type, n = a.pendingProps, f = l !== null ? l.memoizedProps : null, u = n.children, $f(e, n) ? u = null : f !== null && $f(e, f) && (a.flags |= 32), a.memoizedState !== null && (e = Oc(
        l,
        a,
        Qm,
        null,
        null,
        t
      ), Gu._currentValue = e), Ue(l, a), yl(l, a, u, t), a.child;
    case 6:
      return l === null && G && ((l = t = W) && (t = Ah(
        t,
        a.pendingProps,
        Vl
      ), t !== null ? (a.stateNode = t, hl = a, W = null, l = !0) : l = !1), l || Va(a)), null;
    case 13:
      return iv(l, a, t);
    case 4:
      return Be(
        a,
        a.stateNode.containerInfo
      ), u = a.pendingProps, l === null ? a.child = et(
        a,
        null,
        u,
        t
      ) : yl(l, a, u, t), a.child;
    case 11:
      return Vi(
        l,
        a,
        a.type,
        a.pendingProps,
        t
      );
    case 7:
      return yl(
        l,
        a,
        a.pendingProps,
        t
      ), a.child;
    case 8:
      return yl(
        l,
        a,
        a.pendingProps.children,
        t
      ), a.child;
    case 12:
      return yl(
        l,
        a,
        a.pendingProps.children,
        t
      ), a.child;
    case 10:
      return u = a.pendingProps, Ma(a, a.type, u.value), yl(l, a, u.children, t), a.child;
    case 9:
      return e = a.type._context, u = a.pendingProps.children, ut(a), e = dl(e), u = u(e), a.flags |= 1, yl(l, a, u, t), a.child;
    case 14:
      return pi(
        l,
        a,
        a.type,
        a.pendingProps,
        t
      );
    case 15:
      return fv(
        l,
        a,
        a.type,
        a.pendingProps,
        t
      );
    case 19:
      return vv(l, a, t);
    case 31:
      return pm(l, a, t);
    case 22:
      return cv(
        l,
        a,
        t,
        a.pendingProps
      );
    case 24:
      return ut(a), u = dl(tl), l === null ? (e = Tc(), e === null && (e = x, n = Ac(), e.pooledCache = n, n.refCount++, n !== null && (e.pooledCacheLanes |= t), e = n), a.memoizedState = { parent: u, cache: e }, Ec(a), Ma(a, tl, e)) : ((l.lanes & t) !== 0 && (Nf(l, a), zu(a, null, null, t), bu()), e = l.memoizedState, n = a.memoizedState, e.parent !== u ? (e = { parent: u, cache: u }, a.memoizedState = e, a.lanes === 0 && (a.memoizedState = a.updateQueue.baseState = e), Ma(a, tl, u)) : (u = n.cache, Ma(a, tl, u), u !== e.cache && of(
        a,
        [tl],
        t,
        !0
      ))), yl(
        l,
        a,
        a.pendingProps.children,
        t
      ), a.child;
    case 29:
      throw a.pendingProps;
  }
  throw Error(s(156, a.tag));
}
function la(l) {
  l.flags |= 4;
}
function Wn(l, a, t, u, e) {
  if ((a = (l.mode & 32) !== 0) && (a = !1), a) {
    if (l.flags |= 16777216, (e & 335544128) === e)
      if (l.stateNode.complete) l.flags |= 8192;
      else if (Xv()) l.flags |= 8192;
      else
        throw lt = Re, Mc;
  } else l.flags &= -16777217;
}
function $i(l, a) {
  if (a.type !== "stylesheet" || (a.state.loading & 4) !== 0)
    l.flags &= -16777217;
  else if (l.flags |= 16777216, !uy(a))
    if (Xv()) l.flags |= 8192;
    else
      throw lt = Re, Mc;
}
function ie(l, a) {
  a !== null && (l.flags |= 4), l.flags & 16384 && (a = l.tag !== 22 ? G0() : 536870912, l.lanes |= a, pt |= a);
}
function uu(l, a) {
  if (!G)
    switch (l.tailMode) {
      case "hidden":
        a = l.tail;
        for (var t = null; a !== null; )
          a.alternate !== null && (t = a), a = a.sibling;
        t === null ? l.tail = null : t.sibling = null;
        break;
      case "collapsed":
        t = l.tail;
        for (var u = null; t !== null; )
          t.alternate !== null && (u = t), t = t.sibling;
        u === null ? a || l.tail === null ? l.tail = null : l.tail.sibling = null : u.sibling = null;
    }
}
function J(l) {
  var a = l.alternate !== null && l.alternate.child === l.child, t = 0, u = 0;
  if (a)
    for (var e = l.child; e !== null; )
      t |= e.lanes | e.childLanes, u |= e.subtreeFlags & 65011712, u |= e.flags & 65011712, e.return = l, e = e.sibling;
  else
    for (e = l.child; e !== null; )
      t |= e.lanes | e.childLanes, u |= e.subtreeFlags, u |= e.flags, e.return = l, e = e.sibling;
  return l.subtreeFlags |= u, l.childLanes = t, a;
}
function xm(l, a, t) {
  var u = a.pendingProps;
  switch (sc(a), a.tag) {
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return J(a), null;
    case 1:
      return J(a), null;
    case 3:
      return t = a.stateNode, u = null, l !== null && (u = l.memoizedState.cache), a.memoizedState.cache !== u && (a.flags |= 2048), ya(tl), Gt(), t.pendingContext && (t.context = t.pendingContext, t.pendingContext = null), (l === null || l.child === null) && (ht(a) ? la(a) : l === null || l.memoizedState.isDehydrated && (a.flags & 256) === 0 || (a.flags |= 1024, Cn())), J(a), null;
    case 26:
      var e = a.type, n = a.memoizedState;
      return l === null ? (la(a), n !== null ? (J(a), $i(a, n)) : (J(a), Wn(
        a,
        e,
        null,
        u,
        t
      ))) : n ? n !== l.memoizedState ? (la(a), J(a), $i(a, n)) : (J(a), a.flags &= -16777217) : (l = l.memoizedProps, l !== u && la(a), J(a), Wn(
        a,
        e,
        l,
        u,
        t
      )), null;
    case 27:
      if (qe(a), t = Ba.current, e = a.type, l !== null && a.stateNode != null)
        l.memoizedProps !== u && la(a);
      else {
        if (!u) {
          if (a.stateNode === null)
            throw Error(s(166));
          return J(a), null;
        }
        l = kl.current, ht(a) ? Ui(a) : (l = ly(e, u, t), a.stateNode = l, la(a));
      }
      return J(a), null;
    case 5:
      if (qe(a), e = a.type, l !== null && a.stateNode != null)
        l.memoizedProps !== u && la(a);
      else {
        if (!u) {
          if (a.stateNode === null)
            throw Error(s(166));
          return J(a), null;
        }
        if (n = kl.current, ht(a))
          Ui(a);
        else {
          var f = Ie(
            Ba.current
          );
          switch (n) {
            case 1:
              n = f.createElementNS(
                "http://www.w3.org/2000/svg",
                e
              );
              break;
            case 2:
              n = f.createElementNS(
                "http://www.w3.org/1998/Math/MathML",
                e
              );
              break;
            default:
              switch (e) {
                case "svg":
                  n = f.createElementNS(
                    "http://www.w3.org/2000/svg",
                    e
                  );
                  break;
                case "math":
                  n = f.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    e
                  );
                  break;
                case "script":
                  n = f.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(
                    n.firstChild
                  );
                  break;
                case "select":
                  n = typeof u.is == "string" ? f.createElement("select", {
                    is: u.is
                  }) : f.createElement("select"), u.multiple ? n.multiple = !0 : u.size && (n.size = u.size);
                  break;
                default:
                  n = typeof u.is == "string" ? f.createElement(e, { is: u.is }) : f.createElement(e);
              }
          }
          n[ml] = a, n[Ml] = u;
          l: for (f = a.child; f !== null; ) {
            if (f.tag === 5 || f.tag === 6)
              n.appendChild(f.stateNode);
            else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
              f.child.return = f, f = f.child;
              continue;
            }
            if (f === a) break l;
            for (; f.sibling === null; ) {
              if (f.return === null || f.return === a)
                break l;
              f = f.return;
            }
            f.sibling.return = f.return, f = f.sibling;
          }
          a.stateNode = n;
          l: switch (Sl(n, e, u), e) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              u = !!u.autoFocus;
              break l;
            case "img":
              u = !0;
              break l;
            default:
              u = !1;
          }
          u && la(a);
        }
      }
      return J(a), Wn(
        a,
        a.type,
        l === null ? null : l.memoizedProps,
        a.pendingProps,
        t
      ), null;
    case 6:
      if (l && a.stateNode != null)
        l.memoizedProps !== u && la(a);
      else {
        if (typeof u != "string" && a.stateNode === null)
          throw Error(s(166));
        if (l = Ba.current, ht(a)) {
          if (l = a.stateNode, t = a.memoizedProps, u = null, e = hl, e !== null)
            switch (e.tag) {
              case 27:
              case 5:
                u = e.memoizedProps;
            }
          l[ml] = a, l = !!(l.nodeValue === t || u !== null && u.suppressHydrationWarning === !0 || kv(l.nodeValue, t)), l || Va(a, !0);
        } else
          l = Ie(l).createTextNode(
            u
          ), l[ml] = a, a.stateNode = l;
      }
      return J(a), null;
    case 31:
      if (t = a.memoizedState, l === null || l.memoizedState !== null) {
        if (u = ht(a), t !== null) {
          if (l === null) {
            if (!u) throw Error(s(318));
            if (l = a.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(s(557));
            l[ml] = a;
          } else
            tt(), (a.flags & 128) === 0 && (a.memoizedState = null), a.flags |= 4;
          J(a), l = !1;
        } else
          t = Cn(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = t), l = !0;
        if (!l)
          return a.flags & 256 ? (Dl(a), a) : (Dl(a), null);
        if ((a.flags & 128) !== 0)
          throw Error(s(558));
      }
      return J(a), null;
    case 13:
      if (u = a.memoizedState, l === null || l.memoizedState !== null && l.memoizedState.dehydrated !== null) {
        if (e = ht(a), u !== null && u.dehydrated !== null) {
          if (l === null) {
            if (!e) throw Error(s(318));
            if (e = a.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(s(317));
            e[ml] = a;
          } else
            tt(), (a.flags & 128) === 0 && (a.memoizedState = null), a.flags |= 4;
          J(a), e = !1;
        } else
          e = Cn(), l !== null && l.memoizedState !== null && (l.memoizedState.hydrationErrors = e), e = !0;
        if (!e)
          return a.flags & 256 ? (Dl(a), a) : (Dl(a), null);
      }
      return Dl(a), (a.flags & 128) !== 0 ? (a.lanes = t, a) : (t = u !== null, l = l !== null && l.memoizedState !== null, t && (u = a.child, e = null, u.alternate !== null && u.alternate.memoizedState !== null && u.alternate.memoizedState.cachePool !== null && (e = u.alternate.memoizedState.cachePool.pool), n = null, u.memoizedState !== null && u.memoizedState.cachePool !== null && (n = u.memoizedState.cachePool.pool), n !== e && (u.flags |= 2048)), t !== l && t && (a.child.flags |= 8192), ie(a, a.updateQueue), J(a), null);
    case 4:
      return Gt(), l === null && Jc(a.stateNode.containerInfo), J(a), null;
    case 10:
      return ya(a.type), J(a), null;
    case 19:
      if (vl(I), u = a.memoizedState, u === null) return J(a), null;
      if (e = (a.flags & 128) !== 0, n = u.rendering, n === null)
        if (e) uu(u, !1);
        else {
          if (k !== 0 || l !== null && (l.flags & 128) !== 0)
            for (l = a.child; l !== null; ) {
              if (n = Ve(l), n !== null) {
                for (a.flags |= 128, uu(u, !1), l = n.updateQueue, a.updateQueue = l, ie(a, l), a.subtreeFlags = 0, l = t, t = a.child; t !== null; )
                  m1(t, l), t = t.sibling;
                return L(
                  I,
                  I.current & 1 | 2
                ), G && ea(a, u.treeForkCount), a.child;
              }
              l = l.sibling;
            }
          u.tail !== null && Hl() > We && (a.flags |= 128, e = !0, uu(u, !1), a.lanes = 4194304);
        }
      else {
        if (!e)
          if (l = Ve(n), l !== null) {
            if (a.flags |= 128, e = !0, l = l.updateQueue, a.updateQueue = l, ie(a, l), uu(u, !0), u.tail === null && u.tailMode === "hidden" && !n.alternate && !G)
              return J(a), null;
          } else
            2 * Hl() - u.renderingStartTime > We && t !== 536870912 && (a.flags |= 128, e = !0, uu(u, !1), a.lanes = 4194304);
        u.isBackwards ? (n.sibling = a.child, a.child = n) : (l = u.last, l !== null ? l.sibling = n : a.child = n, u.last = n);
      }
      return u.tail !== null ? (l = u.tail, u.rendering = l, u.tail = l.sibling, u.renderingStartTime = Hl(), l.sibling = null, t = I.current, L(
        I,
        e ? t & 1 | 2 : t & 1
      ), G && ea(a, u.treeForkCount), l) : (J(a), null);
    case 22:
    case 23:
      return Dl(a), Uc(), u = a.memoizedState !== null, l !== null ? l.memoizedState !== null !== u && (a.flags |= 8192) : u && (a.flags |= 8192), u ? (t & 536870912) !== 0 && (a.flags & 128) === 0 && (J(a), a.subtreeFlags & 6 && (a.flags |= 8192)) : J(a), t = a.updateQueue, t !== null && ie(a, t.retryQueue), t = null, l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), u = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (u = a.memoizedState.cachePool.pool), u !== t && (a.flags |= 2048), l !== null && vl(Pa), null;
    case 24:
      return t = null, l !== null && (t = l.memoizedState.cache), a.memoizedState.cache !== t && (a.flags |= 2048), ya(tl), J(a), null;
    case 25:
      return null;
    case 30:
      return null;
  }
  throw Error(s(156, a.tag));
}
function Lm(l, a) {
  switch (sc(a), a.tag) {
    case 1:
      return l = a.flags, l & 65536 ? (a.flags = l & -65537 | 128, a) : null;
    case 3:
      return ya(tl), Gt(), l = a.flags, (l & 65536) !== 0 && (l & 128) === 0 ? (a.flags = l & -65537 | 128, a) : null;
    case 26:
    case 27:
    case 5:
      return qe(a), null;
    case 31:
      if (a.memoizedState !== null) {
        if (Dl(a), a.alternate === null)
          throw Error(s(340));
        tt();
      }
      return l = a.flags, l & 65536 ? (a.flags = l & -65537 | 128, a) : null;
    case 13:
      if (Dl(a), l = a.memoizedState, l !== null && l.dehydrated !== null) {
        if (a.alternate === null)
          throw Error(s(340));
        tt();
      }
      return l = a.flags, l & 65536 ? (a.flags = l & -65537 | 128, a) : null;
    case 19:
      return vl(I), null;
    case 4:
      return Gt(), null;
    case 10:
      return ya(a.type), null;
    case 22:
    case 23:
      return Dl(a), Uc(), l !== null && vl(Pa), l = a.flags, l & 65536 ? (a.flags = l & -65537 | 128, a) : null;
    case 24:
      return ya(tl), null;
    case 25:
      return null;
    default:
      return null;
  }
}
function mv(l, a) {
  switch (sc(a), a.tag) {
    case 3:
      ya(tl), Gt();
      break;
    case 26:
    case 27:
    case 5:
      qe(a);
      break;
    case 4:
      Gt();
      break;
    case 31:
      a.memoizedState !== null && Dl(a);
      break;
    case 13:
      Dl(a);
      break;
    case 19:
      vl(I);
      break;
    case 10:
      ya(a.type);
      break;
    case 22:
    case 23:
      Dl(a), Uc(), l !== null && vl(Pa);
      break;
    case 24:
      ya(tl);
  }
}
function Wu(l, a) {
  try {
    var t = a.updateQueue, u = t !== null ? t.lastEffect : null;
    if (u !== null) {
      var e = u.next;
      t = e;
      do {
        if ((t.tag & l) === l) {
          u = void 0;
          var n = t.create, f = t.inst;
          u = n(), f.destroy = u;
        }
        t = t.next;
      } while (t !== e);
    }
  } catch (c) {
    V(a, a.return, c);
  }
}
function pa(l, a, t) {
  try {
    var u = a.updateQueue, e = u !== null ? u.lastEffect : null;
    if (e !== null) {
      var n = e.next;
      u = n;
      do {
        if ((u.tag & l) === l) {
          var f = u.inst, c = f.destroy;
          if (c !== void 0) {
            f.destroy = void 0, e = a;
            var i = t, h = c;
            try {
              h();
            } catch (g) {
              V(
                e,
                i,
                g
              );
            }
          }
        }
        u = u.next;
      } while (u !== n);
    }
  } catch (g) {
    V(a, a.return, g);
  }
}
function hv(l) {
  var a = l.updateQueue;
  if (a !== null) {
    var t = l.stateNode;
    try {
      M1(a, t);
    } catch (u) {
      V(l, l.return, u);
    }
  }
}
function dv(l, a, t) {
  t.props = ft(
    l.type,
    l.memoizedProps
  ), t.state = l.memoizedState;
  try {
    t.componentWillUnmount();
  } catch (u) {
    V(l, a, u);
  }
}
function Au(l, a) {
  try {
    var t = l.ref;
    if (t !== null) {
      switch (l.tag) {
        case 26:
        case 27:
        case 5:
          var u = l.stateNode;
          break;
        case 30:
          u = l.stateNode;
          break;
        default:
          u = l.stateNode;
      }
      typeof t == "function" ? l.refCleanup = t(u) : t.current = u;
    }
  } catch (e) {
    V(l, a, e);
  }
}
function Fl(l, a) {
  var t = l.ref, u = l.refCleanup;
  if (t !== null)
    if (typeof u == "function")
      try {
        u();
      } catch (e) {
        V(l, a, e);
      } finally {
        l.refCleanup = null, l = l.alternate, l != null && (l.refCleanup = null);
      }
    else if (typeof t == "function")
      try {
        t(null);
      } catch (e) {
        V(l, a, e);
      }
    else t.current = null;
}
function Sv(l) {
  var a = l.type, t = l.memoizedProps, u = l.stateNode;
  try {
    l: switch (a) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        t.autoFocus && u.focus();
        break l;
      case "img":
        t.src ? u.src = t.src : t.srcSet && (u.srcset = t.srcSet);
    }
  } catch (e) {
    V(l, l.return, e);
  }
}
function wn(l, a, t) {
  try {
    var u = l.stateNode;
    hh(u, l.type, t, a), u[Ml] = a;
  } catch (e) {
    V(l, l.return, e);
  }
}
function gv(l) {
  return l.tag === 5 || l.tag === 3 || l.tag === 26 || l.tag === 27 && La(l.type) || l.tag === 4;
}
function $n(l) {
  l: for (; ; ) {
    for (; l.sibling === null; ) {
      if (l.return === null || gv(l.return)) return null;
      l = l.return;
    }
    for (l.sibling.return = l.return, l = l.sibling; l.tag !== 5 && l.tag !== 6 && l.tag !== 18; ) {
      if (l.tag === 27 && La(l.type) || l.flags & 2 || l.child === null || l.tag === 4) continue l;
      l.child.return = l, l = l.child;
    }
    if (!(l.flags & 2)) return l.stateNode;
  }
}
function jf(l, a, t) {
  var u = l.tag;
  if (u === 5 || u === 6)
    l = l.stateNode, a ? (t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t).insertBefore(l, a) : (a = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, a.appendChild(l), t = t._reactRootContainer, t != null || a.onclick !== null || (a.onclick = ca));
  else if (u !== 4 && (u === 27 && La(l.type) && (t = l.stateNode, a = null), l = l.child, l !== null))
    for (jf(l, a, t), l = l.sibling; l !== null; )
      jf(l, a, t), l = l.sibling;
}
function Je(l, a, t) {
  var u = l.tag;
  if (u === 5 || u === 6)
    l = l.stateNode, a ? t.insertBefore(l, a) : t.appendChild(l);
  else if (u !== 4 && (u === 27 && La(l.type) && (t = l.stateNode), l = l.child, l !== null))
    for (Je(l, a, t), l = l.sibling; l !== null; )
      Je(l, a, t), l = l.sibling;
}
function bv(l) {
  var a = l.stateNode, t = l.memoizedProps;
  try {
    for (var u = l.type, e = a.attributes; e.length; )
      a.removeAttributeNode(e[0]);
    Sl(a, u, t), a[ml] = l, a[Ml] = t;
  } catch (n) {
    V(l, l.return, n);
  }
}
var na = !1, al = !1, Fn = !1, Fi = typeof WeakSet == "function" ? WeakSet : Set, cl = null;
function Jm(l, a) {
  if (l = l.containerInfo, Wf = tn, l = u1(l), dc(l)) {
    if ("selectionStart" in l)
      var t = {
        start: l.selectionStart,
        end: l.selectionEnd
      };
    else
      l: {
        t = (t = l.ownerDocument) && t.defaultView || window;
        var u = t.getSelection && t.getSelection();
        if (u && u.rangeCount !== 0) {
          t = u.anchorNode;
          var e = u.anchorOffset, n = u.focusNode;
          u = u.focusOffset;
          try {
            t.nodeType, n.nodeType;
          } catch {
            t = null;
            break l;
          }
          var f = 0, c = -1, i = -1, h = 0, g = 0, b = l, m = null;
          a: for (; ; ) {
            for (var S; b !== t || e !== 0 && b.nodeType !== 3 || (c = f + e), b !== n || u !== 0 && b.nodeType !== 3 || (i = f + u), b.nodeType === 3 && (f += b.nodeValue.length), (S = b.firstChild) !== null; )
              m = b, b = S;
            for (; ; ) {
              if (b === l) break a;
              if (m === t && ++h === e && (c = f), m === n && ++g === u && (i = f), (S = b.nextSibling) !== null) break;
              b = m, m = b.parentNode;
            }
            b = S;
          }
          t = c === -1 || i === -1 ? null : { start: c, end: i };
        } else t = null;
      }
    t = t || { start: 0, end: 0 };
  } else t = null;
  for (wf = { focusedElem: l, selectionRange: t }, tn = !1, cl = a; cl !== null; )
    if (a = cl, l = a.child, (a.subtreeFlags & 1028) !== 0 && l !== null)
      l.return = a, cl = l;
    else
      for (; cl !== null; ) {
        switch (a = cl, n = a.alternate, l = a.flags, a.tag) {
          case 0:
            if ((l & 4) !== 0 && (l = a.updateQueue, l = l !== null ? l.events : null, l !== null))
              for (t = 0; t < l.length; t++)
                e = l[t], e.ref.impl = e.nextImpl;
            break;
          case 11:
          case 15:
            break;
          case 1:
            if ((l & 1024) !== 0 && n !== null) {
              l = void 0, t = a, e = n.memoizedProps, n = n.memoizedState, u = t.stateNode;
              try {
                var A = ft(
                  t.type,
                  e
                );
                l = u.getSnapshotBeforeUpdate(
                  A,
                  n
                ), u.__reactInternalSnapshotBeforeUpdate = l;
              } catch (U) {
                V(
                  t,
                  t.return,
                  U
                );
              }
            }
            break;
          case 3:
            if ((l & 1024) !== 0) {
              if (l = a.stateNode.containerInfo, t = l.nodeType, t === 9)
                Ff(l);
              else if (t === 1)
                switch (l.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    Ff(l);
                    break;
                  default:
                    l.textContent = "";
                }
            }
            break;
          case 5:
          case 26:
          case 27:
          case 6:
          case 4:
          case 17:
            break;
          default:
            if ((l & 1024) !== 0) throw Error(s(163));
        }
        if (l = a.sibling, l !== null) {
          l.return = a.return, cl = l;
          break;
        }
        cl = a.return;
      }
}
function zv(l, a, t) {
  var u = t.flags;
  switch (t.tag) {
    case 0:
    case 11:
    case 15:
      ta(l, t), u & 4 && Wu(5, t);
      break;
    case 1:
      if (ta(l, t), u & 4)
        if (l = t.stateNode, a === null)
          try {
            l.componentDidMount();
          } catch (f) {
            V(t, t.return, f);
          }
        else {
          var e = ft(
            t.type,
            a.memoizedProps
          );
          a = a.memoizedState;
          try {
            l.componentDidUpdate(
              e,
              a,
              l.__reactInternalSnapshotBeforeUpdate
            );
          } catch (f) {
            V(
              t,
              t.return,
              f
            );
          }
        }
      u & 64 && hv(t), u & 512 && Au(t, t.return);
      break;
    case 3:
      if (ta(l, t), u & 64 && (l = t.updateQueue, l !== null)) {
        if (a = null, t.child !== null)
          switch (t.child.tag) {
            case 27:
            case 5:
              a = t.child.stateNode;
              break;
            case 1:
              a = t.child.stateNode;
          }
        try {
          M1(l, a);
        } catch (f) {
          V(t, t.return, f);
        }
      }
      break;
    case 27:
      a === null && u & 4 && bv(t);
    case 26:
    case 5:
      ta(l, t), a === null && u & 4 && Sv(t), u & 512 && Au(t, t.return);
      break;
    case 12:
      ta(l, t);
      break;
    case 31:
      ta(l, t), u & 4 && Tv(l, t);
      break;
    case 13:
      ta(l, t), u & 4 && Mv(l, t), u & 64 && (l = t.memoizedState, l !== null && (l = l.dehydrated, l !== null && (t = lh.bind(
        null,
        t
      ), Th(l, t))));
      break;
    case 22:
      if (u = t.memoizedState !== null || na, !u) {
        a = a !== null && a.memoizedState !== null || al, e = na;
        var n = al;
        na = u, (al = a) && !n ? ua(
          l,
          t,
          (t.subtreeFlags & 8772) !== 0
        ) : ta(l, t), na = e, al = n;
      }
      break;
    case 30:
      break;
    default:
      ta(l, t);
  }
}
function sv(l) {
  var a = l.alternate;
  a !== null && (l.alternate = null, sv(a)), l.child = null, l.deletions = null, l.sibling = null, l.tag === 5 && (a = l.stateNode, a !== null && cc(a)), l.stateNode = null, l.return = null, l.dependencies = null, l.memoizedProps = null, l.memoizedState = null, l.pendingProps = null, l.stateNode = null, l.updateQueue = null;
}
var $ = null, sl = !1;
function aa(l, a, t) {
  for (t = t.child; t !== null; )
    Av(l, a, t), t = t.sibling;
}
function Av(l, a, t) {
  if (Nl && typeof Nl.onCommitFiberUnmount == "function")
    try {
      Nl.onCommitFiberUnmount(ju, t);
    } catch {
    }
  switch (t.tag) {
    case 26:
      al || Fl(t, a), aa(
        l,
        a,
        t
      ), t.memoizedState ? t.memoizedState.count-- : t.stateNode && (t = t.stateNode, t.parentNode.removeChild(t));
      break;
    case 27:
      al || Fl(t, a);
      var u = $, e = sl;
      La(t.type) && ($ = t.stateNode, sl = !1), aa(
        l,
        a,
        t
      ), Uu(t.stateNode), $ = u, sl = e;
      break;
    case 5:
      al || Fl(t, a);
    case 6:
      if (u = $, e = sl, $ = null, aa(
        l,
        a,
        t
      ), $ = u, sl = e, $ !== null)
        if (sl)
          try {
            ($.nodeType === 9 ? $.body : $.nodeName === "HTML" ? $.ownerDocument.body : $).removeChild(t.stateNode);
          } catch (n) {
            V(
              t,
              a,
              n
            );
          }
        else
          try {
            $.removeChild(t.stateNode);
          } catch (n) {
            V(
              t,
              a,
              n
            );
          }
      break;
    case 18:
      $ !== null && (sl ? (l = $, i0(
        l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l,
        t.stateNode
      ), Jt(l)) : i0($, t.stateNode));
      break;
    case 4:
      u = $, e = sl, $ = t.stateNode.containerInfo, sl = !0, aa(
        l,
        a,
        t
      ), $ = u, sl = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      pa(2, t, a), al || pa(4, t, a), aa(
        l,
        a,
        t
      );
      break;
    case 1:
      al || (Fl(t, a), u = t.stateNode, typeof u.componentWillUnmount == "function" && dv(
        t,
        a,
        u
      )), aa(
        l,
        a,
        t
      );
      break;
    case 21:
      aa(
        l,
        a,
        t
      );
      break;
    case 22:
      al = (u = al) || t.memoizedState !== null, aa(
        l,
        a,
        t
      ), al = u;
      break;
    default:
      aa(
        l,
        a,
        t
      );
  }
}
function Tv(l, a) {
  if (a.memoizedState === null && (l = a.alternate, l !== null && (l = l.memoizedState, l !== null))) {
    l = l.dehydrated;
    try {
      Jt(l);
    } catch (t) {
      V(a, a.return, t);
    }
  }
}
function Mv(l, a) {
  if (a.memoizedState === null && (l = a.alternate, l !== null && (l = l.memoizedState, l !== null && (l = l.dehydrated, l !== null))))
    try {
      Jt(l);
    } catch (t) {
      V(a, a.return, t);
    }
}
function Wm(l) {
  switch (l.tag) {
    case 31:
    case 13:
    case 19:
      var a = l.stateNode;
      return a === null && (a = l.stateNode = new Fi()), a;
    case 22:
      return l = l.stateNode, a = l._retryCache, a === null && (a = l._retryCache = new Fi()), a;
    default:
      throw Error(s(435, l.tag));
  }
}
function ve(l, a) {
  var t = Wm(l);
  a.forEach(function(u) {
    if (!t.has(u)) {
      t.add(u);
      var e = ah.bind(null, l, u);
      u.then(e, e);
    }
  });
}
function bl(l, a) {
  var t = a.deletions;
  if (t !== null)
    for (var u = 0; u < t.length; u++) {
      var e = t[u], n = l, f = a, c = f;
      l: for (; c !== null; ) {
        switch (c.tag) {
          case 27:
            if (La(c.type)) {
              $ = c.stateNode, sl = !1;
              break l;
            }
            break;
          case 5:
            $ = c.stateNode, sl = !1;
            break l;
          case 3:
          case 4:
            $ = c.stateNode.containerInfo, sl = !0;
            break l;
        }
        c = c.return;
      }
      if ($ === null) throw Error(s(160));
      Av(n, f, e), $ = null, sl = !1, n = e.alternate, n !== null && (n.return = null), e.return = null;
    }
  if (a.subtreeFlags & 13886)
    for (a = a.child; a !== null; )
      Ev(a, l), a = a.sibling;
}
var Jl = null;
function Ev(l, a) {
  var t = l.alternate, u = l.flags;
  switch (l.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      bl(a, l), zl(l), u & 4 && (pa(3, l, l.return), Wu(3, l), pa(5, l, l.return));
      break;
    case 1:
      bl(a, l), zl(l), u & 512 && (al || t === null || Fl(t, t.return)), u & 64 && na && (l = l.updateQueue, l !== null && (u = l.callbacks, u !== null && (t = l.shared.hiddenCallbacks, l.shared.hiddenCallbacks = t === null ? u : t.concat(u))));
      break;
    case 26:
      var e = Jl;
      if (bl(a, l), zl(l), u & 512 && (al || t === null || Fl(t, t.return)), u & 4) {
        var n = t !== null ? t.memoizedState : null;
        if (u = l.memoizedState, t === null)
          if (u === null)
            if (l.stateNode === null) {
              l: {
                u = l.type, t = l.memoizedProps, e = e.ownerDocument || e;
                a: switch (u) {
                  case "title":
                    n = e.getElementsByTagName("title")[0], (!n || n[Ku] || n[ml] || n.namespaceURI === "http://www.w3.org/2000/svg" || n.hasAttribute("itemprop")) && (n = e.createElement(u), e.head.insertBefore(
                      n,
                      e.querySelector("head > title")
                    )), Sl(n, u, t), n[ml] = l, il(n), u = n;
                    break l;
                  case "link":
                    var f = g0(
                      "link",
                      "href",
                      e
                    ).get(u + (t.href || ""));
                    if (f) {
                      for (var c = 0; c < f.length; c++)
                        if (n = f[c], n.getAttribute("href") === (t.href == null || t.href === "" ? null : t.href) && n.getAttribute("rel") === (t.rel == null ? null : t.rel) && n.getAttribute("title") === (t.title == null ? null : t.title) && n.getAttribute("crossorigin") === (t.crossOrigin == null ? null : t.crossOrigin)) {
                          f.splice(c, 1);
                          break a;
                        }
                    }
                    n = e.createElement(u), Sl(n, u, t), e.head.appendChild(n);
                    break;
                  case "meta":
                    if (f = g0(
                      "meta",
                      "content",
                      e
                    ).get(u + (t.content || ""))) {
                      for (c = 0; c < f.length; c++)
                        if (n = f[c], n.getAttribute("content") === (t.content == null ? null : "" + t.content) && n.getAttribute("name") === (t.name == null ? null : t.name) && n.getAttribute("property") === (t.property == null ? null : t.property) && n.getAttribute("http-equiv") === (t.httpEquiv == null ? null : t.httpEquiv) && n.getAttribute("charset") === (t.charSet == null ? null : t.charSet)) {
                          f.splice(c, 1);
                          break a;
                        }
                    }
                    n = e.createElement(u), Sl(n, u, t), e.head.appendChild(n);
                    break;
                  default:
                    throw Error(s(468, u));
                }
                n[ml] = l, il(n), u = n;
              }
              l.stateNode = u;
            } else
              b0(
                e,
                l.type,
                l.stateNode
              );
          else
            l.stateNode = S0(
              e,
              u,
              l.memoizedProps
            );
        else
          n !== u ? (n === null ? t.stateNode !== null && (t = t.stateNode, t.parentNode.removeChild(t)) : n.count--, u === null ? b0(
            e,
            l.type,
            l.stateNode
          ) : S0(
            e,
            u,
            l.memoizedProps
          )) : u === null && l.stateNode !== null && wn(
            l,
            l.memoizedProps,
            t.memoizedProps
          );
      }
      break;
    case 27:
      bl(a, l), zl(l), u & 512 && (al || t === null || Fl(t, t.return)), t !== null && u & 4 && wn(
        l,
        l.memoizedProps,
        t.memoizedProps
      );
      break;
    case 5:
      if (bl(a, l), zl(l), u & 512 && (al || t === null || Fl(t, t.return)), l.flags & 32) {
        e = l.stateNode;
        try {
          Ct(e, "");
        } catch (A) {
          V(l, l.return, A);
        }
      }
      u & 4 && l.stateNode != null && (e = l.memoizedProps, wn(
        l,
        e,
        t !== null ? t.memoizedProps : e
      )), u & 1024 && (Fn = !0);
      break;
    case 6:
      if (bl(a, l), zl(l), u & 4) {
        if (l.stateNode === null)
          throw Error(s(162));
        u = l.memoizedProps, t = l.stateNode;
        try {
          t.nodeValue = u;
        } catch (A) {
          V(l, l.return, A);
        }
      }
      break;
    case 3:
      if (oe = null, e = Jl, Jl = Pe(a.containerInfo), bl(a, l), Jl = e, zl(l), u & 4 && t !== null && t.memoizedState.isDehydrated)
        try {
          Jt(a.containerInfo);
        } catch (A) {
          V(l, l.return, A);
        }
      Fn && (Fn = !1, Uv(l));
      break;
    case 4:
      u = Jl, Jl = Pe(
        l.stateNode.containerInfo
      ), bl(a, l), zl(l), Jl = u;
      break;
    case 12:
      bl(a, l), zl(l);
      break;
    case 31:
      bl(a, l), zl(l), u & 4 && (u = l.updateQueue, u !== null && (l.updateQueue = null, ve(l, u)));
      break;
    case 13:
      bl(a, l), zl(l), l.child.flags & 8192 && l.memoizedState !== null != (t !== null && t.memoizedState !== null) && (bn = Hl()), u & 4 && (u = l.updateQueue, u !== null && (l.updateQueue = null, ve(l, u)));
      break;
    case 22:
      e = l.memoizedState !== null;
      var i = t !== null && t.memoizedState !== null, h = na, g = al;
      if (na = h || e, al = g || i, bl(a, l), al = g, na = h, zl(l), u & 8192)
        l: for (a = l.stateNode, a._visibility = e ? a._visibility & -2 : a._visibility | 1, e && (t === null || i || na || al || ka(l)), t = null, a = l; ; ) {
          if (a.tag === 5 || a.tag === 26) {
            if (t === null) {
              i = t = a;
              try {
                if (n = i.stateNode, e)
                  f = n.style, typeof f.setProperty == "function" ? f.setProperty("display", "none", "important") : f.display = "none";
                else {
                  c = i.stateNode;
                  var b = i.memoizedProps.style, m = b != null && b.hasOwnProperty("display") ? b.display : null;
                  c.style.display = m == null || typeof m == "boolean" ? "" : ("" + m).trim();
                }
              } catch (A) {
                V(i, i.return, A);
              }
            }
          } else if (a.tag === 6) {
            if (t === null) {
              i = a;
              try {
                i.stateNode.nodeValue = e ? "" : i.memoizedProps;
              } catch (A) {
                V(i, i.return, A);
              }
            }
          } else if (a.tag === 18) {
            if (t === null) {
              i = a;
              try {
                var S = i.stateNode;
                e ? v0(S, !0) : v0(i.stateNode, !1);
              } catch (A) {
                V(i, i.return, A);
              }
            }
          } else if ((a.tag !== 22 && a.tag !== 23 || a.memoizedState === null || a === l) && a.child !== null) {
            a.child.return = a, a = a.child;
            continue;
          }
          if (a === l) break l;
          for (; a.sibling === null; ) {
            if (a.return === null || a.return === l) break l;
            t === a && (t = null), a = a.return;
          }
          t === a && (t = null), a.sibling.return = a.return, a = a.sibling;
        }
      u & 4 && (u = l.updateQueue, u !== null && (t = u.retryQueue, t !== null && (u.retryQueue = null, ve(l, t))));
      break;
    case 19:
      bl(a, l), zl(l), u & 4 && (u = l.updateQueue, u !== null && (l.updateQueue = null, ve(l, u)));
      break;
    case 30:
      break;
    case 21:
      break;
    default:
      bl(a, l), zl(l);
  }
}
function zl(l) {
  var a = l.flags;
  if (a & 2) {
    try {
      for (var t, u = l.return; u !== null; ) {
        if (gv(u)) {
          t = u;
          break;
        }
        u = u.return;
      }
      if (t == null) throw Error(s(160));
      switch (t.tag) {
        case 27:
          var e = t.stateNode, n = $n(l);
          Je(l, n, e);
          break;
        case 5:
          var f = t.stateNode;
          t.flags & 32 && (Ct(f, ""), t.flags &= -33);
          var c = $n(l);
          Je(l, c, f);
          break;
        case 3:
        case 4:
          var i = t.stateNode.containerInfo, h = $n(l);
          jf(
            l,
            h,
            i
          );
          break;
        default:
          throw Error(s(161));
      }
    } catch (g) {
      V(l, l.return, g);
    }
    l.flags &= -3;
  }
  a & 4096 && (l.flags &= -4097);
}
function Uv(l) {
  if (l.subtreeFlags & 1024)
    for (l = l.child; l !== null; ) {
      var a = l;
      Uv(a), a.tag === 5 && a.flags & 1024 && a.stateNode.reset(), l = l.sibling;
    }
}
function ta(l, a) {
  if (a.subtreeFlags & 8772)
    for (a = a.child; a !== null; )
      zv(l, a.alternate, a), a = a.sibling;
}
function ka(l) {
  for (l = l.child; l !== null; ) {
    var a = l;
    switch (a.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        pa(4, a, a.return), ka(a);
        break;
      case 1:
        Fl(a, a.return);
        var t = a.stateNode;
        typeof t.componentWillUnmount == "function" && dv(
          a,
          a.return,
          t
        ), ka(a);
        break;
      case 27:
        Uu(a.stateNode);
      case 26:
      case 5:
        Fl(a, a.return), ka(a);
        break;
      case 22:
        a.memoizedState === null && ka(a);
        break;
      case 30:
        ka(a);
        break;
      default:
        ka(a);
    }
    l = l.sibling;
  }
}
function ua(l, a, t) {
  for (t = t && (a.subtreeFlags & 8772) !== 0, a = a.child; a !== null; ) {
    var u = a.alternate, e = l, n = a, f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        ua(
          e,
          n,
          t
        ), Wu(4, n);
        break;
      case 1:
        if (ua(
          e,
          n,
          t
        ), u = n, e = u.stateNode, typeof e.componentDidMount == "function")
          try {
            e.componentDidMount();
          } catch (h) {
            V(u, u.return, h);
          }
        if (u = n, e = u.updateQueue, e !== null) {
          var c = u.stateNode;
          try {
            var i = e.shared.hiddenCallbacks;
            if (i !== null)
              for (e.shared.hiddenCallbacks = null, e = 0; e < i.length; e++)
                T1(i[e], c);
          } catch (h) {
            V(u, u.return, h);
          }
        }
        t && f & 64 && hv(n), Au(n, n.return);
        break;
      case 27:
        bv(n);
      case 26:
      case 5:
        ua(
          e,
          n,
          t
        ), t && u === null && f & 4 && Sv(n), Au(n, n.return);
        break;
      case 12:
        ua(
          e,
          n,
          t
        );
        break;
      case 31:
        ua(
          e,
          n,
          t
        ), t && f & 4 && Tv(e, n);
        break;
      case 13:
        ua(
          e,
          n,
          t
        ), t && f & 4 && Mv(e, n);
        break;
      case 22:
        n.memoizedState === null && ua(
          e,
          n,
          t
        ), Au(n, n.return);
        break;
      case 30:
        break;
      default:
        ua(
          e,
          n,
          t
        );
    }
    a = a.sibling;
  }
}
function jc(l, a) {
  var t = null;
  l !== null && l.memoizedState !== null && l.memoizedState.cachePool !== null && (t = l.memoizedState.cachePool.pool), l = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (l = a.memoizedState.cachePool.pool), l !== t && (l != null && l.refCount++, t != null && Lu(t));
}
function Vc(l, a) {
  l = null, a.alternate !== null && (l = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== l && (a.refCount++, l != null && Lu(l));
}
function Ll(l, a, t, u) {
  if (a.subtreeFlags & 10256)
    for (a = a.child; a !== null; )
      Dv(
        l,
        a,
        t,
        u
      ), a = a.sibling;
}
function Dv(l, a, t, u) {
  var e = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 15:
      Ll(
        l,
        a,
        t,
        u
      ), e & 2048 && Wu(9, a);
      break;
    case 1:
      Ll(
        l,
        a,
        t,
        u
      );
      break;
    case 3:
      Ll(
        l,
        a,
        t,
        u
      ), e & 2048 && (l = null, a.alternate !== null && (l = a.alternate.memoizedState.cache), a = a.memoizedState.cache, a !== l && (a.refCount++, l != null && Lu(l)));
      break;
    case 12:
      if (e & 2048) {
        Ll(
          l,
          a,
          t,
          u
        ), l = a.stateNode;
        try {
          var n = a.memoizedProps, f = n.id, c = n.onPostCommit;
          typeof c == "function" && c(
            f,
            a.alternate === null ? "mount" : "update",
            l.passiveEffectDuration,
            -0
          );
        } catch (i) {
          V(a, a.return, i);
        }
      } else
        Ll(
          l,
          a,
          t,
          u
        );
      break;
    case 31:
      Ll(
        l,
        a,
        t,
        u
      );
      break;
    case 13:
      Ll(
        l,
        a,
        t,
        u
      );
      break;
    case 23:
      break;
    case 22:
      n = a.stateNode, f = a.alternate, a.memoizedState !== null ? n._visibility & 2 ? Ll(
        l,
        a,
        t,
        u
      ) : Tu(l, a) : n._visibility & 2 ? Ll(
        l,
        a,
        t,
        u
      ) : (n._visibility |= 2, St(
        l,
        a,
        t,
        u,
        (a.subtreeFlags & 10256) !== 0 || !1
      )), e & 2048 && jc(f, a);
      break;
    case 24:
      Ll(
        l,
        a,
        t,
        u
      ), e & 2048 && Vc(a.alternate, a);
      break;
    default:
      Ll(
        l,
        a,
        t,
        u
      );
  }
}
function St(l, a, t, u, e) {
  for (e = e && ((a.subtreeFlags & 10256) !== 0 || !1), a = a.child; a !== null; ) {
    var n = l, f = a, c = t, i = u, h = f.flags;
    switch (f.tag) {
      case 0:
      case 11:
      case 15:
        St(
          n,
          f,
          c,
          i,
          e
        ), Wu(8, f);
        break;
      case 23:
        break;
      case 22:
        var g = f.stateNode;
        f.memoizedState !== null ? g._visibility & 2 ? St(
          n,
          f,
          c,
          i,
          e
        ) : Tu(
          n,
          f
        ) : (g._visibility |= 2, St(
          n,
          f,
          c,
          i,
          e
        )), e && h & 2048 && jc(
          f.alternate,
          f
        );
        break;
      case 24:
        St(
          n,
          f,
          c,
          i,
          e
        ), e && h & 2048 && Vc(f.alternate, f);
        break;
      default:
        St(
          n,
          f,
          c,
          i,
          e
        );
    }
    a = a.sibling;
  }
}
function Tu(l, a) {
  if (a.subtreeFlags & 10256)
    for (a = a.child; a !== null; ) {
      var t = l, u = a, e = u.flags;
      switch (u.tag) {
        case 22:
          Tu(t, u), e & 2048 && jc(
            u.alternate,
            u
          );
          break;
        case 24:
          Tu(t, u), e & 2048 && Vc(u.alternate, u);
          break;
        default:
          Tu(t, u);
      }
      a = a.sibling;
    }
}
var yu = 8192;
function dt(l, a, t) {
  if (l.subtreeFlags & yu)
    for (l = l.child; l !== null; )
      Ov(
        l,
        a,
        t
      ), l = l.sibling;
}
function Ov(l, a, t) {
  switch (l.tag) {
    case 26:
      dt(
        l,
        a,
        t
      ), l.flags & yu && l.memoizedState !== null && Yh(
        t,
        Jl,
        l.memoizedState,
        l.memoizedProps
      );
      break;
    case 5:
      dt(
        l,
        a,
        t
      );
      break;
    case 3:
    case 4:
      var u = Jl;
      Jl = Pe(l.stateNode.containerInfo), dt(
        l,
        a,
        t
      ), Jl = u;
      break;
    case 22:
      l.memoizedState === null && (u = l.alternate, u !== null && u.memoizedState !== null ? (u = yu, yu = 16777216, dt(
        l,
        a,
        t
      ), yu = u) : dt(
        l,
        a,
        t
      ));
      break;
    default:
      dt(
        l,
        a,
        t
      );
  }
}
function ov(l) {
  var a = l.alternate;
  if (a !== null && (l = a.child, l !== null)) {
    a.child = null;
    do
      a = l.sibling, l.sibling = null, l = a;
    while (l !== null);
  }
}
function eu(l) {
  var a = l.deletions;
  if ((l.flags & 16) !== 0) {
    if (a !== null)
      for (var t = 0; t < a.length; t++) {
        var u = a[t];
        cl = u, Nv(
          u,
          l
        );
      }
    ov(l);
  }
  if (l.subtreeFlags & 10256)
    for (l = l.child; l !== null; )
      Hv(l), l = l.sibling;
}
function Hv(l) {
  switch (l.tag) {
    case 0:
    case 11:
    case 15:
      eu(l), l.flags & 2048 && pa(9, l, l.return);
      break;
    case 3:
      eu(l);
      break;
    case 12:
      eu(l);
      break;
    case 22:
      var a = l.stateNode;
      l.memoizedState !== null && a._visibility & 2 && (l.return === null || l.return.tag !== 13) ? (a._visibility &= -3, De(l)) : eu(l);
      break;
    default:
      eu(l);
  }
}
function De(l) {
  var a = l.deletions;
  if ((l.flags & 16) !== 0) {
    if (a !== null)
      for (var t = 0; t < a.length; t++) {
        var u = a[t];
        cl = u, Nv(
          u,
          l
        );
      }
    ov(l);
  }
  for (l = l.child; l !== null; ) {
    switch (a = l, a.tag) {
      case 0:
      case 11:
      case 15:
        pa(8, a, a.return), De(a);
        break;
      case 22:
        t = a.stateNode, t._visibility & 2 && (t._visibility &= -3, De(a));
        break;
      default:
        De(a);
    }
    l = l.sibling;
  }
}
function Nv(l, a) {
  for (; cl !== null; ) {
    var t = cl;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        pa(8, t, a);
        break;
      case 23:
      case 22:
        if (t.memoizedState !== null && t.memoizedState.cachePool !== null) {
          var u = t.memoizedState.cachePool.pool;
          u != null && u.refCount++;
        }
        break;
      case 24:
        Lu(t.memoizedState.cache);
    }
    if (u = t.child, u !== null) u.return = t, cl = u;
    else
      l: for (t = l; cl !== null; ) {
        u = cl;
        var e = u.sibling, n = u.return;
        if (sv(u), u === t) {
          cl = null;
          break l;
        }
        if (e !== null) {
          e.return = n, cl = e;
          break l;
        }
        cl = n;
      }
  }
}
var wm = {
  getCacheForType: function(l) {
    var a = dl(tl), t = a.data.get(l);
    return t === void 0 && (t = l(), a.data.set(l, t)), t;
  },
  cacheSignal: function() {
    return dl(tl).controller.signal;
  }
}, $m = typeof WeakMap == "function" ? WeakMap : Map, C = 0, x = null, Y = null, Q = 0, j = 0, Ul = null, Ha = !1, kt = !1, pc = !1, ba = 0, k = 0, Ka = 0, at = 0, Kc = 0, ol = 0, pt = 0, Mu = null, Al = null, Vf = !1, bn = 0, _v = 0, We = 1 / 0, we = null, Xa = null, el = 0, Ga = null, Kt = null, ma = 0, pf = 0, Kf = null, Bv = null, Eu = 0, xf = null;
function Bl() {
  return (C & 2) !== 0 && Q !== 0 ? Q & -Q : D.T !== null ? Lc() : j0();
}
function qv() {
  if (ol === 0)
    if ((Q & 536870912) === 0 || G) {
      var l = ae;
      ae <<= 1, (ae & 3932160) === 0 && (ae = 262144), ol = l;
    } else ol = 536870912;
  return l = Yl.current, l !== null && (l.flags |= 32), ol;
}
function Tl(l, a, t) {
  (l === x && (j === 2 || j === 9) || l.cancelPendingCommit !== null) && (xt(l, 0), Na(
    l,
    Q,
    ol,
    !1
  )), pu(l, t), ((C & 2) === 0 || l !== x) && (l === x && ((C & 2) === 0 && (at |= t), k === 4 && Na(
    l,
    Q,
    ol,
    !1
  )), Il(l));
}
function Yv(l, a, t) {
  if ((C & 6) !== 0) throw Error(s(327));
  var u = !t && (a & 127) === 0 && (a & l.expiredLanes) === 0 || Vu(l, a), e = u ? rm(l, a) : kn(l, a, !0), n = u;
  do {
    if (e === 0) {
      kt && !u && Na(l, a, 0, !1);
      break;
    } else {
      if (t = l.current.alternate, n && !Fm(t)) {
        e = kn(l, a, !1), n = !1;
        continue;
      }
      if (e === 2) {
        if (n = a, l.errorRecoveryDisabledLanes & n)
          var f = 0;
        else
          f = l.pendingLanes & -536870913, f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
        if (f !== 0) {
          a = f;
          l: {
            var c = l;
            e = Mu;
            var i = c.current.memoizedState.isDehydrated;
            if (i && (xt(c, f).flags |= 256), f = kn(
              c,
              f,
              !1
            ), f !== 2) {
              if (pc && !i) {
                c.errorRecoveryDisabledLanes |= n, at |= n, e = 4;
                break l;
              }
              n = Al, Al = e, n !== null && (Al === null ? Al = n : Al.push.apply(
                Al,
                n
              ));
            }
            e = f;
          }
          if (n = !1, e !== 2) continue;
        }
      }
      if (e === 1) {
        xt(l, 0), Na(l, a, 0, !0);
        break;
      }
      l: {
        switch (u = l, n = e, n) {
          case 0:
          case 1:
            throw Error(s(345));
          case 4:
            if ((a & 4194048) !== a) break;
          case 6:
            Na(
              u,
              a,
              ol,
              !Ha
            );
            break l;
          case 2:
            Al = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(s(329));
        }
        if ((a & 62914560) === a && (e = bn + 300 - Hl(), 10 < e)) {
          if (Na(
            u,
            a,
            ol,
            !Ha
          ), en(u, 0, !0) !== 0) break l;
          ma = a, u.timeoutHandle = Iv(
            ki.bind(
              null,
              u,
              t,
              Al,
              we,
              Vf,
              a,
              ol,
              at,
              pt,
              Ha,
              n,
              "Throttled",
              -0,
              0
            ),
            e
          );
          break l;
        }
        ki(
          u,
          t,
          Al,
          we,
          Vf,
          a,
          ol,
          at,
          pt,
          Ha,
          n,
          null,
          -0,
          0
        );
      }
    }
    break;
  } while (!0);
  Il(l);
}
function ki(l, a, t, u, e, n, f, c, i, h, g, b, m, S) {
  if (l.timeoutHandle = -1, b = a.subtreeFlags, b & 8192 || (b & 16785408) === 16785408) {
    b = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: ca
    }, Ov(
      a,
      n,
      b
    );
    var A = (n & 62914560) === n ? bn - Hl() : (n & 4194048) === n ? _v - Hl() : 0;
    if (A = Qh(
      b,
      A
    ), A !== null) {
      ma = n, l.cancelPendingCommit = A(
        Ii.bind(
          null,
          l,
          a,
          n,
          t,
          u,
          e,
          f,
          c,
          i,
          g,
          b,
          null,
          m,
          S
        )
      ), Na(l, n, f, !h);
      return;
    }
  }
  Ii(
    l,
    a,
    n,
    t,
    u,
    e,
    f,
    c,
    i
  );
}
function Fm(l) {
  for (var a = l; ; ) {
    var t = a.tag;
    if ((t === 0 || t === 11 || t === 15) && a.flags & 16384 && (t = a.updateQueue, t !== null && (t = t.stores, t !== null)))
      for (var u = 0; u < t.length; u++) {
        var e = t[u], n = e.getSnapshot;
        e = e.value;
        try {
          if (!ql(n(), e)) return !1;
        } catch {
          return !1;
        }
      }
    if (t = a.child, a.subtreeFlags & 16384 && t !== null)
      t.return = a, a = t;
    else {
      if (a === l) break;
      for (; a.sibling === null; ) {
        if (a.return === null || a.return === l) return !0;
        a = a.return;
      }
      a.sibling.return = a.return, a = a.sibling;
    }
  }
  return !0;
}
function Na(l, a, t, u) {
  a &= ~Kc, a &= ~at, l.suspendedLanes |= a, l.pingedLanes &= ~a, u && (l.warmLanes |= a), u = l.expirationTimes;
  for (var e = a; 0 < e; ) {
    var n = 31 - _l(e), f = 1 << n;
    u[n] = -1, e &= ~f;
  }
  t !== 0 && Z0(l, t, a);
}
function zn() {
  return (C & 6) === 0 ? (wu(0), !1) : !0;
}
function xc() {
  if (Y !== null) {
    if (j === 0)
      var l = Y.return;
    else
      l = Y, ia = mt = null, Nc(l), Yt = null, Bu = 0, l = Y;
    for (; l !== null; )
      mv(l.alternate, l), l = l.return;
    Y = null;
  }
}
function xt(l, a) {
  var t = l.timeoutHandle;
  t !== -1 && (l.timeoutHandle = -1, gh(t)), t = l.cancelPendingCommit, t !== null && (l.cancelPendingCommit = null, t()), ma = 0, xc(), x = l, Y = t = va(l.current, null), Q = a, j = 0, Ul = null, Ha = !1, kt = Vu(l, a), pc = !1, pt = ol = Kc = at = Ka = k = 0, Al = Mu = null, Vf = !1, (a & 8) !== 0 && (a |= a & 32);
  var u = l.entangledLanes;
  if (u !== 0)
    for (l = l.entanglements, u &= a; 0 < u; ) {
      var e = 31 - _l(u), n = 1 << e;
      a |= l[e], u &= ~n;
    }
  return ba = a, vn(), t;
}
function Qv(l, a) {
  o = null, D.H = Yu, a === Ft || a === mn ? (a = Ni(), j = 3) : a === Mc ? (a = Ni(), j = 4) : j = a === Cc ? 8 : a !== null && typeof a == "object" && typeof a.then == "function" ? 6 : 1, Ul = a, Y === null && (k = 1, xe(
    l,
    jl(a, l.current)
  ));
}
function Xv() {
  var l = Yl.current;
  return l === null ? !0 : (Q & 4194048) === Q ? pl === null : (Q & 62914560) === Q || (Q & 536870912) !== 0 ? l === pl : !1;
}
function Gv() {
  var l = D.H;
  return D.H = Yu, l === null ? Yu : l;
}
function Zv() {
  var l = D.A;
  return D.A = wm, l;
}
function $e() {
  k = 4, Ha || (Q & 4194048) !== Q && Yl.current !== null || (kt = !0), (Ka & 134217727) === 0 && (at & 134217727) === 0 || x === null || Na(
    x,
    Q,
    ol,
    !1
  );
}
function kn(l, a, t) {
  var u = C;
  C |= 2;
  var e = Gv(), n = Zv();
  (x !== l || Q !== a) && (we = null, xt(l, a)), a = !1;
  var f = k;
  l: do
    try {
      if (j !== 0 && Y !== null) {
        var c = Y, i = Ul;
        switch (j) {
          case 8:
            xc(), f = 6;
            break l;
          case 3:
          case 2:
          case 9:
          case 6:
            Yl.current === null && (a = !0);
            var h = j;
            if (j = 0, Ul = null, Ht(l, c, i, h), t && kt) {
              f = 0;
              break l;
            }
            break;
          default:
            h = j, j = 0, Ul = null, Ht(l, c, i, h);
        }
      }
      km(), f = k;
      break;
    } catch (g) {
      Qv(l, g);
    }
  while (!0);
  return a && l.shellSuspendCounter++, ia = mt = null, C = u, D.H = e, D.A = n, Y === null && (x = null, Q = 0, vn()), f;
}
function km() {
  for (; Y !== null; ) Cv(Y);
}
function rm(l, a) {
  var t = C;
  C |= 2;
  var u = Gv(), e = Zv();
  x !== l || Q !== a ? (we = null, We = Hl() + 500, xt(l, a)) : kt = Vu(
    l,
    a
  );
  l: do
    try {
      if (j !== 0 && Y !== null) {
        a = Y;
        var n = Ul;
        a: switch (j) {
          case 1:
            j = 0, Ul = null, Ht(l, a, n, 1);
            break;
          case 2:
          case 9:
            if (Hi(n)) {
              j = 0, Ul = null, ri(a);
              break;
            }
            a = function() {
              j !== 2 && j !== 9 || x !== l || (j = 7), Il(l);
            }, n.then(a, a);
            break l;
          case 3:
            j = 7;
            break l;
          case 4:
            j = 5;
            break l;
          case 7:
            Hi(n) ? (j = 0, Ul = null, ri(a)) : (j = 0, Ul = null, Ht(l, a, n, 7));
            break;
          case 5:
            var f = null;
            switch (Y.tag) {
              case 26:
                f = Y.memoizedState;
              case 5:
              case 27:
                var c = Y;
                if (f ? uy(f) : c.stateNode.complete) {
                  j = 0, Ul = null;
                  var i = c.sibling;
                  if (i !== null) Y = i;
                  else {
                    var h = c.return;
                    h !== null ? (Y = h, sn(h)) : Y = null;
                  }
                  break a;
                }
            }
            j = 0, Ul = null, Ht(l, a, n, 5);
            break;
          case 6:
            j = 0, Ul = null, Ht(l, a, n, 6);
            break;
          case 8:
            xc(), k = 6;
            break l;
          default:
            throw Error(s(462));
        }
      }
      Im();
      break;
    } catch (g) {
      Qv(l, g);
    }
  while (!0);
  return ia = mt = null, D.H = u, D.A = e, C = t, Y !== null ? 0 : (x = null, Q = 0, vn(), k);
}
function Im() {
  for (; Y !== null && !My(); )
    Cv(Y);
}
function Cv(l) {
  var a = yv(l.alternate, l, ba);
  l.memoizedProps = l.pendingProps, a === null ? sn(l) : Y = a;
}
function ri(l) {
  var a = l, t = a.alternate;
  switch (a.tag) {
    case 15:
    case 0:
      a = Li(
        t,
        a,
        a.pendingProps,
        a.type,
        void 0,
        Q
      );
      break;
    case 11:
      a = Li(
        t,
        a,
        a.pendingProps,
        a.type.render,
        a.ref,
        Q
      );
      break;
    case 5:
      Nc(a);
    default:
      mv(t, a), a = Y = m1(a, ba), a = yv(t, a, ba);
  }
  l.memoizedProps = l.pendingProps, a === null ? sn(l) : Y = a;
}
function Ht(l, a, t, u) {
  ia = mt = null, Nc(a), Yt = null, Bu = 0;
  var e = a.return;
  try {
    if (Vm(
      l,
      e,
      a,
      t,
      Q
    )) {
      k = 1, xe(
        l,
        jl(t, l.current)
      ), Y = null;
      return;
    }
  } catch (n) {
    if (e !== null) throw Y = e, n;
    k = 1, xe(
      l,
      jl(t, l.current)
    ), Y = null;
    return;
  }
  a.flags & 32768 ? (G || u === 1 ? l = !0 : kt || (Q & 536870912) !== 0 ? l = !1 : (Ha = l = !0, (u === 2 || u === 9 || u === 3 || u === 6) && (u = Yl.current, u !== null && u.tag === 13 && (u.flags |= 16384))), Rv(a, l)) : sn(a);
}
function sn(l) {
  var a = l;
  do {
    if ((a.flags & 32768) !== 0) {
      Rv(
        a,
        Ha
      );
      return;
    }
    l = a.return;
    var t = xm(
      a.alternate,
      a,
      ba
    );
    if (t !== null) {
      Y = t;
      return;
    }
    if (a = a.sibling, a !== null) {
      Y = a;
      return;
    }
    Y = a = l;
  } while (a !== null);
  k === 0 && (k = 5);
}
function Rv(l, a) {
  do {
    var t = Lm(l.alternate, l);
    if (t !== null) {
      t.flags &= 32767, Y = t;
      return;
    }
    if (t = l.return, t !== null && (t.flags |= 32768, t.subtreeFlags = 0, t.deletions = null), !a && (l = l.sibling, l !== null)) {
      Y = l;
      return;
    }
    Y = l = t;
  } while (l !== null);
  k = 6, Y = null;
}
function Ii(l, a, t, u, e, n, f, c, i) {
  l.cancelPendingCommit = null;
  do
    An();
  while (el !== 0);
  if ((C & 6) !== 0) throw Error(s(327));
  if (a !== null) {
    if (a === l.current) throw Error(s(177));
    if (n = a.lanes | a.childLanes, n |= Sc, qy(
      l,
      t,
      n,
      f,
      c,
      i
    ), l === x && (Y = x = null, Q = 0), Kt = a, Ga = l, ma = t, pf = n, Kf = e, Bv = u, (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0 ? (l.callbackNode = null, l.callbackPriority = 0, th(Ye, function() {
      return xv(), null;
    })) : (l.callbackNode = null, l.callbackPriority = 0), u = (a.flags & 13878) !== 0, (a.subtreeFlags & 13878) !== 0 || u) {
      u = D.T, D.T = null, e = R.p, R.p = 2, f = C, C |= 4;
      try {
        Jm(l, a, t);
      } finally {
        C = f, R.p = e, D.T = u;
      }
    }
    el = 1, jv(), Vv(), pv();
  }
}
function jv() {
  if (el === 1) {
    el = 0;
    var l = Ga, a = Kt, t = (a.flags & 13878) !== 0;
    if ((a.subtreeFlags & 13878) !== 0 || t) {
      t = D.T, D.T = null;
      var u = R.p;
      R.p = 2;
      var e = C;
      C |= 4;
      try {
        Ev(a, l);
        var n = wf, f = u1(l.containerInfo), c = n.focusedElem, i = n.selectionRange;
        if (f !== c && c && c.ownerDocument && t1(
          c.ownerDocument.documentElement,
          c
        )) {
          if (i !== null && dc(c)) {
            var h = i.start, g = i.end;
            if (g === void 0 && (g = h), "selectionStart" in c)
              c.selectionStart = h, c.selectionEnd = Math.min(
                g,
                c.value.length
              );
            else {
              var b = c.ownerDocument || document, m = b && b.defaultView || window;
              if (m.getSelection) {
                var S = m.getSelection(), A = c.textContent.length, U = Math.min(i.start, A), Z = i.end === void 0 ? U : Math.min(i.end, A);
                !S.extend && U > Z && (f = Z, Z = U, U = f);
                var y = Ti(
                  c,
                  U
                ), v = Ti(
                  c,
                  Z
                );
                if (y && v && (S.rangeCount !== 1 || S.anchorNode !== y.node || S.anchorOffset !== y.offset || S.focusNode !== v.node || S.focusOffset !== v.offset)) {
                  var d = b.createRange();
                  d.setStart(y.node, y.offset), S.removeAllRanges(), U > Z ? (S.addRange(d), S.extend(v.node, v.offset)) : (d.setEnd(v.node, v.offset), S.addRange(d));
                }
              }
            }
          }
          for (b = [], S = c; S = S.parentNode; )
            S.nodeType === 1 && b.push({
              element: S,
              left: S.scrollLeft,
              top: S.scrollTop
            });
          for (typeof c.focus == "function" && c.focus(), c = 0; c < b.length; c++) {
            var z = b[c];
            z.element.scrollLeft = z.left, z.element.scrollTop = z.top;
          }
        }
        tn = !!Wf, wf = Wf = null;
      } finally {
        C = e, R.p = u, D.T = t;
      }
    }
    l.current = a, el = 2;
  }
}
function Vv() {
  if (el === 2) {
    el = 0;
    var l = Ga, a = Kt, t = (a.flags & 8772) !== 0;
    if ((a.subtreeFlags & 8772) !== 0 || t) {
      t = D.T, D.T = null;
      var u = R.p;
      R.p = 2;
      var e = C;
      C |= 4;
      try {
        zv(l, a.alternate, a);
      } finally {
        C = e, R.p = u, D.T = t;
      }
    }
    el = 3;
  }
}
function pv() {
  if (el === 4 || el === 3) {
    el = 0, Ey();
    var l = Ga, a = Kt, t = ma, u = Bv;
    (a.subtreeFlags & 10256) !== 0 || (a.flags & 10256) !== 0 ? el = 5 : (el = 0, Kt = Ga = null, Kv(l, l.pendingLanes));
    var e = l.pendingLanes;
    if (e === 0 && (Xa = null), fc(t), a = a.stateNode, Nl && typeof Nl.onCommitFiberRoot == "function")
      try {
        Nl.onCommitFiberRoot(
          ju,
          a,
          void 0,
          (a.current.flags & 128) === 128
        );
      } catch {
      }
    if (u !== null) {
      a = D.T, e = R.p, R.p = 2, D.T = null;
      try {
        for (var n = l.onRecoverableError, f = 0; f < u.length; f++) {
          var c = u[f];
          n(c.value, {
            componentStack: c.stack
          });
        }
      } finally {
        D.T = a, R.p = e;
      }
    }
    (ma & 3) !== 0 && An(), Il(l), e = l.pendingLanes, (t & 261930) !== 0 && (e & 42) !== 0 ? l === xf ? Eu++ : (Eu = 0, xf = l) : Eu = 0, wu(0);
  }
}
function Kv(l, a) {
  (l.pooledCacheLanes &= a) === 0 && (a = l.pooledCache, a != null && (l.pooledCache = null, Lu(a)));
}
function An() {
  return jv(), Vv(), pv(), xv();
}
function xv() {
  if (el !== 5) return !1;
  var l = Ga, a = pf;
  pf = 0;
  var t = fc(ma), u = D.T, e = R.p;
  try {
    R.p = 32 > t ? 32 : t, D.T = null, t = Kf, Kf = null;
    var n = Ga, f = ma;
    if (el = 0, Kt = Ga = null, ma = 0, (C & 6) !== 0) throw Error(s(331));
    var c = C;
    if (C |= 4, Hv(n.current), Dv(
      n,
      n.current,
      f,
      t
    ), C = c, wu(0, !1), Nl && typeof Nl.onPostCommitFiberRoot == "function")
      try {
        Nl.onPostCommitFiberRoot(ju, n);
      } catch {
      }
    return !0;
  } finally {
    R.p = e, D.T = u, Kv(l, a);
  }
}
function Pi(l, a, t) {
  a = jl(t, a), a = Zf(l.stateNode, a, 2), l = Qa(l, a, 2), l !== null && (pu(l, 2), Il(l));
}
function V(l, a, t) {
  if (l.tag === 3)
    Pi(l, l, t);
  else
    for (; a !== null; ) {
      if (a.tag === 3) {
        Pi(
          a,
          l,
          t
        );
        break;
      } else if (a.tag === 1) {
        var u = a.stateNode;
        if (typeof a.type.getDerivedStateFromError == "function" || typeof u.componentDidCatch == "function" && (Xa === null || !Xa.has(u))) {
          l = jl(t, l), t = ev(2), u = Qa(a, t, 2), u !== null && (nv(
            t,
            u,
            a,
            l
          ), pu(u, 2), Il(u));
          break;
        }
      }
      a = a.return;
    }
}
function rn(l, a, t) {
  var u = l.pingCache;
  if (u === null) {
    u = l.pingCache = new $m();
    var e = /* @__PURE__ */ new Set();
    u.set(a, e);
  } else
    e = u.get(a), e === void 0 && (e = /* @__PURE__ */ new Set(), u.set(a, e));
  e.has(t) || (pc = !0, e.add(t), l = Pm.bind(null, l, a, t), a.then(l, l));
}
function Pm(l, a, t) {
  var u = l.pingCache;
  u !== null && u.delete(a), l.pingedLanes |= l.suspendedLanes & t, l.warmLanes &= ~t, x === l && (Q & t) === t && (k === 4 || k === 3 && (Q & 62914560) === Q && 300 > Hl() - bn ? (C & 2) === 0 && xt(l, 0) : Kc |= t, pt === Q && (pt = 0)), Il(l);
}
function Lv(l, a) {
  a === 0 && (a = G0()), l = yt(l, a), l !== null && (pu(l, a), Il(l));
}
function lh(l) {
  var a = l.memoizedState, t = 0;
  a !== null && (t = a.retryLane), Lv(l, t);
}
function ah(l, a) {
  var t = 0;
  switch (l.tag) {
    case 31:
    case 13:
      var u = l.stateNode, e = l.memoizedState;
      e !== null && (t = e.retryLane);
      break;
    case 19:
      u = l.stateNode;
      break;
    case 22:
      u = l.stateNode._retryCache;
      break;
    default:
      throw Error(s(314));
  }
  u !== null && u.delete(a), Lv(l, t);
}
function th(l, a) {
  return ec(l, a);
}
var Fe = null, gt = null, Lf = !1, ke = !1, In = !1, _a = 0;
function Il(l) {
  l !== gt && l.next === null && (gt === null ? Fe = gt = l : gt = gt.next = l), ke = !0, Lf || (Lf = !0, eh());
}
function wu(l, a) {
  if (!In && ke) {
    In = !0;
    do
      for (var t = !1, u = Fe; u !== null; ) {
        if (l !== 0) {
          var e = u.pendingLanes;
          if (e === 0) var n = 0;
          else {
            var f = u.suspendedLanes, c = u.pingedLanes;
            n = (1 << 31 - _l(42 | l) + 1) - 1, n &= e & ~(f & ~c), n = n & 201326741 ? n & 201326741 | 1 : n ? n | 2 : 0;
          }
          n !== 0 && (t = !0, l0(u, n));
        } else
          n = Q, n = en(
            u,
            u === x ? n : 0,
            u.cancelPendingCommit !== null || u.timeoutHandle !== -1
          ), (n & 3) === 0 || Vu(u, n) || (t = !0, l0(u, n));
        u = u.next;
      }
    while (t);
    In = !1;
  }
}
function uh() {
  Jv();
}
function Jv() {
  ke = Lf = !1;
  var l = 0;
  _a !== 0 && Sh() && (l = _a);
  for (var a = Hl(), t = null, u = Fe; u !== null; ) {
    var e = u.next, n = Wv(u, a);
    n === 0 ? (u.next = null, t === null ? Fe = e : t.next = e, e === null && (gt = t)) : (t = u, (l !== 0 || (n & 3) !== 0) && (ke = !0)), u = e;
  }
  el !== 0 && el !== 5 || wu(l), _a !== 0 && (_a = 0);
}
function Wv(l, a) {
  for (var t = l.suspendedLanes, u = l.pingedLanes, e = l.expirationTimes, n = l.pendingLanes & -62914561; 0 < n; ) {
    var f = 31 - _l(n), c = 1 << f, i = e[f];
    i === -1 ? ((c & t) === 0 || (c & u) !== 0) && (e[f] = By(c, a)) : i <= a && (l.expiredLanes |= c), n &= ~c;
  }
  if (a = x, t = Q, t = en(
    l,
    l === a ? t : 0,
    l.cancelPendingCommit !== null || l.timeoutHandle !== -1
  ), u = l.callbackNode, t === 0 || l === a && (j === 2 || j === 9) || l.cancelPendingCommit !== null)
    return u !== null && u !== null && on(u), l.callbackNode = null, l.callbackPriority = 0;
  if ((t & 3) === 0 || Vu(l, t)) {
    if (a = t & -t, a === l.callbackPriority) return a;
    switch (u !== null && on(u), fc(t)) {
      case 2:
      case 8:
        t = Q0;
        break;
      case 32:
        t = Ye;
        break;
      case 268435456:
        t = X0;
        break;
      default:
        t = Ye;
    }
    return u = wv.bind(null, l), t = ec(t, u), l.callbackPriority = a, l.callbackNode = t, a;
  }
  return u !== null && u !== null && on(u), l.callbackPriority = 2, l.callbackNode = null, 2;
}
function wv(l, a) {
  if (el !== 0 && el !== 5)
    return l.callbackNode = null, l.callbackPriority = 0, null;
  var t = l.callbackNode;
  if (An() && l.callbackNode !== t)
    return null;
  var u = Q;
  return u = en(
    l,
    l === x ? u : 0,
    l.cancelPendingCommit !== null || l.timeoutHandle !== -1
  ), u === 0 ? null : (Yv(l, u, a), Wv(l, Hl()), l.callbackNode != null && l.callbackNode === t ? wv.bind(null, l) : null);
}
function l0(l, a) {
  if (An()) return null;
  Yv(l, a, !0);
}
function eh() {
  bh(function() {
    (C & 6) !== 0 ? ec(
      Y0,
      uh
    ) : Jv();
  });
}
function Lc() {
  if (_a === 0) {
    var l = Rt;
    l === 0 && (l = le, le <<= 1, (le & 261888) === 0 && (le = 256)), _a = l;
  }
  return _a;
}
function a0(l) {
  return l == null || typeof l == "symbol" || typeof l == "boolean" ? null : typeof l == "function" ? l : ge("" + l);
}
function t0(l, a) {
  var t = a.ownerDocument.createElement("input");
  return t.name = a.name, t.value = a.value, l.id && t.setAttribute("form", l.id), a.parentNode.insertBefore(t, a), l = new FormData(l), t.parentNode.removeChild(t), l;
}
function nh(l, a, t, u, e) {
  if (a === "submit" && t && t.stateNode === e) {
    var n = a0(
      (e[Ml] || null).action
    ), f = u.submitter;
    f && (a = (a = f[Ml] || null) ? a0(a.formAction) : f.getAttribute("formAction"), a !== null && (n = a, f = null));
    var c = new nn(
      "action",
      "action",
      null,
      u,
      e
    );
    l.push({
      event: c,
      listeners: [
        {
          instance: null,
          listener: function() {
            if (u.defaultPrevented) {
              if (_a !== 0) {
                var i = f ? t0(e, f) : new FormData(e);
                Xf(
                  t,
                  {
                    pending: !0,
                    data: i,
                    method: e.method,
                    action: n
                  },
                  null,
                  i
                );
              }
            } else
              typeof n == "function" && (c.preventDefault(), i = f ? t0(e, f) : new FormData(e), Xf(
                t,
                {
                  pending: !0,
                  data: i,
                  method: e.method,
                  action: n
                },
                n,
                i
              ));
          },
          currentTarget: e
        }
      ]
    });
  }
}
for (var Pn = 0; Pn < Ef.length; Pn++) {
  var lf = Ef[Pn], fh = lf.toLowerCase(), ch = lf[0].toUpperCase() + lf.slice(1);
  Wl(
    fh,
    "on" + ch
  );
}
Wl(n1, "onAnimationEnd");
Wl(f1, "onAnimationIteration");
Wl(c1, "onAnimationStart");
Wl("dblclick", "onDoubleClick");
Wl("focusin", "onFocus");
Wl("focusout", "onBlur");
Wl(Um, "onTransitionRun");
Wl(Dm, "onTransitionStart");
Wl(Om, "onTransitionCancel");
Wl(i1, "onTransitionEnd");
Zt("onMouseEnter", ["mouseout", "mouseover"]);
Zt("onMouseLeave", ["mouseout", "mouseover"]);
Zt("onPointerEnter", ["pointerout", "pointerover"]);
Zt("onPointerLeave", ["pointerout", "pointerover"]);
ct(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
ct(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
ct("onBeforeInput", [
  "compositionend",
  "keypress",
  "textInput",
  "paste"
]);
ct(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
ct(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
ct(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Qu = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
  " "
), ih = new Set(
  "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Qu)
);
function $v(l, a) {
  a = (a & 4) !== 0;
  for (var t = 0; t < l.length; t++) {
    var u = l[t], e = u.event;
    u = u.listeners;
    l: {
      var n = void 0;
      if (a)
        for (var f = u.length - 1; 0 <= f; f--) {
          var c = u[f], i = c.instance, h = c.currentTarget;
          if (c = c.listener, i !== n && e.isPropagationStopped())
            break l;
          n = c, e.currentTarget = h;
          try {
            n(e);
          } catch (g) {
            Xe(g);
          }
          e.currentTarget = null, n = i;
        }
      else
        for (f = 0; f < u.length; f++) {
          if (c = u[f], i = c.instance, h = c.currentTarget, c = c.listener, i !== n && e.isPropagationStopped())
            break l;
          n = c, e.currentTarget = h;
          try {
            n(e);
          } catch (g) {
            Xe(g);
          }
          e.currentTarget = null, n = i;
        }
    }
  }
}
function q(l, a) {
  var t = a[Sf];
  t === void 0 && (t = a[Sf] = /* @__PURE__ */ new Set());
  var u = l + "__bubble";
  t.has(u) || (Fv(a, l, 2, !1), t.add(u));
}
function af(l, a, t) {
  var u = 0;
  a && (u |= 4), Fv(
    t,
    l,
    u,
    a
  );
}
var ye = "_reactListening" + Math.random().toString(36).slice(2);
function Jc(l) {
  if (!l[ye]) {
    l[ye] = !0, V0.forEach(function(t) {
      t !== "selectionchange" && (ih.has(t) || af(t, !1, l), af(t, !0, l));
    });
    var a = l.nodeType === 9 ? l : l.ownerDocument;
    a === null || a[ye] || (a[ye] = !0, af("selectionchange", !1, a));
  }
}
function Fv(l, a, t, u) {
  switch (iy(a)) {
    case 2:
      var e = Zh;
      break;
    case 8:
      e = Ch;
      break;
    default:
      e = Fc;
  }
  t = e.bind(
    null,
    a,
    t,
    l
  ), e = void 0, !Af || a !== "touchstart" && a !== "touchmove" && a !== "wheel" || (e = !0), u ? e !== void 0 ? l.addEventListener(a, t, {
    capture: !0,
    passive: e
  }) : l.addEventListener(a, t, !0) : e !== void 0 ? l.addEventListener(a, t, {
    passive: e
  }) : l.addEventListener(a, t, !1);
}
function tf(l, a, t, u, e) {
  var n = u;
  if ((a & 1) === 0 && (a & 2) === 0 && u !== null)
    l: for (; ; ) {
      if (u === null) return;
      var f = u.tag;
      if (f === 3 || f === 4) {
        var c = u.stateNode.containerInfo;
        if (c === e) break;
        if (f === 4)
          for (f = u.return; f !== null; ) {
            var i = f.tag;
            if ((i === 3 || i === 4) && f.stateNode.containerInfo === e)
              return;
            f = f.return;
          }
        for (; c !== null; ) {
          if (f = st(c), f === null) return;
          if (i = f.tag, i === 5 || i === 6 || i === 26 || i === 27) {
            u = n = f;
            continue l;
          }
          c = c.parentNode;
        }
      }
      u = u.return;
    }
  $0(function() {
    var h = n, g = vc(t), b = [];
    l: {
      var m = v1.get(l);
      if (m !== void 0) {
        var S = nn, A = l;
        switch (l) {
          case "keypress":
            if (ze(t) === 0) break l;
          case "keydown":
          case "keyup":
            S = am;
            break;
          case "focusin":
            A = "focus", S = qn;
            break;
          case "focusout":
            A = "blur", S = qn;
            break;
          case "beforeblur":
          case "afterblur":
            S = qn;
            break;
          case "click":
            if (t.button === 2) break l;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            S = yi;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            S = xy;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            S = em;
            break;
          case n1:
          case f1:
          case c1:
            S = Wy;
            break;
          case i1:
            S = fm;
            break;
          case "scroll":
          case "scrollend":
            S = py;
            break;
          case "wheel":
            S = im;
            break;
          case "copy":
          case "cut":
          case "paste":
            S = $y;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            S = hi;
            break;
          case "toggle":
          case "beforetoggle":
            S = ym;
        }
        var U = (a & 4) !== 0, Z = !U && (l === "scroll" || l === "scrollend"), y = U ? m !== null ? m + "Capture" : null : m;
        U = [];
        for (var v = h, d; v !== null; ) {
          var z = v;
          if (d = z.stateNode, z = z.tag, z !== 5 && z !== 26 && z !== 27 || d === null || y === null || (z = Ou(v, y), z != null && U.push(
            Xu(v, z, d)
          )), Z) break;
          v = v.return;
        }
        0 < U.length && (m = new S(
          m,
          A,
          null,
          t,
          g
        ), b.push({ event: m, listeners: U }));
      }
    }
    if ((a & 7) === 0) {
      l: {
        if (m = l === "mouseover" || l === "pointerover", S = l === "mouseout" || l === "pointerout", m && t !== sf && (A = t.relatedTarget || t.fromElement) && (st(A) || A[Wt]))
          break l;
        if ((S || m) && (m = g.window === g ? g : (m = g.ownerDocument) ? m.defaultView || m.parentWindow : window, S ? (A = t.relatedTarget || t.toElement, S = h, A = A ? st(A) : null, A !== null && (Z = Ru(A), U = A.tag, A !== Z || U !== 5 && U !== 27 && U !== 6) && (A = null)) : (S = null, A = h), S !== A)) {
          if (U = yi, z = "onMouseLeave", y = "onMouseEnter", v = "mouse", (l === "pointerout" || l === "pointerover") && (U = hi, z = "onPointerLeave", y = "onPointerEnter", v = "pointer"), Z = S == null ? m : iu(S), d = A == null ? m : iu(A), m = new U(
            z,
            v + "leave",
            S,
            t,
            g
          ), m.target = Z, m.relatedTarget = d, z = null, st(g) === h && (U = new U(
            y,
            v + "enter",
            A,
            t,
            g
          ), U.target = d, U.relatedTarget = Z, z = U), Z = z, S && A)
            a: {
              for (U = vh, y = S, v = A, d = 0, z = y; z; z = U(z))
                d++;
              z = 0;
              for (var E = v; E; E = U(E))
                z++;
              for (; 0 < d - z; )
                y = U(y), d--;
              for (; 0 < z - d; )
                v = U(v), z--;
              for (; d--; ) {
                if (y === v || v !== null && y === v.alternate) {
                  U = y;
                  break a;
                }
                y = U(y), v = U(v);
              }
              U = null;
            }
          else U = null;
          S !== null && u0(
            b,
            m,
            S,
            U,
            !1
          ), A !== null && Z !== null && u0(
            b,
            Z,
            A,
            U,
            !0
          );
        }
      }
      l: {
        if (m = h ? iu(h) : window, S = m.nodeName && m.nodeName.toLowerCase(), S === "select" || S === "input" && m.type === "file")
          var H = bi;
        else if (gi(m))
          if (l1)
            H = Tm;
          else {
            H = sm;
            var T = zm;
          }
        else
          S = m.nodeName, !S || S.toLowerCase() !== "input" || m.type !== "checkbox" && m.type !== "radio" ? h && ic(h.elementType) && (H = bi) : H = Am;
        if (H && (H = H(l, h))) {
          P0(
            b,
            H,
            t,
            g
          );
          break l;
        }
        T && T(l, m, h), l === "focusout" && h && m.type === "number" && h.memoizedProps.value != null && zf(m, "number", m.value);
      }
      switch (T = h ? iu(h) : window, l) {
        case "focusin":
          (gi(T) || T.contentEditable === "true") && (Mt = T, Tf = h, du = null);
          break;
        case "focusout":
          du = Tf = Mt = null;
          break;
        case "mousedown":
          Mf = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Mf = !1, Mi(b, t, g);
          break;
        case "selectionchange":
          if (Em) break;
        case "keydown":
        case "keyup":
          Mi(b, t, g);
      }
      var O;
      if (hc)
        l: {
          switch (l) {
            case "compositionstart":
              var N = "onCompositionStart";
              break l;
            case "compositionend":
              N = "onCompositionEnd";
              break l;
            case "compositionupdate":
              N = "onCompositionUpdate";
              break l;
          }
          N = void 0;
        }
      else
        Tt ? r0(l, t) && (N = "onCompositionEnd") : l === "keydown" && t.keyCode === 229 && (N = "onCompositionStart");
      N && (k0 && t.locale !== "ko" && (Tt || N !== "onCompositionStart" ? N === "onCompositionEnd" && Tt && (O = F0()) : (oa = g, yc = "value" in oa ? oa.value : oa.textContent, Tt = !0)), T = re(h, N), 0 < T.length && (N = new mi(
        N,
        l,
        null,
        t,
        g
      ), b.push({ event: N, listeners: T }), O ? N.data = O : (O = I0(t), O !== null && (N.data = O)))), (O = hm ? dm(l, t) : Sm(l, t)) && (N = re(h, "onBeforeInput"), 0 < N.length && (T = new mi(
        "onBeforeInput",
        "beforeinput",
        null,
        t,
        g
      ), b.push({
        event: T,
        listeners: N
      }), T.data = O)), nh(
        b,
        l,
        h,
        t,
        g
      );
    }
    $v(b, a);
  });
}
function Xu(l, a, t) {
  return {
    instance: l,
    listener: a,
    currentTarget: t
  };
}
function re(l, a) {
  for (var t = a + "Capture", u = []; l !== null; ) {
    var e = l, n = e.stateNode;
    if (e = e.tag, e !== 5 && e !== 26 && e !== 27 || n === null || (e = Ou(l, t), e != null && u.unshift(
      Xu(l, e, n)
    ), e = Ou(l, a), e != null && u.push(
      Xu(l, e, n)
    )), l.tag === 3) return u;
    l = l.return;
  }
  return [];
}
function vh(l) {
  if (l === null) return null;
  do
    l = l.return;
  while (l && l.tag !== 5 && l.tag !== 27);
  return l || null;
}
function u0(l, a, t, u, e) {
  for (var n = a._reactName, f = []; t !== null && t !== u; ) {
    var c = t, i = c.alternate, h = c.stateNode;
    if (c = c.tag, i !== null && i === u) break;
    c !== 5 && c !== 26 && c !== 27 || h === null || (i = h, e ? (h = Ou(t, n), h != null && f.unshift(
      Xu(t, h, i)
    )) : e || (h = Ou(t, n), h != null && f.push(
      Xu(t, h, i)
    ))), t = t.return;
  }
  f.length !== 0 && l.push({ event: a, listeners: f });
}
var yh = /\r\n?/g, mh = /\u0000|\uFFFD/g;
function e0(l) {
  return (typeof l == "string" ? l : "" + l).replace(yh, `
`).replace(mh, "");
}
function kv(l, a) {
  return a = e0(a), e0(l) === a;
}
function p(l, a, t, u, e, n) {
  switch (t) {
    case "children":
      typeof u == "string" ? a === "body" || a === "textarea" && u === "" || Ct(l, u) : (typeof u == "number" || typeof u == "bigint") && a !== "body" && Ct(l, "" + u);
      break;
    case "className":
      ue(l, "class", u);
      break;
    case "tabIndex":
      ue(l, "tabindex", u);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      ue(l, t, u);
      break;
    case "style":
      w0(l, u, n);
      break;
    case "data":
      if (a !== "object") {
        ue(l, "data", u);
        break;
      }
    case "src":
    case "href":
      if (u === "" && (a !== "a" || t !== "href")) {
        l.removeAttribute(t);
        break;
      }
      if (u == null || typeof u == "function" || typeof u == "symbol" || typeof u == "boolean") {
        l.removeAttribute(t);
        break;
      }
      u = ge("" + u), l.setAttribute(t, u);
      break;
    case "action":
    case "formAction":
      if (typeof u == "function") {
        l.setAttribute(
          t,
          "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
        );
        break;
      } else
        typeof n == "function" && (t === "formAction" ? (a !== "input" && p(l, a, "name", e.name, e, null), p(
          l,
          a,
          "formEncType",
          e.formEncType,
          e,
          null
        ), p(
          l,
          a,
          "formMethod",
          e.formMethod,
          e,
          null
        ), p(
          l,
          a,
          "formTarget",
          e.formTarget,
          e,
          null
        )) : (p(l, a, "encType", e.encType, e, null), p(l, a, "method", e.method, e, null), p(l, a, "target", e.target, e, null)));
      if (u == null || typeof u == "symbol" || typeof u == "boolean") {
        l.removeAttribute(t);
        break;
      }
      u = ge("" + u), l.setAttribute(t, u);
      break;
    case "onClick":
      u != null && (l.onclick = ca);
      break;
    case "onScroll":
      u != null && q("scroll", l);
      break;
    case "onScrollEnd":
      u != null && q("scrollend", l);
      break;
    case "dangerouslySetInnerHTML":
      if (u != null) {
        if (typeof u != "object" || !("__html" in u))
          throw Error(s(61));
        if (t = u.__html, t != null) {
          if (e.children != null) throw Error(s(60));
          l.innerHTML = t;
        }
      }
      break;
    case "multiple":
      l.multiple = u && typeof u != "function" && typeof u != "symbol";
      break;
    case "muted":
      l.muted = u && typeof u != "function" && typeof u != "symbol";
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "ref":
      break;
    case "autoFocus":
      break;
    case "xlinkHref":
      if (u == null || typeof u == "function" || typeof u == "boolean" || typeof u == "symbol") {
        l.removeAttribute("xlink:href");
        break;
      }
      t = ge("" + u), l.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        t
      );
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      u != null && typeof u != "function" && typeof u != "symbol" ? l.setAttribute(t, "" + u) : l.removeAttribute(t);
      break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      u && typeof u != "function" && typeof u != "symbol" ? l.setAttribute(t, "") : l.removeAttribute(t);
      break;
    case "capture":
    case "download":
      u === !0 ? l.setAttribute(t, "") : u !== !1 && u != null && typeof u != "function" && typeof u != "symbol" ? l.setAttribute(t, u) : l.removeAttribute(t);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      u != null && typeof u != "function" && typeof u != "symbol" && !isNaN(u) && 1 <= u ? l.setAttribute(t, u) : l.removeAttribute(t);
      break;
    case "rowSpan":
    case "start":
      u == null || typeof u == "function" || typeof u == "symbol" || isNaN(u) ? l.removeAttribute(t) : l.setAttribute(t, u);
      break;
    case "popover":
      q("beforetoggle", l), q("toggle", l), Se(l, "popover", u);
      break;
    case "xlinkActuate":
      Pl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:actuate",
        u
      );
      break;
    case "xlinkArcrole":
      Pl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:arcrole",
        u
      );
      break;
    case "xlinkRole":
      Pl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:role",
        u
      );
      break;
    case "xlinkShow":
      Pl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:show",
        u
      );
      break;
    case "xlinkTitle":
      Pl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:title",
        u
      );
      break;
    case "xlinkType":
      Pl(
        l,
        "http://www.w3.org/1999/xlink",
        "xlink:type",
        u
      );
      break;
    case "xmlBase":
      Pl(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:base",
        u
      );
      break;
    case "xmlLang":
      Pl(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:lang",
        u
      );
      break;
    case "xmlSpace":
      Pl(
        l,
        "http://www.w3.org/XML/1998/namespace",
        "xml:space",
        u
      );
      break;
    case "is":
      Se(l, "is", u);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      (!(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (t = jy.get(t) || t, Se(l, t, u));
  }
}
function Jf(l, a, t, u, e, n) {
  switch (t) {
    case "style":
      w0(l, u, n);
      break;
    case "dangerouslySetInnerHTML":
      if (u != null) {
        if (typeof u != "object" || !("__html" in u))
          throw Error(s(61));
        if (t = u.__html, t != null) {
          if (e.children != null) throw Error(s(60));
          l.innerHTML = t;
        }
      }
      break;
    case "children":
      typeof u == "string" ? Ct(l, u) : (typeof u == "number" || typeof u == "bigint") && Ct(l, "" + u);
      break;
    case "onScroll":
      u != null && q("scroll", l);
      break;
    case "onScrollEnd":
      u != null && q("scrollend", l);
      break;
    case "onClick":
      u != null && (l.onclick = ca);
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "innerHTML":
    case "ref":
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      if (!p0.hasOwnProperty(t))
        l: {
          if (t[0] === "o" && t[1] === "n" && (e = t.endsWith("Capture"), a = t.slice(2, e ? t.length - 7 : void 0), n = l[Ml] || null, n = n != null ? n[t] : null, typeof n == "function" && l.removeEventListener(a, n, e), typeof u == "function")) {
            typeof n != "function" && n !== null && (t in l ? l[t] = null : l.hasAttribute(t) && l.removeAttribute(t)), l.addEventListener(a, u, e);
            break l;
          }
          t in l ? l[t] = u : u === !0 ? l.setAttribute(t, "") : Se(l, t, u);
        }
  }
}
function Sl(l, a, t) {
  switch (a) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "img":
      q("error", l), q("load", l);
      var u = !1, e = !1, n;
      for (n in t)
        if (t.hasOwnProperty(n)) {
          var f = t[n];
          if (f != null)
            switch (n) {
              case "src":
                u = !0;
                break;
              case "srcSet":
                e = !0;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(s(137, a));
              default:
                p(l, a, n, f, t, null);
            }
        }
      e && p(l, a, "srcSet", t.srcSet, t, null), u && p(l, a, "src", t.src, t, null);
      return;
    case "input":
      q("invalid", l);
      var c = n = f = e = null, i = null, h = null;
      for (u in t)
        if (t.hasOwnProperty(u)) {
          var g = t[u];
          if (g != null)
            switch (u) {
              case "name":
                e = g;
                break;
              case "type":
                f = g;
                break;
              case "checked":
                i = g;
                break;
              case "defaultChecked":
                h = g;
                break;
              case "value":
                n = g;
                break;
              case "defaultValue":
                c = g;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (g != null)
                  throw Error(s(137, a));
                break;
              default:
                p(l, a, u, g, t, null);
            }
        }
      L0(
        l,
        n,
        c,
        i,
        h,
        f,
        e,
        !1
      );
      return;
    case "select":
      q("invalid", l), u = f = n = null;
      for (e in t)
        if (t.hasOwnProperty(e) && (c = t[e], c != null))
          switch (e) {
            case "value":
              n = c;
              break;
            case "defaultValue":
              f = c;
              break;
            case "multiple":
              u = c;
            default:
              p(l, a, e, c, t, null);
          }
      a = n, t = f, l.multiple = !!u, a != null ? _t(l, !!u, a, !1) : t != null && _t(l, !!u, t, !0);
      return;
    case "textarea":
      q("invalid", l), n = e = u = null;
      for (f in t)
        if (t.hasOwnProperty(f) && (c = t[f], c != null))
          switch (f) {
            case "value":
              u = c;
              break;
            case "defaultValue":
              e = c;
              break;
            case "children":
              n = c;
              break;
            case "dangerouslySetInnerHTML":
              if (c != null) throw Error(s(91));
              break;
            default:
              p(l, a, f, c, t, null);
          }
      W0(l, u, e, n);
      return;
    case "option":
      for (i in t)
        if (t.hasOwnProperty(i) && (u = t[i], u != null))
          switch (i) {
            case "selected":
              l.selected = u && typeof u != "function" && typeof u != "symbol";
              break;
            default:
              p(l, a, i, u, t, null);
          }
      return;
    case "dialog":
      q("beforetoggle", l), q("toggle", l), q("cancel", l), q("close", l);
      break;
    case "iframe":
    case "object":
      q("load", l);
      break;
    case "video":
    case "audio":
      for (u = 0; u < Qu.length; u++)
        q(Qu[u], l);
      break;
    case "image":
      q("error", l), q("load", l);
      break;
    case "details":
      q("toggle", l);
      break;
    case "embed":
    case "source":
    case "link":
      q("error", l), q("load", l);
    case "area":
    case "base":
    case "br":
    case "col":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "track":
    case "wbr":
    case "menuitem":
      for (h in t)
        if (t.hasOwnProperty(h) && (u = t[h], u != null))
          switch (h) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(s(137, a));
            default:
              p(l, a, h, u, t, null);
          }
      return;
    default:
      if (ic(a)) {
        for (g in t)
          t.hasOwnProperty(g) && (u = t[g], u !== void 0 && Jf(
            l,
            a,
            g,
            u,
            t,
            void 0
          ));
        return;
      }
  }
  for (c in t)
    t.hasOwnProperty(c) && (u = t[c], u != null && p(l, a, c, u, t, null));
}
function hh(l, a, t, u) {
  switch (a) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "input":
      var e = null, n = null, f = null, c = null, i = null, h = null, g = null;
      for (S in t) {
        var b = t[S];
        if (t.hasOwnProperty(S) && b != null)
          switch (S) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              i = b;
            default:
              u.hasOwnProperty(S) || p(l, a, S, null, u, b);
          }
      }
      for (var m in u) {
        var S = u[m];
        if (b = t[m], u.hasOwnProperty(m) && (S != null || b != null))
          switch (m) {
            case "type":
              n = S;
              break;
            case "name":
              e = S;
              break;
            case "checked":
              h = S;
              break;
            case "defaultChecked":
              g = S;
              break;
            case "value":
              f = S;
              break;
            case "defaultValue":
              c = S;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (S != null)
                throw Error(s(137, a));
              break;
            default:
              S !== b && p(
                l,
                a,
                m,
                S,
                u,
                b
              );
          }
      }
      bf(
        l,
        f,
        c,
        i,
        h,
        g,
        n,
        e
      );
      return;
    case "select":
      S = f = c = m = null;
      for (n in t)
        if (i = t[n], t.hasOwnProperty(n) && i != null)
          switch (n) {
            case "value":
              break;
            case "multiple":
              S = i;
            default:
              u.hasOwnProperty(n) || p(
                l,
                a,
                n,
                null,
                u,
                i
              );
          }
      for (e in u)
        if (n = u[e], i = t[e], u.hasOwnProperty(e) && (n != null || i != null))
          switch (e) {
            case "value":
              m = n;
              break;
            case "defaultValue":
              c = n;
              break;
            case "multiple":
              f = n;
            default:
              n !== i && p(
                l,
                a,
                e,
                n,
                u,
                i
              );
          }
      a = c, t = f, u = S, m != null ? _t(l, !!t, m, !1) : !!u != !!t && (a != null ? _t(l, !!t, a, !0) : _t(l, !!t, t ? [] : "", !1));
      return;
    case "textarea":
      S = m = null;
      for (c in t)
        if (e = t[c], t.hasOwnProperty(c) && e != null && !u.hasOwnProperty(c))
          switch (c) {
            case "value":
              break;
            case "children":
              break;
            default:
              p(l, a, c, null, u, e);
          }
      for (f in u)
        if (e = u[f], n = t[f], u.hasOwnProperty(f) && (e != null || n != null))
          switch (f) {
            case "value":
              m = e;
              break;
            case "defaultValue":
              S = e;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (e != null) throw Error(s(91));
              break;
            default:
              e !== n && p(l, a, f, e, u, n);
          }
      J0(l, m, S);
      return;
    case "option":
      for (var A in t)
        if (m = t[A], t.hasOwnProperty(A) && m != null && !u.hasOwnProperty(A))
          switch (A) {
            case "selected":
              l.selected = !1;
              break;
            default:
              p(
                l,
                a,
                A,
                null,
                u,
                m
              );
          }
      for (i in u)
        if (m = u[i], S = t[i], u.hasOwnProperty(i) && m !== S && (m != null || S != null))
          switch (i) {
            case "selected":
              l.selected = m && typeof m != "function" && typeof m != "symbol";
              break;
            default:
              p(
                l,
                a,
                i,
                m,
                u,
                S
              );
          }
      return;
    case "img":
    case "link":
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
    case "menuitem":
      for (var U in t)
        m = t[U], t.hasOwnProperty(U) && m != null && !u.hasOwnProperty(U) && p(l, a, U, null, u, m);
      for (h in u)
        if (m = u[h], S = t[h], u.hasOwnProperty(h) && m !== S && (m != null || S != null))
          switch (h) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (m != null)
                throw Error(s(137, a));
              break;
            default:
              p(
                l,
                a,
                h,
                m,
                u,
                S
              );
          }
      return;
    default:
      if (ic(a)) {
        for (var Z in t)
          m = t[Z], t.hasOwnProperty(Z) && m !== void 0 && !u.hasOwnProperty(Z) && Jf(
            l,
            a,
            Z,
            void 0,
            u,
            m
          );
        for (g in u)
          m = u[g], S = t[g], !u.hasOwnProperty(g) || m === S || m === void 0 && S === void 0 || Jf(
            l,
            a,
            g,
            m,
            u,
            S
          );
        return;
      }
  }
  for (var y in t)
    m = t[y], t.hasOwnProperty(y) && m != null && !u.hasOwnProperty(y) && p(l, a, y, null, u, m);
  for (b in u)
    m = u[b], S = t[b], !u.hasOwnProperty(b) || m === S || m == null && S == null || p(l, a, b, m, u, S);
}
function n0(l) {
  switch (l) {
    case "css":
    case "script":
    case "font":
    case "img":
    case "image":
    case "input":
    case "link":
      return !0;
    default:
      return !1;
  }
}
function dh() {
  if (typeof performance.getEntriesByType == "function") {
    for (var l = 0, a = 0, t = performance.getEntriesByType("resource"), u = 0; u < t.length; u++) {
      var e = t[u], n = e.transferSize, f = e.initiatorType, c = e.duration;
      if (n && c && n0(f)) {
        for (f = 0, c = e.responseEnd, u += 1; u < t.length; u++) {
          var i = t[u], h = i.startTime;
          if (h > c) break;
          var g = i.transferSize, b = i.initiatorType;
          g && n0(b) && (i = i.responseEnd, f += g * (i < c ? 1 : (c - h) / (i - h)));
        }
        if (--u, a += 8 * (n + f) / (e.duration / 1e3), l++, 10 < l) break;
      }
    }
    if (0 < l) return a / l / 1e6;
  }
  return navigator.connection && (l = navigator.connection.downlink, typeof l == "number") ? l : 5;
}
var Wf = null, wf = null;
function Ie(l) {
  return l.nodeType === 9 ? l : l.ownerDocument;
}
function f0(l) {
  switch (l) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function rv(l, a) {
  if (l === 0)
    switch (a) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
  return l === 1 && a === "foreignObject" ? 0 : l;
}
function $f(l, a) {
  return l === "textarea" || l === "noscript" || typeof a.children == "string" || typeof a.children == "number" || typeof a.children == "bigint" || typeof a.dangerouslySetInnerHTML == "object" && a.dangerouslySetInnerHTML !== null && a.dangerouslySetInnerHTML.__html != null;
}
var uf = null;
function Sh() {
  var l = window.event;
  return l && l.type === "popstate" ? l === uf ? !1 : (uf = l, !0) : (uf = null, !1);
}
var Iv = typeof setTimeout == "function" ? setTimeout : void 0, gh = typeof clearTimeout == "function" ? clearTimeout : void 0, c0 = typeof Promise == "function" ? Promise : void 0, bh = typeof queueMicrotask == "function" ? queueMicrotask : typeof c0 < "u" ? function(l) {
  return c0.resolve(null).then(l).catch(zh);
} : Iv;
function zh(l) {
  setTimeout(function() {
    throw l;
  });
}
function La(l) {
  return l === "head";
}
function i0(l, a) {
  var t = a, u = 0;
  do {
    var e = t.nextSibling;
    if (l.removeChild(t), e && e.nodeType === 8)
      if (t = e.data, t === "/$" || t === "/&") {
        if (u === 0) {
          l.removeChild(e), Jt(a);
          return;
        }
        u--;
      } else if (t === "$" || t === "$?" || t === "$~" || t === "$!" || t === "&")
        u++;
      else if (t === "html")
        Uu(l.ownerDocument.documentElement);
      else if (t === "head") {
        t = l.ownerDocument.head, Uu(t);
        for (var n = t.firstChild; n; ) {
          var f = n.nextSibling, c = n.nodeName;
          n[Ku] || c === "SCRIPT" || c === "STYLE" || c === "LINK" && n.rel.toLowerCase() === "stylesheet" || t.removeChild(n), n = f;
        }
      } else
        t === "body" && Uu(l.ownerDocument.body);
    t = e;
  } while (t);
  Jt(a);
}
function v0(l, a) {
  var t = l;
  l = 0;
  do {
    var u = t.nextSibling;
    if (t.nodeType === 1 ? a ? (t._stashedDisplay = t.style.display, t.style.display = "none") : (t.style.display = t._stashedDisplay || "", t.getAttribute("style") === "" && t.removeAttribute("style")) : t.nodeType === 3 && (a ? (t._stashedText = t.nodeValue, t.nodeValue = "") : t.nodeValue = t._stashedText || ""), u && u.nodeType === 8)
      if (t = u.data, t === "/$") {
        if (l === 0) break;
        l--;
      } else
        t !== "$" && t !== "$?" && t !== "$~" && t !== "$!" || l++;
    t = u;
  } while (t);
}
function Ff(l) {
  var a = l.firstChild;
  for (a && a.nodeType === 10 && (a = a.nextSibling); a; ) {
    var t = a;
    switch (a = a.nextSibling, t.nodeName) {
      case "HTML":
      case "HEAD":
      case "BODY":
        Ff(t), cc(t);
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if (t.rel.toLowerCase() === "stylesheet") continue;
    }
    l.removeChild(t);
  }
}
function sh(l, a, t, u) {
  for (; l.nodeType === 1; ) {
    var e = t;
    if (l.nodeName.toLowerCase() !== a.toLowerCase()) {
      if (!u && (l.nodeName !== "INPUT" || l.type !== "hidden"))
        break;
    } else if (u) {
      if (!l[Ku])
        switch (a) {
          case "meta":
            if (!l.hasAttribute("itemprop")) break;
            return l;
          case "link":
            if (n = l.getAttribute("rel"), n === "stylesheet" && l.hasAttribute("data-precedence"))
              break;
            if (n !== e.rel || l.getAttribute("href") !== (e.href == null || e.href === "" ? null : e.href) || l.getAttribute("crossorigin") !== (e.crossOrigin == null ? null : e.crossOrigin) || l.getAttribute("title") !== (e.title == null ? null : e.title))
              break;
            return l;
          case "style":
            if (l.hasAttribute("data-precedence")) break;
            return l;
          case "script":
            if (n = l.getAttribute("src"), (n !== (e.src == null ? null : e.src) || l.getAttribute("type") !== (e.type == null ? null : e.type) || l.getAttribute("crossorigin") !== (e.crossOrigin == null ? null : e.crossOrigin)) && n && l.hasAttribute("async") && !l.hasAttribute("itemprop"))
              break;
            return l;
          default:
            return l;
        }
    } else if (a === "input" && l.type === "hidden") {
      var n = e.name == null ? null : "" + e.name;
      if (e.type === "hidden" && l.getAttribute("name") === n)
        return l;
    } else return l;
    if (l = Kl(l.nextSibling), l === null) break;
  }
  return null;
}
function Ah(l, a, t) {
  if (a === "") return null;
  for (; l.nodeType !== 3; )
    if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !t || (l = Kl(l.nextSibling), l === null)) return null;
  return l;
}
function Pv(l, a) {
  for (; l.nodeType !== 8; )
    if ((l.nodeType !== 1 || l.nodeName !== "INPUT" || l.type !== "hidden") && !a || (l = Kl(l.nextSibling), l === null)) return null;
  return l;
}
function kf(l) {
  return l.data === "$?" || l.data === "$~";
}
function rf(l) {
  return l.data === "$!" || l.data === "$?" && l.ownerDocument.readyState !== "loading";
}
function Th(l, a) {
  var t = l.ownerDocument;
  if (l.data === "$~") l._reactRetry = a;
  else if (l.data !== "$?" || t.readyState !== "loading")
    a();
  else {
    var u = function() {
      a(), t.removeEventListener("DOMContentLoaded", u);
    };
    t.addEventListener("DOMContentLoaded", u), l._reactRetry = u;
  }
}
function Kl(l) {
  for (; l != null; l = l.nextSibling) {
    var a = l.nodeType;
    if (a === 1 || a === 3) break;
    if (a === 8) {
      if (a = l.data, a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&" || a === "F!" || a === "F")
        break;
      if (a === "/$" || a === "/&") return null;
    }
  }
  return l;
}
var If = null;
function y0(l) {
  l = l.nextSibling;
  for (var a = 0; l; ) {
    if (l.nodeType === 8) {
      var t = l.data;
      if (t === "/$" || t === "/&") {
        if (a === 0)
          return Kl(l.nextSibling);
        a--;
      } else
        t !== "$" && t !== "$!" && t !== "$?" && t !== "$~" && t !== "&" || a++;
    }
    l = l.nextSibling;
  }
  return null;
}
function m0(l) {
  l = l.previousSibling;
  for (var a = 0; l; ) {
    if (l.nodeType === 8) {
      var t = l.data;
      if (t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&") {
        if (a === 0) return l;
        a--;
      } else t !== "/$" && t !== "/&" || a++;
    }
    l = l.previousSibling;
  }
  return null;
}
function ly(l, a, t) {
  switch (a = Ie(t), l) {
    case "html":
      if (l = a.documentElement, !l) throw Error(s(452));
      return l;
    case "head":
      if (l = a.head, !l) throw Error(s(453));
      return l;
    case "body":
      if (l = a.body, !l) throw Error(s(454));
      return l;
    default:
      throw Error(s(451));
  }
}
function Uu(l) {
  for (var a = l.attributes; a.length; )
    l.removeAttributeNode(a[0]);
  cc(l);
}
var xl = /* @__PURE__ */ new Map(), h0 = /* @__PURE__ */ new Set();
function Pe(l) {
  return typeof l.getRootNode == "function" ? l.getRootNode() : l.nodeType === 9 ? l : l.ownerDocument;
}
var za = R.d;
R.d = {
  f: Mh,
  r: Eh,
  D: Uh,
  C: Dh,
  L: Oh,
  m: oh,
  X: Nh,
  S: Hh,
  M: _h
};
function Mh() {
  var l = za.f(), a = zn();
  return l || a;
}
function Eh(l) {
  var a = wt(l);
  a !== null && a.tag === 5 && a.type === "form" ? w1(a) : za.r(l);
}
var rt = typeof document > "u" ? null : document;
function ay(l, a, t) {
  var u = rt;
  if (u && typeof a == "string" && a) {
    var e = Rl(a);
    e = 'link[rel="' + l + '"][href="' + e + '"]', typeof t == "string" && (e += '[crossorigin="' + t + '"]'), h0.has(e) || (h0.add(e), l = { rel: l, crossOrigin: t, href: a }, u.querySelector(e) === null && (a = u.createElement("link"), Sl(a, "link", l), il(a), u.head.appendChild(a)));
  }
}
function Uh(l) {
  za.D(l), ay("dns-prefetch", l, null);
}
function Dh(l, a) {
  za.C(l, a), ay("preconnect", l, a);
}
function Oh(l, a, t) {
  za.L(l, a, t);
  var u = rt;
  if (u && l && a) {
    var e = 'link[rel="preload"][as="' + Rl(a) + '"]';
    a === "image" && t && t.imageSrcSet ? (e += '[imagesrcset="' + Rl(
      t.imageSrcSet
    ) + '"]', typeof t.imageSizes == "string" && (e += '[imagesizes="' + Rl(
      t.imageSizes
    ) + '"]')) : e += '[href="' + Rl(l) + '"]';
    var n = e;
    switch (a) {
      case "style":
        n = Lt(l);
        break;
      case "script":
        n = It(l);
    }
    xl.has(n) || (l = w(
      {
        rel: "preload",
        href: a === "image" && t && t.imageSrcSet ? void 0 : l,
        as: a
      },
      t
    ), xl.set(n, l), u.querySelector(e) !== null || a === "style" && u.querySelector($u(n)) || a === "script" && u.querySelector(Fu(n)) || (a = u.createElement("link"), Sl(a, "link", l), il(a), u.head.appendChild(a)));
  }
}
function oh(l, a) {
  za.m(l, a);
  var t = rt;
  if (t && l) {
    var u = a && typeof a.as == "string" ? a.as : "script", e = 'link[rel="modulepreload"][as="' + Rl(u) + '"][href="' + Rl(l) + '"]', n = e;
    switch (u) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        n = It(l);
    }
    if (!xl.has(n) && (l = w({ rel: "modulepreload", href: l }, a), xl.set(n, l), t.querySelector(e) === null)) {
      switch (u) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          if (t.querySelector(Fu(n)))
            return;
      }
      u = t.createElement("link"), Sl(u, "link", l), il(u), t.head.appendChild(u);
    }
  }
}
function Hh(l, a, t) {
  za.S(l, a, t);
  var u = rt;
  if (u && l) {
    var e = Nt(u).hoistableStyles, n = Lt(l);
    a = a || "default";
    var f = e.get(n);
    if (!f) {
      var c = { loading: 0, preload: null };
      if (f = u.querySelector(
        $u(n)
      ))
        c.loading = 5;
      else {
        l = w(
          { rel: "stylesheet", href: l, "data-precedence": a },
          t
        ), (t = xl.get(n)) && Wc(l, t);
        var i = f = u.createElement("link");
        il(i), Sl(i, "link", l), i._p = new Promise(function(h, g) {
          i.onload = h, i.onerror = g;
        }), i.addEventListener("load", function() {
          c.loading |= 1;
        }), i.addEventListener("error", function() {
          c.loading |= 2;
        }), c.loading |= 4, Oe(f, a, u);
      }
      f = {
        type: "stylesheet",
        instance: f,
        count: 1,
        state: c
      }, e.set(n, f);
    }
  }
}
function Nh(l, a) {
  za.X(l, a);
  var t = rt;
  if (t && l) {
    var u = Nt(t).hoistableScripts, e = It(l), n = u.get(e);
    n || (n = t.querySelector(Fu(e)), n || (l = w({ src: l, async: !0 }, a), (a = xl.get(e)) && wc(l, a), n = t.createElement("script"), il(n), Sl(n, "link", l), t.head.appendChild(n)), n = {
      type: "script",
      instance: n,
      count: 1,
      state: null
    }, u.set(e, n));
  }
}
function _h(l, a) {
  za.M(l, a);
  var t = rt;
  if (t && l) {
    var u = Nt(t).hoistableScripts, e = It(l), n = u.get(e);
    n || (n = t.querySelector(Fu(e)), n || (l = w({ src: l, async: !0, type: "module" }, a), (a = xl.get(e)) && wc(l, a), n = t.createElement("script"), il(n), Sl(n, "link", l), t.head.appendChild(n)), n = {
      type: "script",
      instance: n,
      count: 1,
      state: null
    }, u.set(e, n));
  }
}
function d0(l, a, t, u) {
  var e = (e = Ba.current) ? Pe(e) : null;
  if (!e) throw Error(s(446));
  switch (l) {
    case "meta":
    case "title":
      return null;
    case "style":
      return typeof t.precedence == "string" && typeof t.href == "string" ? (a = Lt(t.href), t = Nt(
        e
      ).hoistableStyles, u = t.get(a), u || (u = {
        type: "style",
        instance: null,
        count: 0,
        state: null
      }, t.set(a, u)), u) : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if (t.rel === "stylesheet" && typeof t.href == "string" && typeof t.precedence == "string") {
        l = Lt(t.href);
        var n = Nt(
          e
        ).hoistableStyles, f = n.get(l);
        if (f || (e = e.ownerDocument || e, f = {
          type: "stylesheet",
          instance: null,
          count: 0,
          state: { loading: 0, preload: null }
        }, n.set(l, f), (n = e.querySelector(
          $u(l)
        )) && !n._p && (f.instance = n, f.state.loading = 5), xl.has(l) || (t = {
          rel: "preload",
          as: "style",
          href: t.href,
          crossOrigin: t.crossOrigin,
          integrity: t.integrity,
          media: t.media,
          hrefLang: t.hrefLang,
          referrerPolicy: t.referrerPolicy
        }, xl.set(l, t), n || Bh(
          e,
          l,
          t,
          f.state
        ))), a && u === null)
          throw Error(s(528, ""));
        return f;
      }
      if (a && u !== null)
        throw Error(s(529, ""));
      return null;
    case "script":
      return a = t.async, t = t.src, typeof t == "string" && a && typeof a != "function" && typeof a != "symbol" ? (a = It(t), t = Nt(
        e
      ).hoistableScripts, u = t.get(a), u || (u = {
        type: "script",
        instance: null,
        count: 0,
        state: null
      }, t.set(a, u)), u) : { type: "void", instance: null, count: 0, state: null };
    default:
      throw Error(s(444, l));
  }
}
function Lt(l) {
  return 'href="' + Rl(l) + '"';
}
function $u(l) {
  return 'link[rel="stylesheet"][' + l + "]";
}
function ty(l) {
  return w({}, l, {
    "data-precedence": l.precedence,
    precedence: null
  });
}
function Bh(l, a, t, u) {
  l.querySelector('link[rel="preload"][as="style"][' + a + "]") ? u.loading = 1 : (a = l.createElement("link"), u.preload = a, a.addEventListener("load", function() {
    return u.loading |= 1;
  }), a.addEventListener("error", function() {
    return u.loading |= 2;
  }), Sl(a, "link", t), il(a), l.head.appendChild(a));
}
function It(l) {
  return '[src="' + Rl(l) + '"]';
}
function Fu(l) {
  return "script[async]" + l;
}
function S0(l, a, t) {
  if (a.count++, a.instance === null)
    switch (a.type) {
      case "style":
        var u = l.querySelector(
          'style[data-href~="' + Rl(t.href) + '"]'
        );
        if (u)
          return a.instance = u, il(u), u;
        var e = w({}, t, {
          "data-href": t.href,
          "data-precedence": t.precedence,
          href: null,
          precedence: null
        });
        return u = (l.ownerDocument || l).createElement(
          "style"
        ), il(u), Sl(u, "style", e), Oe(u, t.precedence, l), a.instance = u;
      case "stylesheet":
        e = Lt(t.href);
        var n = l.querySelector(
          $u(e)
        );
        if (n)
          return a.state.loading |= 4, a.instance = n, il(n), n;
        u = ty(t), (e = xl.get(e)) && Wc(u, e), n = (l.ownerDocument || l).createElement("link"), il(n);
        var f = n;
        return f._p = new Promise(function(c, i) {
          f.onload = c, f.onerror = i;
        }), Sl(n, "link", u), a.state.loading |= 4, Oe(n, t.precedence, l), a.instance = n;
      case "script":
        return n = It(t.src), (e = l.querySelector(
          Fu(n)
        )) ? (a.instance = e, il(e), e) : (u = t, (e = xl.get(n)) && (u = w({}, t), wc(u, e)), l = l.ownerDocument || l, e = l.createElement("script"), il(e), Sl(e, "link", u), l.head.appendChild(e), a.instance = e);
      case "void":
        return null;
      default:
        throw Error(s(443, a.type));
    }
  else
    a.type === "stylesheet" && (a.state.loading & 4) === 0 && (u = a.instance, a.state.loading |= 4, Oe(u, t.precedence, l));
  return a.instance;
}
function Oe(l, a, t) {
  for (var u = t.querySelectorAll(
    'link[rel="stylesheet"][data-precedence],style[data-precedence]'
  ), e = u.length ? u[u.length - 1] : null, n = e, f = 0; f < u.length; f++) {
    var c = u[f];
    if (c.dataset.precedence === a) n = c;
    else if (n !== e) break;
  }
  n ? n.parentNode.insertBefore(l, n.nextSibling) : (a = t.nodeType === 9 ? t.head : t, a.insertBefore(l, a.firstChild));
}
function Wc(l, a) {
  l.crossOrigin == null && (l.crossOrigin = a.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = a.referrerPolicy), l.title == null && (l.title = a.title);
}
function wc(l, a) {
  l.crossOrigin == null && (l.crossOrigin = a.crossOrigin), l.referrerPolicy == null && (l.referrerPolicy = a.referrerPolicy), l.integrity == null && (l.integrity = a.integrity);
}
var oe = null;
function g0(l, a, t) {
  if (oe === null) {
    var u = /* @__PURE__ */ new Map(), e = oe = /* @__PURE__ */ new Map();
    e.set(t, u);
  } else
    e = oe, u = e.get(t), u || (u = /* @__PURE__ */ new Map(), e.set(t, u));
  if (u.has(l)) return u;
  for (u.set(l, null), t = t.getElementsByTagName(l), e = 0; e < t.length; e++) {
    var n = t[e];
    if (!(n[Ku] || n[ml] || l === "link" && n.getAttribute("rel") === "stylesheet") && n.namespaceURI !== "http://www.w3.org/2000/svg") {
      var f = n.getAttribute(a) || "";
      f = l + f;
      var c = u.get(f);
      c ? c.push(n) : u.set(f, [n]);
    }
  }
  return u;
}
function b0(l, a, t) {
  l = l.ownerDocument || l, l.head.insertBefore(
    t,
    a === "title" ? l.querySelector("head > title") : null
  );
}
function qh(l, a, t) {
  if (t === 1 || a.itemProp != null) return !1;
  switch (l) {
    case "meta":
    case "title":
      return !0;
    case "style":
      if (typeof a.precedence != "string" || typeof a.href != "string" || a.href === "")
        break;
      return !0;
    case "link":
      if (typeof a.rel != "string" || typeof a.href != "string" || a.href === "" || a.onLoad || a.onError)
        break;
      switch (a.rel) {
        case "stylesheet":
          return l = a.disabled, typeof a.precedence == "string" && l == null;
        default:
          return !0;
      }
    case "script":
      if (a.async && typeof a.async != "function" && typeof a.async != "symbol" && !a.onLoad && !a.onError && a.src && typeof a.src == "string")
        return !0;
  }
  return !1;
}
function uy(l) {
  return !(l.type === "stylesheet" && (l.state.loading & 3) === 0);
}
function Yh(l, a, t, u) {
  if (t.type === "stylesheet" && (typeof u.media != "string" || matchMedia(u.media).matches !== !1) && (t.state.loading & 4) === 0) {
    if (t.instance === null) {
      var e = Lt(u.href), n = a.querySelector(
        $u(e)
      );
      if (n) {
        a = n._p, a !== null && typeof a == "object" && typeof a.then == "function" && (l.count++, l = ln.bind(l), a.then(l, l)), t.state.loading |= 4, t.instance = n, il(n);
        return;
      }
      n = a.ownerDocument || a, u = ty(u), (e = xl.get(e)) && Wc(u, e), n = n.createElement("link"), il(n);
      var f = n;
      f._p = new Promise(function(c, i) {
        f.onload = c, f.onerror = i;
      }), Sl(n, "link", u), t.instance = n;
    }
    l.stylesheets === null && (l.stylesheets = /* @__PURE__ */ new Map()), l.stylesheets.set(t, a), (a = t.state.preload) && (t.state.loading & 3) === 0 && (l.count++, t = ln.bind(l), a.addEventListener("load", t), a.addEventListener("error", t));
  }
}
var ef = 0;
function Qh(l, a) {
  return l.stylesheets && l.count === 0 && He(l, l.stylesheets), 0 < l.count || 0 < l.imgCount ? function(t) {
    var u = setTimeout(function() {
      if (l.stylesheets && He(l, l.stylesheets), l.unsuspend) {
        var n = l.unsuspend;
        l.unsuspend = null, n();
      }
    }, 6e4 + a);
    0 < l.imgBytes && ef === 0 && (ef = 62500 * dh());
    var e = setTimeout(
      function() {
        if (l.waitingForImages = !1, l.count === 0 && (l.stylesheets && He(l, l.stylesheets), l.unsuspend)) {
          var n = l.unsuspend;
          l.unsuspend = null, n();
        }
      },
      (l.imgBytes > ef ? 50 : 800) + a
    );
    return l.unsuspend = t, function() {
      l.unsuspend = null, clearTimeout(u), clearTimeout(e);
    };
  } : null;
}
function ln() {
  if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
    if (this.stylesheets) He(this, this.stylesheets);
    else if (this.unsuspend) {
      var l = this.unsuspend;
      this.unsuspend = null, l();
    }
  }
}
var an = null;
function He(l, a) {
  l.stylesheets = null, l.unsuspend !== null && (l.count++, an = /* @__PURE__ */ new Map(), a.forEach(Xh, l), an = null, ln.call(l));
}
function Xh(l, a) {
  if (!(a.state.loading & 4)) {
    var t = an.get(l);
    if (t) var u = t.get(null);
    else {
      t = /* @__PURE__ */ new Map(), an.set(l, t);
      for (var e = l.querySelectorAll(
        "link[data-precedence],style[data-precedence]"
      ), n = 0; n < e.length; n++) {
        var f = e[n];
        (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (t.set(f.dataset.precedence, f), u = f);
      }
      u && t.set(null, u);
    }
    e = a.instance, f = e.getAttribute("data-precedence"), n = t.get(f) || u, n === u && t.set(null, e), t.set(f, e), this.count++, u = ln.bind(this), e.addEventListener("load", u), e.addEventListener("error", u), n ? n.parentNode.insertBefore(e, n.nextSibling) : (l = l.nodeType === 9 ? l.head : l, l.insertBefore(e, l.firstChild)), a.state.loading |= 4;
  }
}
var Gu = {
  $$typeof: fa,
  Provider: null,
  Consumer: null,
  _currentValue: ra,
  _currentValue2: ra,
  _threadCount: 0
};
function Gh(l, a, t, u, e, n, f, c, i) {
  this.tag = 1, this.containerInfo = l, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Hn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Hn(0), this.hiddenUpdates = Hn(null), this.identifierPrefix = u, this.onUncaughtError = e, this.onCaughtError = n, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = i, this.incompleteTransitions = /* @__PURE__ */ new Map();
}
function ey(l, a, t, u, e, n, f, c, i, h, g, b) {
  return l = new Gh(
    l,
    a,
    t,
    f,
    i,
    h,
    g,
    b,
    c
  ), a = 1, n === !0 && (a |= 24), n = Ol(3, null, null, a), l.current = n, n.stateNode = l, a = Ac(), a.refCount++, l.pooledCache = a, a.refCount++, n.memoizedState = {
    element: u,
    isDehydrated: t,
    cache: a
  }, Ec(n), l;
}
function ny(l) {
  return l ? (l = Dt, l) : Dt;
}
function fy(l, a, t, u, e, n) {
  e = ny(e), u.context === null ? u.context = e : u.pendingContext = e, u = Ya(a), u.payload = { element: t }, n = n === void 0 ? null : n, n !== null && (u.callback = n), t = Qa(l, u, a), t !== null && (Tl(t, l, a), gu(t, l, a));
}
function z0(l, a) {
  if (l = l.memoizedState, l !== null && l.dehydrated !== null) {
    var t = l.retryLane;
    l.retryLane = t !== 0 && t < a ? t : a;
  }
}
function $c(l, a) {
  z0(l, a), (l = l.alternate) && z0(l, a);
}
function cy(l) {
  if (l.tag === 13 || l.tag === 31) {
    var a = yt(l, 67108864);
    a !== null && Tl(a, l, 67108864), $c(l, 67108864);
  }
}
function s0(l) {
  if (l.tag === 13 || l.tag === 31) {
    var a = Bl();
    a = nc(a);
    var t = yt(l, a);
    t !== null && Tl(t, l, a), $c(l, a);
  }
}
var tn = !0;
function Zh(l, a, t, u) {
  var e = D.T;
  D.T = null;
  var n = R.p;
  try {
    R.p = 2, Fc(l, a, t, u);
  } finally {
    R.p = n, D.T = e;
  }
}
function Ch(l, a, t, u) {
  var e = D.T;
  D.T = null;
  var n = R.p;
  try {
    R.p = 8, Fc(l, a, t, u);
  } finally {
    R.p = n, D.T = e;
  }
}
function Fc(l, a, t, u) {
  if (tn) {
    var e = Pf(u);
    if (e === null)
      tf(
        l,
        a,
        u,
        un,
        t
      ), A0(l, u);
    else if (jh(
      e,
      l,
      a,
      t,
      u
    ))
      u.stopPropagation();
    else if (A0(l, u), a & 4 && -1 < Rh.indexOf(l)) {
      for (; e !== null; ) {
        var n = wt(e);
        if (n !== null)
          switch (n.tag) {
            case 3:
              if (n = n.stateNode, n.current.memoizedState.isDehydrated) {
                var f = $a(n.pendingLanes);
                if (f !== 0) {
                  var c = n;
                  for (c.pendingLanes |= 2, c.entangledLanes |= 2; f; ) {
                    var i = 1 << 31 - _l(f);
                    c.entanglements[1] |= i, f &= ~i;
                  }
                  Il(n), (C & 6) === 0 && (We = Hl() + 500, wu(0));
                }
              }
              break;
            case 31:
            case 13:
              c = yt(n, 2), c !== null && Tl(c, n, 2), zn(), $c(n, 2);
          }
        if (n = Pf(u), n === null && tf(
          l,
          a,
          u,
          un,
          t
        ), n === e) break;
        e = n;
      }
      e !== null && u.stopPropagation();
    } else
      tf(
        l,
        a,
        u,
        null,
        t
      );
  }
}
function Pf(l) {
  return l = vc(l), kc(l);
}
var un = null;
function kc(l) {
  if (un = null, l = st(l), l !== null) {
    var a = Ru(l);
    if (a === null) l = null;
    else {
      var t = a.tag;
      if (t === 13) {
        if (l = H0(a), l !== null) return l;
        l = null;
      } else if (t === 31) {
        if (l = N0(a), l !== null) return l;
        l = null;
      } else if (t === 3) {
        if (a.stateNode.current.memoizedState.isDehydrated)
          return a.tag === 3 ? a.stateNode.containerInfo : null;
        l = null;
      } else a !== l && (l = null);
    }
  }
  return un = l, null;
}
function iy(l) {
  switch (l) {
    case "beforetoggle":
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "toggle":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 2;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 8;
    case "message":
      switch (Uy()) {
        case Y0:
          return 2;
        case Q0:
          return 8;
        case Ye:
        case Dy:
          return 32;
        case X0:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var lc = !1, Za = null, Ca = null, Ra = null, Zu = /* @__PURE__ */ new Map(), Cu = /* @__PURE__ */ new Map(), Da = [], Rh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
  " "
);
function A0(l, a) {
  switch (l) {
    case "focusin":
    case "focusout":
      Za = null;
      break;
    case "dragenter":
    case "dragleave":
      Ca = null;
      break;
    case "mouseover":
    case "mouseout":
      Ra = null;
      break;
    case "pointerover":
    case "pointerout":
      Zu.delete(a.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Cu.delete(a.pointerId);
  }
}
function nu(l, a, t, u, e, n) {
  return l === null || l.nativeEvent !== n ? (l = {
    blockedOn: a,
    domEventName: t,
    eventSystemFlags: u,
    nativeEvent: n,
    targetContainers: [e]
  }, a !== null && (a = wt(a), a !== null && cy(a)), l) : (l.eventSystemFlags |= u, a = l.targetContainers, e !== null && a.indexOf(e) === -1 && a.push(e), l);
}
function jh(l, a, t, u, e) {
  switch (a) {
    case "focusin":
      return Za = nu(
        Za,
        l,
        a,
        t,
        u,
        e
      ), !0;
    case "dragenter":
      return Ca = nu(
        Ca,
        l,
        a,
        t,
        u,
        e
      ), !0;
    case "mouseover":
      return Ra = nu(
        Ra,
        l,
        a,
        t,
        u,
        e
      ), !0;
    case "pointerover":
      var n = e.pointerId;
      return Zu.set(
        n,
        nu(
          Zu.get(n) || null,
          l,
          a,
          t,
          u,
          e
        )
      ), !0;
    case "gotpointercapture":
      return n = e.pointerId, Cu.set(
        n,
        nu(
          Cu.get(n) || null,
          l,
          a,
          t,
          u,
          e
        )
      ), !0;
  }
  return !1;
}
function vy(l) {
  var a = st(l.target);
  if (a !== null) {
    var t = Ru(a);
    if (t !== null) {
      if (a = t.tag, a === 13) {
        if (a = H0(t), a !== null) {
          l.blockedOn = a, ui(l.priority, function() {
            s0(t);
          });
          return;
        }
      } else if (a === 31) {
        if (a = N0(t), a !== null) {
          l.blockedOn = a, ui(l.priority, function() {
            s0(t);
          });
          return;
        }
      } else if (a === 3 && t.stateNode.current.memoizedState.isDehydrated) {
        l.blockedOn = t.tag === 3 ? t.stateNode.containerInfo : null;
        return;
      }
    }
  }
  l.blockedOn = null;
}
function Ne(l) {
  if (l.blockedOn !== null) return !1;
  for (var a = l.targetContainers; 0 < a.length; ) {
    var t = Pf(l.nativeEvent);
    if (t === null) {
      t = l.nativeEvent;
      var u = new t.constructor(
        t.type,
        t
      );
      sf = u, t.target.dispatchEvent(u), sf = null;
    } else
      return a = wt(t), a !== null && cy(a), l.blockedOn = t, !1;
    a.shift();
  }
  return !0;
}
function T0(l, a, t) {
  Ne(l) && t.delete(a);
}
function Vh() {
  lc = !1, Za !== null && Ne(Za) && (Za = null), Ca !== null && Ne(Ca) && (Ca = null), Ra !== null && Ne(Ra) && (Ra = null), Zu.forEach(T0), Cu.forEach(T0);
}
function me(l, a) {
  l.blockedOn === a && (l.blockedOn = null, lc || (lc = !0, nl.unstable_scheduleCallback(
    nl.unstable_NormalPriority,
    Vh
  )));
}
var he = null;
function M0(l) {
  he !== l && (he = l, nl.unstable_scheduleCallback(
    nl.unstable_NormalPriority,
    function() {
      he === l && (he = null);
      for (var a = 0; a < l.length; a += 3) {
        var t = l[a], u = l[a + 1], e = l[a + 2];
        if (typeof u != "function") {
          if (kc(u || t) === null)
            continue;
          break;
        }
        var n = wt(t);
        n !== null && (l.splice(a, 3), a -= 3, Xf(
          n,
          {
            pending: !0,
            data: e,
            method: t.method,
            action: u
          },
          u,
          e
        ));
      }
    }
  ));
}
function Jt(l) {
  function a(i) {
    return me(i, l);
  }
  Za !== null && me(Za, l), Ca !== null && me(Ca, l), Ra !== null && me(Ra, l), Zu.forEach(a), Cu.forEach(a);
  for (var t = 0; t < Da.length; t++) {
    var u = Da[t];
    u.blockedOn === l && (u.blockedOn = null);
  }
  for (; 0 < Da.length && (t = Da[0], t.blockedOn === null); )
    vy(t), t.blockedOn === null && Da.shift();
  if (t = (l.ownerDocument || l).$$reactFormReplay, t != null)
    for (u = 0; u < t.length; u += 3) {
      var e = t[u], n = t[u + 1], f = e[Ml] || null;
      if (typeof n == "function")
        f || M0(t);
      else if (f) {
        var c = null;
        if (n && n.hasAttribute("formAction")) {
          if (e = n, f = n[Ml] || null)
            c = f.formAction;
          else if (kc(e) !== null) continue;
        } else c = f.action;
        typeof c == "function" ? t[u + 1] = c : (t.splice(u, 3), u -= 3), M0(t);
      }
    }
}
function yy() {
  function l(n) {
    n.canIntercept && n.info === "react-transition" && n.intercept({
      handler: function() {
        return new Promise(function(f) {
          return e = f;
        });
      },
      focusReset: "manual",
      scroll: "manual"
    });
  }
  function a() {
    e !== null && (e(), e = null), u || setTimeout(t, 20);
  }
  function t() {
    if (!u && !navigation.transition) {
      var n = navigation.currentEntry;
      n && n.url != null && navigation.navigate(n.url, {
        state: n.getState(),
        info: "react-transition",
        history: "replace"
      });
    }
  }
  if (typeof navigation == "object") {
    var u = !1, e = null;
    return navigation.addEventListener("navigate", l), navigation.addEventListener("navigatesuccess", a), navigation.addEventListener("navigateerror", a), setTimeout(t, 100), function() {
      u = !0, navigation.removeEventListener("navigate", l), navigation.removeEventListener("navigatesuccess", a), navigation.removeEventListener("navigateerror", a), e !== null && (e(), e = null);
    };
  }
}
function rc(l) {
  this._internalRoot = l;
}
Tn.prototype.render = rc.prototype.render = function(l) {
  var a = this._internalRoot;
  if (a === null) throw Error(s(409));
  var t = a.current, u = Bl();
  fy(t, u, l, a, null, null);
};
Tn.prototype.unmount = rc.prototype.unmount = function() {
  var l = this._internalRoot;
  if (l !== null) {
    this._internalRoot = null;
    var a = l.containerInfo;
    fy(l.current, 2, null, l, null, null), zn(), a[Wt] = null;
  }
};
function Tn(l) {
  this._internalRoot = l;
}
Tn.prototype.unstable_scheduleHydration = function(l) {
  if (l) {
    var a = j0();
    l = { blockedOn: null, target: l, priority: a };
    for (var t = 0; t < Da.length && a !== 0 && a < Da[t].priority; t++) ;
    Da.splice(t, 0, l), t === 0 && vy(l);
  }
};
var E0 = O0.version;
if (E0 !== "19.2.0")
  throw Error(
    s(
      527,
      E0,
      "19.2.0"
    )
  );
R.findDOMNode = function(l) {
  var a = l._reactInternals;
  if (a === void 0)
    throw typeof l.render == "function" ? Error(s(188)) : (l = Object.keys(l).join(","), Error(s(268, l)));
  return l = by(a), l = l !== null ? _0(l) : null, l = l === null ? null : l.stateNode, l;
};
var ph = {
  bundleType: 0,
  version: "19.2.0",
  rendererPackageName: "react-dom",
  currentDispatcherRef: D,
  reconcilerVersion: "19.2.0"
};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var de = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!de.isDisabled && de.supportsFiber)
    try {
      ju = de.inject(
        ph
      ), Nl = de;
    } catch {
    }
}
var Lh = ac.createRoot = function(l, a) {
  if (!o0(l)) throw Error(s(299));
  var t = !1, u = "", e = av, n = tv, f = uv;
  return a != null && (a.unstable_strictMode === !0 && (t = !0), a.identifierPrefix !== void 0 && (u = a.identifierPrefix), a.onUncaughtError !== void 0 && (e = a.onUncaughtError), a.onCaughtError !== void 0 && (n = a.onCaughtError), a.onRecoverableError !== void 0 && (f = a.onRecoverableError)), a = ey(
    l,
    1,
    !1,
    null,
    null,
    t,
    u,
    null,
    e,
    n,
    f,
    yy
  ), l[Wt] = a.current, Jc(l), new rc(a);
}, Jh = ac.hydrateRoot = function(l, a, t) {
  if (!o0(l)) throw Error(s(299));
  var u = !1, e = "", n = av, f = tv, c = uv, i = null;
  return t != null && (t.unstable_strictMode === !0 && (u = !0), t.identifierPrefix !== void 0 && (e = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (f = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError), t.formState !== void 0 && (i = t.formState)), a = ey(
    l,
    1,
    !0,
    a,
    t ?? null,
    u,
    e,
    i,
    n,
    f,
    c,
    yy
  ), a.context = ny(null), t = a.current, u = Bl(), u = nc(u), e = Ya(u), e.callback = null, Qa(t, e, u), t = u, a.current.lanes = t, pu(a, t), Il(a), l[Wt] = a.current, Jc(l), new Tn(a);
}, Wh = ac.version = "19.2.0";
export {
  Lh as createRoot,
  ac as default,
  Jh as hydrateRoot,
  Wh as version
};
