const { nextTick } = require('process')
const Estadio = require('../models/estadio.model')


const save = async(req, res, next) => {
    try{
        const dados = req.body
        const newEstadio = new Estadio(dados)
        const savedEstadio = await newEstadio.save()
        if(!savedEstadio){
            throw new Error('Sem sucesso no salvamento do estadio')
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
            throw new Error(`Estadio com id ${id} nao encontrado`)
        }
        res.status(200).json(estadio)
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
            throw new Error(`Estadio com id ${id} nao encontrado`)
        }
        const updatedStadio = await Estadio.findByIdAndUpdate(id, dados, {new: true})
        res.status(200).json({
            message: `Estadio ${updatedStadio.get('name')} atualizado com sucesso`
        })
    }catch(err){
        next('Falha ao atualizar dados do estadio', err)
    }
}

const deleteIt = async (req, res, next) =>{
    try{
        const id = req.params.id
        const estadio = await Estadio.findById(id)
        if(!estadio){
            throw new Error(`Estadio com id ${id} nao encontrado`)
        }
        await Estadio.findByIdAndDelete(id)
        res.status(200).json({message: `Estadio ${estadio.get('name')} foi deletado`})
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