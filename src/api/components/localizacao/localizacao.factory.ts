import { GeolocalizacaoProviderFactory } from "../../../providers/geolocalizacaoProvider.factory";
import { IGeolocalizacaoProvider } from "../../../providers/geolocalizacaoProvider.interface";

import { ILocalizacaoService, LocalizacaoService } from "./localizacao.service";

export class LocalizacaoFactory {
    private static localizacaoService: ILocalizacaoService;
    
    public static makeLocalizacaoService():ILocalizacaoService{
        if (this.localizacaoService){
            return this.localizacaoService;
        }

        const geolocalizacaoProvider:IGeolocalizacaoProvider = GeolocalizacaoProviderFactory.make();
        this.localizacaoService = new LocalizacaoService(geolocalizacaoProvider);

        return this.localizacaoService;
    }
}