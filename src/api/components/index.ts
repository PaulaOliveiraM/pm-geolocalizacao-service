import { Router } from 'express';

import { LocalizadorRoutes } from './localizacao/localizacao.routes';

export function registerApiRoutes(router: Router, prefix: string = ''): void {
	router.use(`${prefix}/localizacao/`, new LocalizadorRoutes().router);
}