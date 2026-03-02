'use strict'
import mongoose, { Schema, model } from "mongoose";

const clasificacionSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    imagen:{
        type:String,
        required: [true, 'Es necesario que añadas una imagen para clasificar en que lugar va']
    },
    labels:{
        type:[String],
        default: []
    },
    tipo:{
        type: String,
        required: true
    },
    contenedor: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Clasificacion', clasificacionSchema);
