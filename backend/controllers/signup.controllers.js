const db = require('../models')
const Signup = db.signup;
const twilio = require('twilio');
const accountSid = 'ACccf9c0127c16da25219ec6e4c795cf0c';
const authToken = '58a78b281fa2d17b20051c1d824bc459';
const client = new twilio(accountSid, authToken);
const speakeasy = require('speakeasy');


const signup = async (req, res) => {
    const phone = req.body.phone
    Signup.findOne({ where: { phone: req.body.phone } }).then((x) => {
        const secret = speakeasy.generateSecret();
        const otp = speakeasy.totp({
            secret: secret.base32,
            encoding: 'base32',
            // step: 10, // OTP changes every 10 seconds
            window: 10, // Allow the current OTP and the next one to be valid
            // expires: 10 // OTP expires in 10 seconds
        });
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
                    if (result[0] === 1) {
                        console.log('User updated successfully');
                    } else {
                        console.log('User not found');
                    }
                })
                .catch((error) => {
                    console.error('Error updating user:', error);
                });
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
            const signup = new Signup({
                phone: req.body.phone,
                otp: otp,
            });
            signup.save(function (err) {
                if (err) {
                    return res.json({ message: false, err: err });
                }
                return res.json({ message: true, data: signup });
            });
        }
    })
}


const verifyOtp = async (req, res) => {
    const phone = req.body.phone
    const otp = req.body.otp
    Signup.findOne({ where: { phone: req.body.phone } }).then((x) => {
        // console.log(x);
        if (x.otp == req.body.otp) {
            Signup.update(
                { otp: '' },
                { where: { phone: req.body.phone } }
            )
                .then((result) => {
                    if (result[0] === 1) {
                        console.log('User updated successfully');
                    } else {
                        console.log('User not found');
                    }
                })
        }
    })
}


module.exports = { signup, verifyOtp };