const postmark = require("postmark");
require("dotenv").config();

const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

exports.handler = async (event) => {
    const { email } = JSON.parse(event.body);
    const randomnum = Math.floor(100000 + Math.random() * 900000);

    if (!process.env.POSTMARK_API_KEY || !process.env.POSTMARK_EMAIL) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Missing Postmark credentials in environment variables." }),
        };
    }

    try {
        await client.sendEmail({
            From: process.env.POSTMARK_EMAIL,
            To: email,
            Subject: "tR Playground Code",
            HtmlBody: `<strong>Hello</strong>, dear testRigor Playground user. 
                Your verification code is <strong>${randomnum}</strong>.`,
            TextBody: `Your verification code is ${randomnum}.`,
            MessageStream: "outbound",
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "E-mail sent successfully!", code: randomnum }),
        };
    } catch (error) {
        console.error(`Failed to send email to ${email}.`, error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `Failed to send email to ${email}.` }),
        };
    }
};
