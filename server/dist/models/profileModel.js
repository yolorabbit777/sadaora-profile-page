"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const userModel_1 = __importDefault(require("./userModel"));
class Profile extends sequelize_1.Model {
}
Profile.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: userModel_1.default,
            key: "id",
        },
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    bio: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    headline: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    photoUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    interests: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
    },
}, {
    sequelize: db_1.default,
    modelName: "Profile",
});
// Establish association
userModel_1.default.hasOne(Profile, { foreignKey: "userId", as: "profile" });
Profile.belongsTo(userModel_1.default, { foreignKey: "userId", as: "user" });
exports.default = Profile;
