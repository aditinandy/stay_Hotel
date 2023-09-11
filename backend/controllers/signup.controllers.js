const db = require('../models')
const Signup = db.signup;
const twilio = require('twilio');
const accountSid = 'ACf70c92edc9478311db1ef3d21b9c0d6f';
const authToken = '5e4ea0ad27ca022fd99f5f918a196586';
const client = new twilio(accountSid, authToken);
const speakeasy = require('speakeasy');


const signup = async (req, res) => {
    const phone = req.body.phone
    console.log(phone, req.body.userType);
    Signup.findOne({ where: { phone: req.body.phone, userType: req.body.userType } }).then((x) => {
        const secret = speakeasy.generateSecret();
        const otp = speakeasy.totp({
            secret: secret.base32,
            encoding: 'base32',
        });
        console.log(x);
        if (x) {
            client.messages.create({
                body: `Your OTP is: ${otp}`,
                from: '+16189522825',
                to: '+919583357202'
            })
                .then(() => {
                    res.json({ message: 'OTP generated and sent' });
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ message: 'Error sending OTP' });
                });
            Signup.update(
                { otp: otp },
                { where: { phone: req.body.phone } }
            )
                .then((result) => {
                    console.log(result);
                    if (result[0] == 1) {
                        console.log('User updated successfully');
                    } else {
                        console.log('User not found');
                    }
                })
                .catch((error) => {
                    console.error('Error updating user:', error);
                });
        } else {
            Signup.findOne({ where: { phone: req.body.phone } }).then((y) => {
                if (y) {
                    res.send([{ message: false, err: `Already exit this number as a ${y.userType}` }]);
                } else {
                    client.messages.create({
                        body: `Your OTP is: ${otp}`,
                        from: '+16189522825',
                        to: '+919583357202'
                    })
                        .then(() => {
                            res.json({ message: 'OTP generated and sent' });
                        })
                        .catch((err) => {
                            console.error(err);
                            res.status(500).json({ message: 'Error sending OTP' });
                        });
                    var signup = {}
                    if (req.body.userType == 'Customer') {
                        signup = new Signup({
                            phone: req.body.phone,
                            otp: otp,
                            userType: 'Customer'
                        });
                    } else if (req.body.userType == 'Hotel') {
                        signup = new Signup({
                            phone: req.body.phone,
                            otp: otp,
                            userType: 'Hotel'
                        });
                    }
        
                    signup.save(function (err) {
                        if (err) {
                            return res.json({ message: false, err: err });
                        }
                        return res.json({ message: true, data: signup });
                    });
                }
            })
            
        }
    })
}


const verifyOtp = async (req, res) => {
    const phone = req.body.phone
    const otp = req.body.otp
    Signup.findOne({ where: { phone: req.body.phone } }).then((x) => {
        console.log(x);
        if (x.otp == req.body.otp) {
            Signup.update(
                { otp: '' },
                { where: { phone: req.body.phone } }
            )
                .then((result) => {
                    if (result[0] === 1) {
                        console.log('User updated successfully');
                        return res.json({ message: 'OTP verifyed' });
                    } else {
                        console.log('User not found');
                    }
                })
        }
    })
}


module.exports = { signup, verifyOtp };