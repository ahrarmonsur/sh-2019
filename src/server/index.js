const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('dist'));

app.post('/contact', (req, res) => {
	console.log(req.body);

	const transportConfig = {
		host: 'imap.dreamhost.com',
  	auth: {
  		user: 'contact@starterhacks.ca',
  		pass: 'heyo girl'
  	}
	};

	const youveGotMail = {
  	from: req.body.email,
  	to: 'contact@starterhacks.ca',
  	subject: req.body.subject,
  	text: req.body.message
	};

	const transporter = nodemailer.createTransport(transportConfig);

	transporter.sendMail(youveGotMail, (error, info) => {
  	if (error) {
  		console.log(error);
  	} else {
  		console.log('Email sent: ' + info.response);
  	}
	});
});

app.listen(8080, () => console.log('Listening on port 8080!'));
