/**
LAZYLOAD.js
*/

/**
Copyright (c) 2011 Ryan Grove <ryan@wonko.com>
All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.*/

LazyLoad=function(e){function u(t,n){var r=e.createElement(t),i;for(i in n){if(n.hasOwnProperty(i)){r.setAttribute(i,n[i])}}return r}function a(e){var t=r[e],n,o;if(t){n=t.callback;o=t.urls;o.shift();i=0;if(!o.length){n&&n.call(t.context,t.obj);r[e]=null;s[e].length&&l(e)}}}function f(){var n=navigator.userAgent;t={async:e.createElement("script").async===true};(t.webkit=/AppleWebKit\//.test(n))||(t.ie=/MSIE|Trident/.test(n))||(t.opera=/Opera/.test(n))||(t.gecko=/Gecko\//.test(n))||(t.unknown=true)}function l(i,o,l,p,d){var v=function(){a(i)},m=i==="css",g=[],y,b,w,E,S,x;t||f();if(o){o=typeof o==="string"?[o]:o.concat();if(m||t.async||t.gecko||t.opera){s[i].push({urls:o,callback:l,obj:p,context:d})}else{for(y=0,b=o.length;y<b;++y){s[i].push({urls:[o[y]],callback:y===b-1?l:null,obj:p,context:d})}}}if(r[i]||!(E=r[i]=s[i].shift())){return}n||(n=e.head||e.getElementsByTagName("head")[0]);S=E.urls;for(y=0,b=S.length;y<b;++y){x=S[y];if(m){w=t.gecko?u("style"):u("link",{href:x,rel:"stylesheet"})}else{w=u("script",{src:x});w.async=false}w.className="lazyload";w.setAttribute("charset","utf-8");if(t.ie&&!m&&"onreadystatechange"in w&&!("draggable"in w)){w.onreadystatechange=function(){if(/loaded|complete/.test(w.readyState)){w.onreadystatechange=null;v()}}}else if(m&&(t.gecko||t.webkit)){if(t.webkit){E.urls[y]=w.href;h()}else{w.innerHTML='@import "'+x+'";';c(w)}}else{w.onload=w.onerror=v}g.push(w)}for(y=0,b=g.length;y<b;++y){n.appendChild(g[y])}}function c(e){var t;try{t=!!e.sheet.cssRules}catch(n){i+=1;if(i<200){setTimeout(function(){c(e)},50)}else{t&&a("css")}return}a("css")}function h(){var e=r.css,t;if(e){t=o.length;while(--t>=0){if(o[t].href===e.urls[0]){a("css");break}}i+=1;if(e){if(i<200){setTimeout(h,50)}else{a("css")}}}}var t,n,r={},i=0,s={css:[],js:[]},o=e.styleSheets;return{css:function(e,t,n,r){l("css",e,t,n,r)},js:function(e,t,n,r){l("js",e,t,n,r)}}}(this.document);


/**
Nodes
**/

var Nodes;

window.Nodes = window.Nodes || {};

Nodes = window.Nodes;

Nodes.internal = (function() {
  var lib;
  lib = {};
  lib.escapeStr = function(string) {
    return ('' + string).replace(/["'\\\n\r\u2028\u2029]/g, function(character) {
      switch (character) {
        case '"':
          return '\\' + character;
        case "'":
          return '\\' + character;
        case '\\':
          return '\\' + character;
        case '\n':
          return '\\n';
        case '\r':
          return '\\r';
        case '\u2028':
          return '\\u2028';
        case '\u2029':
          return '\\u2029';
      }
    });
  };
  lib.isArray = function(value) {
    return value && typeof value === 'object' && value instanceof Array && typeof value.length === 'number' && typeof value.splice === 'function' && !(value.propertyIsEnumerable('length'));
  };
  lib.parseArguments = function(args) {
    var argument, callback, contextVariables, links, session, sessionCloseRequired, uris, _i, _len;
    links = [];
    uris = [];
    callback = null;
    contextVariables = null;
    session = null;
    sessionCloseRequired = false;
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      argument = args[_i];
      if (argument === null) {
        continue;
      }
      if (argument.length && lib.isArray(argument)) {
        links = argument;
        continue;
      }
      if (argument.uri && typeof argument.uri === 'function') {
        links.push(argument);
        continue;
      }
      if (typeof argument === 'string') {
        uris.push(argument);
        continue;
      }
      if (typeof argument === 'function') {
        callback = argument;
        continue;
      }
      contextVariables = argument;
    }
    if (links.length > 0) {
      session = links[0].client();
      sessionCloseRequired = false;
    }
    return {
      links: links,
      uris: uris,
      callback: callback,
      contextVariables: contextVariables,
      session: session,
      sessionCloseRequired: sessionCloseRequired
    };
  };
  lib.assertEngine = function(cb) {
    if (window.Clients) {
      cb();
      return;
    }
    return window.setTimeout((function() {
      return lib.assertEngine(cb);
    }), 2);
  };
  return lib;
})();

Nodes.get = function() {
  var outerArgs;
  outerArgs = arguments;
  return lib.assertEngine(function(ex) {
    var args, ops, uri, _i, _len, _ref;
    if (ex) {
      throw Error("Engine cannot be loaded.");
    }
    args = priv.parseArguments(outerArgs);
    if (!args.session) {
      args.session = Clients.create();
      args.sessionCloseRequired = true;
    }
    _ref = args.uris;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      uri = _ref[_i];
      args.links.push(session.link(uri));
    }
    if (args.links.length === 0) {
      cb();
      return;
    }
    ops = args.links.slice(0);
    ops.push(function() {
      var node, params, _j, _len1;
      if (Nodes.internal.isArray(outerArgs[0])) {
        cb(null, arguments);
        return;
      }
      params = [null];
      for (_j = 0, _len1 = arguments.length; _j < _len1; _j++) {
        node = arguments[_j];
        params.push(node);
      }
      return cb.apply(this, params);
    });
    ops.push(function(ex) {
      return args.callback(ex);
    });
    return args.session.getAll(ops);
  });
};

Nodes;


/**
LIBRARIES
**/

var __hasProp = {}.hasOwnProperty,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

window.Libraries = window.Libraries || {};

window.Libraries.priv = window.Libraries.priv || {};

window.Libraries.install = function(id, script, contextVariables, callback) {
  var cached, canCache, command, e, f, inlineScript, item, k, key, keyarr, lib, libsafe, lineNumber, msg, sourceUrl, v, vars, _i, _j, _len, _len1, _ref, _ref1, _ref2;
  canCache = true;
  if (contextVariables) {
    keyarr = [];
    for (key in contextVariables) {
      if (!__hasProp.call(contextVariables, key)) continue;
      keyarr.push(key);
    }
    cached = window.Libraries.priv.scriptCache[id];
    if (cached && cached.keyarr.length === keyarr.length) {
      _ref = cached.keyarr;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (_ref1 = !item, __indexOf.call(keyarr, _ref1) >= 0) {
          canCache = false;
        }
      }
      for (_j = 0, _len1 = keyarr.length; _j < _len1; _j++) {
        item = keyarr[_j];
        if (_ref2 = !item, __indexOf.call(cached.keyarr, _ref2) >= 0) {
          canCache = false;
        }
      }
    } else {
      canCache = false;
    }
  }
  if (canCache) {
    if (cached === window.Libraries.priv.undefinedResult) {
      callback(null, void 0);
      return;
    }
    lib = cached.f(contextVariables);
    if (typeof lib !== 'function') {
      callback(null, lib);
      return;
    }
    lib(function(ex, lib) {
      if (ex) {
        callback(ex);
        return;
      }
      return callback(null, lib);
    });
    return;
  }
  vars = "";
  if (contextVariables) {
    for (k in contextVariables) {
      v = contextVariables[k];
      vars += 'var ' + k + ' = contextVariables["' + k + '"];';
    }
  }
  try {
    inlineScript = Nodes.internal.escapeStr(script);
    sourceUrl = "//# sourceURL=" + id + ".value.js\\n";
    inlineScript = inlineScript + "\\n" + sourceUrl;
    command = 'var scriptRes = eval("' + inlineScript + '"); return scriptRes;';
    f = new Function('contextVariables', vars + command);
    lib = f(contextVariables);
  } catch (_error) {
    e = _error;
    lineNumber = e.lineNumber || 2;
    lineNumber = lineNumber - 1;
    msg = "Syntax error in script '" + id + ".value.js:" + lineNumber + "'\n   " + e;
    if (e.lineNumber) {
      msg += "Line number: " + lineNumber;
    }
    callback(new Error(msg));
    return;
  }
  if (typeof lib !== 'function') {
    libsafe = {
      f: f,
      keyarr: keyarr
    } || window.Libraries.priv.undefinedResult;
    window.Libraries.priv.scriptCache[id] = libsafe;
    callback(null, lib);
    return;
  }
  return lib(function(ex, lib) {
    if (ex) {
      callback(ex);
      return;
    }
    window.Libraries.priv.scriptCache[id] = {
      f: f,
      keyarr: keyarr
    };
    callback(null, lib);
  });
};

window.Libraries.uninstall = function(id) {
  return delete window.Libraries.priv.scriptCache[id];
};

window.Libraries.uninstallAll = function(id) {
  return window.Libraries.priv.scriptCache = {};
};

window.Libraries.priv.scriptCache = window.Libraries.priv.scriptCache || {};

window.Libraries.requirePriv = function() {
  var priv;
  priv = {};
  priv.requireOne = function(node, contextVariables, callback) {
    return window.Libraries.install(node.uri(), node.value(), contextVariables, function(ex, lib) {
      var isFirefox;
      isFirefox = typeof InstallTrigger !== 'undefined';
      if (!isFirefox) {
        return callback(ex, lib);
      } else {
        return setTimeout((function() {
          return callback(ex, lib);
        }), 0);
      }
    });
  };
  priv.createFunction = function(node, contextVariables) {
    return function(callback) {
      node.catchExceptions(callback);
      return node.get(function(node) {
        return priv.requireOne(node, contextVariables, callback);
      });
    };
  };
  priv.require = function(links, contextVariables, callback) {
    var op, ops, queries, query, _i, _len;
    queries = links.slice(0);
    ops = [];
    for (_i = 0, _len = queries.length; _i < _len; _i++) {
      query = queries[_i];
      if (!contextVariables) {
        contextVariables = {};
      }
      contextVariables['client'] = query.client();
      ops.push(priv.createFunction(query, contextVariables));
    }
    op = Flow.parallel(ops);
    op.catchExceptions(callback);
    return op.get(function(libs) {
      return callback(null, libs);
    });
  };
  priv.isArray = Nodes.internal.isArray;
  priv.triggerCallback = function(args, ex, libs, callback) {
    if (priv.isArray(args[0])) {
      callback(ex, libs);
      return;
    }
    return callback.apply(this, [ex].concat(libs));
  };
  priv.parseArguments = Nodes.internal.parseArguments;
  priv.performRequire = function(args, arguments_closed) {
    return Nodes.internal.assertEngine(function(ex) {
      var uri, _i, _len, _ref;
      if (ex) {
        throw new Error("Engine cannot be loaded");
        return;
      }
      if (!args.session) {
        args.session = Clients.create();
        args.sessionCloseRequired = true;
      }
      _ref = args.uris;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        uri = _ref[_i];
        args.links.push(args.session.link(uri));
      }
      if (args.links.length === 0) {
        args.callback(null, []);
        return;
      }
      return priv.require(args.links, args.contextVariables, function(ex, libs) {
        priv.triggerCallback(arguments_closed, ex, libs, args.callback);
        if (args.sessionCloseRequired) {
          return args.session.close().get(function() {});
        }
      });
    });
  };
  return priv;
};

window.Libraries.require = function() {
  var args, arguments_closed, priv;
  arguments_closed = arguments;
  priv = window.Libraries.requirePriv();
  args = priv.parseArguments(arguments_closed);
  if (args.callback) {
    priv.performRequire(args, arguments_closed);
    return;
  }
  if (!Flow) {
    throw new Error('Assure that engine is loaded before requesting a library.');
  }
  return Flow.promise((function(cb) {
    args.callback = function(ex, res) {
      return cb.apply(this, [ex].concat(res));
    };
    return priv.performRequire(args, arguments_closed);
  }));
};

window.Libraries.requireNew = function() {
  var arguments_closed;
  arguments_closed = arguments;
  return Nodes.internal.assertEngine(function(ex) {
    var args, link, op, ops, priv, uri, _i, _j, _len, _len1, _ref, _ref1;
    if (ex) {
      throw new Error("Engine cannot be loaded");
      return;
    }
    priv = window.Libraries.requirePriv();
    args = priv.parseArguments(arguments_closed);
    if (!args.session) {
      args.session = Clients.create();
      args.sessionCloseRequired = true;
    }
    _ref = args.uris;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      uri = _ref[_i];
      args.links.push(args.session.link(uri));
    }
    ops = [];
    if (args.links.length > 0) {
      _ref1 = args.links;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        link = _ref1[_j];
        Appjangle.uninstall(link.uri());
        ops.push(link.reload());
      }
    }
    op = Flow.parallel(ops);
    op.catchExceptions(args.callback);
    return (function(arguments_closed) {
      return op.get(function() {
        window.Libraries.require.apply(this, arguments_closed);
        if (args.sessionCloseRequired) {
          return args.session.close().get(function() {});
        }
      });
    })(arguments_closed);
  });
};

window.Libraries.requirePrivExternal = function() {
  var priv;
  priv = {};
  priv.loaded = [];
  priv.loading = [];
  priv.getLoadingIdx = function(uri) {
    var i, loading, _i, _len, _ref;
    _ref = priv.loading;
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      loading = _ref[i];
      if (loading.uri === uri) {
        return i;
      }
    }
    return null;
  };
  priv.removeLoading = function(uri) {
    var callback, removeIdx, _i, _len, _ref;
    removeIdx = priv.getLoadingIdx(uri);
    if (removeIdx === null) {
      throw new Error("Couldn't find uri to remove: " + uri);
    }
    _ref = priv.loading[removeIdx].callbacks;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      callback = _ref[_i];
      callback();
    }
    return priv.loading.splice(removeIdx, 1);
  };
  priv.addLoading = function(uri, callback) {
    return priv.loading.push({
      uri: uri,
      callbacks: [callback]
    });
  };
  priv.installOneScriptExternal = function(uri, callback) {
    var loadingIdx;
    loadingIdx = priv.getLoadingIdx(uri);
    if (loadingIdx !== null) {
      priv.loading[loadingIdx].callbacks.push(callback);
      return;
    }
    priv.addLoading(uri, callback);
    return LazyLoad.js(uri, function() {
      priv.loaded.push(uri);
      priv.removeLoading(uri);
    });
  };
  priv.installOneCss = function(uri, callback) {
    var loadingIdx;
    loadingIdx = priv.getLoadingIdx(uri);
    if (loadingIdx !== null) {
      priv.loading[loadingIdx].callbacks.push(callback);
      return;
    }
    priv.addLoading(uri, callback);
    return LazyLoad.css(uri, function() {
      priv.loaded.push(uri);
      priv.removeLoading(uri);
    });
  };
  priv.installExternal = function(uris, op, callback) {
    var createOp, loadOps, uri, _i, _len;
    loadOps = [];
    createOp = function(uri) {
      return function(callback) {
        return op(uri, function() {
          return callback();
        });
      };
    };
    for (_i = 0, _len = uris.length; _i < _len; _i++) {
      uri = uris[_i];
      if (!(__indexOf.call(priv.loaded, uri) >= 0)) {
        loadOps.push(createOp(uri));
      }
    }
    if (loadOps.length === 0) {
      callback();
      return;
    }
    return Flow.parallel(loadOps).apply(function() {
      return callback();
    });
  };
  priv.isArray = function(value) {
    return value && typeof value === 'object' && value instanceof Array && typeof value.length === 'number' && typeof value.splice === 'function' && !(value.propertyIsEnumerable('length'));
  };
  priv.readArguments = function(args) {
    var argument, callback, uris, _i, _len;
    uris = [];
    callback = null;
    for (_i = 0, _len = args.length; _i < _len; _i++) {
      argument = args[_i];
      if (typeof argument === 'string') {
        uris.push(argument);
        continue;
      }
      if (priv.isArray(argument)) {
        uris = argument;
        continue;
      }
      callback = argument;
    }
    if (!callback) {
      throw new Error('Last argument must be a function.');
    }
    return {
      uris: uris,
      callback: callback
    };
  };
  return priv;
};

window.Libraries.privExternal = window.Libraries.requirePrivExternal();

window.Libraries.requireExternal = function() {
  var args, priv;
  priv = window.Libraries.privExternal;
  args = priv.readArguments(arguments);
  if (args.uris.length === 0) {
    args.callback();
    return;
  }
  return priv.installExternal(args.uris, priv.installOneScriptExternal, args.callback);
};

window.Stylesheets = window.Stylesheets || {};

window.Stylesheets.requireExternal = function() {
  var args, priv;
  priv = window.Libraries.privExternal;
  args = priv.readArguments(arguments);
  if (args.uris.length === 0) {
    args.callback();
    return;
  }
  return priv.installExternal(args.uris, priv.installOneCss, args.callback);
};

window.Stylesheets.apply = function(node, elem) {
  if (!Flow) {
    throw new Error('Assure that engine is loaded before applying a stylesheet.');
  }
  return Flow.promise(function(cb) {
    return window.Libraries.require("https://pureleap.com/objecthub/hub/users/main/~objecthub/home/my/~*0/it/.n/Platform/.n/Import/~*0/.n/ObjectHub_Web/.n/Foundation/.n/Micro_Apps/.n/Shared_Utilities/.n/CSS_Parser", function(ex, CssParser) {
      var parser;
      if (ex) {
        cb(ex);
        return;
      }
      parser = CssParser.create();
      node.catchExceptions(cb);
      return node.get(function(node) {
        parser.apply(node.value(), elem);
        return cb();
      });
    });
  });
};

window.Libraries;

/**
APPS
**/

window.Apps = window.Apps || {};

window.Apps.priv = {};

window.Apps.priv.performEmbed = function(params, cb) {
  var version;
  if (!params.app.uri) {
    params.client = window.Clients.create();
    params.app = params.client.link(params.app);
  }
  version = params.app.selectAsLink("./app_version");
  version.catchExceptions(function(ex) {
    return cb(ex.exception);
  });
  version.catchUndefined(function() {
    return Libraries.require("https://beta.objecthub.io/dev/~10/~hub/hub/users/main/~objecthub/home/my/~*0/it/.n/ObjectHub_Web/.n/Foundation/.n/Micro_Apps/.n/Apps_Legacy", function(ex, lib) {
      if (ex) {
        cb(ex);
        return;
      }
      return lib.embed(params, cb);
    });
  });
  return version.get(function(version) {
    if (version.value() === "2") {
      Libraries.require("https://pureleap.com/objecthub/hub/users/main/~objecthub/home/my/~*0/it/.n/Platform/.n/Import/~*0/.n/ObjectHub_Web/.n/Foundation/.n/Micro_Apps/.n/Apps_V2", function(ex, lib) {
        if (ex) {
          cb(ex);
          return;
        }
        return lib.embed(params, cb);
      });
      return;
    }
    return cb(new Error("Invalid application version: " + version.value()));
  });
};

window.Apps.embed = function(params, cb) {
  if (!params.app) {
    throw new Error("Missing parameter 'app'");
  }
  if (!params.elem) {
    throw new Error("Missing parameter 'elem'");
  }
  if (!cb) {
    if (!window.Flow) {
      throw new Error("Assure engine is initialized first.");
    }
    return window.Flow.promise(function(cb) {
      return window.Apps.priv.performEmbed(params, cb);
    });
  }
  return window.Objects.internal.assertEngine(function(ex) {
    if (ex) {
      throw new Error("Engine cannot be loaded");
    }
    return window.Apps.priv.performEmbed(params, cb);
  });
};

window.Apps;