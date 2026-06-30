const conexao = require("../database/conexao");
 
class RacaoRepository {
    // Listar todas as rações do estoque
    async listarTodas() {
        const sql = "SELECT * FROM racao";
        const [linhas] = await conexao.query(sql);
        return linhas;
    }
 
    // Cadastrar uma nova ração no estoque
    async cadastrar(nome, preco, quantidade_estoque, marca, peso_kg) {
        const sql = `
            INSERT INTO racao (nome, preco, quantidade_estoque, marca, peso_kg) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const [resultado] = await conexao.execute(sql, [
            nome, 
            preco, 
            quantidade_estoque || 0, 
            marca || null, 
            peso_kg || null
        ]);
        return resultado;
    }
 
    // Atualizar a quantidade em estoque de uma ração específica
    async atualizarEstoque(id, novaQuantidade) {
        const sql = "UPDATE racao SET quantidade_estoque = ? WHERE id = ?";
        const [resultado] = await conexao.execute(sql, [novaQuantidade, id]);
        return resultado;
    }
 
    // Excluir uma ração do sistema
    async excluir(id) {
        const sql = "DELETE FROM racao WHERE id = ?";
        const [resultado] = await conexao.execute(sql, [id]);
        return resultado;
    }
}
 
module.exports = new RacaoRepository();
 