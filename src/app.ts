import express from 'express';
import { Server } from './api/server';
import { createServer, Server as HttpServer } from 'http';

(async function main() {
	try {

		// Init express server
		const app: express.Application = new Server().app;
		const server: HttpServer = createServer(app);

		// Start express server
		server.listen(3000);

		server.on('listening', () => {
			console.log(`node server is listening on port 3000 in development mode`);
		});

		server.on('close', () => {
			console.log('node server closed');
		});
	} catch (err) {
		console.log(err.stack);
	}
})();

//TODO:  1- Implementar o provider de Geolocalizacao do Google e outro a definir
//TODO:  2- Implementar os testes unitários das camadas: controller, provider e service
//TODO:  3- Implementar o teste integrado das camadas: controller, service e provider
