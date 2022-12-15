const express = require('express');
const router = express.Router();
const especieController = require("../controller/controllerEspecie")
 

router.get("/buscar/:id", especieController.espéciePorID)
router.post("/", especieController.registroDeNovaEspecie)
router.patch("/alterar/:id", especieController.atualizarEspecies)
router.delete ("/deletar/:id", especieController.deletarespecies)

module.exports = router



