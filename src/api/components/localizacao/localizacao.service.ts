import { IGeolocalizacaoProvider } from "../../../providers/geolocalizacaoProvider.interface";
import { Localizacao } from "./localizacao.model";

export interface ILocalizacaoService{
    localizarPorEnderecoOuCEP(endereco: string):Localizacao[];
    localizarPorCoordenadas(latitude: number, longitude) :Localizacao[];

} 

export class LocalizacaoService implements ILocalizacaoService{
    private geolocalizacaoProvider: IGeolocalizacaoProvider = undefined;

    constructor(geolocalizacaoProvider: IGeolocalizacaoProvider){
        this.geolocalizacaoProvider = geolocalizacaoProvider;
    }

    localizarPorEnderecoOuCEP(endereco: string, cep: number = undefined):Localizacao[]{
        return this.geolocalizacaoProvider.consultarPorEndereco(endereco);
    }

    localizarPorCoordenadas(latitude: number, longitude) :Localizacao[]{
        return this.geolocalizacaoProvider.consultarPorCoordernadas(latitude, longitude);
    }


}