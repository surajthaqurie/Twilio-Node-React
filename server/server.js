// require('dotenv').config();
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// const twilio = require('twilio');

// Twilio requirements -- Texting API
const accountSid = process.env.TWILIO_ACCOUNT_SID;      // YOUR__ACCOUNT__SID 
const authToken = process.env.TWILIO_TOKEN;  // YOUR_AUTHETICATION__TOKEN
const twilioNumber = process.env.TWILIO_NUMBER

const client = require('twilio')(accountSid, authToken, {
    lazyLoading: true
});

const app = express(); // alias

app.use(cors()); // Blocks the browser from rescrticing any data

// Welcome Page For The Server
app.get('/', (req, res) => {
    res.send('Welcome To The Express Server');
});


// Twilio text
app.get('/send-text', (req, res) => {
    // Get Variables, Passed Via Query String
    const { recipient, textmessage } = req.query;
    // Send Text
    client.messages.create({
        to: '+977' + recipient,
        from: twilioNumber, // From Twilio (Twilio's Number)
        body: textmessage
    }).then((message) => console.log(message.body));
});

const port = process.env.PORT || 4000;
// Must Have Nodemon Installed, http://localhost:4000
app.listen(port, () =>
    console.log(`Server running on Port ${port}`));
