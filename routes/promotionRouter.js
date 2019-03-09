const express = require('express')
const bodyParser = require('body-parser')

const promotionRouter = express.Router()


promotionRouter.use(bodyParser.json())

promotionRouter.route('/')

.all((req,res,next) =>{
    res.statusCode = 200
    res.setHeader('Content-type','text/plain')
    next()
})
.get((req,res,next) =>{
    res.end('Will send the promotion for you')
})
.post((req,res,next) =>{
    res.end('Will add the promotion: ' + req.body.name + 
    ' with deatials ' + req.body.desciption)
})
.put((req,res,next) =>{
    res.statusCode = 403;
    res.end('Put method is not supported on /promotion')
})
.delete((req,res,next) =>{
    res.end('deleting all the promotions')
})

promotionRouter.route('/:promotionId')

.get((req,res,next) =>{
    res.end('Will send the details of the promotion: ' 
    + req.params.promotionId + ' to you')
})
.post((req,res,next) =>{
    res.statusCode = 403
    res.end('post operation not supported on /promotionId')
})
.put((req,res,next) =>{
    res.write('updating the promotion: ' +req.params.promotionId)
    res.end(' will update the promotion: ' + 
    req.body.name + ' with details ' + req.body.desciption)
})
.delete((req,res,next) =>{
    res.end('Deleting pormotion ' + req.params.promotionId)
})

module.exports = promotionRouter