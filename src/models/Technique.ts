import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../instances/pg';

export interface TechniqueInstance extends Model {
    id: number;
    title: string;
    body: string;
    reference: string;
    link: string;
    url_image: string;
    name_image: string;
}

export const Technique = sequelize.define<TechniqueInstance>('Technique', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING,
        unique: true
    },
    body: {
        type: DataTypes.STRING
    },
    link: {
        type: DataTypes.STRING
    },
    reference: {
      type: DataTypes.STRING
    },
    url_image: {
        type: DataTypes.STRING
    },
    name_image: { 
        type: DataTypes.STRING
    }
}, {
    tableName: 'techniques',
    timestamps: false
});