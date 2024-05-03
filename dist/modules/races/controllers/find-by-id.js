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

// src/modules/races/controllers/find-by-id.ts
var find_by_id_exports = {};
__export(find_by_id_exports, {
  findById: () => findById
});
module.exports = __toCommonJS(find_by_id_exports);

// src/modules/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/modules/races/services/find-race-by-id.ts
var findRaceById = (id) => {
  return prisma_default.race.findUnique({ where: { id } });
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
      message: "internal server error"
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  findById
});
