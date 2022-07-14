const swaggerAutogen = require('swagger-autogen')();

const endpointFilesArray = [];
const fs = require('fs');

fs.readdirSync('./controllers/').forEach(file => {
	endpointFilesArray.push(`./controllers/${file}`);
});

const outputFile = './swagger1_output.json';
(async () => {
	await swaggerAutogen(outputFile, endpointFilesArray);
	require('./index');
})();
