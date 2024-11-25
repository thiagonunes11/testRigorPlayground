require('dotenv').config({ path: '../.env' });
const express = require("express");
var postmark = require("postmark");
const app = express();
app.use(express.json());
var randomnum = -1;

var client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
const cors = require("cors");
app.use(cors());

if (!process.env.POSTMARK_API_KEY) {
    throw new Error("POSTMARK_API_KEY is missing in environment variables.");
}
if (!process.env.POSTMARK_EMAIL) {
    throw new Error("POSTMARK_EMAIL is missing in environment variables.");
}

// Using Postmark to send the email
app.post("/send-email", async (req, res) => {
    const { email } = req.body;
    randomnum = Math.floor(100000 + Math.random() * 900000);
    try{
        await client.sendEmail({
        "From": process.env.POSTMARK_EMAIL,
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
