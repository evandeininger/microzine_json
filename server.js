var express = require('express');
var fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors'); // addition we make
const fileUpload = require('express-fileupload'); //addition we make
var app = express();

app.use(cors());
app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(__dirname + '/public'));
// app.use('/', index);

const apiVer = '/api/v1';

app.get(`${apiVer}/json-example`, function(req, res) {
	return fs.readFile(
		`${__dirname}/mz_mocks/${req.query.template}.json`,
		(err, data) => {
			if (err) {
				return res.status(500).send(err);
			}

			let parsedData = JSON.parse(data);
			res.send(JSON.stringify(parsedData, null, 4));
		}
	);
});

app.post(`${apiVer}/upload`, (req, res) => {
	if (!req.files) {
		return res.status(400).send('File missing');
	}

	if (!req.body.templateName) {
		console.log('Need a name for the file');
		return res.status(400).send('Need a name for the file');
	}

	let file = req.files.file;

	if (file.mimetype === 'application/json') {
		file.mv(`${__dirname}/mz_mocks/${req.body.templateName}.json`, err => {
			if (err) {
				return res.status(500).send(err);
			}

			return res.json({ file: `mz_mocks/${req.body.templateName}.json` });
			console.log(res.json);
		});
	}
});

app.listen('8081');

console.log('Magic happens on port 8081');

exports = module.exports = app;
