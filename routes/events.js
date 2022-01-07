/*
    Event Routes
    /api/events/
*/

const { Router } = require("express");
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEvento, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");



const router=Router();
router.use(validarJWT)

router.get('/',getEvento);

router.post('/',
[
    check('title','El titulo es obligatorio').not().isEmpty(),
    check('start','Fecha de Inicio Obligatoria').custom(isDate),
    check('end','Fecha de Finalizacion Obligatoria').custom(isDate),
    validarCampos
],crearEvento);


router.put('/:id', actualizarEvento);

router.delete('/:id',eliminarEvento);






module.exports=router;


