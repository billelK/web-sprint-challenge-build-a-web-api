// Write your "actions" router here!
const express = require("express")
const actionsMod = require("./actions-model")
const {validateActionId, validateAction} = require("./actions-middlware")

const router = express.Router()

router.get("/", async (req,res,next) => {
    try{
        const actions = await actionsMod.get() || []
        res.status(200).json(actions)
    } catch(error) {
        next(error)
    }
})

router.get("/:id",validateActionId, (req,res,next) => {//eslint-disable-line
    res.status(200).json(req.action)
})

router.post("/",validateAction, async(req,res,next) => {
    try{
        const payload = req.body
        const newAction = await actionsMod.insert(payload)
        res.status(201).json(newAction)
    } catch(error) {
        next(error)
    }
})

router.put("/:id",validateActionId,validateAction, async(req,res,next) => {
    try {
        const {id} = req.params 
        const payload = req.body
        const updatedAction = await actionsMod.update(id,payload)
        res.status(200).json(updatedAction)
    } catch(error) {
        next(error)
    }
})

router.delete("/:id", validateActionId, async(req,res,next) => {
    try {
        const {id} = req.params
        await actionsMod.remove(id)
        res.status(200).json(req.action)
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
