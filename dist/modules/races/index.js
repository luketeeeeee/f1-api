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

// src/modules/races/index.ts
var races_exports = {};
__export(races_exports, {
  raceRoutes: () => races_routes_default
});
module.exports = __toCommonJS(races_exports);

// src/modules/races/races.routes.ts
var import_express = __toESM(require("express"));

// src/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/modules/races/services/find-race-by-id.ts
var findRaceById = (id) => {
  return prisma_default.race.findUnique({ where: { id } });
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
      message: { error: error.message }
    });
  }
});

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

// src/modules/races/controllers/create.ts
var create = (req, res) => __async(void 0, null, function* () {
  const _a = req.body, { seasonYear, name, race_datetime, circuit } = _a, body = __objRest(_a, ["seasonYear", "name", "race_datetime", "circuit"]);
  try {
    const newRace = yield createRace(__spreadValues({ name, race_datetime, circuit }, body));
    yield updateSeason(seasonYear, {}, relatedObjects.race, newRace.id);
    return res.status(200).json({
      message: "race created successfully",
      data: newRace
    });
  } catch (error) {
    return res.status(500).json({
      message: { error: error.message }
    });
  }
});

// src/modules/races/controllers/update.ts
var update = (req, res) => __async(void 0, null, function* () {
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
      message: { error: error.message }
    });
  }
});

// src/modules/races/controllers/delete.ts
var remove = (req, res) => __async(void 0, null, function* () {
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
    return res.status(500).json({
      message: { error: error.message }
    });
  }
});

// src/modules/races/controllers/index.ts
var RaceController = {
  findById,
  create,
  update,
  remove
};

// src/modules/races/races.routes.ts
var router = import_express.default.Router();
router.route("/:id").get(RaceController.findById);
router.route("/").post(RaceController.create);
router.route("/:id").put(RaceController.update);
router.route("/:id").delete(RaceController.remove);
var races_routes_default = router;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  raceRoutes
});
