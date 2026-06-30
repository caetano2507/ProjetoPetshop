const racaoRepository = require("../repositories/racaoRepository");
 
class RacaController {
  // Listar todas as rações do estoque
  async listarTodas(req, res) {
    try {
      const resultados = await racaoRepository.listarTodas();
      return res.json(resultados);
    } catch (erro) {
      console.error("Erro ao buscar rações:", erro);
      return res.status(500).json({ erro: "Erro ao buscar rações." });
    }
  }
 
  // Cadastrar nova ração no estoque
  async cadastrar(req, res) {
    const { nome, preco, quantidade_estoque, marca, peso_kg } = req.body;
 
    if (!nome || !preco) {
      return res.status(400).json({ erro: "Nome e preço são obrigatórios!" });
    }
 
    try {
      await racaoRepository.cadastrar(nome, preco, quantidade_estoque, marca, peso_kg);
      return res.status(201).json({ mensagem: "Ração cadastrada com sucesso!" });
    } catch (erro) {
      console.error("Erro ao cadastrar ração:", erro);
      return res.status(500).json({ erro: "Erro ao cadastrar ração." });
    }
  }
}
 
module.exports = new RacaController();
 