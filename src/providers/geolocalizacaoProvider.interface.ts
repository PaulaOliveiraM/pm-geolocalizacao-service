import { Localizacao } from "../api/components/localizacao/localizacao.model";

export interface IGeolocalizacaoProvider{
    consultarPorEndereco(endereco: string) : Promise<Localizacao[]>;
    consultarPorCoordernadas(latitude: number, longitude: number) : Promise<Localizacao[]>;
}