import { IPartidaRepository } from '../../domain/repositories/IPartidaRepository';
import { Partida } from '../../domain/entities/Partida';
import { InterfaceJogador } from '../../domain/entities/Interface_jogador';
import { Categoria } from '../../domain/value_objects/Categoria';
import { TipoPartida } from '../../domain/value_objects/TipoPartida';

export class PartidaRepositoryInMemory implements IPartidaRepository {
  private storage: Map<string, Partida> = new Map();

  async salvar(partida: Partida): Promise<void> {
    this.storage.set(partida.id, partida);
  }

  async buscarPorId(id: string): Promise<Partida | null> {
    return this.storage.get(id) || null;
  }

  async listarTodos(): Promise<Partida[]> {
    return Array.from(this.storage.values());
  }

  criar(
    local: string,
    data: string,
    categoria: Categoria,
    tipo: TipoPartida,
    criador: InterfaceJogador 
  ): Partida {
    const p = new Partida(
      require('crypto').randomUUID(),
      local,
      data,
      categoria,
      tipo,
      criador as any 
    );
    this.storage.set(p.id, p);
    return p;
  }
}
