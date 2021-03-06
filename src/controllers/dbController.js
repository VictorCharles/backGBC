const Medico = require('../models/Medico')
const Especialidade = require('../models/Especialidade');




function isEmpty(response) {
    return !Object.keys(response).length
}

module.exports = {
    async  getMedEspecialidade(req,res){ 
        const especialidade = await Especialidade.findAll({ where:{ med_crm:req.params.crm  }}
        );
        res.json(especialidade)
                
    },

  
    async postEspecialidade(req, res) {
        const {especialidade , med_crm  } = req.body;        
        const medico = await Medico.findAll({where: {crm : med_crm}}, {include: {association: "especialidades"}});        
        if (!medico) {
           return res.status(400).json({ error: 'User not found' });
        }
        const espe = await Especialidade.create({
            especialidade,
            med_crm,
        });
        return res.json(espe);
    },
   

    async searchDoctor(req, res) {
        const {crm} = req.params;
        const medico = await Medico.findAll({
          
            where: {crm : crm},  
        });
        return res.json(medico)
    },

    

    async postDoctor(req, res) {
        const medico = await Medico.create({
            nome: req.body.nome,
            crm: req.body.crm,
            telefoneFixo: req.body.telefoneFixo,
            telefoneCelular: req.body.telefoneCelular,
            cep: req.body.cep
        })
            res.json(medico)
        
    },

    async getDoctorsDeleted(req, res) {
        const medico = await Medico.findAll({ where: { isDeleted: "1", } }
        );
          res.json(medico)
                  
        },
        
        async getEspecialidade(req, res) {
            const especialidade = await Especialidade.findAll(/* { 
                include: { association: "medico", }
            } */
            );
            res.json(especialidade)
            
        },
        delMedEspecialidade(req,res) {        
            Especialidade.destroy({
                where: {
                    med_crm: req.body.crm
                }
            })
        },
    
        
        getDoctorsNoDeleted(req, res) {
            Medico.findAll(
                {where: { isDeleted: "0", }} ,
                {include: { association: "especialidades"} },    
                
            ).then (medico =>{
                res.json(medico)
            })
                    
        },
        
        softDeleteDoctor(req, res) {
            Medico.update({
                isDeleted: "1"
            }, {
                returning: true, where: {
                crm: req.params.crm
            }
        }).then(response => {
            console.log(response)
            if (response.includes(1)) {
                res.sendStatus(200)
            } else {
                res.sendStatus(404)
            }
        })
    },
    undoSoftDeleteDoctor(req, res) {
        Medico.update({
            isDeleted: "0"
        }, {
            returning: true, where: {
                crm: req.params.crm
            }
        }).then(response => {
            console.log(response)
            if (response.includes(1)) {
                res.sendStatus(200)
            } else {
                res.sendStatus(404)
            }
        })
    },
    deleteAllSoftDoctor(req, res) {
        Medico.destroy({
            where: {
                isDeleted: "1"
            }
        }).then(response => {
            console.log(response)
            if (response > 0) {
                res.json(`Excluído ${response} médicos`)
            } else {
                res.json('Nenhum médico excluído')
            }
        })
    },

    hardDeleteDoctor(req, res) {
        Medico.destroy({
            where: {
                crm: req.params.crm
            }
        }).then(response => {
            console.log(response)
            if (response > 0) {
                res.json(`Excluído ${response} médicos`)
            } else {
                res.json('Nenhum médico excluído')
            }
        })
    },

    updateDoctor(req, res) {
        Medico.update({
            nome: req.body.nome,
            telefoneFixo: req.body.telefoneFixo,
            telefoneCelular: req.body.telefoneCelular,
            cep: req.body.cep,
            isDeleted: '0'
        }, {
            returning: true, where: {
                crm: req.params.crm
            }
        }).then(response => {
            console.log(response)
            if (response.includes(1)) {
                res.sendStatus(200)
            } else {
                res.sendStatus(404)
            }
        })
    }

}




