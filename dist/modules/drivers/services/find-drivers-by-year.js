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

// src/modules/drivers/services/find-drivers-by-year.ts
var find_drivers_by_year_exports = {};
__export(find_drivers_by_year_exports, {
  findDriversByYear: () => findDriversByYear
});
module.exports = __toCommonJS(find_drivers_by_year_exports);

// src/modules/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/modules/drivers/services/find-drivers-by-year.ts
var findDriversByYear = (seasonYear) => {
  return prisma_default.driver.findMany({ where: { seasonYear } });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  findDriversByYear
});
