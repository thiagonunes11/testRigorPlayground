const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.post("/send-email", async (req, res) => {
    const { email } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "CHANGE-ME@gmail.com",    // CREATE A NEW GMAIL ACCOUNT
            pass: "CHANGE-ME",              // CREATE A NEW GMAIL ACCOUNT
        },
    });

    const randomnum = Math.floor(1000 + Math.random() * 9000);

    const mailOptions = {
        from: "CHANGE-ME@gmail.com",        // CREATE A NEW GMAIL ACCOUNT
        to: email,
        subject: "E-mail test",
        text: `Your verification code is ${randomnum}.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "E-mail sent successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Failed to send e-mail." });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
