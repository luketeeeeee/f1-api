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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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

// src/modules/drivers/drivers.routes.ts
var drivers_routes_exports = {};
__export(drivers_routes_exports, {
  default: () => drivers_routes_default
});
module.exports = __toCommonJS(drivers_routes_exports);
var import_express = __toESM(require("express"));

// src/modules/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

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

// src/modules/drivers/services/delete-driver.ts
var deleteDriver = (id) => {
  return prisma_default.driver.delete({ where: { id } });
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

// src/modules/types.ts
var relatedObjects = {
  race: "race",
  team: "team",
  driver: "driver",
  car: "car"
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

// src/modules/drivers/controllers/create.ts
var create = (req, res) => __async(void 0, null, function* () {
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
var findAll = (req, res) => __async(void 0, null, function* () {
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
var findById = (req, res) => {
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
var remove = (req, res) => __async(void 0, null, function* () {
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
  create,
  findAll,
  findById,
  remove
};

// src/modules/drivers/drivers.routes.ts
var router = import_express.default.Router();
router.route("/").get(DriverController.findAll);
router.route("/:id").get(DriverController.findById);
router.route("/").post(DriverController.create);
router.route("/:id").delete(DriverController.remove);
var drivers_routes_default = router;
