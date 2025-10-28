import { IPartidaRepository } from '../../domain/repositories/IPartidaRepository';
import { Partida } from '../../domain/entities/Partida';

export class EncerrarPartidaUseCase {
  constructor(private partidaRepo: IPartidaRepository) {}

  async execute(partidaId: string): Promise<Partida> {
    const partida = await this.partidaRepo.buscarPorId(partidaId);
    if (!partida) throw new Error('Partida não encontrada');

    // Alterar status para encerrada (supondo que a entidade Partida tenha isso)
    partida.encerrar();

    // Salvar atualização
    await this.partidaRepo.salvar(partida);

    return partida;
  }
}
