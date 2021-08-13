import { IGeolocalizacaoProvider } from "./geolocalizacaoProvider.interface";
import { PositionStackProvider } from "./positionStackProvider.provider";

export class GeolocalizacaoProviderFactory {
    private static geolocalizacaoProvider: IGeolocalizacaoProvider;

    public static make(): IGeolocalizacaoProvider{
        if (this.geolocalizacaoProvider){
            return this.geolocalizacaoProvider;
        }

        this.geolocalizacaoProvider = new PositionStackProvider();
        return this.geolocalizacaoProvider;
    }
}