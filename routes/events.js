/*
    Events Router
    /api/events
*/
const { Router } = require('express')
const { check } = require('express-validator')
const { isDate } = require('../helpers/isDate')
const { validarCampos } = require('../middlewares/validar-campos')
const { getEvento, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events')
const { validarJWT } = require('../middlewares/validar-jwt')
const router = Router()


//Todas tiene que pasar la validacion del JWT
router.use(validarJWT)

// Obetener eventos
router.get('/', getEvento)

//Crear Eventos
router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos,
    ],
    crearEvento
)


//Actualiazar eventos
router.put(
    '/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
        validarCampos,
    ],
    actualizarEvento
)



//Borrar Eventos
router.delete('/:id', eliminarEvento)


module.exports = router