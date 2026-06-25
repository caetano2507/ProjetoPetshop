// Esse bichinho server para lidar com as operações assíncronas(é para não exigir uma resposta imediata,sem bloquear/impedir outras tarefas enquanto aguarda uma resposta) de comunicação(fetch) com o servidor
export class ConsultaModel {
    constructor() {
        this.apiUrl = 'http://localhost:3000/api/consultas';
    }

    async listarTodas() {
        const response = await fetch(this.apiUrl);
        if (!response.ok) throw new Error('Erro ao buscar consultas no servidor.');
        return response.json();
    }

    async criar(dados) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        if (!response.ok) throw new Error('Erro ao criar agendamento de consulta no servidor.');
        return response.json();
    }

    async atualizar(id, dados) {
        const response = await fetch(`${this.apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        if (!response.ok) throw new Error('Erro ao atualizar agendamento de consulta no servidor.');
        return response.json();
    }

    async deletar(id) {
        const response = await fetch(`${this.apiUrl}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Erro ao deletar consulta no servidor.');
        return response.json();
    }
}