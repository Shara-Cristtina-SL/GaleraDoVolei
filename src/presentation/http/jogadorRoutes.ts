import { Router } from 'express';
import { JogadorRepositoryInMemory } from '../../infrastructure/repositories/JogadorRepositoryInMemory';
import { PartidaRepositoryInMemory } from '../../infrastructure/repositories/PartidaRepositoryInMemory';
import { ConvidarJogadorUseCase } from '../../application/usecases/ConvidarJogadorUseCase';
import { SolicitarAdesaoUseCase } from '../../application/usecases/SolicitarAdesaoUseCase';
import { ListarJogadoresUseCase } from '../../application/usecases/ListarJogadoresUseCase';
import { JogadorController } from '../controllers/JogadorController';
import { NotFoundException } from '../../application/exceptions/NotFoundException';
import { Jogador } from '../../domain/entities/Jogador';

const router = Router();

const repo = new JogadorRepositoryInMemory();
const partidaRepo = new PartidaRepositoryInMemory();

// Dados iniciais
const maria = repo.criar('Maria', 'maria@example.com', 30, 'F', 'Adulto');
const joao = repo.criar('Joao', 'joao@example.com', 28, 'M', 'Adulto');

const convidarUseCase = new ConvidarJogadorUseCase(repo);
const solicitarUseCase = new SolicitarAdesaoUseCase(partidaRepo, repo);
const listarUseCase = new ListarJogadoresUseCase(repo);

const controller = new JogadorController(convidarUseCase, solicitarUseCase, repo, partidaRepo);

// Rotas
router.post('/:convidanteId/convidar', controller.convidar.bind(controller));
router.post('/:jogadorId/partidas/:partidaId/solicitar', controller.solicitarAdesao.bind(controller));

router.get('/', async (req, res, next) => {
  try {
    const jogadores = await listarUseCase.execute();
    res.json(jogadores);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/convites', async (req, res, next) => {
  try {
    const jogador = (await repo.buscarPorId(req.params.id)) as Jogador;
    if (!jogador) throw new NotFoundException('Jogador não encontrado');

    res.json({
      enviados: jogador.getConvitesEnviados().map(c => ({
        id: c.id,
        status: c.status,
        convidadoEmail: c.convidadoEmail
      })),
      recebidos: jogador.getConvitesRecebidos().map(c => ({
        id: c.id,
        status: c.status,
        convidadoEmail: c.convidadoEmail
      }))
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:id/pedidos', async (req, res, next) => {
  try {
    const jogador = (await repo.buscarPorId(req.params.id)) as Jogador;
    if (!jogador) throw new NotFoundException('Jogador não encontrado');

    res.json(jogador.getPedidosDeAdesao().map(p => ({
      id: p.id,
      status: p.status,
      partidaId: p.partida.id
    })));
  } catch (err) {
    next(err);
  }
});

export default router;
