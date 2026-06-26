//Vai abstrai o armazenamento das reservas no localStorage e a validação lógica dos períodos de entrada e saída
export class HotelPetModel {
    obterReservas() {
        return JSON.parse(localStorage.getItem('royalpet_hotel')) || [];
    }

    salvarReservas(reservas) {
        localStorage.setItem('royalpet_hotel', JSON.stringify(reservas));
    }

    validarPeriodo(dataEntrada, dataSaida, servico) {
        if (!dataEntrada) return false;

        const entrada = new Date(dataEntrada + 'T00:00:00');
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        if (entrada < hoje) return false;

        if (servico === 'Day Care') {
            return true;
        }

        if (!dataSaida) return false;

        const saida = new Date(dataSaida + 'T00:00:00');
        return saida > entrada;
    }

    gerarLinkWhatsApp(reserva) {
        const numWhatsApp = '551199541-7758';
        const periodo = reserva.servico === 'Day Care'
            ? `Data: ${reserva.datain}`
            : `Entrada: ${reserva.datain}\nSaida: ${reserva.dataout}`;

        const msg = `Ola RoyalPet! Gostaria de solicitar uma reserva de Hotel:\n\n` +
            `Pet: ${reserva.nome}\n` +
            `Servico: ${reserva.servico}\n` +
            `Convivencia Social: ${reserva.social}\n` +
            periodo;

        return `https://api.whatsapp.com/send?phone=${numWhatsApp}&text=${encodeURIComponent(msg)}`;
    }
}
