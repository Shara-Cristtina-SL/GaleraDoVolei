import { Jogador } from './Jogador';
import { Partida } from './Partida';

export class PedidoDeAdesao {
  constructor(
    public readonly id: string,
    public jogador: Jogador,
    public partida: Partida,
    public status: 'PENDENTE' | 'ACEITO' | 'RECUSADO' = 'PENDENTE'
  ) {}

  static criar(jogador: Jogador, partida: Partida) {
    return new PedidoDeAdesao(require('crypto').randomUUID(), jogador, partida);
  }

  aceitar() {
    this.status = 'ACEITO';
    this.partida.adicionarParticipante(this.jogador);
  }

  recusar() {
    this.status = 'RECUSADO';
  }
}
