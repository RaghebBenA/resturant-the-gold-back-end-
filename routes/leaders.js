const express = require('express')
const bodyParser = require('body-parser')

const leadersRouter = express.Router()


leadersRouter.use(bodyParser.json())

leadersRouter.route('/')

.all((req,res,next) =>{
    res.statusCode = 200
    res.setHeader('Content-type','text/plain')
    next()
})
.get((req,res,next) =>{
    res.end('Will send the leaders for you')
})
.post((req,res,next) =>{
    res.end('Will add the leaders: ' + req.body.name + 
    ' with deatials ' + req.body.desciption)
})
.put((req,res,next) =>{
    res.statusCode = 403;
    res.end('Put method is not supported on /leaders')
})
.delete((req,res,next) =>{
    res.end('deleting all the leaders')
})

leadersRouter.route('/:leadersId')

.get((req,res,next) =>{
    res.end('Will send the details of the leaders: ' 
    + req.params.leadersId + ' to you')
})
.post((req,res,next) =>{
    res.statusCode = 403
    res.end('post operation not supported on /leadersId')
})
.put((req,res,next) =>{
    res.write('updating the leaders: ' +req.params.leadersId)
    res.end(' will update the leaders: ' + 
    req.body.name + ' with details ' + req.body.desciption)
})
.delete((req,res,next) =>{
    res.end('Deleting leaders ' + req.params.leadersId)
})

module.exports = leadersRouter