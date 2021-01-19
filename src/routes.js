const express = require('express')
const routes = new express.Router();
const dbController = require('./controllers/dbController')

routes.get('/', (req, res) => {
  res.send('Pagina inicial sem nenhum método')
})

routes.get('/medico', dbController.getDoctorsNoDeleted) /* okay */

routes.post('/medico', dbController.postDoctor) /* okay */

routes.get('/espe', dbController.getEspecialidade) /* okay */

/* routes.get('/medico/:crm/espe' dbController.getMedEspecialidade)
 */
routes.post('/medico/:crm/espe', dbController.postEspecialidade) /* okay */

routes.get('/medico/:crm', dbController.searchDoctor) /* okay */

routes.put('/medico/:crm/soft', dbController.softDeleteDoctor)/* okay */

routes.put('/medico/:crm/undoSoft', dbController.undoSoftDeleteDoctor)/* okay */

routes.delete('/medico/:crm/delete', dbController.hardDeleteDoctor)/* okay */

routes.delete('/medico/delete', dbController.deleteAllSoftDoctor)/* okay */

routes.put('/medico/:crm/update', dbController.updateDoctor) /* okay */

module.exports = routes
