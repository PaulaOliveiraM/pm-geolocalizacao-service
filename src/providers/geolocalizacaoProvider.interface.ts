import { Localizacao } from "../api/components/localizacao/localizacao.model";

export interface IGeolocalizacaoProvider{
    consultarPorEndereco(endereco: string) : Localizacao[];
    consultarPorCoordernadas(latitude: number, longitude: number) : Localizacao[];
}