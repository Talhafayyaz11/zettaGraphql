// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
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
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"fzA6O":[function(require,module,exports) {
var _apolloServer = require("apollo-server");
var _path = require("path");
var _fs = require("fs");
var _resolvers = require("./resolvers");
var $parcel$__dirname = require("path").resolve(__dirname, "../../server");
// Load schema from the file
const typeDefs = (0, _fs.readFileSync)((0, _path.join)($parcel$__dirname, "./schema.graphql")).toString("utf-8");
const server = new (0, _apolloServer.ApolloServer)({
    mocks: false,
    mockEntireSchema: false,
    resolvers: _resolvers,
    typeDefs
});
server.listen().then(({ url  })=>{
    console.log(`🚀 Server ready at ${url}`);
});

},{"./resolvers":"1UXhP"}],"1UXhP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Query", ()=>Query);
var _implementation = require("./implementation");
const Query = {
    records: (0, _implementation.records)
};

},{"./implementation":"6Pb4G","@parcel/transformer-js/src/esmodule-helpers.js":"i8bdk"}],"6Pb4G":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "records", ()=>records);
var _utils = require("./utils");
const records = async (_, { message =""  })=>{
    const mentions = (0, _utils.getName)(message);
    const emoticons = (0, _utils.getEmoticons)(message);
    const links = await (0, _utils.getLinks)(message);
    return {
        mentions,
        emoticons,
        links
    };
};

},{"./utils":"hU7bW","@parcel/transformer-js/src/esmodule-helpers.js":"i8bdk"}],"hU7bW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getName", ()=>getName);
parcelHelpers.export(exports, "getEmoticons", ()=>getEmoticons);
parcelHelpers.export(exports, "getLinks", ()=>getLinks);
var _constants = require("./constants");
var _urlMetadata = require("url-metadata");
var _urlMetadataDefault = parcelHelpers.interopDefault(_urlMetadata);
const getName = (str)=>{
    try {
        const parsed = str.match((0, _constants.nameRegex))?.map((mention)=>mention.replace("@", ""));
        return parsed;
    } catch (err) {
        console.error("Error occured in getName", err);
        return [];
    }
};
const getEmoticons = (str)=>{
    try {
        const parsed = str.match((0, _constants.emoticonRegex))?.map((x)=>x.replace(/[()]/g, ""));
        return parsed;
    } catch (err) {
        console.error("Error occured in getEmoticons", err);
        return [];
    }
};
const getLinks = async (str)=>{
    try {
        const urls = str.match((0, _constants.urlRegex))?.map(async (url)=>{
            const { title =""  } = await (0, _urlMetadataDefault.default)(url) || {};
            console.log();
            return {
                url,
                title
            };
        }) || [];
        const links = await Promise.all(urls);
        return links;
    } catch (err) {
        console.error("Error occured in getLinks", err);
        return [];
    }
};

},{"./constants":"5yR7h","@parcel/transformer-js/src/esmodule-helpers.js":"i8bdk"}],"5yR7h":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "nameRegex", ()=>nameRegex);
parcelHelpers.export(exports, "emoticonRegex", ()=>emoticonRegex);
parcelHelpers.export(exports, "urlRegex", ()=>urlRegex);
const nameRegex = /\B@\w+/g;
const emoticonRegex = /\(.*?\)/g;
const urlRegex = /(https?:\/\/[^\s]+)/g;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"i8bdk"}],"i8bdk":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}]},["fzA6O"], "fzA6O", "parcelRequire6a06")

//# sourceMappingURL=index.js.map
