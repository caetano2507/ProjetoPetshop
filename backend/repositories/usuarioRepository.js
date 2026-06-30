const conexao = require("../database/conexao");
 
class UsuarioRepository {
    // Cadastrar um novo usuário comum
    async cadastrar(nome, email, senha) {
        const sql = "INSERT INTO usuarios (nome, email, senha, regra) VALUES (?, ?, ?, 'user')";
        // O executa o Pool da Aiven
        const [resultado] = await conexao.execute(sql, [nome, email, senha]);
        return resultado;
    }
 
    // Buscar usuário por e-mail e senha (para o Login)
    async buscarPorCredenciais(email, senha) {
        const sql = "SELECT * FROM usuarios WHERE email = ? AND senha = ?";
        const [linhas] = await conexao.query(sql, [email, senha]);
        
        // Se achou alguém, retorna o primeiro usuário do array, senão null
        return linhas.length > 0 ? linhas[0] : null;
    }
 
    // Excluir um usuário (Função avançada do Admin)
    async excluir(id) {
        const sql = "DELETE FROM usuarios WHERE id = ?";
        const [resultado] = await conexao.execute(sql, [id]);
        return resultado;
    }
 
    // Listar todos os usuários (Admin gerenciar)
    async listarTodos() {
        const sql = "SELECT id, nome, email, regra FROM usuarios";
        const [linhas] = await conexao.query(sql);
        return linhas;
    }
}
 
module.exports = new UsuarioRepository();
 