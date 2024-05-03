"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/index.ts
var import_express4 = __toESM(require("express"));
var import_cors = __toESM(require("cors"));

// src/utils/logger.ts
var import_pino = __toESM(require("pino"));
var import_dayjs = __toESM(require("dayjs"));
var level = "info";
var log = (0, import_pino.default)({
  transport: {
    target: "pino-pretty"
  },
  level,
  base: { pid: false },
  timestamp: () => `,"time": "${(0, import_dayjs.default)().format()}"`
});
var logger_default = log;

// src/modules/seasons/seasons.routes.ts
var import_express = __toESM(require("express"));

// src/modules/prisma.ts
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
      message: "all seasons finded",
      data: allSeasons.sort((season1, season2) => {
        return Number(season1.year) - Number(season2.year);
      })
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error"
    });
  }
});

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

// src/modules/drivers/services/create-driver.ts
var createDriver = (driver) => {
  return prisma_default.driver.create({ data: driver });
};

// src/modules/drivers/services/find-all-drivers.ts
var findAllDrivers = () => {
  return prisma_default.driver.findMany({});
};

// src/modules/drivers/services/find-driver-by-id.ts
var findDriverById = (id) => {
  return prisma_default.driver.findUnique({ where: { id } });
};

// src/modules/drivers/services/find-drivers-by-year.ts
var findDriversByYear = (seasonYear) => {
  return prisma_default.driver.findMany({ where: { seasonYear } });
};

// src/modules/drivers/services/delete-driver.ts
var deleteDriver = (id) => {
  return prisma_default.driver.delete({ where: { id } });
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
      message: `${param_year} season finded`
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error"
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
      message: "internal server error"
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
    console.log(error);
    return res.status(500).json({
      message: "internal server error"
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
      message: "internal server error"
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

// src/modules/seasons/seasons.routes.ts
var router = import_express.default.Router();
router.route("/").get(SeasonController.findAll);
router.route("/:param_year").get(SeasonController.findByYear);
router.route("/").post(SeasonController.create);
router.route("/:param_year").put(SeasonController.update);
router.route("/:param_year").delete(SeasonController.remove);
var seasons_routes_default = router;

// src/modules/races/races.routes.ts
var import_express2 = __toESM(require("express"));

// src/modules/races/controllers/find-by-id.ts
var findById = (req, res) => __async(void 0, null, function* () {
  const { id } = req.params;
  try {
    const race = yield findRaceById(id);
    if (!race) {
      return res.status(404).json({
        message: "race not found"
      });
    }
    return res.status(200).json({
      data: race,
      message: "successfully found race"
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error"
    });
  }
});

// src/modules/types.ts
var relatedObjects = {
  race: "race",
  team: "team",
  driver: "driver",
  car: "car"
};

// src/modules/races/controllers/create.ts
var create2 = (req, res) => __async(void 0, null, function* () {
  const _a = req.body, { seasonYear, name, race_datetime, circuit } = _a, body = __objRest(_a, ["seasonYear", "name", "race_datetime", "circuit"]);
  try {
    const newRace = yield createRace(__spreadValues({ name, race_datetime, circuit }, body));
    yield updateSeason(seasonYear, {}, relatedObjects.race, newRace.id);
    return res.status(200).json({
      message: "race created successfully",
      data: newRace
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error"
    });
  }
});

// src/modules/races/controllers/update.ts
var update2 = (req, res) => __async(void 0, null, function* () {
  const { id } = req.params;
  const {
    name,
    race_datetime,
    quali_datetime,
    sprint_datetime,
    fp3_datetime,
    fp2_datetime,
    fp1_datetime,
    winner,
    circuit
  } = req.body;
  try {
    const existingRace = yield findRaceById(id);
    if (!existingRace) {
      return res.status(404).json({
        message: "race not found"
      });
    }
    const updatedRace = yield updateRace(id, {
      name,
      race_datetime,
      quali_datetime,
      sprint_datetime,
      fp3_datetime,
      fp2_datetime,
      fp1_datetime,
      winner,
      circuit
    });
    return res.status(200).json({
      message: "race successfully updated",
      data: updatedRace
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error"
    });
  }
});

// src/modules/races/controllers/delete.ts
var remove2 = (req, res) => __async(void 0, null, function* () {
  const { id } = req.params;
  try {
    const raceToDelete = yield findRaceById(id);
    if (!raceToDelete) {
      return res.status(404).json({
        message: "race not found"
      });
    }
    yield deleteRace(id);
    return res.status(200).json({
      message: "successfully deleted race"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error"
    });
  }
});

// src/modules/races/controllers/index.ts
var RaceController = {
  findById,
  create: create2,
  update: update2,
  remove: remove2
};

// src/modules/races/races.routes.ts
var router2 = import_express2.default.Router();
router2.route("/:id").get(RaceController.findById);
router2.route("/").post(RaceController.create);
router2.route("/:id").put(RaceController.update);
router2.route("/:id").delete(RaceController.remove);
var races_routes_default = router2;

// src/modules/drivers/drivers.routes.ts
var import_express3 = __toESM(require("express"));

// src/modules/drivers/controllers/create.ts
var create3 = (req, res) => __async(void 0, null, function* () {
  const _a = req.body, { name, nationality, is_competing_in_f1, is_alive } = _a, body = __objRest(_a, ["name", "nationality", "is_competing_in_f1", "is_alive"]);
  const competed_seasons = body.competed_seasons;
  try {
    for (let i = 0; i < competed_seasons.length; i++) {
      const validatedSeasonYear = yield isSeasonYearValid(competed_seasons[i]);
      if (!validatedSeasonYear) {
        return res.status(422).json({
          message: `the ${competed_seasons[i]} season has not yet been created in the database or is not between 1950 and the current year`
        });
      }
    }
    const newDriver = yield createDriver(__spreadValues({
      name,
      nationality,
      is_competing_in_f1,
      is_alive
    }, body));
    competed_seasons.forEach((season) => __async(void 0, null, function* () {
      console.log("teste");
      yield updateSeason(season, {}, relatedObjects.driver, newDriver.id);
    }));
    return res.status(200).json({
      message: "driver created successfully",
      data: newDriver
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error"
    });
  }
});

// src/modules/drivers/controllers/find-all.ts
var findAll2 = (req, res) => __async(void 0, null, function* () {
  try {
    const allDrivers = yield findAllDrivers();
    return res.status(200).json({
      message: "all drivers finded",
      data: allDrivers
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error"
    });
  }
});

// src/modules/drivers/controllers/find-by-id.ts
var findById2 = (req, res) => {
  const { id } = req.params;
  try {
    const existingDriver = findDriverById(id);
    if (!existingDriver) {
      return res.status(404).json({
        message: "driver not found"
      });
    }
    return res.status(200).json({
      data: existingDriver,
      message: "driver founded"
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error"
    });
  }
};

// src/modules/drivers/controllers/delete.ts
var remove3 = (req, res) => __async(void 0, null, function* () {
  const { id } = req.params;
  try {
    const existingDriver = yield findDriverById(id);
    if (!existingDriver) {
      return res.status(404).json({
        message: "driver not found"
      });
    }
    yield deleteDriver(id);
    return res.status(200).json({
      message: `successfully deleted driver with id: ${id}`
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error"
    });
  }
});

// src/modules/drivers/controllers/index.ts
var DriverController = {
  create: create3,
  findAll: findAll2,
  findById: findById2,
  remove: remove3
};

// src/modules/drivers/drivers.routes.ts
var router3 = import_express3.default.Router();
router3.route("/").get(DriverController.findAll);
router3.route("/:id").get(DriverController.findById);
router3.route("/").post(DriverController.create);
router3.route("/:id").delete(DriverController.remove);
var drivers_routes_default = router3;

// src/index.ts
var port = 8080;
var url = `http://localhost:${port}`;
var app = (0, import_express4.default)();
app.use((0, import_cors.default)());
app.use(import_express4.default.json({ limit: "10mb" }));
app.use("/seasons", seasons_routes_default);
app.use("/races", races_routes_default);
app.use("/drivers", drivers_routes_default);
app.listen(port, () => {
  logger_default.info(`servidor iniciado em ${url}`);
});
