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

const Technique = sequelize.define<TechniqueInstance>('Technique', {
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

export interface CommentInstance extends Model {
    id: number;
    body: string;
    TechniqueId: number;
}

const Comment = sequelize.define<CommentInstance>('Comment', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },    
    body: {
        type: DataTypes.STRING
    },        
    TechniqueId: { 
        type: DataTypes.INTEGER,
        references: {
          model: Technique,
          key: 'id'
        }
    }
}, {
    tableName: 'comments',
    timestamps: false
});

Technique.hasMany(Comment)

Comment.belongsTo(Technique);

export default {
    Comment,
    Technique
}