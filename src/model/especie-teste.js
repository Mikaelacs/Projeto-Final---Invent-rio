const mongoose = require('mongoose');

const especieSchema = new mongoose.Schema({ 
    Espécie: { type: String },
    Local: { type: String },
    },
{
     versionKey: false
 });

const especieRegistros = mongoose.model('especie', especieSchema)

module.exports = especieRegistros 