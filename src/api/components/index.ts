import { Router } from 'express';

import { LocalizadorRoutes } from './localizacao/localizacao.routes';

/**
 * Init component routes
 *
 * @param {Router} router
 * @param {string} prefix
 * @returns {void}
 */
export function registerApiRoutes(router: Router, prefix: string = ''): void {
	router.use(`${prefix}/localizacao/`, new LocalizadorRoutes().router);
}