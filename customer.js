let customers = [
    {
        code: 1,
        name: "Imran",
        city: 'Harapanahalli'
    },
    {
        code: 2,
        name: "Irfan",
        city: 'Davanagere'
    }
]

module.exports.getCustomer = (customerCode) => {
    let customer = customers.find((customer) => {
        return customer.code == customerCode
    })
    return customer

}

module.exports.getCustomers = () => {
    return customers
}


module.exports.addCustomer = (customer) => {
    customers.push(customer)
    return customer
}

module.exports.deleteCustomer = (customerCode) => {
    let customer = customers.find((value) => {
        return value.code == customerCode
    })
    if (customer) {
        const index = customers.indexOf(customer)
        customers.splice(index, 1)
    }
}