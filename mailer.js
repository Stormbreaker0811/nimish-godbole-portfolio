const express = require('express');
const mailer = require('nodemailer');
const bodyparser = require('body-parser');
const app = express();
const port = 3000;


app.use(bodyparser.urlencoded({ extended:true }));

//Serve the HTML form....
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

//Handle form submissions...
app.post('/send',(req,res)=>{
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let message = document.getElementById('message');
    let mobile = document.getElementById('mobile');

    //Create a Nodemailer transporter
    const transporter = mailer.createTransport({
        service: 'Gmail',
        auth:{
            user:'nimishgodbole409@gmail.com',
            pass:'nimmakgod@gmail.com'
        },
    });
    //Define the email content
    const mailOptions = {
        from: '${email}',
        to: 'nimishgodbole409@gmail.com',
        subject: 'Portfolio Contact Form Submission',
        text: 'Name: ${name}\nEmail: ${email}\nMessage: ${message}\nMobile Number: ${mobile}',
    };

    transporter.sendMail(mailOptions, (error,info) =>{
        if(error){
            console.log(error);
            res.send('Error Sending Mail');
            alert('Error while sending email.');
        }
        else{
            console.log('Email sent: '+info.response);
            res.send('Email sent successfully.');
            alert("Email sent successfully. ")
        }
    });
});
app.listen(port,() =>{
    console.log("Server is running on the port ${port}");
});