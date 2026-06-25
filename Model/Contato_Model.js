// Esse bicho vai enviar uma cópia dos dados do formulário para o backend registrar
export class ContatoModel {
    constructor() {
        this.apiUrl = 'http://localhost:3000/api/mensagens';
    }

    async salvarMensagem(dados) {
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
        if (!response.ok) throw new Error('Erro ao salvar cópia da mensagem no servidor.');
        return response.json();
    }
}