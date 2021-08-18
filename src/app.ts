import express from 'express';
import { Server } from './api/server';
import { createServer, Server as HttpServer } from 'http';
import { env } from './config/globals';

(async function main() {
	try {

		// Init express server
		const app: express.Application = new Server().app;
		
		const server: HttpServer = createServer(app);


		// Start express server
		server.listen(env.NODE_PORT);

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

