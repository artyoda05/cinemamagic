// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cinemamagic4@gmail.com',
        pass: '12345Art'
    }
});

exports.sendMail = functions.https.onCall( data => {
      
    // getting dest email by query string
    let seats = '';
    data.tickets.forEach(element => {
        seats += `<b>${element.row} row ${element.seat} seat</b><br>`;
    });


    const mailOptions = {
        from: 'Cinemamagic <cinemamagic4@gmail.com>', // Something like: Jane Doe <janedoe@gmail.com>
        to: data.dest,
        subject: 'Cinemamagic reservation', // email subject
        html: `
            <h3>Hello ${data.dest}.</h3>
            <p> Here is your ticket${data.tickets.length !== 1 ? 's' : ''} for ${data.title} at ${data.time}.<br>Enjoy the film.</p>
            <p>${seats}</p>
        ` // email content in HTML
    };

    // returning result
    return transporter.sendMail(mailOptions)
            .then(info => {
                return info;
            }).catch(err => {
                return err;
            });    
});
