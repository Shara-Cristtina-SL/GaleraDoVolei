import { Request, Response, NextFunction } from 'express';
import { IPartidaRepository } from '../../domain/repositories/IPartidaRepository';
import { Partida } from '../../domain/entities/Partida';
import { CriarPartidaUseCase } from '../../application/usecases/CriarPartidaUseCase';
import { EncerrarPartidaUseCase } from '../../application/usecases/EncerrarPartidaUseCase';

export class PartidaController {
  constructor(
    private partidaRepo: IPartidaRepository,
    private criarPartidaUseCase: CriarPartidaUseCase,
    private encerrarPartidaUseCase: EncerrarPartidaUseCase
  ) {}

  async listar(req: Request, res: Response, next: NextFunction) {
    try {
      const partidas = Array.from(await this.partidaRepo.listarTodos()) as Partida[];
      res.json(partidas);
    } catch (err) {
      next(err);
    }
  }

  async buscarPorId(req: Request, res: Response, next: NextFunction) {
    try {
      const partida = await this.partidaRepo.buscarPorId(req.params.id);
      if (!partida) return res.status(404).json({ message: 'Partida não encontrada' });
      res.json(partida);
    } catch (err) {
      next(err);
    }
  }

  async criar(req: Request, res: Response, next: NextFunction) {
    try {
      const { local, data, categoria, tipo, criadorId } = req.body;
      const partida = await this.criarPartidaUseCase.execute({ local, data, categoria, tipo, criadorId });
      res.status(201).json(partida);
    } catch (err) {
      next(err);
    }
  }

  async encerrar(req: Request, res: Response, next: NextFunction) {
    try {
      const partida = await this.encerrarPartidaUseCase.execute(req.params.id);
      res.json(partida);
    } catch (err) {
      next(err);
    }
  }
}
