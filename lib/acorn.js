!(function(e, r) {
    return "object" == typeof exports && "object" == typeof module
      ? r(exports)
      : "function" == typeof define && define.amd
      ? define(["exports"], r)
      : (r(e.acorn || (e.acorn = {})), void 0);
  })(this, function(e) {
    "use strict";
    function r(e) {
      fr = e || {};
      for (var r in mr)
        Object.prototype.hasOwnProperty.call(fr, r) || (fr[r] = mr[r]);
      hr = fr.sourceFile || null;
    }
    function t(e, r) {
      var t = vr(dr, e);
      r += " (" + t.line + ":" + t.column + ")";
      var n = new SyntaxError(r);
      throw ((n.pos = e), (n.loc = t), (n.raisedAt = br), n);
    }
    function n(e) {
      function r(e) {
        if (1 == e.length)
          return (t += "return str === " + JSON.stringify(e[0]) + ";");
        t += "switch(str){";
        for (var r = 0; r < e.length; ++r)
          t += "case " + JSON.stringify(e[r]) + ":";
        t += "return true}return false;";
      }
      e = e.split(" ");
      var t = "",
        n = [];
      e: for (var a = 0; a < e.length; ++a) {
        for (var o = 0; o < n.length; ++o)
          if (n[o][0].length == e[a].length) {
            n[o].push(e[a]);
            continue e;
          }
        n.push([e[a]]);
      }
      if (n.length > 3) {
        n.sort(function(e, r) {
          return r.length - e.length;
        }),
          (t += "switch(str.length){");
        for (var a = 0; a < n.length; ++a) {
          var i = n[a];
          (t += "case " + i[0].length + ":"), r(i);
        }
        t += "}";
      } else r(e);
      return new Function("str", t);
    }
    function a() {
      (this.line = Ar), (this.column = br - Sr);
    }
    function o() {
      (Ar = 1), (br = Sr = 0), (Er = !0), u();
    }
    function i(e, r) {
      (gr = br),
        fr.locations && (kr = new a()),
        (wr = e),
        u(),
        (Cr = r),
        (Er = e.beforeExpr);
    }
    function s() {
      var e = fr.onComment && fr.locations && new a(),
        r = br,
        n = dr.indexOf("*/", (br += 2));
      if (
        (-1 === n && t(br - 2, "Unterminated comment"),
        (br = n + 2),
        fr.locations)
      ) {
        Kt.lastIndex = r;
        for (var o; (o = Kt.exec(dr)) && o.index < br; )
          ++Ar, (Sr = o.index + o[0].length);
      }
      fr.onComment &&
        fr.onComment(!0, dr.slice(r + 2, n), r, br, e, fr.locations && new a());
    }
    function c() {
      for (
        var e = br,
          r = fr.onComment && fr.locations && new a(),
          t = dr.charCodeAt((br += 2));
        pr > br && 10 !== t && 13 !== t && 8232 !== t && 8233 !== t;
  
      )
        ++br, (t = dr.charCodeAt(br));
      fr.onComment &&
        fr.onComment(!1, dr.slice(e + 2, br), e, br, r, fr.locations && new a());
    }
    function u() {
      for (; pr > br; ) {
        var e = dr.charCodeAt(br);
        if (32 === e) ++br;
        else if (13 === e) {
          ++br;
          var r = dr.charCodeAt(br);
          10 === r && ++br, fr.locations && (++Ar, (Sr = br));
        } else if (10 === e || 8232 === e || 8233 === e)
          ++br, fr.locations && (++Ar, (Sr = br));
        else if (e > 8 && 14 > e) ++br;
        else if (47 === e) {
          var r = dr.charCodeAt(br + 1);
          if (42 === r) s();
          else {
            if (47 !== r) break;
            c();
          }
        } else if (160 === e) ++br;
        else {
          if (!(e >= 5760 && Jt.test(String.fromCharCode(e)))) break;
          ++br;
        }
      }
    }
    function l() {
      var e = dr.charCodeAt(br + 1);
      return e >= 48 && 57 >= e ? E(!0) : (++br, i(xt));
    }
    function f() {
      var e = dr.charCodeAt(br + 1);
      return Er ? (++br, k()) : 61 === e ? x(Et, 2) : x(wt, 1);
    }
    function d() {
      var e = dr.charCodeAt(br + 1);
      return 61 === e ? x(Et, 2) : x(Dt, 1);
    }
    function p(e) {
      var r = dr.charCodeAt(br + 1);
      return r === e
        ? x(124 === e ? Lt : Ut, 2)
        : 61 === r
        ? x(Et, 2)
        : x(124 === e ? Rt : Tt, 1);
    }
    function h() {
      var e = dr.charCodeAt(br + 1);
      return 61 === e ? x(Et, 2) : x(Vt, 1);
    }
    function m(e) {
      var r = dr.charCodeAt(br + 1);
      return r === e
        ? 45 == r && 62 == dr.charCodeAt(br + 2) && Gt.test(dr.slice(Lr, br))
          ? ((br += 3), c(), u(), g())
          : x(St, 2)
        : 61 === r
        ? x(Et, 2)
        : x(At, 1);
    }
    function v(e) {
      var r = dr.charCodeAt(br + 1),
        t = 1;
      return r === e
        ? ((t = 62 === e && 62 === dr.charCodeAt(br + 2) ? 3 : 2),
          61 === dr.charCodeAt(br + t) ? x(Et, t + 1) : x(jt, t))
        : 33 == r &&
          60 == e &&
          45 == dr.charCodeAt(br + 2) &&
          45 == dr.charCodeAt(br + 3)
        ? ((br += 4), c(), u(), g())
        : (61 === r && (t = 61 === dr.charCodeAt(br + 2) ? 3 : 2), x(Ot, t));
    }
    function b(e) {
      var r = dr.charCodeAt(br + 1);
      return 61 === r
        ? x(qt, 61 === dr.charCodeAt(br + 2) ? 3 : 2)
        : x(61 === e ? Ct : It, 1);
    }
    function y(e) {
      switch (e) {
        case 46:
          return l();
        case 40:
          return ++br, i(mt);
        case 41:
          return ++br, i(vt);
        case 59:
          return ++br, i(yt);
        case 44:
          return ++br, i(bt);
        case 91:
          return ++br, i(ft);
        case 93:
          return ++br, i(dt);
        case 123:
          return ++br, i(pt);
        case 125:
          return ++br, i(ht);
        case 58:
          return ++br, i(gt);
        case 63:
          return ++br, i(kt);
        case 48:
          var r = dr.charCodeAt(br + 1);
          if (120 === r || 88 === r) return C();
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
          return E(!1);
        case 34:
        case 39:
          return A(e);
        case 47:
          return f(e);
        case 37:
        case 42:
          return d();
        case 124:
        case 38:
          return p(e);
        case 94:
          return h();
        case 43:
        case 45:
          return m(e);
        case 60:
        case 62:
          return v(e);
        case 61:
        case 33:
          return b(e);
        case 126:
          return x(It, 1);
      }
      return !1;
    }
    function g(e) {
      if ((e ? (br = yr + 1) : (yr = br), fr.locations && (xr = new a()), e))
        return k();
      if (br >= pr) return i(Br);
      var r = dr.charCodeAt(br);
      if (Qt(r) || 92 === r) return L();
      var n = y(r);
      if (n === !1) {
        var o = String.fromCharCode(r);
        if ("\\" === o || $t.test(o)) return L();
        t(br, "Unexpected character '" + o + "'");
      }
      return n;
    }
    function x(e, r) {
      var t = dr.slice(br, br + r);
      (br += r), i(e, t);
    }
    function k() {
      for (var e, r, n = "", a = br; ; ) {
        br >= pr && t(a, "Unterminated regular expression");
        var o = dr.charAt(br);
        if ((Gt.test(o) && t(a, "Unterminated regular expression"), e)) e = !1;
        else {
          if ("[" === o) r = !0;
          else if ("]" === o && r) r = !1;
          else if ("/" === o && !r) break;
          e = "\\" === o;
        }
        ++br;
      }
      var n = dr.slice(a, br);
      ++br;
      var s = I();
      return (
        s && !/^[gmsiy]*$/.test(s) && t(a, "Invalid regexp flag"),
        i(jr, new RegExp(n, s))
      );
    }
    function w(e, r) {
      for (var t = br, n = 0, a = 0, o = null == r ? 1 / 0 : r; o > a; ++a) {
        var i,
          s = dr.charCodeAt(br);
        if (
          ((i =
            s >= 97
              ? s - 97 + 10
              : s >= 65
              ? s - 65 + 10
              : s >= 48 && 57 >= s
              ? s - 48
              : 1 / 0),
          i >= e)
        )
          break;
        ++br, (n = n * e + i);
      }
      return br === t || (null != r && br - t !== r) ? null : n;
    }
    function C() {
      br += 2;
      var e = w(16);
      return (
        null == e && t(yr + 2, "Expected hexadecimal number"),
        Qt(dr.charCodeAt(br)) && t(br, "Identifier directly after number"),
        i(Or, e)
      );
    }
    function E(e) {
      var r = br,
        n = !1,
        a = 48 === dr.charCodeAt(br);
      e || null !== w(10) || t(r, "Invalid number"),
        46 === dr.charCodeAt(br) && (++br, w(10), (n = !0));
      var o = dr.charCodeAt(br);
      (69 === o || 101 === o) &&
        ((o = dr.charCodeAt(++br)),
        (43 === o || 45 === o) && ++br,
        null === w(10) && t(r, "Invalid number"),
        (n = !0)),
        Qt(dr.charCodeAt(br)) && t(br, "Identifier directly after number");
      var s,
        c = dr.slice(r, br);
      return (
        n
          ? (s = parseFloat(c))
          : a && 1 !== c.length
          ? /[89]/.test(c) || Tr
            ? t(r, "Invalid number")
            : (s = parseInt(c, 8))
          : (s = parseInt(c, 10)),
        i(Or, s)
      );
    }
    function A(e) {
      br++;
      for (var r = ""; ; ) {
        br >= pr && t(yr, "Unterminated string constant");
        var n = dr.charCodeAt(br);
        if (n === e) return ++br, i(Dr, r);
        if (92 === n) {
          n = dr.charCodeAt(++br);
          var a = /^[0-7]+/.exec(dr.slice(br, br + 3));
          for (a && (a = a[0]); a && parseInt(a, 8) > 255; )
            a = a.slice(0, a.length - 1);
          if (("0" === a && (a = null), ++br, a))
            Tr && t(br - 2, "Octal literal in strict mode"),
              (r += String.fromCharCode(parseInt(a, 8))),
              (br += a.length - 1);
          else
            switch (n) {
              case 110:
                r += "\n";
                break;
              case 114:
                r += "\r";
                break;
              case 120:
                r += String.fromCharCode(S(2));
                break;
              case 117:
                r += String.fromCharCode(S(4));
                break;
              case 85:
                r += String.fromCharCode(S(8));
                break;
              case 116:
                r += "	";
                break;
              case 98:
                r += "\b";
                break;
              case 118:
                r += "";
                break;
              case 102:
                r += "\f";
                break;
              case 48:
                r += "\0";
                break;
              case 13:
                10 === dr.charCodeAt(br) && ++br;
              case 10:
                fr.locations && ((Sr = br), ++Ar);
                break;
              default:
                r += String.fromCharCode(n);
            }
        } else
          (13 === n || 10 === n || 8232 === n || 8233 === n) &&
            t(yr, "Unterminated string constant"),
            (r += String.fromCharCode(n)),
            ++br;
      }
    }
    function S(e) {
      var r = w(16, e);
      return null === r && t(yr, "Bad character escape sequence"), r;
    }
    function I() {
      Bt = !1;
      for (var e, r = !0, n = br; ; ) {
        var a = dr.charCodeAt(br);
        if (Yt(a)) Bt && (e += dr.charAt(br)), ++br;
        else {
          if (92 !== a) break;
          Bt || (e = dr.slice(n, br)),
            (Bt = !0),
            117 != dr.charCodeAt(++br) &&
              t(br, "Expecting Unicode escape sequence \\uXXXX"),
            ++br;
          var o = S(4),
            i = String.fromCharCode(o);
          i || t(br - 1, "Invalid Unicode escape"),
            (r ? Qt(o) : Yt(o)) || t(br - 4, "Invalid Unicode escape"),
            (e += i);
        }
        r = !1;
      }
      return Bt ? e : dr.slice(n, br);
    }
    function L() {
      var e = I(),
        r = Fr;
      return (
        Bt ||
          (Wt(e)
            ? (r = lt[e])
            : ((fr.forbidReserved && (3 === fr.ecmaVersion ? Mt : zt)(e)) ||
                (Tr && Xt(e))) &&
              t(yr, "The keyword '" + e + "' is reserved")),
        i(r, e)
      );
    }
    function U() {
      (Ir = yr), (Lr = gr), (Ur = kr), g();
    }
    function R(e) {
      if (((Tr = e), (br = Lr), fr.locations))
        for (; Sr > br; ) (Sr = dr.lastIndexOf("\n", Sr - 2) + 1), --Ar;
      u(), g();
    }
    function V() {
      (this.type = null), (this.start = yr), (this.end = null);
    }
    function T() {
      (this.start = xr), (this.end = null), null !== hr && (this.source = hr);
    }
    function q() {
      var e = new V();
      return (
        fr.locations && (e.loc = new T()), fr.ranges && (e.range = [yr, 0]), e
      );
    }
    function O(e) {
      var r = new V();
      return (
        (r.start = e.start),
        fr.locations && ((r.loc = new T()), (r.loc.start = e.loc.start)),
        fr.ranges && (r.range = [e.range[0], 0]),
        r
      );
    }
    function j(e, r) {
      return (
        (e.type = r),
        (e.end = Lr),
        fr.locations && (e.loc.end = Ur),
        fr.ranges && (e.range[1] = Lr),
        e
      );
    }
    function D(e) {
      return (
        fr.ecmaVersion >= 5 &&
        "ExpressionStatement" === e.type &&
        "Literal" === e.expression.type &&
        "use strict" === e.expression.value
      );
    }
    function F(e) {
      return wr === e ? (U(), !0) : void 0;
    }
    function B() {
      return (
        !fr.strictSemicolons &&
        (wr === Br || wr === ht || Gt.test(dr.slice(Lr, yr)))
      );
    }
    function M() {
      F(yt) || B() || X();
    }
    function z(e) {
      wr === e ? U() : X();
    }
    function X() {
      t(yr, "Unexpected token");
    }
    function N(e) {
      "Identifier" !== e.type &&
        "MemberExpression" !== e.type &&
        t(e.start, "Assigning to rvalue"),
        Tr &&
          "Identifier" === e.type &&
          Nt(e.name) &&
          t(e.start, "Assigning to " + e.name + " in strict mode");
    }
    function W(e) {
      (Ir = Lr = br),
        fr.locations && (Ur = new a()),
        (Rr = Tr = null),
        (Vr = []),
        g();
      var r = e || q(),
        t = !0;
      for (e || (r.body = []); wr !== Br; ) {
        var n = J();
        r.body.push(n), t && D(n) && R(!0), (t = !1);
      }
      return j(r, "Program");
    }
    function J() {
      (wr === wt || (wr === Et && "/=" == Cr)) && g(!0);
      var e = wr,
        r = q();
      switch (e) {
        case Mr:
        case Nr:
          U();
          var n = e === Mr;
          F(yt) || B()
            ? (r.label = null)
            : wr !== Fr
            ? X()
            : ((r.label = lr()), M());
          for (var a = 0; a < Vr.length; ++a) {
            var o = Vr[a];
            if (null == r.label || o.name === r.label.name) {
              if (null != o.kind && (n || "loop" === o.kind)) break;
              if (r.label && n) break;
            }
          }
          return (
            a === Vr.length && t(r.start, "Unsyntactic " + e.keyword),
            j(r, n ? "BreakStatement" : "ContinueStatement")
          );
        case Wr:
          return U(), M(), j(r, "DebuggerStatement");
        case Pr:
          return (
            U(),
            Vr.push(Zt),
            (r.body = J()),
            Vr.pop(),
            z(tt),
            (r.test = P()),
            M(),
            j(r, "DoWhileStatement")
          );
        case _r:
          if ((U(), Vr.push(Zt), z(mt), wr === yt)) return $(r, null);
          if (wr === rt) {
            var i = q();
            return (
              U(),
              G(i, !0),
              j(i, "VariableDeclaration"),
              1 === i.declarations.length && F(ut) ? _(r, i) : $(r, i)
            );
          }
          var i = K(!1, !0);
          return F(ut) ? (N(i), _(r, i)) : $(r, i);
        case Gr:
          return U(), cr(r, !0);
        case Kr:
          return (
            U(),
            (r.test = P()),
            (r.consequent = J()),
            (r.alternate = F(Hr) ? J() : null),
            j(r, "IfStatement")
          );
        case Qr:
          return (
            Rr || t(yr, "'return' outside of function"),
            U(),
            F(yt) || B() ? (r.argument = null) : ((r.argument = K()), M()),
            j(r, "ReturnStatement")
          );
        case Yr:
          U(), (r.discriminant = P()), (r.cases = []), z(pt), Vr.push(en);
          for (var s, c; wr != ht; )
            if (wr === zr || wr === Jr) {
              var u = wr === zr;
              s && j(s, "SwitchCase"),
                r.cases.push((s = q())),
                (s.consequent = []),
                U(),
                u
                  ? (s.test = K())
                  : (c && t(Ir, "Multiple default clauses"),
                    (c = !0),
                    (s.test = null)),
                z(gt);
            } else s || X(), s.consequent.push(J());
          return s && j(s, "SwitchCase"), U(), Vr.pop(), j(r, "SwitchStatement");
        case Zr:
          return (
            U(),
            Gt.test(dr.slice(Lr, yr)) && t(Lr, "Illegal newline after throw"),
            (r.argument = K()),
            M(),
            j(r, "ThrowStatement")
          );
        case et:
          if ((U(), (r.block = H()), (r.handler = null), wr === Xr)) {
            var l = q();
            U(),
              z(mt),
              (l.param = lr()),
              Tr &&
                Nt(l.param.name) &&
                t(l.param.start, "Binding " + l.param.name + " in strict mode"),
              z(vt),
              (l.guard = null),
              (l.body = H()),
              (r.handler = j(l, "CatchClause"));
          }
          return (
            (r.guardedHandlers = qr),
            (r.finalizer = F($r) ? H() : null),
            r.handler ||
              r.finalizer ||
              t(r.start, "Missing catch or finally clause"),
            j(r, "TryStatement")
          );
        case rt:
          return U(), G(r), M(), j(r, "VariableDeclaration");
        case tt:
          return (
            U(),
            (r.test = P()),
            Vr.push(Zt),
            (r.body = J()),
            Vr.pop(),
            j(r, "WhileStatement")
          );
        case nt:
          return (
            Tr && t(yr, "'with' in strict mode"),
            U(),
            (r.object = P()),
            (r.body = J()),
            j(r, "WithStatement")
          );
        case pt:
          return H();
        case yt:
          return U(), j(r, "EmptyStatement");
        default:
          var f = Cr,
            d = K();
          if (e === Fr && "Identifier" === d.type && F(gt)) {
            for (var a = 0; a < Vr.length; ++a)
              Vr[a].name === f &&
                t(d.start, "Label '" + f + "' is already declared");
            var p = wr.isLoop ? "loop" : wr === Yr ? "switch" : null;
            return (
              Vr.push({ name: f, kind: p }),
              (r.body = J()),
              Vr.pop(),
              (r.label = d),
              j(r, "LabeledStatement")
            );
          }
          return (r.expression = d), M(), j(r, "ExpressionStatement");
      }
    }
    function P() {
      z(mt);
      var e = K();
      return z(vt), e;
    }
    function H(e) {
      var r,
        t = q(),
        n = !0,
        a = !1;
      for (t.body = [], z(pt); !F(ht); ) {
        var o = J();
        t.body.push(o), n && e && D(o) && ((r = a), R((a = !0))), (n = !1);
      }
      return a && !r && R(!1), j(t, "BlockStatement");
    }
    function $(e, r) {
      return (
        (e.init = r),
        z(yt),
        (e.test = wr === yt ? null : K()),
        z(yt),
        (e.update = wr === vt ? null : K()),
        z(vt),
        (e.body = J()),
        Vr.pop(),
        j(e, "ForStatement")
      );
    }
    function _(e, r) {
      return (
        (e.left = r),
        (e.right = K()),
        z(vt),
        (e.body = J()),
        Vr.pop(),
        j(e, "ForInStatement")
      );
    }
    function G(e, r) {
      for (e.declarations = [], e.kind = "var"; ; ) {
        var n = q();
        if (
          ((n.id = lr()),
          Tr &&
            Nt(n.id.name) &&
            t(n.id.start, "Binding " + n.id.name + " in strict mode"),
          (n.init = F(Ct) ? K(!0, r) : null),
          e.declarations.push(j(n, "VariableDeclarator")),
          !F(bt))
        )
          break;
      }
      return e;
    }
    function K(e, r) {
      var t = Q(r);
      if (!e && wr === bt) {
        var n = O(t);
        for (n.expressions = [t]; F(bt); ) n.expressions.push(Q(r));
        return j(n, "SequenceExpression");
      }
      return t;
    }
    function Q(e) {
      var r = Y(e);
      if (wr.isAssign) {
        var t = O(r);
        return (
          (t.operator = Cr),
          (t.left = r),
          U(),
          (t.right = Q(e)),
          N(r),
          j(t, "AssignmentExpression")
        );
      }
      return r;
    }
    function Y(e) {
      var r = Z(e);
      if (F(kt)) {
        var t = O(r);
        return (
          (t.test = r),
          (t.consequent = K(!0)),
          z(gt),
          (t.alternate = K(!0, e)),
          j(t, "ConditionalExpression")
        );
      }
      return r;
    }
    function Z(e) {
      return er(rr(), -1, e);
    }
    function er(e, r, t) {
      var n = wr.binop;
      if (null != n && (!t || wr !== ut) && n > r) {
        var a = O(e);
        (a.left = e), (a.operator = Cr), U(), (a.right = er(rr(), n, t));
        var o = j(
          a,
          /&&|\|\|/.test(a.operator) ? "LogicalExpression" : "BinaryExpression"
        );
        return er(o, r, t);
      }
      return e;
    }
    function rr() {
      if (wr.prefix) {
        var e = q(),
          r = wr.isUpdate;
        return (
          (e.operator = Cr),
          (e.prefix = !0),
          (Er = !0),
          U(),
          (e.argument = rr()),
          r
            ? N(e.argument)
            : Tr &&
              "delete" === e.operator &&
              "Identifier" === e.argument.type &&
              t(e.start, "Deleting local variable in strict mode"),
          j(e, r ? "UpdateExpression" : "UnaryExpression")
        );
      }
      for (var n = tr(); wr.postfix && !B(); ) {
        var e = O(n);
        (e.operator = Cr),
          (e.prefix = !1),
          (e.argument = n),
          N(n),
          U(),
          (n = j(e, "UpdateExpression"));
      }
      return n;
    }
    function tr() {
      return nr(ar());
    }
    function nr(e, r) {
      if (F(xt)) {
        var t = O(e);
        return (
          (t.object = e),
          (t.property = lr(!0)),
          (t.computed = !1),
          nr(j(t, "MemberExpression"), r)
        );
      }
      if (F(ft)) {
        var t = O(e);
        return (
          (t.object = e),
          (t.property = K()),
          (t.computed = !0),
          z(dt),
          nr(j(t, "MemberExpression"), r)
        );
      }
      if (!r && F(mt)) {
        var t = O(e);
        return (
          (t.callee = e),
          (t.arguments = ur(vt, !1)),
          nr(j(t, "CallExpression"), r)
        );
      }
      return e;
    }
    function ar() {
      switch (wr) {
        case ot:
          var e = q();
          return U(), j(e, "ThisExpression");
        case Fr:
          return lr();
        case Or:
        case Dr:
        case jr:
          var e = q();
          return (e.value = Cr), (e.raw = dr.slice(yr, gr)), U(), j(e, "Literal");
        case it:
        case st:
        case ct:
          var e = q();
          return (
            (e.value = wr.atomValue), (e.raw = wr.keyword), U(), j(e, "Literal")
          );
        case mt:
          var r = xr,
            t = yr;
          U();
          var n = K();
          return (
            (n.start = t),
            (n.end = gr),
            fr.locations && ((n.loc.start = r), (n.loc.end = kr)),
            fr.ranges && (n.range = [t, gr]),
            z(vt),
            n
          );
        case ft:
          var e = q();
          return U(), (e.elements = ur(dt, !0, !0)), j(e, "ArrayExpression");
        case pt:
          return ir();
        case Gr:
          var e = q();
          return U(), cr(e, !1);
        case at:
          return or();
        default:
          X();
      }
    }
    function or() {
      var e = q();
      return (
        U(),
        (e.callee = nr(ar(), !0)),
        (e.arguments = F(mt) ? ur(vt, !1) : qr),
        j(e, "NewExpression")
      );
    }
    function ir() {
      var e = q(),
        r = !0,
        n = !1;
      for (e.properties = [], U(); !F(ht); ) {
        if (r) r = !1;
        else if ((z(bt), fr.allowTrailingCommas && F(ht))) break;
        var a,
          o = { key: sr() },
          i = !1;
        if (
          (F(gt)
            ? ((o.value = K(!0)), (a = o.kind = "init"))
            : fr.ecmaVersion >= 5 &&
              "Identifier" === o.key.type &&
              ("get" === o.key.name || "set" === o.key.name)
            ? ((i = n = !0),
              (a = o.kind = o.key.name),
              (o.key = sr()),
              wr !== mt && X(),
              (o.value = cr(q(), !1)))
            : X(),
          "Identifier" === o.key.type && (Tr || n))
        )
          for (var s = 0; s < e.properties.length; ++s) {
            var c = e.properties[s];
            if (c.key.name === o.key.name) {
              var u =
                a == c.kind ||
                (i && "init" === c.kind) ||
                ("init" === a && ("get" === c.kind || "set" === c.kind));
              u && !Tr && "init" === a && "init" === c.kind && (u = !1),
                u && t(o.key.start, "Redefinition of property");
            }
          }
        e.properties.push(o);
      }
      return j(e, "ObjectExpression");
    }
    function sr() {
      return wr === Or || wr === Dr ? ar() : lr(!0);
    }
    function cr(e, r) {
      wr === Fr ? (e.id = lr()) : r ? X() : (e.id = null), (e.params = []);
      var n = !0;
      for (z(mt); !F(vt); ) n ? (n = !1) : z(bt), e.params.push(lr());
      var a = Rr,
        o = Vr;
      if (
        ((Rr = !0),
        (Vr = []),
        (e.body = H(!0)),
        (Rr = a),
        (Vr = o),
        Tr || (e.body.body.length && D(e.body.body[0])))
      )
        for (var i = e.id ? -1 : 0; i < e.params.length; ++i) {
          var s = 0 > i ? e.id : e.params[i];
          if (
            ((Xt(s.name) || Nt(s.name)) &&
              t(s.start, "Defining '" + s.name + "' in strict mode"),
            i >= 0)
          )
            for (var c = 0; i > c; ++c)
              s.name === e.params[c].name &&
                t(s.start, "Argument name clash in strict mode");
        }
      return j(e, r ? "FunctionDeclaration" : "FunctionExpression");
    }
    function ur(e, r, t) {
      for (var n = [], a = !0; !F(e); ) {
        if (a) a = !1;
        else if ((z(bt), r && fr.allowTrailingCommas && F(e))) break;
        t && wr === bt ? n.push(null) : n.push(K(!0));
      }
      return n;
    }
    function lr(e) {
      var r = q();
      return (
        (r.name =
          wr === Fr ? Cr : (e && !fr.forbidReserved && wr.keyword) || X()),
        (Er = !1),
        U(),
        j(r, "Identifier")
      );
    }
    e.version = "0.4.0";
    var fr, dr, pr, hr;
    e.parse = function(e, t) {
      return (dr = String(e)), (pr = dr.length), r(t), o(), W(fr.program);
    };
    var mr = (e.defaultOptions = {
        ecmaVersion: 5,
        strictSemicolons: !1,
        allowTrailingCommas: !0,
        forbidReserved: !1,
        locations: !1,
        onComment: null,
        ranges: !1,
        program: null,
        sourceFile: null
      }),
      vr = (e.getLineInfo = function(e, r) {
        for (var t = 1, n = 0; ; ) {
          Kt.lastIndex = n;
          var a = Kt.exec(e);
          if (!(a && a.index < r)) break;
          ++t, (n = a.index + a[0].length);
        }
        return { line: t, column: r - n };
      });
    e.tokenize = function(e, t) {
      function n(e) {
        return (
          g(e),
          (a.start = yr),
          (a.end = gr),
          (a.startLoc = xr),
          (a.endLoc = kr),
          (a.type = wr),
          (a.value = Cr),
          a
        );
      }
      (dr = String(e)), (pr = dr.length), r(t), o();
      var a = {};
      return (
        (n.jumpTo = function(e, r) {
          if (((br = e), fr.locations)) {
            (Ar = 1), (Sr = Kt.lastIndex = 0);
            for (var t; (t = Kt.exec(dr)) && t.index < e; )
              ++Ar, (Sr = t.index + t[0].length);
          }
          (Er = r), u();
        }),
        n
      );
    };
    var br,
      yr,
      gr,
      xr,
      kr,
      wr,
      Cr,
      Er,
      Ar,
      Sr,
      Ir,
      Lr,
      Ur,
      Rr,
      Vr,
      Tr,
      qr = [],
      Or = { type: "num" },
      jr = { type: "regexp" },
      Dr = { type: "string" },
      Fr = { type: "name" },
      Br = { type: "eof" },
      Mr = { keyword: "break" },
      zr = { keyword: "case", beforeExpr: !0 },
      Xr = { keyword: "catch" },
      Nr = { keyword: "continue" },
      Wr = { keyword: "debugger" },
      Jr = { keyword: "default" },
      Pr = { keyword: "do", isLoop: !0 },
      Hr = { keyword: "else", beforeExpr: !0 },
      $r = { keyword: "finally" },
      _r = { keyword: "for", isLoop: !0 },
      Gr = { keyword: "function" },
      Kr = { keyword: "if" },
      Qr = { keyword: "return", beforeExpr: !0 },
      Yr = { keyword: "switch" },
      Zr = { keyword: "throw", beforeExpr: !0 },
      et = { keyword: "try" },
      rt = { keyword: "var" },
      tt = { keyword: "while", isLoop: !0 },
      nt = { keyword: "with" },
      at = { keyword: "new", beforeExpr: !0 },
      ot = { keyword: "this" },
      it = { keyword: "null", atomValue: null },
      st = { keyword: "true", atomValue: !0 },
      ct = { keyword: "false", atomValue: !1 },
      ut = { keyword: "in", binop: 7, beforeExpr: !0 },
      lt = {
        break: Mr,
        case: zr,
        catch: Xr,
        continue: Nr,
        debugger: Wr,
        default: Jr,
        do: Pr,
        else: Hr,
        finally: $r,
        for: _r,
        function: Gr,
        if: Kr,
        return: Qr,
        switch: Yr,
        throw: Zr,
        try: et,
        var: rt,
        while: tt,
        with: nt,
        null: it,
        true: st,
        false: ct,
        new: at,
        in: ut,
        instanceof: { keyword: "instanceof", binop: 7, beforeExpr: !0 },
        this: ot,
        typeof: { keyword: "typeof", prefix: !0, beforeExpr: !0 },
        void: { keyword: "void", prefix: !0, beforeExpr: !0 },
        delete: { keyword: "delete", prefix: !0, beforeExpr: !0 }
      },
      ft = { type: "[", beforeExpr: !0 },
      dt = { type: "]" },
      pt = { type: "{", beforeExpr: !0 },
      ht = { type: "}" },
      mt = { type: "(", beforeExpr: !0 },
      vt = { type: ")" },
      bt = { type: ",", beforeExpr: !0 },
      yt = { type: ";", beforeExpr: !0 },
      gt = { type: ":", beforeExpr: !0 },
      xt = { type: "." },
      kt = { type: "?", beforeExpr: !0 },
      wt = { binop: 10, beforeExpr: !0 },
      Ct = { isAssign: !0, beforeExpr: !0 },
      Et = { isAssign: !0, beforeExpr: !0 },
      At = { binop: 9, prefix: !0, beforeExpr: !0 },
      St = { postfix: !0, prefix: !0, isUpdate: !0 },
      It = { prefix: !0, beforeExpr: !0 },
      Lt = { binop: 1, beforeExpr: !0 },
      Ut = { binop: 2, beforeExpr: !0 },
      Rt = { binop: 3, beforeExpr: !0 },
      Vt = { binop: 4, beforeExpr: !0 },
      Tt = { binop: 5, beforeExpr: !0 },
      qt = { binop: 6, beforeExpr: !0 },
      Ot = { binop: 7, beforeExpr: !0 },
      jt = { binop: 8, beforeExpr: !0 },
      Dt = { binop: 10, beforeExpr: !0 };
    e.tokTypes = {
      bracketL: ft,
      bracketR: dt,
      braceL: pt,
      braceR: ht,
      parenL: mt,
      parenR: vt,
      comma: bt,
      semi: yt,
      colon: gt,
      dot: xt,
      question: kt,
      slash: wt,
      eq: Ct,
      name: Fr,
      eof: Br,
      num: Or,
      regexp: jr,
      string: Dr
    };
    for (var Ft in lt) e.tokTypes["_" + Ft] = lt[Ft];
    var Bt,
      Mt = n(
        "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile"
      ),
      zt = n("class enum extends super const export import"),
      Xt = n(
        "implements interface let package private protected public static yield"
      ),
      Nt = n("eval arguments"),
      Wt = n(
        "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this"
      ),
      Jt = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/,
      Pt =
        "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc",
      Ht =
        "\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f",
      $t = new RegExp("[" + Pt + "]"),
      _t = new RegExp("[" + Pt + Ht + "]"),
      Gt = /[\n\r\u2028\u2029]/,
      Kt = /\r\n|[\n\r\u2028\u2029]/g,
      Qt = (e.isIdentifierStart = function(e) {
        return 65 > e
          ? 36 === e
          : 91 > e
          ? !0
          : 97 > e
          ? 95 === e
          : 123 > e
          ? !0
          : e >= 170 && $t.test(String.fromCharCode(e));
      }),
      Yt = (e.isIdentifierChar = function(e) {
        return 48 > e
          ? 36 === e
          : 58 > e
          ? !0
          : 65 > e
          ? !1
          : 91 > e
          ? !0
          : 97 > e
          ? 95 === e
          : 123 > e
          ? !0
          : e >= 170 && _t.test(String.fromCharCode(e));
      }),
      Zt = { kind: "loop" },
      en = { kind: "switch" };
  });
  