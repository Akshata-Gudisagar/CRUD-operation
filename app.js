// creating the server

const express = require('express')

let app = express()// create server

const schema = require('./schemas/app_schema');
const {customerSchema} = require('./schemas/app_schema')

const customers = require('./services/customer.js')

app.use(express.json()) //middleware

app.get('/customers', (req, res) => {
    const customer = customers.getCustomers();
    res.send(customer)
})

app.get('/customers/:code', (request, response) => {
    // console.log(request.params)
    // console.log(request.query)
    const customer = customers.getCustomer(request.params.code)
    response.send(customer)
    if(!customer){
        response.status(404).send("customer code not Found")

    }
})

app.post('/customers', (request, response) => {
    // console.log(request.body)
    const validationResult = schema.customerSchema.validate(request.body)


    if (validationResult.error) {
        response.status(500).send("Invalide customer");
        return;
    }



    const customer = customers.addCustomer(request.body)


    response.send(customer)


       if(!customer){
           response.status(404).send("Customer code not found")
       }
})

app.delete('/customers/:code',(requset,response)=>{
    if(requset.params.code){
        let deleteCustomer = customers.deleteCustomer(requset.params.code)
        if(deleteCustomer)
        response.status(200).send(deleteCustomer)
        else
           response.status(400).send(" deleted")

    }
    else{
     response.status(400).send("Invalide Customer code")
    }

})


app.listen(8000, () => {
    console.log("Application Started......")
})
