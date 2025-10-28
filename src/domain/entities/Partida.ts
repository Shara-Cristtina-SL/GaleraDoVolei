import { Jogador } from './Jogador';
import { Categoria } from '../value_objects/Categoria';

export class Partida {
  public participantes: Jogador[] = [];
  public situacao: 'NOVA' | 'ADESAO' | 'ENCERRADA' | 'REALIZADA' = 'NOVA';
  public moderadores: Jogador[] = [];

  constructor(
    public readonly id: string,
    public local: string,
    public data: string,
    public categoria: Categoria,
    public tipo: 'MISTA' | 'MASCULINA' | 'FEMININA',
    public criador: Jogador
  ) {}

  iniciarAdesao() {
    if (this.situacao !== 'NOVA') throw new Error('Partida não pode iniciar adesão');
    this.situacao = 'ADESAO';
  }

  adicionarParticipante(j: Jogador) {
    if (this.situacao !== 'ADESAO') throw new Error('Partida não está em adesão');
    this.participantes.push(j);
  }

  adicionarModerador(j: Jogador) {
    this.moderadores.push(j);
  }

  encerrar() {
    this.situacao = 'ENCERRADA';
  }
}
