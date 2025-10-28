import { JogadorRepositoryInMemory } from '../infrastructure/repositories/JogadorRepositoryInMemory';
import { PartidaRepositoryInMemory } from '../infrastructure/repositories/PartidaRepositoryInMemory';
import { SolicitarAdesaoUseCase } from '../application/usecases/SolicitarAdesaoUseCase';

describe('SolicitarAdesaoUseCase', () => {
  it('should create a pending pedido and not add participant until accepted', async () => {
    const jogadorRepo = new JogadorRepositoryInMemory();
    const partidaRepo = new PartidaRepositoryInMemory();

    const criador = jogadorRepo.criar('Carlos', 'carlos@example.com', 30, 'M', 'Adulto');
    const jogador = jogadorRepo.criar('Paulo', 'paulo@example.com', 22, 'M', 'Adulto');
    const partida = partidaRepo.criar('Quadra B', '2025-11-10T10:00:00Z', 'Adulto', 'MISTA', criador);

    const usecase = new SolicitarAdesaoUseCase(partidaRepo, jogadorRepo);
    const pedido = await usecase.execute(jogador.id, partida.id);

    expect(pedido).toBeDefined();
    expect(pedido.status).toBe('PENDENTE');
    expect(partida.participantes.length).toBe(0);
  });
});
