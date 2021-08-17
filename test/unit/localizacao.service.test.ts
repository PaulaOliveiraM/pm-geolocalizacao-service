
import { Localizacao } from "../../src/api/components/localizacao/localizacao.model";
import { LocalizacaoService } from "../../src/api/components/localizacao/localizacao.service";
import LocationIQProvider from '../../src/providers/locationIQ.provider';
import PositionStackProvider  from "../../src/providers/positionStack.provider";

const localizacaoFakeLocationIQ: Localizacao = {
    cep: "21862005",
    cidade: "Rio de Janeiro",
    endereco: "Rua dos testes, 18",
    estado: "RJ",
    latitude: -78797456.5,
    longitude: 89454654.5,
    pais: "Brasil",
    provider: LocationIQProvider.PROVIDER_NAME
}

const localizacaoFakePositionStack: Localizacao = {
    cep: "21862005",
    cidade: "Rio de Janeiro",
    endereco: "Rua dos testes, 18",
    estado: "RJ",
    latitude: -78797456.5,
    longitude: 89454654.5,
    pais: "Brasil",
    provider: PositionStackProvider.PROVIDER_NAME
}

describe('consulta por endereco',()=>{

    describe('com o provedor LocationIQ',()=>{
        let locationIQProvider:LocationIQProvider

        beforeEach(()=>{
            locationIQProvider = new LocationIQProvider();
        })

        test('deve retornar o endereco corretamente',async()=>{
            const mockLocationIQProvider = jest.spyOn(locationIQProvider, "consultarPorEndereco");
            mockLocationIQProvider.mockImplementation(async ():Promise<Localizacao[]>=>{
                return [localizacaoFakeLocationIQ];
            })
            const localizacaoService = new LocalizacaoService(locationIQProvider);
            const localizaco =await localizacaoService.localizarPorEnderecoOuCEP("fasdfasf");
    
            expect(localizaco).toEqual([localizacaoFakeLocationIQ]);
            expect(locationIQProvider.consultarPorEndereco).toHaveBeenCalledTimes(1);
            expect(localizaco[0].provider).toEqual(LocationIQProvider.PROVIDER_NAME);
        });
    
        test('deve retornar vazio quando não localizar o endereço',async()=>{
            const mockLocationIQProvider = jest.spyOn(locationIQProvider, "consultarPorEndereco");
            mockLocationIQProvider.mockImplementation(async ():Promise<Localizacao[]>=>{
                return [];
            })
            const localizacaoService = new LocalizacaoService(locationIQProvider);
            const localizaco =await localizacaoService.localizarPorEnderecoOuCEP("fasdfasf");
    
            expect(localizaco).toEqual([]);
            expect(locationIQProvider.consultarPorEndereco).toHaveBeenCalledTimes(1);
        });
        
    })

    describe('com o provedor PositionStack',()=>{
        let positionStackProvider:PositionStackProvider

        beforeEach(()=>{
            positionStackProvider = new PositionStackProvider();
        })

        test('deve retornar o endereco corretamente',async()=>{
            const mockLocationIQProvider = jest.spyOn(positionStackProvider, "consultarPorEndereco");
            mockLocationIQProvider.mockImplementation(async ():Promise<Localizacao[]>=>{
                return [localizacaoFakePositionStack];
            })
            const localizacaoService = new LocalizacaoService(positionStackProvider);
            const localizaco =await localizacaoService.localizarPorEnderecoOuCEP("fasdfasf");
    
            expect(localizaco).toEqual([localizacaoFakePositionStack]);
            expect(positionStackProvider.consultarPorEndereco).toHaveBeenCalledTimes(1);
            expect(localizaco[0].provider).toEqual(PositionStackProvider.PROVIDER_NAME);

        });
    
        test('deve retornar vazio quando não localizar o endereço',async()=>{
            const mockLocationIQProvider = jest.spyOn(positionStackProvider, "consultarPorEndereco");
            mockLocationIQProvider.mockImplementation(async ():Promise<Localizacao[]>=>{
                return [];
            })
            const localizacaoService = new LocalizacaoService(positionStackProvider);
            const localizaco =await localizacaoService.localizarPorEnderecoOuCEP("fasdfasf");
    
            expect(localizaco).toEqual([]);
            expect(positionStackProvider.consultarPorEndereco).toHaveBeenCalledTimes(1);
        });
        
    })
   
});