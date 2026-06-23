const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// middlewares  (Essenciais para o MVC funcionar)
app.use(cors()); // Isso resolve o erro vermelho de CORS do navegador
app.use(express.json()); // Permite que o servidor entenda os dados do Pet enviados em JSON

// Nosso "Banco de Dados" temporário (Salva na memória do servidor)
let bancoDeDadosAdestramentos = [];

// ROTA 1: Buscar todos os agendamentos (GET)
app.get('/api/adestramentos', (req, res) => {
    // Retorna a lista invertida para o card mais novo aparecer no topo
    res.json([...bancoDeDadosAdestramentos].reverse());
});

// ROTA 2: Criar novo agendamento (POST)
app.post('/api/adestramentos', (req, res) => {
    const { nome, idade, objetivo, data, hora } = req.body;

    // Cria um ID único para o pet (fundamental para o MVC saber quem editar/excluir depois)
    const novoAgendamento = {
        id: Date.now().toString(),
        nome,
        idade,
        objetivo,
        data,
        hora
    };

    bancoDeDadosAdestramentos.push(novoAgendamento);
    res.status(201).json(novoAgendamento);
});

// ROTA 3: Atualizar um agendamento existente (PUT)
app.put('/api/adestramentos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, idade, objetivo, data, hora } = req.body;

    const index = bancoDeDadosAdestramentos.findIndex(item => item.id === id);

    if (index !== -1) {
        bancoDeDadosAdestramentos[index] = { id, nome, idade, objetivo, data, hora };
        return res.json(bancoDeDadosAdestramentos[index]);
    }

    res.status(404).json({ message: "Pet não encontrado para atualização." });
});

// ROTA 4: Excluir um agendamento (DELETE)
app.delete('/api/adestramentos/:id', (req, res) => {
    const { id } = req.params;
    
    const tamanhoOriginal = bancoDeDadosAdestramentos.length;
    bancoDeDadosAdestramentos = bancoDeDadosAdestramentos.filter(item => item.id !== id);

    if (bancoDeDadosAdestramentos.length < tamanhoOriginal) {
        return res.json({ message: "Removido com sucesso!" });
    }

    res.status(404).json({ message: "Pet não encontrado para exclusão." });
});

// Ligar o Servidor
app.listen(PORT, () => {
    console.log(` Servidor da Royal Pet rodando em: http://localhost:${PORT}`);
});