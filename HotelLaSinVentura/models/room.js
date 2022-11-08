const mongoose = require('mongoose')
const Schema = mongoose.Schema

let roomSchema = new Schema({
    type: String,
    capacity: Number,
    description: String,
    price: Number
})

roomSchema.statics.allRooms = function(cb){
    return this.find({}, cb).lean()
}







module.exports = mongoose.model('Room', roomSchema)


