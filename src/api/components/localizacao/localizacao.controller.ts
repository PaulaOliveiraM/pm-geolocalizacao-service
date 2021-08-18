import { NextFunction, Request, Response } from 'express';
import { ILocalizacaoService } from './localizacao.service';
import RemoveAccents from 'remove-accents';


export class LocalizacaoController {
	private localizacaoService: ILocalizacaoService = undefined;

	constructor(localizacaoService:ILocalizacaoService){
		this.localizacaoService = localizacaoService;
	}


	public async localizarPorEndereco(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const endereco = RemoveAccents(req.params.endereco);
			const enderecosEncontrados = await this.localizacaoService.localizarPorEnderecoOuCEP(endereco);
			
			return res.json(enderecosEncontrados);
		} catch (err) {
			return next(err);
		}
	}

	
	 async localizarPorCoordenadas(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const latitude = req.params.latitude;
			const longitude = req.params.longitude
			const enderecosLocalizados = await this.localizacaoService.localizarPorCoordenadas(parseFloat(latitude),longitude)
			return res.json(enderecosLocalizados);
		} catch (err) {
			return next(err);
		}
	}

}
