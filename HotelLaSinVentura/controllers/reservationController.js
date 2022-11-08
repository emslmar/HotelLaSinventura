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

exports.findByEmail = function(email){
    res = []
    Reservation.findByEmail(email, function(err, reservaciones){
        if(reservaciones != undefined){
            console.log(reservaciones)
            res = reservaciones
        }else{
            res.send('No se encontro dicho usuario')
        }
    })
    return res
    
}




