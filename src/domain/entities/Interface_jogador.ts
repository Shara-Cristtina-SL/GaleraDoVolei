import { InterfaceConvite } from './InterfaceConvite';
import { Partida } from './Partida';
import { PedidoDeAdesao } from './PedidoDeAdesao';

export interface InterfaceJogador {
  readonly id: string;
  nome: string;
  email?: string;
  idade: number;
  sexo: string;
  categoria: string;

  convidar(email: string): Promise<InterfaceConvite>;
  receberConvite(convite: InterfaceConvite): void;
  solicitarAdesao(partida: Partida): PedidoDeAdesao;
}
