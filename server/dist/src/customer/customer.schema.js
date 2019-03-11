"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.CustomerSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    description: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
//# sourceMappingURL=customer.schema.js.map