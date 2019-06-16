var express = require('express');
var cors = require('cors');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

import Sales from './sales';

var app = express();
var router = express.Router();

app.use(bodyparser.json());

mongoose.connect('mongodb://localhost:27017/sales');

var connection  = mongoose.connection;

connection.once('open',()=>{
    console.log('Mongo is connected with sales');
});


router.route('/sales').get((req, res)=>{
    Sales.find((err, sales)=>{
        if(err)
            console.log(err);
        else
            res.json(sales);
    })
});

router.route('/sales/add').post((req,res)=>{
    var sales = new Sales(req.body);
    sales.save()
    .then(sales => {
        res.status(200).json({'sales':'Added sucessfully'});
    })
    .catch(err=>{
        res.status(400),send("failed to create new recors");
    });
});

router.route('/sales/update/:id').post((req,res) =>{
    Sales.findById(req.params.id,(err,sales)=>{
        if(!sales)
            return next(new Error('could not load Document'));
        else {
            sales.name = req.body.name;
            sales.mail = req.body.mail;
            sales.working_route = req.body.working_route;
            sales.phone_no = req.body.phone_no;

            sales.save().then(sales=>{
                res.json('Updated done');
            }) .catch(err =>{
                res.status(4000).send('Updated fail');
            });
        }
    });
});


router.route('/sales/delete/:id').get((req,res)=>{
    Sales.findByIdAndRemove({_id: req.params.id},(err,sales)=>{
        if(err)
            res.json(err)
        else
            res.json('Removed sucessfully');
    });
});


app.use('/',router)
app.listen(4000,()=>console.log("Express running on 4000"));