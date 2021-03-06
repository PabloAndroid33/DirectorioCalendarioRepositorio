/*
Ruta de usuarios /Auth
host + /api/auth

*/


const {Router, application}=require('express');
const{check}=require('express-validator')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router=Router();


router.post('/new',[

    check('name','el nombre es obligatorio').not().isEmpty(),
    check('email','el email es obligatorio').isEmail(),
    check('password','el password debe ser de 6 caracteres').isLength({min:6}),
    validarCampos


],crearUsuario)

//lectura y parseo del body


router.post('/',[
    check('email','el email es obligatorio').isEmail(),
    check('password','el password debe ser de 6 caracteres').isLength({min:6}),
    validarCampos

],loginUsuario)


router.get('/renew',validarJWT,revalidarToken)

module.exports=router;