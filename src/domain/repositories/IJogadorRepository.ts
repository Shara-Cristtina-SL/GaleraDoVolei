import { InterfaceJogador } from '../entities/Interface_jogador';

export interface IJogadorRepository {
  salvar(jogador: InterfaceJogador): Promise<void>;
  buscarPorId(id: string): Promise<InterfaceJogador | null>;
  buscarPorEmail(email: string): Promise<InterfaceJogador | null>;
  listarTodos(): Promise<InterfaceJogador[]>;
}
