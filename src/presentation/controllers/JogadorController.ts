import { Request, Response, NextFunction } from 'express';
import { ConvidarJogadorUseCase } from '../../application/usecases/ConvidarJogadorUseCase';
import { SolicitarAdesaoUseCase } from '../../application/usecases/SolicitarAdesaoUseCase';
import { IJogadorRepository } from '../../domain/repositories/IJogadorRepository';
import { IPartidaRepository } from '../../domain/repositories/IPartidaRepository';
import { Jogador } from '../../domain/entities/Jogador';
import { NotFoundException } from '../../application/exceptions/NotFoundException';

export class JogadorController {
  constructor(
    private convidarUseCase: ConvidarJogadorUseCase,
    private solicitarUseCase: SolicitarAdesaoUseCase,
    private jogadorRepo: IJogadorRepository,
    private partidaRepo: IPartidaRepository
  ) { }

  // Convidar outro jogador
  async convidar(req: Request, res: Response, next: NextFunction) {
    try {
      const { convidanteId } = req.params;
      const { emailConvidado } = req.body;
      const convite = await this.convidarUseCase.execute(convidanteId, emailConvidado);

      // Retornar apenas dados essenciais
      res.json({
        id: convite.id,
        status: convite.status,
        convidadoEmail: convite.convidadoEmail,
        convidante: {
          id: convite.convidante.id,
          nome: convite.convidante.nome,
          email: convite.convidante.email
        }
      });
    } catch (err) {
      next(err);
    }
  }

  // Solicitar adesão a uma partida
  async solicitarAdesao(req: Request, res: Response, next: NextFunction) {
    try {
      const { jogadorId, partidaId } = req.params;
      const pedido = await this.solicitarUseCase.execute(jogadorId, partidaId);

      res.json({
        id: pedido.id,
        status: pedido.status,
        partidaId: pedido.partida.id
      });
    } catch (err) {
      next(err);
    }
  }

  // Listar todos os jogadores
  async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const jogadores = (await this.jogadorRepo.listarTodos()) as Jogador[];
      res.json(jogadores.map(j => ({
        id: j.id,
        nome: j.nome,
        email: j.email,
        idade: j.idade,
        sexo: j.sexo,
        categoria: j.categoria
      })));
    } catch (err) {
      next(err);
    }
  }

  // Listar convites de um jogador específico
  async convites(req: Request, res: Response, next: NextFunction) {
    try {
      const jogador = (await this.jogadorRepo.buscarPorId(req.params.id)) as Jogador;
      if (!jogador) throw new NotFoundException('Jogador não encontrado');

      res.json({
        enviados: jogador.getConvitesEnviados().map(c => ({
          id: c.id,
          status: c.status,
          convidadoEmail: c.convidadoEmail,
          convidante: {
            id: c.convidante.id,
            nome: c.convidante.nome,
            email: c.convidante.email
          }
        })),
        recebidos: jogador.getConvitesRecebidos().map(c => ({
          id: c.id,
          status: c.status,
          convidadoEmail: c.convidadoEmail,
          convidante: {
            id: c.convidante.id,
            nome: c.convidante.nome,
            email: c.convidante.email
          }
        }))
      });
    } catch (err) {
      next(err);
    }
  }

  // Listar pedidos de adesão de um jogador específico
  async pedidos(req: Request, res: Response, next: NextFunction) {
    try {
      const jogador = (await this.jogadorRepo.buscarPorId(req.params.id)) as Jogador;
      if (!jogador) throw new NotFoundException('Jogador não encontrado');

      res.json(jogador.getPedidosDeAdesao().map(p => ({
        id: p.id,
        status: p.status,
        partidaId: p.partida.id
      })));
    } catch (err) {
      next(err);
    }
  }
}
