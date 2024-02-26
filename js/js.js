var _self, Prism, typescript, metaThemeColor;
const menuTrigger = document.querySelector(".menu-trigger"),
menu = document.querySelector(".menu"),
mobileQuery = getComputedStyle(document.body).getPropertyValue(
    "--phoneWidth"
),
isMobile = () => window.matchMedia(mobileQuery).matches,
isMobileMenu = () => {
    menuTrigger && menuTrigger.classList.toggle("hidden", !isMobile()),
    menu && menu.classList.toggle("hidden", isMobile());
};
isMobileMenu(),
menuTrigger &&
    menuTrigger.addEventListener(
    "click",
    () => menu && menu.classList.toggle("hidden")
    ),
window.addEventListener("resize", isMobileMenu),
(_self =
    "undefined" != typeof window
    ? window
    : "undefined" != typeof WorkerGlobalScope &&
        self instanceof WorkerGlobalScope
    ? self
    : {}),
(Prism = (function (b) {
    var e = /\blang(?:uage)?-([\w-]+)\b/i,
    k = 0,
    a = {
        manual: b.Prism && b.Prism.manual,
        disableWorkerMessageHandler:
        b.Prism && b.Prism.disableWorkerMessageHandler,
        util: {
        encode: function b(a) {
            return a instanceof c
            ? new c(a.type, b(a.content), a.alias)
            : Array.isArray(a)
            ? a.map(b)
            : a
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/\u00a0/g, " ");
        },
        type: function (a) {
            return Object.prototype.toString.call(a).slice(8, -1);
        },
        objId: function (a) {
            return (
            a.__id || Object.defineProperty(a, "__id", { value: ++k }), a.__id
            );
        },
        clone: function g(c, b) {
            var d,
            e,
            h = a.util.type(c),
            f;
            switch (((b = b || {}), h)) {
            case "Object":
                if (((e = a.util.objId(c)), b[e])) return b[e];
                for (f in ((d = {}), (b[e] = d), c))
                c.hasOwnProperty(f) && (d[f] = g(c[f], b));
                return d;
            case "Array":
                return (
                (e = a.util.objId(c)),
                b[e]
                    ? b[e]
                    : ((d = []),
                    (b[e] = d),
                    c.forEach(function (a, c) {
                        d[c] = g(a, b);
                    }),
                    d)
                );
            default:
                return c;
            }
        },
        getLanguage: function (a) {
            for (; a && !e.test(a.className); ) a = a.parentElement;
            return a
            ? (a.className.match(e) || [, "none"])[1].toLowerCase()
            : "none";
        },
        currentScript: function () {
            var b, a, c;
            if ("undefined" == typeof document) return null;
            if ("currentScript" in document) return document.currentScript;
            try {
            throw new Error();
            } catch (d) {
            if (
                ((b = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(d.stack) || [])[1]),
                b)
            ) {
                a = document.getElementsByTagName("script");
                for (c in a) if (a[c].src == b) return a[c];
            }
            return null;
            }
        },
        },
        languages: {
        extend: function (e, b) {
            var c = a.util.clone(a.languages[e]),
            d;
            for (d in b) c[d] = b[d];
            return c;
        },
        insertBefore: function (f, i, d, e) {
            var h = (e = e || a.languages)[f],
            c = {},
            b,
            g,
            j;
            for (b in h)
            if (h.hasOwnProperty(b)) {
                if (b == i) for (g in d) d.hasOwnProperty(g) && (c[g] = d[g]);
                d.hasOwnProperty(b) || (c[b] = h[b]);
            }
            return (
            (j = e[f]),
            (e[f] = c),
            a.languages.DFS(a.languages, function (a, b) {
                b === j && a != f && (this[a] = c);
            }),
            c
            );
        },
        DFS: function i(f, g, j, c) {
            var e, d, b, h;
            (c = c || {}), (e = a.util.objId);
            for (d in f)
            f.hasOwnProperty(d) &&
                (g.call(f, d, f[d], j || d),
                (b = f[d]),
                (h = a.util.type(b)),
                "Object" !== h || c[e(b)]
                ? "Array" !== h || c[e(b)] || ((c[e(b)] = !0), i(b, g, d, c))
                : ((c[e(b)] = !0), i(b, g, null, c)));
        },
        },
        plugins: {},
        highlightAll: function (b, c) {
        a.highlightAllUnder(document, b, c);
        },
        highlightAllUnder: function (d, e, f) {
        var b = {
            callback: f,
            container: d,
            selector:
                'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
            },
            c,
            g;
        a.hooks.run("before-highlightall", b),
            (b.elements = Array.prototype.slice.apply(
            b.container.querySelectorAll(b.selector)
            )),
            a.hooks.run("before-all-elements-highlight", b);
        for (c, g = 0; (c = b.elements[g++]); )
            a.highlightElement(c, !0 === e, b.callback);
        },
        highlightElement: function (d, l, f) {
        var g = a.util.getLanguage(d),
            k = a.languages[g],
            h,
            c,
            j;
        (d.className =
            d.className.replace(e, "").replace(/\s+/g, " ") + " language-" + g),
            (h = d.parentNode),
            h &&
            "pre" === h.nodeName.toLowerCase() &&
            (h.className =
                h.className.replace(e, "").replace(/\s+/g, " ") +
                " language-" +
                g),
            (c = { element: d, language: g, grammar: k, code: d.textContent });
        function i(b) {
            (c.highlightedCode = b),
            a.hooks.run("before-insert", c),
            (c.element.innerHTML = c.highlightedCode),
            a.hooks.run("after-highlight", c),
            a.hooks.run("complete", c),
            f && f.call(c.element);
        }
        if ((a.hooks.run("before-sanity-check", c), !c.code))
            return a.hooks.run("complete", c), void (f && f.call(c.element));
        a.hooks.run("before-highlight", c),
            c.grammar
            ? l && b.Worker
                ? ((j = new Worker(a.filename)),
                (j.onmessage = function (a) {
                    i(a.data);
                }),
                j.postMessage(
                    JSON.stringify({
                    language: c.language,
                    code: c.code,
                    immediateClose: !0,
                    })
                ))
                : i(a.highlight(c.code, c.grammar, c.language))
            : i(a.util.encode(c.code));
        },
        highlight: function (d, e, f) {
        var b = { code: d, grammar: e, language: f };
        return (
            a.hooks.run("before-tokenize", b),
            (b.tokens = a.tokenize(b.code, b.grammar)),
            a.hooks.run("after-tokenize", b),
            c.stringify(a.util.encode(b.tokens), b.language)
        );
        },
        tokenize: function (g, d) {
        var e = d.rest,
            h,
            b;
        if (e) {
            for (h in e) d[h] = e[h];
            delete d.rest;
        }
        return (
            (b = new i()),
            f(b, b.head, g),
            (function I(w, h, r, H, G, F, E) {
            var l,
                m,
                n,
                e,
                y,
                A,
                u,
                t,
                D,
                C,
                d,
                i,
                o,
                q,
                b,
                s,
                v,
                g,
                k,
                x,
                z,
                p,
                B;
            for (l in r)
                if (r.hasOwnProperty(l) && r[l]) {
                (m = r[l]), (m = Array.isArray(m) ? m : [m]);
                for (n = 0; n < m.length; ++n) {
                    if (E && E == l + "," + n) return;
                    (e = m[n]),
                    (y = e.inside),
                    (A = !!e.lookbehind),
                    (u = !!e.greedy),
                    (t = 0),
                    (D = e.alias),
                    u &&
                        !e.pattern.global &&
                        ((C = e.pattern.toString().match(/[imsuy]*$/)[0]),
                        (e.pattern = RegExp(e.pattern.source, C + "g"))),
                    (e = e.pattern || e);
                    for (
                    d = H.next, i = G;
                    d !== h.tail;
                    i += d.value.length, d = d.next
                    ) {
                    if (((o = d.value), h.length > w.length)) return;
                    if (!(o instanceof c)) {
                        if (((q = 1), u && d != h.tail.prev)) {
                        if (((e.lastIndex = i), (b = e.exec(w)), !b)) break;
                        (s = b.index + (A && b[1] ? b[1].length : 0)),
                            (v = b.index + b[0].length),
                            (g = i);
                        for (g += d.value.length; g <= s; )
                            (d = d.next), (g += d.value.length);
                        if (
                            ((g -= d.value.length),
                            (i = g),
                            d.value instanceof c)
                        )
                            continue;
                        for (
                            k = d;
                            k !== h.tail &&
                            (g < v ||
                            ("string" == typeof k.value &&
                                !k.prev.value.greedy));
                            k = k.next
                        )
                            q++, (g += k.value.length);
                        q--, (o = w.slice(i, g)), (b.index -= i);
                        } else (e.lastIndex = 0), (b = e.exec(o));
                        if (b) {
                        if (
                            (A && (t = b[1] ? b[1].length : 0),
                            (s = b.index + t),
                            (b = b[0].slice(t)),
                            (v = s + b.length),
                            (x = o.slice(0, s)),
                            (z = o.slice(v)),
                            (p = d.prev),
                            x && ((p = f(h, p, x)), (i += x.length)),
                            j(h, p, q),
                            (B = new c(l, y ? a.tokenize(b, y) : b, D, b, u)),
                            (d = f(h, p, B)),
                            z && f(h, d, z),
                            1 < q && I(w, h, r, d.prev, i, !0, l + "," + n),
                            F)
                        )
                            break;
                        } else if (F) break;
                    }
                    }
                }
                }
            })(g, b, d, b.head, 0),
            (function (b) {
            for (var c = [], a = b.head.next; a !== b.tail; )
                c.push(a.value), (a = a.next);
            return c;
            })(b)
        );
        },
        hooks: {
        all: {},
        add: function (b, d) {
            var c = a.hooks.all;
            (c[b] = c[b] || []), c[b].push(d);
        },
        run: function (d, e) {
            var b = a.hooks.all[d],
            c,
            f;
            if (b && b.length) for (c, f = 0; (c = b[f++]); ) c(e);
        },
        },
        Token: c,
    },
    d,
    h;
    function c(a, b, c, d, e) {
    (this.type = a),
        (this.content = b),
        (this.alias = c),
        (this.length = 0 | (d || "").length),
        (this.greedy = !!e);
    }
    function i() {
    var a = { value: null, prev: null, next: null },
        b = { value: null, prev: a, next: null };
    (a.next = b), (this.head = a), (this.tail = b), (this.length = 0);
    }
    function f(d, a, e) {
    var c = a.next,
        b = { value: e, prev: a, next: c };
    return (a.next = b), (c.prev = b), d.length++, b;
    }
    function j(d, b, e) {
    for (var a = b.next, c = 0; c < e && a !== d.tail; c++) a = a.next;
    ((b.next = a).prev = b), (d.length -= c);
    }
    if (
    ((b.Prism = a),
    (c.stringify = function i(c, f) {
        var g, b, d, e, h;
        if ("string" == typeof c) return c;
        if (Array.isArray(c))
        return (
            (g = ""),
            c.forEach(function (a) {
            g += i(a, f);
            }),
            g
        );
        (b = {
        type: c.type,
        content: i(c.content, f),
        tag: "span",
        classes: ["token", c.type],
        attributes: {},
        language: f,
        }),
        (d = c.alias),
        d &&
            (Array.isArray(d)
            ? Array.prototype.push.apply(b.classes, d)
            : b.classes.push(d)),
        a.hooks.run("wrap", b),
        (e = "");
        for (h in b.attributes)
        e +=
            " " +
            h +
            '="' +
            (b.attributes[h] || "").replace(/"/g, "&quot;") +
            '"';
        return (
        "<" +
        b.tag +
        ' class="' +
        b.classes.join(" ") +
        '"' +
        e +
        ">" +
        b.content +
        "</" +
        b.tag +
        ">"
        );
    }),
    !b.document)
    )
    return (
        b.addEventListener &&
        (a.disableWorkerMessageHandler ||
            b.addEventListener(
            "message",
            function (e) {
                var c = JSON.parse(e.data),
                d = c.language,
                f = c.code,
                g = c.immediateClose;
                b.postMessage(a.highlight(f, a.languages[d], d)),
                g && b.close();
            },
            !1
            )),
        a
    );
    d = a.util.currentScript();
    function g() {
    a.manual || a.highlightAll();
    }
    return (
    d &&
        ((a.filename = d.src),
        d.hasAttribute("data-manual") && (a.manual = !0)),
    !a.manual &&
        ((h = document.readyState),
        "loading" === h || ("interactive" === h && d && d.defer)
        ? document.addEventListener("DOMContentLoaded", g)
        : window.requestAnimationFrame
        ? window.requestAnimationFrame(g)
        : window.setTimeout(g, 16)),
    a
    );
})(_self)),
"undefined" != typeof module && module.exports && (module.exports = Prism),
"undefined" != typeof global && (global.Prism = Prism),
(Prism.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: {
    pattern:
        /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:(?!<!--)[^"'\]]|"[^"]*"|'[^']*'|<!--[\s\S]*?-->)*\]\s*)?>/i,
    greedy: !0,
    },
    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
    tag: {
    pattern:
        /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
    greedy: !0,
    inside: {
        tag: {
        pattern: /^<\/?[^\s>\/]+/i,
        inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
        },
        "attr-value": {
        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
        inside: {
            punctuation: [
            /^=/,
            { pattern: /^(\s*)["']|["']$/, lookbehind: !0 },
            ],
        },
        },
        punctuation: /\/?>/,
        "attr-name": {
        pattern: /[^\s>\/]+/,
        inside: { namespace: /^[^\s>\/:]+:/ },
        },
    },
    },
    entity: /&#?[\da-z]{1,8};/i,
}),
(Prism.languages.markup.tag.inside["attr-value"].inside.entity =
    Prism.languages.markup.entity),
Prism.hooks.add("wrap", function (a) {
    "entity" === a.type &&
    (a.attributes.title = a.content.replace(/&amp;/, "&"));
}),
Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    value: function (c, a) {
    var b = {},
        d,
        e;
    (b["language-" + a] = {
        pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
        lookbehind: !0,
        inside: Prism.languages[a],
    }),
        (b.cdata = /^<!\[CDATA\[|\]\]>$/i),
        (d = {
        "included-cdata": { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: b },
        }),
        (d["language-" + a] = {
        pattern: /[\s\S]+/,
        inside: Prism.languages[a],
        }),
        (e = {}),
        (e[c] = {
        pattern: RegExp(
            "(<__[^]*?>)(?:<!\\[CDATA\\[[^]*?\\]\\]>\\s*|[^])*?(?=</__>)".replace(
            /__/g,
            function () {
                return c;
            }
            ),
            "i"
        ),
        lookbehind: !0,
        greedy: !0,
        inside: d,
        }),
        Prism.languages.insertBefore("markup", "cdata", e);
    },
}),
(Prism.languages.xml = Prism.languages.extend("markup", {})),
(Prism.languages.html = Prism.languages.markup),
(Prism.languages.mathml = Prism.languages.markup),
(Prism.languages.svg = Prism.languages.markup),
!(function (a) {
    var c = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    b;
    (a.languages.css = {
    comment: /\/\*[\s\S]*?\*\//,
    atrule: {
        pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
        inside: {
        rule: /^@[\w-]+/,
        "selector-function-argument": {
            pattern:
            /(\bselector\s*\((?!\s*\))\s*)(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/,
            lookbehind: !0,
            alias: "selector",
        },
        },
    },
    url: {
        pattern: RegExp("url\\((?:" + c.source + "|[^\n\r()]*)\\)", "i"),
        greedy: !0,
        inside: { function: /^url/i, punctuation: /^\(|\)$/ },
    },
    selector: RegExp("[^{}\\s](?:[^{};\"']|" + c.source + ")*?(?=\\s*\\{)"),
    string: { pattern: c, greedy: !0 },
    property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
    important: /!important\b/i,
    function: /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:,]/,
    }),
    (a.languages.css.atrule.inside.rest = a.languages.css),
    (b = a.languages.markup),
    b &&
        (b.tag.addInlined("style", "css"),
        a.languages.insertBefore(
        "inside",
        "attr-value",
        {
            "style-attr": {
            pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
            inside: {
                "attr-name": { pattern: /^\s*style/i, inside: b.tag.inside },
                punctuation: /^\s*=\s*['"]|['"]\s*$/,
                "attr-value": { pattern: /.+/i, inside: a.languages.css },
            },
            alias: "language-css",
            },
        },
        b.tag
        ));
})(Prism),
(Prism.languages.clike = {
    comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
    ],
    string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
    },
    "class-name": {
    pattern:
        /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
    lookbehind: !0,
    inside: { punctuation: /[.\\]/ },
    },
    keyword:
    /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    boolean: /\b(?:true|false)\b/,
    function: /\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/,
}),
(Prism.languages.javascript = Prism.languages.extend("clike", {
    "class-name": [
    Prism.languages.clike["class-name"],
    {
        pattern:
        /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
        lookbehind: !0,
    },
    ],
    keyword: [
    { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
    {
        pattern:
        /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: !0,
    },
    ],
    number:
    /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
    function:
    /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    operator:
    /--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?[.?]?|[~:]/,
})),
(Prism.languages.javascript["class-name"][0].pattern =
    /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
    pattern:
        /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*[\s\S]*?\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
    lookbehind: !0,
    greedy: !0,
    },
    "function-variable": {
    pattern:
        /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
    alias: "function",
    },
    parameter: [
    {
        pattern:
        /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
    },
    {
        pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
        inside: Prism.languages.javascript,
    },
    {
        pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
    },
    {
        pattern:
        /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript,
    },
    ],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
}),
Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
    pattern:
        /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
    greedy: !0,
    inside: {
        "template-punctuation": { pattern: /^`|`$/, alias: "string" },
        interpolation: {
        pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
        lookbehind: !0,
        inside: {
            "interpolation-punctuation": {
            pattern: /^\${|}$/,
            alias: "punctuation",
            },
            rest: Prism.languages.javascript,
        },
        },
        string: /[\s\S]+/,
    },
    },
}),
Prism.languages.markup &&
    Prism.languages.markup.tag.addInlined("script", "javascript"),
(Prism.languages.js = Prism.languages.javascript),
(Prism.languages.abap = {
    comment: /^\*.*/m,
    string: /(`|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
    "string-template": {
    pattern: /([|}])(?:\\.|[^\\|{\r\n])*(?=[|{])/,
    lookbehind: !0,
    alias: "string",
    },
    "eol-comment": { pattern: /(^|\s)".*/m, lookbehind: !0, alias: "comment" },
    keyword: {
    pattern:
        /(\s|\.|^)(?:SCIENTIFIC_WITH_LEADING_ZERO|SCALE_PRESERVING_SCIENTIFIC|RMC_COMMUNICATION_FAILURE|END-ENHANCEMENT-SECTION|MULTIPLY-CORRESPONDING|SUBTRACT-CORRESPONDING|VERIFICATION-MESSAGE|DIVIDE-CORRESPONDING|ENHANCEMENT-SECTION|CURRENCY_CONVERSION|RMC_SYSTEM_FAILURE|START-OF-SELECTION|MOVE-CORRESPONDING|RMC_INVALID_STATUS|CUSTOMER-FUNCTION|END-OF-DEFINITION|ENHANCEMENT-POINT|SYSTEM-EXCEPTIONS|ADD-CORRESPONDING|SCALE_PRESERVING|SELECTION-SCREEN|CURSOR-SELECTION|END-OF-SELECTION|LOAD-OF-PROGRAM|SCROLL-BOUNDARY|SELECTION-TABLE|EXCEPTION-TABLE|IMPLEMENTATIONS|PARAMETER-TABLE|RIGHT-JUSTIFIED|UNIT_CONVERSION|AUTHORITY-CHECK|LIST-PROCESSING|SIGN_AS_POSTFIX|COL_BACKGROUND|IMPLEMENTATION|INTERFACE-POOL|TRANSFORMATION|IDENTIFICATION|ENDENHANCEMENT|LINE-SELECTION|INITIALIZATION|LEFT-JUSTIFIED|SELECT-OPTIONS|SELECTION-SETS|COMMUNICATION|CORRESPONDING|DECIMAL_SHIFT|PRINT-CONTROL|VALUE-REQUEST|CHAIN-REQUEST|FUNCTION-POOL|FIELD-SYMBOLS|FUNCTIONALITY|INVERTED-DATE|SELECTION-SET|CLASS-METHODS|OUTPUT-LENGTH|CLASS-CODING|COL_NEGATIVE|ERRORMESSAGE|FIELD-GROUPS|HELP-REQUEST|NO-EXTENSION|NO-TOPOFPAGE|REDEFINITION|DISPLAY-MODE|ENDINTERFACE|EXIT-COMMAND|FIELD-SYMBOL|NO-SCROLLING|SHORTDUMP-ID|ACCESSPOLICY|CLASS-EVENTS|COL_POSITIVE|DECLARATIONS|ENHANCEMENTS|FILTER-TABLE|SWITCHSTATES|SYNTAX-CHECK|TRANSPORTING|ASYNCHRONOUS|SYNTAX-TRACE|TOKENIZATION|USER-COMMAND|WITH-HEADING|ABAP-SOURCE|BREAK-POINT|CHAIN-INPUT|COMPRESSION|FIXED-POINT|NEW-SECTION|NON-UNICODE|OCCURRENCES|RESPONSIBLE|SYSTEM-CALL|TRACE-TABLE|ABBREVIATED|CHAR-TO-HEX|END-OF-FILE|ENDFUNCTION|ENVIRONMENT|ASSOCIATION|COL_HEADING|EDITOR-CALL|END-OF-PAGE|ENGINEERING|IMPLEMENTED|INTENSIFIED|RADIOBUTTON|SYSTEM-EXIT|TOP-OF-PAGE|TRANSACTION|APPLICATION|CONCATENATE|DESTINATION|ENHANCEMENT|IMMEDIATELY|NO-GROUPING|PRECOMPILED|REPLACEMENT|TITLE-LINES|ACTIVATION|BYTE-ORDER|CLASS-POOL|CONNECTION|CONVERSION|DEFINITION|DEPARTMENT|EXPIRATION|INHERITING|MESSAGE-ID|NO-HEADING|PERFORMING|QUEUE-ONLY|RIGHTSPACE|SCIENTIFIC|STATUSINFO|STRUCTURES|SYNCPOINTS|WITH-TITLE|ATTRIBUTES|BOUNDARIES|CLASS-DATA|COL_NORMAL|DD\/MM\/YYYY|DESCENDING|INTERFACES|LINE-COUNT|MM\/DD\/YYYY|NON-UNIQUE|PRESERVING|SELECTIONS|STATEMENTS|SUBROUTINE|TRUNCATION|TYPE-POOLS|ARITHMETIC|BACKGROUND|ENDPROVIDE|EXCEPTIONS|IDENTIFIER|INDEX-LINE|OBLIGATORY|PARAMETERS|PERCENTAGE|PUSHBUTTON|RESOLUTION|COMPONENTS|DEALLOCATE|DISCONNECT|DUPLICATES|FIRST-LINE|HEAD-LINES|NO-DISPLAY|OCCURRENCE|RESPECTING|RETURNCODE|SUBMATCHES|TRACE-FILE|ASCENDING|BYPASSING|ENDMODULE|EXCEPTION|EXCLUDING|EXPORTING|INCREMENT|MATCHCODE|PARAMETER|PARTIALLY|PREFERRED|REFERENCE|REPLACING|RETURNING|SELECTION|SEPARATED|SPECIFIED|STATEMENT|TIMESTAMP|TYPE-POOL|ACCEPTING|APPENDAGE|ASSIGNING|COL_GROUP|COMPARING|CONSTANTS|DANGEROUS|IMPORTING|INSTANCES|LEFTSPACE|LOG-POINT|QUICKINFO|READ-ONLY|SCROLLING|SQLSCRIPT|STEP-LOOP|TOP-LINES|TRANSLATE|APPENDING|AUTHORITY|CHARACTER|COMPONENT|CONDITION|DIRECTORY|DUPLICATE|MESSAGING|RECEIVING|SUBSCREEN|ACCORDING|COL_TOTAL|END-LINES|ENDMETHOD|ENDSELECT|EXPANDING|EXTENSION|INCLUDING|INFOTYPES|INTERFACE|INTERVALS|LINE-SIZE|PF-STATUS|PROCEDURE|PROTECTED|REQUESTED|RESUMABLE|RIGHTPLUS|SAP-SPOOL|SECONDARY|STRUCTURE|SUBSTRING|TABLEVIEW|NUMOFCHAR|ADJACENT|ANALYSIS|ASSIGNED|BACKWARD|CHANNELS|CHECKBOX|CONTINUE|CRITICAL|DATAINFO|DD\/MM\/YY|DURATION|ENCODING|ENDCLASS|FUNCTION|LEFTPLUS|LINEFEED|MM\/DD\/YY|OVERFLOW|RECEIVED|SKIPPING|SORTABLE|STANDARD|SUBTRACT|SUPPRESS|TABSTRIP|TITLEBAR|TRUNCATE|UNASSIGN|WHENEVER|ANALYZER|COALESCE|COMMENTS|CONDENSE|DECIMALS|DEFERRED|ENDWHILE|EXPLICIT|KEYWORDS|MESSAGES|POSITION|PRIORITY|RECEIVER|RENAMING|TIMEZONE|TRAILING|ALLOCATE|CENTERED|CIRCULAR|CONTROLS|CURRENCY|DELETING|DESCRIBE|DISTANCE|ENDCATCH|EXPONENT|EXTENDED|GENERATE|IGNORING|INCLUDES|INTERNAL|MAJOR-ID|MODIFIER|NEW-LINE|OPTIONAL|PROPERTY|ROLLBACK|STARTING|SUPPLIED|ABSTRACT|CHANGING|CONTEXTS|CREATING|CUSTOMER|DATABASE|DAYLIGHT|DEFINING|DISTINCT|DIVISION|ENABLING|ENDCHAIN|ESCAPING|HARMLESS|IMPLICIT|INACTIVE|LANGUAGE|MINOR-ID|MULTIPLY|NEW-PAGE|NO-TITLE|POS_HIGH|SEPARATE|TEXTPOOL|TRANSFER|SELECTOR|DBMAXLEN|ITERATOR|SELECTOR|ARCHIVE|BIT-XOR|BYTE-CO|COLLECT|COMMENT|CURRENT|DEFAULT|DISPLAY|ENDFORM|EXTRACT|LEADING|LISTBOX|LOCATOR|MEMBERS|METHODS|NESTING|POS_LOW|PROCESS|PROVIDE|RAISING|RESERVE|SECONDS|SUMMARY|VISIBLE|BETWEEN|BIT-AND|BYTE-CS|CLEANUP|COMPUTE|CONTROL|CONVERT|DATASET|ENDCASE|FORWARD|HEADERS|HOTSPOT|INCLUDE|INVERSE|KEEPING|NO-ZERO|OBJECTS|OVERLAY|PADDING|PATTERN|PROGRAM|REFRESH|SECTION|SUMMING|TESTING|VERSION|WINDOWS|WITHOUT|BIT-NOT|BYTE-CA|BYTE-NA|CASTING|CONTEXT|COUNTRY|DYNAMIC|ENABLED|ENDLOOP|EXECUTE|FRIENDS|HANDLER|HEADING|INITIAL|\*-INPUT|LOGFILE|MAXIMUM|MINIMUM|NO-GAPS|NO-SIGN|PRAGMAS|PRIMARY|PRIVATE|REDUCED|REPLACE|REQUEST|RESULTS|UNICODE|WARNING|ALIASES|BYTE-CN|BYTE-NS|CALLING|COL_KEY|COLUMNS|CONNECT|ENDEXEC|ENTRIES|EXCLUDE|FILTERS|FURTHER|HELP-ID|LOGICAL|MAPPING|MESSAGE|NAMETAB|OPTIONS|PACKAGE|PERFORM|RECEIVE|STATICS|VARYING|BINDING|CHARLEN|GREATER|XSTRLEN|ACCEPT|APPEND|DETAIL|ELSEIF|ENDING|ENDTRY|FORMAT|FRAMES|GIVING|HASHED|HEADER|IMPORT|INSERT|MARGIN|MODULE|NATIVE|OBJECT|OFFSET|REMOTE|RESUME|SAVING|SIMPLE|SUBMIT|TABBED|TOKENS|UNIQUE|UNPACK|UPDATE|WINDOW|YELLOW|ACTUAL|ASPECT|CENTER|CURSOR|DELETE|DIALOG|DIVIDE|DURING|ERRORS|EVENTS|EXTEND|FILTER|HANDLE|HAVING|IGNORE|LITTLE|MEMORY|NO-GAP|OCCURS|OPTION|PERSON|PLACES|PUBLIC|REDUCE|REPORT|RESULT|SINGLE|SORTED|SWITCH|SYNTAX|TARGET|VALUES|WRITER|ASSERT|BLOCKS|BOUNDS|BUFFER|CHANGE|COLUMN|COMMIT|CONCAT|COPIES|CREATE|DDMMYY|DEFINE|ENDIAN|ESCAPE|EXPAND|KERNEL|LAYOUT|LEGACY|LEVELS|MMDDYY|NUMBER|OUTPUT|RANGES|READER|RETURN|SCREEN|SEARCH|SELECT|SHARED|SOURCE|STABLE|STATIC|SUBKEY|SUFFIX|TABLES|UNWIND|YYMMDD|ASSIGN|BACKUP|BEFORE|BINARY|BIT-OR|BLANKS|CLIENT|CODING|COMMON|DEMAND|DYNPRO|EXCEPT|EXISTS|EXPORT|FIELDS|GLOBAL|GROUPS|LENGTH|LOCALE|MEDIUM|METHOD|MODIFY|NESTED|OTHERS|REJECT|SCROLL|SUPPLY|SYMBOL|ENDFOR|STRLEN|ALIGN|BEGIN|BOUND|ENDAT|ENTRY|EVENT|FINAL|FLUSH|GRANT|INNER|SHORT|USING|WRITE|AFTER|BLACK|BLOCK|CLOCK|COLOR|COUNT|DUMMY|EMPTY|ENDDO|ENDON|GREEN|INDEX|INOUT|LEAVE|LEVEL|LINES|MODIF|ORDER|OUTER|RANGE|RESET|RETRY|RIGHT|SMART|SPLIT|STYLE|TABLE|THROW|UNDER|UNTIL|UPPER|UTF-8|WHERE|ALIAS|BLANK|CLEAR|CLOSE|EXACT|FETCH|FIRST|FOUND|GROUP|LLANG|LOCAL|OTHER|REGEX|SPOOL|TITLE|TYPES|VALID|WHILE|ALPHA|BOXED|CATCH|CHAIN|CHECK|CLASS|COVER|ENDIF|EQUIV|FIELD|FLOOR|FRAME|INPUT|LOWER|MATCH|NODES|PAGES|PRINT|RAISE|ROUND|SHIFT|SPACE|SPOTS|STAMP|STATE|TASKS|TIMES|TRMAC|ULINE|UNION|VALUE|WIDTH|EQUAL|LOG10|TRUNC|BLOB|CASE|CEIL|CLOB|COND|EXIT|FILE|GAPS|HOLD|INCL|INTO|KEEP|KEYS|LAST|LINE|LONG|LPAD|MAIL|MODE|OPEN|PINK|READ|ROWS|TEST|THEN|ZERO|AREA|BACK|BADI|BYTE|CAST|EDIT|EXEC|FAIL|FIND|FKEQ|FONT|FREE|GKEQ|HIDE|INIT|ITNO|LATE|LOOP|MAIN|MARK|MOVE|NEXT|NULL|RISK|ROLE|UNIT|WAIT|ZONE|BASE|CALL|CODE|DATA|DATE|FKGE|GKGE|HIGH|KIND|LEFT|LIST|MASK|MESH|NAME|NODE|PACK|PAGE|POOL|SEND|SIGN|SIZE|SOME|STOP|TASK|TEXT|TIME|USER|VARY|WITH|WORD|BLUE|CONV|COPY|DEEP|ELSE|FORM|FROM|HINT|ICON|JOIN|LIKE|LOAD|ONLY|PART|SCAN|SKIP|SORT|TYPE|UNIX|VIEW|WHEN|WORK|ACOS|ASIN|ATAN|COSH|EACH|FRAC|LESS|RTTI|SINH|SQRT|TANH|AVG|BIT|DIV|ISO|LET|OUT|PAD|SQL|ALL|CI_|CPI|END|LOB|LPI|MAX|MIN|NEW|OLE|RUN|SET|\?TO|YES|ABS|ADD|AND|BIG|FOR|HDB|JOB|LOW|NOT|SAP|TRY|VIA|XML|ANY|GET|IDS|KEY|MOD|OFF|PUT|RAW|RED|REF|SUM|TAB|XSD|CNT|COS|EXP|LOG|SIN|TAN|XOR|AT|CO|CP|DO|GT|ID|IF|NS|OR|BT|CA|CS|GE|NA|NB|EQ|IN|LT|NE|NO|OF|ON|PF|TO|AS|BY|CN|IS|LE|NP|UP|E|I|M|O|Z|C|X)\b/i,
    lookbehind: !0,
    },
    number: /\b\d+\b/,
    operator: {
    pattern: /(\s)(?:\*\*?|<[=>]?|>=?|\?=|[-+\/=])(?=\s)/,
    lookbehind: !0,
    },
    "string-operator": {
    pattern: /(\s)&&?(?=\s)/,
    lookbehind: !0,
    alias: "keyword",
    },
    "token-operator": [
    {
        pattern: /(\w)(?:->?|=>|[~|{}])(?=\w)/,
        lookbehind: !0,
        alias: "punctuation",
    },
    { pattern: /[|{}]/, alias: "punctuation" },
    ],
    punctuation: /[,.:()]/,
}),
(Prism.languages.actionscript = Prism.languages.extend("javascript", {
    keyword:
    /\b(?:as|break|case|catch|class|const|default|delete|do|else|extends|finally|for|function|if|implements|import|in|instanceof|interface|internal|is|native|new|null|package|private|protected|public|return|super|switch|this|throw|try|typeof|use|var|void|while|with|dynamic|each|final|get|include|namespace|native|override|set|static)\b/,
    operator: /\+\+|--|(?:[+\-*\/%^]|&&?|\|\|?|<<?|>>?>?|[!=]=?)=?|[~?@]/,
})),
(Prism.languages.actionscript["class-name"].alias = "function"),
Prism.languages.markup &&
    Prism.languages.insertBefore("actionscript", "string", {
    xml: {
        pattern:
        /(^|[^.])<\/?\w+(?:\s+[^\s>\/=]+=("|')(?:\\[\s\S]|(?!\2)[^\\])*\2)*\s*\/?>/,
        lookbehind: !0,
        inside: Prism.languages.markup,
    },
    }),
(Prism.languages.ada = {
    comment: /--.*/,
    string: /"(?:""|[^"\r\f\n])*"/i,
    number: [
    {
        pattern:
        /\b\d(?:_?\d)*#[\dA-F](?:_?[\dA-F])*(?:\.[\dA-F](?:_?[\dA-F])*)?#(?:E[+-]?\d(?:_?\d)*)?/i,
    },
    { pattern: /\b\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:E[+-]?\d(?:_?\d)*)?\b/i },
    ],
    "attr-name": /\b'\w+/i,
    keyword:
    /\b(?:abort|abs|abstract|accept|access|aliased|all|and|array|at|begin|body|case|constant|declare|delay|delta|digits|do|else|new|return|elsif|end|entry|exception|exit|for|function|generic|goto|if|in|interface|is|limited|loop|mod|not|null|of|others|out|overriding|package|pragma|private|procedure|protected|raise|range|record|rem|renames|requeue|reverse|select|separate|some|subtype|synchronized|tagged|task|terminate|then|type|until|use|when|while|with|xor)\b/i,
    boolean: /\b(?:true|false)\b/i,
    operator: /<[=>]?|>=?|=>?|:=|\/=?|\*\*?|[&+-]/,
    punctuation: /\.\.?|[,;():]/,
    char: /'.'/,
    variable: /\b[a-z](?:[_a-z\d])*\b/i,
}),
(Prism.languages.apacheconf = {
    comment: /#.*/,
    "directive-inline": {
    pattern:
        /(^\s*)\b(?:AcceptFilter|AcceptPathInfo|AccessFileName|Action|Add(?:Alt|AltByEncoding|AltByType|Charset|DefaultCharset|Description|Encoding|Handler|Icon|IconByEncoding|IconByType|InputFilter|Language|ModuleInfo|OutputFilter|OutputFilterByType|Type)|Alias|AliasMatch|Allow(?:CONNECT|EncodedSlashes|Methods|Override|OverrideList)?|Anonymous(?:_LogEmail|_MustGiveEmail|_NoUserID|_VerifyEmail)?|AsyncRequestWorkerFactor|Auth(?:BasicAuthoritative|BasicFake|BasicProvider|BasicUseDigestAlgorithm|DBDUserPWQuery|DBDUserRealmQuery|DBMGroupFile|DBMType|DBMUserFile|Digest(?:Algorithm|Domain|NonceLifetime|Provider|Qop|ShmemSize)|Form(?:Authoritative|Body|DisableNoStore|FakeBasicAuth|Location|LoginRequiredLocation|LoginSuccessLocation|LogoutLocation|Method|Mimetype|Password|Provider|SitePassphrase|Size|Username)|GroupFile|LDAP(?:AuthorizePrefix|BindAuthoritative|BindDN|BindPassword|CharsetConfig|CompareAsUser|CompareDNOnServer|DereferenceAliases|GroupAttribute|GroupAttributeIsDN|InitialBindAsUser|InitialBindPattern|MaxSubGroupDepth|RemoteUserAttribute|RemoteUserIsDN|SearchAsUser|SubGroupAttribute|SubGroupClass|Url)|Merging|Name|Type|UserFile|nCache(?:Context|Enable|ProvideFor|SOCache|Timeout)|nzFcgiCheckAuthnProvider|nzFcgiDefineProvider|zDBDLoginToReferer|zDBDQuery|zDBDRedirectQuery|zDBMType|zSendForbiddenOnFailure)|BalancerGrowth|BalancerInherit|BalancerMember|BalancerPersist|BrowserMatch|BrowserMatchNoCase|BufferSize|BufferedLogs|CGIDScriptTimeout|CGIMapExtension|Cache(?:DefaultExpire|DetailHeader|DirLength|DirLevels|Disable|Enable|File|Header|IgnoreCacheControl|IgnoreHeaders|IgnoreNoLastMod|IgnoreQueryString|IgnoreURLSessionIdentifiers|KeyBaseURL|LastModifiedFactor|Lock|LockMaxAge|LockPath|MaxExpire|MaxFileSize|MinExpire|MinFileSize|NegotiatedDocs|QuickHandler|ReadSize|ReadTime|Root|Socache(?:MaxSize|MaxTime|MinTime|ReadSize|ReadTime)?|StaleOnError|StoreExpired|StoreNoStore|StorePrivate)|CharsetDefault|CharsetOptions|CharsetSourceEnc|CheckCaseOnly|CheckSpelling|ChrootDir|ContentDigest|CookieDomain|CookieExpires|CookieName|CookieStyle|CookieTracking|CoreDumpDirectory|CustomLog|DBDExptime|DBDInitSQL|DBDKeep|DBDMax|DBDMin|DBDParams|DBDPersist|DBDPrepareSQL|DBDriver|DTracePrivileges|Dav|DavDepthInfinity|DavGenericLockDB|DavLockDB|DavMinTimeout|DefaultIcon|DefaultLanguage|DefaultRuntimeDir|DefaultType|Define|Deflate(?:BufferSize|CompressionLevel|FilterNote|InflateLimitRequestBody|InflateRatio(?:Burst|Limit)|MemLevel|WindowSize)|Deny|DirectoryCheckHandler|DirectoryIndex|DirectoryIndexRedirect|DirectorySlash|DocumentRoot|DumpIOInput|DumpIOOutput|EnableExceptionHook|EnableMMAP|EnableSendfile|Error|ErrorDocument|ErrorLog|ErrorLogFormat|Example|ExpiresActive|ExpiresByType|ExpiresDefault|ExtFilterDefine|ExtFilterOptions|ExtendedStatus|FallbackResource|FileETag|FilterChain|FilterDeclare|FilterProtocol|FilterProvider|FilterTrace|ForceLanguagePriority|ForceType|ForensicLog|GprofDir|GracefulShutdownTimeout|Group|Header|HeaderName|Heartbeat(?:Address|Listen|MaxServers|Storage)|HostnameLookups|ISAPI(?:AppendLogToErrors|AppendLogToQuery|CacheFile|FakeAsync|LogNotSupported|ReadAheadBuffer)|IdentityCheck|IdentityCheckTimeout|ImapBase|ImapDefault|ImapMenu|Include|IncludeOptional|Index(?:HeadInsert|Ignore|IgnoreReset|Options|OrderDefault|StyleSheet)|InputSed|KeepAlive|KeepAliveTimeout|KeptBodySize|LDAP(?:CacheEntries|CacheTTL|ConnectionPoolTTL|ConnectionTimeout|LibraryDebug|OpCacheEntries|OpCacheTTL|ReferralHopLimit|Referrals|Retries|RetryDelay|SharedCacheFile|SharedCacheSize|Timeout|TrustedClientCert|TrustedGlobalCert|TrustedMode|VerifyServerCert)|LanguagePriority|Limit(?:InternalRecursion|Request(?:Body|FieldSize|Fields|Line)|XMLRequestBody)|Listen|ListenBackLog|LoadFile|LoadModule|LogFormat|LogLevel|LogMessage|LuaAuthzProvider|LuaCodeCache|Lua(?:Hook(?:AccessChecker|AuthChecker|CheckUserID|Fixups|InsertFilter|Log|MapToStorage|TranslateName|TypeChecker)|Inherit|InputFilter|MapHandler|OutputFilter|PackageCPath|PackagePath|QuickHandler|Root|Scope)|MMapFile|Max(?:ConnectionsPerChild|KeepAliveRequests|MemFree|RangeOverlaps|RangeReversals|Ranges|RequestWorkers|SpareServers|SpareThreads|Threads)|MergeTrailers|MetaDir|MetaFiles|MetaSuffix|MimeMagicFile|MinSpareServers|MinSpareThreads|ModMimeUsePathInfo|ModemStandard|MultiviewsMatch|Mutex|NWSSLTrustedCerts|NWSSLUpgradeable|NameVirtualHost|NoProxy|Options|Order|OutputSed|PassEnv|PidFile|PrivilegesMode|Protocol|ProtocolEcho|Proxy(?:AddHeaders|BadHeader|Block|Domain|ErrorOverride|ExpressDBMFile|ExpressDBMType|ExpressEnable|FtpDirCharset|FtpEscapeWildcards|FtpListOnWildcard|HTML(?:BufSize|CharsetOut|DocType|Enable|Events|Extended|Fixups|Interp|Links|Meta|StripComments|URLMap)|IOBufferSize|MaxForwards|Pass(?:Inherit|InterpolateEnv|Match|Reverse|ReverseCookieDomain|ReverseCookiePath)?|PreserveHost|ReceiveBufferSize|Remote|RemoteMatch|Requests|SCGIInternalRedirect|SCGISendfile|Set|SourceAddress|Status|Timeout|Via)|RLimitCPU|RLimitMEM|RLimitNPROC|ReadmeName|ReceiveBufferSize|Redirect|RedirectMatch|RedirectPermanent|RedirectTemp|ReflectorHeader|RemoteIP(?:Header|InternalProxy|InternalProxyList|ProxiesHeader|TrustedProxy|TrustedProxyList)|RemoveCharset|RemoveEncoding|RemoveHandler|RemoveInputFilter|RemoveLanguage|RemoveOutputFilter|RemoveType|RequestHeader|RequestReadTimeout|Require|Rewrite(?:Base|Cond|Engine|Map|Options|Rule)|SSIETag|SSIEndTag|SSIErrorMsg|SSILastModified|SSILegacyExprParser|SSIStartTag|SSITimeFormat|SSIUndefinedEcho|SSL(?:CACertificateFile|CACertificatePath|CADNRequestFile|CADNRequestPath|CARevocationCheck|CARevocationFile|CARevocationPath|CertificateChainFile|CertificateFile|CertificateKeyFile|CipherSuite|Compression|CryptoDevice|Engine|FIPS|HonorCipherOrder|InsecureRenegotiation|OCSP(?:DefaultResponder|Enable|OverrideResponder|ResponderTimeout|ResponseMaxAge|ResponseTimeSkew|UseRequestNonce)|OpenSSLConfCmd|Options|PassPhraseDialog|Protocol|Proxy(?:CACertificateFile|CACertificatePath|CARevocation(?:Check|File|Path)|CheckPeer(?:CN|Expire|Name)|CipherSuite|Engine|MachineCertificate(?:ChainFile|File|Path)|Protocol|Verify|VerifyDepth)|RandomSeed|RenegBufferSize|Require|RequireSSL|SRPUnknownUserSeed|SRPVerifierFile|Session(?:Cache|CacheTimeout|TicketKeyFile|Tickets)|Stapling(?:Cache|ErrorCacheTimeout|FakeTryLater|ForceURL|ResponderTimeout|ResponseMaxAge|ResponseTimeSkew|ReturnResponderErrors|StandardCacheTimeout)|StrictSNIVHostCheck|UseStapling|UserName|VerifyClient|VerifyDepth)|Satisfy|ScoreBoardFile|Script(?:Alias|AliasMatch|InterpreterSource|Log|LogBuffer|LogLength|Sock)?|SecureListen|SeeRequestTail|SendBufferSize|Server(?:Admin|Alias|Limit|Name|Path|Root|Signature|Tokens)|Session(?:Cookie(?:Name|Name2|Remove)|Crypto(?:Cipher|Driver|Passphrase|PassphraseFile)|DBD(?:CookieName|CookieName2|CookieRemove|DeleteLabel|InsertLabel|PerUser|SelectLabel|UpdateLabel)|Env|Exclude|Header|Include|MaxAge)?|SetEnv|SetEnvIf|SetEnvIfExpr|SetEnvIfNoCase|SetHandler|SetInputFilter|SetOutputFilter|StartServers|StartThreads|Substitute|Suexec|SuexecUserGroup|ThreadLimit|ThreadStackSize|ThreadsPerChild|TimeOut|TraceEnable|TransferLog|TypesConfig|UnDefine|UndefMacro|UnsetEnv|Use|UseCanonicalName|UseCanonicalPhysicalPort|User|UserDir|VHostCGIMode|VHostCGIPrivs|VHostGroup|VHostPrivs|VHostSecure|VHostUser|Virtual(?:DocumentRoot|ScriptAlias)(?:IP)?|WatchdogInterval|XBitHack|xml2EncAlias|xml2EncDefault|xml2StartParse)\b/im,
    lookbehind: !0,
    alias: "property",
    },
    "directive-block": {
    pattern:
        /<\/?\b(?:Auth[nz]ProviderAlias|Directory|DirectoryMatch|Else|ElseIf|Files|FilesMatch|If|IfDefine|IfModule|IfVersion|Limit|LimitExcept|Location|LocationMatch|Macro|Proxy|Require(?:All|Any|None)|VirtualHost)\b *.*>/i,
    inside: {
        "directive-block": {
        pattern: /^<\/?\w+/,
        inside: { punctuation: /^<\/?/ },
        alias: "tag",
        },
        "directive-block-parameter": {
        pattern: /.*[^>]/,
        inside: {
            punctuation: /:/,
            string: {
            pattern: /("|').*\1/,
            inside: { variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/ },
            },
        },
        alias: "attr-value",
        },
        punctuation: />/,
    },
    alias: "tag",
    },
    "directive-flags": { pattern: /\[(?:\w,?)+\]/, alias: "keyword" },
    string: {
    pattern: /("|').*\1/,
    inside: { variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/ },
    },
    variable: /[$%]\{?(?:\w\.?[-+:]?)+\}?/,
    regex: /\^?.*\$|\^.*\$?/,
}),
(Prism.languages.apl = {
    comment: /(?:⍝|#[! ]).*$/m,
    string: { pattern: /'(?:[^'\r\n]|'')*'/, greedy: !0 },
    number:
    /¯?(?:\d*\.?\d+(?:e[+¯]?\d+)?|¯|∞)(?:j¯?(?:\d*\.?\d+(?:e[+¯]?\d+)?|¯|∞))?/i,
    statement: /:[A-Z][a-z][A-Za-z]*\b/,
    "system-function": { pattern: /⎕[A-Z]+/i, alias: "function" },
    constant: /[⍬⌾#⎕⍞]/,
    function: /[-+×÷⌈⌊∣|⍳⍸?*⍟○!⌹<≤=>≥≠≡≢∊⍷∪∩~∨∧⍱⍲⍴,⍪⌽⊖⍉↑↓⊂⊃⊆⊇⌷⍋⍒⊤⊥⍕⍎⊣⊢⍁⍂≈⍯↗¤→]/,
    "monadic-operator": { pattern: /[\\\/⌿⍀¨⍨⌶&∥]/, alias: "operator" },
    "dyadic-operator": { pattern: /[.⍣⍠⍤∘⌸@⌺]/, alias: "operator" },
    assignment: { pattern: /←/, alias: "keyword" },
    punctuation: /[\[;\]()◇⋄]/,
    dfn: { pattern: /[{}⍺⍵⍶⍹∇⍫:]/, alias: "builtin" },
}),
(Prism.languages.applescript = {
    comment: [/\(\*(?:\(\*[\s\S]*?\*\)|[\s\S])*?\*\)/, /--.+/, /#.+/],
    string: /"(?:\\.|[^"\\\r\n])*"/,
    number: /(?:\b\d+\.?\d*|\B\.\d+)(?:e-?\d+)?\b/i,
    operator: [
    /[&=≠≤≥*+\-\/÷^]|[<>]=?/,
    /\b(?:(?:start|begin|end)s? with|(?:(?:does not|doesn't) contain|contains?)|(?:is|isn't|is not) (?:in|contained by)|(?:(?:is|isn't|is not) )?(?:greater|less) than(?: or equal)?(?: to)?|(?:(?:does not|doesn't) come|comes) (?:before|after)|(?:is|isn't|is not) equal(?: to)?|(?:(?:does not|doesn't) equal|equals|equal to|isn't|is not)|(?:a )?(?:ref(?: to)?|reference to)|(?:and|or|div|mod|as|not))\b/,
    ],
    keyword:
    /\b(?:about|above|after|against|apart from|around|aside from|at|back|before|beginning|behind|below|beneath|beside|between|but|by|considering|continue|copy|does|eighth|else|end|equal|error|every|exit|false|fifth|first|for|fourth|from|front|get|given|global|if|ignoring|in|instead of|into|is|it|its|last|local|me|middle|my|ninth|of|on|onto|out of|over|prop|property|put|repeat|return|returning|second|set|seventh|since|sixth|some|tell|tenth|that|the|then|third|through|thru|timeout|times|to|transaction|true|try|until|where|while|whose|with|without)\b/,
    class: {
    pattern:
        /\b(?:alias|application|boolean|class|constant|date|file|integer|list|number|POSIX file|real|record|reference|RGB color|script|text|centimetres|centimeters|feet|inches|kilometres|kilometers|metres|meters|miles|yards|square feet|square kilometres|square kilometers|square metres|square meters|square miles|square yards|cubic centimetres|cubic centimeters|cubic feet|cubic inches|cubic metres|cubic meters|cubic yards|gallons|litres|liters|quarts|grams|kilograms|ounces|pounds|degrees Celsius|degrees Fahrenheit|degrees Kelvin)\b/,
    alias: "builtin",
    },
    punctuation: /[{}():,¬«»《》]/,
}),
(Prism.languages.c = Prism.languages.extend("clike", {
    comment: {
    pattern:
        /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
    greedy: !0,
    },
    "class-name": {
    pattern:
        /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+/,
    lookbehind: !0,
    },
    keyword:
    /\b(?:__attribute__|_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
    function: /[a-z_]\w*(?=\s*\()/i,
    operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
    number:
    /(?:\b0x(?:[\da-f]+\.?[\da-f]*|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i,
})),
Prism.languages.insertBefore("c", "string", {
    macro: {
    pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,
    lookbehind: !0,
    alias: "property",
    inside: {
        string: {
        pattern: /(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/,
        lookbehind: !0,
        },
        directive: {
        pattern:
            /(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
        lookbehind: !0,
        alias: "keyword",
        },
    },
    },
    constant:
    /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/,
}),
delete Prism.languages.c.boolean,
(Prism.languages.cpp = Prism.languages.extend("c", {
    "class-name": {
    pattern: /(\b(?:class|enum|struct)\s+)\w+/,
    lookbehind: !0,
    },
    keyword:
    /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,
    number: {
    pattern:
        /(?:\b0b[01']+|\b0x(?:[\da-f']+\.?[\da-f']*|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+\.?[\d']*|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]*/i,
    greedy: !0,
    },
    operator:
    />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
    boolean: /\b(?:true|false)\b/,
})),
Prism.languages.insertBefore("cpp", "string", {
    "raw-string": {
    pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
    alias: "string",
    greedy: !0,
    },
}),
(Prism.languages.arduino = Prism.languages.extend("cpp", {
    keyword:
    /\b(?:setup|if|else|while|do|for|return|in|instanceof|default|function|loop|goto|switch|case|new|try|throw|catch|finally|null|break|continue|boolean|bool|void|byte|word|string|String|array|int|long|integer|double)\b/,
    builtin:
    /\b(?:KeyboardController|MouseController|SoftwareSerial|EthernetServer|EthernetClient|LiquidCrystal|LiquidCrystal_I2C|RobotControl|GSMVoiceCall|EthernetUDP|EsploraTFT|HttpClient|RobotMotor|WiFiClient|GSMScanner|FileSystem|Scheduler|GSMServer|YunClient|YunServer|IPAddress|GSMClient|GSMModem|Keyboard|Ethernet|Console|GSMBand|Esplora|Stepper|Process|WiFiUDP|GSM_SMS|Mailbox|USBHost|Firmata|PImage|Client|Server|GSMPIN|FileIO|Bridge|Serial|EEPROM|Stream|Mouse|Audio|Servo|File|Task|GPRS|WiFi|Wire|TFT|GSM|SPI|SD|runShellCommandAsynchronously|analogWriteResolution|retrieveCallingNumber|printFirmwareVersion|analogReadResolution|sendDigitalPortPair|noListenOnLocalhost|readJoystickButton|setFirmwareVersion|readJoystickSwitch|scrollDisplayRight|getVoiceCallStatus|scrollDisplayLeft|writeMicroseconds|delayMicroseconds|beginTransmission|getSignalStrength|runAsynchronously|getAsynchronously|listenOnLocalhost|getCurrentCarrier|readAccelerometer|messageAvailable|sendDigitalPorts|lineFollowConfig|countryNameWrite|runShellCommand|readStringUntil|rewindDirectory|readTemperature|setClockDivider|readLightSensor|endTransmission|analogReference|detachInterrupt|countryNameRead|attachInterrupt|encryptionType|readBytesUntil|robotNameWrite|readMicrophone|robotNameRead|cityNameWrite|userNameWrite|readJoystickY|readJoystickX|mouseReleased|openNextFile|scanNetworks|noInterrupts|digitalWrite|beginSpeaker|mousePressed|isActionDone|mouseDragged|displayLogos|noAutoscroll|addParameter|remoteNumber|getModifiers|keyboardRead|userNameRead|waitContinue|processInput|parseCommand|printVersion|readNetworks|writeMessage|blinkVersion|cityNameRead|readMessage|setDataMode|parsePacket|isListening|setBitOrder|beginPacket|isDirectory|motorsWrite|drawCompass|digitalRead|clearScreen|serialEvent|rightToLeft|setTextSize|leftToRight|requestFrom|keyReleased|compassRead|analogWrite|interrupts|WiFiServer|disconnect|playMelody|parseFloat|autoscroll|getPINUsed|setPINUsed|setTimeout|sendAnalog|readSlider|analogRead|beginWrite|createChar|motorsStop|keyPressed|tempoWrite|readButton|subnetMask|debugPrint|macAddress|writeGreen|randomSeed|attachGPRS|readString|sendString|remotePort|releaseAll|mouseMoved|background|getXChange|getYChange|answerCall|getResult|voiceCall|endPacket|constrain|getSocket|writeJSON|getButton|available|connected|findUntil|readBytes|exitValue|readGreen|writeBlue|startLoop|IPAddress|isPressed|sendSysex|pauseMode|gatewayIP|setCursor|getOemKey|tuneWrite|noDisplay|loadImage|switchPIN|onRequest|onReceive|changePIN|playFile|noBuffer|parseInt|overflow|checkPIN|knobRead|beginTFT|bitClear|updateIR|bitWrite|position|writeRGB|highByte|writeRed|setSpeed|readBlue|noStroke|remoteIP|transfer|shutdown|hangCall|beginSMS|endWrite|attached|maintain|noCursor|checkReg|checkPUK|shiftOut|isValid|shiftIn|pulseIn|connect|println|localIP|pinMode|getIMEI|display|noBlink|process|getBand|running|beginSD|drawBMP|lowByte|setBand|release|bitRead|prepare|pointTo|readRed|setMode|noFill|remove|listen|stroke|detach|attach|noTone|exists|buffer|height|bitSet|circle|config|cursor|random|IRread|setDNS|endSMS|getKey|micros|millis|begin|print|write|ready|flush|width|isPIN|blink|clear|press|mkdir|rmdir|close|point|yield|image|BSSID|click|delay|read|text|move|peek|beep|rect|line|open|seek|fill|size|turn|stop|home|find|step|tone|sqrt|RSSI|SSID|end|bit|tan|cos|sin|pow|map|abs|max|min|get|run|put)\b/,
    constant:
    /\b(?:DIGITAL_MESSAGE|FIRMATA_STRING|ANALOG_MESSAGE|REPORT_DIGITAL|REPORT_ANALOG|INPUT_PULLUP|SET_PIN_MODE|INTERNAL2V56|SYSTEM_RESET|LED_BUILTIN|INTERNAL1V1|SYSEX_START|INTERNAL|EXTERNAL|DEFAULT|OUTPUT|INPUT|HIGH|LOW)\b/,
})),
(Prism.languages.arff = {
    comment: /%.*/,
    string: { pattern: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
    keyword: /@(?:attribute|data|end|relation)\b/i,
    number: /\b\d+(?:\.\d+)?\b/,
    punctuation: /[{},]/,
}),
!(function (c) {
    var d = {
        pattern:
        /(^[ \t]*)\[(?!\[)(?:(["'$`])(?:(?!\2)[^\\]|\\.)*\2|\[(?:[^\]\\]|\\.)*\]|[^\]\\]|\\.)*\]/m,
        lookbehind: !0,
        inside: {
        quoted: {
            pattern: /([$`])(?:(?!\1)[^\\]|\\.)*\1/,
            inside: { punctuation: /^[$`]|[$`]$/ },
        },
        interpreted: {
            pattern: /'(?:[^'\\]|\\.)*'/,
            inside: { punctuation: /^'|'$/ },
        },
        string: /"(?:[^"\\]|\\.)*"/,
        variable: /\w+(?==)/,
        punctuation: /^\[|\]$|,/,
        operator: /=/,
        "attr-value": /(?!^\s+$).+/,
        },
    },
    a = (c.languages.asciidoc = {
        "comment-block": {
        pattern: /^(\/{4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1/m,
        alias: "comment",
        },
        table: {
        pattern: /^\|={3,}(?:(?:\r?\n|\r).*)*?(?:\r?\n|\r)\|={3,}$/m,
        inside: {
            specifiers: {
            pattern:
                /(?!\|)(?:(?:(?:\d+(?:\.\d+)?|\.\d+)[+*])?(?:[<^>](?:\.[<^>])?|\.[<^>])?[a-z]*)(?=\|)/,
            alias: "attr-value",
            },
            punctuation: { pattern: /(^|[^\\])[|!]=*/, lookbehind: !0 },
        },
        },
        "passthrough-block": {
        pattern: /^(\+{4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1$/m,
        inside: { punctuation: /^\++|\++$/ },
        },
        "literal-block": {
        pattern: /^(-{4,}|\.{4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1$/m,
        inside: { punctuation: /^(?:-+|\.+)|(?:-+|\.+)$/ },
        },
        "other-block": {
        pattern:
            /^(--|\*{4,}|_{4,}|={4,})(?:\r?\n|\r)(?:[\s\S]*(?:\r?\n|\r))??\1$/m,
        inside: { punctuation: /^(?:-+|\*+|_+|=+)|(?:-+|\*+|_+|=+)$/ },
        },
        "list-punctuation": {
        pattern:
            /(^[ \t]*)(?:-|\*{1,5}|\.{1,5}|(?:[a-z]|\d+)\.|[xvi]+\))(?= )/im,
        lookbehind: !0,
        alias: "punctuation",
        },
        "list-label": {
        pattern: /(^[ \t]*)[a-z\d].+(?::{2,4}|;;)(?=\s)/im,
        lookbehind: !0,
        alias: "symbol",
        },
        "indented-block": {
        pattern: /((\r?\n|\r)\2)([ \t]+)\S.*(?:(?:\r?\n|\r)\3.+)*(?=\2{2}|$)/,
        lookbehind: !0,
        },
        comment: /^\/\/.*/m,
        title: {
        pattern:
            /^.+(?:\r?\n|\r)(?:={3,}|-{3,}|~{3,}|\^{3,}|\+{3,})$|^={1,5} +.+|^\.(?![\s.]).*/m,
        alias: "important",
        inside: { punctuation: /^(?:\.|=+)|(?:=+|-+|~+|\^+|\++)$/ },
        },
        "attribute-entry": {
        pattern: /^:[^:\r\n]+:(?: .*?(?: \+(?:\r?\n|\r).*?)*)?$/m,
        alias: "tag",
        },
        attributes: d,
        hr: { pattern: /^'{3,}$/m, alias: "punctuation" },
        "page-break": { pattern: /^<{3,}$/m, alias: "punctuation" },
        admonition: {
        pattern: /^(?:TIP|NOTE|IMPORTANT|WARNING|CAUTION):/m,
        alias: "keyword",
        },
        callout: [
        { pattern: /(^[ \t]*)<?\d*>/m, lookbehind: !0, alias: "symbol" },
        { pattern: /<\d+>/, alias: "symbol" },
        ],
        macro: {
        pattern:
            /\b[a-z\d][a-z\d-]*::?(?:(?:\S+)??\[(?:[^\]\\"]|(["'])(?:(?!\1)[^\\]|\\.)*\1|\\.)*\])/,
        inside: {
            function: /^[a-z\d-]+(?=:)/,
            punctuation: /^::?/,
            attributes: {
            pattern: /(?:\[(?:[^\]\\"]|(["'])(?:(?!\1)[^\\]|\\.)*\1|\\.)*\])/,
            inside: d.inside,
            },
        },
        },
        inline: {
        pattern:
            /(^|[^\\])(?:(?:\B\[(?:[^\]\\"]|(["'])(?:(?!\2)[^\\]|\\.)*\2|\\.)*\])?(?:\b_(?!\s)(?: _|[^_\\\r\n]|\\.)+(?:(?:\r?\n|\r)(?: _|[^_\\\r\n]|\\.)+)*_\b|\B``(?!\s).+?(?:(?:\r?\n|\r).+?)*''\B|\B`(?!\s)(?: ['`]|.)+?(?:(?:\r?\n|\r)(?: ['`]|.)+?)*['`]\B|\B(['*+#])(?!\s)(?: \3|(?!\3)[^\\\r\n]|\\.)+(?:(?:\r?\n|\r)(?: \3|(?!\3)[^\\\r\n]|\\.)+)*\3\B)|(?:\[(?:[^\]\\"]|(["'])(?:(?!\4)[^\\]|\\.)*\4|\\.)*\])?(?:(__|\*\*|\+\+\+?|##|\$\$|[~^]).+?(?:(?:\r?\n|\r).+?)*\5|\{[^}\r\n]+\}|\[\[\[?.+?(?:(?:\r?\n|\r).+?)*\]?\]\]|<<.+?(?:(?:\r?\n|\r).+?)*>>|\(\(\(?.+?(?:(?:\r?\n|\r).+?)*\)?\)\)))/m,
        lookbehind: !0,
        inside: {
            attributes: d,
            url: {
            pattern: /^(?:\[\[\[?.+?\]?\]\]|<<.+?>>)$/,
            inside: { punctuation: /^(?:\[\[\[?|<<)|(?:\]\]\]?|>>)$/ },
            },
            "attribute-ref": {
            pattern: /^\{.+\}$/,
            inside: {
                variable: { pattern: /(^\{)[a-z\d,+_-]+/, lookbehind: !0 },
                operator: /^[=?!#%@$]|!(?=[:}])/,
                punctuation: /^\{|\}$|::?/,
            },
            },
            italic: {
            pattern: /^(['_])[\s\S]+\1$/,
            inside: { punctuation: /^(?:''?|__?)|(?:''?|__?)$/ },
            },
            bold: {
            pattern: /^\*[\s\S]+\*$/,
            inside: { punctuation: /^\*\*?|\*\*?$/ },
            },
            punctuation:
            /^(?:``?|\+{1,3}|##?|\$\$|[~^]|\(\(\(?)|(?:''?|\+{1,3}|##?|\$\$|[~^`]|\)?\)\))$/,
        },
        },
        replacement: { pattern: /\((?:C|TM|R)\)/, alias: "builtin" },
        entity: /&#?[\da-z]{1,8};/i,
        "line-continuation": {
        pattern: /(^| )\+$/m,
        lookbehind: !0,
        alias: "punctuation",
        },
    });
    function b(b) {
    for (var d = {}, c = 0, e = (b = b.split(" ")).length; c < e; c++)
        d[b[c]] = a[b[c]];
    return d;
    }
    (d.inside.interpreted.inside.rest = b("macro inline replacement entity")),
    (a["passthrough-block"].inside.rest = b("macro")),
    (a["literal-block"].inside.rest = b("callout")),
    (a.table.inside.rest = b(
        "comment-block passthrough-block literal-block other-block list-punctuation indented-block comment title attribute-entry attributes hr page-break admonition list-label callout macro inline replacement entity line-continuation"
    )),
    (a["other-block"].inside.rest = b(
        "table list-punctuation indented-block comment attribute-entry attributes hr page-break admonition list-label macro inline replacement entity line-continuation"
    )),
    (a.title.inside.rest = b("macro inline replacement entity")),
    c.hooks.add("wrap", function (a) {
        "entity" === a.type &&
        (a.attributes.title = a.content.replace(/&amp;/, "&"));
    }),
    (c.languages.adoc = c.languages.asciidoc);
})(Prism),
(Prism.languages.asm6502 = {
    comment: /;.*/,
    directive: { pattern: /\.\w+(?= )/, alias: "keyword" },
    string: /(["'`])(?:\\.|(?!\1)[^\\\r\n])*\1/,
    opcode: {
    pattern:
        /\b(?:adc|and|asl|bcc|bcs|beq|bit|bmi|bne|bpl|brk|bvc|bvs|clc|cld|cli|clv|cmp|cpx|cpy|dec|dex|dey|eor|inc|inx|iny|jmp|jsr|lda|ldx|ldy|lsr|nop|ora|pha|php|pla|plp|rol|ror|rti|rts|sbc|sec|sed|sei|sta|stx|sty|tax|tay|tsx|txa|txs|tya|ADC|AND|ASL|BCC|BCS|BEQ|BIT|BMI|BNE|BPL|BRK|BVC|BVS|CLC|CLD|CLI|CLV|CMP|CPX|CPY|DEC|DEX|DEY|EOR|INC|INX|INY|JMP|JSR|LDA|LDX|LDY|LSR|NOP|ORA|PHA|PHP|PLA|PLP|ROL|ROR|RTI|RTS|SBC|SEC|SED|SEI|STA|STX|STY|TAX|TAY|TSX|TXA|TXS|TYA)\b/,
    alias: "property",
    },
    hexnumber: { pattern: /#?\$[\da-f]{2,4}/i, alias: "string" },
    binarynumber: { pattern: /#?%[01]+/, alias: "string" },
    decimalnumber: { pattern: /#?\d+/, alias: "string" },
    register: { pattern: /\b[xya]\b/i, alias: "variable" },
}),
!(function (e) {
    var t,
    k,
    p,
    o,
    C,
    i,
    F,
    G,
    h,
    q,
    d,
    n,
    g,
    s,
    f,
    c,
    v,
    w,
    x,
    y,
    z,
    A,
    E,
    m,
    D,
    B,
    u,
    r;
    function b(a, b) {
    return a.replace(/<<(\d+)>>/g, function (c, a) {
        return "(?:" + b[+a] + ")";
    });
    }
    function a(a, c, d) {
    return RegExp(b(a, c), d || "");
    }
    function j(a, c) {
    for (var b = 0; b < c; b++)
        a = a.replace(/<<self>>/g, function () {
        return "(?:" + a + ")";
        });
    return a.replace(/<<self>>/g, "[^\\s\\S]");
    }
    (t =
    "bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void"),
    (k = "class enum interface struct"),
    (p =
        "add alias ascending async await by descending from get global group into join let nameof notnull on orderby partial remove select set unmanaged value when where where"),
    (o =
        "abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield");
    function l(a) {
    return "\\b(?:" + a.trim().replace(/ /g, "|") + ")\\b";
    }
    (C = l(k)),
    (i = RegExp(l(t + " " + k + " " + p + " " + o))),
    (F = l(k + " " + p + " " + o)),
    (G = l(t + " " + k + " " + o)),
    (h = j("<(?:[^<>;=+\\-*/%&|^]|<<self>>)*>", 2)),
    (q = j("\\((?:[^()]|<<self>>)*\\)", 2)),
    (d = "@?\\b[A-Za-z_]\\w*\\b"),
    (n = b("<<0>>(?:\\s*<<1>>)?", [d, h])),
    (g = b("(?!<<0>>)<<1>>(?:\\s*\\.\\s*<<1>>)*", [F, n])),
    (s = "\\[\\s*(?:,\\s*)*\\]"),
    (f = b("(?:<<0>>|<<1>>)(?:\\s*(?:\\?\\s*)?<<2>>)*(?:\\s*\\?)?", [
        b("\\(<<0>>+(?:,<<0>>+)+\\)", [
        b("[^,()<>[\\];=+\\-*/%&|^]|<<0>>|<<1>>|<<2>>", [h, q, s]),
        ]),
        g,
        s,
    ])),
    (c = { keyword: i, punctuation: /[<>()?,.:[\]]/ }),
    (v = "'(?:[^\r\n'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})'"),
    (w = '"(?:\\\\.|[^\\\\"\r\n])*"'),
    (e.languages.csharp = e.languages.extend("clike", {
        string: [
        {
            pattern: a("(^|[^$\\\\])<<0>>", [
            '@"(?:""|\\\\[^]|[^\\\\"])*"(?!")',
            ]),
            lookbehind: !0,
            greedy: !0,
        },
        { pattern: a("(^|[^@$\\\\])<<0>>", [w]), lookbehind: !0, greedy: !0 },
        { pattern: RegExp(v), greedy: !0, alias: "character" },
        ],
        "class-name": [
        {
            pattern: a("(\\busing\\s+static\\s+)<<0>>(?=\\s*;)", [g]),
            lookbehind: !0,
            inside: c,
        },
        {
            pattern: a("(\\busing\\s+<<0>>\\s*=\\s*)<<1>>(?=\\s*;)", [d, f]),
            lookbehind: !0,
            inside: c,
        },
        { pattern: a("(\\busing\\s+)<<0>>(?=\\s*=)", [d]), lookbehind: !0 },
        {
            pattern: a("(\\b<<0>>\\s+)<<1>>", [C, n]),
            lookbehind: !0,
            inside: c,
        },
        {
            pattern: a("(\\bcatch\\s*\\(\\s*)<<0>>", [g]),
            lookbehind: !0,
            inside: c,
        },
        { pattern: a("(\\bwhere\\s+)<<0>>", [d]), lookbehind: !0 },
        {
            pattern: a("(\\b(?:is|as)\\s+)<<0>>", [f]),
            lookbehind: !0,
            inside: c,
        },
        {
            pattern: a(
            "\\b<<0>>(?=\\s+(?!<<1>>)<<2>>(?:\\s*[=,;:{)\\]]|\\s+in))",
            [f, G, d]
            ),
            inside: c,
        },
        ],
        keyword: i,
        number:
        /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:ul|lu|[dflmu])?\b/i,
        operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
        punctuation: /\?\.?|::|[{}[\];(),.:]/,
    })),
    e.languages.insertBefore("csharp", "number", {
        range: { pattern: /\.\./, alias: "operator" },
    }),
    e.languages.insertBefore("csharp", "punctuation", {
        "named-parameter": {
        pattern: a("([(,]\\s*)<<0>>(?=\\s*:)", [d]),
        lookbehind: !0,
        alias: "punctuation",
        },
    }),
    e.languages.insertBefore("csharp", "class-name", {
        namespace: {
        pattern: a(
            "(\\b(?:namespace|using)\\s+)<<0>>(?:\\s*\\.\\s*<<0>>)*(?=\\s*[;{])",
            [d]
        ),
        lookbehind: !0,
        inside: { punctuation: /\./ },
        },
        "type-expression": {
        pattern: a(
            "(\\b(?:default|typeof|sizeof)\\s*\\(\\s*)(?:[^()\\s]|\\s(?!\\s*\\))|<<0>>)*(?=\\s*\\))",
            [q]
        ),
        lookbehind: !0,
        alias: "class-name",
        inside: c,
        },
        "return-type": {
        pattern: a(
            "<<0>>(?=\\s+(?:<<1>>\\s*(?:=>|[({]|\\.\\s*this\\s*\\[)|this\\s*\\[))",
            [f, g]
        ),
        inside: c,
        alias: "class-name",
        },
        "constructor-invocation": {
        pattern: a("(\\bnew\\s+)<<0>>(?=\\s*[[({])", [f]),
        lookbehind: !0,
        inside: c,
        alias: "class-name",
        },
        "generic-method": {
        pattern: a("<<0>>\\s*<<1>>(?=\\s*\\()", [d, h]),
        inside: {
            function: a("^<<0>>", [d]),
            generic: { pattern: RegExp(h), alias: "class-name", inside: c },
        },
        },
        "type-list": {
        pattern: a(
            "\\b((?:<<0>>\\s+<<1>>|where\\s+<<2>>)\\s*:\\s*)(?:<<3>>|<<4>>)(?:\\s*,\\s*(?:<<3>>|<<4>>))*(?=\\s*(?:where|[{;]|=>|$))",
            [C, n, d, f, i.source]
        ),
        lookbehind: !0,
        inside: {
            keyword: i,
            "class-name": { pattern: RegExp(f), greedy: !0, inside: c },
            punctuation: /,/,
        },
        },
        preprocessor: {
        pattern: /(^\s*)#.*/m,
        lookbehind: !0,
        alias: "property",
        inside: {
            directive: {
            pattern:
                /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
            lookbehind: !0,
            alias: "keyword",
            },
        },
        },
    }),
    (x = w + "|" + v),
    (y = b("/(?![*/])|//[^\r\n]*[\r\n]|/\\*[^]*?\\*/|<<0>>", [x])),
    (z = j(b("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [y]), 2)),
    (A =
        "\\b(?:assembly|event|field|method|module|param|property|return|type)\\b"),
    (E = b("<<0>>(?:\\s*\\(<<1>>*\\))?", [g, z])),
    e.languages.insertBefore("csharp", "class-name", {
        attribute: {
        pattern: a(
            "((?:^|[^\\s\\w>)?])\\s*\\[\\s*)(?:<<0>>\\s*:\\s*)?<<1>>(?:\\s*,\\s*<<1>>)*(?=\\s*\\])",
            [A, E]
        ),
        lookbehind: !0,
        greedy: !0,
        inside: {
            target: { pattern: a("^<<0>>(?=\\s*:)", [A]), alias: "keyword" },
            "attribute-arguments": {
            pattern: a("\\(<<0>>*\\)", [z]),
            inside: e.languages.csharp,
            },
            "class-name": { pattern: RegExp(g), inside: { punctuation: /\./ } },
            punctuation: /[:,]/,
        },
        },
    }),
    (m = ":[^}\r\n]+"),
    (D = j(b("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [y]), 2)),
    (B = b("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [D, m])),
    (u = j(
        b("[^\"'/()]|/(?!\\*)|/\\*.*?\\*/|<<0>>|\\(<<self>>*\\)", [x]),
        2
    )),
    (r = b("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [u, m]));
    function H(b, c) {
    return {
        interpolation: {
        pattern: a("([^{](?:\\{\\{)*)<<0>>", [b]),
        lookbehind: !0,
        inside: {
            "format-string": {
            pattern: a("(^\\{(?:(?![}:])<<0>>)*)<<1>>(?=\\}$)", [c, m]),
            lookbehind: !0,
            inside: { punctuation: /^:/ },
            },
            punctuation: /^\{|\}$/,
            expression: {
            pattern: /[\s\S]+/,
            alias: "language-csharp",
            inside: e.languages.csharp,
            },
        },
        },
        string: /[\s\S]+/,
    };
    }
    e.languages.insertBefore("csharp", "string", {
    "interpolation-string": [
        {
        pattern: a(
            '(^|[^\\\\])(?:\\$@|@\\$)"(?:""|\\\\[^]|\\{\\{|<<0>>|[^\\\\{"])*"',
            [B]
        ),
        lookbehind: !0,
        greedy: !0,
        inside: H(B, D),
        },
        {
        pattern: a('(^|[^@\\\\])\\$"(?:\\\\.|\\{\\{|<<0>>|[^\\\\"{])*"', [r]),
        lookbehind: !0,
        greedy: !0,
        inside: H(r, u),
        },
    ],
    });
})(Prism),
(Prism.languages.dotnet = Prism.languages.cs = Prism.languages.csharp),
(Prism.languages.aspnet = Prism.languages.extend("markup", {
    "page-directive": {
    pattern: /<%\s*@.*%>/i,
    alias: "tag",
    inside: {
        "page-directive": {
        pattern:
            /<%\s*@\s*(?:Assembly|Control|Implements|Import|Master(?:Type)?|OutputCache|Page|PreviousPageType|Reference|Register)?|%>/i,
        alias: "tag",
        },
        rest: Prism.languages.markup.tag.inside,
    },
    },
    directive: {
    pattern: /<%.*%>/i,
    alias: "tag",
    inside: {
        directive: { pattern: /<%\s*?[$=%#:]{0,2}|%>/i, alias: "tag" },
        rest: Prism.languages.csharp,
    },
    },
})),
(Prism.languages.aspnet.tag.pattern =
    /<(?!%)\/?[^\s>\/]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i),
Prism.languages.insertBefore(
    "inside",
    "punctuation",
    { directive: Prism.languages.aspnet.directive },
    Prism.languages.aspnet.tag.inside["attr-value"]
),
Prism.languages.insertBefore("aspnet", "comment", {
    "asp-comment": { pattern: /<%--[\s\S]*?--%>/, alias: ["asp", "comment"] },
}),
Prism.languages.insertBefore(
    "aspnet",
    Prism.languages.javascript ? "script" : "tag",
    {
    "asp-script": {
        pattern:
        /(<script(?=.*runat=['"]?server['"]?)[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
        lookbehind: !0,
        alias: ["asp", "script"],
        inside: Prism.languages.csharp || {},
    },
    }
),
(Prism.languages.autohotkey = {
    comment: {
    pattern:
        /(^[^";\n]*(?:"[^"\n]*?"[^"\n]*?)*)(?:;.*$|^\s*\/\*[\s\S]*\n\*\/)/m,
    lookbehind: !0,
    },
    string: /"(?:[^"\n\r]|"")*"/m,
    function: /[^(); \t,\n+*\-=?>:\\\/<&%\[\]]+?(?=\()/m,
    tag: /^[ \t]*[^\s:]+?(?=:(?:[^:]|$))/m,
    variable: /%\w+%/,
    number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
    operator:
    /\?|\/\/?=?|:=|\|[=|]?|&[=&]?|\+[=+]?|-[=-]?|\*[=*]?|<(?:<=?|>|=)?|>>?=?|[.^!=~]=?|\b(?:AND|NOT|OR)\b/,
    punctuation: /[{}[\]():,]/,
    boolean: /\b(?:true|false)\b/,
    selector:
    /\b(?:AutoTrim|BlockInput|Break|Click|ClipWait|Continue|Control|ControlClick|ControlFocus|ControlGet|ControlGetFocus|ControlGetPos|ControlGetText|ControlMove|ControlSend|ControlSendRaw|ControlSetText|CoordMode|Critical|DetectHiddenText|DetectHiddenWindows|Drive|DriveGet|DriveSpaceFree|EnvAdd|EnvDiv|EnvGet|EnvMult|EnvSet|EnvSub|EnvUpdate|Exit|ExitApp|FileAppend|FileCopy|FileCopyDir|FileCreateDir|FileCreateShortcut|FileDelete|FileEncoding|FileGetAttrib|FileGetShortcut|FileGetSize|FileGetTime|FileGetVersion|FileInstall|FileMove|FileMoveDir|FileRead|FileReadLine|FileRecycle|FileRecycleEmpty|FileRemoveDir|FileSelectFile|FileSelectFolder|FileSetAttrib|FileSetTime|FormatTime|GetKeyState|Gosub|Goto|GroupActivate|GroupAdd|GroupClose|GroupDeactivate|Gui|GuiControl|GuiControlGet|Hotkey|ImageSearch|IniDelete|IniRead|IniWrite|Input|InputBox|KeyWait|ListHotkeys|ListLines|ListVars|Loop|Menu|MouseClick|MouseClickDrag|MouseGetPos|MouseMove|MsgBox|OnExit|OutputDebug|Pause|PixelGetColor|PixelSearch|PostMessage|Process|Progress|Random|RegDelete|RegRead|RegWrite|Reload|Repeat|Return|Run|RunAs|RunWait|Send|SendEvent|SendInput|SendMessage|SendMode|SendPlay|SendRaw|SetBatchLines|SetCapslockState|SetControlDelay|SetDefaultMouseSpeed|SetEnv|SetFormat|SetKeyDelay|SetMouseDelay|SetNumlockState|SetScrollLockState|SetStoreCapslockMode|SetTimer|SetTitleMatchMode|SetWinDelay|SetWorkingDir|Shutdown|Sleep|Sort|SoundBeep|SoundGet|SoundGetWaveVolume|SoundPlay|SoundSet|SoundSetWaveVolume|SplashImage|SplashTextOff|SplashTextOn|SplitPath|StatusBarGetText|StatusBarWait|StringCaseSense|StringGetPos|StringLeft|StringLen|StringLower|StringMid|StringReplace|StringRight|StringSplit|StringTrimLeft|StringTrimRight|StringUpper|Suspend|SysGet|Thread|ToolTip|Transform|TrayTip|URLDownloadToFile|WinActivate|WinActivateBottom|WinClose|WinGet|WinGetActiveStats|WinGetActiveTitle|WinGetClass|WinGetPos|WinGetText|WinGetTitle|WinHide|WinKill|WinMaximize|WinMenuSelectItem|WinMinimize|WinMinimizeAll|WinMinimizeAllUndo|WinMove|WinRestore|WinSet|WinSetTitle|WinShow|WinWait|WinWaitActive|WinWaitClose|WinWaitNotActive)\b/i,
    constant:
    /\b(?:a_ahkpath|a_ahkversion|a_appdata|a_appdatacommon|a_autotrim|a_batchlines|a_caretx|a_carety|a_computername|a_controldelay|a_cursor|a_dd|a_ddd|a_dddd|a_defaultmousespeed|a_desktop|a_desktopcommon|a_detecthiddentext|a_detecthiddenwindows|a_endchar|a_eventinfo|a_exitreason|a_formatfloat|a_formatinteger|a_gui|a_guievent|a_guicontrol|a_guicontrolevent|a_guiheight|a_guiwidth|a_guix|a_guiy|a_hour|a_iconfile|a_iconhidden|a_iconnumber|a_icontip|a_index|a_ipaddress1|a_ipaddress2|a_ipaddress3|a_ipaddress4|a_isadmin|a_iscompiled|a_iscritical|a_ispaused|a_issuspended|a_isunicode|a_keydelay|a_language|a_lasterror|a_linefile|a_linenumber|a_loopfield|a_loopfileattrib|a_loopfiledir|a_loopfileext|a_loopfilefullpath|a_loopfilelongpath|a_loopfilename|a_loopfileshortname|a_loopfileshortpath|a_loopfilesize|a_loopfilesizekb|a_loopfilesizemb|a_loopfiletimeaccessed|a_loopfiletimecreated|a_loopfiletimemodified|a_loopreadline|a_loopregkey|a_loopregname|a_loopregsubkey|a_loopregtimemodified|a_loopregtype|a_mday|a_min|a_mm|a_mmm|a_mmmm|a_mon|a_mousedelay|a_msec|a_mydocuments|a_now|a_nowutc|a_numbatchlines|a_ostype|a_osversion|a_priorhotkey|programfiles|a_programfiles|a_programs|a_programscommon|a_screenheight|a_screenwidth|a_scriptdir|a_scriptfullpath|a_scriptname|a_sec|a_space|a_startmenu|a_startmenucommon|a_startup|a_startupcommon|a_stringcasesense|a_tab|a_temp|a_thisfunc|a_thishotkey|a_thislabel|a_thismenu|a_thismenuitem|a_thismenuitempos|a_tickcount|a_timeidle|a_timeidlephysical|a_timesincepriorhotkey|a_timesincethishotkey|a_titlematchmode|a_titlematchmodespeed|a_username|a_wday|a_windelay|a_windir|a_workingdir|a_yday|a_year|a_yweek|a_yyyy|clipboard|clipboardall|comspec|errorlevel)\b/i,
    builtin:
    /\b(?:abs|acos|asc|asin|atan|ceil|chr|class|cos|dllcall|exp|fileexist|Fileopen|floor|il_add|il_create|il_destroy|instr|substr|isfunc|islabel|IsObject|ln|log|lv_add|lv_delete|lv_deletecol|lv_getcount|lv_getnext|lv_gettext|lv_insert|lv_insertcol|lv_modify|lv_modifycol|lv_setimagelist|mod|onmessage|numget|numput|registercallback|regexmatch|regexreplace|round|sin|tan|sqrt|strlen|sb_seticon|sb_setparts|sb_settext|strsplit|tv_add|tv_delete|tv_getchild|tv_getcount|tv_getnext|tv_get|tv_getparent|tv_getprev|tv_getselection|tv_gettext|tv_modify|varsetcapacity|winactive|winexist|__New|__Call|__Get|__Set)\b/i,
    symbol:
    /\b(?:alt|altdown|altup|appskey|backspace|browser_back|browser_favorites|browser_forward|browser_home|browser_refresh|browser_search|browser_stop|bs|capslock|ctrl|ctrlbreak|ctrldown|ctrlup|del|delete|down|end|enter|esc|escape|f1|f10|f11|f12|f13|f14|f15|f16|f17|f18|f19|f2|f20|f21|f22|f23|f24|f3|f4|f5|f6|f7|f8|f9|home|ins|insert|joy1|joy10|joy11|joy12|joy13|joy14|joy15|joy16|joy17|joy18|joy19|joy2|joy20|joy21|joy22|joy23|joy24|joy25|joy26|joy27|joy28|joy29|joy3|joy30|joy31|joy32|joy4|joy5|joy6|joy7|joy8|joy9|joyaxes|joybuttons|joyinfo|joyname|joypov|joyr|joyu|joyv|joyx|joyy|joyz|lalt|launch_app1|launch_app2|launch_mail|launch_media|lbutton|lcontrol|lctrl|left|lshift|lwin|lwindown|lwinup|mbutton|media_next|media_play_pause|media_prev|media_stop|numlock|numpad0|numpad1|numpad2|numpad3|numpad4|numpad5|numpad6|numpad7|numpad8|numpad9|numpadadd|numpadclear|numpaddel|numpaddiv|numpaddot|numpaddown|numpadend|numpadenter|numpadhome|numpadins|numpadleft|numpadmult|numpadpgdn|numpadpgup|numpadright|numpadsub|numpadup|pgdn|pgup|printscreen|ralt|rbutton|rcontrol|rctrl|right|rshift|rwin|rwindown|rwinup|scrolllock|shift|shiftdown|shiftup|space|tab|up|volume_down|volume_mute|volume_up|wheeldown|wheelleft|wheelright|wheelup|xbutton1|xbutton2)\b/i,
    important:
    /#\b(?:AllowSameLineComments|ClipboardTimeout|CommentFlag|ErrorStdOut|EscapeChar|HotkeyInterval|HotkeyModifierTimeout|Hotstring|IfWinActive|IfWinExist|IfWinNotActive|IfWinNotExist|Include|IncludeAgain|InstallKeybdHook|InstallMouseHook|KeyHistory|LTrim|MaxHotkeysPerInterval|MaxMem|MaxThreads|MaxThreadsBuffer|MaxThreadsPerHotkey|NoEnv|NoTrayIcon|Persistent|SingleInstance|UseHook|WinActivateForce)\b/i,
    keyword:
    /\b(?:Abort|AboveNormal|Add|ahk_class|ahk_group|ahk_id|ahk_pid|All|Alnum|Alpha|AltSubmit|AltTab|AltTabAndMenu|AltTabMenu|AltTabMenuDismiss|AlwaysOnTop|AutoSize|Background|BackgroundTrans|BelowNormal|between|BitAnd|BitNot|BitOr|BitShiftLeft|BitShiftRight|BitXOr|Bold|Border|Button|ByRef|Checkbox|Checked|CheckedGray|Choose|ChooseString|Close|Color|ComboBox|Contains|ControlList|Count|Date|DateTime|Days|DDL|Default|DeleteAll|Delimiter|Deref|Destroy|Digit|Disable|Disabled|DropDownList|Edit|Eject|Else|Enable|Enabled|Error|Exist|Expand|ExStyle|FileSystem|First|Flash|Float|FloatFast|Focus|Font|for|global|Grid|Group|GroupBox|GuiClose|GuiContextMenu|GuiDropFiles|GuiEscape|GuiSize|Hdr|Hidden|Hide|High|HKCC|HKCR|HKCU|HKEY_CLASSES_ROOT|HKEY_CURRENT_CONFIG|HKEY_CURRENT_USER|HKEY_LOCAL_MACHINE|HKEY_USERS|HKLM|HKU|Hours|HScroll|Icon|IconSmall|ID|IDLast|If|IfEqual|IfExist|IfGreater|IfGreaterOrEqual|IfInString|IfLess|IfLessOrEqual|IfMsgBox|IfNotEqual|IfNotExist|IfNotInString|IfWinActive|IfWinExist|IfWinNotActive|IfWinNotExist|Ignore|ImageList|in|Integer|IntegerFast|Interrupt|is|italic|Join|Label|LastFound|LastFoundExist|Limit|Lines|List|ListBox|ListView|local|Lock|Logoff|Low|Lower|Lowercase|MainWindow|Margin|Maximize|MaximizeBox|MaxSize|Minimize|MinimizeBox|MinMax|MinSize|Minutes|MonthCal|Mouse|Move|Multi|NA|No|NoActivate|NoDefault|NoHide|NoIcon|NoMainWindow|norm|Normal|NoSort|NoSortHdr|NoStandard|Not|NoTab|NoTimers|Number|Off|Ok|On|OwnDialogs|Owner|Parse|Password|Picture|Pixel|Pos|Pow|Priority|ProcessName|Radio|Range|Read|ReadOnly|Realtime|Redraw|REG_BINARY|REG_DWORD|REG_EXPAND_SZ|REG_MULTI_SZ|REG_SZ|Region|Relative|Rename|Report|Resize|Restore|Retry|RGB|Screen|Seconds|Section|Serial|SetLabel|ShiftAltTab|Show|Single|Slider|SortDesc|Standard|static|Status|StatusBar|StatusCD|strike|Style|Submit|SysMenu|Tab2|TabStop|Text|Theme|Tile|ToggleCheck|ToggleEnable|ToolWindow|Top|Topmost|TransColor|Transparent|Tray|TreeView|TryAgain|Type|UnCheck|underline|Unicode|Unlock|UpDown|Upper|Uppercase|UseErrorLevel|Vis|VisFirst|Visible|VScroll|Wait|WaitClose|WantCtrlA|WantF2|WantReturn|While|Wrap|Xdigit|xm|xp|xs|Yes|ym|yp|ys)\b/i,
}),
(Prism.languages.autoit = {
    comment: [
    /;.*/,
    {
        pattern:
        /(^\s*)#(?:comments-start|cs)[\s\S]*?^\s*#(?:comments-end|ce)/m,
        lookbehind: !0,
    },
    ],
    url: {
    pattern: /(^\s*#include\s+)(?:<[^\r\n>]+>|"[^\r\n"]+")/m,
    lookbehind: !0,
    },
    string: {
    pattern: /(["'])(?:\1\1|(?!\1)[^\r\n])*\1/,
    greedy: !0,
    inside: { variable: /([%$@])\w+\1/ },
    },
    directive: { pattern: /(^\s*)#\w+/m, lookbehind: !0, alias: "keyword" },
    function: /\b\w+(?=\()/,
    variable: /[$@]\w+/,
    keyword:
    /\b(?:Case|Const|Continue(?:Case|Loop)|Default|Dim|Do|Else(?:If)?|End(?:Func|If|Select|Switch|With)|Enum|Exit(?:Loop)?|For|Func|Global|If|In|Local|Next|Null|ReDim|Select|Static|Step|Switch|Then|To|Until|Volatile|WEnd|While|With)\b/i,
    number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/i,
    boolean: /\b(?:True|False)\b/i,
    operator: /<[=>]?|[-+*\/=&>]=?|[?^]|\b(?:And|Or|Not)\b/i,
    punctuation: /[\[\]().,:]/,
}),
!(function (a) {
    var b =
        "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",
    c = {
        environment: { pattern: RegExp("\\$" + b), alias: "constant" },
        variable: [
        {
            pattern: /\$?\(\([\s\S]+?\)\)/,
            greedy: !0,
            inside: {
            variable: [
                { pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 },
                /^\$\(\(/,
            ],
            number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
            operator:
                /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
            punctuation: /\(\(?|\)\)?|,|;/,
            },
        },
        {
            pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
            greedy: !0,
            inside: { variable: /^\$\(|^`|\)$|`$/ },
        },
        {
            pattern: /\$\{[^}]+\}/,
            greedy: !0,
            inside: {
            operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
            punctuation: /[\[\]]/,
            environment: {
                pattern: RegExp("(\\{)" + b),
                lookbehind: !0,
                alias: "constant",
            },
            },
        },
        /\$(?:\w+|[#?*!@$])/,
        ],
        entity:
        /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/,
    },
    e,
    f,
    d;
    a.languages.bash = {
    shebang: { pattern: /^#!\s*\/.*/, alias: "important" },
    comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: !0 },
    "function-name": [
        {
        pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,
        lookbehind: !0,
        alias: "function",
        },
        { pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/, alias: "function" },
    ],
    "for-or-select": {
        pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
        alias: "variable",
        lookbehind: !0,
    },
    "assign-left": {
        pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
        inside: {
        environment: {
            pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + b),
            lookbehind: !0,
            alias: "constant",
        },
        },
        alias: "variable",
        lookbehind: !0,
    },
    string: [
        {
        pattern:
            /((?:^|[^<])<<-?\s*)(\w+?)\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\2/,
        lookbehind: !0,
        greedy: !0,
        inside: c,
        },
        {
        pattern:
            /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\3/,
        lookbehind: !0,
        greedy: !0,
        },
        {
        pattern:
            /(^|[^\\](?:\\\\)*)(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\2)[^\\])*\2/,
        lookbehind: !0,
        greedy: !0,
        inside: c,
        },
    ],
    environment: { pattern: RegExp("\\$?" + b), alias: "constant" },
    variable: c.variable,
    function: {
        pattern:
        /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
        lookbehind: !0,
    },
    keyword: {
        pattern:
        /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
        lookbehind: !0,
    },
    builtin: {
        pattern:
        /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
        lookbehind: !0,
        alias: "class-name",
    },
    boolean: {
        pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
        lookbehind: !0,
    },
    "file-descriptor": { pattern: /\B&\d\b/, alias: "important" },
    operator: {
        pattern:
        /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,
        inside: { "file-descriptor": { pattern: /^\d/, alias: "important" } },
    },
    punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
    number: { pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/, lookbehind: !0 },
    };
    for (
    e = [
        "comment",
        "function-name",
        "for-or-select",
        "assign-left",
        "string",
        "environment",
        "function",
        "keyword",
        "builtin",
        "boolean",
        "file-descriptor",
        "operator",
        "punctuation",
        "number",
    ],
        f = c.variable[1].inside,
        d = 0;
    d < e.length;
    d++
    )
    f[e[d]] = a.languages.bash[e[d]];
    a.languages.shell = a.languages.bash;
})(Prism),
(Prism.languages.basic = {
    comment: { pattern: /(?:!|REM\b).+/i, inside: { keyword: /^REM/i } },
    string: {
    pattern: /"(?:""|[!#$%&'()*,\/:;<=>?^_ +\-.A-Z\d])*"/i,
    greedy: !0,
    },
    number: /(?:\b\d+\.?\d*|\B\.\d+)(?:E[+-]?\d+)?/i,
    keyword:
    /\b(?:AS|BEEP|BLOAD|BSAVE|CALL(?: ABSOLUTE)?|CASE|CHAIN|CHDIR|CLEAR|CLOSE|CLS|COM|COMMON|CONST|DATA|DECLARE|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DIM|DO|DOUBLE|ELSE|ELSEIF|END|ENVIRON|ERASE|ERROR|EXIT|FIELD|FILES|FOR|FUNCTION|GET|GOSUB|GOTO|IF|INPUT|INTEGER|IOCTL|KEY|KILL|LINE INPUT|LOCATE|LOCK|LONG|LOOP|LSET|MKDIR|NAME|NEXT|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPEN|OPTION BASE|OUT|POKE|PUT|READ|REDIM|REM|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SHARED|SINGLE|SELECT CASE|SHELL|SLEEP|STATIC|STEP|STOP|STRING|SUB|SWAP|SYSTEM|THEN|TIMER|TO|TROFF|TRON|TYPE|UNLOCK|UNTIL|USING|VIEW PRINT|WAIT|WEND|WHILE|WRITE)(?:\$|\b)/i,
    function:
    /\b(?:ABS|ACCESS|ACOS|ANGLE|AREA|ARITHMETIC|ARRAY|ASIN|ASK|AT|ATN|BASE|BEGIN|BREAK|CAUSE|CEIL|CHR|CLIP|COLLATE|COLOR|CON|COS|COSH|COT|CSC|DATE|DATUM|DEBUG|DECIMAL|DEF|DEG|DEGREES|DELETE|DET|DEVICE|DISPLAY|DOT|ELAPSED|EPS|ERASABLE|EXLINE|EXP|EXTERNAL|EXTYPE|FILETYPE|FIXED|FP|GO|GRAPH|HANDLER|IDN|IMAGE|IN|INT|INTERNAL|IP|IS|KEYED|LBOUND|LCASE|LEFT|LEN|LENGTH|LET|LINE|LINES|LOG|LOG10|LOG2|LTRIM|MARGIN|MAT|MAX|MAXNUM|MID|MIN|MISSING|MOD|NATIVE|NUL|NUMERIC|OF|OPTION|ORD|ORGANIZATION|OUTIN|OUTPUT|PI|POINT|POINTER|POINTS|POS|PRINT|PROGRAM|PROMPT|RAD|RADIANS|RANDOMIZE|RECORD|RECSIZE|RECTYPE|RELATIVE|REMAINDER|REPEAT|REST|RETRY|REWRITE|RIGHT|RND|ROUND|RTRIM|SAME|SEC|SELECT|SEQUENTIAL|SET|SETTER|SGN|SIN|SINH|SIZE|SKIP|SQR|STANDARD|STATUS|STR|STREAM|STYLE|TAB|TAN|TANH|TEMPLATE|TEXT|THERE|TIME|TIMEOUT|TRACE|TRANSFORM|TRUNCATE|UBOUND|UCASE|USE|VAL|VARIABLE|VIEWPORT|WHEN|WINDOW|WITH|ZER|ZONEWIDTH)(?:\$|\b)/i,
    operator: /<[=>]?|>=?|[+\-*\/^=&]|\b(?:AND|EQV|IMP|NOT|OR|XOR)\b/i,
    punctuation: /[,;:()]/,
}),
!(function (e) {
    var a = /%%?[~:\w]+%?|!\S+!/,
    b = {
        pattern: /\/[a-z?]+(?=[ :]|$):?|-[a-z]\b|--[a-z-]+\b/im,
        alias: "attr-name",
        inside: { punctuation: /:/ },
    },
    c = /"[^"]*"/,
    d = /(?:\b|-)\d+\b/;
    Prism.languages.batch = {
    comment: [
        /^::.*/m,
        {
        pattern: /((?:^|[&(])[ \t]*)rem\b(?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
        lookbehind: !0,
        },
    ],
    label: { pattern: /^:.*/m, alias: "property" },
    command: [
        {
        pattern:
            /((?:^|[&(])[ \t]*)for(?: ?\/[a-z?](?:[ :](?:"[^"]*"|\S+))?)* \S+ in \([^)]+\) do/im,
        lookbehind: !0,
        inside: {
            keyword: /^for\b|\b(?:in|do)\b/i,
            string: c,
            parameter: b,
            variable: a,
            number: d,
            punctuation: /[()',]/,
        },
        },
        {
        pattern:
            /((?:^|[&(])[ \t]*)if(?: ?\/[a-z?](?:[ :](?:"[^"]*"|\S+))?)* (?:not )?(?:cmdextversion \d+|defined \w+|errorlevel \d+|exist \S+|(?:"[^"]*"|\S+)?(?:==| (?:equ|neq|lss|leq|gtr|geq) )(?:"[^"]*"|\S+))/im,
        lookbehind: !0,
        inside: {
            keyword:
            /^if\b|\b(?:not|cmdextversion|defined|errorlevel|exist)\b/i,
            string: c,
            parameter: b,
            variable: a,
            number: d,
            operator: /\^|==|\b(?:equ|neq|lss|leq|gtr|geq)\b/i,
        },
        },
        {
        pattern: /((?:^|[&()])[ \t]*)else\b/im,
        lookbehind: !0,
        inside: { keyword: /^else\b/i },
        },
        {
        pattern:
            /((?:^|[&(])[ \t]*)set(?: ?\/[a-z](?:[ :](?:"[^"]*"|\S+))?)* (?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
        lookbehind: !0,
        inside: {
            keyword: /^set\b/i,
            string: c,
            parameter: b,
            variable: [a, /\w+(?=(?:[*\/%+\-&^|]|<<|>>)?=)/],
            number: d,
            operator: /[*\/%+\-&^|]=?|<<=?|>>=?|[!~_=]/,
            punctuation: /[()',]/,
        },
        },
        {
        pattern:
            /((?:^|[&(])[ \t]*@?)\w+\b(?:[^^&)\r\n]|\^(?:\r\n|[\s\S]))*/im,
        lookbehind: !0,
        inside: {
            keyword: /^\w+\b/i,
            string: c,
            parameter: b,
            label: {
            pattern: /(^\s*):\S+/m,
            lookbehind: !0,
            alias: "property",
            },
            variable: a,
            number: d,
            operator: /\^/,
        },
        },
    ],
    operator: /[&@]/,
    punctuation: /[()']/,
    };
})(),
(Prism.languages.bison = Prism.languages.extend("c", {})),
Prism.languages.insertBefore("bison", "comment", {
    bison: {
    pattern: /^[\s\S]*?%%[\s\S]*?%%/,
    inside: {
        c: {
        pattern: /%\{[\s\S]*?%\}|\{(?:\{[^}]*\}|[^{}])*\}/,
        inside: {
            delimiter: { pattern: /^%?\{|%?\}$/, alias: "punctuation" },
            "bison-variable": {
            pattern: /[$@](?:<[^\s>]+>)?[\w$]+/,
            alias: "variable",
            inside: { punctuation: /<|>/ },
            },
            rest: Prism.languages.c,
        },
        },
        comment: Prism.languages.c.comment,
        string: Prism.languages.c.string,
        property: /\S+(?=:)/,
        keyword: /%\w+/,
        number: { pattern: /(^|[^@])\b(?:0x[\da-f]+|\d+)/i, lookbehind: !0 },
        punctuation: /%[%?]|[|:;\[\]<>]/,
    },
    },
}),
(Prism.languages.brainfuck = {
    pointer: { pattern: /<|>/, alias: "keyword" },
    increment: { pattern: /\+/, alias: "inserted" },
    decrement: { pattern: /-/, alias: "deleted" },
    branching: { pattern: /\[|\]/, alias: "important" },
    operator: /[.,]/,
    comment: /\S+/,
}),
(Prism.languages.bro = {
    comment: {
    pattern: /(^|[^\\$])#.*/,
    lookbehind: !0,
    inside: { italic: /\b(?:TODO|FIXME|XXX)\b/ },
    },
    string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
    },
    boolean: /\b[TF]\b/,
    function: {
    pattern: /(?:function|hook|event) \w+(?:::\w+)?/,
    inside: { keyword: /^(?:function|hook|event)/ },
    },
    variable: {
    pattern: /(?:global|local) \w+/i,
    inside: { keyword: /(?:global|local)/ },
    },
    builtin:
    /(?:@(?:load(?:-(?:sigs|plugin))?|unload|prefixes|ifn?def|else|(?:end)?if|DIR|FILENAME))|(?:&?(?:redef|priority|log|optional|default|add_func|delete_func|expire_func|read_expire|write_expire|create_expire|synchronized|persistent|rotate_interval|rotate_size|encrypt|raw_output|mergeable|group|error_handler|type_column))/,
    constant: { pattern: /const \w+/i, inside: { keyword: /const/ } },
    keyword:
    /\b(?:break|next|continue|alarm|using|of|add|delete|export|print|return|schedule|when|timeout|addr|any|bool|count|double|enum|file|int|interval|pattern|opaque|port|record|set|string|subnet|table|time|vector|for|if|else|in|module|function)\b/,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&|\|\|?|\?|\*|\/|~|\^|%/,
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    punctuation: /[{}[\];(),.:]/,
}),
(Prism.languages.cil = {
    comment: /\/\/.*/,
    string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
    },
    directive: {
    pattern: /(^|\W)\.[a-z]+(?=\s)/,
    lookbehind: !0,
    alias: "class-name",
    },
    variable: /\[[\w\.]+\]/,
    keyword:
    /\b(?:abstract|ansi|assembly|auto|autochar|beforefieldinit|bool|bstr|byvalstr|catch|char|cil|class|currency|date|decimal|default|enum|error|explicit|extends|extern|famandassem|family|famorassem|final(?:ly)?|float32|float64|hidebysig|iant|idispatch|implements|import|initonly|instance|u?int(?:8|16|32|64)?|interface|iunknown|literal|lpstr|lpstruct|lptstr|lpwstr|managed|method|native(?:Type)?|nested|newslot|object(?:ref)?|pinvokeimpl|private|privatescope|public|reqsecobj|rtspecialname|runtime|sealed|sequential|serializable|specialname|static|string|struct|syschar|tbstr|unicode|unmanagedexp|unsigned|value(?:type)?|variant|virtual|void)\b/,
    function:
    /\b(?:(?:constrained|unaligned|volatile|readonly|tail|no)\.)?(?:conv\.(?:[iu][1248]?|ovf\.[iu][1248]?(?:\.un)?|r\.un|r4|r8)|ldc\.(?:i4(?:\.[0-9]+|\.[mM]1|\.s)?|i8|r4|r8)|ldelem(?:\.[iu][1248]?|\.r[48]|\.ref|a)?|ldind\.(?:[iu][1248]?|r[48]|ref)|stelem\.?(?:i[1248]?|r[48]|ref)?|stind\.(?:i[1248]?|r[48]|ref)?|end(?:fault|filter|finally)|ldarg(?:\.[0-3s]|a(?:\.s)?)?|ldloc(?:\.[0-9]+|\.s)?|sub(?:\.ovf(?:\.un)?)?|mul(?:\.ovf(?:\.un)?)?|add(?:\.ovf(?:\.un)?)?|stloc(?:\.[0-3s])?|refany(?:type|val)|blt(?:\.un)?(?:\.s)?|ble(?:\.un)?(?:\.s)?|bgt(?:\.un)?(?:\.s)?|bge(?:\.un)?(?:\.s)?|unbox(?:\.any)?|init(?:blk|obj)|call(?:i|virt)?|brfalse(?:\.s)?|bne\.un(?:\.s)?|ldloca(?:\.s)?|brzero(?:\.s)?|brtrue(?:\.s)?|brnull(?:\.s)?|brinst(?:\.s)?|starg(?:\.s)?|leave(?:\.s)?|shr(?:\.un)?|rem(?:\.un)?|div(?:\.un)?|clt(?:\.un)?|alignment|ldvirtftn|castclass|beq(?:\.s)?|mkrefany|localloc|ckfinite|rethrow|ldtoken|ldsflda|cgt\.un|arglist|switch|stsfld|sizeof|newobj|newarr|ldsfld|ldnull|ldflda|isinst|throw|stobj|stloc|stfld|ldstr|ldobj|ldlen|ldftn|ldfld|cpobj|cpblk|break|br\.s|xor|shl|ret|pop|not|nop|neg|jmp|dup|clt|cgt|ceq|box|and|or|br)\b/,
    boolean: /\b(?:true|false)\b/,
    number: /\b-?(?:0x[0-9a-fA-F]+|[0-9]+)(?:\.[0-9a-fA-F]+)?\b/i,
    punctuation: /[{}[\];(),:=]|IL_[0-9A-Za-z]+/,
}),
!(function (a) {
    var c = /#(?!\{).+/,
    b = { pattern: /#\{[^}]+\}/, alias: "variable" };
    (a.languages.coffeescript = a.languages.extend("javascript", {
    comment: c,
    string: [
        { pattern: /'(?:\\[\s\S]|[^\\'])*'/, greedy: !0 },
        {
        pattern: /"(?:\\[\s\S]|[^\\"])*"/,
        greedy: !0,
        inside: { interpolation: b },
        },
    ],
    keyword:
        /\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,
    "class-member": { pattern: /@(?!\d)\w+/, alias: "variable" },
    })),
    a.languages.insertBefore("coffeescript", "comment", {
        "multiline-comment": { pattern: /###[\s\S]+?###/, alias: "comment" },
        "block-regex": {
        pattern: /\/{3}[\s\S]*?\/{3}/,
        alias: "regex",
        inside: { comment: c, interpolation: b },
        },
    }),
    a.languages.insertBefore("coffeescript", "string", {
        "inline-javascript": {
        pattern: /`(?:\\[\s\S]|[^\\`])*`/,
        inside: {
            delimiter: { pattern: /^`|`$/, alias: "punctuation" },
            rest: a.languages.javascript,
        },
        },
        "multiline-string": [
        { pattern: /'''[\s\S]*?'''/, greedy: !0, alias: "string" },
        {
            pattern: /"""[\s\S]*?"""/,
            greedy: !0,
            alias: "string",
            inside: { interpolation: b },
        },
        ],
    }),
    a.languages.insertBefore("coffeescript", "keyword", {
        property: /(?!\d)\w+(?=\s*:(?!:))/,
    }),
    delete a.languages.coffeescript["template-string"],
    (a.languages.coffee = a.languages.coffeescript);
})(Prism),
(Prism.languages.clojure = {
    comment: /;.*/,
    string: { pattern: /"(?:[^"\\]|\\.)*"/, greedy: !0 },
    operator: /(?:::|[:|'])\b[a-z][\w*+!?-]*\b/i,
    keyword: {
    pattern:
        /([^\w+*'?-])(?:def|if|do|let|\.\.|quote|var|->>|->|fn|loop|recur|throw|try|monitor-enter|\.|new|set!|def\-|defn|defn\-|defmacro|defmulti|defmethod|defstruct|defonce|declare|definline|definterface|defprotocol|==|defrecord|>=|deftype|<=|defproject|ns|\*|\+|\-|\/|<|=|>|accessor|agent|agent-errors|aget|alength|all-ns|alter|and|append-child|apply|array-map|aset|aset-boolean|aset-byte|aset-char|aset-double|aset-float|aset-int|aset-long|aset-short|assert|assoc|await|await-for|bean|binding|bit-and|bit-not|bit-or|bit-shift-left|bit-shift-right|bit-xor|boolean|branch\?|butlast|byte|cast|char|children|class|clear-agent-errors|comment|commute|comp|comparator|complement|concat|conj|cons|constantly|cond|if-not|construct-proxy|contains\?|count|create-ns|create-struct|cycle|dec|deref|difference|disj|dissoc|distinct|doall|doc|dorun|doseq|dosync|dotimes|doto|double|down|drop|drop-while|edit|end\?|ensure|eval|every\?|false\?|ffirst|file-seq|filter|find|find-doc|find-ns|find-var|first|float|flush|for|fnseq|frest|gensym|get-proxy-class|get|hash-map|hash-set|identical\?|identity|if-let|import|in-ns|inc|index|insert-child|insert-left|insert-right|inspect-table|inspect-tree|instance\?|int|interleave|intersection|into|into-array|iterate|join|key|keys|keyword|keyword\?|last|lazy-cat|lazy-cons|left|lefts|line-seq|list\*|list|load|load-file|locking|long|loop|macroexpand|macroexpand-1|make-array|make-node|map|map-invert|map\?|mapcat|max|max-key|memfn|merge|merge-with|meta|min|min-key|name|namespace|neg\?|new|newline|next|nil\?|node|not|not-any\?|not-every\?|not=|ns-imports|ns-interns|ns-map|ns-name|ns-publics|ns-refers|ns-resolve|ns-unmap|nth|nthrest|or|parse|partial|path|peek|pop|pos\?|pr|pr-str|print|print-str|println|println-str|prn|prn-str|project|proxy|proxy-mappings|quot|rand|rand-int|range|re-find|re-groups|re-matcher|re-matches|re-pattern|re-seq|read|read-line|reduce|ref|ref-set|refer|rem|remove|remove-method|remove-ns|rename|rename-keys|repeat|replace|replicate|resolve|rest|resultset-seq|reverse|rfirst|right|rights|root|rrest|rseq|second|select|select-keys|send|send-off|seq|seq-zip|seq\?|set|short|slurp|some|sort|sort-by|sorted-map|sorted-map-by|sorted-set|special-symbol\?|split-at|split-with|str|string\?|struct|struct-map|subs|subvec|symbol|symbol\?|sync|take|take-nth|take-while|test|time|to-array|to-array-2d|tree-seq|true\?|union|up|update-proxy|val|vals|var-get|var-set|var\?|vector|vector-zip|vector\?|when|when-first|when-let|when-not|with-local-vars|with-meta|with-open|with-out-str|xml-seq|xml-zip|zero\?|zipmap|zipper)(?=[^\w+*'?-])/,
    lookbehind: !0,
    },
    boolean: /\b(?:true|false|nil)\b/,
    number: /\b[\da-f]+\b/i,
    punctuation: /[{}\[\](),]/,
}),
!(function (b) {
    b.languages.ruby = b.languages.extend("clike", {
    comment: [/#.*/, { pattern: /^=begin\s[\s\S]*?^=end/m, greedy: !0 }],
    "class-name": {
        pattern: /(\b(?:class)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: !0,
        inside: { punctuation: /[.\\]/ },
    },
    keyword:
        /\b(?:alias|and|BEGIN|begin|break|case|class|def|define_method|defined|do|each|else|elsif|END|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|protected|private|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/,
    });
    var a = {
    pattern: /#\{[^}]+\}/,
    inside: {
        delimiter: { pattern: /^#\{|\}$/, alias: "tag" },
        rest: b.languages.ruby,
    },
    };
    delete b.languages.ruby.function,
    b.languages.insertBefore("ruby", "keyword", {
        regex: [
        {
            pattern:
            /%r([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[gim]{0,3}/,
            greedy: !0,
            inside: { interpolation: a },
        },
        {
            pattern: /%r\((?:[^()\\]|\\[\s\S])*\)[gim]{0,3}/,
            greedy: !0,
            inside: { interpolation: a },
        },
        {
            pattern: /%r\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}[gim]{0,3}/,
            greedy: !0,
            inside: { interpolation: a },
        },
        {
            pattern: /%r\[(?:[^\[\]\\]|\\[\s\S])*\][gim]{0,3}/,
            greedy: !0,
            inside: { interpolation: a },
        },
        {
            pattern: /%r<(?:[^<>\\]|\\[\s\S])*>[gim]{0,3}/,
            greedy: !0,
            inside: { interpolation: a },
        },
        {
            pattern:
            /(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[gim]{0,3}(?=\s*(?:$|[\r\n,.;})]))/,
            lookbehind: !0,
            greedy: !0,
        },
        ],
        variable: /[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,
        symbol: { pattern: /(^|[^:]):[a-zA-Z_]\w*(?:[?!]|\b)/, lookbehind: !0 },
        "method-definition": {
        pattern: /(\bdef\s+)[\w.]+/,
        lookbehind: !0,
        inside: { function: /\w+$/, rest: b.languages.ruby },
        },
    }),
    b.languages.insertBefore("ruby", "number", {
        builtin:
        /\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Stat|Fixnum|Float|Hash|Integer|IO|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|String|Struct|TMS|Symbol|ThreadGroup|Thread|Time|TrueClass)\b/,
        constant: /\b[A-Z]\w*(?:[?!]|\b)/,
    }),
    (b.languages.ruby.string = [
        {
        pattern:
            /%[qQiIwWxs]?([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
        greedy: !0,
        inside: { interpolation: a },
        },
        {
        pattern: /%[qQiIwWxs]?\((?:[^()\\]|\\[\s\S])*\)/,
        greedy: !0,
        inside: { interpolation: a },
        },
        {
        pattern: /%[qQiIwWxs]?\{(?:[^#{}\\]|#(?:\{[^}]+\})?|\\[\s\S])*\}/,
        greedy: !0,
        inside: { interpolation: a },
        },
        {
        pattern: /%[qQiIwWxs]?\[(?:[^\[\]\\]|\\[\s\S])*\]/,
        greedy: !0,
        inside: { interpolation: a },
        },
        {
        pattern: /%[qQiIwWxs]?<(?:[^<>\\]|\\[\s\S])*>/,
        greedy: !0,
        inside: { interpolation: a },
        },
        {
        pattern: /("|')(?:#\{[^}]+\}|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0,
        inside: { interpolation: a },
        },
    ]),
    (b.languages.rb = b.languages.ruby);
})(Prism),
!(function (a) {
    (a.languages.crystal = a.languages.extend("ruby", {
    keyword: [
        /\b(?:abstract|alias|as|asm|begin|break|case|class|def|do|else|elsif|end|ensure|enum|extend|for|fun|if|include|instance_sizeof|lib|macro|module|next|of|out|pointerof|private|protected|rescue|return|require|select|self|sizeof|struct|super|then|type|typeof|uninitialized|union|unless|until|when|while|with|yield|__DIR__|__END_LINE__|__FILE__|__LINE__)\b/,
        { pattern: /(\.\s*)(?:is_a|responds_to)\?/, lookbehind: !0 },
    ],
    number:
        /\b(?:0b[01_]*[01]|0o[0-7_]*[0-7]|0x[\da-fA-F_]*[\da-fA-F]|(?:\d(?:[\d_]*\d)?)(?:\.[\d_]*\d)?(?:[eE][+-]?[\d_]*\d)?)(?:_(?:[uif](?:8|16|32|64))?)?\b/,
    })),
    a.languages.insertBefore("crystal", "string", {
        attribute: {
        pattern: /@\[.+?\]/,
        alias: "attr-name",
        inside: {
            delimiter: { pattern: /^@\[|\]$/, alias: "tag" },
            rest: a.languages.crystal,
        },
        },
        expansion: [
        {
            pattern: /\{\{.+?\}\}/,
            inside: {
            delimiter: { pattern: /^\{\{|\}\}$/, alias: "tag" },
            rest: a.languages.crystal,
            },
        },
        {
            pattern: /\{%.+?%\}/,
            inside: {
            delimiter: { pattern: /^\{%|%\}$/, alias: "tag" },
            rest: a.languages.crystal,
            },
        },
        ],
    });
})(Prism),
(Prism.languages.csp = {
    directive: {
    pattern:
        /\b(?:(?:base-uri|form-action|frame-ancestors|plugin-types|referrer|reflected-xss|report-to|report-uri|require-sri-for|sandbox) |(?:block-all-mixed-content|disown-opener|upgrade-insecure-requests)(?: |;)|(?:child|connect|default|font|frame|img|manifest|media|object|script|style|worker)-src )/i,
    alias: "keyword",
    },
    safe: {
    pattern:
        /'(?:self|none|strict-dynamic|(?:nonce-|sha(?:256|384|512)-)[a-zA-Z\d+=/]+)'/,
    alias: "selector",
    },
    unsafe: {
    pattern:
        /(?:'unsafe-inline'|'unsafe-eval'|'unsafe-hashed-attributes'|\*)/,
    alias: "function",
    },
}),
!(function (a) {
    var b,
    c = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    d,
    e;
    (a.languages.css.selector = {
    pattern: a.languages.css.selector,
    inside: (b = {
        "pseudo-element":
        /:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,
        "pseudo-class": /:[-\w]+/,
        class: /\.[-:.\w]+/,
        id: /#[-:.\w]+/,
        attribute: {
        pattern: RegExp("\\[(?:[^[\\]\"']|" + c.source + ")*\\]"),
        greedy: !0,
        inside: {
            punctuation: /^\[|\]$/,
            "case-sensitivity": {
            pattern: /(\s)[si]$/i,
            lookbehind: !0,
            alias: "keyword",
            },
            namespace: {
            pattern: /^(\s*)[-*\w\xA0-\uFFFF]*\|(?!=)/,
            lookbehind: !0,
            inside: { punctuation: /\|$/ },
            },
            attribute: { pattern: /^(\s*)[-\w\xA0-\uFFFF]+/, lookbehind: !0 },
            value: [
            c,
            { pattern: /(=\s*)[-\w\xA0-\uFFFF]+(?=\s*$)/, lookbehind: !0 },
            ],
            operator: /[|~*^$]?=/,
        },
        },
        "n-th": [
        {
            pattern: /(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,
            lookbehind: !0,
            inside: { number: /[\dn]+/, operator: /[+-]/ },
        },
        { pattern: /(\(\s*)(?:even|odd)(?=\s*\))/i, lookbehind: !0 },
        ],
        punctuation: /[()]/,
    }),
    }),
    (a.languages.css.atrule.inside["selector-function-argument"].inside = b),
    a.languages.insertBefore("css", "property", {
        variable: {
        pattern:
            /(^|[^-\w\xA0-\uFFFF])--[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*/i,
        lookbehind: !0,
        },
    }),
    (d = { pattern: /(\d)(?:%|[a-z]+)/, lookbehind: !0 }),
    (e = { pattern: /(^|[^\w.-])-?\d*\.?\d+/, lookbehind: !0 }),
    a.languages.insertBefore("css", "function", {
        operator: { pattern: /(\s)[+\-*\/](?=\s)/, lookbehind: !0 },
        hexcode: { pattern: /\B#(?:[\da-f]{1,2}){3,4}\b/i, alias: "color" },
        color: [
        /\b(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)\b/i,
        {
            pattern:
            /\b(?:rgb|hsl)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:rgb|hsl)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,
            inside: {
            unit: d,
            number: e,
            function: /[\w-]+(?=\()/,
            punctuation: /[(),]/,
            },
        },
        ],
        entity: /\\[\da-f]{1,8}/i,
        unit: d,
        number: e,
    });
})(Prism),
(Prism.languages.d = Prism.languages.extend("clike", {
    comment: [
    { pattern: /^\s*#!.+/, greedy: !0 },
    {
        pattern: RegExp(
        "(^|[^\\\\])(?:" +
            [
            "/\\+(?:/\\+[^]*?\\+/|(?!/\\+)[^])*?\\+/",
            "//.*",
            "/\\*[^]*?\\*/",
            ].join("|") +
            ")"
        ),
        lookbehind: !0,
        greedy: !0,
    },
    ],
    string: [
    {
        pattern: RegExp(
        [
            '\\b[rx]"(?:\\\\[^]|[^\\\\"])*"[cwd]?',
            '\\bq"(?:\\[[^]*?\\]|\\([^]*?\\)|<[^]*?>|\\{[^]*?\\})"',
            '\\bq"((?!\\d)\\w+)$[^]*?^\\1"',
            '\\bq"(.)[^]*?\\2"',
            "'(?:\\\\(?:\\W|\\w+)|[^\\\\])'",
            '(["`])(?:\\\\[^]|(?!\\3)[^\\\\])*\\3[cwd]?',
        ].join("|"),
        "m"
        ),
        greedy: !0,
    },
    {
        pattern: /\bq\{(?:\{[^{}]*\}|[^{}])*\}/,
        greedy: !0,
        alias: "token-string",
    },
    ],
    number: [
    /\b0x\.?[a-f\d_]+(?:(?!\.\.)\.[a-f\d_]*)?(?:p[+-]?[a-f\d_]+)?[ulfi]*/i,
    {
        pattern:
        /((?:\.\.)?)(?:\b0b\.?|\b|\.)\d[\d_]*(?:(?!\.\.)\.[\d_]*)?(?:e[+-]?\d[\d_]*)?[ulfi]*/i,
        lookbehind: !0,
    },
    ],
    keyword:
    /\$|\b(?:abstract|alias|align|asm|assert|auto|body|bool|break|byte|case|cast|catch|cdouble|cent|cfloat|char|class|const|continue|creal|dchar|debug|default|delegate|delete|deprecated|do|double|else|enum|export|extern|false|final|finally|float|for|foreach|foreach_reverse|function|goto|idouble|if|ifloat|immutable|import|inout|int|interface|invariant|ireal|lazy|long|macro|mixin|module|new|nothrow|null|out|override|package|pragma|private|protected|public|pure|real|ref|return|scope|shared|short|static|struct|super|switch|synchronized|template|this|throw|true|try|typedef|typeid|typeof|ubyte|ucent|uint|ulong|union|unittest|ushort|version|void|volatile|wchar|while|with|__(?:(?:FILE|MODULE|LINE|FUNCTION|PRETTY_FUNCTION|DATE|EOF|TIME|TIMESTAMP|VENDOR|VERSION)__|gshared|traits|vector|parameters)|string|wstring|dstring|size_t|ptrdiff_t)\b/,
    operator:
    /\|[|=]?|&[&=]?|\+[+=]?|-[-=]?|\.?\.\.|=[>=]?|!(?:i[ns]\b|<>?=?|>=?|=)?|\bi[ns]\b|(?:<[<>]?|>>?>?|\^\^|[*\/%^~])=?/,
})),
Prism.languages.insertBefore("d", "keyword", { property: /\B@\w*/ }),
Prism.languages.insertBefore("d", "function", {
    register: {
    pattern:
        /\b(?:[ABCD][LHX]|E[ABCD]X|E?(?:BP|SP|DI|SI)|[ECSDGF]S|CR[0234]|DR[012367]|TR[3-7]|X?MM[0-7]|R[ABCD]X|[BS]PL|R[BS]P|[DS]IL|R[DS]I|R(?:[89]|1[0-5])[BWD]?|XMM(?:[89]|1[0-5])|YMM(?:1[0-5]|\d))\b|\bST(?:\([0-7]\)|\b)/,
    alias: "variable",
    },
}),
(Prism.languages.dart = Prism.languages.extend("clike", {
    string: [
    { pattern: /r?("""|''')[\s\S]*?\1/, greedy: !0 },
    { pattern: /r?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
    ],
    keyword: [
    /\b(?:async|sync|yield)\*/,
    /\b(?:abstract|assert|async|await|break|case|catch|class|const|continue|default|deferred|do|dynamic|else|enum|export|external|extends|factory|final|finally|for|get|if|implements|import|in|library|new|null|operator|part|rethrow|return|set|static|super|switch|this|throw|try|typedef|var|void|while|with|yield)\b/,
    ],
    operator:
    /\bis!|\b(?:as|is)\b|\+\+|--|&&|\|\||<<=?|>>=?|~(?:\/=?)?|[+\-*\/%&^|=!<>]=?|\?/,
})),
Prism.languages.insertBefore("dart", "function", {
    metadata: { pattern: /@\w+/, alias: "symbol" },
}),
!(function (a) {
    a.languages.diff = {
    coord: [/^(?:\*{3}|-{3}|\+{3}).*$/m, /^@@.*@@$/m, /^\d+.*$/m],
    };
    var b = {
    "deleted-sign": "-",
    "deleted-arrow": "<",
    "inserted-sign": "+",
    "inserted-arrow": ">",
    unchanged: " ",
    diff: "!",
    };
    Object.keys(b).forEach(function (c) {
    var e = b[c],
        d = [];
    /^\w+$/.test(c) || d.push(/\w+/.exec(c)[0]),
        "diff" === c && d.push("bold"),
        (a.languages.diff[c] = {
        pattern: RegExp("^(?:[" + e + "].*(?:\r\n?|\n|(?![\\s\\S])))+", "m"),
        alias: d,
        inside: {
            line: { pattern: /(.)(?=[\s\S]).*(?:\r\n?|\n)?/, lookbehind: !0 },
            prefix: { pattern: /[\s\S]/, alias: /\w+/.exec(c)[0] },
        },
        });
    }),
    Object.defineProperty(a.languages.diff, "PREFIXES", { value: b });
})(Prism),
!(function (a) {
    function b(a, b) {
    return "___" + a.toUpperCase() + b + "___";
    }
    Object.defineProperties((a.languages["markup-templating"] = {}), {
    buildPlaceholders: {
        value: function (c, d, g, e) {
        if (c.language === d) {
            var f = (c.tokenStack = []);
            (c.code = c.code.replace(g, function (a) {
            if ("function" == typeof e && !e(a)) return a;
            for (var h, g = f.length; -1 !== c.code.indexOf((h = b(d, g))); )
                ++g;
            return (f[g] = a), h;
            })),
            (c.grammar = a.languages.markup);
        }
        },
    },
    tokenizePlaceholders: {
        value: function (c, d) {
        if (c.language === d && c.tokenStack) {
            c.grammar = a.languages[d];
            var e = 0,
            f = Object.keys(c.tokenStack);
            !(function m(i) {
            for (
                var j = 0, g, o, r, l, n, k, p, s, q, h;
                j < i.length && !(e >= f.length);
                j++
            )
                (g = i[j]),
                "string" == typeof g ||
                (g.content && "string" == typeof g.content)
                    ? ((o = f[e]),
                    (r = c.tokenStack[o]),
                    (l = "string" == typeof g ? g : g.content),
                    (n = b(d, o)),
                    (k = l.indexOf(n)),
                    -1 < k &&
                        (++e,
                        (p = l.substring(0, k)),
                        (s = new a.Token(
                        d,
                        a.tokenize(r, c.grammar),
                        "language-" + d,
                        r
                        )),
                        (q = l.substring(k + n.length)),
                        (h = []),
                        p && h.push.apply(h, m([p])),
                        h.push(s),
                        q && h.push.apply(h, m([q])),
                        "string" == typeof g
                        ? i.splice.apply(i, [j, 1].concat(h))
                        : (g.content = h)))
                    : g.content && m(g.content);
            return i;
            })(c.tokens);
        }
        },
    },
    });
})(Prism),
!(function (a) {
    a.languages.django = {
    comment: /^{#[\s\S]*?#}$/,
    tag: { pattern: /(^{%[+-]?\s*)\w+/, lookbehind: !0, alias: "keyword" },
    delimiter: { pattern: /^{[{%][+-]?|[+-]?[}%]}$/, alias: "punctuation" },
    string: { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
    filter: { pattern: /(\|)\w+/, lookbehind: !0, alias: "function" },
    test: {
        pattern: /(\bis\s+(?:not\s+)?)(?!not\b)\w+/,
        lookbehind: !0,
        alias: "function",
    },
    function: /\b[a-z_]\w+(?=\s*\()/i,
    keyword:
        /\b(?:and|as|by|else|for|if|import|in|is|loop|not|or|recursive|with|without)\b/,
    operator: /[-+*/%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
    number: /\b\d+(?:\.\d+)?\b/,
    boolean: /[Tt]rue|[Ff]alse|[Nn]one/,
    variable: /\b\w+?\b/,
    punctuation: /[{}[\](),.:;]/,
    };
    var c = /{{[\s\S]*?}}|{%[\s\S]*?%}|{#[\s\S]*?#}/g,
    b = a.languages["markup-templating"];
    a.hooks.add("before-tokenize", function (a) {
    b.buildPlaceholders(a, "django", c);
    }),
    a.hooks.add("after-tokenize", function (a) {
        b.tokenizePlaceholders(a, "django");
    }),
    (a.languages.jinja2 = a.languages.django),
    a.hooks.add("before-tokenize", function (a) {
        b.buildPlaceholders(a, "jinja2", c);
    }),
    a.hooks.add("after-tokenize", function (a) {
        b.tokenizePlaceholders(a, "jinja2");
    });
})(Prism),
(Prism.languages.docker = {
    keyword: {
    pattern:
        /(^\s*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)/im,
    lookbehind: !0,
    },
    string: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
    comment: /#.*/,
    punctuation: /---|\.\.\.|[:[\]{}\-,|>?]/,
}),
(Prism.languages.dockerfile = Prism.languages.docker),
(Prism.languages.eiffel = {
    comment: /--.*/,
    string: [
    { pattern: /"([^[]*)\[[\s\S]*?\]\1"/, greedy: !0 },
    { pattern: /"([^{]*)\{[\s\S]*?\}\1"/, greedy: !0 },
    { pattern: /"(?:%\s+%|%.|[^%"\r\n])*"/, greedy: !0 },
    ],
    char: /'(?:%.|[^%'\r\n])+'/,
    keyword:
    /\b(?:across|agent|alias|all|and|attached|as|assign|attribute|check|class|convert|create|Current|debug|deferred|detachable|do|else|elseif|end|ensure|expanded|export|external|feature|from|frozen|if|implies|inherit|inspect|invariant|like|local|loop|not|note|obsolete|old|once|or|Precursor|redefine|rename|require|rescue|Result|retry|select|separate|some|then|undefine|until|variant|Void|when|xor)\b/i,
    boolean: /\b(?:True|False)\b/i,
    "class-name": { pattern: /\b[A-Z][\dA-Z_]*\b/, alias: "builtin" },
    number: [
    /\b0[xcb][\da-f](?:_*[\da-f])*\b/i,
    /(?:\d(?:_*\d)*)?\.(?:(?:\d(?:_*\d)*)?e[+-]?)?\d(?:_*\d)*|\d(?:_*\d)*\.?/i,
    ],
    punctuation: /:=|<<|>>|\(\||\|\)|->|\.(?=\w)|[{}[\];(),:?]/,
    operator: /\\\\|\|\.\.\||\.\.|\/[~\/=]?|[><]=?|[-+*^=~]/,
}),
(Prism.languages.elixir = {
    comment: /#.*/m,
    regex: {
    pattern:
        /~[rR](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|[^\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[uismxfr]*/,
    greedy: !0,
    },
    string: [
    {
        pattern:
        /~[cCsSwW](?:("""|''')(?:\\[\s\S]|(?!\1)[^\\])+\1|([\/|"'])(?:\\.|(?!\2)[^\\\r\n])+\2|\((?:\\.|[^\\)\r\n])+\)|\[(?:\\.|[^\\\]\r\n])+\]|\{(?:\\.|#\{[^}]+\}|[^\\}\r\n])+\}|<(?:\\.|[^\\>\r\n])+>)[csa]?/,
        greedy: !0,
        inside: {},
    },
    { pattern: /("""|''')[\s\S]*?\1/, greedy: !0, inside: {} },
    {
        pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0,
        inside: {},
    },
    ],
    atom: { pattern: /(^|[^:]):\w+/, lookbehind: !0, alias: "symbol" },
    "attr-name": /\w+\??:(?!:)/,
    capture: {
    pattern: /(^|[^&])&(?:[^&\s\d()][^\s()]*|(?=\())/,
    lookbehind: !0,
    alias: "function",
    },
    argument: { pattern: /(^|[^&])&\d+/, lookbehind: !0, alias: "variable" },
    attribute: { pattern: /@\w+/, alias: "variable" },
    number: /\b(?:0[box][a-f\d_]+|\d[\d_]*)(?:\.[\d_]+)?(?:e[+-]?[\d_]+)?\b/i,
    keyword:
    /\b(?:after|alias|and|case|catch|cond|def(?:callback|exception|impl|module|p|protocol|struct)?|do|else|end|fn|for|if|import|not|or|require|rescue|try|unless|use|when)\b/,
    boolean: /\b(?:true|false|nil)\b/,
    operator: [
    /\bin\b|&&?|\|[|>]?|\\\\|::|\.\.\.?|\+\+?|-[->]?|<[-=>]|>=|!==?|\B!|=(?:==?|[>~])?|[*\/^]/,
    { pattern: /([^<])<(?!<)/, lookbehind: !0 },
    { pattern: /([^>])>(?!>)/, lookbehind: !0 },
    ],
    punctuation: /<<|>>|[.,%\[\]{}()]/,
}),
Prism.languages.elixir.string.forEach(function (a) {
    a.inside = {
    interpolation: {
        pattern: /#\{[^}]+\}/,
        inside: {
        delimiter: { pattern: /^#\{|\}$/, alias: "punctuation" },
        rest: Prism.languages.elixir,
        },
    },
    };
}),
(Prism.languages.elm = {
    comment: /--.*|{-[\s\S]*?-}/,
    char: {
    pattern: /'(?:[^\\'\r\n]|\\(?:[abfnrtv\\']|\d+|x[0-9a-fA-F]+))'/,
    greedy: !0,
    },
    string: [
    { pattern: /"""[\s\S]*?"""/, greedy: !0 },
    {
        pattern: /"(?:[^\\"\r\n]|\\(?:[abfnrtv\\"]|\d+|x[0-9a-fA-F]+))*"/,
        greedy: !0,
    },
    ],
    import_statement: {
    pattern:
        /^\s*import\s+[A-Z]\w*(?:\.[A-Z]\w*)*(?:\s+as\s+(?:[A-Z]\w*)(?:\.[A-Z]\w*)*)?(?:\s+exposing\s+)?/m,
    inside: { keyword: /\b(?:import|as|exposing)\b/ },
    },
    keyword:
    /\b(?:alias|as|case|else|exposing|if|in|infixl|infixr|let|module|of|then|type)\b/,
    builtin:
    /\b(?:abs|acos|always|asin|atan|atan2|ceiling|clamp|compare|cos|curry|degrees|e|flip|floor|fromPolar|identity|isInfinite|isNaN|logBase|max|min|negate|never|not|pi|radians|rem|round|sin|sqrt|tan|toFloat|toPolar|toString|truncate|turns|uncurry|xor)\b/,
    number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0x[0-9a-f]+)\b/i,
    operator: /\s\.\s|[+\-/*=.$<>:&|^?%#@~!]{2,}|[+\-/*=$<>:&|^?%#@~!]/,
    hvariable: /\b(?:[A-Z]\w*\.)*[a-z]\w*\b/,
    constant: /\b(?:[A-Z]\w*\.)*[A-Z]\w*\b/,
    punctuation: /[{}[\]|(),.:]/,
}),
!(function (a) {
    (a.languages.erb = a.languages.extend("ruby", {})),
    a.languages.insertBefore("erb", "comment", {
        delimiter: { pattern: /^<%=?|%>$/, alias: "punctuation" },
    }),
    a.hooks.add("before-tokenize", function (b) {
        a.languages["markup-templating"].buildPlaceholders(
        b,
        "erb",
        /<%=?(?:[^\r\n]|[\r\n](?!=begin)|[\r\n]=begin\s[\s\S]*?^=end)+?%>/gm
        );
    }),
    a.hooks.add("after-tokenize", function (b) {
        a.languages["markup-templating"].tokenizePlaceholders(b, "erb");
    });
})(Prism),
(Prism.languages.erlang = {
    comment: /%.+/,
    string: { pattern: /"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
    "quoted-function": {
    pattern: /'(?:\\.|[^\\'\r\n])+'(?=\()/,
    alias: "function",
    },
    "quoted-atom": { pattern: /'(?:\\.|[^\\'\r\n])+'/, alias: "atom" },
    boolean: /\b(?:true|false)\b/,
    keyword: /\b(?:fun|when|case|of|end|if|receive|after|try|catch)\b/,
    number: [
    /\$\\?./,
    /\d+#[a-z0-9]+/i,
    /(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    ],
    function: /\b[a-z][\w@]*(?=\()/,
    variable: { pattern: /(^|[^@])(?:\b|\?)[A-Z_][\w@]*/, lookbehind: !0 },
    operator: [
    /[=\/<>:]=|=[:\/]=|\+\+?|--?|[=*\/!]|\b(?:bnot|div|rem|band|bor|bxor|bsl|bsr|not|and|or|xor|orelse|andalso)\b/,
    { pattern: /(^|[^<])<(?!<)/, lookbehind: !0 },
    { pattern: /(^|[^>])>(?!>)/, lookbehind: !0 },
    ],
    atom: /\b[a-z][\w@]*/,
    punctuation: /[()[\]{}:;,.#|]|<<|>>/,
}),
(Prism.languages.fsharp = Prism.languages.extend("clike", {
    comment: [
    { pattern: /(^|[^\\])\(\*[\s\S]*?\*\)/, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 },
    ],
    string: {
    pattern:
        /(?:"""[\s\S]*?"""|@"(?:""|[^"])*"|"(?:\\[\s\S]|[^\\"])*")B?|'(?:[^\\']|\\(?:.|\d{3}|x[a-fA-F\d]{2}|u[a-fA-F\d]{4}|U[a-fA-F\d]{8}))'B?/,
    greedy: !0,
    },
    "class-name": {
    pattern:
        /(\b(?:exception|inherit|interface|new|of|type)\s+|\w\s*:\s*|\s:\??>\s*)[.\w]+\b(?:\s*(?:->|\*)\s*[.\w]+\b)*(?!\s*[:.])/,
    lookbehind: !0,
    inside: { operator: /->|\*/, punctuation: /\./ },
    },
    keyword:
    /\b(?:let|return|use|yield)(?:!\B|\b)|\b(?:abstract|and|as|assert|base|begin|class|default|delegate|do|done|downcast|downto|elif|else|end|exception|extern|false|finally|for|fun|function|global|if|in|inherit|inline|interface|internal|lazy|match|member|module|mutable|namespace|new|not|null|of|open|or|override|private|public|rec|select|static|struct|then|to|true|try|type|upcast|val|void|when|while|with|asr|land|lor|lsl|lsr|lxor|mod|sig|atomic|break|checked|component|const|constraint|constructor|continue|eager|event|external|fixed|functor|include|method|mixin|object|parallel|process|protected|pure|sealed|tailcall|trait|virtual|volatile)\b/,
    number: [
    /\b0x[\da-fA-F]+(?:un|lf|LF)?\b/,
    /\b0b[01]+(?:y|uy)?\b/,
    /(?:\b\d+\.?\d*|\B\.\d+)(?:[fm]|e[+-]?\d+)?\b/i,
    /\b\d+(?:[IlLsy]|u[lsy]?|UL)?\b/,
    ],
    operator:
    /([<>~&^])\1\1|([*.:<>&])\2|<-|->|[!=:]=|<?\|{1,3}>?|\??(?:<=|>=|<>|[-+*/%=<>])\??|[!?^&]|~[+~-]|:>|:\?>?/,
})),
Prism.languages.insertBefore("fsharp", "keyword", {
    preprocessor: {
    pattern: /^[^\r\n\S]*#.*/m,
    alias: "property",
    inside: {
        directive: {
        pattern: /(\s*#)\b(?:else|endif|if|light|line|nowarn)\b/,
        lookbehind: !0,
        alias: "keyword",
        },
    },
    },
}),
Prism.languages.insertBefore("fsharp", "punctuation", {
    "computation-expression": {
    pattern: /[_a-z]\w*(?=\s*\{)/i,
    alias: "keyword",
    },
}),
Prism.languages.insertBefore("fsharp", "string", {
    annotation: {
    pattern: /\[<.+?>\]/,
    inside: {
        punctuation: /^\[<|>\]$/,
        "class-name": {
        pattern: /^\w+$|(^|;\s*)[A-Z]\w*(?=\()/,
        lookbehind: !0,
        },
        "annotation-content": {
        pattern: /[\s\S]+/,
        inside: Prism.languages.fsharp,
        },
    },
    },
}),
!(function (a) {
    (a.languages.flow = a.languages.extend("javascript", {})),
    a.languages.insertBefore("flow", "keyword", {
        type: [
        {
            pattern:
            /\b(?:[Nn]umber|[Ss]tring|[Bb]oolean|Function|any|mixed|null|void)\b/,
            alias: "tag",
        },
        ],
    }),
    (a.languages.flow["function-variable"].pattern =
        /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)(?:\s*:\s*\w+)?|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i),
    delete a.languages.flow.parameter,
    a.languages.insertBefore("flow", "operator", {
        "flow-punctuation": { pattern: /\{\||\|\}/, alias: "punctuation" },
    }),
    Array.isArray(a.languages.flow.keyword) ||
        (a.languages.flow.keyword = [a.languages.flow.keyword]),
    a.languages.flow.keyword.unshift(
        {
        pattern: /(^|[^$]\b)(?:type|opaque|declare|Class)\b(?!\$)/,
        lookbehind: !0,
        },
        {
        pattern:
            /(^|[^$]\B)\$(?:await|Diff|Exact|Keys|ObjMap|PropertyType|Shape|Record|Supertype|Subtype|Enum)\b(?!\$)/,
        lookbehind: !0,
        }
    );
})(Prism),
(Prism.languages.fortran = {
    "quoted-number": { pattern: /[BOZ](['"])[A-F0-9]+\1/i, alias: "number" },
    string: {
    pattern:
        /(?:\w+_)?(['"])(?:\1\1|&(?:\r\n?|\n)(?:\s*!.+(?:\r\n?|\n))?|(?!\1).)*(?:\1|&)/,
    inside: { comment: { pattern: /(&(?:\r\n?|\n)\s*)!.*/, lookbehind: !0 } },
    },
    comment: { pattern: /!.*/, greedy: !0 },
    boolean: /\.(?:TRUE|FALSE)\.(?:_\w+)?/i,
    number: /(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[ED][+-]?\d+)?(?:_\w+)?/i,
    keyword: [
    /\b(?:INTEGER|REAL|DOUBLE ?PRECISION|COMPLEX|CHARACTER|LOGICAL)\b/i,
    /\b(?:END ?)?(?:BLOCK ?DATA|DO|FILE|FORALL|FUNCTION|IF|INTERFACE|MODULE(?! PROCEDURE)|PROGRAM|SELECT|SUBROUTINE|TYPE|WHERE)\b/i,
    /\b(?:ALLOCATABLE|ALLOCATE|BACKSPACE|CALL|CASE|CLOSE|COMMON|CONTAINS|CONTINUE|CYCLE|DATA|DEALLOCATE|DIMENSION|DO|END|EQUIVALENCE|EXIT|EXTERNAL|FORMAT|GO ?TO|IMPLICIT(?: NONE)?|INQUIRE|INTENT|INTRINSIC|MODULE PROCEDURE|NAMELIST|NULLIFY|OPEN|OPTIONAL|PARAMETER|POINTER|PRINT|PRIVATE|PUBLIC|READ|RETURN|REWIND|SAVE|SELECT|STOP|TARGET|WHILE|WRITE)\b/i,
    /\b(?:ASSIGNMENT|DEFAULT|ELEMENTAL|ELSE|ELSEWHERE|ELSEIF|ENTRY|IN|INCLUDE|INOUT|KIND|NULL|ONLY|OPERATOR|OUT|PURE|RECURSIVE|RESULT|SEQUENCE|STAT|THEN|USE)\b/i,
    ],
    operator: [
    /\*\*|\/\/|=>|[=\/]=|[<>]=?|::|[+\-*=%]|\.(?:EQ|NE|LT|LE|GT|GE|NOT|AND|OR|EQV|NEQV)\.|\.[A-Z]+\./i,
    { pattern: /(^|(?!\().)\/(?!\))/, lookbehind: !0 },
    ],
    punctuation: /\(\/|\/\)|[(),;:&]/,
}),
(Prism.languages.gcode = {
    comment: /;.*|\B\(.*?\)\B/,
    string: { pattern: /"(?:""|[^"])*"/, greedy: !0 },
    keyword: /\b[GM]\d+(?:\.\d+)?\b/,
    property: /\b[A-Z]/,
    checksum: { pattern: /\*\d+/, alias: "punctuation" },
    punctuation: /:/,
}),
(Prism.languages.gedcom = {
    "line-value": {
    pattern:
        /(^\s*\d+ +(?:@\w[\w!"$%&'()*+,\-./:;<=>?[\\\]^`{|}~\x80-\xfe #]*@ +)?\w+ +).+/m,
    lookbehind: !0,
    inside: {
        pointer: {
        pattern: /^@\w[\w!"$%&'()*+,\-./:;<=>?[\\\]^`{|}~\x80-\xfe #]*@$/,
        alias: "variable",
        },
    },
    },
    tag: {
    pattern:
        /(^\s*\d+ +(?:@\w[\w!"$%&'()*+,\-./:;<=>?[\\\]^`{|}~\x80-\xfe #]*@ +)?)\w+/m,
    lookbehind: !0,
    alias: "string",
    },
    level: { pattern: /(^\s*)\d+/m, lookbehind: !0, alias: "number" },
    pointer: {
    pattern: /@\w[\w!"$%&'()*+,\-./:;<=>?[\\\]^`{|}~\x80-\xfe #]*@/,
    alias: "variable",
    },
}),
!(function (b) {
    var a = "(?:\r?\n|\r)[ 	]*\\|.+\\|.*";
    Prism.languages.gherkin = {
    pystring: { pattern: /("""|''')[\s\S]+?\1/, alias: "string" },
    comment: { pattern: /(^[ \t]*)#.*/m, lookbehind: !0 },
    tag: { pattern: /(^[ \t]*)@\S*/m, lookbehind: !0 },
    feature: {
        pattern:
        /((?:^|\r?\n|\r)[ \t]*)(?:Ability|Ahoy matey!|Arwedd|Aspekt|Besigheid Behoefte|Business Need|Caracteristica|Característica|Egenskab|Egenskap|Eiginleiki|Feature|Fīča|Fitur|Fonctionnalité|Fonksyonalite|Funcionalidade|Funcionalitat|Functionalitate|Funcţionalitate|Funcționalitate|Functionaliteit|Fungsi|Funkcia|Funkcija|Funkcionalitāte|Funkcionalnost|Funkcja|Funksie|Funktionalität|Funktionalitéit|Funzionalità|Hwaet|Hwæt|Jellemző|Karakteristik|laH|Lastnost|Mak|Mogucnost|Mogućnost|Moznosti|Možnosti|OH HAI|Omadus|Ominaisuus|Osobina|Özellik|perbogh|poQbogh malja'|Potrzeba biznesowa|Požadavek|Požiadavka|Pretty much|Qap|Qu'meH 'ut|Savybė|Tính năng|Trajto|Vermoë|Vlastnosť|Właściwość|Značilnost|Δυνατότητα|Λειτουργία|Могућност|Мөмкинлек|Особина|Свойство|Үзенчәлеклелек|Функционал|Функционалност|Функция|Функціонал|תכונה|خاصية|خصوصیت|صلاحیت|کاروبار کی ضرورت|وِیژگی|रूप लेख|ਖਾਸੀਅਤ|ਨਕਸ਼ ਨੁਹਾਰ|ਮੁਹਾਂਦਰਾ|గుణము|ಹೆಚ್ಚಳ|ความต้องการทางธุรกิจ|ความสามารถ|โครงหลัก|기능|フィーチャ|功能|機能):(?:[^:]+(?:\r?\n|\r|$))*/,
        lookbehind: !0,
        inside: {
        important: { pattern: /(:)[^\r\n]+/, lookbehind: !0 },
        keyword: /[^:\r\n]+:/,
        },
    },
    scenario: {
        pattern:
        /(^[ \t]*)(?:Abstract Scenario|Abstrakt Scenario|Achtergrond|Aer|Ær|Agtergrond|All y'all|Antecedentes|Antecedents|Atburðarás|Atburðarásir|Awww, look mate|B4|Background|Baggrund|Bakgrund|Bakgrunn|Bakgrunnur|Beispiele|Beispiller|Bối cảnh|Cefndir|Cenario|Cenário|Cenario de Fundo|Cenário de Fundo|Cenarios|Cenários|Contesto|Context|Contexte|Contexto|Conto|Contoh|Contone|Dæmi|Dasar|Dead men tell no tales|Delineacao do Cenario|Delineação do Cenário|Dis is what went down|Dữ liệu|Dyagram senaryo|Dyagram Senaryo|Egzanp|Ejemplos|Eksempler|Ekzemploj|Enghreifftiau|Esbozo do escenario|Escenari|Escenario|Esempi|Esquema de l'escenari|Esquema del escenario|Esquema do Cenario|Esquema do Cenário|Examples|EXAMPLZ|Exempel|Exemple|Exemples|Exemplos|First off|Fono|Forgatókönyv|Forgatókönyv vázlat|Fundo|Geçmiş|ghantoH|Grundlage|Hannergrond|Háttér|Heave to|Istorik|Juhtumid|Keadaan|Khung kịch bản|Khung tình huống|Kịch bản|Koncept|Konsep skenario|Kontèks|Kontekst|Kontekstas|Konteksts|Kontext|Konturo de la scenaro|Latar Belakang|lut|lut chovnatlh|lutmey|Lýsing Atburðarásar|Lýsing Dæma|Menggariskan Senario|MISHUN|MISHUN SRSLY|mo'|Náčrt Scenára|Náčrt Scénáře|Náčrt Scenáru|Oris scenarija|Örnekler|Osnova|Osnova Scenára|Osnova scénáře|Osnutek|Ozadje|Paraugs|Pavyzdžiai|Példák|Piemēri|Plan du scénario|Plan du Scénario|Plan senaryo|Plan Senaryo|Plang vum Szenario|Pozadí|Pozadie|Pozadina|Príklady|Příklady|Primer|Primeri|Primjeri|Przykłady|Raamstsenaarium|Reckon it's like|Rerefons|Scenár|Scénář|Scenarie|Scenarij|Scenarijai|Scenarijaus šablonas|Scenariji|Scenārijs|Scenārijs pēc parauga|Scenarijus|Scenario|Scénario|Scenario Amlinellol|Scenario Outline|Scenario Template|Scenariomal|Scenariomall|Scenarios|Scenariu|Scenariusz|Scenaro|Schema dello scenario|Se ðe|Se the|Se þe|Senario|Senaryo|Senaryo deskripsyon|Senaryo Deskripsyon|Senaryo taslağı|Shiver me timbers|Situācija|Situai|Situasie|Situasie Uiteensetting|Skenario|Skenario konsep|Skica|Structura scenariu|Structură scenariu|Struktura scenarija|Stsenaarium|Swa|Swa hwaer swa|Swa hwær swa|Szablon scenariusza|Szenario|Szenariogrundriss|Tapaukset|Tapaus|Tapausaihio|Taust|Tausta|Template Keadaan|Template Senario|Template Situai|The thing of it is|Tình huống|Variantai|Voorbeelde|Voorbeelden|Wharrimean is|Yo\-ho\-ho|You'll wanna|Założenia|Παραδείγματα|Περιγραφή Σεναρίου|Σενάρια|Σενάριο|Υπόβαθρο|Кереш|Контекст|Концепт|Мисаллар|Мисоллар|Основа|Передумова|Позадина|Предистория|Предыстория|Приклади|Пример|Примери|Примеры|Рамка на сценарий|Скица|Структура сценарија|Структура сценария|Структура сценарію|Сценарий|Сценарий структураси|Сценарийның төзелеше|Сценарији|Сценарио|Сценарій|Тарих|Үрнәкләр|דוגמאות|רקע|תבנית תרחיש|תרחיש|الخلفية|الگوی سناریو|امثلة|پس منظر|زمینه|سناریو|سيناريو|سيناريو مخطط|مثالیں|منظر نامے کا خاکہ|منظرنامہ|نمونه ها|उदाहरण|परिदृश्य|परिदृश्य रूपरेखा|पृष्ठभूमि|ਉਦਾਹਰਨਾਂ|ਪਟਕਥਾ|ਪਟਕਥਾ ਢਾਂਚਾ|ਪਟਕਥਾ ਰੂਪ ਰੇਖਾ|ਪਿਛੋਕੜ|ఉదాహరణలు|కథనం|నేపథ్యం|సన్నివేశం|ಉದಾಹರಣೆಗಳು|ಕಥಾಸಾರಾಂಶ|ವಿವರಣೆ|ಹಿನ್ನೆಲೆ|โครงสร้างของเหตุการณ์|ชุดของตัวอย่าง|ชุดของเหตุการณ์|แนวคิด|สรุปเหตุการณ์|เหตุการณ์|배경|시나리오|시나리오 개요|예|サンプル|シナリオ|シナリオアウトライン|シナリオテンプレ|シナリオテンプレート|テンプレ|例|例子|剧本|剧本大纲|劇本|劇本大綱|场景|场景大纲|場景|場景大綱|背景):[^:\r\n]*/m,
        lookbehind: !0,
        inside: {
        important: { pattern: /(:)[^\r\n]*/, lookbehind: !0 },
        keyword: /[^:\r\n]+:/,
        },
    },
    "table-body": {
        pattern: RegExp("(" + a + ")(?:" + a + ")+"),
        lookbehind: !0,
        inside: {
        outline: { pattern: /<[^>]+?>/, alias: "variable" },
        td: { pattern: /\s*[^\s|][^|]*/, alias: "string" },
        punctuation: /\|/,
        },
    },
    "table-head": {
        pattern: RegExp(a),
        inside: {
        th: { pattern: /\s*[^\s|][^|]*/, alias: "variable" },
        punctuation: /\|/,
        },
    },
    atrule: {
        pattern:
        /(^[ \t]+)(?:'ach|'a|'ej|7|a|A také|A taktiež|A tiež|A zároveň|Aber|Ac|Adott|Akkor|Ak|Aleshores|Ale|Ali|Allora|Alors|Als|Ama|Amennyiben|Amikor|Ampak|an|AN|Ananging|And y'all|And|Angenommen|Anrhegedig a|An|Apabila|Atès|Atesa|Atunci|Avast!|Aye|A|awer|Bagi|Banjur|Bet|Biết|Blimey!|Buh|But at the end of the day I reckon|But y'all|But|BUT|Cal|Când|Cando|Cand|Ce|Cuando|Če|Ða ðe|Ða|Dadas|Dada|Dados|Dado|DaH ghu' bejlu'|dann|Dann|Dano|Dan|Dar|Dat fiind|Data|Date fiind|Date|Dati fiind|Dati|Daţi fiind|Dați fiind|Dato|DEN|Den youse gotta|Dengan|De|Diberi|Diyelim ki|Donada|Donat|Donitaĵo|Do|Dun|Duota|Ðurh|Eeldades|Ef|Eğer ki|Entao|Então|Entón|Entonces|En|Epi|E|És|Etant donnée|Etant donné|Et|Étant données|Étant donnée|Étant donné|Etant données|Etant donnés|Étant donnés|Fakat|Gangway!|Gdy|Gegeben seien|Gegeben sei|Gegeven|Gegewe|ghu' noblu'|Gitt|Given y'all|Given|Givet|Givun|Ha|Cho|I CAN HAZ|In|Ir|It's just unbelievable|I|Ja|Jeśli|Jeżeli|Kadar|Kada|Kad|Kai|Kaj|Když|Keď|Kemudian|Ketika|Khi|Kiedy|Ko|Kuid|Kui|Kun|Lan|latlh|Le sa a|Let go and haul|Le|Lè sa a|Lè|Logo|Lorsqu'<|Lorsque|mä|Maar|Mais|Mając|Majd|Maka|Manawa|Mas|Ma|Menawa|Men|Mutta|Nalikaning|Nalika|Nanging|Når|När|Nato|Nhưng|Niin|Njuk|O zaman|Og|Och|Oletetaan|Onda|Ond|Oraz|Pak|Pero|Però|Podano|Pokiaľ|Pokud|Potem|Potom|Privzeto|Pryd|qaSDI'|Quando|Quand|Quan|Så|Sed|Se|Siis|Sipoze ke|Sipoze Ke|Sipoze|Si|Şi|Și|Soit|Stel|Tada|Tad|Takrat|Tak|Tapi|Ter|Tetapi|Tha the|Tha|Then y'all|Then|Thì|Thurh|Toda|Too right|ugeholl|Und|Un|Và|vaj|Vendar|Ve|wann|Wanneer|WEN|Wenn|When y'all|When|Wtedy|Wun|Y'know|Yeah nah|Yna|Youse know like when|Youse know when youse got|Y|Za predpokladu|Za předpokladu|Zadani|Zadano|Zadan|Zadate|Zadato|Zakładając|Zaradi|Zatati|Þa þe|Þa|Þá|Þegar|Þurh|Αλλά|Δεδομένου|Και|Όταν|Τότε|А також|Агар|Але|Али|Аммо|А|Әгәр|Әйтик|Әмма|Бирок|Ва|Вә|Дадено|Дано|Допустим|Если|Задате|Задати|Задато|И|І|К тому же|Када|Кад|Когато|Когда|Коли|Ләкин|Лекин|Нәтиҗәдә|Нехай|Но|Онда|Припустимо, що|Припустимо|Пусть|Также|Та|Тогда|Тоді|То|Унда|Һәм|Якщо|אבל|אזי|אז|בהינתן|וגם|כאשר|آنگاه|اذاً|اگر|اما|اور|با فرض|بالفرض|بفرض|پھر|تب|ثم|جب|عندما|فرض کیا|لكن|لیکن|متى|هنگامی|و|अगर|और|कदा|किन्तु|चूंकि|जब|तथा|तदा|तब|परन्तु|पर|यदि|ਅਤੇ|ਜਦੋਂ|ਜਿਵੇਂ ਕਿ|ਜੇਕਰ|ਤਦ|ਪਰ|అప్పుడు|ఈ పరిస్థితిలో|కాని|చెప్పబడినది|మరియు|ಆದರೆ|ನಂತರ|ನೀಡಿದ|ಮತ್ತು|ಸ್ಥಿತಿಯನ್ನು|กำหนดให้|ดังนั้น|แต่|เมื่อ|และ|그러면<|그리고<|단<|만약<|만일<|먼저<|조건<|하지만<|かつ<|しかし<|ただし<|ならば<|もし<|並且<|但し<|但是<|假如<|假定<|假設<|假设<|前提<|同时<|同時<|并且<|当<|當<|而且<|那么<|那麼<)(?=[ \t])/m,
        lookbehind: !0,
    },
    string: {
        pattern: /"(?:\\.|[^"\\\r\n])*"|'(?:\\.|[^'\\\r\n])*'/,
        inside: { outline: { pattern: /<[^>]+?>/, alias: "variable" } },
    },
    outline: { pattern: /<[^>]+?>/, alias: "variable" },
    };
})(),
(Prism.languages.git = {
    comment: /^#.*/m,
    deleted: /^[-–].*/m,
    inserted: /^\+.*/m,
    string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
    command: { pattern: /^.*\$ git .*$/m, inside: { parameter: /\s--?\w+/m } },
    coord: /^@@.*@@$/m,
    commit_sha1: /^commit \w{40}$/m,
}),
(Prism.languages.glsl = Prism.languages.extend("clike", {
    comment: [/\/\*[\s\S]*?\*\//, /\/\/(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/],
    number: /(?:\b0x[\da-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ulf]*/i,
    keyword:
    /\b(?:attribute|const|uniform|varying|buffer|shared|coherent|volatile|restrict|readonly|writeonly|atomic_uint|layout|centroid|flat|smooth|noperspective|patch|sample|break|continue|do|for|while|switch|case|default|if|else|subroutine|in|out|inout|float|double|int|void|bool|true|false|invariant|precise|discard|return|d?mat[234](?:x[234])?|[ibdu]?vec[234]|uint|lowp|mediump|highp|precision|[iu]?sampler[123]D|[iu]?samplerCube|sampler[12]DShadow|samplerCubeShadow|[iu]?sampler[12]DArray|sampler[12]DArrayShadow|[iu]?sampler2DRect|sampler2DRectShadow|[iu]?samplerBuffer|[iu]?sampler2DMS(?:Array)?|[iu]?samplerCubeArray|samplerCubeArrayShadow|[iu]?image[123]D|[iu]?image2DRect|[iu]?imageCube|[iu]?imageBuffer|[iu]?image[12]DArray|[iu]?imageCubeArray|[iu]?image2DMS(?:Array)?|struct|common|partition|active|asm|class|union|enum|typedef|template|this|resource|goto|inline|noinline|public|static|extern|external|interface|long|short|half|fixed|unsigned|superp|input|output|hvec[234]|fvec[234]|sampler3DRect|filter|sizeof|cast|namespace|using)\b/,
})),
Prism.languages.insertBefore("glsl", "comment", {
    preprocessor: {
    pattern:
        /(^[ \t]*)#(?:(?:define|undef|if|ifdef|ifndef|else|elif|endif|error|pragma|extension|version|line)\b)?/m,
    lookbehind: !0,
    alias: "builtin",
    },
}),
(Prism.languages.gamemakerlanguage = Prism.languages.gml =
    Prism.languages.extend("clike", {
    number: /(?:\b0x[\da-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ulf]*/i,
    keyword:
        /\b(?:if|else|switch|case|default|break|for|repeat|while|do|until|continue|exit|return|globalvar|var|enum)\b/,
    operator:
        /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not|with|at|xor|not)\b/,
    constant:
        /\b(?:self|other|all|noone|global|local|undefined|pointer_(?:invalid|null)|action_(?:stop|restart|continue|reverse)|pi|GM_build_date|GM_version|timezone_(?:local|utc)|gamespeed_(?:fps|microseconds)|ev_(?:create|destroy|step|alarm|keyboard|mouse|collision|other|draw|draw_(?:begin|end|pre|post)|keypress|keyrelease|trigger|(?:left|right|middle|no)_button|(?:left|right|middle)_press|(?:left|right|middle)_release|mouse_(?:enter|leave|wheel_up|wheel_down)|global_(?:left|right|middle)_button|global_(?:left|right|middle)_press|global_(?:left|right|middle)_release|joystick(?:1|2)_(?:left|right|up|down|button1|button2|button3|button4|button5|button6|button7|button8)|outside|boundary|game_start|game_end|room_start|room_end|no_more_lives|animation_end|end_of_path|no_more_health|user\d|step_(?:normal|begin|end)|gui|gui_begin|gui_end)|vk_(?:nokey|anykey|enter|return|shift|control|alt|escape|space|backspace|tab|pause|printscreen|left|right|up|down|home|end|delete|insert|pageup|pagedown|f\d|numpad\d|divide|multiply|subtract|add|decimal|lshift|lcontrol|lalt|rshift|rcontrol|ralt)|mb_(?:any|none|left|right|middle)|c_(?:aqua|black|blue|dkgray|fuchsia|gray|green|lime|ltgray|maroon|navy|olive|purple|red|silver|teal|white|yellow|orange)|fa_(?:left|center|right|top|middle|bottom|readonly|hidden|sysfile|volumeid|directory|archive)|pr_(?:pointlist|linelist|linestrip|trianglelist|trianglestrip|trianglefan)|bm_(?:complex|normal|add|max|subtract|zero|one|src_colour|inv_src_colour|src_color|inv_src_color|src_alpha|inv_src_alpha|dest_alpha|inv_dest_alpha|dest_colour|inv_dest_colour|dest_color|inv_dest_color|src_alpha_sat)|audio_(?:falloff_(?:none|inverse_distance|inverse_distance_clamped|linear_distance|linear_distance_clamped|exponent_distance|exponent_distance_clamped)|old_system|new_system|mono|stereo|3d)|cr_(?:default|none|arrow|cross|beam|size_nesw|size_ns|size_nwse|size_we|uparrow|hourglass|drag|appstart|handpoint|size_all)|spritespeed_framesper(?:second|gameframe)|asset_(?:object|unknown|sprite|sound|room|path|script|font|timeline|tiles|shader)|ds_type_(?:map|list|stack|queue|grid|priority)|ef_(?:explosion|ring|ellipse|firework|smoke|smokeup|star|spark|flare|cloud|rain|snow)|pt_shape_(?:pixel|disk|square|line|star|circle|ring|sphere|flare|spark|explosion|cloud|smoke|snow)|ps_(?:distr|shape)_(?:linear|gaussian|invgaussian|rectangle|ellipse|diamond|line)|ty_(?:real|string)|dll_(?:cdel|cdecl|stdcall)|matrix_(?:view|projection|world)|os_(?:win32|windows|macosx|ios|android|linux|unknown|winphone|win8native|psvita|ps4|xboxone|ps3|uwp)|browser_(?:not_a_browser|unknown|ie|firefox|chrome|safari|safari_mobile|opera|tizen|windows_store|ie_mobile)|device_ios_(?:unknown|iphone|iphone_retina|ipad|ipad_retina|iphone5|iphone6|iphone6plus)|device_(?:emulator|tablet)|display_(?:landscape|landscape_flipped|portrait|portrait_flipped)|of_challenge_(?:win|lose|tie)|leaderboard_type_(?:number|time_mins_secs)|cmpfunc_(?:never|less|equal|lessequal|greater|notequal|greaterequal|always)|cull_(?:noculling|clockwise|counterclockwise)|lighttype_(?:dir|point)|iap_(?:ev_storeload|ev_product|ev_purchase|ev_consume|ev_restore|storeload_ok|storeload_failed|status_uninitialised|status_unavailable|status_loading|status_available|status_processing|status_restoring|failed|unavailable|available|purchased|canceled|refunded)|fb_login_(?:default|fallback_to_webview|no_fallback_to_webview|forcing_webview|use_system_account|forcing_safari)|phy_joint_(?:anchor_1_x|anchor_1_y|anchor_2_x|anchor_2_y|reaction_force_x|reaction_force_y|reaction_torque|motor_speed|angle|motor_torque|max_motor_torque|translation|speed|motor_force|max_motor_force|length_1|length_2|damping_ratio|frequency|lower_angle_limit|upper_angle_limit|angle_limits|max_length|max_torque|max_force)|phy_debug_render_(?:aabb|collision_pairs|coms|core_shapes|joints|obb|shapes)|phy_particle_flag_(?:water|zombie|wall|spring|elastic|viscous|powder|tensile|colourmixing|colormixing)|phy_particle_group_flag_(?:solid|rigid)|phy_particle_data_flag_(?:typeflags|position|velocity|colour|color|category)|achievement_(?:our_info|friends_info|leaderboard_info|info|filter_(?:all_players|friends_only|favorites_only)|type_challenge|type_score_challenge|pic_loaded|show_(?:ui|profile|leaderboard|achievement|bank|friend_picker|purchase_prompt))|network_(?:socket_(?:tcp|udp|bluetooth)|type_(?:connect|disconnect|data|non_blocking_connect)|config_(?:connect_timeout|use_non_blocking_socket|enable_reliable_udp|disable_reliable_udp))|buffer_(?:fixed|grow|wrap|fast|vbuffer|network|u8|s8|u16|s16|u32|s32|u64|f16|f32|f64|bool|text|string|seek_start|seek_relative|seek_end|generalerror|outofspace|outofbounds|invalidtype)|gp_(?:face\d|shoulderl|shoulderr|shoulderlb|shoulderrb|select|start|stickl|stickr|padu|padd|padl|padr|axislh|axislv|axisrh|axisrv)|ov_(?:friends|community|players|settings|gamegroup|achievements)|lb_sort_(?:none|ascending|descending)|lb_disp_(?:none|numeric|time_sec|time_ms)|ugc_(?:result_success|filetype_(?:community|microtrans)|visibility_(?:public|friends_only|private)|query_RankedBy(?:Vote|PublicationDate|Trend|NumTimesReported|TotalVotesAsc|VotesUp|TextSearch)|query_(?:AcceptedForGameRankedByAcceptanceDate|FavoritedByFriendsRankedByPublicationDate|CreatedByFriendsRankedByPublicationDate|NotYetRated)|sortorder_CreationOrder(?:Desc|Asc)|sortorder_(?:TitleAsc|LastUpdatedDesc|SubscriptionDateDesc|VoteScoreDesc|ForModeration)|list_(?:Published|VotedOn|VotedUp|VotedDown|WillVoteLater|Favorited|Subscribed|UsedOrPlayed|Followed)|match_(?:Items|Items_Mtx|Items_ReadyToUse|Collections|Artwork|Videos|Screenshots|AllGuides|WebGuides|IntegratedGuides|UsableInGame|ControllerBindings))|vertex_usage_(?:position|colour|color|normal|texcoord|textcoord|blendweight|blendindices|psize|tangent|binormal|fog|depth|sample)|vertex_type_(?:float\d|colour|color|ubyte4)|layerelementtype_(?:undefined|background|instance|oldtilemap|sprite|tilemap|particlesystem|tile)|tile_(?:rotate|flip|mirror|index_mask)|input_type|se_(?:chorus|compressor|echo|equalizer|flanger|gargle|none|reverb)|text_type|(?:obj|scr|spr|rm)\w+)\b/,
    variable:
        /\b(?:x|y|(?:x|y)(?:previous|start)|(?:h|v)speed|direction|speed|friction|gravity|gravity_direction|path_(?:index|position|positionprevious|speed|scale|orientation|endaction)|object_index|id|solid|persistent|mask_index|instance_(?:count|id)|alarm|timeline_(?:index|position|speed|running|loop)|visible|sprite_(?:index|width|height|xoffset|yoffset)|image_(?:number|index|speed|depth|xscale|yscale|angle|alpha|blend)|bbox_(?:left|right|top|bottom)|layer|phy_(?:rotation|(?:position|linear_velocity|speed|com|collision|col_normal)_(?:x|y)|angular_(?:velocity|damping)|position_(?:x|y)previous|speed|linear_damping|bullet|fixed_rotation|active|mass|inertia|dynamic|kinematic|sleeping|collision_points)|working_directory|webgl_enabled|view_(?:(?:y|x|w|h)view|(?:y|x|w|h)port|(?:v|h)(?:speed|border)|visible|surface_id|object|enabled|current|angle)|undefined|transition_(?:steps|kind|color)|temp_directory|show_(?:score|lives|health)|secure_mode|score|room_(?:width|speed|persistent|last|height|first|caption)|room|pointer_(?:null|invalid)|os_(?:version|type|device|browser)|mouse_(?:y|x|lastbutton|button)|lives|keyboard_(?:string|lastkey|lastchar|key)|iap_data|health|gamemaker_(?:version|registered|pro)|game_(?:save|project|display)_(?:id|name)|fps_real|fps|event_(?:type|object|number|action)|error_(?:occurred|last)|display_aa|delta_time|debug_mode|cursor_sprite|current_(?:year|weekday|time|second|month|minute|hour|day)|caption_(?:score|lives|health)|browser_(?:width|height)|background_(?:yscale|y|xscale|x|width|vtiled|vspeed|visible|showcolour|showcolor|index|htiled|hspeed|height|foreground|colour|color|blend|alpha)|async_load|application_surface|argument(?:_relitive|_count|\d)|argument|global|local|self|other)\b/,
    })),
(Prism.languages.go = Prism.languages.extend("clike", {
    keyword:
    /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
    builtin:
    /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,
    boolean: /\b(?:_|iota|nil|true|false)\b/,
    operator:
    /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
    number: /(?:\b0x[a-f\d]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
    string: { pattern: /(["'`])(?:\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
})),
delete Prism.languages.go["class-name"],
(Prism.languages.graphql = {
    comment: /#.*/,
    string: { pattern: /"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
    number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    boolean: /\b(?:true|false)\b/,
    variable: /\$[a-z_]\w*/i,
    directive: { pattern: /@[a-z_]\w*/i, alias: "function" },
    "attr-name": {
    pattern: /[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
    greedy: !0,
    },
    "class-name": {
    pattern:
        /(\b(?:enum|implements|interface|on|scalar|type|union)\s+)[a-zA-Z_]\w*/,
    lookbehind: !0,
    },
    fragment: {
    pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
    lookbehind: !0,
    alias: "function",
    },
    keyword:
    /\b(?:enum|fragment|implements|input|interface|mutation|on|query|scalar|schema|type|union)\b/,
    operator: /[!=|]|\.{3}/,
    punctuation: /[!(){}\[\]:=,]/,
    constant: /\b(?!ID\b)[A-Z][A-Z_\d]*\b/,
}),
(Prism.languages.groovy = Prism.languages.extend("clike", {
    string: [
    {
        pattern: /("""|''')(?:[^\\]|\\[\s\S])*?\1|\$\/(?:\$\/\$|[\s\S])*?\/\$/,
        greedy: !0,
    },
    { pattern: /(["'/])(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
    ],
    keyword:
    /\b(?:as|def|in|abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|trait|transient|try|void|volatile|while)\b/,
    number:
    /\b(?:0b[01_]+|0x[\da-f_]+(?:\.[\da-f_p\-]+)?|[\d_]+(?:\.[\d_]+)?(?:e[+-]?[\d]+)?)[glidf]?\b/i,
    operator: {
    pattern:
        /(^|[^.])(?:~|==?~?|\?[.:]?|\*(?:[.=]|\*=?)?|\.[@&]|\.\.<|\.\.(?!\.)|-[-=>]?|\+[+=]?|!=?|<(?:<=?|=>?)?|>(?:>>?=?|=)?|&[&=]?|\|[|=]?|\/=?|\^=?|%=?)/,
    lookbehind: !0,
    },
    punctuation: /\.+|[{}[\];(),.:$]/,
})),
Prism.languages.insertBefore("groovy", "string", {
    shebang: { pattern: /#!.+/, alias: "comment" },
}),
Prism.languages.insertBefore("groovy", "punctuation", {
    "spock-block": /\b(?:setup|given|when|then|and|cleanup|expect|where):/,
}),
Prism.languages.insertBefore("groovy", "function", {
    annotation: {
    pattern: /(^|[^.])@\w+/,
    lookbehind: !0,
    alias: "punctuation",
    },
}),
Prism.hooks.add("wrap", function (a) {
    var b, c;
    "groovy" === a.language &&
    "string" === a.type &&
    ((b = a.content[0]),
    "'" != b &&
        ((c = /([^\\])(?:\$(?:\{.*?\}|[\w.]+))/),
        "$" === b && (c = /([^\$])(?:\$(?:\{.*?\}|[\w.]+))/),
        (a.content = a.content.replace(/&lt;/g, "<").replace(/&amp;/g, "&")),
        (a.content = Prism.highlight(a.content, {
        expression: {
            pattern: c,
            lookbehind: !0,
            inside: Prism.languages.groovy,
        },
        })),
        a.classes.push("/" === b ? "regex" : "gstring")));
}),
!(function (a) {
    var d, e, c, f, b;
    a.languages.haml = {
    "multiline-comment": {
        pattern:
        /((?:^|\r?\n|\r)([\t ]*))(?:\/|-#).*(?:(?:\r?\n|\r)\2[\t ]+.+)*/,
        lookbehind: !0,
        alias: "comment",
    },
    "multiline-code": [
        {
        pattern:
            /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*,[\t ]*(?:(?:\r?\n|\r)\2[\t ]+.*,[\t ]*)*(?:(?:\r?\n|\r)\2[\t ]+.+)/,
        lookbehind: !0,
        inside: a.languages.ruby,
        },
        {
        pattern:
            /((?:^|\r?\n|\r)([\t ]*)(?:[~-]|[&!]?=)).*\|[\t ]*(?:(?:\r?\n|\r)\2[\t ]+.*\|[\t ]*)*/,
        lookbehind: !0,
        inside: a.languages.ruby,
        },
    ],
    filter: {
        pattern:
        /((?:^|\r?\n|\r)([\t ]*)):[\w-]+(?:(?:\r?\n|\r)(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/,
        lookbehind: !0,
        inside: { "filter-name": { pattern: /^:[\w-]+/, alias: "variable" } },
    },
    markup: {
        pattern: /((?:^|\r?\n|\r)[\t ]*)<.+/,
        lookbehind: !0,
        inside: a.languages.markup,
    },
    doctype: { pattern: /((?:^|\r?\n|\r)[\t ]*)!!!(?: .+)?/, lookbehind: !0 },
    tag: {
        pattern:
        /((?:^|\r?\n|\r)[\t ]*)[%.#][\w\-#.]*[\w\-](?:\([^)]+\)|\{(?:\{[^}]+\}|[^}])+\}|\[[^\]]+\])*[\/<>]*/,
        lookbehind: !0,
        inside: {
        attributes: [
            {
            pattern: /(^|[^#])\{(?:\{[^}]+\}|[^}])+\}/,
            lookbehind: !0,
            inside: a.languages.ruby,
            },
            {
            pattern: /\([^)]+\)/,
            inside: {
                "attr-value": {
                pattern: /(=\s*)(?:"(?:\\.|[^\\"\r\n])*"|[^)\s]+)/,
                lookbehind: !0,
                },
                "attr-name": /[\w:-]+(?=\s*!?=|\s*[,)])/,
                punctuation: /[=(),]/,
            },
            },
            { pattern: /\[[^\]]+\]/, inside: a.languages.ruby },
        ],
        punctuation: /[<>]/,
        },
    },
    code: {
        pattern: /((?:^|\r?\n|\r)[\t ]*(?:[~-]|[&!]?=)).+/,
        lookbehind: !0,
        inside: a.languages.ruby,
    },
    interpolation: {
        pattern: /#\{[^}]+\}/,
        inside: {
        delimiter: { pattern: /^#\{|\}$/, alias: "punctuation" },
        rest: a.languages.ruby,
        },
    },
    punctuation: {
        pattern: /((?:^|\r?\n|\r)[\t ]*)[~=\-&!]+/,
        lookbehind: !0,
    },
    };
    for (
    d = [
        "css",
        { filter: "coffee", language: "coffeescript" },
        "erb",
        "javascript",
        "less",
        "markdown",
        "ruby",
        "scss",
        "textile",
    ],
        e = {},
        c = 0,
        f = d.length;
    c < f;
    c++
    )
    (b = d[c]),
        (b = "string" == typeof b ? { filter: b, language: b } : b),
        a.languages[b.language] &&
        (e["filter-" + b.filter] = {
            pattern: RegExp(
            "((?:^|\\r?\\n|\\r)([\\t ]*)):{{filter_name}}(?:(?:\\r?\\n|\\r)(?:\\2[\\t ]+.+|\\s*?(?=\\r?\\n|\\r)))+".replace(
                "{{filter_name}}",
                function () {
                return b.filter;
                }
            )
            ),
            lookbehind: !0,
            inside: {
            "filter-name": { pattern: /^:[\w-]+/, alias: "variable" },
            rest: a.languages[b.language],
            },
        });
    a.languages.insertBefore("haml", "filter", e);
})(Prism),
!(function (a) {
    (a.languages.handlebars = {
    comment: /\{\{![\s\S]*?\}\}/,
    delimiter: { pattern: /^\{\{\{?|\}\}\}?$/i, alias: "punctuation" },
    string: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
    number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,
    boolean: /\b(?:true|false)\b/,
    block: {
        pattern: /^(\s*~?\s*)[#\/]\S+?(?=\s*~?\s*$|\s)/i,
        lookbehind: !0,
        alias: "keyword",
    },
    brackets: {
        pattern: /\[[^\]]+\]/,
        inside: { punctuation: /\[|\]/, variable: /[\s\S]+/ },
    },
    punctuation: /[!"#%&':()*+,.\/;<=>@\[\\\]^`{|}~]/,
    variable: /[^!"#%&'()*+,\/;<=>@\[\\\]^`{|}~\s]+/,
    }),
    a.hooks.add("before-tokenize", function (b) {
        a.languages["markup-templating"].buildPlaceholders(
        b,
        "handlebars",
        /\{\{\{[\s\S]+?\}\}\}|\{\{[\s\S]+?\}\}/g
        );
    }),
    a.hooks.add("after-tokenize", function (b) {
        a.languages["markup-templating"].tokenizePlaceholders(b, "handlebars");
    });
})(Prism),
(Prism.languages.haskell = {
    comment: {
    pattern:
        /(^|[^-!#$%*+=?&@|~.:<>^\\\/])(?:--[^-!#$%*+=?&@|~.:<>^\\\/].*|{-[\s\S]*?-})/m,
    lookbehind: !0,
    },
    char: /'(?:[^\\']|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+))'/,
    string: {
    pattern:
        /"(?:[^\\"]|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+)|\\\s+\\)*"/,
    greedy: !0,
    },
    keyword:
    /\b(?:case|class|data|deriving|do|else|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/,
    import_statement: {
    pattern:
        /((?:\r?\n|\r|^)\s*)import\s+(?:qualified\s+)?(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*(?:\s+as\s+(?:[A-Z][_a-zA-Z0-9']*)(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
    lookbehind: !0,
    inside: { keyword: /\b(?:import|qualified|as|hiding)\b/ },
    },
    builtin:
    /\b(?:abs|acos|acosh|all|and|any|appendFile|approxRational|asTypeOf|asin|asinh|atan|atan2|atanh|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|or|ord|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read|readDec|readFile|readFloat|readHex|readIO|readInt|readList|readLitChar|readLn|readOct|readParen|readSigned|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showInt|showList|showLitChar|showParen|showSigned|showString|shows|showsPrec|significand|signum|sin|sinh|snd|sort|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\b/,
    number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0o[0-7]+|0x[0-9a-f]+)\b/i,
    operator:
    /\s\.\s|[-!#$%*+=?&@|~.:<>^\\\/]*\.[-!#$%*+=?&@|~.:<>^\\\/]+|[-!#$%*+=?&@|~.:<>^\\\/]+\.[-!#$%*+=?&@|~.:<>^\\\/]*|[-!#$%*+=?&@|~:<>^\\\/]+|`(?:[A-Z][\w']*\.)*[_a-z][\w']*`/,
    hvariable: /\b(?:[A-Z][\w']*\.)*[_a-z][\w']*\b/,
    constant: /\b(?:[A-Z][\w']*\.)*[A-Z][\w']*\b/,
    punctuation: /[{}[\];(),.:]/,
}),
(Prism.languages.hs = Prism.languages.haskell),
(Prism.languages.haxe = Prism.languages.extend("clike", {
    string: {
    pattern: /(["'])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
    greedy: !0,
    inside: {
        interpolation: {
        pattern: /(^|[^\\])\$(?:\w+|\{[^}]+\})/,
        lookbehind: !0,
        inside: { interpolation: { pattern: /^\$\w*/, alias: "variable" } },
        },
    },
    },
    keyword:
    /\bthis\b|\b(?:abstract|as|break|case|cast|catch|class|continue|default|do|dynamic|else|enum|extends|extern|from|for|function|if|implements|import|in|inline|interface|macro|new|null|override|public|private|return|static|super|switch|throw|to|try|typedef|using|var|while)(?!\.)\b/,
    operator: /\.{3}|\+\+?|-[->]?|[=!]=?|&&?|\|\|?|<[<=]?|>[>=]?|[*\/%~^]/,
})),
Prism.languages.insertBefore("haxe", "class-name", {
    regex: { pattern: /~\/(?:[^\/\\\r\n]|\\.)+\/[igmsu]*/, greedy: !0 },
}),
Prism.languages.insertBefore("haxe", "keyword", {
    preprocessor: { pattern: /#\w+/, alias: "builtin" },
    metadata: { pattern: /@:?\w+/, alias: "symbol" },
    reification: { pattern: /\$(?:\w+|(?=\{))/, alias: "variable" },
}),
(Prism.languages.haxe.string.inside.interpolation.inside.rest =
    Prism.languages.haxe),
delete Prism.languages.haxe["class-name"],
(Prism.languages.hcl = {
    comment: /(?:\/\/|#).*|\/\*[\s\S]*?(?:\*\/|$)/,
    heredoc: {
    pattern: /<<-?(\w+)[\s\S]*?^\s*\1/m,
    greedy: !0,
    alias: "string",
    },
    keyword: [
    {
        pattern:
        /(?:resource|data)\s+(?:"(?:\\[\s\S]|[^\\"])*")(?=\s+"[\w-]+"\s+{)/i,
        inside: {
        type: {
            pattern: /(resource|data|\s+)(?:"(?:\\[\s\S]|[^\\"])*")/i,
            lookbehind: !0,
            alias: "variable",
        },
        },
    },
    {
        pattern:
        /(?:provider|provisioner|variable|output|module|backend)\s+(?:[\w-]+|"(?:\\[\s\S]|[^\\"])*")\s+(?={)/i,
        inside: {
        type: {
            pattern:
            /(provider|provisioner|variable|output|module|backend)\s+(?:[\w-]+|"(?:\\[\s\S]|[^\\"])*")\s+/i,
            lookbehind: !0,
            alias: "variable",
        },
        },
    },
    { pattern: /[\w-]+(?=\s+{)/ },
    ],
    property: [/[\w-\.]+(?=\s*=(?!=))/, /"(?:\\[\s\S]|[^\\"])+"(?=\s*[:=])/],
    string: {
    pattern:
        /"(?:[^\\$"]|\\[\s\S]|\$(?:(?=")|\$+|[^"${])|\$\{(?:[^{}"]|"(?:[^\\"]|\\[\s\S])*")*\})*"/,
    greedy: !0,
    inside: {
        interpolation: {
        pattern: /(^|[^$])\$\{(?:[^{}"]|"(?:[^\\"]|\\[\s\S])*")*\}/,
        lookbehind: !0,
        inside: {
            type: {
            pattern:
                /(\b(?:terraform|var|self|count|module|path|data|local)\b\.)[\w\*]+/i,
            lookbehind: !0,
            alias: "variable",
            },
            keyword: /\b(?:terraform|var|self|count|module|path|data|local)\b/i,
            function: /\w+(?=\()/,
            string: { pattern: /"(?:\\[\s\S]|[^\\"])*"/, greedy: !0 },
            number: /\b0x[\da-f]+|\d+\.?\d*(?:e[+-]?\d+)?/i,
            punctuation: /[!\$#%&'()*+,.\/;<=>@\[\\\]^`{|}~?:]/,
        },
        },
    },
    },
    number: /\b0x[\da-f]+|\d+\.?\d*(?:e[+-]?\d+)?/i,
    boolean: /\b(?:true|false)\b/i,
    punctuation: /[=\[\]{}]/,
}),
!(function (e) {
    var c, f, g, a, d, h, b, i;
    (e.languages.http = {
    "request-line": {
        pattern:
        /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHTTP\/[0-9.]+/m,
        inside: {
        property: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
        "attr-name": /:\w+/,
        },
    },
    "response-status": {
        pattern: /^HTTP\/1.[01] \d+.*/m,
        inside: {
        property: { pattern: /(^HTTP\/1.[01] )\d+.*/i, lookbehind: !0 },
        },
    },
    "header-name": { pattern: /^[\w-]+:(?=.)/m, alias: "keyword" },
    }),
    (a = e.languages),
    (d = {
        "application/javascript": a.javascript,
        "application/json": a.json || a.javascript,
        "application/xml": a.xml,
        "text/xml": a.xml,
        "text/html": a.html,
        "text/css": a.css,
    }),
    (h = { "application/json": !0, "application/xml": !0 });
    for (b in d)
    d[b] &&
        ((c = c || {}),
        (i = h[b]
        ? (void 0,
            (g = (f = b).replace(/^[a-z]+\//, "")),
            "(?:" + f + "|\\w+/(?:[\\w.-]+\\+)+" + g + "(?![+\\w.-]))")
        : b),
        (c[b.replace(/\//g, "-")] = {
        pattern: RegExp(
            "(content-type:\\s*" + i + "[\\s\\S]*?)(?:\\r?\\n|\\r){2}[\\s\\S]*",
            "i"
        ),
        lookbehind: !0,
        inside: d[b],
        }));
    c && e.languages.insertBefore("http", "header-name", c);
})(Prism),
(Prism.languages.hpkp = {
    directive: {
    pattern:
        /\b(?:(?:includeSubDomains|preload|strict)(?: |;)|pin-sha256="[a-zA-Z\d+=/]+"|(?:max-age|report-uri)=|report-to )/,
    alias: "keyword",
    },
    safe: { pattern: /\d{7,}/, alias: "selector" },
    unsafe: { pattern: /\d{1,6}/, alias: "function" },
}),
(Prism.languages.hsts = {
    directive: {
    pattern: /\b(?:max-age=|includeSubDomains|preload)/,
    alias: "keyword",
    },
    safe: { pattern: /\d{8,}/, alias: "selector" },
    unsafe: { pattern: /\d{1,7}/, alias: "function" },
}),
(Prism.languages.ichigojam = {
    comment: /(?:\B'|REM)(?:[^\n\r]*)/i,
    string: {
    pattern: /"(?:""|[!#$%&'()*,\/:;<=>?^_ +\-.A-Z\d])*"/i,
    greedy: !0,
    },
    number: /\B#[0-9A-F]+|\B`[01]+|(?:\b\d+\.?\d*|\B\.\d+)(?:E[+-]?\d+)?/i,
    keyword:
    /\b(?:BEEP|BPS|CASE|CLEAR|CLK|CLO|CLP|CLS|CLT|CLV|CONT|COPY|ELSE|END|FILE|FILES|FOR|GOSUB|GSB|GOTO|IF|INPUT|KBD|LED|LET|LIST|LOAD|LOCATE|LRUN|NEW|NEXT|OUT|RIGHT|PLAY|POKE|PRINT|PWM|REM|RENUM|RESET|RETURN|RTN|RUN|SAVE|SCROLL|SLEEP|SRND|STEP|STOP|SUB|TEMPO|THEN|TO|UART|VIDEO|WAIT)(?:\$|\b)/i,
    function:
    /\b(?:ABS|ANA|ASC|BIN|BTN|DEC|END|FREE|HELP|HEX|I2CR|I2CW|IN|INKEY|LEN|LINE|PEEK|RND|SCR|SOUND|STR|TICK|USR|VER|VPEEK|ZER)(?:\$|\b)/i,
    label: /(?:\B@[^\s]+)/i,
    operator: /<[=>]?|>=?|\|\||&&|[+\-*\/=|&^~!]|\b(?:AND|NOT|OR)\b/i,
    punctuation: /[\[,;:()\]]/,
}),
(Prism.languages.icon = {
    comment: /#.*/,
    string: {
    pattern: /(["'])(?:(?!\1)[^\\\r\n_]|\\.|_(?!\1)(?:\r\n|[\s\S]))*\1/,
    greedy: !0,
    },
    number: /\b(?:\d+r[a-z\d]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b|\.\d+\b/i,
    "builtin-keyword": {
    pattern:
        /&(?:allocated|ascii|clock|collections|cset|current|date|dateline|digits|dump|e|error(?:number|text|value)?|errout|fail|features|file|host|input|lcase|letters|level|line|main|null|output|phi|pi|pos|progname|random|regions|source|storage|subject|time|trace|ucase|version)\b/,
    alias: "variable",
    },
    directive: { pattern: /\$\w+/, alias: "builtin" },
    keyword:
    /\b(?:break|by|case|create|default|do|else|end|every|fail|global|if|initial|invocable|link|local|next|not|of|procedure|record|repeat|return|static|suspend|then|to|until|while)\b/,
    function: /(?!\d)\w+(?=\s*[({]|\s*!\s*\[)/,
    operator:
    /[+-]:(?!=)|(?:[\/?@^%&]|\+\+?|--?|==?=?|~==?=?|\*\*?|\|\|\|?|<(?:->?|<?=?)|>>?=?)(?::=)?|:(?:=:?)?|[!.\\|~]/,
    punctuation: /[\[\](){},;]/,
}),
(Prism.languages.inform7 = {
    string: {
    pattern: /"[^"]*"/,
    inside: {
        substitution: {
        pattern: /\[[^\]]+\]/,
        inside: { delimiter: { pattern: /\[|\]/, alias: "punctuation" } },
        },
    },
    },
    comment: { pattern: /\[[^\]]+\]/, greedy: !0 },
    title: {
    pattern: /^[ \t]*(?:volume|book|part(?! of)|chapter|section|table)\b.+/im,
    alias: "important",
    },
    number: {
    pattern:
        /(^|[^-])(?:\b\d+(?:\.\d+)?(?:\^\d+)?\w*|\b(?:one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve))\b(?!-)/i,
    lookbehind: !0,
    },
    verb: {
    pattern:
        /(^|[^-])\b(?:applying to|are|attacking|answering|asking|be(?:ing)?|burning|buying|called|carries|carry(?! out)|carrying|climbing|closing|conceal(?:s|ing)?|consulting|contain(?:s|ing)?|cutting|drinking|dropping|eating|enclos(?:es?|ing)|entering|examining|exiting|getting|giving|going|ha(?:ve|s|ving)|hold(?:s|ing)?|impl(?:y|ies)|incorporat(?:es?|ing)|inserting|is|jumping|kissing|listening|locking|looking|mean(?:s|ing)?|opening|provid(?:es?|ing)|pulling|pushing|putting|relat(?:es?|ing)|removing|searching|see(?:s|ing)?|setting|showing|singing|sleeping|smelling|squeezing|switching|support(?:s|ing)?|swearing|taking|tasting|telling|thinking|throwing|touching|turning|tying|unlock(?:s|ing)?|var(?:y|ies|ying)|waiting|waking|waving|wear(?:s|ing)?)\b(?!-)/i,
    lookbehind: !0,
    alias: "operator",
    },
    keyword: {
    pattern:
        /(^|[^-])\b(?:after|before|carry out|check|continue the action|definition(?= *:)|do nothing|else|end (?:if|unless|the story)|every turn|if|include|instead(?: of)?|let|move|no|now|otherwise|repeat|report|resume the story|rule for|running through|say(?:ing)?|stop the action|test|try(?:ing)?|understand|unless|use|when|while|yes)\b(?!-)/i,
    lookbehind: !0,
    },
    property: {
    pattern:
        /(^|[^-])\b(?:adjacent(?! to)|carried|closed|concealed|contained|dark|described|edible|empty|enclosed|enterable|even|female|fixed in place|full|handled|held|improper-named|incorporated|inedible|invisible|lighted|lit|lock(?:able|ed)|male|marked for listing|mentioned|negative|neuter|non-(?:empty|full|recurring)|odd|opaque|open(?:able)?|plural-named|portable|positive|privately-named|proper-named|provided|publically-named|pushable between rooms|recurring|related|rubbing|scenery|seen|singular-named|supported|swinging|switch(?:able|ed(?: on| off)?)|touch(?:able|ed)|transparent|unconcealed|undescribed|unlit|unlocked|unmarked for listing|unmentioned|unopenable|untouchable|unvisited|variable|visible|visited|wearable|worn)\b(?!-)/i,
    lookbehind: !0,
    alias: "symbol",
    },
    position: {
    pattern:
        /(^|[^-])\b(?:above|adjacent to|back side of|below|between|down|east|everywhere|front side|here|in|inside(?: from)?|north(?:east|west)?|nowhere|on(?: top of)?|other side|outside(?: from)?|parts? of|regionally in|south(?:east|west)?|through|up|west|within)\b(?!-)/i,
    lookbehind: !0,
    alias: "keyword",
    },
    type: {
    pattern:
        /(^|[^-])\b(?:actions?|activit(?:y|ies)|actors?|animals?|backdrops?|containers?|devices?|directions?|doors?|holders?|kinds?|lists?|m[ae]n|nobody|nothing|nouns?|numbers?|objects?|people|persons?|player(?:'s holdall)?|regions?|relations?|rooms?|rule(?:book)?s?|scenes?|someone|something|supporters?|tables?|texts?|things?|time|vehicles?|wom[ae]n)\b(?!-)/i,
    lookbehind: !0,
    alias: "variable",
    },
    punctuation: /[.,:;(){}]/,
}),
(Prism.languages.inform7.string.inside.substitution.inside.rest =
    Prism.languages.inform7),
(Prism.languages.inform7.string.inside.substitution.inside.rest.text = {
    pattern: /\S(?:\s*\S)*/,
    alias: "comment",
}),
(Prism.languages.ini = {
    comment: /^[ \t]*[;#].*$/m,
    selector: /^[ \t]*\[.*?\]/m,
    constant: /^[ \t]*[^\s=]+?(?=[ \t]*=)/m,
    "attr-value": { pattern: /=.*/, inside: { punctuation: /^[=]/ } },
}),
(Prism.languages.io = {
    comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
    { pattern: /(^|[^\\])\/\/.*/, lookbehind: !0 },
    { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
    ],
    "triple-quoted-string": {
    pattern: /"""(?:\\[\s\S]|(?!""")[^\\])*"""/,
    greedy: !0,
    alias: "string",
    },
    string: { pattern: /"(?:\\.|[^\\\r\n"])*"/, greedy: !0 },
    keyword:
    /\b(?:activate|activeCoroCount|asString|block|break|catch|clone|collectGarbage|compileString|continue|do|doFile|doMessage|doString|else|elseif|exit|for|foreach|forward|getSlot|getEnvironmentVariable|hasSlot|if|ifFalse|ifNil|ifNilEval|ifTrue|isActive|isNil|isResumable|list|message|method|parent|pass|pause|perform|performWithArgList|print|println|proto|raise|raiseResumable|removeSlot|resend|resume|schedulerSleepSeconds|self|sender|setSchedulerSleepSeconds|setSlot|shallowCopy|slotNames|super|system|then|thisBlock|thisContext|call|try|type|uniqueId|updateSlot|wait|while|write|yield)\b/,
    builtin:
    /\b(?:Array|AudioDevice|AudioMixer|Block|Box|Buffer|CFunction|CGI|Color|Curses|DBM|DNSResolver|DOConnection|DOProxy|DOServer|Date|Directory|Duration|DynLib|Error|Exception|FFT|File|Fnmatch|Font|Future|GL|GLE|GLScissor|GLU|GLUCylinder|GLUQuadric|GLUSphere|GLUT|Host|Image|Importer|LinkList|List|Lobby|Locals|MD5|MP3Decoder|MP3Encoder|Map|Message|Movie|Notification|Number|Object|OpenGL|Point|Protos|Regex|SGML|SGMLElement|SGMLParser|SQLite|Server|Sequence|ShowMessage|SleepyCat|SleepyCatCursor|Socket|SocketManager|Sound|Soup|Store|String|Tree|UDPSender|UPDReceiver|URL|User|Warning|WeakLink|Random|BigNum|Sequence)\b/,
    boolean: /\b(?:true|false|nil)\b/,
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e-?\d+)?/i,
    operator:
    /[=!*/%+-^&|]=|>>?=?|<<?=?|:?:?=|\+\+?|--?|\*\*?|\/\/?|%|\|\|?|&&?|\b(?:return|and|or|not)\b|@@?|\?\??|\.\./,
    punctuation: /[{}[\];(),.:]/,
}),
(Prism.languages.j = {
    comment: /\bNB\..*/,
    string: { pattern: /'(?:''|[^'\r\n])*'/, greedy: !0 },
    keyword:
    /\b(?:(?:adverb|conjunction|CR|def|define|dyad|LF|monad|noun|verb)\b|(?:assert|break|case|catch[dt]?|continue|do|else|elseif|end|fcase|for|for_\w+|goto_\w+|if|label_\w+|return|select|throw|try|while|whilst)\.)/,
    verb: {
    pattern:
        /(?!\^:|;\.|[=!][.:])(?:\{(?:\.|::?)?|p(?:\.\.?|:)|[=!\]]|[<>+*\-%$|,#][.:]?|[?^]\.?|[;\[]:?|[~}"i][.:]|[ACeEIjLor]\.|(?:[_\/\\qsux]|_?\d):)/,
    alias: "keyword",
    },
    number:
    /\b_?(?:(?!\d:)\d+(?:\.\d+)?(?:(?:[ejpx]|ad|ar)_?\d+(?:\.\d+)?)*(?:b_?[\da-z]+(?:\.[\da-z]+)?)?|_(?!\.))/,
    adverb: { pattern: /[~}]|[\/\\]\.?|[bfM]\.|t[.:]/, alias: "builtin" },
    operator: /[=a][.:]|_\./,
    conjunction: {
    pattern: /&(?:\.:?|:)?|[.:@][.:]?|[!D][.:]|[;dHT]\.|`:?|[\^LS]:|"/,
    alias: "variable",
    },
    punctuation: /[()]/,
}),
!(function (a) {
    var b =
        /\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|null|open|opens|package|private|protected|provides|public|record|requires|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,
    c = /\b[A-Z](?:\w*[a-z]\w*)?\b/;
    (a.languages.java = a.languages.extend("clike", {
    "class-name": [c, /\b[A-Z]\w*(?=\s+\w+\s*[;,=())])/],
    keyword: b,
    function: [
        a.languages.clike.function,
        { pattern: /(\:\:)[a-z_]\w*/, lookbehind: !0 },
    ],
    number:
        /\b0b[01][01_]*L?\b|\b0x[\da-f_]*\.?[\da-f_p+-]+\b|(?:\b\d[\d_]*\.?[\d_]*|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,
    operator: {
        pattern:
        /(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,
        lookbehind: !0,
    },
    })),
    a.languages.insertBefore("java", "string", {
        "triple-quoted-string": {
        pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
        greedy: !0,
        alias: "string",
        },
    }),
    a.languages.insertBefore("java", "class-name", {
        annotation: {
        alias: "punctuation",
        pattern: /(^|[^.])@\w+/,
        lookbehind: !0,
        },
        namespace: {
        pattern: RegExp(
            "(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?".replace(
            /<keyword>/g,
            function () {
                return b.source;
            }
            )
        ),
        lookbehind: !0,
        inside: { punctuation: /\./ },
        },
        generics: {
        pattern:
            /<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<(?:[\w\s,.&?]|<[\w\s,.&?]*>)*>)*>)*>/,
        inside: {
            "class-name": c,
            keyword: b,
            punctuation: /[<>(),.:]/,
            operator: /[?&|]/,
        },
        },
    });
})(Prism),
(Prism.languages.javastacktrace = {
    summary: {
    pattern:
        /^[\t ]*(?:(?:Caused by:|Suppressed:|Exception in thread "[^"]*")[\t ]+)?[\w$.]+(?:\:.*)?$/m,
    inside: {
        keyword: {
        pattern:
            /^(\s*)(?:(?:Caused by|Suppressed)(?=:)|Exception in thread)/m,
        lookbehind: !0,
        },
        string: { pattern: /^(\s*)"[^"]*"/, lookbehind: !0 },
        exceptions: {
        pattern: /^(:?\s*)[\w$.]+(?=:|$)/,
        lookbehind: !0,
        inside: {
            "class-name": /[\w$]+(?=$|:)/,
            namespace: /[a-z]\w*/,
            punctuation: /[.:]/,
        },
        },
        message: { pattern: /(:\s*)\S.*/, lookbehind: !0, alias: "string" },
        punctuation: /[:]/,
    },
    },
    "stack-frame": {
    pattern: /^[\t ]*at [\w$.]+(?:<init>)?\([^()]*\)/m,
    inside: {
        keyword: { pattern: /^(\s*)at/, lookbehind: !0 },
        source: [
        {
            pattern: /(\()\w+.\w+:\d+(?=\))/,
            lookbehind: !0,
            inside: {
            file: /^\w+\.\w+/,
            punctuation: /:/,
            "line-number": { pattern: /\d+/, alias: "number" },
            },
        },
        {
            pattern: /(\()[^()]*(?=\))/,
            lookbehind: !0,
            inside: { keyword: /^(?:Unknown Source|Native Method)$/ },
        },
        ],
        "class-name": /[\w$]+(?=\.(?:<init>|[\w$]+)\()/,
        function: /(?:<init>|[\w$]+)(?=\()/,
        namespace: /[a-z]\w*/,
        punctuation: /[.()]/,
    },
    },
    more: {
    pattern: /^[\t ]*\.{3} \d+ [a-z]+(?: [a-z]+)*/m,
    inside: {
        punctuation: /\.{3}/,
        number: /\d+/,
        keyword: /\b[a-z]+(?: [a-z]+)*\b/,
    },
    },
}),
(Prism.languages.jolie = Prism.languages.extend("clike", {
    keyword:
    /\b(?:include|define|is_defined|undef|main|init|outputPort|inputPort|Location|Protocol|Interfaces|RequestResponse|OneWay|type|interface|extender|throws|cset|csets|forward|Aggregates|Redirects|embedded|courier|execution|sequential|concurrent|single|scope|install|throw|comp|cH|default|global|linkIn|linkOut|synchronized|this|new|for|if|else|while|in|Jolie|Java|Javascript|nullProcess|spawn|constants|with|provide|until|exit|foreach|instanceof|over|service)\b/,
    builtin:
    /\b(?:undefined|string|int|void|long|Byte|bool|double|float|char|any)\b/,
    number: /(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?l?/i,
    operator: /-[-=>]?|\+[+=]?|<[<=]?|[>=*!]=?|&&|\|\||[:?\/%^]/,
    symbol: /[|;@]/,
    punctuation: /[,.]/,
    string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
    },
})),
delete Prism.languages.jolie["class-name"],
Prism.languages.insertBefore("jolie", "keyword", {
    function: {
    pattern: /((?:\b(?:outputPort|inputPort|in|service|courier)\b|@)\s*)\w+/,
    lookbehind: !0,
    },
    aggregates: {
    pattern:
        /(\bAggregates\s*:\s*)(?:\w+(?:\s+with\s+\w+)?\s*,\s*)*\w+(?:\s+with\s+\w+)?/,
    lookbehind: !0,
    inside: {
        "with-extension": {
        pattern: /\bwith\s+\w+/,
        inside: { keyword: /\bwith\b/ },
        },
        function: { pattern: /\w+/ },
        punctuation: { pattern: /,/ },
    },
    },
    redirects: {
    pattern:
        /(\bRedirects\s*:\s*)(?:\w+\s*=>\s*\w+\s*,\s*)*(?:\w+\s*=>\s*\w+)/,
    lookbehind: !0,
    inside: {
        punctuation: { pattern: /,/ },
        function: { pattern: /\w+/ },
        symbol: { pattern: /=>/ },
    },
    },
}),
(Prism.languages.json = {
    property: { pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, greedy: !0 },
    string: { pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: !0 },
    comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
    number: /-?\d+\.?\d*(?:e[+-]?\d+)?/i,
    punctuation: /[{}[\],]/,
    operator: /:/,
    boolean: /\b(?:true|false)\b/,
    null: { pattern: /\bnull\b/, alias: "keyword" },
}),
(Prism.languages.julia = {
    comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
    string: /("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2/,
    keyword:
    /\b(?:abstract|baremodule|begin|bitstype|break|catch|ccall|const|continue|do|else|elseif|end|export|finally|for|function|global|if|immutable|import|importall|in|let|local|macro|module|print|println|quote|return|struct|try|type|typealias|using|while)\b/,
    boolean: /\b(?:true|false)\b/,
    number:
    /(?:\b(?=\d)|\B(?=\.))(?:0[box])?(?:[\da-f]+\.?\d*|\.\d+)(?:[efp][+-]?\d+)?j?/i,
    operator:
    /[-+*^%÷&$\\]=?|\/[\/=]?|!=?=?|\|[=>]?|<(?:<=?|[=:])?|>(?:=|>>?=?)?|==?=?|[~≠≤≥]/,
    punctuation: /[{}[\];(),.:]/,
    constant: /\b(?:(?:NaN|Inf)(?:16|32|64)?)\b/,
}),
(Prism.languages.keyman = {
    comment: /\bc\s.*/i,
    function:
    /\[\s*(?:(?:CTRL|SHIFT|ALT|LCTRL|RCTRL|LALT|RALT|CAPS|NCAPS)\s+)*(?:[TKU]_[\w?]+|".+?"|'.+?')\s*\]/i,
    string: /("|').*?\1/,
    bold: [
    /&(?:baselayout|bitmap|capsononly|capsalwaysoff|shiftfreescaps|copyright|ethnologuecode|hotkey|includecodes|keyboardversion|kmw_embedcss|kmw_embedjs|kmw_helpfile|kmw_helptext|kmw_rtl|language|layer|layoutfile|message|mnemoniclayout|name|oldcharposmatching|platform|targets|version|visualkeyboard|windowslanguages)\b/i,
    /\b(?:bitmap|bitmaps|caps on only|caps always off|shift frees caps|copyright|hotkey|language|layout|message|name|version)\b/i,
    ],
    keyword:
    /\b(?:any|baselayout|beep|call|context|deadkey|dk|if|index|layer|notany|nul|outs|platform|return|reset|save|set|store|use)\b/i,
    atrule: /\b(?:ansi|begin|unicode|group|using keys|match|nomatch)\b/i,
    number: /\b(?:U\+[\dA-F]+|d\d+|x[\da-f]+|\d+)\b/i,
    operator: /[+>\\,()]/,
    tag: /\$(?:keyman|kmfl|weaver|keymanweb|keymanonly):/i,
}),
!(function (a) {
    (a.languages.kotlin = a.languages.extend("clike", {
    keyword: {
        pattern:
        /(^|[^.])\b(?:abstract|actual|annotation|as|break|by|catch|class|companion|const|constructor|continue|crossinline|data|do|dynamic|else|enum|expect|external|final|finally|for|fun|get|if|import|in|infix|init|inline|inner|interface|internal|is|lateinit|noinline|null|object|open|operator|out|override|package|private|protected|public|reified|return|sealed|set|super|suspend|tailrec|this|throw|to|try|typealias|val|var|vararg|when|where|while)\b/,
        lookbehind: !0,
    },
    function: [
        /\w+(?=\s*\()/,
        { pattern: /(\.)\w+(?=\s*\{)/, lookbehind: !0 },
    ],
    number:
        /\b(?:0[xX][\da-fA-F]+(?:_[\da-fA-F]+)*|0[bB][01]+(?:_[01]+)*|\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?[fFL]?)\b/,
    operator:
        /\+[+=]?|-[-=>]?|==?=?|!(?:!|==?)?|[\/*%<>]=?|[?:]:?|\.\.|&&|\|\||\b(?:and|inv|or|shl|shr|ushr|xor)\b/,
    })),
    delete a.languages.kotlin["class-name"],
    a.languages.insertBefore("kotlin", "string", {
        "raw-string": { pattern: /("""|''')[\s\S]*?\1/, alias: "string" },
    }),
    a.languages.insertBefore("kotlin", "keyword", {
        annotation: {
        pattern: /\B@(?:\w+:)?(?:[A-Z]\w*|\[[^\]]+\])/,
        alias: "builtin",
        },
    }),
    a.languages.insertBefore("kotlin", "function", {
        label: { pattern: /\w+@|@\w+/, alias: "symbol" },
    });
    var b = [
    {
        pattern: /\$\{[^}]+\}/,
        inside: {
        delimiter: { pattern: /^\$\{|\}$/, alias: "variable" },
        rest: a.languages.kotlin,
        },
    },
    { pattern: /\$\w+/, alias: "variable" },
    ];
    a.languages.kotlin.string.inside = a.languages.kotlin["raw-string"].inside =
    { interpolation: b };
})(Prism),
!(function (a) {
    var b = /\\(?:[^a-z()[\]]|[a-z*]+)/i,
    c = { "equation-command": { pattern: b, alias: "regex" } };
    (a.languages.latex = {
    comment: /%.*/m,
    cdata: {
        pattern:
        /(\\begin\{((?:verbatim|lstlisting)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
        lookbehind: !0,
    },
    equation: [
        {
        pattern:
            /\$\$(?:\\[\s\S]|[^\\$])+\$\$|\$(?:\\[\s\S]|[^\\$])+\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/,
        inside: c,
        alias: "string",
        },
        {
        pattern:
            /(\\begin\{((?:equation|math|eqnarray|align|multline|gather)\*?)\})[\s\S]*?(?=\\end\{\2\})/,
        lookbehind: !0,
        inside: c,
        alias: "string",
        },
    ],
    keyword: {
        pattern:
        /(\\(?:begin|end|ref|cite|label|usepackage|documentclass)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,
        lookbehind: !0,
    },
    url: { pattern: /(\\url\{)[^}]+(?=\})/, lookbehind: !0 },
    headline: {
        pattern:
        /(\\(?:part|chapter|section|subsection|frametitle|subsubsection|paragraph|subparagraph|subsubparagraph|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\}(?:\[[^\]]+\])?)/,
        lookbehind: !0,
        alias: "class-name",
    },
    function: { pattern: b, alias: "selector" },
    punctuation: /[[\]{}&]/,
    }),
    (a.languages.tex = a.languages.latex),
    (a.languages.context = a.languages.latex);
})(Prism),
(Prism.languages.less = Prism.languages.extend("css", {
    comment: [
    /\/\*[\s\S]*?\*\//,
    { pattern: /(^|[^\\])\/\/.*/, lookbehind: !0 },
    ],
    atrule: {
    pattern: /@[\w-]+?(?:\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};])*?(?=\s*\{)/,
    inside: { punctuation: /[:()]/ },
    },
    selector: {
    pattern:
        /(?:@\{[\w-]+\}|[^{};\s@])(?:@\{[\w-]+\}|\((?:[^(){}]|\([^(){}]*\))*\)|[^(){};@])*?(?=\s*\{)/,
    inside: { variable: /@+[\w-]+/ },
    },
    property: /(?:@\{[\w-]+\}|[\w-])+(?:\+_?)?(?=\s*:)/i,
    operator: /[+\-*\/]/,
})),
Prism.languages.insertBefore("less", "property", {
    variable: [
    { pattern: /@[\w-]+\s*:/, inside: { punctuation: /:/ } },
    /@@?[\w-]+/,
    ],
    "mixin-usage": {
    pattern: /([{;]\s*)[.#](?!\d)[\w-]+.*?(?=[(;])/,
    lookbehind: !0,
    alias: "function",
    },
}),
(Prism.languages.liquid = {
    keyword:
    /\b(?:comment|endcomment|if|elsif|else|endif|unless|endunless|for|endfor|case|endcase|when|in|break|assign|continue|limit|offset|range|reversed|raw|endraw|capture|endcapture|tablerow|endtablerow)\b/,
    number:
    /\b0b[01]+\b|\b0x[\da-f]*\.?[\da-fp-]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?[df]?/i,
    operator: {
    pattern:
        /(^|[^.])(?:\+[+=]?|-[-=]?|!=?|<<?=?|>>?>?=?|==?|&[&=]?|\|[|=]?|\*=?|\/=?|%=?|\^=?|[?:~])/m,
    lookbehind: !0,
    },
    function: {
    pattern:
        /(^|[\s;|&])(?:append|prepend|capitalize|cycle|cols|increment|decrement|abs|at_least|at_most|ceil|compact|concat|date|default|divided_by|downcase|escape|escape_once|first|floor|join|last|lstrip|map|minus|modulo|newline_to_br|plus|remove|remove_first|replace|replace_first|reverse|round|rstrip|size|slice|sort|sort_natural|split|strip|strip_html|strip_newlines|times|truncate|truncatewords|uniq|upcase|url_decode|url_encode|include|paginate)(?=$|[\s;|&])/,
    lookbehind: !0,
    },
}),
!(function (d) {
    function j(a) {
    return RegExp("(\\()" + a + "(?=[\\s\\)])");
    }
    function k(a) {
    return RegExp("([\\s([])" + a + "(?=[\\s)])");
    }
    var a = "[-+*/_~!@$%^=<>{}\\w]+",
    c = "(\\()",
    h = "(?=\\))",
    i = "(?=\\s)",
    b = {
        heading: { pattern: /;;;.*/, alias: ["comment", "title"] },
        comment: /;.*/,
        string: {
        pattern: /"(?:[^"\\]|\\.)*"/,
        greedy: !0,
        inside: {
            argument: /[-A-Z]+(?=[.,\s])/,
            symbol: RegExp("`" + a + "'"),
        },
        },
        "quoted-symbol": {
        pattern: RegExp("#?'" + a),
        alias: ["variable", "symbol"],
        },
        "lisp-property": { pattern: RegExp(":" + a), alias: "property" },
        splice: { pattern: RegExp(",@?" + a), alias: ["symbol", "variable"] },
        keyword: [
        {
            pattern: RegExp(
            c +
                "(?:(?:lexical-)?let\\*?|(?:cl-)?letf|if|when|while|unless|cons|cl-loop|and|or|not|cond|setq|error|message|null|require|provide|use-package)" +
                i
            ),
            lookbehind: !0,
        },
        {
            pattern: RegExp(
            c + "(?:for|do|collect|return|finally|append|concat|in|by)" + i
            ),
            lookbehind: !0,
        },
        ],
        declare: { pattern: j("declare"), lookbehind: !0, alias: "keyword" },
        interactive: {
        pattern: j("interactive"),
        lookbehind: !0,
        alias: "keyword",
        },
        boolean: { pattern: k("(?:t|nil)"), lookbehind: !0 },
        number: { pattern: k("[-+]?\\d+(?:\\.\\d*)?"), lookbehind: !0 },
        defvar: {
        pattern: RegExp(c + "def(?:var|const|custom|group)\\s+" + a),
        lookbehind: !0,
        inside: { keyword: /^def[a-z]+/, variable: RegExp(a) },
        },
        defun: {
        pattern: RegExp(
            c +
            "(?:cl-)?(?:defun\\*?|defmacro)\\s+" +
            a +
            "\\s+\\([\\s\\S]*?\\)"
        ),
        lookbehind: !0,
        inside: {
            keyword: /^(?:cl-)?def\S+/,
            arguments: null,
            function: { pattern: RegExp("(^\\s)" + a), lookbehind: !0 },
            punctuation: /[()]/,
        },
        },
        lambda: {
        pattern: RegExp(c + "lambda\\s+\\((?:&?" + a + "\\s*)*\\)"),
        lookbehind: !0,
        inside: { keyword: /^lambda/, arguments: null, punctuation: /[()]/ },
        },
        car: { pattern: RegExp(c + a), lookbehind: !0 },
        punctuation: [
        /(?:['`,]?\(|[)\[\]])/,
        { pattern: /(\s)\.(?=\s)/, lookbehind: !0 },
        ],
    },
    e = {
        "lisp-marker": RegExp("&[-+*/_~!@$%^=<>{}\\w]+"),
        rest: {
        argument: { pattern: RegExp(a), alias: "variable" },
        varform: {
            pattern: RegExp(c + a + "\\s+\\S[\\s\\S]*" + h),
            lookbehind: !0,
            inside: {
            string: b.string,
            boolean: b.boolean,
            number: b.number,
            symbol: b.symbol,
            punctuation: /[()]/,
            },
        },
        },
    },
    f = "\\S+(?:\\s+\\S+)*",
    g = {
        pattern: RegExp(c + "[\\s\\S]*" + h),
        lookbehind: !0,
        inside: {
        "rest-vars": { pattern: RegExp("&(?:rest|body)\\s+" + f), inside: e },
        "other-marker-vars": {
            pattern: RegExp("&(?:optional|aux)\\s+" + f),
            inside: e,
        },
        keys: {
            pattern: RegExp("&key\\s+" + f + "(?:\\s+&allow-other-keys)?"),
            inside: e,
        },
        argument: { pattern: RegExp(a), alias: "variable" },
        punctuation: /[()]/,
        },
    };
    (b.lambda.inside.arguments = g),
    (b.defun.inside.arguments = d.util.clone(g)),
    (b.defun.inside.arguments.inside.sublist = g),
    (d.languages.lisp = b),
    (d.languages.elisp = b),
    (d.languages.emacs = b),
    (d.languages["emacs-lisp"] = b);
})(Prism),
(Prism.languages.livescript = {
    comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?\*\//, lookbehind: !0 },
    { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
    ],
    "interpolated-string": {
    pattern: /(^|[^"])("""|")(?:\\[\s\S]|(?!\2)[^\\])*\2(?!")/,
    lookbehind: !0,
    greedy: !0,
    inside: {
        variable: {
        pattern: /(^|[^\\])#[a-z_](?:-?[a-z]|[\d_])*/m,
        lookbehind: !0,
        },
        interpolation: {
        pattern: /(^|[^\\])#\{[^}]+\}/m,
        lookbehind: !0,
        inside: {
            "interpolation-punctuation": {
            pattern: /^#\{|\}$/,
            alias: "variable",
            },
        },
        },
        string: /[\s\S]+/,
    },
    },
    string: [
    { pattern: /('''|')(?:\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
    { pattern: /<\[[\s\S]*?\]>/, greedy: !0 },
    /\\[^\s,;\])}]+/,
    ],
    regex: [
    {
        pattern: /\/\/(?:\[.+?]|\\.|(?!\/\/)[^\\])+\/\/[gimyu]{0,5}/,
        greedy: !0,
        inside: { comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 } },
    },
    { pattern: /\/(?:\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}/, greedy: !0 },
    ],
    keyword: {
    pattern:
        /(^|(?!-).)\b(?:break|case|catch|class|const|continue|default|do|else|extends|fallthrough|finally|for(?: ever)?|function|if|implements|it|let|loop|new|null|otherwise|own|return|super|switch|that|then|this|throw|try|unless|until|var|void|when|while|yield)(?!-)\b/m,
    lookbehind: !0,
    },
    "keyword-operator": {
    pattern:
        /(^|[^-])\b(?:(?:delete|require|typeof)!|(?:and|by|delete|export|from|import(?: all)?|in|instanceof|is(?:nt| not)?|not|of|or|til|to|typeof|with|xor)(?!-)\b)/m,
    lookbehind: !0,
    alias: "operator",
    },
    boolean: {
    pattern: /(^|[^-])\b(?:false|no|off|on|true|yes)(?!-)\b/m,
    lookbehind: !0,
    },
    argument: {
    pattern: /(^|(?!\.&\.)[^&])&(?!&)\d*/m,
    lookbehind: !0,
    alias: "variable",
    },
    number: /\b(?:\d+~[\da-z]+|\d[\d_]*(?:\.\d[\d_]*)?(?:[a-z]\w*)?)/i,
    identifier: /[a-z_](?:-?[a-z]|[\d_])*/i,
    operator: [
    { pattern: /( )\.(?= )/, lookbehind: !0 },
    /\.(?:[=~]|\.\.?)|\.(?:[&|^]|<<|>>>?)\.|:(?:=|:=?)|&&|\|[|>]|<(?:<<?<?|--?!?|~~?!?|[|=?])?|>[>=?]?|-(?:->?|>)?|\+\+?|@@?|%%?|\*\*?|!(?:~?=|--?>|~?~>)?|~(?:~?>|=)?|==?|\^\^?|[\/?]/,
    ],
    punctuation: /[(){}\[\]|.,:;`]/,
}),
(Prism.languages.livescript[
    "interpolated-string"
].inside.interpolation.inside.rest = Prism.languages.livescript),
(Prism.languages.lolcode = {
    comment: [/\bOBTW\s+[\s\S]*?\s+TLDR\b/, /\bBTW.+/],
    string: {
    pattern: /"(?::.|[^"])*"/,
    inside: {
        variable: /:\{[^}]+\}/,
        symbol: [/:\([a-f\d]+\)/i, /:\[[^\]]+\]/, /:[)>o":]/],
    },
    greedy: !0,
    },
    number: /(?:\B-)?(?:\b\d+\.?\d*|\B\.\d+)/,
    symbol: {
    pattern: /(^|\s)(?:A )?(?:YARN|NUMBR|NUMBAR|TROOF|BUKKIT|NOOB)(?=\s|,|$)/,
    lookbehind: !0,
    inside: { keyword: /A(?=\s)/ },
    },
    label: {
    pattern: /((?:^|\s)(?:IM IN YR|IM OUTTA YR) )[a-zA-Z]\w*/,
    lookbehind: !0,
    alias: "string",
    },
    function: {
    pattern: /((?:^|\s)(?:I IZ|HOW IZ I|IZ) )[a-zA-Z]\w*/,
    lookbehind: !0,
    },
    keyword: [
    {
        pattern:
        /(^|\s)(?:O HAI IM|KTHX|HAI|KTHXBYE|I HAS A|ITZ(?: A)?|R|AN|MKAY|SMOOSH|MAEK|IS NOW(?: A)?|VISIBLE|GIMMEH|O RLY\?|YA RLY|NO WAI|OIC|MEBBE|WTF\?|OMG|OMGWTF|GTFO|IM IN YR|IM OUTTA YR|FOUND YR|YR|TIL|WILE|UPPIN|NERFIN|I IZ|HOW IZ I|IF U SAY SO|SRS|HAS A|LIEK(?: A)?|IZ)(?=\s|,|$)/,
        lookbehind: !0,
    },
    /'Z(?=\s|,|$)/,
    ],
    boolean: { pattern: /(^|\s)(?:WIN|FAIL)(?=\s|,|$)/, lookbehind: !0 },
    variable: { pattern: /(^|\s)IT(?=\s|,|$)/, lookbehind: !0 },
    operator: {
    pattern:
        /(^|\s)(?:NOT|BOTH SAEM|DIFFRINT|(?:SUM|DIFF|PRODUKT|QUOSHUNT|MOD|BIGGR|SMALLR|BOTH|EITHER|WON|ALL|ANY) OF)(?=\s|,|$)/,
    lookbehind: !0,
    },
    punctuation: /\.{3}|…|,|!/,
}),
(Prism.languages.lua = {
    comment: /^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,
    string: {
    pattern:
        /(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[\s\S]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,
    greedy: !0,
    },
    number:
    /\b0x[a-f\d]+\.?[a-f\d]*(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|\.?\d*(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,
    keyword:
    /\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,
    function: /(?!\d)\w+(?=\s*(?:[({]))/,
    operator: [
    /[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,
    { pattern: /(^|[^.])\.\.(?!\.)/, lookbehind: !0 },
    ],
    punctuation: /[\[\](){},;]|\.+|:+/,
}),
(Prism.languages.makefile = {
    comment: {
    pattern: /(^|[^\\])#(?:\\(?:\r\n|[\s\S])|[^\\\r\n])*/,
    lookbehind: !0,
    },
    string: {
    pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
    },
    builtin: /\.[A-Z][^:#=\s]+(?=\s*:(?!=))/,
    symbol: {
    pattern: /^[^:=\r\n]+(?=\s*:(?!=))/m,
    inside: { variable: /\$+(?:[^(){}:#=\s]+|(?=[({]))/ },
    },
    variable: /\$+(?:[^(){}:#=\s]+|\([@*%<^+?][DF]\)|(?=[({]))/,
    keyword: [
    /-include\b|\b(?:define|else|endef|endif|export|ifn?def|ifn?eq|include|override|private|sinclude|undefine|unexport|vpath)\b/,
    {
        pattern:
        /(\()(?:addsuffix|abspath|and|basename|call|dir|error|eval|file|filter(?:-out)?|findstring|firstword|flavor|foreach|guile|if|info|join|lastword|load|notdir|or|origin|patsubst|realpath|shell|sort|strip|subst|suffix|value|warning|wildcard|word(?:s|list)?)(?=[ \t])/,
        lookbehind: !0,
    },
    ],
    operator: /(?:::|[?:+!])?=|[|@]/,
    punctuation: /[:;(){}]/,
}),
!(function (a) {
    function c(a, b) {
    return (
        (a = a.replace(/<inner>/g, function () {
        return "(?:\\\\.|[^\\\\\n\r]|(?:\n|\r\n?)(?!\n|\r\n?))";
        })),
        b && (a = a + "|" + a.replace(/_/g, "\\*")),
        RegExp("((?:^|[^\\\\])(?:\\\\{2})*)(?:" + a + ")")
    );
    }
    var d = "(?:\\\\.|``.+?``|`[^`\r\n]+`|[^\\\\|\r\n`])+",
    b = "\\|?__(?:\\|__)+\\|?(?:(?:\n|\r\n?)|$)".replace(/__/g, function () {
        return d;
    }),
    e = "\\|?[ 	]*:?-{3,}:?[ 	]*(?:\\|[ 	]*:?-{3,}:?[ 	]*)+\\|?(?:\n|\r\n?)";
    (a.languages.markdown = a.languages.extend("markup", {})),
    a.languages.insertBefore("markdown", "prolog", {
        blockquote: { pattern: /^>(?:[\t ]*>)*/m, alias: "punctuation" },
        table: {
        pattern: RegExp("^" + b + e + "(?:" + b + ")*", "m"),
        inside: {
            "table-data-rows": {
            pattern: RegExp("^(" + b + e + ")(?:" + b + ")*$"),
            lookbehind: !0,
            inside: {
                "table-data": {
                pattern: RegExp(d),
                inside: a.languages.markdown,
                },
                punctuation: /\|/,
            },
            },
            "table-line": {
            pattern: RegExp("^(" + b + ")" + e + "$"),
            lookbehind: !0,
            inside: { punctuation: /\||:?-{3,}:?/ },
            },
            "table-header-row": {
            pattern: RegExp("^" + b + "$"),
            inside: {
                "table-header": {
                pattern: RegExp(d),
                alias: "important",
                inside: a.languages.markdown,
                },
                punctuation: /\|/,
            },
            },
        },
        },
        code: [
        {
            pattern:
            /((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,
            lookbehind: !0,
            alias: "keyword",
        },
        { pattern: /``.+?``|`[^`\r\n]+`/, alias: "keyword" },
        {
            pattern: /^```[\s\S]*?^```$/m,
            greedy: !0,
            inside: {
            "code-block": {
                pattern: /^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,
                lookbehind: !0,
            },
            "code-language": { pattern: /^(```).+/, lookbehind: !0 },
            punctuation: /```/,
            },
        },
        ],
        title: [
        {
            pattern: /\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,
            alias: "important",
            inside: { punctuation: /==+$|--+$/ },
        },
        {
            pattern: /(^\s*)#+.+/m,
            lookbehind: !0,
            alias: "important",
            inside: { punctuation: /^#+|#+$/ },
        },
        ],
        hr: {
        pattern: /(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,
        lookbehind: !0,
        alias: "punctuation",
        },
        list: {
        pattern: /(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,
        lookbehind: !0,
        alias: "punctuation",
        },
        "url-reference": {
        pattern:
            /!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,
        inside: {
            variable: { pattern: /^(!?\[)[^\]]+/, lookbehind: !0 },
            string:
            /(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,
            punctuation: /^[\[\]!:]|[<>]/,
        },
        alias: "url",
        },
        bold: {
        pattern: c("__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__", !0),
        lookbehind: !0,
        greedy: !0,
        inside: {
            content: {
            pattern: /(^..)[\s\S]+(?=..$)/,
            lookbehind: !0,
            inside: {},
            },
            punctuation: /\*\*|__/,
        },
        },
        italic: {
        pattern: c("_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_", !0),
        lookbehind: !0,
        greedy: !0,
        inside: {
            content: {
            pattern: /(^.)[\s\S]+(?=.$)/,
            lookbehind: !0,
            inside: {},
            },
            punctuation: /[*_]/,
        },
        },
        strike: {
        pattern: c("(~~?)(?:(?!~)<inner>)+?\\2", !1),
        lookbehind: !0,
        greedy: !0,
        inside: {
            content: {
            pattern: /(^~~?)[\s\S]+(?=\1$)/,
            lookbehind: !0,
            inside: {},
            },
            punctuation: /~~?/,
        },
        },
        url: {
        pattern: c(
            '!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[	 ]+"(?:\\\\.|[^"\\\\])*")?\\)| ?\\[(?:(?!\\])<inner>)+\\])',
            !1
        ),
        lookbehind: !0,
        greedy: !0,
        inside: {
            variable: { pattern: /(\[)[^\]]+(?=\]$)/, lookbehind: !0 },
            content: {
            pattern: /(^!?\[)[^\]]+(?=\])/,
            lookbehind: !0,
            inside: {},
            },
            string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
        },
        },
    }),
    ["url", "bold", "italic", "strike"].forEach(function (b) {
        ["url", "bold", "italic", "strike"].forEach(function (c) {
        b !== c &&
            (a.languages.markdown[b].inside.content.inside[c] =
            a.languages.markdown[c]);
        });
    }),
    a.hooks.add("after-tokenize", function (a) {
        ("markdown" !== a.language && "md" !== a.language) ||
        !(function i(d) {
            var e, h, b, c, a, g, f;
            if (d && "string" != typeof d)
            for (e = 0, h = d.length; e < h; e++)
                (b = d[e]),
                "code" === b.type
                    ? ((c = b.content[1]),
                    (a = b.content[3]),
                    c &&
                        a &&
                        "code-language" === c.type &&
                        "code-block" === a.type &&
                        "string" == typeof c.content &&
                        ((g = c.content
                        .replace(/\b#/g, "sharp")
                        .replace(/\b\+\+/g, "pp")),
                        (f =
                        "language-" +
                        (g = (/[a-z][\w-]*/i.exec(g) || [
                            "",
                        ])[0].toLowerCase())),
                        a.alias
                        ? "string" == typeof a.alias
                            ? (a.alias = [a.alias, f])
                            : a.alias.push(f)
                        : (a.alias = [f])))
                    : i(b.content);
        })(a.tokens);
    }),
    a.hooks.add("wrap", function (c) {
        var b, d, h, i, e, f, j, g;
        if ("code-block" === c.type) {
        for (b = "", d = 0, h = c.classes.length; d < h; d++)
            if (((i = c.classes[d]), (e = /language-(.+)/.exec(i)), e)) {
            b = e[1];
            break;
            }
        (f = a.languages[b]),
            f
            ? ((j = c.content.replace(/&lt;/g, "<").replace(/&amp;/g, "&")),
                (c.content = a.highlight(j, f, b)))
            : b &&
                "none" !== b &&
                a.plugins.autoloader &&
                ((g =
                "md-" +
                new Date().valueOf() +
                "-" +
                Math.floor(1e16 * Math.random())),
                (c.attributes.id = g),
                a.plugins.autoloader.loadLanguages(b, function () {
                var c = document.getElementById(g);
                c &&
                    (c.innerHTML = a.highlight(
                    c.textContent,
                    a.languages[b],
                    b
                    ));
                }));
        }
    }),
    (a.languages.md = a.languages.markdown);
})(Prism),
(Prism.languages.matlab = {
    comment: [/%\{[\s\S]*?\}%/, /%.+/],
    string: { pattern: /\B'(?:''|[^'\r\n])*'/, greedy: !0 },
    number: /(?:\b\d+\.?\d*|\B\.\d+)(?:[eE][+-]?\d+)?(?:[ij])?|\b[ij]\b/,
    keyword:
    /\b(?:break|case|catch|continue|else|elseif|end|for|function|if|inf|NaN|otherwise|parfor|pause|pi|return|switch|try|while)\b/,
    function: /(?!\d)\w+(?=\s*\()/,
    operator: /\.?[*^\/\\']|[+\-:@]|[<>=~]=?|&&?|\|\|?/,
    punctuation: /\.{3}|[.,;\[\](){}!]/,
}),
(Prism.languages.mel = {
    comment: /\/\/.*/,
    code: {
    pattern: /`(?:\\.|[^\\`\r\n])*`/,
    greedy: !0,
    alias: "italic",
    inside: { delimiter: { pattern: /^`|`$/, alias: "punctuation" } },
    },
    string: { pattern: /"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
    variable: /\$\w+/,
    number: /\b0x[\da-fA-F]+\b|\b\d+\.?\d*|\B\.\d+/,
    flag: { pattern: /-[^\d\W]\w*/, alias: "operator" },
    keyword:
    /\b(?:break|case|continue|default|do|else|float|for|global|if|in|int|matrix|proc|return|string|switch|vector|while)\b/,
    function:
    /\w+(?=\()|\b(?:about|abs|addAttr|addAttributeEditorNodeHelp|addDynamic|addNewShelfTab|addPP|addPanelCategory|addPrefixToName|advanceToNextDrivenKey|affectedNet|affects|aimConstraint|air|alias|aliasAttr|align|alignCtx|alignCurve|alignSurface|allViewFit|ambientLight|angle|angleBetween|animCone|animCurveEditor|animDisplay|animView|annotate|appendStringArray|applicationName|applyAttrPreset|applyTake|arcLenDimContext|arcLengthDimension|arclen|arrayMapper|art3dPaintCtx|artAttrCtx|artAttrPaintVertexCtx|artAttrSkinPaintCtx|artAttrTool|artBuildPaintMenu|artFluidAttrCtx|artPuttyCtx|artSelectCtx|artSetPaintCtx|artUserPaintCtx|assignCommand|assignInputDevice|assignViewportFactories|attachCurve|attachDeviceAttr|attachSurface|attrColorSliderGrp|attrCompatibility|attrControlGrp|attrEnumOptionMenu|attrEnumOptionMenuGrp|attrFieldGrp|attrFieldSliderGrp|attrNavigationControlGrp|attrPresetEditWin|attributeExists|attributeInfo|attributeMenu|attributeQuery|autoKeyframe|autoPlace|bakeClip|bakeFluidShading|bakePartialHistory|bakeResults|bakeSimulation|basename|basenameEx|batchRender|bessel|bevel|bevelPlus|binMembership|bindSkin|blend2|blendShape|blendShapeEditor|blendShapePanel|blendTwoAttr|blindDataType|boneLattice|boundary|boxDollyCtx|boxZoomCtx|bufferCurve|buildBookmarkMenu|buildKeyframeMenu|button|buttonManip|CBG|cacheFile|cacheFileCombine|cacheFileMerge|cacheFileTrack|camera|cameraView|canCreateManip|canvas|capitalizeString|catch|catchQuiet|ceil|changeSubdivComponentDisplayLevel|changeSubdivRegion|channelBox|character|characterMap|characterOutlineEditor|characterize|chdir|checkBox|checkBoxGrp|checkDefaultRenderGlobals|choice|circle|circularFillet|clamp|clear|clearCache|clip|clipEditor|clipEditorCurrentTimeCtx|clipSchedule|clipSchedulerOutliner|clipTrimBefore|closeCurve|closeSurface|cluster|cmdFileOutput|cmdScrollFieldExecuter|cmdScrollFieldReporter|cmdShell|coarsenSubdivSelectionList|collision|color|colorAtPoint|colorEditor|colorIndex|colorIndexSliderGrp|colorSliderButtonGrp|colorSliderGrp|columnLayout|commandEcho|commandLine|commandPort|compactHairSystem|componentEditor|compositingInterop|computePolysetVolume|condition|cone|confirmDialog|connectAttr|connectControl|connectDynamic|connectJoint|connectionInfo|constrain|constrainValue|constructionHistory|container|containsMultibyte|contextInfo|control|convertFromOldLayers|convertIffToPsd|convertLightmap|convertSolidTx|convertTessellation|convertUnit|copyArray|copyFlexor|copyKey|copySkinWeights|cos|cpButton|cpCache|cpClothSet|cpCollision|cpConstraint|cpConvClothToMesh|cpForces|cpGetSolverAttr|cpPanel|cpProperty|cpRigidCollisionFilter|cpSeam|cpSetEdit|cpSetSolverAttr|cpSolver|cpSolverTypes|cpTool|cpUpdateClothUVs|createDisplayLayer|createDrawCtx|createEditor|createLayeredPsdFile|createMotionField|createNewShelf|createNode|createRenderLayer|createSubdivRegion|cross|crossProduct|ctxAbort|ctxCompletion|ctxEditMode|ctxTraverse|currentCtx|currentTime|currentTimeCtx|currentUnit|curve|curveAddPtCtx|curveCVCtx|curveEPCtx|curveEditorCtx|curveIntersect|curveMoveEPCtx|curveOnSurface|curveSketchCtx|cutKey|cycleCheck|cylinder|dagPose|date|defaultLightListCheckBox|defaultNavigation|defineDataServer|defineVirtualDevice|deformer|deg_to_rad|delete|deleteAttr|deleteShadingGroupsAndMaterials|deleteShelfTab|deleteUI|deleteUnusedBrushes|delrandstr|detachCurve|detachDeviceAttr|detachSurface|deviceEditor|devicePanel|dgInfo|dgdirty|dgeval|dgtimer|dimWhen|directKeyCtx|directionalLight|dirmap|dirname|disable|disconnectAttr|disconnectJoint|diskCache|displacementToPoly|displayAffected|displayColor|displayCull|displayLevelOfDetail|displayPref|displayRGBColor|displaySmoothness|displayStats|displayString|displaySurface|distanceDimContext|distanceDimension|doBlur|dolly|dollyCtx|dopeSheetEditor|dot|dotProduct|doubleProfileBirailSurface|drag|dragAttrContext|draggerContext|dropoffLocator|duplicate|duplicateCurve|duplicateSurface|dynCache|dynControl|dynExport|dynExpression|dynGlobals|dynPaintEditor|dynParticleCtx|dynPref|dynRelEdPanel|dynRelEditor|dynamicLoad|editAttrLimits|editDisplayLayerGlobals|editDisplayLayerMembers|editRenderLayerAdjustment|editRenderLayerGlobals|editRenderLayerMembers|editor|editorTemplate|effector|emit|emitter|enableDevice|encodeString|endString|endsWith|env|equivalent|equivalentTol|erf|error|eval|evalDeferred|evalEcho|event|exactWorldBoundingBox|exclusiveLightCheckBox|exec|executeForEachObject|exists|exp|expression|expressionEditorListen|extendCurve|extendSurface|extrude|fcheck|fclose|feof|fflush|fgetline|fgetword|file|fileBrowserDialog|fileDialog|fileExtension|fileInfo|filetest|filletCurve|filter|filterCurve|filterExpand|filterStudioImport|findAllIntersections|findAnimCurves|findKeyframe|findMenuItem|findRelatedSkinCluster|finder|firstParentOf|fitBspline|flexor|floatEq|floatField|floatFieldGrp|floatScrollBar|floatSlider|floatSlider2|floatSliderButtonGrp|floatSliderGrp|floor|flow|fluidCacheInfo|fluidEmitter|fluidVoxelInfo|flushUndo|fmod|fontDialog|fopen|formLayout|format|fprint|frameLayout|fread|freeFormFillet|frewind|fromNativePath|fwrite|gamma|gauss|geometryConstraint|getApplicationVersionAsFloat|getAttr|getClassification|getDefaultBrush|getFileList|getFluidAttr|getInputDeviceRange|getMayaPanelTypes|getModifiers|getPanel|getParticleAttr|getPluginResource|getenv|getpid|glRender|glRenderEditor|globalStitch|gmatch|goal|gotoBindPose|grabColor|gradientControl|gradientControlNoAttr|graphDollyCtx|graphSelectContext|graphTrackCtx|gravity|grid|gridLayout|group|groupObjectsByName|HfAddAttractorToAS|HfAssignAS|HfBuildEqualMap|HfBuildFurFiles|HfBuildFurImages|HfCancelAFR|HfConnectASToHF|HfCreateAttractor|HfDeleteAS|HfEditAS|HfPerformCreateAS|HfRemoveAttractorFromAS|HfSelectAttached|HfSelectAttractors|HfUnAssignAS|hardenPointCurve|hardware|hardwareRenderPanel|headsUpDisplay|headsUpMessage|help|helpLine|hermite|hide|hilite|hitTest|hotBox|hotkey|hotkeyCheck|hsv_to_rgb|hudButton|hudSlider|hudSliderButton|hwReflectionMap|hwRender|hwRenderLoad|hyperGraph|hyperPanel|hyperShade|hypot|iconTextButton|iconTextCheckBox|iconTextRadioButton|iconTextRadioCollection|iconTextScrollList|iconTextStaticLabel|ikHandle|ikHandleCtx|ikHandleDisplayScale|ikSolver|ikSplineHandleCtx|ikSystem|ikSystemInfo|ikfkDisplayMethod|illustratorCurves|image|imfPlugins|inheritTransform|insertJoint|insertJointCtx|insertKeyCtx|insertKnotCurve|insertKnotSurface|instance|instanceable|instancer|intField|intFieldGrp|intScrollBar|intSlider|intSliderGrp|interToUI|internalVar|intersect|iprEngine|isAnimCurve|isConnected|isDirty|isParentOf|isSameObject|isTrue|isValidObjectName|isValidString|isValidUiName|isolateSelect|itemFilter|itemFilterAttr|itemFilterRender|itemFilterType|joint|jointCluster|jointCtx|jointDisplayScale|jointLattice|keyTangent|keyframe|keyframeOutliner|keyframeRegionCurrentTimeCtx|keyframeRegionDirectKeyCtx|keyframeRegionDollyCtx|keyframeRegionInsertKeyCtx|keyframeRegionMoveKeyCtx|keyframeRegionScaleKeyCtx|keyframeRegionSelectKeyCtx|keyframeRegionSetKeyCtx|keyframeRegionTrackCtx|keyframeStats|lassoContext|lattice|latticeDeformKeyCtx|launch|launchImageEditor|layerButton|layeredShaderPort|layeredTexturePort|layout|layoutDialog|lightList|lightListEditor|lightListPanel|lightlink|lineIntersection|linearPrecision|linstep|listAnimatable|listAttr|listCameras|listConnections|listDeviceAttachments|listHistory|listInputDeviceAxes|listInputDeviceButtons|listInputDevices|listMenuAnnotation|listNodeTypes|listPanelCategories|listRelatives|listSets|listTransforms|listUnselected|listerEditor|loadFluid|loadNewShelf|loadPlugin|loadPluginLanguageResources|loadPrefObjects|localizedPanelLabel|lockNode|loft|log|longNameOf|lookThru|ls|lsThroughFilter|lsType|lsUI|Mayatomr|mag|makeIdentity|makeLive|makePaintable|makeRoll|makeSingleSurface|makeTubeOn|makebot|manipMoveContext|manipMoveLimitsCtx|manipOptions|manipRotateContext|manipRotateLimitsCtx|manipScaleContext|manipScaleLimitsCtx|marker|match|max|memory|menu|menuBarLayout|menuEditor|menuItem|menuItemToShelf|menuSet|menuSetPref|messageLine|min|minimizeApp|mirrorJoint|modelCurrentTimeCtx|modelEditor|modelPanel|mouse|movIn|movOut|move|moveIKtoFK|moveKeyCtx|moveVertexAlongDirection|multiProfileBirailSurface|mute|nParticle|nameCommand|nameField|namespace|namespaceInfo|newPanelItems|newton|nodeCast|nodeIconButton|nodeOutliner|nodePreset|nodeType|noise|nonLinear|normalConstraint|normalize|nurbsBoolean|nurbsCopyUVSet|nurbsCube|nurbsEditUV|nurbsPlane|nurbsSelect|nurbsSquare|nurbsToPoly|nurbsToPolygonsPref|nurbsToSubdiv|nurbsToSubdivPref|nurbsUVSet|nurbsViewDirectionVector|objExists|objectCenter|objectLayer|objectType|objectTypeUI|obsoleteProc|oceanNurbsPreviewPlane|offsetCurve|offsetCurveOnSurface|offsetSurface|openGLExtension|openMayaPref|optionMenu|optionMenuGrp|optionVar|orbit|orbitCtx|orientConstraint|outlinerEditor|outlinerPanel|overrideModifier|paintEffectsDisplay|pairBlend|palettePort|paneLayout|panel|panelConfiguration|panelHistory|paramDimContext|paramDimension|paramLocator|parent|parentConstraint|particle|particleExists|particleInstancer|particleRenderInfo|partition|pasteKey|pathAnimation|pause|pclose|percent|performanceOptions|pfxstrokes|pickWalk|picture|pixelMove|planarSrf|plane|play|playbackOptions|playblast|plugAttr|plugNode|pluginInfo|pluginResourceUtil|pointConstraint|pointCurveConstraint|pointLight|pointMatrixMult|pointOnCurve|pointOnSurface|pointPosition|poleVectorConstraint|polyAppend|polyAppendFacetCtx|polyAppendVertex|polyAutoProjection|polyAverageNormal|polyAverageVertex|polyBevel|polyBlendColor|polyBlindData|polyBoolOp|polyBridgeEdge|polyCacheMonitor|polyCheck|polyChipOff|polyClipboard|polyCloseBorder|polyCollapseEdge|polyCollapseFacet|polyColorBlindData|polyColorDel|polyColorPerVertex|polyColorSet|polyCompare|polyCone|polyCopyUV|polyCrease|polyCreaseCtx|polyCreateFacet|polyCreateFacetCtx|polyCube|polyCut|polyCutCtx|polyCylinder|polyCylindricalProjection|polyDelEdge|polyDelFacet|polyDelVertex|polyDuplicateAndConnect|polyDuplicateEdge|polyEditUV|polyEditUVShell|polyEvaluate|polyExtrudeEdge|polyExtrudeFacet|polyExtrudeVertex|polyFlipEdge|polyFlipUV|polyForceUV|polyGeoSampler|polyHelix|polyInfo|polyInstallAction|polyLayoutUV|polyListComponentConversion|polyMapCut|polyMapDel|polyMapSew|polyMapSewMove|polyMergeEdge|polyMergeEdgeCtx|polyMergeFacet|polyMergeFacetCtx|polyMergeUV|polyMergeVertex|polyMirrorFace|polyMoveEdge|polyMoveFacet|polyMoveFacetUV|polyMoveUV|polyMoveVertex|polyNormal|polyNormalPerVertex|polyNormalizeUV|polyOptUvs|polyOptions|polyOutput|polyPipe|polyPlanarProjection|polyPlane|polyPlatonicSolid|polyPoke|polyPrimitive|polyPrism|polyProjection|polyPyramid|polyQuad|polyQueryBlindData|polyReduce|polySelect|polySelectConstraint|polySelectConstraintMonitor|polySelectCtx|polySelectEditCtx|polySeparate|polySetToFaceNormal|polySewEdge|polyShortestPathCtx|polySmooth|polySoftEdge|polySphere|polySphericalProjection|polySplit|polySplitCtx|polySplitEdge|polySplitRing|polySplitVertex|polyStraightenUVBorder|polySubdivideEdge|polySubdivideFacet|polyToSubdiv|polyTorus|polyTransfer|polyTriangulate|polyUVSet|polyUnite|polyWedgeFace|popen|popupMenu|pose|pow|preloadRefEd|print|progressBar|progressWindow|projFileViewer|projectCurve|projectTangent|projectionContext|projectionManip|promptDialog|propModCtx|propMove|psdChannelOutliner|psdEditTextureFile|psdExport|psdTextureFile|putenv|pwd|python|querySubdiv|quit|rad_to_deg|radial|radioButton|radioButtonGrp|radioCollection|radioMenuItemCollection|rampColorPort|rand|randomizeFollicles|randstate|rangeControl|readTake|rebuildCurve|rebuildSurface|recordAttr|recordDevice|redo|reference|referenceEdit|referenceQuery|refineSubdivSelectionList|refresh|refreshAE|registerPluginResource|rehash|reloadImage|removeJoint|removeMultiInstance|removePanelCategory|rename|renameAttr|renameSelectionList|renameUI|render|renderGlobalsNode|renderInfo|renderLayerButton|renderLayerParent|renderLayerPostProcess|renderLayerUnparent|renderManip|renderPartition|renderQualityNode|renderSettings|renderThumbnailUpdate|renderWindowEditor|renderWindowSelectContext|renderer|reorder|reorderDeformers|requires|reroot|resampleFluid|resetAE|resetPfxToPolyCamera|resetTool|resolutionNode|retarget|reverseCurve|reverseSurface|revolve|rgb_to_hsv|rigidBody|rigidSolver|roll|rollCtx|rootOf|rot|rotate|rotationInterpolation|roundConstantRadius|rowColumnLayout|rowLayout|runTimeCommand|runup|sampleImage|saveAllShelves|saveAttrPreset|saveFluid|saveImage|saveInitialState|saveMenu|savePrefObjects|savePrefs|saveShelf|saveToolSettings|scale|scaleBrushBrightness|scaleComponents|scaleConstraint|scaleKey|scaleKeyCtx|sceneEditor|sceneUIReplacement|scmh|scriptCtx|scriptEditorInfo|scriptJob|scriptNode|scriptTable|scriptToShelf|scriptedPanel|scriptedPanelType|scrollField|scrollLayout|sculpt|searchPathArray|seed|selLoadSettings|select|selectContext|selectCurveCV|selectKey|selectKeyCtx|selectKeyframeRegionCtx|selectMode|selectPref|selectPriority|selectType|selectedNodes|selectionConnection|separator|setAttr|setAttrEnumResource|setAttrMapping|setAttrNiceNameResource|setConstraintRestPosition|setDefaultShadingGroup|setDrivenKeyframe|setDynamic|setEditCtx|setEditor|setFluidAttr|setFocus|setInfinity|setInputDeviceMapping|setKeyCtx|setKeyPath|setKeyframe|setKeyframeBlendshapeTargetWts|setMenuMode|setNodeNiceNameResource|setNodeTypeFlag|setParent|setParticleAttr|setPfxToPolyCamera|setPluginResource|setProject|setStampDensity|setStartupMessage|setState|setToolTo|setUITemplate|setXformManip|sets|shadingConnection|shadingGeometryRelCtx|shadingLightRelCtx|shadingNetworkCompare|shadingNode|shapeCompare|shelfButton|shelfLayout|shelfTabLayout|shellField|shortNameOf|showHelp|showHidden|showManipCtx|showSelectionInTitle|showShadingGroupAttrEditor|showWindow|sign|simplify|sin|singleProfileBirailSurface|size|sizeBytes|skinCluster|skinPercent|smoothCurve|smoothTangentSurface|smoothstep|snap2to2|snapKey|snapMode|snapTogetherCtx|snapshot|soft|softMod|softModCtx|sort|sound|soundControl|source|spaceLocator|sphere|sphrand|spotLight|spotLightPreviewPort|spreadSheetEditor|spring|sqrt|squareSurface|srtContext|stackTrace|startString|startsWith|stitchAndExplodeShell|stitchSurface|stitchSurfacePoints|strcmp|stringArrayCatenate|stringArrayContains|stringArrayCount|stringArrayInsertAtIndex|stringArrayIntersector|stringArrayRemove|stringArrayRemoveAtIndex|stringArrayRemoveDuplicates|stringArrayRemoveExact|stringArrayToString|stringToStringArray|strip|stripPrefixFromName|stroke|subdAutoProjection|subdCleanTopology|subdCollapse|subdDuplicateAndConnect|subdEditUV|subdListComponentConversion|subdMapCut|subdMapSewMove|subdMatchTopology|subdMirror|subdToBlind|subdToPoly|subdTransferUVsToCache|subdiv|subdivCrease|subdivDisplaySmoothness|substitute|substituteAllString|substituteGeometry|substring|surface|surfaceSampler|surfaceShaderList|swatchDisplayPort|switchTable|symbolButton|symbolCheckBox|sysFile|system|tabLayout|tan|tangentConstraint|texLatticeDeformContext|texManipContext|texMoveContext|texMoveUVShellContext|texRotateContext|texScaleContext|texSelectContext|texSelectShortestPathCtx|texSmudgeUVContext|texWinToolCtx|text|textCurves|textField|textFieldButtonGrp|textFieldGrp|textManip|textScrollList|textToShelf|textureDisplacePlane|textureHairColor|texturePlacementContext|textureWindow|threadCount|threePointArcCtx|timeControl|timePort|timerX|toNativePath|toggle|toggleAxis|toggleWindowVisibility|tokenize|tokenizeList|tolerance|tolower|toolButton|toolCollection|toolDropped|toolHasOptions|toolPropertyWindow|torus|toupper|trace|track|trackCtx|transferAttributes|transformCompare|transformLimits|translator|trim|trunc|truncateFluidCache|truncateHairCache|tumble|tumbleCtx|turbulence|twoPointArcCtx|uiRes|uiTemplate|unassignInputDevice|undo|undoInfo|ungroup|uniform|unit|unloadPlugin|untangleUV|untitledFileName|untrim|upAxis|updateAE|userCtx|uvLink|uvSnapshot|validateShelfName|vectorize|view2dToolCtx|viewCamera|viewClipPlane|viewFit|viewHeadOn|viewLookAt|viewManip|viewPlace|viewSet|visor|volumeAxis|vortex|waitCursor|warning|webBrowser|webBrowserPrefs|whatIs|window|windowPref|wire|wireContext|workspace|wrinkle|wrinkleContext|writeTake|xbmLangPathList|xform)\b/,
    operator: [
    /\+[+=]?|-[-=]?|&&|\|\||[<>]=|[*\/!=]=?|[%^]/,
    { pattern: /(^|[^<])<(?!<)/, lookbehind: !0 },
    { pattern: /(^|[^>])>(?!>)/, lookbehind: !0 },
    ],
    punctuation: /<<|>>|[.,:;?\[\](){}]/,
}),
(Prism.languages.mel.code.inside.rest = Prism.languages.mel),
(Prism.languages.mizar = {
    comment: /::.+/,
    keyword:
    /@proof\b|\b(?:according|aggregate|all|and|antonym|are|as|associativity|assume|asymmetry|attr|be|begin|being|by|canceled|case|cases|clusters?|coherence|commutativity|compatibility|connectedness|consider|consistency|constructors|contradiction|correctness|def|deffunc|define|definitions?|defpred|do|does|equals|end|environ|ex|exactly|existence|for|from|func|given|hence|hereby|holds|idempotence|identity|iff?|implies|involutiveness|irreflexivity|is|it|let|means|mode|non|not|notations?|now|of|or|otherwise|over|per|pred|prefix|projectivity|proof|provided|qua|reconsider|redefine|reduce|reducibility|reflexivity|registrations?|requirements|reserve|sch|schemes?|section|selector|set|sethood|st|struct|such|suppose|symmetry|synonym|take|that|the|then|theorems?|thesis|thus|to|transitivity|uniqueness|vocabular(?:y|ies)|when|where|with|wrt)\b/,
    parameter: { pattern: /\$(?:10|\d)/, alias: "variable" },
    variable: /\w+(?=:)/,
    number: /(?:\b|-)\d+\b/,
    operator: /\.\.\.|->|&|\.?=/,
    punctuation: /\(#|#\)|[,:;\[\](){}]/,
}),
(Prism.languages.monkey = {
    string: /"[^"\r\n]*"/,
    comment: [
    { pattern: /^#Rem\s+[\s\S]*?^#End/im, greedy: !0 },
    { pattern: /'.+/, greedy: !0 },
    ],
    preprocessor: {
    pattern: /(^[ \t]*)#.+/m,
    lookbehind: !0,
    alias: "comment",
    },
    function: /\w+(?=\()/,
    "type-char": { pattern: /(\w)[?%#$]/, lookbehind: !0, alias: "variable" },
    number: {
    pattern:
        /((?:\.\.)?)(?:(?:\b|\B-\.?|\B\.)\d+(?:(?!\.\.)\.\d*)?|\$[\da-f]+)/i,
    lookbehind: !0,
    },
    keyword:
    /\b(?:Void|Strict|Public|Private|Property|Bool|Int|Float|String|Array|Object|Continue|Exit|Import|Extern|New|Self|Super|Try|Catch|Eachin|True|False|Extends|Abstract|Final|Select|Case|Default|Const|Local|Global|Field|Method|Function|Class|End|If|Then|Else|ElseIf|EndIf|While|Wend|Repeat|Until|Forever|For|To|Step|Next|Return|Module|Interface|Implements|Inline|Throw|Null)\b/i,
    operator:
    /\.\.|<[=>]?|>=?|:?=|(?:[+\-*\/&~|]|\b(?:Mod|Shl|Shr)\b)=?|\b(?:And|Not|Or)\b/i,
    punctuation: /[.,:;()\[\]]/,
}),
(Prism.languages.n1ql = {
    comment: /\/\*[\s\S]*?(?:$|\*\/)/,
    parameter: /\$[\w.]+/,
    string: { pattern: /(["'])(?:\\[\s\S]|(?!\1)[^\\]|\1\1)*\1/, greedy: !0 },
    identifier: { pattern: /`(?:\\[\s\S]|[^\\`]|``)*`/, greedy: !0 },
    function:
    /\b(?:ABS|ACOS|ARRAY_AGG|ARRAY_APPEND|ARRAY_AVG|ARRAY_CONCAT|ARRAY_CONTAINS|ARRAY_COUNT|ARRAY_DISTINCT|ARRAY_FLATTEN|ARRAY_IFNULL|ARRAY_INSERT|ARRAY_INTERSECT|ARRAY_LENGTH|ARRAY_MAX|ARRAY_MIN|ARRAY_POSITION|ARRAY_PREPEND|ARRAY_PUT|ARRAY_RANGE|ARRAY_REMOVE|ARRAY_REPEAT|ARRAY_REPLACE|ARRAY_REVERSE|ARRAY_SORT|ARRAY_STAR|ARRAY_SUM|ARRAY_SYMDIFF|ARRAY_SYMDIFFN|ARRAY_UNION|ASIN|ATAN|ATAN2|AVG|BASE64|BASE64_DECODE|BASE64_ENCODE|BITAND|BITCLEAR|BITNOT|BITOR|BITSET|BITSHIFT|BITTEST|BITXOR|CEIL|CLOCK_LOCAL|CLOCK_MILLIS|CLOCK_STR|CLOCK_TZ|CLOCK_UTC|CONTAINS|CONTAINS_TOKEN|CONTAINS_TOKEN_LIKE|CONTAINS_TOKEN_REGEXP|COS|COUNT|CURL|DATE_ADD_MILLIS|DATE_ADD_STR|DATE_DIFF_MILLIS|DATE_DIFF_STR|DATE_FORMAT_STR|DATE_PART_MILLIS|DATE_PART_STR|DATE_RANGE_MILLIS|DATE_RANGE_STR|DATE_TRUNC_MILLIS|DATE_TRUNC_STR|DECODE_JSON|DEGREES|DURATION_TO_STR|E|ENCODED_SIZE|ENCODE_JSON|EXP|FLOOR|GREATEST|HAS_TOKEN|IFINF|IFMISSING|IFMISSINGORNULL|IFNAN|IFNANORINF|IFNULL|INITCAP|ISARRAY|ISATOM|ISBOOLEAN|ISNUMBER|ISOBJECT|ISSTRING|IsBitSET|LEAST|LENGTH|LN|LOG|LOWER|LTRIM|MAX|META|MILLIS|MILLIS_TO_LOCAL|MILLIS_TO_STR|MILLIS_TO_TZ|MILLIS_TO_UTC|MILLIS_TO_ZONE_NAME|MIN|MISSINGIF|NANIF|NEGINFIF|NOW_LOCAL|NOW_MILLIS|NOW_STR|NOW_TZ|NOW_UTC|NULLIF|OBJECT_ADD|OBJECT_CONCAT|OBJECT_INNER_PAIRS|OBJECT_INNER_VALUES|OBJECT_LENGTH|OBJECT_NAMES|OBJECT_PAIRS|OBJECT_PUT|OBJECT_REMOVE|OBJECT_RENAME|OBJECT_REPLACE|OBJECT_UNWRAP|OBJECT_VALUES|PAIRS|PI|POLY_LENGTH|POSINFIF|POSITION|POWER|RADIANS|RANDOM|REGEXP_CONTAINS|REGEXP_LIKE|REGEXP_POSITION|REGEXP_REPLACE|REPEAT|REPLACE|REVERSE|ROUND|RTRIM|SIGN|SIN|SPLIT|SQRT|STR_TO_DURATION|STR_TO_MILLIS|STR_TO_TZ|STR_TO_UTC|STR_TO_ZONE_NAME|SUBSTR|SUFFIXES|SUM|TAN|TITLE|TOARRAY|TOATOM|TOBOOLEAN|TOKENS|TOKENS|TONUMBER|TOOBJECT|TOSTRING|TRIM|TRUNC|TYPE|UPPER|WEEKDAY_MILLIS|WEEKDAY_STR)(?=\s*\()/i,
    keyword:
    /\b(?:ALL|ALTER|ANALYZE|AS|ASC|BEGIN|BINARY|BOOLEAN|BREAK|BUCKET|BUILD|BY|CALL|CAST|CLUSTER|COLLATE|COLLECTION|COMMIT|CONNECT|CONTINUE|CORRELATE|COVER|CREATE|DATABASE|DATASET|DATASTORE|DECLARE|DECREMENT|DELETE|DERIVED|DESC|DESCRIBE|DISTINCT|DO|DROP|EACH|ELEMENT|EXCEPT|EXCLUDE|EXECUTE|EXPLAIN|FETCH|FLATTEN|FOR|FORCE|FROM|FUNCTION|GRANT|GROUP|GSI|HAVING|IF|IGNORE|ILIKE|INCLUDE|INCREMENT|INDEX|INFER|INLINE|INNER|INSERT|INTERSECT|INTO|IS|JOIN|KEY|KEYS|KEYSPACE|KNOWN|LAST|LEFT|LET|LETTING|LIMIT|LSM|MAP|MAPPING|MATCHED|MATERIALIZED|MERGE|MINUS|MISSING|NAMESPACE|NEST|NULL|NUMBER|OBJECT|OFFSET|ON|OPTION|ORDER|OUTER|OVER|PARSE|PARTITION|PASSWORD|PATH|POOL|PREPARE|PRIMARY|PRIVATE|PRIVILEGE|PROCEDURE|PUBLIC|RAW|REALM|REDUCE|RENAME|RETURN|RETURNING|REVOKE|RIGHT|ROLE|ROLLBACK|SATISFIES|SCHEMA|SELECT|SELF|SEMI|SET|SHOW|SOME|START|STATISTICS|STRING|SYSTEM|TO|TRANSACTION|TRIGGER|TRUNCATE|UNDER|UNION|UNIQUE|UNKNOWN|UNNEST|UNSET|UPDATE|UPSERT|USE|USER|USING|VALIDATE|VALUE|VALUES|VIA|VIEW|WHERE|WHILE|WITH|WORK|XOR)\b/i,
    boolean: /\b(?:TRUE|FALSE)\b/i,
    number: /(?:\b\d+\.|\B\.)\d+e[+\-]?\d+\b|\b\d+\.?\d*|\B\.\d+\b/i,
    operator:
    /[-+*\/=%]|!=|==?|\|\||<[>=]?|>=?|\b(?:AND|ANY|ARRAY|BETWEEN|CASE|ELSE|END|EVERY|EXISTS|FIRST|IN|LIKE|NOT|OR|THEN|VALUED|WHEN|WITHIN)\b/i,
    punctuation: /[;[\](),.{}:]/,
}),
(Prism.languages.n4js = Prism.languages.extend("javascript", {
    keyword:
    /\b(?:any|Array|boolean|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|module|new|null|number|package|private|protected|public|return|set|static|string|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/,
})),
Prism.languages.insertBefore("n4js", "constant", {
    annotation: { pattern: /@+\w+/, alias: "operator" },
}),
(Prism.languages.n4jsd = Prism.languages.n4js),
(Prism.languages["nand2tetris-hdl"] = {
    comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
    keyword: /\b(?:CHIP|IN|OUT|PARTS|BUILTIN|CLOCKED)\b/,
    boolean: /\b(?:true|false)\b/,
    function: /[A-Za-z][A-Za-z0-9]*(?=\()/,
    number: /\b\d+\b/,
    operator: /=|\.\./,
    punctuation: /[{}[\];(),:]/,
}),
(Prism.languages.nasm = {
    comment: /;.*$/m,
    string: /(["'`])(?:\\.|(?!\1)[^\\\r\n])*\1/,
    label: {
    pattern: /(^\s*)[A-Za-z._?$][\w.?$@~#]*:/m,
    lookbehind: !0,
    alias: "function",
    },
    keyword: [
    /\[?BITS (?:16|32|64)\]?/,
    { pattern: /(^\s*)section\s*[a-zA-Z.]+:?/im, lookbehind: !0 },
    /(?:extern|global)[^;\r\n]*/i,
    /(?:CPU|FLOAT|DEFAULT).*$/m,
    ],
    register: {
    pattern:
        /\b(?:st\d|[xyz]mm\d\d?|[cdt]r\d|r\d\d?[bwd]?|[er]?[abcd]x|[abcd][hl]|[er]?(?:bp|sp|si|di)|[cdefgs]s)\b/i,
    alias: "variable",
    },
    number:
    /(?:\b|(?=\$))(?:0[hx][\da-f]*\.?[\da-f]+(?:p[+-]?\d+)?|\d[\da-f]+[hx]|\$\d[\da-f]*|0[oq][0-7]+|[0-7]+[oq]|0[by][01]+|[01]+[by]|0[dt]\d+|\d*\.?\d+(?:\.?e[+-]?\d+)?[dt]?)\b/i,
    operator: /[\[\]*+\-\/%<>=&|$!]/,
}),
(Prism.languages.nginx = Prism.languages.extend("clike", {
    comment: { pattern: /(^|[^"{\\])#.*/, lookbehind: !0 },
    keyword:
    /\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|if_not_empty|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|http|events|accept_mutex|accept_mutex_delay|access_log|add_after_body|add_before_body|add_header|addition_types|aio|alias|allow|ancient_browser|ancient_browser_value|auth|auth_basic|auth_basic_user_file|auth_http|auth_http_header|auth_http_timeout|autoindex|autoindex_exact_size|autoindex_localtime|break|charset|charset_map|charset_types|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|create_full_put_path|daemon|dav_access|dav_methods|debug_connection|debug_points|default_type|deny|devpoll_changes|devpoll_events|directio|directio_alignment|disable_symlinks|empty_gif|env|epoll_events|error_log|error_page|expires|fastcgi_buffer_size|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_timeout|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_connect_timeout|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_read_timeout|fastcgi_redirect_errors|fastcgi_send_timeout|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geo|geoip_city|geoip_country|google_perftools_profiles|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_static|gzip_types|gzip_vary|if|if_modified_since|ignore_invalid_headers|image_filter|image_filter_buffer|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|imap_capabilities|imap_client_buffer|include|index|internal|ip_hash|keepalive|keepalive_disable|keepalive_requests|keepalive_timeout|kqueue_changes|kqueue_events|large_client_header_buffers|limit_conn|limit_conn_log_level|limit_conn_zone|limit_except|limit_rate|limit_rate_after|limit_req|limit_req_log_level|limit_req_zone|limit_zone|lingering_close|lingering_time|lingering_timeout|listen|location|lock_file|log_format|log_format_combined|log_not_found|log_subrequest|map|map_hash_bucket_size|map_hash_max_size|master_process|max_ranges|memcached_buffer_size|memcached_connect_timeout|memcached_next_upstream|memcached_pass|memcached_read_timeout|memcached_send_timeout|merge_slashes|min_delete_depth|modern_browser|modern_browser_value|mp4|mp4_buffer_size|mp4_max_buffer_size|msie_padding|msie_refresh|multi_accept|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|open_log_file_cache|optimize_server_names|override_charset|pcre_jit|perl|perl_modules|perl_require|perl_set|pid|pop3_auth|pop3_capabilities|port_in_redirect|post_action|postpone_output|protocol|proxy|proxy_buffer|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_bypass|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_timeout|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_no_cache|proxy_pass|proxy_pass_error_message|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_redirect_errors|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_ssl_session_reuse|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|proxy_timeout|proxy_upstream_fail_timeout|proxy_upstream_max_fails|random_index|read_ahead|real_ip_header|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|return|rewrite|root|rtsig_overflow_events|rtsig_overflow_test|rtsig_overflow_threshold|rtsig_signo|satisfy|satisfy_any|secure_link_secret|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|set|set_real_ip_from|smtp_auth|smtp_capabilities|so_keepalive|source_charset|split_clients|ssi|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_engine|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_timeout|ssl_verify_client|ssl_verify_depth|starttls|stub_status|sub_filter|sub_filter_once|sub_filter_types|tcp_nodelay|tcp_nopush|timeout|timer_resolution|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|uninitialized_variable_warn|upstream|use|user|userid|userid_domain|userid_expires|userid_name|userid_p3p|userid_path|userid_service|valid_referers|variables_hash_bucket_size|variables_hash_max_size|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_rlimit_sigpending|working_directory|xclient|xml_entities|xslt_entities|xslt_stylesheet|xslt_types|ssl_session_tickets|ssl_stapling|ssl_stapling_verify|ssl_ecdh_curve|ssl_trusted_certificate|more_set_headers|ssl_early_data)\b/i,
})),
Prism.languages.insertBefore("nginx", "keyword", { variable: /\$[a-z_]+/i }),
(Prism.languages.nim = {
    comment: /#.*/,
    string: {
    pattern:
        /(?:(?:\b(?!\d)(?:\w|\\x[8-9a-fA-F][0-9a-fA-F])+)?(?:"""[\s\S]*?"""(?!")|"(?:\\[\s\S]|""|[^"\\])*")|'(?:\\(?:\d+|x[\da-fA-F]{2}|.)|[^'])')/,
    greedy: !0,
    },
    number:
    /\b(?:0[xXoObB][\da-fA-F_]+|\d[\d_]*(?:(?!\.\.)\.[\d_]*)?(?:[eE][+-]?\d[\d_]*)?)(?:'?[iuf]\d*)?/,
    keyword:
    /\b(?:addr|as|asm|atomic|bind|block|break|case|cast|concept|const|continue|converter|defer|discard|distinct|do|elif|else|end|enum|except|export|finally|for|from|func|generic|if|import|include|interface|iterator|let|macro|method|mixin|nil|object|out|proc|ptr|raise|ref|return|static|template|try|tuple|type|using|var|when|while|with|without|yield)\b/,
    function: {
    pattern:
        /(?:(?!\d)(?:\w|\\x[8-9a-fA-F][0-9a-fA-F])+|`[^`\r\n]+`)\*?(?:\[[^\]]+\])?(?=\s*\()/,
    inside: { operator: /\*$/ },
    },
    ignore: { pattern: /`[^`\r\n]+`/, inside: { punctuation: /`/ } },
    operator: {
    pattern:
        /(^|[({\[](?=\.\.)|(?![({\[]\.).)(?:(?:[=+\-*\/<>@$~&%|!?^:\\]|\.\.|\.(?![)}\]]))+|\b(?:and|div|of|or|in|is|isnot|mod|not|notin|shl|shr|xor)\b)/m,
    lookbehind: !0,
    },
    punctuation: /[({\[]\.|\.[)}\]]|[`(){}\[\],:]/,
}),
(Prism.languages.nix = {
    comment: /\/\*[\s\S]*?\*\/|#.*/,
    string: {
    pattern: /"(?:[^"\\]|\\[\s\S])*"|''(?:(?!'')[\s\S]|''(?:'|\\|\$\{))*''/,
    greedy: !0,
    inside: {
        interpolation: {
        pattern: /(^|(?:^|(?!'').)[^\\])\$\{(?:[^}]|\{[^}]*\})*}/,
        lookbehind: !0,
        inside: {
            antiquotation: { pattern: /^\$(?=\{)/, alias: "variable" },
        },
        },
    },
    },
    url: [
    /\b(?:[a-z]{3,7}:\/\/)[\w\-+%~\/.:#=?&]+/,
    {
        pattern:
        /([^\/])(?:[\w\-+%~.:#=?&]*(?!\/\/)[\w\-+%~\/.:#=?&])?(?!\/\/)\/[\w\-+%~\/.:#=?&]*/,
        lookbehind: !0,
    },
    ],
    antiquotation: { pattern: /\$(?=\{)/, alias: "variable" },
    number: /\b\d+\b/,
    keyword: /\b(?:assert|builtins|else|if|in|inherit|let|null|or|then|with)\b/,
    function:
    /\b(?:abort|add|all|any|attrNames|attrValues|baseNameOf|compareVersions|concatLists|currentSystem|deepSeq|derivation|dirOf|div|elem(?:At)?|fetch(?:url|Tarball)|filter(?:Source)?|fromJSON|genList|getAttr|getEnv|hasAttr|hashString|head|import|intersectAttrs|is(?:Attrs|Bool|Function|Int|List|Null|String)|length|lessThan|listToAttrs|map|mul|parseDrvName|pathExists|read(?:Dir|File)|removeAttrs|replaceStrings|seq|sort|stringLength|sub(?:string)?|tail|throw|to(?:File|JSON|Path|String|XML)|trace|typeOf)\b|\bfoldl'\B/,
    boolean: /\b(?:true|false)\b/,
    operator: /[=!<>]=?|\+\+?|\|\||&&|\/\/|->?|[?@]/,
    punctuation: /[{}()[\].,:;]/,
}),
(Prism.languages.nix.string.inside.interpolation.inside.rest =
    Prism.languages.nix),
(Prism.languages.nsis = {
    comment: {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|[#;].*)/,
    lookbehind: !0,
    },
    string: { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
    keyword: {
    pattern:
        /(^\s*)(?:Abort|Add(?:BrandingImage|Size)|AdvSplash|Allow(?:RootDirInstall|SkipFiles)|AutoCloseWindow|Banner|BG(?:Font|Gradient|Image)|BrandingText|BringToFront|Call(?:InstDLL)?|Caption|ChangeUI|CheckBitmap|ClearErrors|CompletedText|ComponentText|CopyFiles|CRCCheck|Create(?:Directory|Font|ShortCut)|Delete(?:INISec|INIStr|RegKey|RegValue)?|Detail(?:Print|sButtonText)|Dialer|Dir(?:Text|Var|Verify)|EnableWindow|Enum(?:RegKey|RegValue)|Exch|Exec(?:Shell(?:Wait)?|Wait)?|ExpandEnvStrings|File(?:BufSize|Close|ErrorText|Open|Read|ReadByte|ReadUTF16LE|ReadWord|WriteUTF16LE|Seek|Write|WriteByte|WriteWord)?|Find(?:Close|First|Next|Window)|FlushINI|Get(?:CurInstType|CurrentAddress|DlgItem|DLLVersion(?:Local)?|ErrorLevel|FileTime(?:Local)?|FullPathName|Function(?:Address|End)?|InstDirError|LabelAddress|TempFileName)|Goto|HideWindow|Icon|If(?:Abort|Errors|FileExists|RebootFlag|Silent)|InitPluginsDir|Install(?:ButtonText|Colors|Dir(?:RegKey)?)|InstProgressFlags|Inst(?:Type(?:GetText|SetText)?)|Int(?:64|Ptr)?CmpU?|Int(?:64)?Fmt|Int(?:Ptr)?Op|IsWindow|Lang(?:DLL|String)|License(?:BkColor|Data|ForceSelection|LangString|Text)|LoadLanguageFile|LockWindow|Log(?:Set|Text)|Manifest(?:DPIAware|SupportedOS)|Math|MessageBox|MiscButtonText|Name|Nop|ns(?:Dialogs|Exec)|NSISdl|OutFile|Page(?:Callbacks)?|PE(?:DllCharacteristics|SubsysVer)|Pop|Push|Quit|Read(?:EnvStr|INIStr|RegDWORD|RegStr)|Reboot|RegDLL|Rename|RequestExecutionLevel|ReserveFile|Return|RMDir|SearchPath|Section(?:End|GetFlags|GetInstTypes|GetSize|GetText|Group|In|SetFlags|SetInstTypes|SetSize|SetText)?|SendMessage|Set(?:AutoClose|BrandingImage|Compress|Compressor(?:DictSize)?|CtlColors|CurInstType|DatablockOptimize|DateSave|Details(?:Print|View)|ErrorLevel|Errors|FileAttributes|Font|OutPath|Overwrite|PluginUnload|RebootFlag|RegView|ShellVarContext|Silent)|Show(?:InstDetails|UninstDetails|Window)|Silent(?:Install|UnInstall)|Sleep|SpaceTexts|Splash|StartMenu|Str(?:CmpS?|Cpy|Len)|SubCaption|System|Unicode|Uninstall(?:ButtonText|Caption|Icon|SubCaption|Text)|UninstPage|UnRegDLL|UserInfo|Var|VI(?:AddVersionKey|FileVersion|ProductVersion)|VPatch|WindowIcon|Write(?:INIStr|Reg(?:Bin|DWORD|ExpandStr|MultiStr|None|Str)|Uninstaller)|XPStyle)\b/m,
    lookbehind: !0,
    },
    property:
    /\b(?:admin|all|auto|both|colored|false|force|hide|highest|lastused|leave|listonly|none|normal|notset|off|on|open|print|show|silent|silentlog|smooth|textonly|true|user|ARCHIVE|FILE_(?:ATTRIBUTE_ARCHIVE|ATTRIBUTE_NORMAL|ATTRIBUTE_OFFLINE|ATTRIBUTE_READONLY|ATTRIBUTE_SYSTEM|ATTRIBUTE_TEMPORARY)|HK(?:(?:CR|CU|LM)(?:32|64)?|DD|PD|U)|HKEY_(?:CLASSES_ROOT|CURRENT_CONFIG|CURRENT_USER|DYN_DATA|LOCAL_MACHINE|PERFORMANCE_DATA|USERS)|ID(?:ABORT|CANCEL|IGNORE|NO|OK|RETRY|YES)|MB_(?:ABORTRETRYIGNORE|DEFBUTTON1|DEFBUTTON2|DEFBUTTON3|DEFBUTTON4|ICONEXCLAMATION|ICONINFORMATION|ICONQUESTION|ICONSTOP|OK|OKCANCEL|RETRYCANCEL|RIGHT|RTLREADING|SETFOREGROUND|TOPMOST|USERICON|YESNO)|NORMAL|OFFLINE|READONLY|SHCTX|SHELL_CONTEXT|SYSTEM|TEMPORARY)\b/,
    constant: /\${[\w\.:\^-]+}|\$\([\w\.:\^-]+\)/i,
    variable: /\$\w+/i,
    number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
    operator: /--?|\+\+?|<=?|>=?|==?=?|&&?|\|\|?|[?*\/~^%]/,
    punctuation: /[{}[\];(),.:]/,
    important: {
    pattern:
        /(^\s*)!(?:addincludedir|addplugindir|appendfile|cd|define|delfile|echo|else|endif|error|execute|finalize|getdllversion|gettlbversion|ifdef|ifmacrodef|ifmacrondef|ifndef|if|include|insertmacro|macroend|macro|makensis|packhdr|pragma|searchparse|searchreplace|system|tempfile|undef|verbose|warning)\b/im,
    lookbehind: !0,
    },
}),
(Prism.languages.objectivec = Prism.languages.extend("c", {
    keyword:
    /\b(?:asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|in|self|super)\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\b/,
    string:
    /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|@"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,
    operator: /-[->]?|\+\+?|!=?|<<?=?|>>?=?|==?|&&?|\|\|?|[~^%?*\/@]/,
})),
delete Prism.languages.objectivec["class-name"],
(Prism.languages.ocaml = {
    comment: /\(\*[\s\S]*?\*\)/,
    string: [
    { pattern: /"(?:\\.|[^\\\r\n"])*"/, greedy: !0 },
    {
        pattern: /(['`])(?:\\(?:\d+|x[\da-f]+|.)|(?!\1)[^\\\r\n])\1/i,
        greedy: !0,
    },
    ],
    number:
    /\b(?:0x[\da-f][\da-f_]+|(?:0[bo])?\d[\d_]*\.?[\d_]*(?:e[+-]?[\d_]+)?)/i,
    directive: { pattern: /\B#\w+/, alias: "important" },
    label: { pattern: /\B~\w+/, alias: "function" },
    type_variable: { pattern: /\B'\w+/, alias: "function" },
    variant: { pattern: /`\w+/, alias: "variable" },
    module: { pattern: /\b[A-Z]\w+/, alias: "variable" },
    keyword:
    /\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|nonrec|object|of|open|private|rec|sig|struct|then|to|try|type|val|value|virtual|when|where|while|with)\b/,
    boolean: /\b(?:false|true)\b/,
    operator:
    /:=|[=<>@^|&+\-*\/$%!?~][!$%&*+\-.\/:<=>?@^|~]*|\b(?:and|asr|land|lor|lsl|lsr|lxor|mod|or)\b/,
    punctuation: /[(){}\[\]|_.,:;]/,
}),
!(function (a) {
    a.languages.opencl = a.languages.extend("c", {
    keyword:
        /\b(?:__attribute__|(?:__)?(?:constant|global|kernel|local|private|read_only|read_write|write_only)|_cl_(?:command_queue|context|device_id|event|kernel|mem|platform_id|program|sampler)|auto|break|case|cl_(?:image_format|mem_fence_flags)|clk_event_t|complex|const|continue|default|do|(?:float|double)(?:16(?:x(?:1|16|2|4|8))?|1x(?:1|16|2|4|8)|2(?:x(?:1|16|2|4|8))?|3|4(?:x(?:1|16|2|4|8))?|8(?:x(?:1|16|2|4|8))?)?|else|enum|event_t|extern|for|goto|(?:u?(?:char|short|int|long)|half|quad|bool)(?:2|3|4|8|16)?|if|image(?:1d_(?:array_|buffer_)?t|2d_(?:array_(?:depth_|msaa_depth_|msaa_)?|depth_|msaa_depth_|msaa_)?t|3d_t)|imaginary|inline|intptr_t|ndrange_t|packed|pipe|ptrdiff_t|queue_t|register|reserve_id_t|restrict|return|sampler_t|signed|size_t|sizeof|static|struct|switch|typedef|uintptr_t|uniform|union|unsigned|void|volatile|while)\b/,
    "constant-opencl-kernel": {
        pattern:
        /\b(?:CHAR_(?:BIT|MAX|MIN)|CLK_(?:ADDRESS_(?:CLAMP(?:_TO_EDGE)?|NONE|REPEAT)|FILTER_(?:LINEAR|NEAREST)|(?:LOCAL|GLOBAL)_MEM_FENCE|NORMALIZED_COORDS_(?:FALSE|TRUE))|CL_(?:BGRA|(?:HALF_)?FLOAT|INTENSITY|LUMINANCE|A?R?G?B?[Ax]?|(?:(?:UN)?SIGNED|[US]NORM)_(?:INT(?:8|16|32))|UNORM_(?:INT_101010|SHORT_(?:555|565)))|(?:DBL|FLT|HALF)_(?:DIG|EPSILON|MANT_DIG|(?:MIN|MAX)(?:(?:_10)?_EXP)?)|FLT_RADIX|HUGE_VALF?|INFINITY|(?:INT|LONG|SCHAR|SHRT)_(?:MAX|MIN)|(?:UCHAR|USHRT|UINT|ULONG)_MAX|MAXFLOAT|M_(?:[12]_PI|2_SQRTPI|E|LN(?:2|10)|LOG(?:10|2)E?|PI(?:_[24])?|SQRT(?:1_2|2))(?:_F|_H)?|NAN)\b/,
        alias: "constant",
    },
    boolean: /\b(?:false|true)\b/,
    number:
        /(?:\b0x(?:[\da-f]+\.?[\da-f]*|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[fuhl]*/i,
    });
    var b = {
    "type-opencl-host": {
        pattern:
        /\b(?:cl_(?:GLenum|GLint|GLuin|addressing_mode|bitfield|bool|buffer_create_type|build_status|channel_(?:order|type)|(?:u?(?:char|short|int|long)|float|double)(?:2|3|4|8|16)?|command_(?:queue(?:_info|_properties)?|type)|context(?:_info|_properties)?|device_(?:exec_capabilities|fp_config|id|info|local_mem_type|mem_cache_type|type)|(?:event|sampler)(?:_info)?|filter_mode|half|image_info|kernel(?:_info|_work_group_info)?|map_flags|mem(?:_flags|_info|_object_type)?|platform_(?:id|info)|profiling_info|program(?:_build_info|_info)?))\b/,
        alias: "keyword",
    },
    "boolean-opencl-host": {
        pattern: /\bCL_(?:TRUE|FALSE)\b/,
        alias: "boolean",
    },
    "constant-opencl-host": {
        pattern:
        /\bCL_(?:A|ABGR|ADDRESS_(?:CLAMP(?:_TO_EDGE)?|MIRRORED_REPEAT|NONE|REPEAT)|ARGB|BGRA|BLOCKING|BUFFER_CREATE_TYPE_REGION|BUILD_(?:ERROR|IN_PROGRESS|NONE|PROGRAM_FAILURE|SUCCESS)|COMMAND_(?:ACQUIRE_GL_OBJECTS|BARRIER|COPY_(?:BUFFER(?:_RECT|_TO_IMAGE)?|IMAGE(?:_TO_BUFFER)?)|FILL_(?:BUFFER|IMAGE)|MAP(?:_BUFFER|_IMAGE)|MARKER|MIGRATE(?:_SVM)?_MEM_OBJECTS|NATIVE_KERNEL|NDRANGE_KERNEL|READ_(?:BUFFER(?:_RECT)?|IMAGE)|RELEASE_GL_OBJECTS|SVM_(?:FREE|MAP|MEMCPY|MEMFILL|UNMAP)|TASK|UNMAP_MEM_OBJECT|USER|WRITE_(?:BUFFER(?:_RECT)?|IMAGE))|COMPILER_NOT_AVAILABLE|COMPILE_PROGRAM_FAILURE|COMPLETE|CONTEXT_(?:DEVICES|INTEROP_USER_SYNC|NUM_DEVICES|PLATFORM|PROPERTIES|REFERENCE_COUNT)|DEPTH(?:_STENCIL)?|DEVICE_(?:ADDRESS_BITS|AFFINITY_DOMAIN_(?:L[1-4]_CACHE|NEXT_PARTITIONABLE|NUMA)|AVAILABLE|BUILT_IN_KERNELS|COMPILER_AVAILABLE|DOUBLE_FP_CONFIG|ENDIAN_LITTLE|ERROR_CORRECTION_SUPPORT|EXECUTION_CAPABILITIES|EXTENSIONS|GLOBAL_(?:MEM_(?:CACHELINE_SIZE|CACHE_SIZE|CACHE_TYPE|SIZE)|VARIABLE_PREFERRED_TOTAL_SIZE)|HOST_UNIFIED_MEMORY|IL_VERSION|IMAGE(?:2D_MAX_(?:HEIGHT|WIDTH)|3D_MAX_(?:DEPTH|HEIGHT|WIDTH)|_BASE_ADDRESS_ALIGNMENT|_MAX_ARRAY_SIZE|_MAX_BUFFER_SIZE|_PITCH_ALIGNMENT|_SUPPORT)|LINKER_AVAILABLE|LOCAL_MEM_SIZE|LOCAL_MEM_TYPE|MAX_(?:CLOCK_FREQUENCY|COMPUTE_UNITS|CONSTANT_ARGS|CONSTANT_BUFFER_SIZE|GLOBAL_VARIABLE_SIZE|MEM_ALLOC_SIZE|NUM_SUB_GROUPS|ON_DEVICE_(?:EVENTS|QUEUES)|PARAMETER_SIZE|PIPE_ARGS|READ_IMAGE_ARGS|READ_WRITE_IMAGE_ARGS|SAMPLERS|WORK_GROUP_SIZE|WORK_ITEM_DIMENSIONS|WORK_ITEM_SIZES|WRITE_IMAGE_ARGS)|MEM_BASE_ADDR_ALIGN|MIN_DATA_TYPE_ALIGN_SIZE|NAME|NATIVE_VECTOR_WIDTH_(?:CHAR|DOUBLE|FLOAT|HALF|INT|LONG|SHORT)|NOT_(?:AVAILABLE|FOUND)|OPENCL_C_VERSION|PARENT_DEVICE|PARTITION_(?:AFFINITY_DOMAIN|BY_AFFINITY_DOMAIN|BY_COUNTS|BY_COUNTS_LIST_END|EQUALLY|FAILED|MAX_SUB_DEVICES|PROPERTIES|TYPE)|PIPE_MAX_(?:ACTIVE_RESERVATIONS|PACKET_SIZE)|PLATFORM|PREFERRED_(?:GLOBAL_ATOMIC_ALIGNMENT|INTEROP_USER_SYNC|LOCAL_ATOMIC_ALIGNMENT|PLATFORM_ATOMIC_ALIGNMENT|VECTOR_WIDTH_(?:CHAR|DOUBLE|FLOAT|HALF|INT|LONG|SHORT))|PRINTF_BUFFER_SIZE|PROFILE|PROFILING_TIMER_RESOLUTION|QUEUE_(?:ON_(?:DEVICE_(?:MAX_SIZE|PREFERRED_SIZE|PROPERTIES)|HOST_PROPERTIES)|PROPERTIES)|REFERENCE_COUNT|SINGLE_FP_CONFIG|SUB_GROUP_INDEPENDENT_FORWARD_PROGRESS|SVM_(?:ATOMICS|CAPABILITIES|COARSE_GRAIN_BUFFER|FINE_GRAIN_BUFFER|FINE_GRAIN_SYSTEM)|TYPE(?:_ACCELERATOR|_ALL|_CPU|_CUSTOM|_DEFAULT|_GPU)?|VENDOR(?:_ID)?|VERSION)|DRIVER_VERSION|EVENT_(?:COMMAND_(?:EXECUTION_STATUS|QUEUE|TYPE)|CONTEXT|REFERENCE_COUNT)|EXEC_(?:KERNEL|NATIVE_KERNEL|STATUS_ERROR_FOR_EVENTS_IN_WAIT_LIST)|FILTER_(?:LINEAR|NEAREST)|FLOAT|FP_(?:CORRECTLY_ROUNDED_DIVIDE_SQRT|DENORM|FMA|INF_NAN|ROUND_TO_INF|ROUND_TO_NEAREST|ROUND_TO_ZERO|SOFT_FLOAT)|GLOBAL|HALF_FLOAT|IMAGE_(?:ARRAY_SIZE|BUFFER|DEPTH|ELEMENT_SIZE|FORMAT|FORMAT_MISMATCH|FORMAT_NOT_SUPPORTED|HEIGHT|NUM_MIP_LEVELS|NUM_SAMPLES|ROW_PITCH|SLICE_PITCH|WIDTH)|INTENSITY|INVALID_(?:ARG_INDEX|ARG_SIZE|ARG_VALUE|BINARY|BUFFER_SIZE|BUILD_OPTIONS|COMMAND_QUEUE|COMPILER_OPTIONS|CONTEXT|DEVICE|DEVICE_PARTITION_COUNT|DEVICE_QUEUE|DEVICE_TYPE|EVENT|EVENT_WAIT_LIST|GLOBAL_OFFSET|GLOBAL_WORK_SIZE|GL_OBJECT|HOST_PTR|IMAGE_DESCRIPTOR|IMAGE_FORMAT_DESCRIPTOR|IMAGE_SIZE|KERNEL|KERNEL_ARGS|KERNEL_DEFINITION|KERNEL_NAME|LINKER_OPTIONS|MEM_OBJECT|MIP_LEVEL|OPERATION|PIPE_SIZE|PLATFORM|PROGRAM|PROGRAM_EXECUTABLE|PROPERTY|QUEUE_PROPERTIES|SAMPLER|VALUE|WORK_DIMENSION|WORK_GROUP_SIZE|WORK_ITEM_SIZE)|KERNEL_(?:ARG_(?:ACCESS_(?:NONE|QUALIFIER|READ_ONLY|READ_WRITE|WRITE_ONLY)|ADDRESS_(?:CONSTANT|GLOBAL|LOCAL|PRIVATE|QUALIFIER)|INFO_NOT_AVAILABLE|NAME|TYPE_(?:CONST|NAME|NONE|PIPE|QUALIFIER|RESTRICT|VOLATILE))|ATTRIBUTES|COMPILE_NUM_SUB_GROUPS|COMPILE_WORK_GROUP_SIZE|CONTEXT|EXEC_INFO_SVM_FINE_GRAIN_SYSTEM|EXEC_INFO_SVM_PTRS|FUNCTION_NAME|GLOBAL_WORK_SIZE|LOCAL_MEM_SIZE|LOCAL_SIZE_FOR_SUB_GROUP_COUNT|MAX_NUM_SUB_GROUPS|MAX_SUB_GROUP_SIZE_FOR_NDRANGE|NUM_ARGS|PREFERRED_WORK_GROUP_SIZE_MULTIPLE|PRIVATE_MEM_SIZE|PROGRAM|REFERENCE_COUNT|SUB_GROUP_COUNT_FOR_NDRANGE|WORK_GROUP_SIZE)|LINKER_NOT_AVAILABLE|LINK_PROGRAM_FAILURE|LOCAL|LUMINANCE|MAP_(?:FAILURE|READ|WRITE|WRITE_INVALIDATE_REGION)|MEM_(?:ALLOC_HOST_PTR|ASSOCIATED_MEMOBJECT|CONTEXT|COPY_HOST_PTR|COPY_OVERLAP|FLAGS|HOST_NO_ACCESS|HOST_PTR|HOST_READ_ONLY|HOST_WRITE_ONLY|KERNEL_READ_AND_WRITE|MAP_COUNT|OBJECT_(?:ALLOCATION_FAILURE|BUFFER|IMAGE1D|IMAGE1D_ARRAY|IMAGE1D_BUFFER|IMAGE2D|IMAGE2D_ARRAY|IMAGE3D|PIPE)|OFFSET|READ_ONLY|READ_WRITE|REFERENCE_COUNT|SIZE|SVM_ATOMICS|SVM_FINE_GRAIN_BUFFER|TYPE|USES_SVM_POINTER|USE_HOST_PTR|WRITE_ONLY)|MIGRATE_MEM_OBJECT_(?:CONTENT_UNDEFINED|HOST)|MISALIGNED_SUB_BUFFER_OFFSET|NONE|NON_BLOCKING|OUT_OF_(?:HOST_MEMORY|RESOURCES)|PIPE_(?:MAX_PACKETS|PACKET_SIZE)|PLATFORM_(?:EXTENSIONS|HOST_TIMER_RESOLUTION|NAME|PROFILE|VENDOR|VERSION)|PROFILING_(?:COMMAND_(?:COMPLETE|END|QUEUED|START|SUBMIT)|INFO_NOT_AVAILABLE)|PROGRAM_(?:BINARIES|BINARY_SIZES|BINARY_TYPE(?:_COMPILED_OBJECT|_EXECUTABLE|_LIBRARY|_NONE)?|BUILD_(?:GLOBAL_VARIABLE_TOTAL_SIZE|LOG|OPTIONS|STATUS)|CONTEXT|DEVICES|IL|KERNEL_NAMES|NUM_DEVICES|NUM_KERNELS|REFERENCE_COUNT|SOURCE)|QUEUED|QUEUE_(?:CONTEXT|DEVICE|DEVICE_DEFAULT|ON_DEVICE|ON_DEVICE_DEFAULT|OUT_OF_ORDER_EXEC_MODE_ENABLE|PROFILING_ENABLE|PROPERTIES|REFERENCE_COUNT|SIZE)|R|RA|READ_(?:ONLY|WRITE)_CACHE|RG|RGB|RGBA|RGBx|RGx|RUNNING|Rx|SAMPLER_(?:ADDRESSING_MODE|CONTEXT|FILTER_MODE|LOD_MAX|LOD_MIN|MIP_FILTER_MODE|NORMALIZED_COORDS|REFERENCE_COUNT)|(?:UN)?SIGNED_INT(?:8|16|32)|SNORM_INT(?:8|16)|SUBMITTED|SUCCESS|UNORM_INT(?:16|24|8|_101010|_101010_2)|UNORM_SHORT_(?:555|565)|VERSION_(?:1_0|1_1|1_2|2_0|2_1)|sBGRA|sRGB|sRGBA|sRGBx)\b/,
        alias: "constant",
    },
    "function-opencl-host": {
        pattern:
        /\bcl(?:BuildProgram|CloneKernel|CompileProgram|Create(?:Buffer|CommandQueue(?:WithProperties)?|Context|ContextFromType|Image|Image2D|Image3D|Kernel|KernelsInProgram|Pipe|ProgramWith(?:Binary|BuiltInKernels|IL|Source)|Sampler|SamplerWithProperties|SubBuffer|SubDevices|UserEvent)|Enqueue(?:(?:Barrier|Marker)(?:WithWaitList)?|Copy(?:Buffer(?:Rect|ToImage)?|Image(?:ToBuffer)?)|(?:Fill|Map)(?:Buffer|Image)|MigrateMemObjects|NDRangeKernel|NativeKernel|(?:Read|Write)(?:Buffer(?:Rect)?|Image)|SVM(?:Free|Map|MemFill|Memcpy|MigrateMem|Unmap)|Task|UnmapMemObject|WaitForEvents)|Finish|Flush|Get(?:CommandQueueInfo|ContextInfo|Device(?:AndHostTimer|IDs|Info)|Event(?:Profiling)?Info|ExtensionFunctionAddress(?:ForPlatform)?|HostTimer|ImageInfo|Kernel(?:ArgInfo|Info|SubGroupInfo|WorkGroupInfo)|MemObjectInfo|PipeInfo|Platform(?:IDs|Info)|Program(?:Build)?Info|SamplerInfo|SupportedImageFormats)|LinkProgram|(?:Release|Retain)(?:CommandQueue|Context|Device|Event|Kernel|MemObject|Program|Sampler)|SVM(?:Alloc|Free)|Set(?:CommandQueueProperty|DefaultDeviceCommandQueue|EventCallback|Kernel(?:Arg(?:SVMPointer)?|ExecInfo)|Kernel|MemObjectDestructorCallback|UserEventStatus)|Unload(?:Platform)?Compiler|WaitForEvents)\b/,
        alias: "function",
    },
    };
    a.languages.insertBefore("c", "keyword", b),
    a.languages.cpp &&
        ((b["type-opencl-host-cpp"] = {
        pattern:
            /\b(?:Buffer|BufferGL|BufferRenderGL|CommandQueue|Context|Device|DeviceCommandQueue|EnqueueArgs|Event|Image|Image1D|Image1DArray|Image1DBuffer|Image2D|Image2DArray|Image2DGL|Image3D|Image3DGL|ImageFormat|ImageGL|Kernel|KernelFunctor|LocalSpaceArg|Memory|NDRange|Pipe|Platform|Program|Sampler|SVMAllocator|SVMTraitAtomic|SVMTraitCoarse|SVMTraitFine|SVMTraitReadOnly|SVMTraitReadWrite|SVMTraitWriteOnly|UserEvent)\b/,
        alias: "keyword",
        }),
        a.languages.insertBefore("cpp", "keyword", b));
})(Prism),
(Prism.languages.oz = {
    comment: /\/\*[\s\S]*?\*\/|%.*/,
    string: { pattern: /"(?:[^"\\]|\\[\s\S])*"/, greedy: !0 },
    atom: { pattern: /'(?:[^'\\]|\\[\s\S])*'/, greedy: !0, alias: "builtin" },
    keyword:
    /[$_]|\[\]|\b(?:at|attr|case|catch|choice|class|cond|declare|define|dis|else(?:case|if)?|end|export|fail|false|feat|finally|from|fun|functor|if|import|in|local|lock|meth|nil|not|of|or|prepare|proc|prop|raise|require|self|skip|then|thread|true|try|unit)\b/,
    function: [
    /[a-z][A-Za-z\d]*(?=\()/,
    { pattern: /(\{)[A-Z][A-Za-z\d]*/, lookbehind: !0 },
    ],
    number:
    /\b(?:0[bx][\da-f]+|\d+\.?\d*(?:e~?\d+)?\b)|&(?:[^\\]|\\(?:\d{3}|.))/i,
    variable: /\b[A-Z][A-Za-z\d]*|`(?:[^`\\]|\\.)+`/,
    "attr-name": /\w+(?=:)/,
    operator:
    /:(?:=|::?)|<[-:=]?|=(?:=|<?:?)|>=?:?|\\=:?|!!?|[|#+\-*\/,~^@]|\b(?:andthen|div|mod|orelse)\b/,
    punctuation: /[\[\](){}.:;?]/,
}),
(Prism.languages.parigp = {
    comment: /\/\*[\s\S]*?\*\/|\\\\.*/,
    string: { pattern: /"(?:[^"\\\r\n]|\\.)*"/, greedy: !0 },
    keyword: (function () {
    var a = [
        "breakpoint",
        "break",
        "dbg_down",
        "dbg_err",
        "dbg_up",
        "dbg_x",
        "forcomposite",
        "fordiv",
        "forell",
        "forpart",
        "forprime",
        "forstep",
        "forsubgroup",
        "forvec",
        "for",
        "iferr",
        "if",
        "local",
        "my",
        "next",
        "return",
        "until",
        "while",
    ];
    return (
        (a = a
        .map(function (a) {
            return a.split("").join(" *");
        })
        .join("|")),
        RegExp("\\b(?:" + a + ")\\b")
    );
    })(),
    function: /\w[\w ]*?(?= *\()/,
    number: {
    pattern:
        /((?:\. *\. *)?)(?:\d(?: *\d)*(?: *(?!\. *\.)\.(?: *\d)*)?|\. *\d(?: *\d)*)(?: *e *[+-]? *\d(?: *\d)*)?/i,
    lookbehind: !0,
    },
    operator:
    /\. *\.|[*\/!](?: *=)?|%(?: *=|(?: *#)?(?: *')*)?|\+(?: *[+=])?|-(?: *[-=>])?|<(?:(?: *<)?(?: *=)?| *>)?|>(?: *>)?(?: *=)?|=(?: *=){0,2}|\\(?: *\/)?(?: *=)?|&(?: *&)?|\| *\||['#~^]/,
    punctuation: /[\[\]{}().,:;|]/,
}),
!(function (b) {
    var a = (b.languages.parser = b.languages.extend("markup", {
    keyword: {
        pattern:
        /(^|[^^])(?:\^(?:case|eval|for|if|switch|throw)\b|@(?:BASE|CLASS|GET(?:_DEFAULT)?|OPTIONS|SET_DEFAULT|USE)\b)/,
        lookbehind: !0,
    },
    variable: {
        pattern: /(^|[^^])\B\$(?:\w+|(?=[.{]))(?:(?:\.|::?)\w+)*(?:\.|::?)?/,
        lookbehind: !0,
        inside: { punctuation: /\.|:+/ },
    },
    function: {
        pattern: /(^|[^^])\B[@^]\w+(?:(?:\.|::?)\w+)*(?:\.|::?)?/,
        lookbehind: !0,
        inside: {
        keyword: { pattern: /(^@)(?:GET_|SET_)/, lookbehind: !0 },
        punctuation: /\.|:+/,
        },
    },
    escape: {
        pattern: /\^(?:[$^;@()\[\]{}"':]|#[a-f\d]*)/i,
        alias: "builtin",
    },
    punctuation: /[\[\](){};]/,
    }));
    (a = b.languages.insertBefore("parser", "keyword", {
    "parser-comment": {
        pattern: /(\s)#.*/,
        lookbehind: !0,
        alias: "comment",
    },
    expression: {
        pattern: /(^|[^^])\((?:[^()]|\((?:[^()]|\((?:[^()])*\))*\))*\)/,
        greedy: !0,
        lookbehind: !0,
        inside: {
        string: {
            pattern: /(^|[^^])(["'])(?:(?!\2)[^^]|\^[\s\S])*\2/,
            lookbehind: !0,
        },
        keyword: a.keyword,
        variable: a.variable,
        function: a.function,
        boolean: /\b(?:true|false)\b/,
        number: /\b(?:0x[a-f\d]+|\d+\.?\d*(?:e[+-]?\d+)?)\b/i,
        escape: a.escape,
        operator:
            /[~+*\/\\%]|!(?:\|\|?|=)?|&&?|\|\|?|==|<[<=]?|>[>=]?|-[fd]?|\b(?:def|eq|ge|gt|in|is|le|lt|ne)\b/,
        punctuation: a.punctuation,
        },
    },
    })),
    (a = b.languages.insertBefore(
        "inside",
        "punctuation",
        {
        expression: a.expression,
        keyword: a.keyword,
        variable: a.variable,
        function: a.function,
        escape: a.escape,
        "parser-punctuation": {
            pattern: a.punctuation,
            alias: "punctuation",
        },
        },
        a.tag.inside["attr-value"]
    ));
})(Prism),
(Prism.languages.pascal = {
    comment: [/\(\*[\s\S]+?\*\)/, /\{[\s\S]+?\}/, /\/\/.*/],
    string: {
    pattern: /(?:'(?:''|[^'\r\n])*'|#[&$%]?[a-f\d]+)+|\^[a-z]/i,
    greedy: !0,
    },
    keyword: [
    {
        pattern:
        /(^|[^&])\b(?:absolute|array|asm|begin|case|const|constructor|destructor|do|downto|else|end|file|for|function|goto|if|implementation|inherited|inline|interface|label|nil|object|of|operator|packed|procedure|program|record|reintroduce|repeat|self|set|string|then|to|type|unit|until|uses|var|while|with)\b/i,
        lookbehind: !0,
    },
    {
        pattern: /(^|[^&])\b(?:dispose|exit|false|new|true)\b/i,
        lookbehind: !0,
    },
    {
        pattern:
        /(^|[^&])\b(?:class|dispinterface|except|exports|finalization|finally|initialization|inline|library|on|out|packed|property|raise|resourcestring|threadvar|try)\b/i,
        lookbehind: !0,
    },
    {
        pattern:
        /(^|[^&])\b(?:absolute|abstract|alias|assembler|bitpacked|break|cdecl|continue|cppdecl|cvar|default|deprecated|dynamic|enumerator|experimental|export|external|far|far16|forward|generic|helper|implements|index|interrupt|iochecks|local|message|name|near|nodefault|noreturn|nostackframe|oldfpccall|otherwise|overload|override|pascal|platform|private|protected|public|published|read|register|reintroduce|result|safecall|saveregisters|softfloat|specialize|static|stdcall|stored|strict|unaligned|unimplemented|varargs|virtual|write)\b/i,
        lookbehind: !0,
    },
    ],
    number: [/(?:[&%]\d+|\$[a-f\d]+)/i, /\b\d+(?:\.\d+)?(?:e[+-]?\d+)?/i],
    operator: [
    /\.\.|\*\*|:=|<[<=>]?|>[>=]?|[+\-*\/]=?|[@^=]/i,
    {
        pattern:
        /(^|[^&])\b(?:and|as|div|exclude|in|include|is|mod|not|or|shl|shr|xor)\b/,
        lookbehind: !0,
    },
    ],
    punctuation: /\(\.|\.\)|[()\[\]:;,.]/,
}),
(Prism.languages.objectpascal = Prism.languages.pascal),
(Prism.languages.perl = {
    comment: [
    { pattern: /(^\s*)=\w+[\s\S]*?=cut.*/m, lookbehind: !0 },
    { pattern: /(^|[^\\$])#.*/, lookbehind: !0 },
    ],
    string: [
    {
        pattern:
        /\b(?:q|qq|qx|qw)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
        greedy: !0,
    },
    {
        pattern: /\b(?:q|qq|qx|qw)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1/,
        greedy: !0,
    },
    { pattern: /\b(?:q|qq|qx|qw)\s*\((?:[^()\\]|\\[\s\S])*\)/, greedy: !0 },
    { pattern: /\b(?:q|qq|qx|qw)\s*\{(?:[^{}\\]|\\[\s\S])*\}/, greedy: !0 },
    { pattern: /\b(?:q|qq|qx|qw)\s*\[(?:[^[\]\\]|\\[\s\S])*\]/, greedy: !0 },
    { pattern: /\b(?:q|qq|qx|qw)\s*<(?:[^<>\\]|\\[\s\S])*>/, greedy: !0 },
    { pattern: /("|`)(?:(?!\1)[^\\]|\\[\s\S])*\1/, greedy: !0 },
    { pattern: /'(?:[^'\\\r\n]|\\.)*'/, greedy: !0 },
    ],
    regex: [
    {
        pattern:
        /\b(?:m|qr)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/,
        greedy: !0,
    },
    {
        pattern:
        /\b(?:m|qr)\s+([a-zA-Z0-9])(?:(?!\1)[^\\]|\\[\s\S])*\1[msixpodualngc]*/,
        greedy: !0,
    },
    {
        pattern: /\b(?:m|qr)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngc]*/,
        greedy: !0,
    },
    {
        pattern: /\b(?:m|qr)\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngc]*/,
        greedy: !0,
    },
    {
        pattern: /\b(?:m|qr)\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngc]*/,
        greedy: !0,
    },
    {
        pattern: /\b(?:m|qr)\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngc]*/,
        greedy: !0,
    },
    {
        pattern:
        /(^|[^-]\b)(?:s|tr|y)\s*([^a-zA-Z0-9\s{(\[<])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2[msixpodualngcer]*/,
        lookbehind: !0,
        greedy: !0,
    },
    {
        pattern:
        /(^|[^-]\b)(?:s|tr|y)\s+([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2[msixpodualngcer]*/,
        lookbehind: !0,
        greedy: !0,
    },
    {
        pattern:
        /(^|[^-]\b)(?:s|tr|y)\s*\((?:[^()\\]|\\[\s\S])*\)\s*\((?:[^()\\]|\\[\s\S])*\)[msixpodualngcer]*/,
        lookbehind: !0,
        greedy: !0,
    },
    {
        pattern:
        /(^|[^-]\b)(?:s|tr|y)\s*\{(?:[^{}\\]|\\[\s\S])*\}\s*\{(?:[^{}\\]|\\[\s\S])*\}[msixpodualngcer]*/,
        lookbehind: !0,
        greedy: !0,
    },
    {
        pattern:
        /(^|[^-]\b)(?:s|tr|y)\s*\[(?:[^[\]\\]|\\[\s\S])*\]\s*\[(?:[^[\]\\]|\\[\s\S])*\][msixpodualngcer]*/,
        lookbehind: !0,
        greedy: !0,
    },
    {
        pattern:
        /(^|[^-]\b)(?:s|tr|y)\s*<(?:[^<>\\]|\\[\s\S])*>\s*<(?:[^<>\\]|\\[\s\S])*>[msixpodualngcer]*/,
        lookbehind: !0,
        greedy: !0,
    },
    {
        pattern:
        /\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(?:lt|gt|le|ge|eq|ne|cmp|not|and|or|xor|x)\b))/,
        greedy: !0,
    },
    ],
    variable: [
    /[&*$@%]\{\^[A-Z]+\}/,
    /[&*$@%]\^[A-Z_]/,
    /[&*$@%]#?(?=\{)/,
    /[&*$@%]#?(?:(?:::)*'?(?!\d)[\w$]+)+(?:::)*/i,
    /[&*$@%]\d+/,
    /(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/,
    ],
    filehandle: { pattern: /<(?![<=])\S*>|\b_\b/, alias: "symbol" },
    vstring: { pattern: /v\d+(?:\.\d+)*|\d+(?:\.\d+){2,}/, alias: "string" },
    function: { pattern: /sub [a-z0-9_]+/i, inside: { keyword: /sub/ } },
    keyword:
    /\b(?:any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while)\b/,
    number:
    /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0b[01](?:_?[01])*|(?:\d(?:_?\d)*)?\.?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)\b/,
    operator:
    /-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(?:lt|gt|le|ge|eq|ne|cmp|not|and|or|xor)\b/,
    punctuation: /[{}[\];(),:]/,
}),
!(function (a) {
    (a.languages.php = a.languages.extend("clike", {
    keyword:
        /\b(?:__halt_compiler|abstract|and|array|as|break|callable|case|catch|class|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|eval|exit|extends|final|finally|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|namespace|new|or|parent|print|private|protected|public|require|require_once|return|static|switch|throw|trait|try|unset|use|var|while|xor|yield)\b/i,
    boolean: { pattern: /\b(?:false|true)\b/i, alias: "constant" },
    constant: [/\b[A-Z_][A-Z0-9_]*\b/, /\b(?:null)\b/i],
    comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
        lookbehind: !0,
    },
    })),
    a.languages.insertBefore("php", "string", {
        "shell-comment": {
        pattern: /(^|[^\\])#.*/,
        lookbehind: !0,
        alias: "comment",
        },
    }),
    a.languages.insertBefore("php", "comment", {
        delimiter: {
        pattern: /\?>$|^<\?(?:php(?=\s)|=)?/i,
        alias: "important",
        },
    }),
    a.languages.insertBefore("php", "keyword", {
        variable: /\$+(?:\w+\b|(?={))/i,
        package: {
        pattern: /(\\|namespace\s+|use\s+)[\w\\]+/,
        lookbehind: !0,
        inside: { punctuation: /\\/ },
        },
    }),
    a.languages.insertBefore("php", "operator", {
        property: { pattern: /(->)[\w]+/, lookbehind: !0 },
    });
    var b = {
    pattern:
        /{\$(?:{(?:{[^{}]+}|[^{}]+)}|[^{}])+}|(^|[^\\{])\$+(?:\w+(?:\[.+?]|->\w+)*)/,
    lookbehind: !0,
    inside: a.languages.php,
    };
    a.languages.insertBefore("php", "string", {
    "nowdoc-string": {
        pattern: /<<<'([^']+)'(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;/,
        greedy: !0,
        alias: "string",
        inside: {
        delimiter: {
            pattern: /^<<<'[^']+'|[a-z_]\w*;$/i,
            alias: "symbol",
            inside: { punctuation: /^<<<'?|[';]$/ },
        },
        },
    },
    "heredoc-string": {
        pattern:
        /<<<(?:"([^"]+)"(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\1;|([a-z_]\w*)(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?\2;)/i,
        greedy: !0,
        alias: "string",
        inside: {
        delimiter: {
            pattern: /^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,
            alias: "symbol",
            inside: { punctuation: /^<<<"?|[";]$/ },
        },
        interpolation: b,
        },
    },
    "single-quoted-string": {
        pattern: /'(?:\\[\s\S]|[^\\'])*'/,
        greedy: !0,
        alias: "string",
    },
    "double-quoted-string": {
        pattern: /"(?:\\[\s\S]|[^\\"])*"/,
        greedy: !0,
        alias: "string",
        inside: { interpolation: b },
    },
    }),
    delete a.languages.php.string,
    a.hooks.add("before-tokenize", function (b) {
        /<\?/.test(b.code) &&
        a.languages["markup-templating"].buildPlaceholders(
            b,
            "php",
            /<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#)(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|\/\*[\s\S]*?(?:\*\/|$))*?(?:\?>|$)/gi
        );
    }),
    a.hooks.add("after-tokenize", function (b) {
        a.languages["markup-templating"].tokenizePlaceholders(b, "php");
    });
})(Prism),
Prism.languages.insertBefore("php", "variable", {
    this: /\$this\b/,
    global:
    /\$(?:_(?:SERVER|GET|POST|FILES|REQUEST|SESSION|ENV|COOKIE)|GLOBALS|HTTP_RAW_POST_DATA|argc|argv|php_errormsg|http_response_header)\b/,
    scope: {
    pattern: /\b[\w\\]+::/,
    inside: { keyword: /static|self|parent/, punctuation: /::|\\/ },
    },
}),
(Prism.languages.sql = {
    comment: {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
    lookbehind: !0,
    },
    variable: [
    { pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/, greedy: !0 },
    /@[\w.$]+/,
    ],
    string: {
    pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
    greedy: !0,
    lookbehind: !0,
    },
    function:
    /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
    keyword:
    /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
    boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
    number: /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
    operator:
    /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
    punctuation: /[;[\]()`,.]/,
}),
!(function (d) {
    var a = (d.languages.plsql = d.languages.extend("sql", {
        comment: [/\/\*[\s\S]*?\*\//, /--.*/],
    })),
    b = a.keyword,
    c;
    Array.isArray(b) || (b = a.keyword = [b]),
    b.unshift(
        /\b(?:ACCESS|AGENT|AGGREGATE|ARRAY|ARROW|AT|ATTRIBUTE|AUDIT|AUTHID|BFILE_BASE|BLOB_BASE|BLOCK|BODY|BOTH|BOUND|BYTE|CALLING|CHAR_BASE|CHARSET(?:FORM|ID)|CLOB_BASE|COLAUTH|COLLECT|CLUSTERS?|COMPILED|COMPRESS|CONSTANT|CONSTRUCTOR|CONTEXT|CRASH|CUSTOMDATUM|DANGLING|DATE_BASE|DEFINE|DETERMINISTIC|DURATION|ELEMENT|EMPTY|EXCEPTIONS?|EXCLUSIVE|EXTERNAL|FINAL|FORALL|FORM|FOUND|GENERAL|HEAP|HIDDEN|IDENTIFIED|IMMEDIATE|INCLUDING|INCREMENT|INDICATOR|INDEXES|INDICES|INFINITE|INITIAL|ISOPEN|INSTANTIABLE|INTERFACE|INVALIDATE|JAVA|LARGE|LEADING|LENGTH|LIBRARY|LIKE[24C]|LIMITED|LONG|LOOP|MAP|MAXEXTENTS|MAXLEN|MEMBER|MINUS|MLSLABEL|MULTISET|NAME|NAN|NATIVE|NEW|NOAUDIT|NOCOMPRESS|NOCOPY|NOTFOUND|NOWAIT|NUMBER(?:_BASE)?|OBJECT|OCI(?:COLL|DATE|DATETIME|DURATION|INTERVAL|LOBLOCATOR|NUMBER|RAW|REF|REFCURSOR|ROWID|STRING|TYPE)|OFFLINE|ONLINE|ONLY|OPAQUE|OPERATOR|ORACLE|ORADATA|ORGANIZATION|ORL(?:ANY|VARY)|OTHERS|OVERLAPS|OVERRIDING|PACKAGE|PARALLEL_ENABLE|PARAMETERS?|PASCAL|PCTFREE|PIPE(?:LINED)?|PRAGMA|PRIOR|PRIVATE|RAISE|RANGE|RAW|RECORD|REF|REFERENCE|REM|REMAINDER|RESULT|RESOURCE|RETURNING|REVERSE|ROW(?:ID|NUM|TYPE)|SAMPLE|SB[124]|SEGMENT|SELF|SEPARATE|SEQUENCE|SHORT|SIZE(?:_T)?|SPARSE|SQL(?:CODE|DATA|NAME|STATE)|STANDARD|STATIC|STDDEV|STORED|STRING|STRUCT|STYLE|SUBMULTISET|SUBPARTITION|SUBSTITUTABLE|SUBTYPE|SUCCESSFUL|SYNONYM|SYSDATE|TABAUTH|TDO|THE|TIMEZONE_(?:ABBR|HOUR|MINUTE|REGION)|TRAILING|TRANSAC(?:TIONAL)?|TRUSTED|UB[124]|UID|UNDER|UNTRUSTED|VALIDATE|VALIST|VARCHAR2|VARIABLE|VARIANCE|VARRAY|VIEWS|VOID|WHENEVER|WRAPPED|ZONE)\b/i
    ),
    (c = a.operator),
    Array.isArray(c) || (c = a.operator = [c]),
    c.unshift(/:=/);
})(Prism),
!(function (c) {
    var a = (Prism.languages.powershell = {
        comment: [
        { pattern: /(^|[^`])<#[\s\S]*?#>/, lookbehind: !0 },
        { pattern: /(^|[^`])#.*/, lookbehind: !0 },
        ],
        string: [
        {
            pattern: /"(?:`[\s\S]|[^`"])*"/,
            greedy: !0,
            inside: {
            function: {
                pattern: /(^|[^`])\$\((?:\$\(.*?\)|(?!\$\()[^\r\n)])*\)/,
                lookbehind: !0,
                inside: {},
            },
            },
        },
        { pattern: /'(?:[^']|'')*'/, greedy: !0 },
        ],
        namespace: /\[[a-z](?:\[(?:\[[^\]]*]|[^\[\]])*]|[^\[\]])*]/i,
        boolean: /\$(?:true|false)\b/i,
        variable: /\$\w+\b/i,
        function: [
        /\b(?:Add-(?:Computer|Content|History|Member|PSSnapin|Type)|Checkpoint-Computer|Clear-(?:Content|EventLog|History|Item|ItemProperty|Variable)|Compare-Object|Complete-Transaction|Connect-PSSession|ConvertFrom-(?:Csv|Json|StringData)|Convert-Path|ConvertTo-(?:Csv|Html|Json|Xml)|Copy-(?:Item|ItemProperty)|Debug-Process|Disable-(?:ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)|Disconnect-PSSession|Enable-(?:ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)|Enter-PSSession|Exit-PSSession|Export-(?:Alias|Clixml|Console|Csv|FormatData|ModuleMember|PSSession)|ForEach-Object|Format-(?:Custom|List|Table|Wide)|Get-(?:Alias|ChildItem|Command|ComputerRestorePoint|Content|ControlPanelItem|Culture|Date|Event|EventLog|EventSubscriber|FormatData|Help|History|Host|HotFix|Item|ItemProperty|Job|Location|Member|Module|Process|PSBreakpoint|PSCallStack|PSDrive|PSProvider|PSSession|PSSessionConfiguration|PSSnapin|Random|Service|TraceSource|Transaction|TypeData|UICulture|Unique|Variable|WmiObject)|Group-Object|Import-(?:Alias|Clixml|Csv|LocalizedData|Module|PSSession)|Invoke-(?:Command|Expression|History|Item|RestMethod|WebRequest|WmiMethod)|Join-Path|Limit-EventLog|Measure-(?:Command|Object)|Move-(?:Item|ItemProperty)|New-(?:Alias|Event|EventLog|Item|ItemProperty|Module|ModuleManifest|Object|PSDrive|PSSession|PSSessionConfigurationFile|PSSessionOption|PSTransportOption|Service|TimeSpan|Variable|WebServiceProxy)|Out-(?:Default|File|GridView|Host|Null|Printer|String)|Pop-Location|Push-Location|Read-Host|Receive-(?:Job|PSSession)|Register-(?:EngineEvent|ObjectEvent|PSSessionConfiguration|WmiEvent)|Remove-(?:Computer|Event|EventLog|Item|ItemProperty|Job|Module|PSBreakpoint|PSDrive|PSSession|PSSnapin|TypeData|Variable|WmiObject)|Rename-(?:Computer|Item|ItemProperty)|Reset-ComputerMachinePassword|Resolve-Path|Restart-(?:Computer|Service)|Restore-Computer|Resume-(?:Job|Service)|Save-Help|Select-(?:Object|String|Xml)|Send-MailMessage|Set-(?:Alias|Content|Date|Item|ItemProperty|Location|PSBreakpoint|PSDebug|PSSessionConfiguration|Service|StrictMode|TraceSource|Variable|WmiInstance)|Show-(?:Command|ControlPanelItem|EventLog)|Sort-Object|Split-Path|Start-(?:Job|Process|Service|Sleep|Transaction)|Stop-(?:Computer|Job|Process|Service)|Suspend-(?:Job|Service)|Tee-Object|Test-(?:ComputerSecureChannel|Connection|ModuleManifest|Path|PSSessionConfigurationFile)|Trace-Command|Unblock-File|Undo-Transaction|Unregister-(?:Event|PSSessionConfiguration)|Update-(?:FormatData|Help|List|TypeData)|Use-Transaction|Wait-(?:Event|Job|Process)|Where-Object|Write-(?:Debug|Error|EventLog|Host|Output|Progress|Verbose|Warning))\b/i,
        /\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i,
        ],
        keyword:
        /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
        operator: {
        pattern:
            /(\W?)(?:!|-(?:eq|ne|gt|ge|lt|le|sh[lr]|not|b?(?:and|x?or)|(?:Not)?(?:Like|Match|Contains|In)|Replace|Join|is(?:Not)?|as)\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
        lookbehind: !0,
        },
        punctuation: /[|{}[\];(),.]/,
    }),
    b = a.string[0].inside;
    (b.boolean = a.boolean), (b.variable = a.variable), (b.function.inside = a);
})(),
(Prism.languages.processing = Prism.languages.extend("clike", {
    keyword:
    /\b(?:break|catch|case|class|continue|default|else|extends|final|for|if|implements|import|new|null|private|public|return|static|super|switch|this|try|void|while)\b/,
    operator: /<[<=]?|>[>=]?|&&?|\|\|?|[%?]|[!=+\-*\/]=?/,
})),
Prism.languages.insertBefore("processing", "number", {
    constant: /\b(?!XML\b)[A-Z][A-Z\d_]+\b/,
    type: {
    pattern: /\b(?:boolean|byte|char|color|double|float|int|XML|[A-Z]\w*)\b/,
    alias: "variable",
    },
}),
(Prism.languages.processing.function.pattern = /\w+(?=\s*\()/),
(Prism.languages.processing["class-name"].alias = "variable"),
(Prism.languages.prolog = {
    comment: [/%.+/, /\/\*[\s\S]*?\*\//],
    string: {
    pattern: /(["'])(?:\1\1|\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
    },
    builtin: /\b(?:fx|fy|xf[xy]?|yfx?)\b/,
    variable: /\b[A-Z_]\w*/,
    function: /\b[a-z]\w*(?:(?=\()|\/\d+)/,
    number: /\b\d+\.?\d*/,
    operator: /[:\\=><\-?*@\/;+^|!$.]+|\b(?:is|mod|not|xor)\b/,
    punctuation: /[(){}\[\],]/,
}),
(Prism.languages.properties = {
    comment: /^[ \t]*[#!].*$/m,
    "attr-value": {
    pattern:
        /(^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+?(?: *[=:] *| ))(?:\\(?:\r\n|[\s\S])|[^\\\r\n])+/m,
    lookbehind: !0,
    },
    "attr-name": /^[ \t]*(?:\\(?:\r\n|[\s\S])|[^\\\s:=])+?(?= *[=:] *| )/m,
    punctuation: /[=:]/,
}),
!(function (a) {
    var b =
    /\b(?:double|float|[su]?int(?:32|64)|s?fixed(?:32|64)|bool|string|bytes)\b/;
    (a.languages.protobuf = a.languages.extend("clike", {
    "class-name": {
        pattern: /(\b(?:enum|extend|message|service)\s+)[A-Za-z_]\w*(?=\s*\{)/,
        lookbehind: !0,
    },
    keyword:
        /\b(?:enum|extend|extensions|import|message|oneof|option|optional|package|public|repeated|required|reserved|service|syntax|to)\b/,
    })),
    a.languages.insertBefore("protobuf", "operator", {
        map: {
        pattern: /\bmap<\s*[\w.]+\s*,\s*[\w.]+\s*>(?=\s+[A-Za-z_]\w*\s*[=;])/,
        alias: "class-name",
        inside: { punctuation: /[<>.,]/, builtin: b },
        },
        builtin: b,
        "positional-class-name": {
        pattern:
            /(?:\b|\B\.)[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*(?=\s+[A-Za-z_]\w*\s*[=;])/,
        alias: "class-name",
        inside: { punctuation: /\./ },
        },
        annotation: { pattern: /(\[\s*)[A-Za-z_]\w*(?=\s*=)/, lookbehind: !0 },
    });
})(Prism),
!(function (a) {
    var d, e, c, f, b;
    a.languages.pug = {
    comment: {
        pattern: /(^([\t ]*))\/\/.*(?:(?:\r?\n|\r)\2[\t ]+.+)*/m,
        lookbehind: !0,
    },
    "multiline-script": {
        pattern:
        /(^([\t ]*)script\b.*\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
        lookbehind: !0,
        inside: a.languages.javascript,
    },
    filter: {
        pattern:
        /(^([\t ]*)):.+(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
        lookbehind: !0,
        inside: { "filter-name": { pattern: /^:[\w-]+/, alias: "variable" } },
    },
    "multiline-plain-text": {
        pattern:
        /(^([\t ]*)[\w\-#.]+\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
        lookbehind: !0,
    },
    markup: {
        pattern: /(^[\t ]*)<.+/m,
        lookbehind: !0,
        inside: a.languages.markup,
    },
    doctype: { pattern: /((?:^|\n)[\t ]*)doctype(?: .+)?/, lookbehind: !0 },
    "flow-control": {
        pattern:
        /(^[\t ]*)(?:if|unless|else|case|when|default|each|while)\b(?: .+)?/m,
        lookbehind: !0,
        inside: {
        each: {
            pattern: /^each .+? in\b/,
            inside: { keyword: /\b(?:each|in)\b/, punctuation: /,/ },
        },
        branch: {
            pattern: /^(?:if|unless|else|case|when|default|while)\b/,
            alias: "keyword",
        },
        rest: a.languages.javascript,
        },
    },
    keyword: {
        pattern: /(^[\t ]*)(?:block|extends|include|append|prepend)\b.+/m,
        lookbehind: !0,
    },
    mixin: [
        {
        pattern: /(^[\t ]*)mixin .+/m,
        lookbehind: !0,
        inside: {
            keyword: /^mixin/,
            function: /\w+(?=\s*\(|\s*$)/,
            punctuation: /[(),.]/,
        },
        },
        {
        pattern: /(^[\t ]*)\+.+/m,
        lookbehind: !0,
        inside: {
            name: { pattern: /^\+\w+/, alias: "function" },
            rest: a.languages.javascript,
        },
        },
    ],
    script: {
        pattern: /(^[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*[\t ]+).+/m,
        lookbehind: !0,
        inside: a.languages.javascript,
    },
    "plain-text": {
        pattern:
        /(^[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]+).+/m,
        lookbehind: !0,
    },
    tag: {
        pattern: /(^[\t ]*)(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/m,
        lookbehind: !0,
        inside: {
        attributes: [
            { pattern: /&[^(]+\([^)]+\)/, inside: a.languages.javascript },
            {
            pattern: /\([^)]+\)/,
            inside: {
                "attr-value": {
                pattern: /(=\s*)(?:\{[^}]*\}|[^,)\r\n]+)/,
                lookbehind: !0,
                inside: a.languages.javascript,
                },
                "attr-name": /[\w-]+(?=\s*!?=|\s*[,)])/,
                punctuation: /[!=(),]+/,
            },
            },
        ],
        punctuation: /:/,
        },
    },
    code: [
        {
        pattern: /(^[\t ]*(?:-|!?=)).+/m,
        lookbehind: !0,
        inside: a.languages.javascript,
        },
    ],
    punctuation: /[.\-!=|]+/,
    };
    for (
    d = [
        { filter: "atpl", language: "twig" },
        { filter: "coffee", language: "coffeescript" },
        "ejs",
        "handlebars",
        "less",
        "livescript",
        "markdown",
        { filter: "sass", language: "scss" },
        "stylus",
    ],
        e = {},
        c = 0,
        f = d.length;
    c < f;
    c++
    )
    (b = d[c]),
        (b = "string" == typeof b ? { filter: b, language: b } : b),
        a.languages[b.language] &&
        (e["filter-" + b.filter] = {
            pattern: RegExp(
            "(^([	 ]*)):{{filter_name}}(?:(?:\r?\n|\r(?!\n))(?:\\2[	 ]+.+|\\s*?(?=\r?\n|\r)))+".replace(
                "{{filter_name}}",
                function () {
                return b.filter;
                }
            ),
            "m"
            ),
            lookbehind: !0,
            inside: {
            "filter-name": { pattern: /^:[\w-]+/, alias: "variable" },
            rest: a.languages[b.language],
            },
        });
    a.languages.insertBefore("pug", "filter", e);
})(Prism),
!(function (a) {
    a.languages.puppet = {
    heredoc: [
        {
        pattern:
            /(@\("([^"\r\n\/):]+)"(?:\/[nrts$uL]*)?\).*(?:\r?\n|\r))(?:.*(?:\r?\n|\r))*?[ \t]*\|?[ \t]*-?[ \t]*\2/,
        lookbehind: !0,
        alias: "string",
        inside: { punctuation: /(?=\S).*\S(?= *$)/ },
        },
        {
        pattern:
            /(@\(([^"\r\n\/):]+)(?:\/[nrts$uL]*)?\).*(?:\r?\n|\r))(?:.*(?:\r?\n|\r))*?[ \t]*\|?[ \t]*-?[ \t]*\2/,
        lookbehind: !0,
        greedy: !0,
        alias: "string",
        inside: { punctuation: /(?=\S).*\S(?= *$)/ },
        },
        {
        pattern: /@\("?(?:[^"\r\n\/):]+)"?(?:\/[nrts$uL]*)?\)/,
        alias: "string",
        inside: { punctuation: { pattern: /(\().+?(?=\))/, lookbehind: !0 } },
        },
    ],
    "multiline-comment": {
        pattern: /(^|[^\\])\/\*[\s\S]*?\*\//,
        lookbehind: !0,
        greedy: !0,
        alias: "comment",
    },
    regex: {
        pattern:
        /((?:\bnode\s+|[~=\(\[\{,]\s*|[=+]>\s*|^\s*))\/(?:[^\/\\]|\\[\s\S])+\/(?:[imx]+\b|\B)/,
        lookbehind: !0,
        greedy: !0,
        inside: {
        "extended-regex": {
            pattern: /^\/(?:[^\/\\]|\\[\s\S])+\/[im]*x[im]*$/,
            inside: { comment: /#.*/ },
        },
        },
    },
    comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0, greedy: !0 },
    string: {
        pattern:
        /(["'])(?:\$\{(?:[^'"}]|(["'])(?:(?!\2)[^\\]|\\[\s\S])*\2)+\}|(?!\1)[^\\]|\\[\s\S])*\1/,
        greedy: !0,
        inside: { "double-quoted": { pattern: /^"[\s\S]*"$/, inside: {} } },
    },
    variable: {
        pattern: /\$(?:::)?\w+(?:::\w+)*/,
        inside: { punctuation: /::/ },
    },
    "attr-name": /(?:\w+|\*)(?=\s*=>)/,
    function: [
        { pattern: /(\.)(?!\d)\w+/, lookbehind: !0 },
        /\b(?:contain|debug|err|fail|include|info|notice|realize|require|tag|warning)\b|\b(?!\d)\w+(?=\()/,
    ],
    number: /\b(?:0x[a-f\d]+|\d+(?:\.\d+)?(?:e-?\d+)?)\b/i,
    boolean: /\b(?:true|false)\b/,
    keyword:
        /\b(?:application|attr|case|class|consumes|default|define|else|elsif|function|if|import|inherits|node|private|produces|type|undef|unless)\b/,
    datatype: {
        pattern:
        /\b(?:Any|Array|Boolean|Callable|Catalogentry|Class|Collection|Data|Default|Enum|Float|Hash|Integer|NotUndef|Numeric|Optional|Pattern|Regexp|Resource|Runtime|Scalar|String|Struct|Tuple|Type|Undef|Variant)\b/,
        alias: "symbol",
    },
    operator:
        /=[=~>]?|![=~]?|<(?:<\|?|[=~|-])?|>[>=]?|->?|~>|\|>?>?|[*\/%+?]|\b(?:and|in|or)\b/,
    punctuation: /[\[\]{}().,;]|:+/,
    };
    var b = [
    {
        pattern:
        /(^|[^\\])\$\{(?:[^'"{}]|\{[^}]*\}|(["'])(?:(?!\2)[^\\]|\\[\s\S])*\2)+\}/,
        lookbehind: !0,
        inside: {
        "short-variable": {
            pattern: /(^\$\{)(?!\w+\()(?:::)?\w+(?:::\w+)*/,
            lookbehind: !0,
            alias: "variable",
            inside: { punctuation: /::/ },
        },
        delimiter: { pattern: /^\$/, alias: "variable" },
        rest: a.languages.puppet,
        },
    },
    {
        pattern: /(^|[^\\])\$(?:::)?\w+(?:::\w+)*/,
        lookbehind: !0,
        alias: "variable",
        inside: { punctuation: /::/ },
    },
    ];
    (a.languages.puppet.heredoc[0].inside.interpolation = b),
    (a.languages.puppet.string.inside["double-quoted"].inside.interpolation =
        b);
})(Prism),
!(function (a) {
    (a.languages.pure = {
    comment: [
        { pattern: /(^|[^\\])\/\*[\s\S]*?\*\//, lookbehind: !0 },
        { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 },
        /#!.+/,
    ],
    "inline-lang": {
        pattern: /%<[\s\S]+?%>/,
        greedy: !0,
        inside: {
        lang: {
            pattern: /(^%< *)-\*-.+?-\*-/,
            lookbehind: !0,
            alias: "comment",
        },
        delimiter: { pattern: /^%<.*|%>$/, alias: "punctuation" },
        },
    },
    string: { pattern: /"(?:\\.|[^"\\\r\n])*"/, greedy: !0 },
    number: {
        pattern:
        /((?:\.\.)?)(?:\b(?:inf|nan)\b|\b0x[\da-f]+|(?:\b(?:0b)?\d+(?:\.\d)?|\B\.\d)\d*(?:e[+-]?\d+)?L?)/i,
        lookbehind: !0,
    },
    keyword:
        /\b(?:ans|break|bt|case|catch|cd|clear|const|def|del|dump|else|end|exit|extern|false|force|help|if|infix[lr]?|interface|let|ls|mem|namespace|nonfix|NULL|of|otherwise|outfix|override|postfix|prefix|private|public|pwd|quit|run|save|show|stats|then|throw|trace|true|type|underride|using|when|with)\b/,
    function:
        /\b(?:abs|add_(?:(?:fundef|interface|macdef|typedef)(?:_at)?|addr|constdef|vardef)|all|any|applp?|arity|bigintp?|blob(?:_crc|_size|p)?|boolp?|byte_(?:matrix|pointer)|byte_c?string(?:_pointer)?|calloc|cat|catmap|ceil|char[ps]?|check_ptrtag|chr|clear_sentry|clearsym|closurep?|cmatrixp?|cols?|colcat(?:map)?|colmap|colrev|colvector(?:p|seq)?|complex(?:_float_(?:matrix|pointer)|_matrix(?:_view)?|_pointer|p)?|conj|cookedp?|cst|cstring(?:_(?:dup|list|vector))?|curry3?|cyclen?|del_(?:constdef|fundef|interface|macdef|typedef|vardef)|delete|diag(?:mat)?|dim|dmatrixp?|do|double(?:_matrix(?:_view)?|_pointer|p)?|dowith3?|drop|dropwhile|eval(?:cmd)?|exactp|filter|fix|fixity|flip|float(?:_matrix|_pointer)|floor|fold[lr]1?|frac|free|funp?|functionp?|gcd|get(?:_(?:byte|constdef|double|float|fundef|int(?:64)?|interface(?:_typedef)?|long|macdef|pointer|ptrtag|short|sentry|string|typedef|vardef))?|globsym|hash|head|id|im|imatrixp?|index|inexactp|infp|init|insert|int(?:_matrix(?:_view)?|_pointer|p)?|int64_(?:matrix|pointer)|integerp?|iteraten?|iterwhile|join|keys?|lambdap?|last(?:err(?:pos)?)?|lcd|list[2p]?|listmap|make_ptrtag|malloc|map|matcat|matrixp?|max|member|min|nanp|nargs|nmatrixp?|null|numberp?|ord|pack(?:ed)?|pointer(?:_cast|_tag|_type|p)?|pow|pred|ptrtag|put(?:_(?:byte|double|float|int(?:64)?|long|pointer|short|string))?|rationalp?|re|realp?|realloc|recordp?|redim|reduce(?:_with)?|refp?|repeatn?|reverse|rlistp?|round|rows?|rowcat(?:map)?|rowmap|rowrev|rowvector(?:p|seq)?|same|scan[lr]1?|sentry|sgn|short_(?:matrix|pointer)|slice|smatrixp?|sort|split|str|strcat|stream|stride|string(?:_(?:dup|list|vector)|p)?|subdiag(?:mat)?|submat|subseq2?|substr|succ|supdiag(?:mat)?|symbolp?|tail|take|takewhile|thunkp?|transpose|trunc|tuplep?|typep|ubyte|uint(?:64)?|ulong|uncurry3?|unref|unzip3?|update|ushort|vals?|varp?|vector(?:p|seq)?|void|zip3?|zipwith3?)\b/,
    special: { pattern: /\b__[a-z]+__\b/i, alias: "builtin" },
    operator:
        /(?=\b_|[^_])[!"#$%&'*+,\-.\/:<=>?@\\^_`|~\u00a1-\u00bf\u00d7-\u00f7\u20d0-\u2bff]+|\b(?:and|div|mod|not|or)\b/,
    punctuation: /[(){}\[\];,|]/,
    }),
    ["c", { lang: "c++", alias: "cpp" }, "fortran"].forEach(function (b) {
        var c = b,
        d;
        "string" != typeof b && ((c = b.alias), (b = b.lang)),
        a.languages[c] &&
            ((d = {}),
            (d["inline-lang-" + c] = {
            pattern: RegExp(
                "%< *-\\*- *{lang}\\d* *-\\*-[^]+?%>".replace(
                "{lang}",
                b.replace(/([.+*?\/\\(){}\[\]])/g, "\\$1")
                ),
                "i"
            ),
            inside: a.util.clone(a.languages.pure["inline-lang"].inside),
            }),
            (d["inline-lang-" + c].inside.rest = a.util.clone(a.languages[c])),
            a.languages.insertBefore("pure", "inline-lang", d));
    }),
    a.languages.c &&
        (a.languages.pure["inline-lang"].inside.rest = a.util.clone(
        a.languages.c
        ));
})(Prism),
(Prism.languages.python = {
    comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
    "string-interpolation": {
    pattern:
        /(?:f|rf|fr)(?:("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
    greedy: !0,
    inside: {
        interpolation: {
        pattern:
            /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
        lookbehind: !0,
        inside: {
            "format-spec": { pattern: /(:)[^:(){}]+(?=}$)/, lookbehind: !0 },
            "conversion-option": {
            pattern: /![sra](?=[:}]$)/,
            alias: "punctuation",
            },
            rest: null,
        },
        },
        string: /[\s\S]+/,
    },
    },
    "triple-quoted-string": {
    pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]+?\1/i,
    greedy: !0,
    alias: "string",
    },
    string: {
    pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
    greedy: !0,
    },
    function: {
    pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
    lookbehind: !0,
    },
    "class-name": { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
    decorator: {
    pattern: /(^\s*)@\w+(?:\.\w+)*/im,
    lookbehind: !0,
    alias: ["annotation", "punctuation"],
    inside: { punctuation: /\./ },
    },
    keyword:
    /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
    builtin:
    /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
    boolean: /\b(?:True|False|None)\b/,
    number:
    /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
    operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
    punctuation: /[{}[\];(),.:]/,
}),
(Prism.languages.python[
    "string-interpolation"
].inside.interpolation.inside.rest = Prism.languages.python),
(Prism.languages.py = Prism.languages.python),
(Prism.languages.q = {
    string: /"(?:\\.|[^"\\\r\n])*"/,
    comment: [
    { pattern: /([\t )\]}])\/.*/, lookbehind: !0, greedy: !0 },
    {
        pattern:
        /(^|\r?\n|\r)\/[\t ]*(?:(?:\r?\n|\r)(?:.*(?:\r?\n|\r))*?(?:\\(?=[\t ]*(?:\r?\n|\r))|$)|\S.*)/,
        lookbehind: !0,
        greedy: !0,
    },
    { pattern: /^\\[\t ]*(?:\r?\n|\r)[\s\S]+/m, greedy: !0 },
    { pattern: /^#!.+/m, greedy: !0 },
    ],
    symbol: /`(?::\S+|[\w.]*)/,
    datetime: {
    pattern:
        /0N[mdzuvt]|0W[dtz]|\d{4}\.\d\d(?:m|\.\d\d(?:T(?:\d\d(?::\d\d(?::\d\d(?:[.:]\d\d\d)?)?)?)?)?[dz]?)|\d\d:\d\d(?::\d\d(?:[.:]\d\d\d)?)?[uvt]?/,
    alias: "number",
    },
    number:
    /\b(?![01]:)(?:0[wn]|0W[hj]?|0N[hje]?|0x[\da-fA-F]+|\d+\.?\d*(?:e[+-]?\d+)?[hjfeb]?)/,
    keyword:
    /\\\w+\b|\b(?:abs|acos|aj0?|all|and|any|asc|asin|asof|atan|attr|avgs?|binr?|by|ceiling|cols|cor|cos|count|cov|cross|csv|cut|delete|deltas|desc|dev|differ|distinct|div|do|dsave|ej|enlist|eval|except|exec|exit|exp|fby|fills|first|fkeys|flip|floor|from|get|getenv|group|gtime|hclose|hcount|hdel|hopen|hsym|iasc|identity|idesc|if|ij|in|insert|inter|inv|keys?|last|like|list|ljf?|load|log|lower|lsq|ltime|ltrim|mavg|maxs?|mcount|md5|mdev|med|meta|mins?|mmax|mmin|mmu|mod|msum|neg|next|not|null|or|over|parse|peach|pj|plist|prds?|prev|prior|rand|rank|ratios|raze|read0|read1|reciprocal|reval|reverse|rload|rotate|rsave|rtrim|save|scan|scov|sdev|select|set|setenv|show|signum|sin|sqrt|ssr?|string|sublist|sums?|sv|svar|system|tables|tan|til|trim|txf|type|uj|ungroup|union|update|upper|upsert|value|var|views?|vs|wavg|where|while|within|wj1?|wsum|ww|xasc|xbar|xcols?|xdesc|xexp|xgroup|xkey|xlog|xprev|xrank)\b/,
    adverb: { pattern: /['\/\\]:?|\beach\b/, alias: "function" },
    verb: {
    pattern: /(?:\B\.\B|\b[01]:|<[=>]?|>=?|[:+\-*%,!?_~=|$&#@^]):?/,
    alias: "operator",
    },
    punctuation: /[(){}\[\];.]/,
}),
(Prism.languages.qore = Prism.languages.extend("clike", {
    comment: {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:\/\/|#).*)/,
    lookbehind: !0,
    },
    string: { pattern: /("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 },
    variable: /\$(?!\d)\w+\b/,
    keyword:
    /\b(?:abstract|any|assert|binary|bool|boolean|break|byte|case|catch|char|class|code|const|continue|data|default|do|double|else|enum|extends|final|finally|float|for|goto|hash|if|implements|import|inherits|instanceof|int|interface|long|my|native|new|nothing|null|object|our|own|private|reference|rethrow|return|short|soft(?:int|float|number|bool|string|date|list)|static|strictfp|string|sub|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while)\b/,
    number:
    /\b(?:0b[01]+|0x[\da-f]*\.?[\da-fp\-]+|\d*\.?\d+e?\d*[df]|\d*\.?\d+)\b/i,
    boolean: /\b(?:true|false)\b/i,
    operator: {
    pattern:
        /(^|[^.])(?:\+[+=]?|-[-=]?|[!=](?:==?|~)?|>>?=?|<(?:=>?|<=?)?|&[&=]?|\|[|=]?|[*\/%^]=?|[~?])/,
    lookbehind: !0,
    },
    function: /\$?\b(?!\d)\w+(?=\()/,
})),
(Prism.languages.r = {
    comment: /#.*/,
    string: { pattern: /(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
    "percent-operator": { pattern: /%[^%\s]*%/, alias: "operator" },
    boolean: /\b(?:TRUE|FALSE)\b/,
    ellipsis: /\.\.(?:\.|\d+)/,
    number: [
    /\b(?:NaN|Inf)\b/,
    /(?:\b0x[\dA-Fa-f]+(?:\.\d*)?|\b\d+\.?\d*|\B\.\d+)(?:[EePp][+-]?\d+)?[iL]?/,
    ],
    keyword:
    /\b(?:if|else|repeat|while|function|for|in|next|break|NULL|NA|NA_integer_|NA_real_|NA_complex_|NA_character_)\b/,
    operator: /->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/,
    punctuation: /[(){}\[\],;]/,
}),
!(function (a) {
    var d = a.util.clone(a.languages.javascript),
    b,
    c;
    (a.languages.jsx = a.languages.extend("markup", d)),
    (a.languages.jsx.tag.pattern =
        /<\/?(?:[\w.:-]+\s*(?:\s+(?:[\w.:$-]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s{'">=]+|\{(?:\{(?:\{[^}]*\}|[^{}])*\}|[^{}])+\}))?|\{\s*\.{3}\s*[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\s*\}))*\s*\/?)?>/i),
    (a.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/i),
    (a.languages.jsx.tag.inside["attr-value"].pattern =
        /=(?!\{)(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">]+)/i),
    (a.languages.jsx.tag.inside.tag.inside["class-name"] =
        /^[A-Z]\w*(?:\.[A-Z]\w*)*$/),
    a.languages.insertBefore(
        "inside",
        "attr-name",
        {
        spread: {
            pattern: /\{\s*\.{3}\s*[a-z_$][\w$]*(?:\.[a-z_$][\w$]*)*\s*\}/,
            inside: { punctuation: /\.{3}|[{}.]/, "attr-value": /\w+/ },
        },
        },
        a.languages.jsx.tag
    ),
    a.languages.insertBefore(
        "inside",
        "attr-value",
        {
        script: {
            pattern: /=(?:\{(?:\{(?:\{[^}]*\}|[^}])*\}|[^}])+\})/i,
            inside: {
            "script-punctuation": {
                pattern: /^=(?={)/,
                alias: "punctuation",
            },
            rest: a.languages.jsx,
            },
            alias: "language-javascript",
        },
        },
        a.languages.jsx.tag
    ),
    (b = function (a) {
        return a
        ? "string" == typeof a
            ? a
            : "string" == typeof a.content
            ? a.content
            : a.content.map(b).join("")
        : "";
    }),
    (c = function (g) {
        for (var e = [], f = 0, d, i, h; f < g.length; f++)
        (d = g[f]),
            (i = !1),
            ("string" != typeof d &&
            ("tag" === d.type && d.content[0] && "tag" === d.content[0].type
                ? "</" === d.content[0].content[0].content
                ? 0 < e.length &&
                    e[e.length - 1].tagName === b(d.content[0].content[1]) &&
                    e.pop()
                : "/>" === d.content[d.content.length - 1].content ||
                    e.push({
                    tagName: b(d.content[0].content[1]),
                    openedBraces: 0,
                    })
                : 0 < e.length && "punctuation" === d.type && "{" === d.content
                ? e[e.length - 1].openedBraces++
                : 0 < e.length &&
                0 < e[e.length - 1].openedBraces &&
                "punctuation" === d.type &&
                "}" === d.content
                ? e[e.length - 1].openedBraces--
                : (i = !0)),
            (i || "string" == typeof d) &&
            0 < e.length &&
            0 === e[e.length - 1].openedBraces) &&
            ((h = b(d)),
            f < g.length - 1 &&
                ("string" == typeof g[f + 1] ||
                "plain-text" === g[f + 1].type) &&
                ((h += b(g[f + 1])), g.splice(f + 1, 1)),
            0 < f &&
                ("string" == typeof g[f - 1] ||
                "plain-text" === g[f - 1].type) &&
                ((h = b(g[f - 1]) + h), g.splice(f - 1, 1), f--),
            (g[f] = new a.Token("plain-text", h, null, h))),
            d.content && "string" != typeof d.content && c(d.content);
    }),
    a.hooks.add("after-tokenize", function (a) {
        ("jsx" !== a.language && "tsx" !== a.language) || c(a.tokens);
    });
})(Prism),
(Prism.languages.typescript = Prism.languages.extend("javascript", {
    keyword:
    /\b(?:abstract|as|async|await|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|is|keyof|let|module|namespace|new|null|of|package|private|protected|public|readonly|return|require|set|static|super|switch|this|throw|try|type|typeof|undefined|var|void|while|with|yield)\b/,
    builtin:
    /\b(?:string|Function|any|number|boolean|Array|symbol|console|Promise|unknown|never)\b/,
})),
(Prism.languages.ts = Prism.languages.typescript),
(typescript = Prism.util.clone(Prism.languages.typescript)),
(Prism.languages.tsx = Prism.languages.extend("jsx", typescript)),
(Prism.languages.renpy = {
    comment: { pattern: /(^|[^\\])#.+/, lookbehind: !0 },
    string: {
    pattern:
        /("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2|(?:^#?(?:(?:[0-9a-fA-F]{2}){3}|(?:[0-9a-fA-F]){3})$)/m,
    greedy: !0,
    },
    function: /[a-z_]\w*(?=\()/i,
    property:
    /\b(?:insensitive|idle|hover|selected_idle|selected_hover|background|position|alt|xpos|ypos|pos|xanchor|yanchor|anchor|xalign|yalign|align|xcenter|ycenter|xofsset|yoffset|ymaximum|maximum|xmaximum|xminimum|yminimum|minimum|xsize|ysizexysize|xfill|yfill|area|antialias|black_color|bold|caret|color|first_indent|font|size|italic|justify|kerning|language|layout|line_leading|line_overlap_split|line_spacing|min_width|newline_indent|outlines|rest_indent|ruby_style|slow_cps|slow_cps_multiplier|strikethrough|text_align|underline|hyperlink_functions|vertical|hinting|foreground|left_margin|xmargin|top_margin|bottom_margin|ymargin|left_padding|right_padding|xpadding|top_padding|bottom_padding|ypadding|size_group|child|hover_sound|activate_sound|mouse|focus_mask|keyboard_focus|bar_vertical|bar_invert|bar_resizing|left_gutter|right_gutter|top_gutter|bottom_gutter|left_bar|right_bar|top_bar|bottom_bar|thumb|thumb_shadow|thumb_offset|unscrollable|spacing|first_spacing|box_reverse|box_wrap|order_reverse|fit_first|ysize|thumbnail_width|thumbnail_height|help|text_ypos|text_xpos|idle_color|hover_color|selected_idle_color|selected_hover_color|insensitive_color|alpha|insensitive_background|hover_background|zorder|value|width|xadjustment|xanchoraround|xaround|xinitial|xoffset|xzoom|yadjustment|yanchoraround|yaround|yinitial|yzoom|zoom|ground|height|text_style|text_y_fudge|selected_insensitive|has_sound|has_music|has_voice|focus|hovered|image_style|length|minwidth|mousewheel|offset|prefix|radius|range|right_margin|rotate|rotate_pad|developer|screen_width|screen_height|window_title|name|version|windows_icon|default_fullscreen|default_text_cps|default_afm_time|main_menu_music|sample_sound|enter_sound|exit_sound|save_directory|enter_transition|exit_transition|intra_transition|main_game_transition|game_main_transition|end_splash_transition|end_game_transition|after_load_transition|window_show_transition|window_hide_transition|adv_nvl_transition|nvl_adv_transition|enter_yesno_transition|exit_yesno_transition|enter_replay_transition|exit_replay_transition|say_attribute_transition|directory_name|executable_name|include_update|window_icon|modal|google_play_key|google_play_salt|drag_name|drag_handle|draggable|dragged|droppable|dropped|narrator_menu|action|default_afm_enable|version_name|version_tuple|inside|fadeout|fadein|layers|layer_clipping|linear|scrollbars|side_xpos|side_ypos|side_spacing|edgescroll|drag_joined|drag_raise|drop_shadow|drop_shadow_color|subpixel|easein|easeout|time|crop|auto|update|get_installed_packages|can_update|UpdateVersion|Update|overlay_functions|translations|window_left_padding|show_side_image|show_two_window)\b/,
    tag: /\b(?:label|image|menu|[hv]box|frame|text|imagemap|imagebutton|bar|vbar|screen|textbutton|buttoscreenn|fixed|grid|input|key|mousearea|side|timer|viewport|window|hotspot|hotbar|self|button|drag|draggroup|tag|mm_menu_frame|nvl|block|parallel)\b|\$/,
    keyword:
    /\b(?:as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|pass|print|raise|return|try|while|yield|adjustment|alignaround|allow|angle|around|box_layout|cache|changed|child_size|clicked|clipping|corner1|corner2|default|delay|exclude|scope|slow|slow_abortable|slow_done|sound|style_group|substitute|suffix|transform_anchor|transpose|unhovered|config|theme|mm_root|gm_root|rounded_window|build|disabled_text|disabled|widget_selected|widget_text|widget_hover|widget|updater|behind|call|expression|hide|init|jump|onlayer|python|renpy|scene|set|show|transform|play|queue|stop|pause|define|window|repeat|contains|choice|on|function|event|animation|clockwise|counterclockwise|circles|knot|null|None|random|has|add|use|fade|dissolve|style|store|id|voice|center|left|right|less_rounded|music|movie|clear|persistent|ui)\b/,
    boolean: /\b(?:[Tt]rue|[Ff]alse)\b/,
    number:
    /(?:\b(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*)|\B\.\d+)(?:e[+-]?\d+)?j?/i,
    operator:
    /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]|\b(?:or|and|not|with|at)\b/,
    punctuation: /[{}[\];(),.:]/,
}),
(Prism.languages.reason = Prism.languages.extend("clike", {
    string: { pattern: /"(?:\\(?:\r\n|[\s\S])|[^\\\r\n"])*"/, greedy: !0 },
    "class-name": /\b[A-Z]\w*/,
    keyword:
    /\b(?:and|as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|method|module|mutable|new|nonrec|object|of|open|or|private|rec|sig|struct|switch|then|to|try|type|val|virtual|when|while|with)\b/,
    operator:
    /\.{3}|:[:=]|\|>|->|=(?:==?|>)?|<=?|>=?|[|^?'#!~`]|[+\-*\/]\.?|\b(?:mod|land|lor|lxor|lsl|lsr|asr)\b/,
})),
Prism.languages.insertBefore("reason", "class-name", {
    character: {
    pattern: /'(?:\\x[\da-f]{2}|\\o[0-3][0-7][0-7]|\\\d{3}|\\.|[^'\\\r\n])'/,
    alias: "string",
    },
    constructor: { pattern: /\b[A-Z]\w*\b(?!\s*\.)/, alias: "variable" },
    label: { pattern: /\b[a-z]\w*(?=::)/, alias: "symbol" },
}),
delete Prism.languages.reason.function,
(Prism.languages.rest = {
    table: [
    {
        pattern:
        /(\s*)(?:\+[=-]+)+\+(?:\r?\n|\r)(?:\1(?:[+|].+)+[+|](?:\r?\n|\r))+\1(?:\+[=-]+)+\+/,
        lookbehind: !0,
        inside: { punctuation: /\||(?:\+[=-]+)+\+/ },
    },
    {
        pattern:
        /(\s*)(?:=+ +)+=+(?:(?:\r?\n|\r)\1.+)+(?:\r?\n|\r)\1(?:=+ +)+=+(?=(?:\r?\n|\r){2}|\s*$)/,
        lookbehind: !0,
        inside: { punctuation: /[=-]+/ },
    },
    ],
    "substitution-def": {
    pattern: /(^\s*\.\. )\|(?:[^|\s](?:[^|]*[^|\s])?)\| [^:]+::/m,
    lookbehind: !0,
    inside: {
        substitution: {
        pattern: /^\|(?:[^|\s]|[^|\s][^|]*[^|\s])\|/,
        alias: "attr-value",
        inside: { punctuation: /^\||\|$/ },
        },
        directive: {
        pattern: /( +)[^:]+::/,
        lookbehind: !0,
        alias: "function",
        inside: { punctuation: /::$/ },
        },
    },
    },
    "link-target": [
    {
        pattern: /(^\s*\.\. )\[[^\]]+\]/m,
        lookbehind: !0,
        alias: "string",
        inside: { punctuation: /^\[|\]$/ },
    },
    {
        pattern: /(^\s*\.\. )_(?:`[^`]+`|(?:[^:\\]|\\.)+):/m,
        lookbehind: !0,
        alias: "string",
        inside: { punctuation: /^_|:$/ },
    },
    ],
    directive: {
    pattern: /(^\s*\.\. )[^:]+::/m,
    lookbehind: !0,
    alias: "function",
    inside: { punctuation: /::$/ },
    },
    comment: {
    pattern:
        /(^\s*\.\.)(?:(?: .+)?(?:(?:\r?\n|\r).+)+| .+)(?=(?:\r?\n|\r){2}|$)/m,
    lookbehind: !0,
    },
    title: [
    {
        pattern:
        /^(([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\2+)(?:\r?\n|\r).+(?:\r?\n|\r)\1$/m,
        inside: {
        punctuation:
            /^[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+|[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+$/,
        important: /.+/,
        },
    },
    {
        pattern:
        /(^|(?:\r?\n|\r){2}).+(?:\r?\n|\r)([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\2+(?=\r?\n|\r|$)/,
        lookbehind: !0,
        inside: {
        punctuation: /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]+$/,
        important: /.+/,
        },
    },
    ],
    hr: {
    pattern:
        /((?:\r?\n|\r){2})([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\2{3,}(?=(?:\r?\n|\r){2})/,
    lookbehind: !0,
    alias: "punctuation",
    },
    field: {
    pattern: /(^\s*):[^:\r\n]+:(?= )/m,
    lookbehind: !0,
    alias: "attr-name",
    },
    "command-line-option": {
    pattern:
        /(^\s*)(?:[+-][a-z\d]|(?:--|\/)[a-z\d-]+)(?:[ =](?:[a-z][\w-]*|<[^<>]+>))?(?:, (?:[+-][a-z\d]|(?:--|\/)[a-z\d-]+)(?:[ =](?:[a-z][\w-]*|<[^<>]+>))?)*(?=(?:\r?\n|\r)? {2,}\S)/im,
    lookbehind: !0,
    alias: "symbol",
    },
    "literal-block": {
    pattern: /::(?:\r?\n|\r){2}([ \t]+).+(?:(?:\r?\n|\r)\1.+)*/,
    inside: {
        "literal-block-punctuation": { pattern: /^::/, alias: "punctuation" },
    },
    },
    "quoted-literal-block": {
    pattern:
        /::(?:\r?\n|\r){2}([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~]).*(?:(?:\r?\n|\r)\1.*)*/,
    inside: {
        "literal-block-punctuation": {
        pattern: /^(?:::|([!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~])\1*)/m,
        alias: "punctuation",
        },
    },
    },
    "list-bullet": {
    pattern:
        /(^\s*)(?:[*+\-•‣⁃]|\(?(?:\d+|[a-z]|[ivxdclm]+)\)|(?:\d+|[a-z]|[ivxdclm]+)\.)(?= )/im,
    lookbehind: !0,
    alias: "punctuation",
    },
    "doctest-block": {
    pattern: /(^\s*)>>> .+(?:(?:\r?\n|\r).+)*/m,
    lookbehind: !0,
    inside: { punctuation: /^>>>/ },
    },
    inline: [
    {
        pattern:
        /(^|[\s\-:\/'"<(\[{])(?::[^:]+:`.*?`|`.*?`:[^:]+:|(\*\*?|``?|\|)(?!\s).*?[^\s]\2(?=[\s\-.,:;!?\\\/'")\]}]|$))/m,
        lookbehind: !0,
        inside: {
        bold: { pattern: /(^\*\*).+(?=\*\*$)/, lookbehind: !0 },
        italic: { pattern: /(^\*).+(?=\*$)/, lookbehind: !0 },
        "inline-literal": {
            pattern: /(^``).+(?=``$)/,
            lookbehind: !0,
            alias: "symbol",
        },
        role: {
            pattern: /^:[^:]+:|:[^:]+:$/,
            alias: "function",
            inside: { punctuation: /^:|:$/ },
        },
        "interpreted-text": {
            pattern: /(^`).+(?=`$)/,
            lookbehind: !0,
            alias: "attr-value",
        },
        substitution: {
            pattern: /(^\|).+(?=\|$)/,
            lookbehind: !0,
            alias: "attr-value",
        },
        punctuation: /\*\*?|``?|\|/,
        },
    },
    ],
    link: [
    {
        pattern: /\[[^\]]+\]_(?=[\s\-.,:;!?\\\/'")\]}]|$)/,
        alias: "string",
        inside: { punctuation: /^\[|\]_$/ },
    },
    {
        pattern:
        /(?:\b[a-z\d]+(?:[_.:+][a-z\d]+)*_?_|`[^`]+`_?_|_`[^`]+`)(?=[\s\-.,:;!?\\\/'")\]}]|$)/i,
        alias: "string",
        inside: { punctuation: /^_?`|`$|`?_?_$/ },
    },
    ],
    punctuation: {
    pattern: /(^\s*)(?:\|(?= |$)|(?:---?|—|\.\.|__)(?= )|\.\.$)/m,
    lookbehind: !0,
    },
}),
(Prism.languages.rip = {
    comment: /#.*/,
    keyword:
    /(?:=>|->)|\b(?:class|if|else|switch|case|return|exit|try|catch|finally|raise)\b/,
    builtin: /@|\bSystem\b/,
    boolean: /\b(?:true|false)\b/,
    date: /\b\d{4}-\d{2}-\d{2}\b/,
    time: /\b\d{2}:\d{2}:\d{2}\b/,
    datetime: /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\b/,
    character: /\B`[^\s`'",.:;#\/\\()<>\[\]{}]\b/,
    regex: {
    pattern:
        /(^|[^/])\/(?!\/)(?:\[.+?]|\\.|[^/\\\r\n])+\/(?=\s*(?:$|[\r\n,.;})]))/,
    lookbehind: !0,
    greedy: !0,
    },
    symbol: /:[^\d\s`'",.:;#\/\\()<>\[\]{}][^\s`'",.:;#\/\\()<>\[\]{}]*/,
    string: { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
    number: /[+-]?(?:(?:\d+\.\d+)|(?:\d+))/,
    punctuation: /(?:\.{2,3})|[`,.:;=\/\\()<>\[\]{}]/,
    reference: /[^\d\s`'",.:;#\/\\()<>\[\]{}][^\s`'",.:;#\/\\()<>\[\]{}]*/,
}),
(Prism.languages.roboconf = {
    comment: /#.*/,
    keyword: {
    pattern:
        /(^|\s)(?:(?:facet|instance of)(?=[ \t]+[\w-]+[ \t]*\{)|(?:external|import)\b)/,
    lookbehind: !0,
    },
    component: { pattern: /[\w-]+(?=[ \t]*\{)/, alias: "variable" },
    property: /[\w.-]+(?=[ \t]*:)/,
    value: { pattern: /(=[ \t]*)[^,;]+/, lookbehind: !0, alias: "attr-value" },
    optional: { pattern: /\(optional\)/, alias: "builtin" },
    wildcard: { pattern: /(\.)\*/, lookbehind: !0, alias: "operator" },
    punctuation: /[{},.;:=]/,
}),
(Prism.languages.rust = {
    comment: [
    { pattern: /(^|[^\\])\/\*[\s\S]*?\*\//, lookbehind: !0 },
    { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 },
    ],
    string: [
    { pattern: /b?r(#*)"(?:\\.|(?!"\1)[^\\\r\n])*"\1/, greedy: !0 },
    { pattern: /b?"(?:\\.|[^\\\r\n"])*"/, greedy: !0 },
    ],
    char: {
    pattern:
        /b?'(?:\\(?:x[0-7][\da-fA-F]|u{(?:[\da-fA-F]_*){1,6}|.)|[^\\\r\n\t'])'/,
    alias: "string",
    },
    "lifetime-annotation": { pattern: /'[^\s>']+/, alias: "symbol" },
    keyword:
    /\b(?:abstract|alignof|as|async|await|be|box|break|const|continue|crate|do|dyn|else|enum|extern|false|final|fn|for|if|impl|in|let|loop|match|mod|move|mut|offsetof|once|override|priv|pub|pure|ref|return|sizeof|static|self|Self|struct|super|true|trait|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
    attribute: { pattern: /#!?\[.+?\]/, greedy: !0, alias: "attr-name" },
    function: [/\w+(?=\s*\()/, /\w+!(?=\s*\(|\[)/],
    "macro-rules": { pattern: /\w+!/, alias: "function" },
    number:
    /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:\d(?:_?\d)*)?\.?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:[iu](?:8|16|32|64)?|f32|f64))?\b/,
    "closure-params": {
    pattern: /\|[^|]*\|(?=\s*[{-])/,
    inside: { punctuation: /[|:,]/, operator: /[&*]/ },
    },
    punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
    operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/,
}),
!(function (j) {
    var d = "(?:\"(?:\"\"|[^\"])*\"(?!\")|'(?:''|[^'])*'(?!'))",
    a = /\b(?:\d[\da-f]*x|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b/i,
    b = { pattern: RegExp(d + "[bx]"), alias: "number" },
    m = {
        pattern: /(^|\s+)(?:proc\s+\w+|quit|run|data(?!\=))\b/i,
        alias: "keyword",
        lookbehind: !0,
    },
    h = [
        /\/\*[\s\S]*?\*\//,
        { pattern: /(^\s*|;\s*)\*[^;]*;/m, lookbehind: !0 },
    ],
    e = { pattern: RegExp(d), greedy: !0 },
    f = /[$%@.(){}\[\];,\\]/,
    i = { pattern: /%?\w+(?=\()/, alias: "keyword" },
    c = {
        function: i,
        "arg-value": { pattern: /(\s*=\s*)[A-Z\.]+/i, lookbehind: !0 },
        operator: /=/,
        "macro-variable": { pattern: /&[^\.]*\./i, alias: "string" },
        arg: { pattern: /[A-Z]+/i, alias: "keyword" },
        number: a,
        "numeric-constant": b,
        punctuation: f,
        string: e,
    },
    k = {
        pattern: /\b(?:format|put)\b=?[\w'$.]+/im,
        inside: {
        keyword: /^(?:format|put)(?=\=)/i,
        equals: /=/,
        format: { pattern: /(?:\w|\$\d)+\.\d?/i, alias: "number" },
        },
    },
    l = {
        pattern: /\b(?:format|put)\s+[\w']+(?:\s+[$.\w]+)+(?=;)/i,
        inside: {
        keyword: /^(?:format|put)/i,
        format: { pattern: /[\w$]+\.\d?/, alias: "number" },
        },
    },
    g = {
        pattern:
        /((?:^|[\s])=?)(?:catname|checkpoint execute_always|dm|endsas|filename|footnote|%include|libname|%list|lock|missing|options|page|resetline|%run|sasfile|skip|sysecho|title\d?)\b/i,
        lookbehind: !0,
        alias: "keyword",
    },
    n = {
        pattern:
        /(^|\s)(?:submit(?:\s+(?:load|parseonly|norun))?|endsubmit)\b/i,
        lookbehind: !0,
        alias: "keyword",
    },
    o =
        "accessControl|cdm|aggregation|aStore|ruleMining|audio|autotune|bayesianNetClassifier|bioMedImage|boolRule|builtins|cardinality|sccasl|clustering|copula|countreg|dataDiscovery|dataPreprocess|dataSciencePilot|dataStep|decisionTree|deepLearn|deepNeural|varReduce|simSystem|ds2|deduplication|ecm|entityRes|espCluster|explainModel|factmac|fastKnn|fcmpact|fedSql|freqTab|gam|gleam|graphSemiSupLearn|gVarCluster|hiddenMarkovModel|hyperGroup|image|iml|ica|kernalPca|langModel|ldaTopic|sparseML|mlTools|mixed|modelPublishing|mbc|network|optNetwork|neuralNet|nonlinear|nmf|nonParametricBayes|optimization|panel|pls|percentile|pca|phreg|qkb|qlim|quantreg|recommend|tsReconcile|deepRnn|regression|reinforcementLearn|robustPca|sampling|sparkEmbeddedProcess|search(?:Analytics)?|sentimentAnalysis|sequence|configuration|session(?:Prop)?|severity|simple|smartData|sandwich|spatialreg|stabilityMonitoring|spc|loadStreams|svDataDescription|svm|table|conditionalRandomFields|text(?:Rule(?:Develop|Score)|Mining|Parse|Topic|Util|Filters|Frequency)|tsInfo|timeData|transpose|uniTimeSeries",
    p = {
        pattern: RegExp(
        "(^|\\s)(?:action\\s+)?(?:<act>)\\.[a-z]+\\b[^;]+".replace(
            /<act>/g,
            function () {
            return o;
            }
        ),
        "i"
        ),
        lookbehind: !0,
        inside: {
        keyword: RegExp(
            "(?:<act>)\\.[a-z]+\\b".replace(/<act>/g, function () {
            return o;
            }),
            "i"
        ),
        action: { pattern: /(?:action)/i, alias: "keyword" },
        function: i,
        "arg-value": c["arg-value"],
        operator: c.operator,
        comment: h,
        argument: c.arg,
        number: a,
        "numeric-constant": b,
        punctuation: f,
        string: e,
        },
    },
    q = {
        pattern:
        /((?:^|\s)=?)(?:after|analysis|and|array|barchart|barwidth|begingraph|by|call|cas|cbarline|cfill|class(?:lev)?|close|column|computed?|contains|continue|data(?=\=)|define|delete|describe|document|do\s+over|do|dol|drop|dul|end(?:source|comp)?|entryTitle|else|eval(?:uate)?|exec(?:ute)?|exit|fill(?:attrs)?|file(?:name)?|flist|fnc|function(?:list)?|goto|global|group(?:by)?|headline|headskip|histogram|if|infile|keep|keylabel|keyword|label|layout|leave|legendlabel|length|libname|loadactionset|merge|midpoints|name|noobs|nowd|_?null_|ods|options|or|otherwise|out(?:put)?|over(?:lay)?|plot|put|print|raise|ranexp|rannor|rbreak|retain|return|select|set|session|sessref|source|statgraph|sum|summarize|table|temp|terminate|then\s+do|then|title\d?|to|var|when|where|xaxisopts|yaxisopts|y2axisopts)\b/i,
        lookbehind: !0,
    };
    j.languages.sas = {
    datalines: {
        pattern: /^(\s*)(?:(?:data)?lines|cards);[\s\S]+?^\s*;/im,
        lookbehind: !0,
        alias: "string",
        inside: {
        keyword: { pattern: /^(?:(?:data)?lines|cards)/i },
        punctuation: /;/,
        },
    },
    "proc-sql": {
        pattern:
        /(^proc\s+(?:fed)?sql(?:\s+[\w|=]+)?;)[\s\S]+?(?=^(?:proc\s+\w+|quit|run|data);|(?![\s\S]))/im,
        lookbehind: !0,
        inside: {
        sql: {
            pattern: RegExp(
            "^[ 	]*(?:select|alter\\s+table|(?:create|describe|drop)\\s+(?:index|table(?:\\s+constraints)?|view)|create\\s+unique\\s+index|insert\\s+into|update)(?:<str>|[^;\"'])+;".replace(
                /<str>/g,
                function () {
                return d;
                }
            ),
            "im"
            ),
            alias: "language-sql",
            inside: j.languages.sql,
        },
        "global-statements": g,
        "sql-statements": {
            pattern:
            /(^|\s)(?:disconnect\s+from|exec(?:ute)?|begin|commit|rollback|reset|validate)\b/i,
            lookbehind: !0,
            alias: "keyword",
        },
        number: a,
        "numeric-constant": b,
        punctuation: f,
        string: e,
        },
    },
    "proc-groovy": {
        pattern:
        /(^proc\s+groovy(?:\s+[\w|=]+)?;)(?:\s*submit)[\s\S]+?(?=^(?:proc\s+\w+|quit|run|data);|(?![\s\S]))/im,
        lookbehind: !0,
        inside: {
        groovy: {
            pattern: RegExp(
            "(^[ 	]*submit(?:\\s+(?:load|parseonly|norun))?)(?:<str>|[^\"'])+?(?=endsubmit;)".replace(
                /<str>/g,
                function () {
                return d;
                }
            ),
            "im"
            ),
            lookbehind: !0,
            alias: "language-groovy",
            inside: j.languages.groovy,
        },
        "submit-statement": n,
        "global-statements": g,
        number: a,
        "numeric-constant": b,
        punctuation: f,
        string: e,
        },
    },
    "proc-lua": {
        pattern:
        /(^proc\s+lua(?:\s+[\w|=]+)?;)(?:\s*submit)[\s\S]+?(?=^(?:proc\s+\w+|quit|run|data);|(?![\s\S]))/im,
        lookbehind: !0,
        inside: {
        lua: {
            pattern: RegExp(
            "(^[ 	]*submit(?:\\s+(?:load|parseonly|norun))?)(?:<str>|[^\"'])+?(?=endsubmit;)".replace(
                /<str>/g,
                function () {
                return d;
                }
            ),
            "im"
            ),
            lookbehind: !0,
            alias: "language-lua",
            inside: j.languages.lua,
        },
        "submit-statement": n,
        "global-statements": g,
        number: a,
        "numeric-constant": b,
        punctuation: f,
        string: e,
        },
    },
    "proc-cas": {
        pattern:
        /(^proc\s+cas(?:\s+[\w|=]+)?;)[\s\S]+?(?=^(?:proc\s+\w+|quit|data);|(?![\s\S]))/im,
        lookbehind: !0,
        inside: {
        "statement-var": {
            pattern: /((?:^|\s)=?)saveresult\s+[^;]+/im,
            lookbehind: !0,
            inside: {
            statement: {
                pattern: /^saveresult\s+\S+/i,
                inside: { keyword: /^(?:saveresult)/i },
            },
            rest: c,
            },
        },
        "cas-actions": p,
        statement: {
            pattern:
            /((?:^|\s)=?)(?:default|(?:un)?set|on|output|upload)[^;]+/im,
            lookbehind: !0,
            inside: c,
        },
        step: m,
        keyword: q,
        function: i,
        comment: h,
        format: k,
        altformat: l,
        "global-statements": g,
        number: a,
        "numeric-constant": b,
        punctuation: f,
        string: e,
        },
    },
    "proc-args": {
        pattern: RegExp(
        "(^proc\\s+\\w+\\s+)(?!\\s)(?:[^;\"']|<str>)+;".replace(
            /<str>/g,
            function () {
            return d;
            }
        ),
        "im"
        ),
        lookbehind: !0,
        inside: c,
    },
    "macro-keyword": {
        pattern:
        /((?:^|\s)=?)%(?:ABORT|BQUOTE|BY|CMS|COPY|DISPLAY|DO|ELSE|END|EVAL|GLOBAL|GO|GOTO|IF|INC|INCLUDE|INDEX|INPUT|KTRIM|LENGTH|LET|LIST|LOCAL|NRBQUOTE|NRQUOTE|NRSTR|PUT|QKTRIM|QSCAN|QSUBSTR|QSYSFUNC|QUOTE|QUPCASE|RETURN|RUN|SCAN|STR|SUBSTR|SUPERQ|SYMDEL|SYMGLOBL|SYMLOCAL|SYMEXIST|SYSCALL|SYSEVALF|SYSEXEC|SYSFUNC|SYSGET|SYSRPUT|THEN|TO|TSO|UNQUOTE|UNTIL|UPCASE|WHILE|WINDOW)\b/i,
        lookbehind: !0,
        alias: "keyword",
    },
    "macro-declaration": {
        pattern: /^%macro[^;]+(?=;)/im,
        inside: { keyword: /%macro/i },
    },
    "macro-end": {
        pattern: /^%mend[^;]+(?=;)/im,
        inside: { keyword: /%mend/i },
    },
    macro: { pattern: /%_\w+(?=\()/, alias: "keyword" },
    input: {
        pattern: /\binput\s+[-\w\s/*.$&]+;/i,
        inside: {
        input: { alias: "keyword", pattern: /^input/i },
        comment: h,
        number: a,
        "numeric-constant": b,
        },
    },
    "options-args": {
        pattern: /(^options)[-'"|/\\<>*+=:()\w\s]*(?=;)/im,
        lookbehind: !0,
        inside: c,
    },
    "cas-actions": p,
    comment: h,
    function: i,
    format: k,
    altformat: l,
    "numeric-constant": b,
    datetime: { pattern: RegExp(d + "(?:dt?|t)"), alias: "number" },
    string: e,
    step: m,
    keyword: q,
    "operator-keyword": {
        pattern: /\b(?:eq|ne|gt|lt|ge|le|in|not)\b/i,
        alias: "operator",
    },
    number: a,
    operator: /\*\*?|\|\|?|!!?|¦¦?|<[>=]?|>[<=]?|[-+\/=&]|[~¬^]=?/i,
    punctuation: f,
    };
})(Prism),
!(function (a) {
    (a.languages.sass = a.languages.extend("css", {
    comment: {
        pattern: /^([ \t]*)\/[\/*].*(?:(?:\r?\n|\r)\1[ \t]+.+)*/m,
        lookbehind: !0,
    },
    })),
    a.languages.insertBefore("sass", "atrule", {
        "atrule-line": {
        pattern: /^(?:[ \t]*)[@+=].+/m,
        inside: { atrule: /(?:@[\w-]+|[+=])/m },
        },
    }),
    delete a.languages.sass.atrule;
    var b = /\$[-\w]+|#\{\$[-\w]+\}/,
    c = [
        /[+*\/%]|[=!]=|<=?|>=?|\b(?:and|or|not)\b/,
        { pattern: /(\s+)-(?=\s)/, lookbehind: !0 },
    ];
    a.languages.insertBefore("sass", "property", {
    "variable-line": {
        pattern: /^[ \t]*\$.+/m,
        inside: { punctuation: /:/, variable: b, operator: c },
    },
    "property-line": {
        pattern: /^[ \t]*(?:[^:\s]+ *:.*|:[^:\s]+.*)/m,
        inside: {
        property: [
            /[^:\s]+(?=\s*:)/,
            { pattern: /(:)[^:\s]+/, lookbehind: !0 },
        ],
        punctuation: /:/,
        variable: b,
        operator: c,
        important: a.languages.sass.important,
        },
    },
    }),
    delete a.languages.sass.property,
    delete a.languages.sass.important,
    a.languages.insertBefore("sass", "punctuation", {
        selector: {
        pattern:
            /([ \t]*)\S(?:,?[^,\r\n]+)*(?:,(?:\r?\n|\r)\1[ \t]+\S(?:,?[^,\r\n]+)*)*/,
        lookbehind: !0,
        },
    });
})(Prism),
(Prism.languages.scss = Prism.languages.extend("css", {
    comment: {
    pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
    lookbehind: !0,
    },
    atrule: {
    pattern: /@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,
    inside: { rule: /@[\w-]+/ },
    },
    url: /(?:[-a-z]+-)?url(?=\()/i,
    selector: {
    pattern:
        /(?=\S)[^@;{}()]?(?:[^@;{}()]|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}]+[:{][^}]+))/m,
    inside: {
        parent: { pattern: /&/, alias: "important" },
        placeholder: /%[-\w]+/,
        variable: /\$[-\w]+|#\{\$[-\w]+\}/,
    },
    },
    property: {
    pattern: /(?:[\w-]|\$[-\w]+|#\{\$[-\w]+\})+(?=\s*:)/,
    inside: { variable: /\$[-\w]+|#\{\$[-\w]+\}/ },
    },
})),
Prism.languages.insertBefore("scss", "atrule", {
    keyword: [
    /@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,
    { pattern: /( +)(?:from|through)(?= )/, lookbehind: !0 },
    ],
}),
Prism.languages.insertBefore("scss", "important", {
    variable: /\$[-\w]+|#\{\$[-\w]+\}/,
}),
Prism.languages.insertBefore("scss", "function", {
    placeholder: { pattern: /%[-\w]+/, alias: "selector" },
    statement: { pattern: /\B!(?:default|optional)\b/i, alias: "keyword" },
    boolean: /\b(?:true|false)\b/,
    null: { pattern: /\bnull\b/, alias: "keyword" },
    operator: {
    pattern: /(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,
    lookbehind: !0,
    },
}),
(Prism.languages.scss.atrule.inside.rest = Prism.languages.scss),
(Prism.languages.scala = Prism.languages.extend("java", {
    keyword:
    /<-|=>|\b(?:abstract|case|catch|class|def|do|else|extends|final|finally|for|forSome|if|implicit|import|lazy|match|new|null|object|override|package|private|protected|return|sealed|self|super|this|throw|trait|try|type|val|var|while|with|yield)\b/,
    "triple-quoted-string": {
    pattern: /"""[\s\S]*?"""/,
    greedy: !0,
    alias: "string",
    },
    string: { pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/, greedy: !0 },
    builtin:
    /\b(?:String|Int|Long|Short|Byte|Boolean|Double|Float|Char|Any|AnyRef|AnyVal|Unit|Nothing)\b/,
    number: /\b0x[\da-f]*\.?[\da-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e\d+)?[dfl]?/i,
    symbol: /'[^\d\s\\]\w*/,
})),
delete Prism.languages.scala["class-name"],
delete Prism.languages.scala.function,
(Prism.languages.scheme = {
    comment: /;.*/,
    string: { pattern: /"(?:[^"\\]|\\.)*"/, greedy: !0 },
    symbol: { pattern: /'[^()#'\s]+/, greedy: !0 },
    character: {
    pattern: /#\\(?:[ux][a-fA-F\d]+|[-a-zA-Z]+|\S)/,
    greedy: !0,
    alias: "string",
    },
    "lambda-parameter": { pattern: /(\(lambda\s+\()[^()'\s]+/, lookbehind: !0 },
    keyword: {
    pattern:
        /(\()(?:define(?:-syntax|-library|-values)?|(?:case-)?lambda|let(?:\*|rec)?(?:-values)?|else|if|cond|begin|delay(?:-force)?|parameterize|guard|set!|(?:quasi-)?quote|syntax-rules)(?=[()\s])/,
    lookbehind: !0,
    },
    builtin: {
    pattern:
        /(\()(?:(?:cons|car|cdr|list|call-with-current-continuation|call\/cc|append|abs|apply|eval)\b|null\?|pair\?|boolean\?|eof-object\?|char\?|procedure\?|number\?|port\?|string\?|vector\?|symbol\?|bytevector\?)(?=[()\s])/,
    lookbehind: !0,
    },
    number: {
    pattern:
        /([\s()])(?:(?:#d(?:#[ei])?|#[ei](?:#d)?)?[+-]?(?:(?:\d*\.?\d+(?:[eE][+-]?\d+)?|\d+\/\d+)(?:[+-](?:\d*\.?\d+(?:[eE][+-]?\d+)?|\d+\/\d+)i)?|(?:\d*\.?\d+(?:[eE][+-]?\d+)?|\d+\/\d+)i)|(?:#[box](?:#[ei])?|#[ei](?:#[box])?)[+-]?(?:[\da-fA-F]+(?:\/[\da-fA-F]+)?(?:[+-][\da-fA-F]+(?:\/[\da-fA-F]+)?i)?|[\da-fA-F]+(?:\/[\da-fA-F]+)?i))(?=[\s()]|$)/,
    lookbehind: !0,
    },
    boolean: /#[tf]/,
    operator: {
    pattern: /(\()(?:[-+*%\/]|[<>]=?|=>?)(?=\s|$)/,
    lookbehind: !0,
    },
    function: { pattern: /(\()[^()'\s]+(?=[()\s]|$)/, lookbehind: !0 },
    punctuation: /[()']/,
}),
(Prism.languages.smalltalk = {
    comment: /"(?:""|[^"])*"/,
    character: { pattern: /\$./, alias: "string" },
    string: /'(?:''|[^'])*'/,
    symbol: /#[\da-z]+|#(?:-|([+\/\\*~<>=@%|&?!])\1?)|#(?=\()/i,
    "block-arguments": {
    pattern: /(\[\s*):[^\[|]*\|/,
    lookbehind: !0,
    inside: { variable: /:[\da-z]+/i, punctuation: /\|/ },
    },
    "temporary-variables": {
    pattern: /\|[^|]+\|/,
    inside: { variable: /[\da-z]+/i, punctuation: /\|/ },
    },
    keyword: /\b(?:nil|true|false|self|super|new)\b/,
    number: [
    /\d+r-?[\dA-Z]+(?:\.[\dA-Z]+)?(?:e-?\d+)?/,
    /\b\d+(?:\.\d+)?(?:e-?\d+)?/,
    ],
    operator: /[<=]=?|:=|~[~=]|\/\/?|\\\\|>[>=]?|[!^+\-*&|,@]/,
    punctuation: /[.;:?\[\](){}]/,
}),
!(function (a) {
    (a.languages.smarty = {
    comment: /\{\*[\s\S]*?\*\}/,
    delimiter: { pattern: /^\{|\}$/i, alias: "punctuation" },
    string: /(["'])(?:\\.|(?!\1)[^\\\r\n])*\1/,
    number: /\b0x[\dA-Fa-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][-+]?\d+)?/,
    variable: [
        /\$(?!\d)\w+/,
        /#(?!\d)\w+#/,
        { pattern: /(\.|->)(?!\d)\w+/, lookbehind: !0 },
        { pattern: /(\[)(?!\d)\w+(?=\])/, lookbehind: !0 },
    ],
    function: [
        { pattern: /(\|\s*)@?(?!\d)\w+/, lookbehind: !0 },
        /^\/?(?!\d)\w+/,
        /(?!\d)\w+(?=\()/,
    ],
    "attr-name": {
        pattern: /\w+\s*=\s*(?:(?!\d)\w+)?/,
        inside: {
        variable: { pattern: /(=\s*)(?!\d)\w+/, lookbehind: !0 },
        operator: /=/,
        },
    },
    punctuation: [/[\[\]().,:`]|->/],
    operator: [
        /[+\-*\/%]|==?=?|[!<>]=?|&&|\|\|?/,
        /\bis\s+(?:not\s+)?(?:div|even|odd)(?:\s+by)?\b/,
        /\b(?:eq|neq?|gt|lt|gt?e|lt?e|not|mod|or|and)\b/,
    ],
    keyword: /\b(?:false|off|on|no|true|yes)\b/,
    }),
    a.hooks.add("before-tokenize", function (c) {
        var b = !1;
        a.languages["markup-templating"].buildPlaceholders(
        c,
        "smarty",
        /\{\*[\s\S]*?\*\}|\{[\s\S]+?\}/g,
        function (a) {
            return (
            "{/literal}" === a && (b = !1),
            !b && ("{literal}" === a && (b = !0), !0)
            );
        }
        );
    }),
    a.hooks.add("after-tokenize", function (b) {
        a.languages["markup-templating"].tokenizePlaceholders(b, "smarty");
    });
})(Prism),
!(function (a) {
    var b = /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    c = /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b|\b0x[\dA-F]+\b/;
    (a.languages.soy = {
    comment: [
        /\/\*[\s\S]*?\*\//,
        { pattern: /(\s)\/\/.*/, lookbehind: !0, greedy: !0 },
    ],
    "command-arg": {
        pattern:
        /({+\/?\s*(?:alias|call|delcall|delpackage|deltemplate|namespace|template)\s+)\.?[\w.]+/,
        lookbehind: !0,
        alias: "string",
        inside: { punctuation: /\./ },
    },
    parameter: {
        pattern: /({+\/?\s*@?param\??\s+)\.?[\w.]+/,
        lookbehind: !0,
        alias: "variable",
    },
    keyword: [
        {
        pattern:
            /({+\/?[^\S\r\n]*)(?:\\[nrt]|alias|call|case|css|default|delcall|delpackage|deltemplate|else(?:if)?|fallbackmsg|for(?:each)?|if(?:empty)?|lb|let|literal|msg|namespace|nil|@?param\??|rb|sp|switch|template|xid)/,
        lookbehind: !0,
        },
        /\b(?:any|as|attributes|bool|css|float|in|int|js|html|list|map|null|number|string|uri)\b/,
    ],
    delimiter: { pattern: /^{+\/?|\/?}+$/, alias: "punctuation" },
    property: /\w+(?==)/,
    variable: {
        pattern: /\$[^\W\d]\w*(?:\??(?:\.\w+|\[[^\]]+]))*/,
        inside: {
        string: { pattern: b, greedy: !0 },
        number: c,
        punctuation: /[\[\].?]/,
        },
    },
    string: { pattern: b, greedy: !0 },
    function: [/\w+(?=\()/, { pattern: /(\|[^\S\r\n]*)\w+/, lookbehind: !0 }],
    boolean: /\b(?:true|false)\b/,
    number: c,
    operator: /\?:?|<=?|>=?|==?|!=|[+*/%-]|\b(?:and|not|or)\b/,
    punctuation: /[{}()\[\]|.,:]/,
    }),
    a.hooks.add("before-tokenize", function (c) {
        var b = !1;
        a.languages["markup-templating"].buildPlaceholders(
        c,
        "soy",
        /{{.+?}}|{.+?}|\s\/\/.*|\/\*[\s\S]*?\*\//g,
        function (a) {
            return (
            "{/literal}" === a && (b = !1),
            !b && ("{literal}" === a && (b = !0), !0)
            );
        }
        );
    }),
    a.hooks.add("after-tokenize", function (b) {
        a.languages["markup-templating"].tokenizePlaceholders(b, "soy");
    });
})(Prism),
!(function (b) {
    var a = {
    url: /url\((["']?).*?\1\)/i,
    string: {
        pattern: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
        greedy: !0,
    },
    interpolation: null,
    func: null,
    important: /\B!(?:important|optional)\b/i,
    keyword: {
        pattern: /(^|\s+)(?:(?:if|else|for|return|unless)(?=\s+|$)|@[\w-]+)/,
        lookbehind: !0,
    },
    hexcode: /#[\da-f]{3,6}/i,
    number: /\b\d+(?:\.\d+)?%?/,
    boolean: /\b(?:true|false)\b/,
    operator: [
        /~|[+!\/%<>?=]=?|[-:]=|\*[*=]?|\.+|&&|\|\||\B-\B|\b(?:and|in|is(?: a| defined| not|nt)?|not|or)\b/,
    ],
    punctuation: /[{}()\[\];:,]/,
    };
    (a.interpolation = {
    pattern: /\{[^\r\n}:]+\}/,
    alias: "variable",
    inside: {
        delimiter: { pattern: /^{|}$/, alias: "punctuation" },
        rest: a,
    },
    }),
    (a.func = {
        pattern: /[\w-]+\([^)]*\).*/,
        inside: { function: /^[^(]+/, rest: a },
    }),
    (b.languages.stylus = {
        comment: {
        pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,
        lookbehind: !0,
        },
        "atrule-declaration": {
        pattern: /(^\s*)@.+/m,
        lookbehind: !0,
        inside: { atrule: /^@[\w-]+/, rest: a },
        },
        "variable-declaration": {
        pattern: /(^[ \t]*)[\w$-]+\s*.?=[ \t]*(?:(?:\{[^}]*\}|.+)|$)/m,
        lookbehind: !0,
        inside: { variable: /^\S+/, rest: a },
        },
        statement: {
        pattern: /(^[ \t]*)(?:if|else|for|return|unless)[ \t]+.+/m,
        lookbehind: !0,
        inside: { keyword: /^\S+/, rest: a },
        },
        "property-declaration": {
        pattern:
            /((?:^|\{)([ \t]*))(?:[\w-]|\{[^}\r\n]+\})+(?:\s*:\s*|[ \t]+)[^{\r\n]*(?:;|[^{\r\n,](?=$)(?!(?:\r?\n|\r)(?:\{|\2[ \t]+)))/m,
        lookbehind: !0,
        inside: {
            property: {
            pattern: /^[^\s:]+/,
            inside: { interpolation: a.interpolation },
            },
            rest: a,
        },
        },
        selector: {
        pattern:
            /(^[ \t]*)(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)(?:(?:\r?\n|\r)(?:\1(?:(?=\S)(?:[^{}\r\n:()]|::?[\w-]+(?:\([^)\r\n]*\))?|\{[^}\r\n]+\})+)))*(?:,$|\{|(?=(?:\r?\n|\r)(?:\{|\1[ \t]+)))/m,
        lookbehind: !0,
        inside: { interpolation: a.interpolation, punctuation: /[{},]/ },
        },
        func: a.func,
        string: a.string,
        interpolation: a.interpolation,
        punctuation: /[{}()\[\];:.]/,
    });
})(Prism),
(Prism.languages.swift = Prism.languages.extend("clike", {
    string: {
    pattern:
        /("|')(?:\\(?:\((?:[^()]|\([^)]+\))+\)|\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: !0,
    inside: {
        interpolation: {
        pattern: /\\\((?:[^()]|\([^)]+\))+\)/,
        inside: { delimiter: { pattern: /^\\\(|\)$/, alias: "variable" } },
        },
    },
    },
    keyword:
    /\b(?:as|associativity|break|case|catch|class|continue|convenience|default|defer|deinit|didSet|do|dynamic(?:Type)?|else|enum|extension|fallthrough|final|for|func|get|guard|if|import|in|infix|init|inout|internal|is|lazy|left|let|mutating|new|none|nonmutating|operator|optional|override|postfix|precedence|prefix|private|protocol|public|repeat|required|rethrows|return|right|safe|self|Self|set|static|struct|subscript|super|switch|throws?|try|Type|typealias|unowned|unsafe|var|weak|where|while|willSet|__(?:COLUMN__|FILE__|FUNCTION__|LINE__))\b/,
    number:
    /\b(?:[\d_]+(?:\.[\de_]+)?|0x[a-f0-9_]+(?:\.[a-f0-9p_]+)?|0b[01_]+|0o[0-7_]+)\b/i,
    constant: /\b(?:nil|[A-Z_]{2,}|k[A-Z][A-Za-z_]+)\b/,
    atrule:
    /@\b(?:IB(?:Outlet|Designable|Action|Inspectable)|class_protocol|exported|noreturn|NS(?:Copying|Managed)|objc|UIApplicationMain|auto_closure)\b/,
    builtin:
    /\b(?:[A-Z]\S+|abs|advance|alignof(?:Value)?|assert|contains|count(?:Elements)?|debugPrint(?:ln)?|distance|drop(?:First|Last)|dump|enumerate|equal|filter|find|first|getVaList|indices|isEmpty|join|last|lexicographicalCompare|map|max(?:Element)?|min(?:Element)?|numericCast|overlaps|partition|print(?:ln)?|reduce|reflect|reverse|sizeof(?:Value)?|sort(?:ed)?|split|startsWith|stride(?:of(?:Value)?)?|suffix|swap|toDebugString|toString|transcode|underestimateCount|unsafeBitCast|with(?:ExtendedLifetime|Unsafe(?:MutablePointers?|Pointers?)|VaList))\b/,
})),
(Prism.languages.swift.string.inside.interpolation.inside.rest =
    Prism.languages.swift),
!(function (b) {
    var c = /[*&][^\s[\]{},]+/,
    d =
        /!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/,
    e =
        "(?:" +
        d.source +
        "(?:[ 	]+" +
        c.source +
        ")?|" +
        c.source +
        "(?:[ 	]+" +
        d.source +
        ")?)";
    function a(b, a) {
    a = (a || "").replace(/m/g, "") + "m";
    var c =
        "([:\\-,[{]\\s*(?:\\s<<prop>>[ 	]+)?)(?:<<value>>)(?=[ 	]*(?:$|,|]|}|\\s*#))"
        .replace(/<<prop>>/g, function () {
            return e;
        })
        .replace(/<<value>>/g, function () {
            return b;
        });
    return RegExp(c, a);
    }
    (b.languages.yaml = {
    scalar: {
        pattern: RegExp(
        "([\\-:]\\s*(?:\\s<<prop>>[ 	]+)?[|>])[ 	]*(?:((?:\r?\n|\r)[ 	]+)[^\r\n]+(?:\\2[^\r\n]+)*)".replace(
            /<<prop>>/g,
            function () {
            return e;
            }
        )
        ),
        lookbehind: !0,
        alias: "string",
    },
    comment: /#.*/,
    key: {
        pattern: RegExp(
        "((?:^|[:\\-,[{\r\n?])[ 	]*(?:<<prop>>[ 	]+)?)[^\r\n{[\\]},#\\s]+?(?=\\s*:\\s)".replace(
            /<<prop>>/g,
            function () {
            return e;
            }
        )
        ),
        lookbehind: !0,
        alias: "atrule",
    },
    directive: {
        pattern: /(^[ \t]*)%.+/m,
        lookbehind: !0,
        alias: "important",
    },
    datetime: {
        pattern: a(
        "\\d{4}-\\d\\d?-\\d\\d?(?:[tT]|[ 	]+)\\d\\d?:\\d{2}:\\d{2}(?:\\.\\d*)?[ 	]*(?:Z|[-+]\\d\\d?(?::\\d{2})?)?|\\d{4}-\\d{2}-\\d{2}|\\d\\d?:\\d{2}(?::\\d{2}(?:\\.\\d*)?)?"
        ),
        lookbehind: !0,
        alias: "number",
    },
    boolean: {
        pattern: a("true|false", "i"),
        lookbehind: !0,
        alias: "important",
    },
    null: { pattern: a("null|~", "i"), lookbehind: !0, alias: "important" },
    string: {
        pattern: a("(\"|')(?:(?!\\2)[^\\\\\r\n]|\\\\.)*\\2"),
        lookbehind: !0,
        greedy: !0,
    },
    number: {
        pattern: a(
        "[+-]?(?:0x[\\da-f]+|0o[0-7]+|(?:\\d+\\.?\\d*|\\.?\\d+)(?:e[+-]?\\d+)?|\\.inf|\\.nan)",
        "i"
        ),
        lookbehind: !0,
    },
    tag: d,
    important: c,
    punctuation: /---|[:[\]{}\-,|>?]|\.\.\./,
    }),
    (b.languages.yml = b.languages.yaml);
})(Prism),
(Prism.languages.tap = {
    fail: /not ok[^#{\n\r]*/,
    pass: /ok[^#{\n\r]*/,
    pragma: /pragma [+-][a-z]+/,
    bailout: /bail out!.*/i,
    version: /TAP version \d+/i,
    plan: /\d+\.\.\d+(?: +#.*)?/,
    subtest: { pattern: /# Subtest(?:: .*)?/, greedy: !0 },
    punctuation: /[{}]/,
    directive: /#.*/,
    yamlish: {
    pattern:
        /(^[^\S\r\n]*)---(?:\r\n?|\n)(?:.*(?:\r\n?|\n))*?[^\S\r\n]*\.\.\.$/m,
    lookbehind: !0,
    inside: Prism.languages.yaml,
    alias: "language-yaml",
    },
}),
(Prism.languages.tcl = {
    comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
    string: { pattern: /"(?:[^"\\\r\n]|\\(?:\r\n|[\s\S]))*"/, greedy: !0 },
    variable: [
    { pattern: /(\$)(?:::)?(?:[a-zA-Z0-9]+::)*\w+/, lookbehind: !0 },
    { pattern: /(\$){[^}]+}/, lookbehind: !0 },
    {
        pattern: /(^\s*set[ \t]+)(?:::)?(?:[a-zA-Z0-9]+::)*\w+/m,
        lookbehind: !0,
    },
    ],
    function: { pattern: /(^\s*proc[ \t]+)[^\s]+/m, lookbehind: !0 },
    builtin: [
    {
        pattern:
        /(^\s*)(?:proc|return|class|error|eval|exit|for|foreach|if|switch|while|break|continue)\b/m,
        lookbehind: !0,
    },
    /\b(?:elseif|else)\b/,
    ],
    scope: {
    pattern: /(^\s*)(?:global|upvar|variable)\b/m,
    lookbehind: !0,
    alias: "constant",
    },
    keyword: {
    pattern:
        /(^\s*|\[)(?:after|append|apply|array|auto_(?:execok|import|load|mkindex|qualify|reset)|automkindex_old|bgerror|binary|catch|cd|chan|clock|close|concat|dde|dict|encoding|eof|exec|expr|fblocked|fconfigure|fcopy|file(?:event|name)?|flush|gets|glob|history|http|incr|info|interp|join|lappend|lassign|lindex|linsert|list|llength|load|lrange|lrepeat|lreplace|lreverse|lsearch|lset|lsort|math(?:func|op)|memory|msgcat|namespace|open|package|parray|pid|pkg_mkIndex|platform|puts|pwd|re_syntax|read|refchan|regexp|registry|regsub|rename|Safe_Base|scan|seek|set|socket|source|split|string|subst|Tcl|tcl(?:_endOfWord|_findLibrary|startOf(?:Next|Previous)Word|wordBreak(?:After|Before)|test|vars)|tell|time|tm|trace|unknown|unload|unset|update|uplevel|vwait)\b/m,
    lookbehind: !0,
    },
    operator:
    /!=?|\*\*?|==|&&?|\|\|?|<[=<]?|>[=>]?|[-+~\/%?^]|\b(?:eq|ne|in|ni)\b/,
    punctuation: /[{}()\[\]]/,
}),
!(function (g) {
    var a = "(?:\\([^|)]+\\)|\\[[^\\]]+\\]|\\{[^}]+\\})+",
    d = {
        css: { pattern: /\{[^}]+\}/, inside: { rest: g.languages.css } },
        "class-id": {
        pattern: /(\()[^)]+(?=\))/,
        lookbehind: !0,
        alias: "attr-value",
        },
        lang: {
        pattern: /(\[)[^\]]+(?=\])/,
        lookbehind: !0,
        alias: "attr-value",
        },
        punctuation: /[\\\/]\d+|\S/,
    },
    h = (g.languages.textile = g.languages.extend("markup", {
        phrase: {
        pattern: /(^|\r|\n)\S[\s\S]*?(?=$|\r?\n\r?\n|\r\r)/,
        lookbehind: !0,
        inside: {
            "block-tag": {
            pattern: RegExp("^[a-z]\\w*(?:" + a + "|[<>=()])*\\."),
            inside: {
                modifier: {
                pattern: RegExp("(^[a-z]\\w*)(?:" + a + "|[<>=()])+(?=\\.)"),
                lookbehind: !0,
                inside: d,
                },
                tag: /^[a-z]\w*/,
                punctuation: /\.$/,
            },
            },
            list: {
            pattern: RegExp("^[*#]+(?:" + a + ")?\\s+.+", "m"),
            inside: {
                modifier: {
                pattern: RegExp("(^[*#]+)" + a),
                lookbehind: !0,
                inside: d,
                },
                punctuation: /^[*#]+/,
            },
            },
            table: {
            pattern: RegExp(
                "^(?:(?:" +
                a +
                "|[<>=()^~])+\\.\\s*)?(?:\\|(?:(?:" +
                a +
                "|[<>=()^~_]|[\\\\/]\\d+)+\\.)?[^|]*)+\\|",
                "m"
            ),
            inside: {
                modifier: {
                pattern: RegExp(
                    "(^|\\|(?:\\r?\\n|\\r)?)(?:" +
                    a +
                    "|[<>=()^~_]|[\\\\/]\\d+)+(?=\\.)"
                ),
                lookbehind: !0,
                inside: d,
                },
                punctuation: /\||^\./,
            },
            },
            inline: {
            pattern: RegExp(
                "(\\*\\*|__|\\?\\?|[*_%@+\\-^~])(?:" + a + ")?.+?\\1"
            ),
            inside: {
                bold: {
                pattern: RegExp("(^(\\*\\*?)(?:" + a + ")?).+?(?=\\2)"),
                lookbehind: !0,
                },
                italic: {
                pattern: RegExp("(^(__?)(?:" + a + ")?).+?(?=\\2)"),
                lookbehind: !0,
                },
                cite: {
                pattern: RegExp("(^\\?\\?(?:" + a + ")?).+?(?=\\?\\?)"),
                lookbehind: !0,
                alias: "string",
                },
                code: {
                pattern: RegExp("(^@(?:" + a + ")?).+?(?=@)"),
                lookbehind: !0,
                alias: "keyword",
                },
                inserted: {
                pattern: RegExp("(^\\+(?:" + a + ")?).+?(?=\\+)"),
                lookbehind: !0,
                },
                deleted: {
                pattern: RegExp("(^-(?:" + a + ")?).+?(?=-)"),
                lookbehind: !0,
                },
                span: {
                pattern: RegExp("(^%(?:" + a + ")?).+?(?=%)"),
                lookbehind: !0,
                },
                modifier: {
                pattern: RegExp("(^\\*\\*|__|\\?\\?|[*_%@+\\-^~])" + a),
                lookbehind: !0,
                inside: d,
                },
                punctuation: /[*_%?@+\-^~]+/,
            },
            },
            "link-ref": {
            pattern: /^\[[^\]]+\]\S+$/m,
            inside: {
                string: { pattern: /(\[)[^\]]+(?=\])/, lookbehind: !0 },
                url: { pattern: /(\])\S+$/, lookbehind: !0 },
                punctuation: /[\[\]]/,
            },
            },
            link: {
            pattern: RegExp('"(?:' + a + ')?[^"]+":.+?(?=[^\\w/]?(?:\\s|$))'),
            inside: {
                text: {
                pattern: RegExp('(^"(?:' + a + ')?)[^"]+(?=")'),
                lookbehind: !0,
                },
                modifier: {
                pattern: RegExp('(^")' + a),
                lookbehind: !0,
                inside: d,
                },
                url: { pattern: /(:).+/, lookbehind: !0 },
                punctuation: /[":]/,
            },
            },
            image: {
            pattern: RegExp(
                "!(?:" +
                a +
                "|[<>=()])*[^!\\s()]+(?:\\([^)]+\\))?!(?::.+?(?=[^\\w/]?(?:\\s|$)))?"
            ),
            inside: {
                source: {
                pattern: RegExp(
                    "(^!(?:" + a + "|[<>=()])*)[^!\\s()]+(?:\\([^)]+\\))?(?=!)"
                ),
                lookbehind: !0,
                alias: "url",
                },
                modifier: {
                pattern: RegExp("(^!)(?:" + a + "|[<>=()])+"),
                lookbehind: !0,
                inside: d,
                },
                url: { pattern: /(:).+/, lookbehind: !0 },
                punctuation: /[!:]/,
            },
            },
            footnote: {
            pattern: /\b\[\d+\]/,
            alias: "comment",
            inside: { punctuation: /\[|\]/ },
            },
            acronym: {
            pattern: /\b[A-Z\d]+\([^)]+\)/,
            inside: {
                comment: { pattern: /(\()[^)]+(?=\))/, lookbehind: !0 },
                punctuation: /[()]/,
            },
            },
            mark: {
            pattern: /\b\((?:TM|R|C)\)/,
            alias: "comment",
            inside: { punctuation: /[()]/ },
            },
        },
        },
    })),
    c = h.phrase.inside,
    b = {
        inline: c.inline,
        link: c.link,
        image: c.image,
        footnote: c.footnote,
        acronym: c.acronym,
        mark: c.mark,
    },
    f,
    e;
    (h.tag.pattern =
    /<\/?(?!\d)[a-z0-9]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i),
    (f = c.inline.inside),
    (f.bold.inside = b),
    (f.italic.inside = b),
    (f.inserted.inside = b),
    (f.deleted.inside = b),
    (f.span.inside = b),
    (e = c.table.inside),
    (e.inline = b.inline),
    (e.link = b.link),
    (e.image = b.image),
    (e.footnote = b.footnote),
    (e.acronym = b.acronym),
    (e.mark = b.mark);
})(Prism),
!(function (b) {
    var a = "(?:[\\w-]+|'[^'\n\r]*'|\"(?:\\.|[^\\\\\"\r\n])*\")";
    Prism.languages.toml = {
    comment: { pattern: /#.*/, greedy: !0 },
    table: {
        pattern: RegExp(
        "(^\\s*\\[\\s*(?:\\[\\s*)?)" +
            a +
            "(?:\\s*\\.\\s*" +
            a +
            ")*(?=\\s*\\])",
        "m"
        ),
        lookbehind: !0,
        greedy: !0,
        alias: "class-name",
    },
    key: {
        pattern: RegExp(
        "(^\\s*|[{,]\\s*)" + a + "(?:\\s*\\.\\s*" + a + ")*(?=\\s*=)",
        "m"
        ),
        lookbehind: !0,
        greedy: !0,
        alias: "property",
    },
    string: {
        pattern:
        /"""(?:\\[\s\S]|[^\\])*?"""|'''[\s\S]*?'''|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*"/,
        greedy: !0,
    },
    date: [
        {
        pattern:
            /\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?/i,
        alias: "number",
        },
        { pattern: /\d{2}:\d{2}:\d{2}(?:\.\d+)?/i, alias: "number" },
    ],
    number:
        /(?:\b0(?:x[\da-zA-Z]+(?:_[\da-zA-Z]+)*|o[0-7]+(?:_[0-7]+)*|b[10]+(?:_[10]+)*))\b|[-+]?\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?\b|[-+]?(?:inf|nan)\b/,
    boolean: /\b(?:true|false)\b/,
    punctuation: /[.,=[\]{}]/,
    };
})(),
!(function (a) {
    (a.languages.tt2 = a.languages.extend("clike", {
    comment: /#.*|\[%#[\s\S]*?%\]/,
    keyword:
        /\b(?:BLOCK|CALL|CASE|CATCH|CLEAR|DEBUG|DEFAULT|ELSE|ELSIF|END|FILTER|FINAL|FOREACH|GET|IF|IN|INCLUDE|INSERT|LAST|MACRO|META|NEXT|PERL|PROCESS|RAWPERL|RETURN|SET|STOP|TAGS|THROW|TRY|SWITCH|UNLESS|USE|WHILE|WRAPPER)\b/,
    punctuation: /[[\]{},()]/,
    })),
    a.languages.insertBefore("tt2", "number", {
        operator: /=[>=]?|!=?|<=?|>=?|&&|\|\|?|\b(?:and|or|not)\b/,
        variable: { pattern: /[a-z]\w*(?:\s*\.\s*(?:\d+|\$?[a-z]\w*))*/i },
    }),
    a.languages.insertBefore("tt2", "keyword", {
        delimiter: { pattern: /^(?:\[%|%%)-?|-?%]$/, alias: "punctuation" },
    }),
    a.languages.insertBefore("tt2", "string", {
        "single-quoted-string": {
        pattern: /'[^\\']*(?:\\[\s\S][^\\']*)*'/,
        greedy: !0,
        alias: "string",
        },
        "double-quoted-string": {
        pattern: /"[^\\"]*(?:\\[\s\S][^\\"]*)*"/,
        greedy: !0,
        alias: "string",
        inside: {
            variable: { pattern: /\$(?:[a-z]\w*(?:\.(?:\d+|\$?[a-z]\w*))*)/i },
        },
        },
    }),
    delete a.languages.tt2.string,
    a.hooks.add("before-tokenize", function (b) {
        a.languages["markup-templating"].buildPlaceholders(
        b,
        "tt2",
        /\[%[\s\S]+?%\]/g
        );
    }),
    a.hooks.add("after-tokenize", function (b) {
        a.languages["markup-templating"].tokenizePlaceholders(b, "tt2");
    });
})(Prism),
(Prism.languages.twig = {
    comment: /\{#[\s\S]*?#\}/,
    tag: {
    pattern: /\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}/,
    inside: {
        ld: {
        pattern: /^(?:\{\{-?|\{%-?\s*\w+)/,
        inside: { punctuation: /^(?:\{\{|\{%)-?/, keyword: /\w+/ },
        },
        rd: { pattern: /-?(?:%\}|\}\})$/, inside: { punctuation: /.+/ } },
        string: {
        pattern: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/,
        inside: { punctuation: /^['"]|['"]$/ },
        },
        keyword: /\b(?:even|if|odd)\b/,
        boolean: /\b(?:true|false|null)\b/,
        number: /\b0x[\dA-Fa-f]+|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][-+]?\d+)?/,
        operator: [
        {
            pattern:
            /(\s)(?:and|b-and|b-xor|b-or|ends with|in|is|matches|not|or|same as|starts with)(?=\s)/,
            lookbehind: !0,
        },
        /[=<>]=?|!=|\*\*?|\/\/?|\?:?|[-+~%|]/,
        ],
        property: /\b[a-zA-Z_]\w*\b/,
        punctuation: /[()\[\]{}:.,]/,
    },
    },
    other: { pattern: /\S(?:[\s\S]*\S)?/, inside: Prism.languages.markup },
}),
(Prism.languages.vala = Prism.languages.extend("clike", {
    "class-name": [
    {
        pattern: /\b[A-Z]\w*(?:\.\w+)*\b(?=(?:\?\s+|\*?\s+\*?)\w+)/,
        inside: { punctuation: /\./ },
    },
    {
        pattern: /(\[)[A-Z]\w*(?:\.\w+)*\b/,
        lookbehind: !0,
        inside: { punctuation: /\./ },
    },
    {
        pattern:
        /(\b(?:class|interface)\s+[A-Z]\w*(?:\.\w+)*\s*:\s*)[A-Z]\w*(?:\.\w+)*\b/,
        lookbehind: !0,
        inside: { punctuation: /\./ },
    },
    {
        pattern:
        /((?:\b(?:class|interface|new|struct|enum)\s+)|(?:catch\s+\())[A-Z]\w*(?:\.\w+)*\b/,
        lookbehind: !0,
        inside: { punctuation: /\./ },
    },
    ],
    constant: /\b[A-Z0-9_]+\b/,
    function: /\w+(?=\s*\()/,
    keyword:
    /\b(?:bool|char|double|float|null|size_t|ssize_t|string|unichar|void|int|int8|int16|int32|int64|long|short|uchar|uint|uint8|uint16|uint32|uint64|ulong|ushort|class|delegate|enum|errordomain|interface|namespace|struct|break|continue|do|for|foreach|return|while|else|if|switch|assert|case|default|abstract|const|dynamic|ensures|extern|inline|internal|override|private|protected|public|requires|signal|static|virtual|volatile|weak|async|owned|unowned|try|catch|finally|throw|as|base|construct|delete|get|in|is|lock|new|out|params|ref|sizeof|set|this|throws|typeof|using|value|var|yield)\b/i,
    number:
    /(?:\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)(?:f|u?l?)?/i,
    operator:
    /\+\+|--|&&|\|\||<<=?|>>=?|=>|->|~|[+\-*\/%&^|=!<>]=?|\?\??|\.\.\./,
    punctuation: /[{}[\];(),.:]/,
})),
Prism.languages.insertBefore("vala", "string", {
    "raw-string": { pattern: /"""[\s\S]*?"""/, greedy: !0, alias: "string" },
    "template-string": {
    pattern: /@"[\s\S]*?"/,
    greedy: !0,
    inside: {
        interpolation: {
        pattern: /\$(?:\([^)]*\)|[a-zA-Z]\w*)/,
        inside: {
            delimiter: { pattern: /^\$\(?|\)$/, alias: "punctuation" },
            rest: Prism.languages.vala,
        },
        },
        string: /[\s\S]+/,
    },
    },
}),
Prism.languages.insertBefore("vala", "keyword", {
    regex: {
    pattern:
        /\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[imsx]{0,4}(?=\s*(?:$|[\r\n,.;})\]]))/,
    greedy: !0,
    },
}),
(Prism.languages.vbnet = Prism.languages.extend("basic", {
    keyword:
    /(?:\b(?:ADDHANDLER|ADDRESSOF|ALIAS|AND|ANDALSO|AS|BEEP|BLOAD|BOOLEAN|BSAVE|BYREF|BYTE|BYVAL|CALL(?: ABSOLUTE)?|CASE|CATCH|CBOOL|CBYTE|CCHAR|CDATE|CDEC|CDBL|CHAIN|CHAR|CHDIR|CINT|CLASS|CLEAR|CLNG|CLOSE|CLS|COBJ|COM|COMMON|CONST|CONTINUE|CSBYTE|CSHORT|CSNG|CSTR|CTYPE|CUINT|CULNG|CUSHORT|DATA|DATE|DECIMAL|DECLARE|DEFAULT|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DELEGATE|DIM|DIRECTCAST|DO|DOUBLE|ELSE|ELSEIF|END|ENUM|ENVIRON|ERASE|ERROR|EVENT|EXIT|FALSE|FIELD|FILES|FINALLY|FOR(?: EACH)?|FRIEND|FUNCTION|GET|GETTYPE|GETXMLNAMESPACE|GLOBAL|GOSUB|GOTO|HANDLES|IF|IMPLEMENTS|IMPORTS|IN|INHERITS|INPUT|INTEGER|INTERFACE|IOCTL|IS|ISNOT|KEY|KILL|LINE INPUT|LET|LIB|LIKE|LOCATE|LOCK|LONG|LOOP|LSET|ME|MKDIR|MOD|MODULE|MUSTINHERIT|MUSTOVERRIDE|MYBASE|MYCLASS|NAME|NAMESPACE|NARROWING|NEW|NEXT|NOT|NOTHING|NOTINHERITABLE|NOTOVERRIDABLE|OBJECT|OF|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPERATOR|OPEN|OPTION(?: BASE)?|OPTIONAL|OR|ORELSE|OUT|OVERLOADS|OVERRIDABLE|OVERRIDES|PARAMARRAY|PARTIAL|POKE|PRIVATE|PROPERTY|PROTECTED|PUBLIC|PUT|RAISEEVENT|READ|READONLY|REDIM|REM|REMOVEHANDLER|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SBYTE|SELECT(?: CASE)?|SET|SHADOWS|SHARED|SHORT|SINGLE|SHELL|SLEEP|STATIC|STEP|STOP|STRING|STRUCTURE|SUB|SYNCLOCK|SWAP|SYSTEM|THEN|THROW|TIMER|TO|TROFF|TRON|TRUE|TRY|TRYCAST|TYPE|TYPEOF|UINTEGER|ULONG|UNLOCK|UNTIL|USHORT|USING|VIEW PRINT|WAIT|WEND|WHEN|WHILE|WIDENING|WITH|WITHEVENTS|WRITE|WRITEONLY|XOR)|\B(?:#CONST|#ELSE|#ELSEIF|#END|#IF))(?:\$|\b)/i,
    comment: [
    { pattern: /(?:!|REM\b).+/i, inside: { keyword: /^REM/i } },
    { pattern: /(^|[^\\:])'.*/, lookbehind: !0 },
    ],
})),
!(function (b) {
    b.languages.velocity = b.languages.extend("markup", {});
    var a = {
    variable: {
        pattern:
        /(^|[^\\](?:\\\\)*)\$!?(?:[a-z][\w-]*(?:\([^)]*\))?(?:\.[a-z][\w-]*(?:\([^)]*\))?|\[[^\]]+])*|{[^}]+})/i,
        lookbehind: !0,
        inside: {},
    },
    string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
    number: /\b\d+\b/,
    boolean: /\b(?:true|false)\b/,
    operator:
        /[=!<>]=?|[+*/%-]|&&|\|\||\.\.|\b(?:eq|g[et]|l[et]|n(?:e|ot))\b/,
    punctuation: /[(){}[\]:,.]/,
    };
    (a.variable.inside = {
    string: a.string,
    function: { pattern: /([^\w-])[a-z][\w-]*(?=\()/, lookbehind: !0 },
    number: a.number,
    boolean: a.boolean,
    punctuation: a.punctuation,
    }),
    b.languages.insertBefore("velocity", "comment", {
        unparsed: {
        pattern: /(^|[^\\])#\[\[[\s\S]*?]]#/,
        lookbehind: !0,
        greedy: !0,
        inside: { punctuation: /^#\[\[|]]#$/ },
        },
        "velocity-comment": [
        {
            pattern: /(^|[^\\])#\*[\s\S]*?\*#/,
            lookbehind: !0,
            greedy: !0,
            alias: "comment",
        },
        {
            pattern: /(^|[^\\])##.*/,
            lookbehind: !0,
            greedy: !0,
            alias: "comment",
        },
        ],
        directive: {
        pattern:
            /(^|[^\\](?:\\\\)*)#@?(?:[a-z][\w-]*|{[a-z][\w-]*})(?:\s*\((?:[^()]|\([^()]*\))*\))?/i,
        lookbehind: !0,
        inside: {
            keyword: {
            pattern: /^#@?(?:[a-z][\w-]*|{[a-z][\w-]*})|\bin\b/,
            inside: { punctuation: /[{}]/ },
            },
            rest: a,
        },
        },
        variable: a.variable,
    }),
    (b.languages.velocity.tag.inside["attr-value"].inside.rest =
        b.languages.velocity);
})(Prism),
(Prism.languages.verilog = {
    comment: /\/\/.*|\/\*[\s\S]*?\*\//,
    string: { pattern: /"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/, greedy: !0 },
    property: /\B\$\w+\b/,
    constant: /\B`\w+\b/,
    function: /\w+(?=\()/,
    keyword:
    /\b(?:alias|and|assert|assign|assume|automatic|before|begin|bind|bins|binsof|bit|break|buf|bufif0|bufif1|byte|class|case|casex|casez|cell|chandle|clocking|cmos|config|const|constraint|context|continue|cover|covergroup|coverpoint|cross|deassign|default|defparam|design|disable|dist|do|edge|else|end|endcase|endclass|endclocking|endconfig|endfunction|endgenerate|endgroup|endinterface|endmodule|endpackage|endprimitive|endprogram|endproperty|endspecify|endsequence|endtable|endtask|enum|event|expect|export|extends|extern|final|first_match|for|force|foreach|forever|fork|forkjoin|function|generate|genvar|highz0|highz1|if|iff|ifnone|ignore_bins|illegal_bins|import|incdir|include|initial|inout|input|inside|instance|int|integer|interface|intersect|join|join_any|join_none|large|liblist|library|local|localparam|logic|longint|macromodule|matches|medium|modport|module|nand|negedge|new|nmos|nor|noshowcancelled|not|notif0|notif1|null|or|output|package|packed|parameter|pmos|posedge|primitive|priority|program|property|protected|pull0|pull1|pulldown|pullup|pulsestyle_onevent|pulsestyle_ondetect|pure|rand|randc|randcase|randsequence|rcmos|real|realtime|ref|reg|release|repeat|return|rnmos|rpmos|rtran|rtranif0|rtranif1|scalared|sequence|shortint|shortreal|showcancelled|signed|small|solve|specify|specparam|static|string|strong0|strong1|struct|super|supply0|supply1|table|tagged|task|this|throughout|time|timeprecision|timeunit|tran|tranif0|tranif1|tri|tri0|tri1|triand|trior|trireg|type|typedef|union|unique|unsigned|use|uwire|var|vectored|virtual|void|wait|wait_order|wand|weak0|weak1|while|wildcard|wire|with|within|wor|xnor|xor)\b/,
    important: /\b(?:always_latch|always_comb|always_ff|always)\b ?@?/,
    number:
    /\B##?\d+|(?:\b\d+)?'[odbh] ?[\da-fzx_?]+|\b\d*[._]?\d+(?:e[-+]?\d+)?/i,
    operator: /[-+{}^~%*\/?=!<>&|]+/,
    punctuation: /[[\];(),.:]/,
}),
(Prism.languages.vhdl = {
    comment: /--.+/,
    "vhdl-vectors": {
    pattern: /\b[oxb]"[\da-f_]+"|"[01uxzwlh-]+"/i,
    alias: "number",
    },
    "quoted-function": { pattern: /"\S+?"(?=\()/, alias: "function" },
    string: /"(?:[^\\"\r\n]|\\(?:\r\n|[\s\S]))*"/,
    constant: /\b(?:use|library)\b/i,
    keyword:
    /\b(?:'active|'ascending|'base|'delayed|'driving|'driving_value|'event|'high|'image|'instance_name|'last_active|'last_event|'last_value|'left|'leftof|'length|'low|'path_name|'pos|'pred|'quiet|'range|'reverse_range|'right|'rightof|'simple_name|'stable|'succ|'transaction|'val|'value|access|after|alias|all|architecture|array|assert|attribute|begin|block|body|buffer|bus|case|component|configuration|constant|disconnect|downto|else|elsif|end|entity|exit|file|for|function|generate|generic|group|guarded|if|impure|in|inertial|inout|is|label|library|linkage|literal|loop|map|new|next|null|of|on|open|others|out|package|port|postponed|procedure|process|pure|range|record|register|reject|report|return|select|severity|shared|signal|subtype|then|to|transport|type|unaffected|units|until|use|variable|wait|when|while|with)\b/i,
    boolean: /\b(?:true|false)\b/i,
    function: /\w+(?=\()/,
    number: /'[01uxzwlh-]'|\b(?:\d+#[\da-f_.]+#|\d[\d_.]*)(?:e[-+]?\d+)?/i,
    operator:
    /[<>]=?|:=|[-+*/&=]|\b(?:abs|not|mod|rem|sll|srl|sla|sra|rol|ror|and|or|nand|xnor|xor|nor)\b/i,
    punctuation: /[{}[\];(),.:]/,
}),
(Prism.languages.vim = {
    string: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\r\n]|'')*'/,
    comment: /".*/,
    function: /\w+(?=\()/,
    keyword:
    /\b(?:ab|abbreviate|abc|abclear|abo|aboveleft|al|all|arga|argadd|argd|argdelete|argdo|arge|argedit|argg|argglobal|argl|arglocal|ar|args|argu|argument|as|ascii|bad|badd|ba|ball|bd|bdelete|be|bel|belowright|bf|bfirst|bl|blast|bm|bmodified|bn|bnext|bN|bNext|bo|botright|bp|bprevious|brea|break|breaka|breakadd|breakd|breakdel|breakl|breaklist|br|brewind|bro|browse|bufdo|b|buffer|buffers|bun|bunload|bw|bwipeout|ca|cabbrev|cabc|cabclear|caddb|caddbuffer|cad|caddexpr|caddf|caddfile|cal|call|cat|catch|cb|cbuffer|cc|ccl|cclose|cd|ce|center|cex|cexpr|cf|cfile|cfir|cfirst|cgetb|cgetbuffer|cgete|cgetexpr|cg|cgetfile|c|change|changes|chd|chdir|che|checkpath|checkt|checktime|cla|clast|cl|clist|clo|close|cmapc|cmapclear|cnew|cnewer|cn|cnext|cN|cNext|cnf|cnfile|cNfcNfile|cnorea|cnoreabbrev|col|colder|colo|colorscheme|comc|comclear|comp|compiler|conf|confirm|con|continue|cope|copen|co|copy|cpf|cpfile|cp|cprevious|cq|cquit|cr|crewind|cuna|cunabbrev|cu|cunmap|cw|cwindow|debugg|debuggreedy|delc|delcommand|d|delete|delf|delfunction|delm|delmarks|diffg|diffget|diffoff|diffpatch|diffpu|diffput|diffsplit|diffthis|diffu|diffupdate|dig|digraphs|di|display|dj|djump|dl|dlist|dr|drop|ds|dsearch|dsp|dsplit|earlier|echoe|echoerr|echom|echomsg|echon|e|edit|el|else|elsei|elseif|em|emenu|endfo|endfor|endf|endfunction|endfun|en|endif|endt|endtry|endw|endwhile|ene|enew|ex|exi|exit|exu|exusage|f|file|files|filetype|fina|finally|fin|find|fini|finish|fir|first|fix|fixdel|fo|fold|foldc|foldclose|folddoc|folddoclosed|foldd|folddoopen|foldo|foldopen|for|fu|fun|function|go|goto|gr|grep|grepa|grepadd|ha|hardcopy|h|help|helpf|helpfind|helpg|helpgrep|helpt|helptags|hid|hide|his|history|ia|iabbrev|iabc|iabclear|if|ij|ijump|il|ilist|imapc|imapclear|in|inorea|inoreabbrev|isearch|isp|isplit|iuna|iunabbrev|iu|iunmap|j|join|ju|jumps|k|keepalt|keepj|keepjumps|kee|keepmarks|laddb|laddbuffer|lad|laddexpr|laddf|laddfile|lan|language|la|last|later|lb|lbuffer|lc|lcd|lch|lchdir|lcl|lclose|let|left|lefta|leftabove|lex|lexpr|lf|lfile|lfir|lfirst|lgetb|lgetbuffer|lgete|lgetexpr|lg|lgetfile|lgr|lgrep|lgrepa|lgrepadd|lh|lhelpgrep|l|list|ll|lla|llast|lli|llist|lmak|lmake|lm|lmap|lmapc|lmapclear|lnew|lnewer|lne|lnext|lN|lNext|lnf|lnfile|lNf|lNfile|ln|lnoremap|lo|loadview|loc|lockmarks|lockv|lockvar|lol|lolder|lop|lopen|lpf|lpfile|lp|lprevious|lr|lrewind|ls|lt|ltag|lu|lunmap|lv|lvimgrep|lvimgrepa|lvimgrepadd|lw|lwindow|mak|make|ma|mark|marks|mat|match|menut|menutranslate|mk|mkexrc|mks|mksession|mksp|mkspell|mkvie|mkview|mkv|mkvimrc|mod|mode|m|move|mzf|mzfile|mz|mzscheme|nbkey|new|n|next|N|Next|nmapc|nmapclear|noh|nohlsearch|norea|noreabbrev|nu|number|nun|nunmap|omapc|omapclear|on|only|o|open|opt|options|ou|ounmap|pc|pclose|ped|pedit|pe|perl|perld|perldo|po|pop|popu|popup|pp|ppop|pre|preserve|prev|previous|p|print|P|Print|profd|profdel|prof|profile|promptf|promptfind|promptr|promptrepl|ps|psearch|pta|ptag|ptf|ptfirst|ptj|ptjump|ptl|ptlast|ptn|ptnext|ptN|ptNext|ptp|ptprevious|ptr|ptrewind|pts|ptselect|pu|put|pw|pwd|pyf|pyfile|py|python|qa|qall|q|quit|quita|quitall|r|read|rec|recover|redi|redir|red|redo|redr|redraw|redraws|redrawstatus|reg|registers|res|resize|ret|retab|retu|return|rew|rewind|ri|right|rightb|rightbelow|rub|ruby|rubyd|rubydo|rubyf|rubyfile|ru|runtime|rv|rviminfo|sal|sall|san|sandbox|sa|sargument|sav|saveas|sba|sball|sbf|sbfirst|sbl|sblast|sbm|sbmodified|sbn|sbnext|sbN|sbNext|sbp|sbprevious|sbr|sbrewind|sb|sbuffer|scripte|scriptencoding|scrip|scriptnames|se|set|setf|setfiletype|setg|setglobal|setl|setlocal|sf|sfind|sfir|sfirst|sh|shell|sign|sil|silent|sim|simalt|sla|slast|sl|sleep|sm|smagic|sm|smap|smapc|smapclear|sme|smenu|sn|snext|sN|sNext|sni|sniff|sno|snomagic|snor|snoremap|snoreme|snoremenu|sor|sort|so|source|spelld|spelldump|spe|spellgood|spelli|spellinfo|spellr|spellrepall|spellu|spellundo|spellw|spellwrong|sp|split|spr|sprevious|sre|srewind|sta|stag|startg|startgreplace|star|startinsert|startr|startreplace|stj|stjump|st|stop|stopi|stopinsert|sts|stselect|sun|sunhide|sunm|sunmap|sus|suspend|sv|sview|syncbind|t|tab|tabc|tabclose|tabd|tabdo|tabe|tabedit|tabf|tabfind|tabfir|tabfirst|tabl|tablast|tabm|tabmove|tabnew|tabn|tabnext|tabN|tabNext|tabo|tabonly|tabp|tabprevious|tabr|tabrewind|tabs|ta|tag|tags|tc|tcl|tcld|tcldo|tclf|tclfile|te|tearoff|tf|tfirst|th|throw|tj|tjump|tl|tlast|tm|tm|tmenu|tn|tnext|tN|tNext|to|topleft|tp|tprevious|tr|trewind|try|ts|tselect|tu|tu|tunmenu|una|unabbreviate|u|undo|undoj|undojoin|undol|undolist|unh|unhide|unlet|unlo|unlockvar|unm|unmap|up|update|verb|verbose|ve|version|vert|vertical|vie|view|vim|vimgrep|vimgrepa|vimgrepadd|vi|visual|viu|viusage|vmapc|vmapclear|vne|vnew|vs|vsplit|vu|vunmap|wa|wall|wh|while|winc|wincmd|windo|winp|winpos|win|winsize|wn|wnext|wN|wNext|wp|wprevious|wq|wqa|wqall|w|write|ws|wsverb|wv|wviminfo|X|xa|xall|x|xit|xm|xmap|xmapc|xmapclear|xme|xmenu|XMLent|XMLns|xn|xnoremap|xnoreme|xnoremenu|xu|xunmap|y|yank)\b/,
    builtin:
    /\b(?:autocmd|acd|ai|akm|aleph|allowrevins|altkeymap|ambiwidth|ambw|anti|antialias|arab|arabic|arabicshape|ari|arshape|autochdir|autoindent|autoread|autowrite|autowriteall|aw|awa|background|backspace|backup|backupcopy|backupdir|backupext|backupskip|balloondelay|ballooneval|balloonexpr|bdir|bdlay|beval|bex|bexpr|bg|bh|bin|binary|biosk|bioskey|bk|bkc|bomb|breakat|brk|browsedir|bs|bsdir|bsk|bt|bufhidden|buflisted|buftype|casemap|ccv|cdpath|cedit|cfu|ch|charconvert|ci|cin|cindent|cink|cinkeys|cino|cinoptions|cinw|cinwords|clipboard|cmdheight|cmdwinheight|cmp|cms|columns|com|comments|commentstring|compatible|complete|completefunc|completeopt|consk|conskey|copyindent|cot|cpo|cpoptions|cpt|cscopepathcomp|cscopeprg|cscopequickfix|cscopetag|cscopetagorder|cscopeverbose|cspc|csprg|csqf|cst|csto|csverb|cuc|cul|cursorcolumn|cursorline|cwh|debug|deco|def|define|delcombine|dex|dg|dict|dictionary|diff|diffexpr|diffopt|digraph|dip|dir|directory|dy|ea|ead|eadirection|eb|ed|edcompatible|ef|efm|ei|ek|enc|encoding|endofline|eol|ep|equalalways|equalprg|errorbells|errorfile|errorformat|esckeys|et|eventignore|expandtab|exrc|fcl|fcs|fdc|fde|fdi|fdl|fdls|fdm|fdn|fdo|fdt|fen|fenc|fencs|fex|ff|ffs|fileencoding|fileencodings|fileformat|fileformats|fillchars|fk|fkmap|flp|fml|fmr|foldcolumn|foldenable|foldexpr|foldignore|foldlevel|foldlevelstart|foldmarker|foldmethod|foldminlines|foldnestmax|foldtext|formatexpr|formatlistpat|formatoptions|formatprg|fp|fs|fsync|ft|gcr|gd|gdefault|gfm|gfn|gfs|gfw|ghr|gp|grepformat|grepprg|gtl|gtt|guicursor|guifont|guifontset|guifontwide|guiheadroom|guioptions|guipty|guitablabel|guitabtooltip|helpfile|helpheight|helplang|hf|hh|hi|hidden|highlight|hk|hkmap|hkmapp|hkp|hl|hlg|hls|hlsearch|ic|icon|iconstring|ignorecase|im|imactivatekey|imak|imc|imcmdline|imd|imdisable|imi|iminsert|ims|imsearch|inc|include|includeexpr|incsearch|inde|indentexpr|indentkeys|indk|inex|inf|infercase|insertmode|isf|isfname|isi|isident|isk|iskeyword|isprint|joinspaces|js|key|keymap|keymodel|keywordprg|km|kmp|kp|langmap|langmenu|laststatus|lazyredraw|lbr|lcs|linebreak|lines|linespace|lisp|lispwords|listchars|loadplugins|lpl|lsp|lz|macatsui|magic|makeef|makeprg|matchpairs|matchtime|maxcombine|maxfuncdepth|maxmapdepth|maxmem|maxmempattern|maxmemtot|mco|mef|menuitems|mfd|mh|mis|mkspellmem|ml|mls|mm|mmd|mmp|mmt|modeline|modelines|modifiable|modified|more|mouse|mousef|mousefocus|mousehide|mousem|mousemodel|mouses|mouseshape|mouset|mousetime|mp|mps|msm|mzq|mzquantum|nf|nrformats|numberwidth|nuw|odev|oft|ofu|omnifunc|opendevice|operatorfunc|opfunc|osfiletype|pa|para|paragraphs|paste|pastetoggle|patchexpr|patchmode|path|pdev|penc|pex|pexpr|pfn|ph|pheader|pi|pm|pmbcs|pmbfn|popt|preserveindent|previewheight|previewwindow|printdevice|printencoding|printexpr|printfont|printheader|printmbcharset|printmbfont|printoptions|prompt|pt|pumheight|pvh|pvw|qe|quoteescape|readonly|remap|report|restorescreen|revins|rightleft|rightleftcmd|rl|rlc|ro|rs|rtp|ruf|ruler|rulerformat|runtimepath|sbo|sc|scb|scr|scroll|scrollbind|scrolljump|scrolloff|scrollopt|scs|sect|sections|secure|sel|selection|selectmode|sessionoptions|sft|shcf|shellcmdflag|shellpipe|shellquote|shellredir|shellslash|shelltemp|shelltype|shellxquote|shiftround|shiftwidth|shm|shortmess|shortname|showbreak|showcmd|showfulltag|showmatch|showmode|showtabline|shq|si|sidescroll|sidescrolloff|siso|sj|slm|smartcase|smartindent|smarttab|smc|smd|softtabstop|sol|spc|spell|spellcapcheck|spellfile|spelllang|spellsuggest|spf|spl|splitbelow|splitright|sps|sr|srr|ss|ssl|ssop|stal|startofline|statusline|stl|stmp|su|sua|suffixes|suffixesadd|sw|swapfile|swapsync|swb|swf|switchbuf|sws|sxq|syn|synmaxcol|syntax|tabline|tabpagemax|tabstop|tagbsearch|taglength|tagrelative|tagstack|tal|tb|tbi|tbidi|tbis|tbs|tenc|term|termbidi|termencoding|terse|textauto|textmode|textwidth|tgst|thesaurus|tildeop|timeout|timeoutlen|title|titlelen|titleold|titlestring|toolbar|toolbariconsize|top|tpm|tsl|tsr|ttimeout|ttimeoutlen|ttm|tty|ttybuiltin|ttyfast|ttym|ttymouse|ttyscroll|ttytype|tw|tx|uc|ul|undolevels|updatecount|updatetime|ut|vb|vbs|vdir|verbosefile|vfile|viewdir|viewoptions|viminfo|virtualedit|visualbell|vop|wak|warn|wb|wc|wcm|wd|weirdinvert|wfh|wfw|whichwrap|wi|wig|wildchar|wildcharm|wildignore|wildmenu|wildmode|wildoptions|wim|winaltkeys|window|winfixheight|winfixwidth|winheight|winminheight|winminwidth|winwidth|wiv|wiw|wm|wmh|wmnu|wmw|wop|wrap|wrapmargin|wrapscan|writeany|writebackup|writedelay|ww|noacd|noai|noakm|noallowrevins|noaltkeymap|noanti|noantialias|noar|noarab|noarabic|noarabicshape|noari|noarshape|noautochdir|noautoindent|noautoread|noautowrite|noautowriteall|noaw|noawa|nobackup|noballooneval|nobeval|nobin|nobinary|nobiosk|nobioskey|nobk|nobl|nobomb|nobuflisted|nocf|noci|nocin|nocindent|nocompatible|noconfirm|noconsk|noconskey|nocopyindent|nocp|nocscopetag|nocscopeverbose|nocst|nocsverb|nocuc|nocul|nocursorcolumn|nocursorline|nodeco|nodelcombine|nodg|nodiff|nodigraph|nodisable|noea|noeb|noed|noedcompatible|noek|noendofline|noeol|noequalalways|noerrorbells|noesckeys|noet|noex|noexpandtab|noexrc|nofen|nofk|nofkmap|nofoldenable|nogd|nogdefault|noguipty|nohid|nohidden|nohk|nohkmap|nohkmapp|nohkp|nohls|noic|noicon|noignorecase|noim|noimc|noimcmdline|noimd|noincsearch|noinf|noinfercase|noinsertmode|nois|nojoinspaces|nojs|nolazyredraw|nolbr|nolinebreak|nolisp|nolist|noloadplugins|nolpl|nolz|noma|nomacatsui|nomagic|nomh|noml|nomod|nomodeline|nomodifiable|nomodified|nomore|nomousef|nomousefocus|nomousehide|nonu|nonumber|noodev|noopendevice|nopaste|nopi|nopreserveindent|nopreviewwindow|noprompt|nopvw|noreadonly|noremap|norestorescreen|norevins|nori|norightleft|norightleftcmd|norl|norlc|noro|nors|noru|noruler|nosb|nosc|noscb|noscrollbind|noscs|nosecure|nosft|noshellslash|noshelltemp|noshiftround|noshortname|noshowcmd|noshowfulltag|noshowmatch|noshowmode|nosi|nosm|nosmartcase|nosmartindent|nosmarttab|nosmd|nosn|nosol|nospell|nosplitbelow|nosplitright|nospr|nosr|nossl|nosta|nostartofline|nostmp|noswapfile|noswf|nota|notagbsearch|notagrelative|notagstack|notbi|notbidi|notbs|notermbidi|noterse|notextauto|notextmode|notf|notgst|notildeop|notimeout|notitle|noto|notop|notr|nottimeout|nottybuiltin|nottyfast|notx|novb|novisualbell|nowa|nowarn|nowb|noweirdinvert|nowfh|nowfw|nowildmenu|nowinfixheight|nowinfixwidth|nowiv|nowmnu|nowrap|nowrapscan|nowrite|nowriteany|nowritebackup|nows|invacd|invai|invakm|invallowrevins|invaltkeymap|invanti|invantialias|invar|invarab|invarabic|invarabicshape|invari|invarshape|invautochdir|invautoindent|invautoread|invautowrite|invautowriteall|invaw|invawa|invbackup|invballooneval|invbeval|invbin|invbinary|invbiosk|invbioskey|invbk|invbl|invbomb|invbuflisted|invcf|invci|invcin|invcindent|invcompatible|invconfirm|invconsk|invconskey|invcopyindent|invcp|invcscopetag|invcscopeverbose|invcst|invcsverb|invcuc|invcul|invcursorcolumn|invcursorline|invdeco|invdelcombine|invdg|invdiff|invdigraph|invdisable|invea|inveb|inved|invedcompatible|invek|invendofline|inveol|invequalalways|inverrorbells|invesckeys|invet|invex|invexpandtab|invexrc|invfen|invfk|invfkmap|invfoldenable|invgd|invgdefault|invguipty|invhid|invhidden|invhk|invhkmap|invhkmapp|invhkp|invhls|invhlsearch|invic|invicon|invignorecase|invim|invimc|invimcmdline|invimd|invincsearch|invinf|invinfercase|invinsertmode|invis|invjoinspaces|invjs|invlazyredraw|invlbr|invlinebreak|invlisp|invlist|invloadplugins|invlpl|invlz|invma|invmacatsui|invmagic|invmh|invml|invmod|invmodeline|invmodifiable|invmodified|invmore|invmousef|invmousefocus|invmousehide|invnu|invnumber|invodev|invopendevice|invpaste|invpi|invpreserveindent|invpreviewwindow|invprompt|invpvw|invreadonly|invremap|invrestorescreen|invrevins|invri|invrightleft|invrightleftcmd|invrl|invrlc|invro|invrs|invru|invruler|invsb|invsc|invscb|invscrollbind|invscs|invsecure|invsft|invshellslash|invshelltemp|invshiftround|invshortname|invshowcmd|invshowfulltag|invshowmatch|invshowmode|invsi|invsm|invsmartcase|invsmartindent|invsmarttab|invsmd|invsn|invsol|invspell|invsplitbelow|invsplitright|invspr|invsr|invssl|invsta|invstartofline|invstmp|invswapfile|invswf|invta|invtagbsearch|invtagrelative|invtagstack|invtbi|invtbidi|invtbs|invtermbidi|invterse|invtextauto|invtextmode|invtf|invtgst|invtildeop|invtimeout|invtitle|invto|invtop|invtr|invttimeout|invttybuiltin|invttyfast|invtx|invvb|invvisualbell|invwa|invwarn|invwb|invweirdinvert|invwfh|invwfw|invwildmenu|invwinfixheight|invwinfixwidth|invwiv|invwmnu|invwrap|invwrapscan|invwrite|invwriteany|invwritebackup|invws|t_AB|t_AF|t_al|t_AL|t_bc|t_cd|t_ce|t_Ce|t_cl|t_cm|t_Co|t_cs|t_Cs|t_CS|t_CV|t_da|t_db|t_dl|t_DL|t_EI|t_F1|t_F2|t_F3|t_F4|t_F5|t_F6|t_F7|t_F8|t_F9|t_fs|t_IE|t_IS|t_k1|t_K1|t_k2|t_k3|t_K3|t_k4|t_K4|t_k5|t_K5|t_k6|t_K6|t_k7|t_K7|t_k8|t_K8|t_k9|t_K9|t_KA|t_kb|t_kB|t_KB|t_KC|t_kd|t_kD|t_KD|t_ke|t_KE|t_KF|t_KG|t_kh|t_KH|t_kI|t_KI|t_KJ|t_KK|t_kl|t_KL|t_kN|t_kP|t_kr|t_ks|t_ku|t_le|t_mb|t_md|t_me|t_mr|t_ms|t_nd|t_op|t_RI|t_RV|t_Sb|t_se|t_Sf|t_SI|t_so|t_sr|t_te|t_ti|t_ts|t_ue|t_us|t_ut|t_vb|t_ve|t_vi|t_vs|t_WP|t_WS|t_xs|t_ZH|t_ZR)\b/,
    number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i,
    operator:
    /\|\||&&|[-+.]=?|[=!](?:[=~][#?]?)?|[<>]=?[#?]?|[*\/%?]|\b(?:is(?:not)?)\b/,
    punctuation: /[{}[\](),;:]/,
}),
(Prism.languages["visual-basic"] = {
    comment: {
    pattern: /(?:['‘’]|REM\b)(?:[^\r\n_]|_(?:\r\n?|\n)?)*/i,
    inside: { keyword: /^REM/i },
    },
    directive: {
    pattern:
        /#(?:Const|Else|ElseIf|End|ExternalChecksum|ExternalSource|If|Region)(?:[^\S\r\n]_[^\S\r\n]*(?:\r\n?|\n)|.)+/i,
    alias: "comment",
    greedy: !0,
    },
    string: { pattern: /\$?["“”](?:["“”]{2}|[^"“”])*["“”]C?/i, greedy: !0 },
    date: {
    pattern:
        /#[^\S\r\n]*(?:\d+([/-])\d+\1\d+(?:[^\S\r\n]+(?:\d+[^\S\r\n]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[^\S\r\n]*(?:AM|PM))?))?|(?:\d+[^\S\r\n]*(?:AM|PM)|\d+:\d+(?::\d+)?(?:[^\S\r\n]*(?:AM|PM))?))[^\S\r\n]*#/i,
    alias: "builtin",
    },
    number:
    /(?:(?:\b\d+(?:\.\d+)?|\.\d+)(?:E[+-]?\d+)?|&[HO][\dA-F]+)(?:U?[ILS]|[FRD])?/i,
    boolean: /\b(?:True|False|Nothing)\b/i,
    keyword:
    /\b(?:AddHandler|AddressOf|Alias|And(?:Also)?|As|Boolean|ByRef|Byte|ByVal|Call|Case|Catch|C(?:Bool|Byte|Char|Date|Dbl|Dec|Int|Lng|Obj|SByte|Short|Sng|Str|Type|UInt|ULng|UShort)|Char|Class|Const|Continue|Date|Decimal|Declare|Default|Delegate|Dim|DirectCast|Do|Double|Each|Else(?:If)?|End(?:If)?|Enum|Erase|Error|Event|Exit|Finally|For|Friend|Function|Get(?:Type|XMLNamespace)?|Global|GoSub|GoTo|Handles|If|Implements|Imports|In|Inherits|Integer|Interface|Is|IsNot|Let|Lib|Like|Long|Loop|Me|Mod|Module|Must(?:Inherit|Override)|My(?:Base|Class)|Namespace|Narrowing|New|Next|Not(?:Inheritable|Overridable)?|Object|Of|On|Operator|Option(?:al)?|Or(?:Else)?|Out|Overloads|Overridable|Overrides|ParamArray|Partial|Private|Property|Protected|Public|RaiseEvent|ReadOnly|ReDim|RemoveHandler|Resume|Return|SByte|Select|Set|Shadows|Shared|short|Single|Static|Step|Stop|String|Structure|Sub|SyncLock|Then|Throw|To|Try|TryCast|TypeOf|U(?:Integer|Long|Short)|Using|Variant|Wend|When|While|Widening|With(?:Events)?|WriteOnly|Xor)\b/i,
    operator: [
    /[+\-*/\\^<=>&#@$%!]/,
    { pattern: /([^\S\r\n])_(?=[^\S\r\n]*[\r\n])/, lookbehind: !0 },
    ],
    punctuation: /[{}().,:?]/,
}),
(Prism.languages.vb = Prism.languages["visual-basic"]),
(Prism.languages.wasm = {
    comment: [/\(;[\s\S]*?;\)/, { pattern: /;;.*/, greedy: !0 }],
    string: { pattern: /"(?:\\[\s\S]|[^"\\])*"/, greedy: !0 },
    keyword: [
    { pattern: /\b(?:align|offset)=/, inside: { operator: /=/ } },
    {
        pattern:
        /\b(?:(?:f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))?|memory\.(?:grow|size))\b/,
        inside: { punctuation: /\./ },
    },
    /\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end|export|func|get_(?:global|local)|global|if|import|local|loop|memory|module|mut|nop|offset|param|result|return|select|set_(?:global|local)|start|table|tee_local|then|type|unreachable)\b/,
    ],
    variable: /\$[\w!#$%&'*+\-./:<=>?@\\^_`|~]+/i,
    number:
    /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/,
    punctuation: /[()]/,
}),
(Prism.languages.wiki = Prism.languages.extend("markup", {
    "block-comment": {
    pattern: /(^|[^\\])\/\*[\s\S]*?\*\//,
    lookbehind: !0,
    alias: "comment",
    },
    heading: {
    pattern: /^(=+).+?\1/m,
    inside: { punctuation: /^=+|=+$/, important: /.+/ },
    },
    emphasis: {
    pattern: /('{2,5}).+?\1/,
    inside: {
        "bold-italic": {
        pattern: /(''''').+?(?=\1)/,
        lookbehind: !0,
        alias: ["bold", "italic"],
        },
        bold: { pattern: /(''')[^'](?:.*?[^'])?(?=\1)/, lookbehind: !0 },
        italic: { pattern: /('')[^'](?:.*?[^'])?(?=\1)/, lookbehind: !0 },
        punctuation: /^''+|''+$/,
    },
    },
    hr: { pattern: /^-{4,}/m, alias: "punctuation" },
    url: [
    /ISBN +(?:97[89][ -]?)?(?:\d[ -]?){9}[\dx]\b|(?:RFC|PMID) +\d+/i,
    /\[\[.+?\]\]|\[.+?\]/,
    ],
    variable: [/__[A-Z]+__/, /\{{3}.+?\}{3}/, /\{\{.+?\}\}/],
    symbol: [/^#redirect/im, /~{3,5}/],
    "table-tag": {
    pattern: /((?:^|[|!])[|!])[^|\r\n]+\|(?!\|)/m,
    lookbehind: !0,
    inside: {
        "table-bar": { pattern: /\|$/, alias: "punctuation" },
        rest: Prism.languages.markup.tag.inside,
    },
    },
    punctuation: /^(?:\{\||\|\}|\|-|[*#:;!|])|\|\||!!/m,
})),
Prism.languages.insertBefore("wiki", "tag", {
    nowiki: {
    pattern: /<(nowiki|pre|source)\b[\s\S]*?>[\s\S]*?<\/\1>/i,
    inside: {
        tag: {
        pattern:
            /<(?:nowiki|pre|source)\b[\s\S]*?>|<\/(?:nowiki|pre|source)>/i,
        inside: Prism.languages.markup.tag.inside,
        },
    },
    },
}),
!(function (a) {
    (a.languages.xeora = a.languages.extend("markup", {
    constant: {
        pattern: /\$(?:DomainContents|PageRenderDuration)\$/,
        inside: { punctuation: { pattern: /\$/ } },
    },
    variable: {
        pattern: /\$@?(?:#+|[-+*~=^])?[\w.]+\$/,
        inside: {
        punctuation: { pattern: /[$.]/ },
        operator: { pattern: /#+|[-+*~=^@]/ },
        },
    },
    "function-inline": {
        pattern:
        /\$F:[-\w.]+\?[-\w.]+(?:,(?:\|?(?:[-#.^+*~]*(?:[\w+][^$]*)|=(?:[\S+][^$]*)|@[-#]*(?:\w+.)[\w+.]+)?)*)?\$/,
        inside: {
        variable: {
            pattern: /(?:[,|])@?(?:#+|[-+*~=^])?[\w.]+/,
            inside: {
            punctuation: { pattern: /[,.|]/ },
            operator: { pattern: /#+|[-+*~=^@]/ },
            },
        },
        punctuation: { pattern: /\$\w:|[$:?.,|]/ },
        },
        alias: "function",
    },
    "function-block": {
        pattern:
        /\$XF:{[-\w.]+\?[-\w.]+(?:,(?:\|?(?:[-#.^+*~]*(?:[\w+][^$]*)|=(?:[\S+][^$]*)|@[-#]*(?:\w+.)[\w+.]+)?)*)?}:XF\$/,
        inside: { punctuation: { pattern: /[$:{}?.,|]/ } },
        alias: "function",
    },
    "directive-inline": {
        pattern: /\$\w(?:#\d+\+?)?(?:\[[-\w.]+])?:[-\/\w.]+\$/,
        inside: {
        punctuation: {
            pattern: /\$(?:\w:|C(?:\[|#\d))?|[:{[\]]/,
            inside: { tag: { pattern: /#\d/ } },
        },
        },
        alias: "function",
    },
    "directive-block-open": {
        pattern:
        /\$\w+:{|\$\w(?:#\d+\+?)?(?:\[[-\w.]+])?:[-\w.]+:{(?:![A-Z]+)?/,
        inside: {
        punctuation: {
            pattern: /\$(?:\w:|C(?:\[|#\d))?|[:{[\]]/,
            inside: { tag: { pattern: /#\d/ } },
        },
        attribute: {
            pattern: /![A-Z]+$/,
            inside: { punctuation: { pattern: /!/ } },
            alias: "keyword",
        },
        },
        alias: "function",
    },
    "directive-block-separator": {
        pattern: /}:[-\w.]+:{/,
        inside: { punctuation: { pattern: /[:{}]/ } },
        alias: "function",
    },
    "directive-block-close": {
        pattern: /}:[-\w.]+\$/,
        inside: { punctuation: { pattern: /[:{}$]/ } },
        alias: "function",
    },
    })),
    a.languages.insertBefore(
        "inside",
        "punctuation",
        { variable: a.languages.xeora["function-inline"].inside.variable },
        a.languages.xeora["function-block"]
    ),
    (a.languages.xeoracube = a.languages.xeora);
})(Prism),
(Prism.languages.xojo = {
    comment: { pattern: /(?:'|\/\/|Rem\b).+/i, inside: { keyword: /^Rem/i } },
    string: { pattern: /"(?:""|[^"])*"/, greedy: !0 },
    number: [/(?:\b\d+\.?\d*|\B\.\d+)(?:E[+-]?\d+)?/i, /&[bchou][a-z\d]+/i],
    symbol: /#(?:If|Else|ElseIf|Endif|Pragma)\b/i,
    keyword:
    /\b(?:AddHandler|App|Array|As(?:signs)?|By(?:Ref|Val)|Break|Call|Case|Catch|Const|Continue|CurrentMethodName|Declare|Dim|Do(?:wnTo)?|Each|Else(?:If)?|End|Exit|Extends|False|Finally|For|Global|If|In|Lib|Loop|Me|Next|Nil|Optional|ParamArray|Raise(?:Event)?|ReDim|Rem|RemoveHandler|Return|Select|Self|Soft|Static|Step|Super|Then|To|True|Try|Ubound|Until|Using|Wend|While)\b/i,
    operator:
    /<[=>]?|>=?|[+\-*\/\\^=]|\b(?:AddressOf|And|Ctype|IsA?|Mod|New|Not|Or|Xor|WeakAddressOf)\b/i,
    punctuation: /[.,;:()]/,
}),
!(function (a) {
    (a.languages.xquery = a.languages.extend("markup", {
    "xquery-comment": {
        pattern: /\(:[\s\S]*?:\)/,
        greedy: !0,
        alias: "comment",
    },
    string: { pattern: /(["'])(?:\1\1|(?!\1)[\s\S])*\1/, greedy: !0 },
    extension: { pattern: /\(#.+?#\)/, alias: "symbol" },
    variable: /\$[\w-:]+/,
    axis: {
        pattern:
        /(^|[^-])(?:ancestor(?:-or-self)?|attribute|child|descendant(?:-or-self)?|following(?:-sibling)?|parent|preceding(?:-sibling)?|self)(?=::)/,
        lookbehind: !0,
        alias: "operator",
    },
    "keyword-operator": {
        pattern:
        /(^|[^:-])\b(?:and|castable as|div|eq|except|ge|gt|idiv|instance of|intersect|is|le|lt|mod|ne|or|union)\b(?=$|[^:-])/,
        lookbehind: !0,
        alias: "operator",
    },
    keyword: {
        pattern:
        /(^|[^:-])\b(?:as|ascending|at|base-uri|boundary-space|case|cast as|collation|construction|copy-namespaces|declare|default|descending|else|empty (?:greatest|least)|encoding|every|external|for|function|if|import|in|inherit|lax|let|map|module|namespace|no-inherit|no-preserve|option|order(?: by|ed|ing)?|preserve|return|satisfies|schema|some|stable|strict|strip|then|to|treat as|typeswitch|unordered|validate|variable|version|where|xquery)\b(?=$|[^:-])/,
        lookbehind: !0,
    },
    function: /[\w-]+(?::[\w-]+)*(?=\s*\()/,
    "xquery-element": {
        pattern: /(element\s+)[\w-]+(?::[\w-]+)*/,
        lookbehind: !0,
        alias: "tag",
    },
    "xquery-attribute": {
        pattern: /(attribute\s+)[\w-]+(?::[\w-]+)*/,
        lookbehind: !0,
        alias: "attr-name",
    },
    builtin: {
        pattern:
        /(^|[^:-])\b(?:attribute|comment|document|element|processing-instruction|text|xs:(?:anyAtomicType|anyType|anyURI|base64Binary|boolean|byte|date|dateTime|dayTimeDuration|decimal|double|duration|ENTITIES|ENTITY|float|gDay|gMonth|gMonthDay|gYear|gYearMonth|hexBinary|ID|IDREFS?|int|integer|language|long|Name|NCName|negativeInteger|NMTOKENS?|nonNegativeInteger|nonPositiveInteger|normalizedString|NOTATION|positiveInteger|QName|short|string|time|token|unsigned(?:Byte|Int|Long|Short)|untyped(?:Atomic)?|yearMonthDuration))\b(?=$|[^:-])/,
        lookbehind: !0,
    },
    number: /\b\d+(?:\.\d+)?(?:E[+-]?\d+)?/,
    operator: [
        /[+*=?|@]|\.\.?|:=|!=|<[=<]?|>[=>]?/,
        { pattern: /(\s)-(?=\s)/, lookbehind: !0 },
    ],
    punctuation: /[[\](){},;:/]/,
    })),
    (a.languages.xquery.tag.pattern =
        /<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|{(?!{)(?:{(?:{[^}]*}|[^}])*}|[^}])+}|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i),
    (a.languages.xquery.tag.inside["attr-value"].pattern =
        /=(?:("|')(?:\\[\s\S]|{(?!{)(?:{(?:{[^}]*}|[^}])*}|[^}])+}|(?!\1)[^\\])*\1|[^\s'">=]+)/i),
    (a.languages.xquery.tag.inside["attr-value"].inside.punctuation =
        /^="|"$/),
    (a.languages.xquery.tag.inside["attr-value"].inside.expression = {
        pattern: /{(?!{)(?:{(?:{[^}]*}|[^}])*}|[^}])+}/,
        inside: a.languages.xquery,
        alias: "language-xquery",
    });
    var b = function (a) {
        return "string" == typeof a
        ? a
        : "string" == typeof a.content
        ? a.content
        : a.content.map(b).join("");
    },
    c = function (e) {
        for (var g = [], d = 0, f, i, h; d < e.length; d++)
        (f = e[d]),
            (i = !1),
            ("string" != typeof f &&
            ("tag" === f.type && f.content[0] && "tag" === f.content[0].type
                ? "</" === f.content[0].content[0].content
                ? 0 < g.length &&
                    g[g.length - 1].tagName === b(f.content[0].content[1]) &&
                    g.pop()
                : "/>" === f.content[f.content.length - 1].content ||
                    g.push({
                    tagName: b(f.content[0].content[1]),
                    openedBraces: 0,
                    })
                : !(
                    0 < g.length &&
                    "punctuation" === f.type &&
                    "{" === f.content
                ) ||
                (e[d + 1] &&
                    "punctuation" === e[d + 1].type &&
                    "{" === e[d + 1].content) ||
                (e[d - 1] &&
                    "plain-text" === e[d - 1].type &&
                    "{" === e[d - 1].content)
                ? 0 < g.length &&
                0 < g[g.length - 1].openedBraces &&
                "punctuation" === f.type &&
                "}" === f.content
                ? g[g.length - 1].openedBraces--
                : "comment" !== f.type && (i = !0)
                : g[g.length - 1].openedBraces++),
            (i || "string" == typeof f) &&
            0 < g.length &&
            0 === g[g.length - 1].openedBraces) &&
            ((h = b(f)),
            d < e.length - 1 &&
                ("string" == typeof e[d + 1] ||
                "plain-text" === e[d + 1].type) &&
                ((h += b(e[d + 1])), e.splice(d + 1, 1)),
            0 < d &&
                ("string" == typeof e[d - 1] ||
                "plain-text" === e[d - 1].type) &&
                ((h = b(e[d - 1]) + h), e.splice(d - 1, 1), d--),
            /^\s+$/.test(h)
                ? (e[d] = h)
                : (e[d] = new a.Token("plain-text", h, null, h))),
            f.content && "string" != typeof f.content && c(f.content);
    };
    a.hooks.add("after-tokenize", function (a) {
    "xquery" === a.language && c(a.tokens);
    });
})(Prism);
const theme = window.localStorage && window.localStorage.getItem("theme"),
themeToggle = document.querySelector(".theme-toggle"),
isDark = theme === "dark";
(metaThemeColor = document.querySelector("meta[name=theme-color]")),
theme !== null &&
    (document.body.classList.toggle("dark-theme", isDark),
    isDark
    ? metaThemeColor.setAttribute("content", "#252627")
    : metaThemeColor.setAttribute("content", "#fafafa")),
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme"),
    window.localStorage &&
        window.localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-theme") ? "dark" : "light"
        ),
    document.body.classList.contains("dark-theme")
        ? metaThemeColor.setAttribute("content", "#252627")
        : metaThemeColor.setAttribute("content", "#fafafa");
});
