var express = require('express');
var router = express.Router();

const inventarioController = require('../controllers').inventarioController;

router.get('/', inventarioController.list);
router.get('/full', inventarioController.listFull);
router.get('/fullEnable', inventarioController.listEnableFull);
router.get('/sql', inventarioController.getSQL);
router.get('/:id', inventarioController.getById);
router.post('/', inventarioController.add);
router.put('/:id', inventarioController.update);
router.delete('/:id', inventarioController.delete);


module.exports = router;


