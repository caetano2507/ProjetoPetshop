// Faz a requisição para puzar a lista de brinquedos cadastrados no servidor
export class BrinquedosModel {
    constructor() {
        this.apiUrl = 'http://localhost:3000/api/brinquedos';
    }

    async listarBrinquedos() {
        const response = await fetch(this.apiUrl);
        if (!response.ok) throw new Error('Erro ao buscar o catálogo de brinquedos no servidor.');
        return response.json();
    }
}