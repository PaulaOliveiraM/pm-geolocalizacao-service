import { json, NextFunction, Request, Response, Router } from "express";
import cors from "cors";
/**
 * Init Express middleware
 *
 * @param {Router} router
 * @returns {void}
 */
export function registerMiddleware(router: Router): void {
  router.use(cors({ origin: "*" }));

  router.use(json());
}

/**
 * Init Express error handler
 *
 * @param {Router} router
 * @returns {void}
 */
export function registerErrorHandler(router: Router): Response | void {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    return res.status(500).json({
      error: err.message || err,
      status: 500,
    });
  });
}
