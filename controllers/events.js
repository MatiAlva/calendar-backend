const { response } = require('express')
const { body } = require('express-validator')
const Evento = require('../models/Evento')


const getEvento = async (req, res = response) => {

    const eventos = await Evento.find().populate('user', 'name')


    res.json({
        ok: true,
        eventos
    })
}

const crearEvento = async (req, res = response) => {

    const evento = new Evento(req.body)

    try {

        evento.user = req.uid

        const eventGuardado = await evento.save()
        res.json({
            ok: true,
            eventGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarEvento = async (req, res = response) => {

    const eventId = req.params.id
    const uid = req.uid

    try {

        const evento = await Evento.findById(eventId)
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Elemento con ese id no existe'
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventId, nuevoEvento, { new: true }) //true: que me retornes los datos actualizados
        res.json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}



const eliminarEvento = async (req, res = response) => {

    const eventId = req.params.id
    const uid = req.uid

    try {

        const evento = await Evento.findById(eventId)
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Elemento con ese id no existe'
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            })
        }

        await Evento.findByIdAndDelete(eventId)

        res.json({
            ok: true
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getEvento,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
