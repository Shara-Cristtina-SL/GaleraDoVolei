import { Router } from 'express';
import { PartidaRepositoryInMemory } from '../../infrastructure/repositories/PartidaRepositoryInMemory';
import { ListarPartidasUseCase } from '../../application/usecases/ListarPartidasUseCase';
import { NotFoundException } from '../../application/exceptions/NotFoundException';

const router = Router();

const partidaRepo = new PartidaRepositoryInMemory();
const listarPartidasUseCase = new ListarPartidasUseCase(partidaRepo);

// GET todas as partidas
router.get('/', async (req, res, next) => {
  try {
    const partidas = await listarPartidasUseCase.execute();
    res.json(partidas);
  } catch (err) {
    next(err);
  }
});

// GET partida por ID
router.get('/:id', async (req, res, next) => {
  try {
    const partida = await partidaRepo.buscarPorId(req.params.id);
    if (!partida) throw new NotFoundException('Partida não encontrada');

    res.json(partida);
  } catch (err) {
    next(err);
  }
});

export default router;
