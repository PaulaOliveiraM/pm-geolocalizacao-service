import { response } from "express";
import { env } from "../config/globals";
import { IGeolocalizacaoProvider } from "./geolocalizacaoProvider.interface";
import  LocationIQProvider  from "./locationIQ.provider";
import  PositionStackProvider  from "./positionStack.provider";

export class GeolocalizacaoProviderFactory {
  private static geolocalizacaoProvider: IGeolocalizacaoProvider;

  public static make(): IGeolocalizacaoProvider {
    if (this.geolocalizacaoProvider) {
      return this.geolocalizacaoProvider;
    }

    this.geolocalizacaoProvider = this.selecionarProvider();
    return this.geolocalizacaoProvider;
  }

  private static selecionarProvider(): IGeolocalizacaoProvider {
    const useProviderLocation = env.USE_PROVIDER_LOCATION;
    if (useProviderLocation == PositionStackProvider.PROVIDER_NAME) {
      return new PositionStackProvider();
    } else if (useProviderLocation == LocationIQProvider.PROVIDER_NAME) {
      return new LocationIQProvider();
    }
  }
}
