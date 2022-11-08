let Room = require('../models/room')


exports.allRooms = function(req, res){
    Room.allRooms(function(err,rooms){
        let guests = req.body.guests;
        let tripleRooms = 0;
        let doubleRooms = 0;
        let singleRooms = 0;

        if(guests == 6){
            tripleRooms = 2;
        }else if(guests == 5){
            tripleRooms = 1;
            doubleRooms = 1;
        }else if(guests == 4){
            doubleRooms = 2;
        }else if(guests == 3){
            doubleRooms = 1
            singleRooms = 1
        }else if(guests == 2){
            doubleRooms = 1
        }else if(guests == 1){
            singleRooms = 1
        }
        console.log(doubleRooms)
              res.render('showAllRooms', {Rooms: rooms, isLogged:true, checkin:req.body.checkin, checkout:req.body.checkout, guests:req.body.guests, singleRooms:singleRooms, doubleRooms:doubleRooms, tripleRooms:tripleRooms, email:"lol"});
            
    })
    
}