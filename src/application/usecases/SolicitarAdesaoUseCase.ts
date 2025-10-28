import { IPartidaRepository } from '../../domain/repositories/IPartidaRepository';
import { IJogadorRepository } from '../../domain/repositories/IJogadorRepository';

export class SolicitarAdesaoUseCase {
  constructor(private partidaRepo: IPartidaRepository, private jogadorRepo: IJogadorRepository) {}

  async execute(jogadorId: string, partidaId: string) {
    const jogador = await this.jogadorRepo.buscarPorId(jogadorId);
    if (!jogador) throw new Error('Jogador não encontrado');
    const partida = await this.partidaRepo.buscarPorId(partidaId);
    if (!partida) throw new Error('Partida não encontrada');

    const pedido = jogador.solicitarAdesao(partida);
    return pedido;
  }
}
