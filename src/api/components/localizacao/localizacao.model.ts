export class Localizacao {
    public endereco: string;
    public cidade: string;
    public estado: string;
    public latitude: number;
    public longitude: number;
    public cep:string;
    public pais: string;
    public provider: string;

    constructor(endereco:string, cidade: string, estado: string, latitude: number, longitude: number, cep: string, pais: string, provider: string){
        this.endereco = endereco;
        this.estado = estado;
        this.cidade = cidade;
        this.latitude = latitude;
        this.longitude = longitude;
        this.cep = cep;
        this.pais = pais;
        this.provider = provider;
    }
}