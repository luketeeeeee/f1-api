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

// src/modules/seasons/controllers/find-by-year.ts
var find_by_year_exports = {};
__export(find_by_year_exports, {
  findByYear: () => findByYear
});
module.exports = __toCommonJS(find_by_year_exports);

// src/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/modules/seasons/services/find-season-by-year.ts
var findSeasonByYear = (year) => {
  return prisma_default.season.findUnique({ where: { year } });
};

// src/modules/races/services/find-races-by-year.ts
var findRacesByYear = (seasonYear) => {
  return prisma_default.race.findMany({ where: { seasonYear } });
};

// src/modules/drivers/services/find-drivers-by-year.ts
var findDriversByYear = (seasonYear) => {
  return prisma_default.driver.findMany({ where: { seasonYear } });
};

// src/modules/seasons/controllers/find-by-year.ts
var findByYear = (req, res) => __async(void 0, null, function* () {
  const { param_year } = req.params;
  try {
    const season = yield findSeasonByYear(param_year);
    if (!season) {
      return res.status(404).json({
        message: `${param_year} season not found`
      });
    }
    const seasonRaces = yield findRacesByYear(param_year);
    const seasonDrivers = yield findDriversByYear(param_year);
    return res.status(200).json({
      data: {
        season,
        races: seasonRaces.sort((race1, race2) => {
          return race1.race_number - race2.race_number;
        }),
        drivers: seasonDrivers
      },
      message: `${param_year} season found`
    });
  } catch (error) {
    return res.status(500).json({
      message: { error: error.message }
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  findByYear
});
