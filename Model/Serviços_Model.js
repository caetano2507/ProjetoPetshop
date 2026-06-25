// Busca o catálogo de serviços disponíveis diretamente do backend
export class ServicosModel {
    constructor() {
        this.apiUrl = 'http://localhost:3000/api/catalogo-servicos';
    }

    async listarServicos() {
        const response = await fetch(this.apiUrl);
        if (!response.ok) throw new Error('Erro ao buscar o catálogo de serviços no servidor.');
        return response.json();
    }
}