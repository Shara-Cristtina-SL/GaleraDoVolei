import { InterfaceJogador } from './Interface_jogador';
import { Convite } from './Convite';
import { InterfaceConvite } from './InterfaceConvite';
import { Partida } from './Partida';
import { PedidoDeAdesao } from './PedidoDeAdesao';

export class Jogador implements InterfaceJogador {
  private convitesEnviados: Convite[] = [];
  private convitesRecebidos: InterfaceConvite[] = [];
  private pedidosDeAdesao: PedidoDeAdesao[] = [];

  constructor(
    public readonly id: string,
    public nome: string,
    public email: string | undefined,
    public idade: number,
    public sexo: string,
    public categoria: string
  ) {}

  async convidar(email: string): Promise<InterfaceConvite> {
    const convite = Convite.criar(this, email);
    this.convitesEnviados.push(convite);
    return convite;
  }

  getConvitesEnviados(): InterfaceConvite[] {
  return this.convitesEnviados;
}

getConvitesRecebidos(): InterfaceConvite[] {
  return this.convitesRecebidos;
}

getPedidosDeAdesao(): PedidoDeAdesao[] {
  return this.pedidosDeAdesao;
}


  receberConvite(convite: InterfaceConvite): void {
    this.convitesRecebidos.push(convite);
  }

  solicitarAdesao(partida: Partida): PedidoDeAdesao {
    const pedido = PedidoDeAdesao.criar(this, partida);
    this.pedidosDeAdesao.push(pedido);
    return pedido;
  }

  listarConvitesAceitos(): InterfaceJogador[] {
    return this.convitesEnviados.filter(c => c.status === 'ACEITO').map(c => c.convidante);
  }
  
}
