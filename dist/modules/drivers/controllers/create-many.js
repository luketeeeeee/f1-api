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

// src/modules/drivers/controllers/create-many.ts
var create_many_exports = {};
__export(create_many_exports, {
  createMany: () => createMany
});
module.exports = __toCommonJS(create_many_exports);

// src/modules/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/modules/drivers/services/create-many-drivers.ts
var createManyDrivers = (drivers) => {
  return prisma_default.driver.createMany({ data: drivers, skipDuplicates: true });
};

// src/modules/drivers/controllers/create-many.ts
var createMany = (req, res) => __async(void 0, null, function* () {
  const drivers = req.body;
  try {
    const newDrivers = yield createManyDrivers(drivers);
    return res.status(200).json({
      message: "drivers successfully created",
      data: newDrivers
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error"
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createMany
});
