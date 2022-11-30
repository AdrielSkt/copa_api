const router = require('express').Router()
const controller = require('../controllers/estadios.controller')



router.post('/', controller.save)

router.get('/', controller.getAll)

router.get('/:id', controller.getById)

router.put('/:id', controller.update)

router.delete('/:id', controller.deleteIt)


module.exports = router 