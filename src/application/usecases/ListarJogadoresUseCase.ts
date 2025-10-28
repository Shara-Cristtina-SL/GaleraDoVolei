import { IJogadorRepository } from '../../domain/repositories/IJogadorRepository';
import { Jogador } from '../../domain/entities/Jogador';

export class ListarJogadoresUseCase {
  constructor(private jogadorRepo: IJogadorRepository) {}

  async execute(): Promise<any[]> {
    const jogadores = (await this.jogadorRepo.listarTodos()) as Jogador[];

    return jogadores.map(j => ({
      id: j.id,
      nome: j.nome,
      email: j.email,
      idade: j.idade,
      sexo: j.sexo,
      categoria: j.categoria,
      convitesEnviados: j.getConvitesEnviados(),
      convitesRecebidos: j.getConvitesRecebidos(),
      pedidosDeAdesao: j.getPedidosDeAdesao()
    }));
  }
}
