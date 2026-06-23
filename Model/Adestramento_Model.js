// AdestramentoModel.js
export class AdestramentoModel {
    constructor() {
        this.apiUrl = 'http://localhost:3000/api/adestramentos';
    }

    async listarTodos() {
        try {
            const response = await fetch(this.apiUrl);
            return await response.json();
        } catch (error) {
            console.error("Erro ao buscar dados do servidor:", error);
            throw error;
        }
    }

    async criar(dadosPet) {
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosPet)
            });
            return await response.json();
        } catch (error) {
            console.error("Erro ao salvar no servidor:", error);
            throw error;
        }
    }

    async atualizar(id, dadosPet) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosPet)
            });
            return await response.json();
        } catch (error) {
            console.error("Erro ao atualizar no servidor:", error);
            throw error;
        }
    }

    async deletar(id) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`, { method: 'DELETE' });
            return await response.json();
        } catch (error) {
            console.error("Erro ao deletar no servidor:", error);
            throw error;
        }
    }
}