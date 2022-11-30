const { nextTick } = require('process')
const Estadio = require('../models/estadio.model')


const save = async(req, res, next) => {
    try{
        const dados = req.body
        console.log(dados)
        const newEstadio = new Estadio(dados)
        console.log(newEstadio)
        const savedEstadio = await newEstadio.save()
        if(!savedEstadio){
            throw new error('Sem sucesso no salvamento do estadio')
        }
        res.status(201).json({
            message: 'Novo estadio criado'
        })

    }catch(err){
        next('Erro ao tentar registrar um novo estadio',err)
    }
}

const getAll = async (req, res, next) =>{
    try{
        const estadios = await Estadio.find()
        res.status(201).json(estadios)
    }catch(err){
        next('Erro ao buscar a lista de estadios',err)
    }
}

const getById = async (req, res, next) =>{
    try{
        const id = req.params.id
        const estadio = await Estadio.findById(id)
        if(!estadio){
            throw new error(`Estadio com id ${id} nao encontrado`)
        }
    }catch(err){
        next('Erro ao buscar estadio especifico')
    }
}

const update = async (req, res, next) => {
    try{
        const id = req.params.id
        const dados = req.body

        const estadio = await Estadio.findById(id)
        if(!estadio){
            throw new error(`Estadio com id ${id} nao encontrado`)
        }
        const updatedStadio = Estadio.findByIdAndUpdate(id, dados, {new: true})

    }catch(err){
        next('Falha ao atualizar dados do estadio', err)
    }
}

const deleteIt = async (req, res, next) =>{
    try{
        const id = req.params.id
        const estadio = Estadio.findById(id)
        if(!estadio){
            throw new error(`Estadio com id ${id} nao encontrado`)
        }
        await Estadio.findByIdAndDelete(id)
        res(201).json({message: `Estadio com id ${id} foi deletado`})
    }catch(err){
        next('Falha ao deletar estadio',err)
    }

}


module.exports = {
    save,
    getAll,
    getById,
    update,
    deleteIt
}