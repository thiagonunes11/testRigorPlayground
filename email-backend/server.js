const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());

app.post("/send-email", async (req, res) => {
    const { email } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "email@gmail.com",
            pass: "pwd",
        },
    });

    const mailOptions = {
        from: "email@gmail.com",
        to: email,
        subject: "E-mail test",
        text: "Congratulations, this e-mail was received succesfully.",
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
