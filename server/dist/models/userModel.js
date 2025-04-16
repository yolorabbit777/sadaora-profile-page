"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class User extends sequelize_1.Model {
    async comparePassword(candidatePassword) {
        return await bcryptjs_1.default.compare(candidatePassword, this.password);
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.default,
    modelName: "User",
    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcryptjs_1.default.genSalt(10);
            user.password = await bcryptjs_1.default.hash(user.password, salt);
        },
    },
});
exports.default = User;
