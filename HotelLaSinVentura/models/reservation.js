const mongoose = require('mongoose')
const Schema = mongoose.Schema

let reservationSchema = new Schema({
    checkin: String,
    checkout: String,
    guests: Number,
    email: String,
    singleRoom: Number,
    doubleRoom: Number,
    tripleRoom: Number,
    price: Number
})

reservationSchema.statics.add = function(aReservation, cb){
    this.create(aReservation, cb)
}

reservationSchema.statics.findByEmail = function(email, cb){
    return this.find({email: email}, cb).lean()
}



module.exports = mongoose.model('Reservation', reservationSchema)