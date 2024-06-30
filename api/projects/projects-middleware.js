// add middlewares here related to projects
const porjectsMod = require("./projects-model")

async function validateProjectId (req,res,next) {
    try{
        const {id} = req.params
        const project = await porjectsMod.get(id)
        if(project) {
            req.project = project
            next()
        } else {
            res.status(404).json({message: `Project with id: ${id} was not found!`})
        }
    } catch(error) {
        next(error)
    }
}

async function validateProject (req,res,next) {
    try{
        const payload = req.body
        if(!payload.name || !payload.description || !(payload.completed !== undefined) ) {
            res.status(400).json({
                status: "400 Bad Request",
                message: "The fields Name, Description and Completed are required !"
            })
        } else {
            next()
        }
    } catch(error) {
        next(error)
    }
}

module.exports = {
    validateProject,
    validateProjectId
}