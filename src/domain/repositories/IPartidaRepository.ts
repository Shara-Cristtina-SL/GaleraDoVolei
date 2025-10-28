import { Partida } from '../entities/Partida';
import { InterfaceJogador } from '../entities/Interface_jogador';

export interface IPartidaRepository {
  salvar(partida: Partida): Promise<void>;
  buscarPorId(id: string): Promise<Partida | null>;


  listarTodos(): Promise<Partida[]>;

  criar(
    local: string,
    data: string,
    categoria: string,
    tipo: string,
    criador: InterfaceJogador
  ): Partida;
}
