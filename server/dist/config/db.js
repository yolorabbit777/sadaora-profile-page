"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("./config"));
const sequelize = new sequelize_1.Sequelize(config_1.default.db.name, config_1.default.db.user, config_1.default.db.password, {
    host: config_1.default.db.host,
    port: config_1.default.db.port,
    dialect: "postgres",
    logging: config_1.default.nodeEnv === "development" ? console.log : false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});
exports.default = sequelize;
