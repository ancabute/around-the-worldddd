const express = require('express')
const app = express()



const Sequelize = require('sequelize')

const sequelize = new Sequelize('travel', 'root', '', {
    dialect: "mysql",
    host: "localhost"
})

sequelize.authenticate().then(() => {
    console.log("Connected to database")
}).catch((err) => {
    console.log(err)
})

const Users = sequelize.define('users', {
    idUser: Sequelize.INTEGER,
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    age: Sequelize.INTEGER, 
    sex: Sequelize.STRING, 
    phone:Sequelize.STRING, 
    mail:Sequelize.STRING, 
    password:Sequelize.STRING
    
})

const Accounts = sequelize.define('accounts', {
    mail:Sequelize.STRING, 
    password:Sequelize.STRING, 
    idUser: Sequelize.INTEGER,
})

const Reservations = sequelize.define('reservations', {
    idReservation: Sequelize.INTEGER,
    idUser: Sequelize.INTEGER,
    idFlightReservation: Sequelize.INTEGER, 
    idHotelReservation: Sequelize.INTEGER
})

const FlightReservations = sequelize.define('flightReservations', {
    idFlightReservation: Sequelize.INTEGER,
    idFlight: Sequelize.INTEGER, 
    seat: Sequelize.STRING, 
    typeClass: Sequelize.STRING, 
    priceFlight: Sequelize.DOUBLE
    })

const Flights = sequelize.define('flights',{
    idFlight: Sequelize.INTEGER, 
    departureDate: Sequelize.DATE, 
    arrivalDate: Sequelize.DATE,
    airline: Sequelize.STRING, 
    departureCity: Sequelize.STRING, 
    arrivalCity: Sequelize.STRING
} )

const HotelReservations = sequelize.define('hotelReservations', {
    idHotelReservation: Sequelize.INTEGER,
    idHotel: Sequelize.INTEGER, 
    priceHotel: Sequelize.DOUBLE, 
    checkIn: Sequelize.DATEONLY, 
    checkOut: Sequelize.DATEONLY, 
    roomsBooked: Sequelize.INTEGER
    
})

const Hotels = sequelize.define('hotels', {
    idHotel: Sequelize.INTEGER,
    idCity: Sequelize.INTEGER, 
    hotelName: Sequelize.STRING, 
    hotelAddress: Sequelize.STRING, 
    stars: Sequelize.STRING, 
    description: Sequelize.TEXT
})

const Attractions = sequelize.define('attractions', {
    idAttraction: Sequelize.INTEGER, 
    attractionName: Sequelize.STRING, 
    idCity: Sequelize.INTEGER
})

const Cities = sequelize.define('cities', {
    idCity: Sequelize.INTEGER, 
    cityName: Sequelize.STRING, 
    country: Sequelize.STRING
})

const Payments = sequelize.define('payments', {
    idPayment: Sequelize.INTEGER, 
    cardHolder: Sequelize.STRING,
    cardType: Sequelize.STRING, 
    cardNumber: Sequelize.INTEGER,
    expiringDate:Sequelize.DATEONLY,
    cvv: Sequelize.INTEGER
})

app.get('/createdb', (request, response) => {
    sequelize.sync({force:true}).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        console.log(err)
        response.status(200).send('could not create tables')
    })
})

app.use(express.json())
app.use(express.urlencoded())

//================USERS=============================================

//definire endpoint POST /users
//inregistrare date
app.post('/users', (request, response) => {
    Users.create(request.body).then((result)=> {
        response.status(201).json(result)
    })
})

//definire endpoint GET /users
//preluare date

app.get('/users', (request, response) => {
    Users.findAll().then((messages)=> {
        response.status(200).json(messages)
    })
})

app.get('/users/:id', (request, response) => {
    response.status(200).send('Not implemented')
})

//metoda put
app.put('/users/:id', (request, response) => {
    Users.findById(request.params.id).then((message) => {
        if(message) {
            message.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

//definire endpoint DELETE /users:id

app.delete('/users/:id', (request, response) => {
    Users.findById(request.params.id).then((message) => {
        if(message) {
            message.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

//=========================ACCOUNTS========================================

//definire endpoint POST /accounts
//inregistrare date
app.post('/accounts', (request, response) => {
    Accounts.create(request.body).then((result)=> {
        response.status(201).json(result)
    })
})

//definire endpoint GET /accounts
//preluare date

app.get('/accounts', (request, response) => {
    Accounts.findAll().then((messages)=> {
        response.status(200).json(messages)
    })
})

app.get('/accounts/:id', (request, response) => {
    response.status(200).send('Not implemented')
})

//metoda put
app.put('/accounts/:id', (request, response) => {
    Accounts.findById(request.params.id).then((message) => {
        if(message) {
            message.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

//definire endpoint DELETE /accounts:id

app.delete('/accounts/:id', (request, response) => {
    Accounts.findById(request.params.id).then((message) => {
        if(message) {
            message.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

//=================================RESERVATIONS==============================
//definire endpoint POST /reservations
//inregistrare date
app.post('/reservations', (request, response) => {
    Reservations.create(request.body).then((result)=> {
        response.status(201).json(result)
    })
})

//definire endpoint GET /reservations
//preluare date

app.get('/reservations', (request, response) => {
    Reservations.findAll().then((messages)=> {
        response.status(200).json(messages)
    })
})

app.get('/reservations/:id', (request, response) => {
    response.status(200).send('Not implemented')
})

//metoda put
app.put('/reservations/:id', (request, response) => {
    Reservations.findById(request.params.id).then((message) => {
        if(message) {
            message.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

//definire endpoint DELETE /reservations:id

app.delete('/reservations/:id', (request, response) => {
    Reservations.findById(request.params.id).then((message) => {
        if(message) {
            message.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})



//=========================FLIGHT RESERVATIONS=============================

//definire endpoint POST /flightReservations
//inregistrare date
app.post('/flightReservations', (request, response) => {
    FlightReservations.create(request.body).then((result)=> {
        response.status(201).json(result)
    })
})

//definire endpoint GET /accounts
//preluare date

app.get('/flightReservations', (request, response) => {
    FlightReservations.findAll().then((messages)=> {
        response.status(200).json(messages)
    })
})

app.get('/flightReservations/:id', (request, response) => {
    response.status(200).send('Not implemented')
})

//metoda put
app.put('/flightReservations/:id', (request, response) => {
    FlightReservations.findById(request.params.id).then((message) => {
        if(message) {
            message.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

//definire endpoint DELETE /accounts:id

app.delete('/flightReservations/:id', (request, response) => {
    FlightReservations.findById(request.params.id).then((message) => {
        if(message) {
            message.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

//=======================================FLIGHT===================================

//definire endpoint POST /flights
//inregistrare date
app.post('/flights', (request, response) => {
    Flights.create(request.body).then((result)=> {
        response.status(201).json(result)
    })
})

//definire endpoint GET /accounts
//preluare date

app.get('/flights', (request, response) => {
    Flights.findAll().then((messages)=> {
        response.status(200).json(messages)
    })
})

app.get('/flights/:id', (request, response) => {
    response.status(200).send('Not implemented')
})

//metoda put
app.put('/flights/:id', (request, response) => {
    Flights.findById(request.params.id).then((message) => {
        if(message) {
            message.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

//definire endpoint DELETE /accounts:id

app.delete('/flights/:id', (request, response) => {
    Flights.findById(request.params.id).then((message) => {
        if(message) {
            message.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

//==========================PAYMENTS=========================

//definire endpoint POST /payments
//inregistrare date
app.post('/payments', (request, response) => {
    Payments.create(request.body).then((result)=> {
        response.status(201).json(result)
    })
})

//definire endpoint GET /accounts
//preluare date

app.get('/payments', (request, response) => {
    Payments.findAll().then((messages)=> {
        response.status(200).json(messages)
    })
})

app.get('/payments/:id', (request, response) => {
    response.status(200).send('Not implemented')
})

//metoda put
app.put('/payments/:id', (request, response) => {
    Payments.findById(request.params.id).then((message) => {
        if(message) {
            message.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

//definire endpoint DELETE /accounts:id

app.delete('/payments/:id', (request, response) => {
    Payments.findById(request.params.id).then((message) => {
        if(message) {
            message.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})

app.use('/', express.static('public'))
app.listen(process.env.PORT, process.env.IP);