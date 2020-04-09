export class Vendedor {
    constructor(cpf, rg, nome, logradouro, numero, bairro, cep, tel){
        this.cpf = cpf;
        this.rg = rg;
        this.nome = nome;
        this.endereco = {
            logradouro = logradouro,
            numero = numero,
            bairro = bairro,
            cep = cep,
        };
        this.tel = tel;
    }
}