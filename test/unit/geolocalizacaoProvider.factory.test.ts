import { env } from "../../src/config/globals";
import { GeolocalizacaoProviderFactory } from "../../src/providers/geolocalizacaoProvider.factory";
import PositionStackProvider from "../../src/providers/positionStack.provider";

describe("Criação de provider de geolocalização", () => {
  test("deve criar o provider de acordo com o informado na variável de ambiente", () => {
    env.USE_PROVIDER_LOCATION = PositionStackProvider.PROVIDER_NAME;
    const provider = GeolocalizacaoProviderFactory.make();
    expect(provider instanceof PositionStackProvider).toBeTruthy();
  });

});
