import { IGeolocalizacaoProvider } from "../../../providers/geolocalizacaoProvider.interface";
import { Localizacao } from "./localizacao.model";

export interface ILocalizacaoService{
    localizarPorEnderecoOuCEP(endereco: string):Promise<Localizacao[]>;
    localizarPorCoordenadas(latitude: number, longitude) :Promise<Localizacao[]>;

} 

export class LocalizacaoService implements ILocalizacaoService{
    private geolocalizacaoProvider: IGeolocalizacaoProvider = undefined;

    constructor(geolocalizacaoProvider: IGeolocalizacaoProvider){
        this.geolocalizacaoProvider = geolocalizacaoProvider;
    }

    async localizarPorEnderecoOuCEP(endereco: string, cep: number = undefined):Promise<Localizacao[]>{
        return await this.geolocalizacaoProvider.consultarPorEndereco(endereco);
    }

    async localizarPorCoordenadas(latitude: number, longitude) :Promise<Localizacao[]>{
        return await this.geolocalizacaoProvider.consultarPorCoordernadas(latitude, longitude);
    }


}