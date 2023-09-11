const db = require('../models')
const Registerhotel = db.registerhotel;
const Signup = db.signup;



const addHotel = async (req, res) => {
    const { hotel_name, hotel_email, hotel_no, hotel_add, sevice, security, phone, owner_id } = req.body
    Signup.findOne({ id: owner_id }).then((x) => {
        Registerhotel.findOne({ 
            $or: [ {owner_id: x.owner_id}, {hotel_name: hotel_name}, {hotel_no: hotel_no}, {hotel_add: hotel_add} ]
         }).then((y) => {
            if (y) {
                const registerhotel = Registerhotel.create({
                    hotel_name, hotel_email, hotel_no, hotel_add, sevice, security, phone, owner_id,
                    owner_id: x.id
                })
                res.send({ msg: "Successfully added", data: registerhotel })
            } else {
                res.send({ Error: "can't find the owner" })
            }
        })
    })
}


const updateHotel = async (req, res) => {
    Registerhotel.findOne({ id: req.body.id, owner_id: req.body.owner_id }).then((y) => {
        if (y) {
            const { hotel_name, hotel_email, hotel_no, hotel_add, sevice, security, phone } = req.body
            Registerhotel.findOne({
                $or: [ {owner_id: x.owner_id}, {hotel_name: hotel_name}, {hotel_no: hotel_no}, {hotel_add: hotel_add} ]
                }).then((y) => {
                const registerhotel = Registerhotel.create({
                    hotel_name, hotel_email, hotel_no, hotel_add, sevice, security, phone
                })
                res.send({ msg: "Successfully added" })
            })
            } else {
                res.send({ Error: "can't find the owner" })
            }
    })
}





module.exports = { addHotel, updateHotel };
