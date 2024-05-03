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

// src/modules/races/services/index.ts
var services_exports = {};
__export(services_exports, {
  createRace: () => createRace,
  deleteRace: () => deleteRace,
  findRaceById: () => findRaceById,
  findRacesByYear: () => findRacesByYear,
  updateRace: () => updateRace
});
module.exports = __toCommonJS(services_exports);

// src/modules/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/modules/races/services/find-race-by-id.ts
var findRaceById = (id) => {
  return prisma_default.race.findUnique({ where: { id } });
};

// src/modules/races/services/find-races-by-year.ts
var findRacesByYear = (seasonYear) => {
  return prisma_default.race.findMany({ where: { seasonYear } });
};

// src/modules/races/services/create-race.ts
var createRace = (race) => {
  return prisma_default.race.create({ data: race });
};

// src/modules/races/services/update-race.ts
var updateRace = (id, data) => {
  return prisma_default.race.update({ where: { id }, data });
};

// src/modules/races/services/delete-race.ts
var deleteRace = (id) => {
  return prisma_default.race.delete({ where: { id } });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createRace,
  deleteRace,
  findRaceById,
  findRacesByYear,
  updateRace
});
