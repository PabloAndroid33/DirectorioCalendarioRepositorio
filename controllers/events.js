const {response}=require('express');
const Evento = require('../models/Evento');

const getEvento=async(req, res=response)=>{

    const eventos=await Evento.find().populate('user','name');

    res.json({
        ok:true,
        eventos
    })
}


const crearEvento=async(req, res=response)=>{

    //console.log(req.body); 
    const evento=new Evento(req.body);

    try {
        evento.user=req.uid;
        const eventoGuardado=await evento.save();
        res.json({
            ok:true,
            evento:eventoGuardado
        })
        
    } catch (error) {
        console.log(500);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }
    res.json({
        ok:true,
        msg:'crearEvento'
    })
}

const actualizarEvento=async(req, res=response)=>{

    const eventoId=req.params.id
    const uid=req.uid;
    try {
        const evento=await Evento.findById(eventoId);
        if (!evento) {
           return res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }
        if(evento.user.toString()!==uid){
            return res.status(401).json({
                ok:false,
                msg:'no tiene permiso de editar este evento'
            })
        }

        const nuevoEvento={
            ...req.body,
            user:uid
        }

        const eventoActualizado=await Evento.findByIdAndUpdate(eventoId,nuevoEvento,{new:true});
        res.json({
            ok:true,
            evento:eventoActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el Administrador'
        })
    }

   
}

const eliminarEvento=async(req, res=response)=>{

    const eventoId=req.params.id
    const uid=req.uid;
    try {
        const evento=await Evento.findById(eventoId);
        if (!evento) {
           return  res.status(404).json({
                ok:false,
                msg:'Evento no existe por ese id'
            })
        }
        if(evento.user.toString()!==uid){
            return res.status(401).json({
                ok:false,
                msg:'no tiene permiso de eliminar este evento'
            })
        }


       await Evento.findByIdAndRemove(eventoId);
        res.json({
            ok:true
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el Administrador'
        })
    }
}



module.exports={
    getEvento,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}