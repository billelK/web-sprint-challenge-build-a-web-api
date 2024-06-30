// add middlewares here related to actions
const actionsMod = require("./actions-model")
const projectsMod = require("../projects/projects-model")

async function validateActionId (req,res,next) {
    try{
        const {id} = req.params
        const action = await actionsMod.get(id)
        if(action) {
            req.action = action
            next()
        } else {
            res.status(404).json({message: `Action with id: ${id} was not found!`})
        }
    } catch(error) {
        next(error)
    }
}

async function validateAction (req,res,next) {
    try{
        const payload = req.body
        if(!payload.description || !payload.project_id || !payload.notes) {
            res.status(400).json({
                status: "400 Bad Request",
                message: "The fields description, project_id and notes are required !"
            })
        } else {
            const project = await projectsMod.get(payload.project_id)
            if(project) {
                req.project = project
                next()
            } else {
                res.status(404).json({message: `Project with id: ${payload.project_id} was not found!`})
            }
        }
    } catch(error) {
        next(error)
    }
}

module.exports = {
    validateActionId,
    validateAction
}