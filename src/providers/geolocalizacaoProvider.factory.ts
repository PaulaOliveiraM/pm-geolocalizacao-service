import { IGeolocalizacaoProvider } from "./geolocalizacaoProvider.interface";
import { GoogleMapsProvider } from "./GoogleMaps.provider";

export class GeolocalizacaoProviderFactory {
    private static geolocalizacaoProvider: IGeolocalizacaoProvider;

    public static make(): IGeolocalizacaoProvider{
        if (this.geolocalizacaoProvider){
            return this.geolocalizacaoProvider;
        }

        this.geolocalizacaoProvider = new GoogleMapsProvider();
        return this.geolocalizacaoProvider;
    }
}