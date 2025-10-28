import { IJogadorRepository } from '../../domain/repositories/IJogadorRepository';

export class ConvidarJogadorUseCase {
  constructor(private jogadorRepo: IJogadorRepository) {}

  async execute(convidanteId: string, convidadoEmail: string) {
    const convidante = await this.jogadorRepo.buscarPorId(convidanteId);
    if (!convidante) throw new Error('Convidante não encontrado');
    const convite = await convidante.convidar(convidadoEmail);
    return convite;
  }
}
