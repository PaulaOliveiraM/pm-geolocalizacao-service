import { NextFunction, Request, Response } from 'express';
import { ILocalizacaoService, LocalizacaoService } from './localizacao.service';


export class LocalizacaoController {
	private localizacaoService: ILocalizacaoService = undefined;

	constructor(localizacaoService:ILocalizacaoService){
		this.localizacaoService = localizacaoService;
	}

	/**
	 * Read location by address
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	public async localizarPorEndereco(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const endereco = req.params.endereco;
			const enderecosEncontrados = this.localizacaoService.localizarPorEnderecoOuCEP(endereco);
			
			return res.json(enderecosEncontrados);
		} catch (err) {
			return next(err);
		}
	}

	/**
	 * Read location by coordinates
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns HTTP response
	 */
	 async localizarPorCoordenadas(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const latitude = req.params.latitude;
			const longitude = req.params.longitude
			const enderecosLocalizados = this.localizacaoService.localizarPorCoordenadas(parseFloat(latitude),longitude)
			return res.json(enderecosLocalizados);
		} catch (err) {
			return next(err);
		}
	}

}
