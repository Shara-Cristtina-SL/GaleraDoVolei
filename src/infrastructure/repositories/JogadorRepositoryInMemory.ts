import { IJogadorRepository } from '../../domain/repositories/IJogadorRepository';
import { InterfaceJogador } from '../../domain/entities/Interface_jogador';
import { Jogador } from '../../domain/entities/Jogador';


export class JogadorRepositoryInMemory implements IJogadorRepository {
  private storage: Map<string, InterfaceJogador> = new Map();

  async salvar(jogador: InterfaceJogador): Promise<void> {
    this.storage.set(jogador.id, jogador);
  }

  async buscarPorId(id: string): Promise<InterfaceJogador | null> {
    return this.storage.get(id) || null;
  }

  async buscarPorEmail(email: string): Promise<InterfaceJogador | null> {
    for (const j of this.storage.values()) {
      if ((j as any).email === email) return j;
    }
    return null;
  }

  // novo método obrigatório da interface
  async listarTodos(): Promise<InterfaceJogador[]> {
    return Array.from(this.storage.values());
  }

  // convenience helper to create and save
  criar(nome: string, email: string | undefined, idade: number, sexo: string, categoria: string) {
    const j = new Jogador(require('crypto').randomUUID(), nome, email, idade, sexo, categoria);
    this.storage.set(j.id, j);
    return j;
  }
}

