import { IGeolocalizacaoProvider } from "./geolocalizacaoProvider.interface";
import { GoogleMapsProvider } from "./GoogleMaps.provider";

export class GeolocalizacaoProviderFactory {
    private static geolocalizacaoProvider: IGeolocalizacaoProvider;

    public static make(): IGeolocalizacaoProvider{
        if (this.geolocalizacaoProvider){
            return this.geolocalizacaoProvider;
        }

        //TODO: Criar uma env onde seja possível indicar qual o provedor de geolocalização que deverá ser utilizado no momento.
        this.geolocalizacaoProvider = new GoogleMapsProvider();
        return this.geolocalizacaoProvider;
    }
}