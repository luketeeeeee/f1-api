"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/utils/isSeasonYearValid.ts
var isSeasonYearValid_exports = {};
__export(isSeasonYearValid_exports, {
  isSeasonYearValid: () => isSeasonYearValid
});
module.exports = __toCommonJS(isSeasonYearValid_exports);

// src/modules/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/modules/seasons/services/find-season-by-year.ts
var findSeasonByYear = (year) => {
  return prisma_default.season.findUnique({ where: { year } });
};

// src/utils/isSeasonYearValid.ts
var isSeasonYearValid = (year) => __async(void 0, null, function* () {
  const existingSeason = yield findSeasonByYear(year);
  if (!existingSeason) {
    return false;
  }
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  if (Number(year) > currentYear || Number(year) < 1950) {
    return false;
  }
  return true;
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isSeasonYearValid
});
