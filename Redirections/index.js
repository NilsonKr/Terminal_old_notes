const fs = require('fs');
const { Transform } = require('stream');
const utils = require('util');
const { exec } = require('child_process');

const readableStream = fs.createReadStream(__dirname + '/example.txt', {
	encoding: 'utf-8',
});

const writeableStream = fs.createWriteStream(__dirname + '/example.js');

//Tranform
function AddSucces() {
	Transform.call(this);
}

utils.inherits(AddSucces, Transform);

AddSucces.prototype._transform = function (chunk, encod, cb) {
	const chunkSucces = `${chunk.toString()} \nconsole.log('Stream Succesfully')`;

	this.push(chunkSucces);
	cb();
};

//Execute

const success = new AddSucces();

function main() {
	readableStream.pipe(success).pipe(writeableStream);

	exec('node example.js > results.txt', (err, stdout, stderr) => {
		if (err) {
			console.log(err);
			return false;
		}

		console.log(stdout);
	});
}

main();
