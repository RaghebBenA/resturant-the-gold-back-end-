const express = require('express')
const bodyParser = require('express')

const dishRouter = express.Router()

dishRouter.use(bodyParser.json())

dishRouter.route('/')

    /* this is the http verbs for dishes object of the application */
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-type', 'text/plain');
        next()
    })
    .get((req, res, next) => {
        res.end('Will send all the dishes to you!')
    })
    .post((req, res, next) => {
        res.end('will add the dish: ' + req.body.name + ' with destails ' + req.body.desciption)
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT  operation not supported on /dishes')
    })
    .delete((req, res, next) => {
        res.end('Deleting all the dishes !')
    })


    dishRouter.route('/:dishId')

    .get((req, res, next) => {
        res.end('Will send details of the dish:' + req.params.dishId + ' to you')
    })
    
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('post operation not supported on /dishes / ' +req.params.dishId)
    })
    
    .put((req, res, next) => {
        res.write('updating the dish: ' + req.params.dishId)
        res.end('Will update the dish: ' +req.body.name + ' with details: ' + req.body.desciption)
    })
    
    .delete((req, res, next) => {
        res.end('Deleting dish: ' + req.params.dishId)
    })

    module.exports = dishRouter