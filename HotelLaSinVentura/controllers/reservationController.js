let Reservation = require('../models/reservation')


exports.findAvailable = function(req, res){
    Reservation.find({email: req.body.email}, function(err, usuario){
        res.status(200).json({
            usuario: usuario
        })
    })
}

exports.createReservation = function(reservation, res){
    console.log(reservation)
    Reservation.add(reservation)
}

exports.findByEmail = function(req, res){
    if(req.body.email != undefined){
        Reservation.findByEmail(req.body.email, function(err, reservaciones){
            if(reservaciones != undefined){
                console.log(reservaciones)
                res.render('reservaciones', {reservaciones: reservaciones, isLogged:true, email: req.body.email})
            }else{
                res.send('No se encontro dicho usuario')
            }
        })
    }

    
    
}




