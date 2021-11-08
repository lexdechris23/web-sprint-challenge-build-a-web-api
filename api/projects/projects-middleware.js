const Projects = require('../projects/projects-model')

async function validateProjectId (req, res, next){
    try{
        const {id} = req.params
        const project = await Projects.get(id)
        if(project){
            req.project = project
            next()
        }else{
            next({status: 404, message: 'no project found'})
        }
    }catch(err){
        next(err)
    }
}

async function validateProject (req, res, next){
    const {name, description, completed} = req.body
    if(!name || !name.trim()){
        res.status(400).json({message: 'missing required field: name'})
    }else if(!description || !description.trim()){
        res.status(400).json({message: 'missing required field: description'})
    }else{
        req.name = name.trim()
        req.description = description.trim()
        req.completed = completed
        next()
    }
}

module.exports = {validateProjectId, validateProject}
