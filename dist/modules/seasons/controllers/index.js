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

// src/modules/seasons/controllers/index.ts
var controllers_exports = {};
__export(controllers_exports, {
  SeasonController: () => SeasonController
});
module.exports = __toCommonJS(controllers_exports);

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

// src/modules/seasons/controllers/find-all.ts
var findAll = (req, res) => __async(void 0, null, function* () {
  try {
    const allSeasons = yield findAllSeasons();
    return res.status(200).json({
      message: "all seasons found",
      data: allSeasons.sort((season1, season2) => {
        return Number(season1.year) - Number(season2.year);
      })
    });
  } catch (error) {
    return res.status(500).json({
      message: { error: error.message }
    });
  }
});

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

// src/modules/seasons/controllers/create.ts
var create = (req, res) => __async(void 0, null, function* () {
  const { year, drivers_champion, constructors_champion } = req.body;
  try {
    if (!isSeasonYearValid(year)) {
      return res.status(422).json({
        message: "year can't be minor than 1950 or greater than the current year"
      });
    }
    const existingSeason = yield findSeasonByYear(year);
    if (existingSeason) {
      return res.status(409).json({
        message: `season ${year} already exists`
      });
    }
    const newSeason = yield createSeason({
      year,
      drivers_champion,
      constructors_champion
    });
    return res.status(201).json({
      message: "season created successfully",
      data: newSeason
    });
  } catch (error) {
    return res.status(500).json({
      message: { error: error.message }
    });
  }
});

// src/modules/seasons/controllers/create-many.ts
var createMany = (req, res) => __async(void 0, null, function* () {
  const seasons = req.body;
  try {
    const newSeasons = yield createManySeasons(seasons);
    return res.status(200).json({
      message: "seasons successfully created",
      data: newSeasons
    });
  } catch (error) {
    return res.status(500).json({
      message: { error: error.message }
    });
  }
});

// src/modules/seasons/controllers/update.ts
var update = (req, res) => __async(void 0, null, function* () {
  const { param_year } = req.params;
  const { year, drivers_champion, constructors_champion } = req.body;
  try {
    const existingSeason = yield findSeasonByYear(param_year);
    if (!existingSeason) {
      return res.status(404).json({
        message: "season not found"
      });
    }
    const updatedSeason = yield updateSeason(param_year, {
      year,
      drivers_champion,
      constructors_champion
    });
    return res.status(200).json({
      message: "season successfully updated",
      data: updatedSeason
    });
  } catch (error) {
    return res.status(500).json({
      message: "interval server error"
    });
  }
});

// src/modules/seasons/controllers/delete.ts
var remove = (req, res) => __async(void 0, null, function* () {
  const { param_year } = req.params;
  try {
    const seasonToDelete = findSeasonByYear(param_year);
    if (!seasonToDelete) {
      return res.status(404).json({
        message: "season not found"
      });
    }
    yield deleteSeason(param_year);
    return res.status(200).json({
      message: `successfully deleted season ${param_year}`
    });
  } catch (error) {
    return res.status(500).json({
      message: { error: error.message }
    });
  }
});

// src/modules/seasons/controllers/index.ts
var SeasonController = {
  findAll,
  findByYear,
  create,
  createMany,
  update,
  remove
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SeasonController
});
