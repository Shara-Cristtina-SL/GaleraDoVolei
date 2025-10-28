import { InterfaceJogador } from './Interface_jogador';

export interface InterfaceConvite {
  readonly id: string;
  convidante: InterfaceJogador;
  convidadoEmail: string;
  status: 'PENDENTE' | 'ACEITO' | 'RECUSADO';
}
