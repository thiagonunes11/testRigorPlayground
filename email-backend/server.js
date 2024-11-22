const express = require("express");
//const nodemailer = require("nodemailer");
//const sendgrid = require("@sendgrid/mail");
var postmark = require("postmark");
const app = express();
app.use(express.json());
var randomnum = -1;

//sendgrid.getApiKey("");
var client = new postmark.ServerClient(""); // PUT THE KEY HERE
const cors = require("cors");
app.use(cors());

// Using nodemailer

//app.post("/send-email", async (req, res) => {
//    const { email } = req.body;
//
//    const transporter = nodemailer.createTransport({
//        service: "gmail",
//        auth: {
//            user: "CHANGE-ME@gmail.com",    // CREATE A NEW GMAIL ACCOUNT
//            pass: "CHANGE-ME",              // CREATE A NEW GMAIL ACCOUNT
//        },
//    });
//
//    const randomnum = Math.floor(1000 + Math.random() * 9000);
//
//    const mailOptions = {
//        from: "CHANGE-ME@gmail.com",        // CREATE A NEW GMAIL ACCOUNT
//        to: email,
//        subject: "E-mail test",
//        text: `Your verification code is ${randomnum}.`,
//    };
//
//    try {
//        await transporter.sendMail(mailOptions);
//        res.json({ message: "E-mail sent successfully!" });
//    } catch (error) {
//        res.status(500).json({ message: "Failed to send e-mail." });
//    }
//});

// Using Sendgrid
//app.post("/send-email", async (req, res) => {
//    const { email } = req.body;
//
//    const randomnum = Math.floor(1000 + Math.random() * 9000);
//
//    const msg = {
//        to: email,
//        from: "seu-email@seudominio.com",
//        subject: "testRigor Playground Email Validation",
//        text: `Your verification code is ${randomnum}.`,
//    };
//
//    try {
//        await sendgrid.send(msg);
//        res.json({ message: "E-mail sent successfully!" });
//    } catch (error) {
//        console.error("Failed to send e-mail:", error.response.body);
//        res.status(500).json({ message: "Erro ao enviar email." });
//    }
//});


// Using Postmark
app.post("/send-email", async (req, res) => {
    const { email } = req.body;
    randomnum = Math.floor(100000 + Math.random() * 900000);
    try{
        await client.sendEmail({
        "From": "",     //PUT THE EMAIL HERE
        "To": email,
        "Subject": "tR Playground Code",
        "HtmlBody": `<strong>Hello</strong>, dear testRigor Playground user. 
            Your verification code is <strong>${randomnum}</strong>.`,
        "TextBody": `Your verification code is ${randomnum}.`,
        "MessageStream": "outbound"
    }); res.json({ message: "E-mail sent successfully!", code: randomnum});
    } catch(error){
        console.error(`Failed to send email to ${email}.`, error);
        res.status(500).json({ message: `Failed to send email to ${email}.` });
    }

});

app.post("/verify-code", async (req, res) => {
    const { typedCode } = req.body;
    if(parseInt(typedCode) === randomnum){
        randomnum = -1; //reset
        res.json({message: "The auth code is correct!"});
    } else{
        res.status(400).json({message: "Invalid auth code. Try again."})
    }

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
