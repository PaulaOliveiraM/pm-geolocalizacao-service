import { Localizacao } from "../api/components/localizacao/localizacao.model";
import { env } from "../config/globals";
import { IGeolocalizacaoProvider } from "./geolocalizacaoProvider.interface";
import axios from "axios";
import { DomainError, DomainErrorCode } from "../api/components/helper";

interface ILocationIQProviderAddress {
  road: string;
  city_district: string;
  city: string;
  municipality: string;
  county: string;
  state_district: string;
  state: string;
  region: string;
  postcode: string;
  country: string;
  country_code: string;
  suburb: string;
}

interface ILocationIQProviderPlace {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon: string;
  house_number: string;
  neighbourhood: string;
  city_district: string;
  city: string;
  region: string;
  county: string;
  state: string;
  postcode: string;
  address: ILocationIQProviderAddress;
}

export default class LocationIQProvider implements IGeolocalizacaoProvider {
  public static readonly PROVIDER_NAME: string = "LocationIQ";

  async consultarPorEndereco(endereco: string): Promise<Localizacao[]> {
    const url = `${env.LOCATION_IQ_URL}?key=${env.LOCATION_IQ_ACESS_KEY}&q=${endereco}&format=json&addressdetails=1`;

    try {
      const response = await axios.get(url);
      const localizacoes = this.mapearListaLocalizacao(response.data);
      return localizacoes;
    } catch (error) {
      if (error.response.status === 404) {
        throw new DomainError(
          DomainErrorCode.EnderecoNaoLocalizado,
          "Endereço não localizado"
        );
      }
      throw error;
    }
  }

  async consultarPorCoordernadas(
    latitude: number,
    longitude: number
  ): Promise<Localizacao[]> {
    const url = `${env.LOCATION_IQ_URL}?key=${env.LOCATION_IQ_ACESS_KEY}&q=${latitude},${longitude}&format=json&addressdetails=1`;
    try {
      const response = await axios.get(url);
      const localizacoes = this.mapearListaLocalizacao(response.data);

      return localizacoes;
    } catch (error) {
      if (error.response.status === 404) {
        throw new DomainError(
          DomainErrorCode.EnderecoNaoLocalizado,
          "Endereço não localizado"
        );
      }
      throw error;
    }
  }

  private mapearListaLocalizacao(
    enderecos: ILocationIQProviderPlace[]
  ): Localizacao[] {
    const listaLocalizacoes: Localizacao[] = new Array();

    for (const endereco of enderecos) {
      listaLocalizacoes.push({
        cep: endereco.address.postcode,
        cidade: endereco.address.city,
        endereco: `${endereco.address.road} ${endereco.house_number || ""}  ${
          endereco.address.suburb || ""
        }`,
        estado: endereco.address.state,
        latitude: Number(endereco.lat),
        longitude: Number(endereco.lon),
        pais: endereco.address.country,
        provider: LocationIQProvider.PROVIDER_NAME,
      });
    }

    return listaLocalizacoes;
  }
}
