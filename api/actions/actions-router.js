const express = require('express')
const Action = require('./actions-model')
const {validateActionId, validateAction} = require('./actions-middlware')
const router = express.Router()

router.get('/', async (req, res) => {
    try{
        const actions = await Actions.get()
        res.status(200).json(actions)
    }catch(err){
        next(err)
    }
})

router.get('/id:', validateActionId, async (req, res, next) => {
    try{
        res.json(req.action)
    }catch(err){
        next(err)
    }
})

router.post('/', async (req, res) => {
    try{
        const newAction = await Action.insert({
            project_id: req.project_id,
            description: req.description,
            notes: req.notes,
            completed: req.completed
        })
        res.status(201).json(newAction)
    }catch(err){
        next(err)
    }
})

router.put('/:id', validateActionId, validateAction, async (req, res) => {
    Action.update(req.params.id, {
        project_id: req.project_id,
        description: req.description,
        notes: req.notes,
        completed: req.completed
    })
    .then(() => {
        return Action.get(req.params.id)
    })
    .then(action => {
        res.json(action)
    })
    .catch(next)
})

router.delete('/:id', validateActionId, async (req, res, next) => {
    try{
        await Action.remove(req.params.id)
        res.json(res.Action)
    }catch(err){
        next(err)
    }
})

module.exports = router 
