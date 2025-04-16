import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import User from "./userModel";

interface ProfileAttributes {
    id: string;
    userId: string;
    name: string;
    bio: string;
    headline: string;
    photoUrl?: string;
    interests: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

interface ProfileCreationAttributes extends Optional<ProfileAttributes, "id"> {}

class Profile extends Model<ProfileAttributes, ProfileCreationAttributes> implements ProfileAttributes {
    public id!: string;
    public userId!: string;
    public name!: string;
    public bio!: string;
    public headline!: string;
    public photoUrl?: string;
    public interests!: string[];
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Profile.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: "id",
            },
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        headline: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        photoUrl: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        interests: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
            defaultValue: [],
        },
    },
    {
        sequelize,
        modelName: "Profile",
    }
);

// Establish association
User.hasOne(Profile, { foreignKey: "userId", as: "profile" });
Profile.belongsTo(User, { foreignKey: "userId", as: "user" });

export default Profile;
