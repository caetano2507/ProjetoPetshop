const usuarioRepository = require("../repositories/usuarioRepository");
 
class UsuarioController {
  // Processar o cadastro de um novo usuário
  async cadastrar(req, res) {
    const { nome, email, senha } = req.body;
 
    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios!" });
    }
 
    try {
      await usuarioRepository.cadastrar(nome, email, senha);
      return res.status(201).json({ mensagem: "Conta criada com sucesso! 🎉" });
    } catch (erro) {
      console.error("Erro no controlador de cadastro:", erro);
      return res.status(500).json({ erro: "Erro ao salvar no banco." });
    }
  }
 
  // Processar o login do usuário
  async login(req, res) {
    const { email, senha } = req.body;
 
    if (!email || !senha) {
      return res.status(400).json({ erro: "E-mail e senha são obrigatórios!" });
    }
 
    try {
      const usuarioLogado = await usuarioRepository.buscarPorCredenciais(email, senha);
 
      if (usuarioLogado) {
        const regraDoBanco = usuarioLogado.regra || "user";
        return res.status(200).json({
          mensagem: "Login efetuado!",
          regra: regraDoBanco
        });
      } else {
        return res.status(401).json({ erro: "E-mail ou senha incorretos." });
      }
    } catch (erro) {
      console.error("Erro no controlador de login:", erro);
      return res.status(500).json({ erro: "Erro interno no servidor." });
    }
  }
}
 
module.exports = new UsuarioController();
 