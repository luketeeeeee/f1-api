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

// src/modules/races/controllers/update.ts
var update_exports = {};
__export(update_exports, {
  update: () => update
});
module.exports = __toCommonJS(update_exports);

// src/modules/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/modules/races/services/find-race-by-id.ts
var findRaceById = (id) => {
  return prisma_default.race.findUnique({ where: { id } });
};

// src/modules/races/services/update-race.ts
var updateRace = (id, data) => {
  return prisma_default.race.update({ where: { id }, data });
};

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
      message: "internal server error"
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  update
});
