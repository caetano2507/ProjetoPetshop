export class AdocaoModel {
    constructor() {
        this.apiUrl = 'http://localhost:3000/api/adocoes';
    }

    async listarTodas() {
        const response = await fetch(this.apiUrl);
        if (!response.ok) throw new Error('Erro ao buscar visitas no servidor.');
        return response.json();
    }

    async criar(dados) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        if (!response.ok) throw new Error('Erro ao criar visita no servidor.');
        return response.json();
    }

    async atualizar(id, dados) {
        const response = await fetch(`${this.apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        if (!response.ok) throw new Error('Erro ao atualizar visita no servidor.');
        return response.json();
    }

    async deletar(id) {
        const response = await fetch(`${this.apiUrl}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Erro ao deletar visita no servidor.');
        return response.json();
    }
}