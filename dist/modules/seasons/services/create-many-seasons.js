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

// src/modules/seasons/services/create-many-seasons.ts
var create_many_seasons_exports = {};
__export(create_many_seasons_exports, {
  createManySeasons: () => createManySeasons
});
module.exports = __toCommonJS(create_many_seasons_exports);

// src/modules/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/modules/seasons/services/create-many-seasons.ts
var createManySeasons = (seasons) => {
  return prisma_default.season.createMany({ data: seasons, skipDuplicates: true });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createManySeasons
});
