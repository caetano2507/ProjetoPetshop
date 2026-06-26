// Vai fazer o cálculo do score baseado no tipo do pet, porte/espécie e o fator multiplicador da idade para definir o plano correto
export class PlanoSaudeModel {
    calcularRecomendacao(tipoPet, idadePet) {
        const tipo = tipoPet.toLowerCase().trim();
        let custo = 1;

        // Regra de custo por espécie/tipo
        if (tipo.includes("cachorro") || tipo.includes("furão")) {
            custo = 3;
        } else if (tipo.includes("gato") || tipo.includes("chinchila")) {
            custo = 2;
        } else if (tipo.includes("coelho") || tipo.includes("porquinho")) {
            custo = 2;
        } else if (tipo.includes("tartaruga") || tipo.includes("lagarto")) {
            custo = 3;
        } else {
            custo = 1;
        }

        // Regra do fator de idade
        let fatorIdade = 1;
        if (idadePet === "adulto") fatorIdade = 1.3;
        if (idadePet === "idoso") fatorIdade = 1.7;

        const score = custo * fatorIdade;

        // Determinação do plano com base no score obtido
        if (score <= 2) {
            return { plano: "Plano Básico", preco: "R$ 29" };
        } else if (score <= 3.5) {
            return { plano: "Plano Intermediário", preco: "R$ 59" };
        } else {
            return { plano: "Plano Premium", preco: "R$ 99" };
        }
    }

    gerarLinkWhatsApp(plano) {
        return `https://wa.me/5511999999999?text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20o%20${encodeURIComponent(plano)}`;
    }
}