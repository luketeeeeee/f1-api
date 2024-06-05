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

// src/modules/seasons/services/index.ts
var services_exports = {};
__export(services_exports, {
  createManySeasons: () => createManySeasons,
  createSeason: () => createSeason,
  deleteSeason: () => deleteSeason,
  findAllSeasons: () => findAllSeasons,
  findSeasonByYear: () => findSeasonByYear,
  updateSeason: () => updateSeason
});
module.exports = __toCommonJS(services_exports);

// src/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/modules/seasons/services/create-many-seasons.ts
var createManySeasons = (seasons) => {
  return prisma_default.season.createMany({ data: seasons, skipDuplicates: true });
};

// src/modules/seasons/services/create-season.ts
var createSeason = (season) => {
  return prisma_default.season.create({ data: season });
};

// src/modules/seasons/services/find-all-seasons.ts
var findAllSeasons = () => {
  return prisma_default.season.findMany({});
};

// src/modules/seasons/services/find-season-by-year.ts
var findSeasonByYear = (year) => {
  return prisma_default.season.findUnique({ where: { year } });
};

// src/modules/seasons/services/update-season.ts
var updateSeason = (year, season, newRelatedObjectType, relatedObjectId) => {
  if (newRelatedObjectType === "race") {
    return prisma_default.season.update({
      where: { year },
      data: { races: { connect: { id: relatedObjectId } } }
    });
  }
  if (newRelatedObjectType === "team") {
    return prisma_default.season.update({
      where: { year },
      data: { teams: { connect: { id: relatedObjectId } } }
    });
  }
  if (newRelatedObjectType === "driver") {
    return prisma_default.season.update({
      where: { year },
      data: { drivers: { connect: { id: relatedObjectId } } }
    });
  }
  if (newRelatedObjectType === "car") {
    return prisma_default.season.update({
      where: { year },
      data: { cars: { connect: { id: relatedObjectId } } }
    });
  }
  return prisma_default.season.update({ where: { year }, data: season });
};

// src/modules/seasons/services/delete-season.ts
var deleteSeason = (year) => {
  return prisma_default.season.delete({ where: { year } });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createManySeasons,
  createSeason,
  deleteSeason,
  findAllSeasons,
  findSeasonByYear,
  updateSeason
});
