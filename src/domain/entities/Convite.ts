import { InterfaceConvite } from './InterfaceConvite';
import { InterfaceJogador } from './Interface_jogador';
import { randomUUID } from 'crypto';

export class Convite implements InterfaceConvite {
  public status: 'PENDENTE' | 'ACEITO' | 'RECUSADO' = 'PENDENTE';

  constructor(
    public readonly id: string,
    public convidante: InterfaceJogador,
    public convidadoEmail: string
  ) {}

  static criar(convidante: InterfaceJogador, convidadoEmail: string): Convite {
    return new Convite(randomUUID(), convidante, convidadoEmail);
  }

  aceitar() {
    this.status = 'ACEITO';
  }

  recusar() {
    this.status = 'RECUSADO';
  }
}
