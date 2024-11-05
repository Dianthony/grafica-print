const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const model = require('./models')


let app=express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routes
app.post('/create', async(req, res)=>{
    let reqs = await model.Customer.create({
        'name': req.body.nameCustomer,
        'address': req.body.addressCustomer,
        'contact': req.body.contactCustomer ,
        'createdAt': new Date(),
        'updatedAt': new Date()
   });
   if(reqs){
    res.send(JSON.stringify('Cliente '+req.body.nameCustomer+' cadastrado com sucesso!!'))
   }
})

//Start Server
let port = process.env.PORT || 3000;
app.listen(port, (req, res) =>{
    console.log('Servidor rodando');
})

