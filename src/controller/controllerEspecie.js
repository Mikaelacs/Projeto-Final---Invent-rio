require("dotenv").config();
const registroEspecie = require("../model/especieRegistros");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebcadastro");
const SECRET = process.env.SECRET;


//para registrar uma espécie nova encontrada

const registroDeNovaEspecie = (req, res) => {
//aqui usa o bcrypt
  const senha = bcrypt.hashSync(req.body.password, 5);
  req.body.password = senha;

  console.log(req.body)

  const novaEspecie = new registroEspecie(req.body);
  novaEspecie.save((err) => {
    if (err) {
      return res.status(403).send({message: err.message})
    }
    res.status(201).send({
      message: "Nova espécie registrada",
    })
  })
};

// espécie por id 

  const espéciePorID = (req, res) => {
  const id = req.params.id;
  registroEspecie.findById(id, (err, especies) => {
    if (err) {
      res.status(403).send({ message: err.message });
    } else if (especies) {
      return res.status(200).send(especies);
    }
    res.status(404).send("Espécie não foi encontrada, por favor, tente novamente!");
  });
};


//atualizar a lista de espécies (por id)

  const atualizarEspecies = (req, res) => {
  const cadastro = auth(req, res);
  jwt.verify(cadastro, SECRET, (err) => {
    if (err) {
      return res.status(403).send("cadastro inválido!");
    }
    const id = req.params.id;
    const atualizaçaoEspecie = req.body;
    registroEspecie.findByIdAndUpdate(id, atualizaçaoEspecie, (err, especies) => {
      if (err) {
        return res.status(201).send({ message: err.message });
      } else if (especies) {
        return res.status(200).send("Atualização foi um sucesso!");
      }
      res.status(404).send("Registro não encontrado");
    });
  });
};


//excluir espécie
  const deletarespecies = (req, res) => {
  const cadastro = auth(req, res);
  jwt.verify(cadastro, SECRET, (err) => {
    if (err) {
      return res.status(403).send("Espécie incorreta");
    }
    const params = req.query;
    registroEspecie.deleteMany(params, (err, especies) => {
      if (err) {
        return res.status(403).send({ message: err.message });
      } else if (especies) {
        return res.status(200).send("Espécie removida com sucesso!");
      }
      res.status(404).send("Espécie não encontrada!");
    });
  });
};

module.exports = {
    registroDeNovaEspecie,
    espéciePorID,
    atualizarEspecies,
    deletarespecies,
};