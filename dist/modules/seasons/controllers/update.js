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

// src/modules/seasons/controllers/update.ts
var update_exports = {};
__export(update_exports, {
  update: () => update
});
module.exports = __toCommonJS(update_exports);

// src/modules/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  update
});
