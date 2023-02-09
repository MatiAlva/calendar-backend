/*
    Rutas de Uusarios / Auth
    host + /api/auth

*/

const { Router } = require('express')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')
const router = Router()
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validarCampos')
const { validarJWT } = require('../middlewares/validarJWT')

router.post(
    '/new',
    [
        //* middlewares
        check('name', 'El nombre es obligarotio').not().isEmpty(),
        check('email', 'El email es obligarotio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        validarCampos,
    ],
    crearUsuario
)

router.post(
    '/',
    [
        //* middlewares
        check('name', 'El nombre debe de ser de 6 caracteres').not().isEmpty().isLength({ min: 6 }),
        check('email', 'El email es obligarotio').isEmail(),
        validarCampos,
    ],
    loginUsuario
)

router.get('/renew', validarJWT, revalidarToken)



module.exports = router