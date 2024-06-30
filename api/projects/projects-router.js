// Write your "projects" router here!
const express = require("express")
const porjectsMod = require("./projects-model")
const {validateProjectId, validateProject} = require("./projects-middleware")
const router = express.Router()

router.get("/", async (req,res,next) => {
    try{
        const projects = await porjectsMod.get() || []
        res.status(200).json(projects)
    } catch(error) {
        next(error)
    }
})

router.get("/:id",validateProjectId, (req,res,next) => {//eslint-disable-line
    res.status(200).json(req.project)
})

router.post("/",validateProject, async(req,res,next) => {
    try{
        const payload = req.body
        const newProject = await porjectsMod.insert(payload)
        res.status(201).json(newProject)
    } catch(error) {
        next(error)
    }
})

router.put("/:id",validateProjectId,validateProject, async(req,res,next) => {
    try {
        const {id} = req.params 
        const payload = req.body
        
        const updatedProject = await porjectsMod.update(id,payload)
        res.status(200).json(updatedProject)
    } catch(error) {
        next(error)
    }
})

router.delete("/:id", validateProjectId, async(req,res,next) => {
    try {
        const {id} = req.params
        await porjectsMod.remove(id)
        res.status(200).json(req.project)
    } catch(error) {
        next(error)
    }
})

router.get("/:id/actions",validateProjectId, async(req,res,next) => {
    try {
        const {id} = req.params
        const actions = await porjectsMod.getProjectActions(id)
        res.status(200).json(actions)
    } catch(error) {
        next(error)
    }
})

router.use((error, req, res, next) => { //eslint-disable-line
    res.status(error.status || 500)
    .json({
        status: error.status || 500,
        message : error.message
    })
})

module.exports = router