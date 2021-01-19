const { Model, DataTypes } = require('sequelize');




class Especialidade extends Model {
    static init(sequelize) {
        super.init({
            especialidade: DataTypes.STRING,
                
        }, { sequelize, modelName: 'tb_espes' })

        Especialidade.removeAttribute('id') 
    }

    static associate(models) {
        this.belongsTo(models.tb_medicos, { foreignKey: 'med_crm', as: 'medico', targetKey: 'crm', keyType: DataTypes.INTEGER} );
    }

}
module.exports = Especialidade

