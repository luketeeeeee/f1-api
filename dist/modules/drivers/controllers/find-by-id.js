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

// src/modules/drivers/controllers/find-by-id.ts
var find_by_id_exports = {};
__export(find_by_id_exports, {
  findById: () => findById
});
module.exports = __toCommonJS(find_by_id_exports);

// src/modules/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient();
var prisma_default = prisma;

// src/modules/drivers/services/find-driver-by-id.ts
var findDriverById = (id) => {
  return prisma_default.driver.findUnique({ where: { id } });
};

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  findById
});
