var nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cmpe281group13@gmail.com',
    pass: 'group13cmpe281'
  }
});

// var mailOptions = {
//     from: 'youremail@gmail.com',
//     to: 'myfriend@yahoo.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
//   };
  
const sendMail = (mailOptions) => {
    transporter.sendMail({...mailOptions,from:"cmpe281group13@gmail.com"}, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
    })
};



module.exports = {transporter,sendMail};