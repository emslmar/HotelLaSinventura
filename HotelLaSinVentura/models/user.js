const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
    email: String,
    name: String,
    codigo: String,
    status: String
})

userSchema.statics.createInstance = function(email, name, codigo){
    return new this({
        email: email,
        name: name,
        codigo: codigo,
        status: 'registrado'
    })
}

userSchema.statics.allUsers = function(cb){
    return this.find({}, cb).lean()
}

userSchema.statics.findByEmail = function(email, cb){
    return this.findOne({email: email}, cb).lean()
}

userSchema.statics.findByQr = function(qr, cb){
    return this.findOne({codigo: qr}, cb).lean()
}

userSchema.statics.add = function(aUser, cb){
    this.create(aUser, cb)
}

userSchema.statics.registerUser = function(aUser, cb){
    aUser.status = 'pulsera'
    console.log(aUser.email)
    let doc = this.findOneAndUpdate({email:aUser.email}, aUser, cb)
    console.log(doc)
}


module.exports = mongoose.model('User', userSchema)