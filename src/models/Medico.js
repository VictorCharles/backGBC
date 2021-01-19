const { Model, DataTypes } = require('sequelize');

class Medico extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            crm: DataTypes.INTEGER,              
            telefoneFixo: DataTypes.STRING,
            telefoneCelular: DataTypes.STRING,
            cep: DataTypes.STRING,
            isDeleted: DataTypes.TINYINT,
        }, { sequelize, modelName: 'tb_medicos',  })
        Medico.removeAttribute('id')
        
    }
    static associate(models) {
         this.hasMany(models.tb_espes, { keyType: DataTypes.INTEGER, foreignKey: 'med_crm', as: 'especialidades', sourceKey: 'crm'});
        
    }
}
module.exports = Medico
