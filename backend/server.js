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



// Rota do módulo de adoção de Pet


let adocoes = [];
let proximoIdAdocao = 1;

app.get('/api/adocoes', (req, res) => {
    res.json(adocoes);
});

app.post('/api/adocoes', (req, res) => {
    const { petnome, adotantenome, data, hora } = req.body;

    if (!petnome || !adotantenome || !data || !hora) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const novaVisita = {
        id: (proximoIdAdocao++).toString(), // Convertido para String para manter o padrão seguro do sistema
        petnome,
        adotantenome,
        data,
        hora
    };

    adocoes.push(novaVisita);
    res.status(201).json(novaVisita);
});

app.put('/api/adocoes/:id', (req, res) => {
    const { id } = req.params; // Mantido como string
    const { petnome, adotantenome, data, hora } = req.body;

    const visitaIndex = adocoes.findIndex(v => v.id === id);
    if (visitaIndex === -1) {
        return res.status(404).json({ error: "Agendamento não encontrado." });
    }

    // CORRIGIDO: adotantenome corrigido para evitar o quebra de referência de variável
    adocoes[visitaIndex] = {
        id,
        petnome: petnome || adocoes[visitaIndex].petnome,
        adotantenome: adotantenome || adocoes[visitaIndex].adotantenome,
        data: data || adocoes[visitaIndex].data,
        hora: hora || adocoes[visitaIndex].hora
    };

    res.json(adocoes[visitaIndex]);
});

app.delete('/api/adocoes/:id', (req, res) => {
    const { id } = req.params;
    const visitaIndex = adocoes.findIndex(v => v.id === id);

    if (visitaIndex === -1) {
        return res.status(404).json({ error: "Agendamento não encontrado." });
    }

    adocoes.splice(visitaIndex, 1);
    res.json({ message: "Agendamento removido com sucesso!" });
});



// Rotas do módulo de banho e tosa

let agendamentosBanho_tosa = [];
let proximoIdBanho_tosa = 1;

app.get('/api/Banho_tosa', (req, res) => {
    res.json(agendamentosBanho_tosa);
});

app.post('/api/Banho_tosa', (req, res) => {
    const { nome, especie, raca, porte, data, hora } = req.body;

    if (!nome || !especie || !raca || !porte || !data || !hora) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const novoAgendamento = {
        id: (proximoIdBanho_tosa++).toString(), // Convertido para String para casar certinho com os datasets do HTML
        nome,
        especie,
        raca,
        porte,
        data,
        hora
    };

    agendamentosBanho_tosa.push(novoAgendamento);
    res.status(201).json(novoAgendamento);
});

app.put('/api/Banho_tosa/:id', (req, res) => {
    const { id } = req.params;
    const { nome, especie, raca, porte, data, hora } = req.body;

    const index = agendamentosBanho_tosa.findIndex(a => a.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Agendamento de estética não encontrado." });
    }

    agendamentosBanho_tosa[index] = {
        id,
        nome: nome || agendamentosBanho_tosa[index].nome,
        especie: especie || agendamentosBanho_tosa[index].especie,
        raca: raca || agendamentosBanho_tosa[index].raca,
        porte: porte || agendamentosBanho_tosa[index].porte,
        data: data || agendamentosBanho_tosa[index].data,
        hora: hora || agendamentosBanho_tosa[index].hora
    };

    res.json(agendamentosBanho_tosa[index]);
});

app.delete('/api/Banho_tosa/:id', (req, res) => {
    const { id } = req.params;
    const index = agendamentosBanho_tosa.findIndex(a => a.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Agendamento de estética não encontrado." });
    }

    agendamentosBanho_tosa.splice(index, 1);
    res.json({ message: "Agendamento de estética removido com sucesso!" });
});



// Rotas do módulo de consultas veterinarias

let consultasVeterinarias = [];
let proximoIdConsulta = 1;

// Listar todas as consultas
app.get('/api/consultas', (req, res) => {
    res.json(consultasVeterinarias);
});

// Criar nova consulta
app.post('/api/consultas', (req, res) => {
    const { nome, especie, esp, data, hora } = req.body;

    if (!nome || !especie || !esp || !data || !hora) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const novaConsulta = {
        id: (proximoIdConsulta++).toString(), // Armazenado como string para compatibilidade uniforme do dataset
        nome,
        especie,
        esp,
        data,
        hora
    };

    consultasVeterinarias.push(novaConsulta);
    res.status(201).json(novaConsulta);
});

// Atualizar consulta existente
app.put('/api/consultas/:id', (req, res) => {
    const { id } = req.params;
    const { nome, especie, esp, data, hora } = req.body;

    const index = consultasVeterinarias.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).json({ error: "Consulta não encontrada." });
    }

    consultasVeterinarias[index] = {
        id,
        nome: nome || consultasVeterinarias[index].nome,
        especie: especie || consultasVeterinarias[index].especie,
        esp: esp || consultasVeterinarias[index].esp,
        data: data || consultasVeterinarias[index].data,
        hora: hora || consultasVeterinarias[index].hora
    };

    res.json(consultasVeterinarias[index]);
});

// Deletar uma consulta
app.delete('/api/consultas/:id', (req, res) => {
    const { id } = req.params;
    const index = consultasVeterinarias.findIndex(c => c.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Consulta não encontrada." });
    }

    consultasVeterinarias.splice(index, 1);
    res.json({ message: "Consulta removida com sucesso do servidor!" });
});



// Rotas do módulo de contato 

let mensagensContato = [];
let proximoIdMensagem = 1;

// Rota para salvar uma nova mensagem enviada
app.post('/api/mensagens', (req, res) => {
    const { nome, email, mensagem } = req.body;

    if (!nome || !email || !mensagem) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    const novaMensagem = {
        id: (proximoIdMensagem++).toString(),
        nome,
        email,
        mensagem,
        dataRecebimento: new Date()
    };

    mensagensContato.push(novaMensagem);
    console.log(`[Contato] Nova mensagem recebida de: ${nome}`);
    
    res.status(201).json(novaMensagem);
});

// Opcional: Rota GET caso você queira inspecionar as mensagens via navegador/Insomnia
app.get('/api/mensagens', (req, res) => {
    res.json(mensagensContato);
});



// Módulo central do catálogo de serviços 

const catalogoServicos = [
    {
        id: "1",
        titulo: "Veterinário",
        descricao: "Consultas, vacinas e acompanhamento clínico especializado",
        icone: "🩺",
        classeIcone: "icon-green",
        link: "TelaConsulta.html",
        posicao: "principal",
        delay: "0.05s"
    },
    {
        id: "2",
        titulo: "Banho e Tosa",
        descricao: "Higiene completa com produtos premium e carinho",
        icone: "🛁",
        classeIcone: "icon-blue",
        link: "TelaBanho-Tosa.html",
        posicao: "principal",
        delay: "0.12s"
    },
    {
        id: "3",
        titulo: "Adestramento",
        descricao: "Treinamento comportamental com técnicas modernas e eficazes",
        icone: "🎓",
        classeIcone: "icon-purple",
        link: "TelaAdestramento.html",
        posicao: "principal",
        delay: "0.19s"
    },
    {
        id: "4",
        titulo: "Hotel & Day Care",
        descricao: "Hospedagem e creche com todo conforto e segurança",
        icone: "🏠",
        classeIcone: "icon-red",
        link: "TelaHotelPet.html",
        posicao: "secundario",
        delay: "0.26s"
    },
    {
        id: "5",
        titulo: "Adoção de Pets",
        descricao: "Encontre um novo amigo para a sua família com amor",
        icone: "🐶",
        classeIcone: "icon-orange",
        link: "TelaAdocao.html",
        posicao: "secundario",
        delay: "0.33s"
    }
];

// Rota API para listar os serviços no painel
app.get('/api/catalogo-servicos', (req, res) => {
    res.json(catalogoServicos);
});

// ESCUTA DO SERVIDOR (Esta linha DEVE ser a última do arquivo)
app.listen(PORT, () => {
    console.log(`Servidor rodando redondo na porta ${PORT}`);
});



// Módulo central do catálogo de brinquedos 

const catalogoBrinquedos = [
    {
        name: "Mordedor Corda com Bola",
        price: 34.90,
        img: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: "Frango de Borracha Clássico",
        price: 19.90,
        img: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: "Bolinha de Tênis Ultra Resistente",
        price: 14.90,
        img: "https://images.unsplash.com/photo-1610243431326-72644265cc8d?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: "Brinquedo de Pelúcia Crocodilo",
        price: 45.90,
        img: "https://images.unsplash.com/photo-1568393691622-c7ba131d63b6?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: "KONG Classic Interativo",
        price: 89.90,
        img: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?auto=format&fit=crop&q=80&w=400"
    },
    {
        name: "Arranhador Torre para Gatos",
        price: 129.90,
        img: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&q=80&w=400"
    }
];

// Rota para listar os produtos na vitrine
app.get('/api/brinquedos', (req, res) => {
    res.json(catalogoBrinquedos);
});