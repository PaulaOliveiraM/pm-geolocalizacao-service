import { Localizacao } from "../api/components/localizacao/localizacao.model";
import { IGeolocalizacaoProvider } from "./geolocalizacaoProvider.interface";

export class GoogleMapsProvider implements IGeolocalizacaoProvider{
    //TODO: Fazer a implementação da busca pelo GoogleMaps depois buscar outro serviço que faça a mesma coisa e implementar
    consultarPorEndereco(endereco: string): Localizacao[] {
       return [{
            cep: 21862005,
            cidade: "Rio de Janeiro",
            estado:"RJ",
            endereco:"Rua dos testes",
            latitude: 123456,
            longitude:456465456
        }]
    }
    consultarPorCoordernadas(latitude: number, longitude: number): Localizacao[] {
        return [{
            cep: 21862005,
            cidade: "Rio de Janeiro 2",
            estado:"RJ",
            endereco:"Rua dos testes",
            latitude: 123456,
            longitude:456465456
        }]
    }

}