import { Router } from "express";
import { IComponentRoutes } from "../helper";
import { LocalizacaoController } from "./localizacao.controller";
import { LocalizacaoFactory } from "./localizacao.factory";
import { ILocalizacaoService, LocalizacaoService } from "./localizacao.service";

export class LocalizadorRoutes implements IComponentRoutes<LocalizacaoController> {
    localizacaoService :ILocalizacaoService= LocalizacaoFactory.makeLocalizacaoService();
    name: string = "localizador";
    controller  = new LocalizacaoController(this.localizacaoService);
    router: Router = Router();

    constructor(){
        this.initRoutes()
    }
    
    initRoutes(): void {
       this.router.get('/:endereco', (req,res, next)=>this.controller.localizarPorEndereco(req,res,next))
       this.router.get('/:latitude/:longitude',(req,res, next)=>this.controller.localizarPorCoordenadas(req,res,next))
    }

}