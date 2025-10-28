import { IPartidaRepository } from '../../domain/repositories/IPartidaRepository';
import { IJogadorRepository } from '../../domain/repositories/IJogadorRepository';

export class AceitarPedidoUseCase {
  constructor() {}

  async execute(pedido: any) {

    pedido.aceitar();
    return pedido;
  }
}
