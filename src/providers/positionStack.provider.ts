import { Localizacao } from "../api/components/localizacao/localizacao.model";
import { env } from "../config/globals";
import { IGeolocalizacaoProvider } from "./geolocalizacaoProvider.interface";
import axios from "axios";

interface IPositionStackPlace {
  latitude: number;
  longitude: number;
  type: string;
  name: string;
  number: string;
  postal_code: string;
  street: string;
  confidence: number;
  region: string;
  region_code: string;
  county: string | null;
  locality: string;
  administrative_area: string;
  neighbourhood: string;
  country: string;
  country_code: string;
  continent: string;
  label: string;
}

export default class PositionStackProvider implements IGeolocalizacaoProvider {
  public static readonly  PROVIDER_NAME:string = "PositionStack";

  async consultarPorEndereco(endereco: string): Promise<Localizacao[]> {
    const url =  `${env.POSITION_STACK_FORWARD_URL}?access_key=${env.POSITION_STACK_ACCESS_KEY}&query=${endereco}`;
    const response = await axios.get(url);
    const localizacoes = this.mapearListaLocalizacao(response.data.data);

    return localizacoes;
  }

  async consultarPorCoordernadas(
    latitude: number,
    longitude: number
  ): Promise<Localizacao[]> {
    const url = `${env.POSITION_STACK_REVERSE_URL}?access_key=${env.POSITION_STACK_ACCESS_KEY}&query=${latitude},${longitude}`
    const response = await axios.get(url);
    const localizacoes = this.mapearListaLocalizacao(response.data.data);

    return localizacoes;
  }

  private mapearListaLocalizacao(enderecos: IPositionStackPlace[]): Localizacao[] {
    const listaLocalizacoes: Localizacao[] = new Array();

    for (const endereco of enderecos) {
      listaLocalizacoes.push({
        cep: endereco.postal_code,
        cidade: endereco.locality,
        endereco: `${endereco.street}, ${endereco.number}, ${endereco.neighbourhood}`,
        estado: endereco.region_code,
        latitude: endereco.latitude,
        longitude: endereco.longitude,
        pais: endereco.country,
        provider: PositionStackProvider.PROVIDER_NAME
      });
    }

    return listaLocalizacoes;
  }
}
