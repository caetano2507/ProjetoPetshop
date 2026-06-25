// Essa parte vai fazer a comunicação via API(fetch) com as rotas que vamos adicionar no servidor 
export class Banho_tosaModel {
    constructor() {
        this.apiUrl = 'http://localhost:3000/api/Banho_tosa';
    }

    async listarTodos() {
        const response = await fetch(this.apiUrl);
        if (!response.ok) throw new Error('Erro ao buscar agendamentos de estética no servidor.');
        return response.json();
    }

    async criar(dados) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        if (!response.ok) throw new Error('Erro ao criar agendamento no servidor.');
        return response.json();
    }

    async atualizar(id, dados) {
        const response = await fetch(`${this.apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        if (!response.ok) throw new Error('Erro ao atualizar agendamento no servidor.');
        return response.json();
    }

    async deletar(id) {
        const response = await fetch(`${this.apiUrl}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Erro ao deletar agendamento no servidor.');
        return response.json();
    }
}