import { IPartidaRepository } from '../../domain/repositories/IPartidaRepository';
import { IJogadorRepository } from '../../domain/repositories/IJogadorRepository';
import { Partida } from '../../domain/entities/Partida';
import { InterfaceJogador } from '../../domain/entities/Interface_jogador';

interface CriarPartidaDTO {
  local: string;
  data: string;
  categoria: string;
  tipo: string;
  criadorId: string;
}

export class CriarPartidaUseCase {
  constructor(
    private partidaRepo: IPartidaRepository,
    private jogadorRepo: IJogadorRepository
  ) {}

  async execute(dto: CriarPartidaDTO): Promise<Partida> {
    // Buscar o criador
    const criador = (await this.jogadorRepo.buscarPorId(dto.criadorId)) as InterfaceJogador;
    if (!criador) throw new Error('Jogador criador não encontrado');

    // Criar a partida
    const partida = this.partidaRepo.criar(dto.local, dto.data, dto.categoria, dto.tipo, criador);

    // Salvar no repositório
    await this.partidaRepo.salvar(partida);

    return partida;
  }
}
