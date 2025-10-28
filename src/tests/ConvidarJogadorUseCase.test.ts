import { JogadorRepositoryInMemory } from '../infrastructure/repositories/JogadorRepositoryInMemory';
import { ConvidarJogadorUseCase } from '../application/usecases/ConvidarJogadorUseCase';

describe('ConvidarJogadorUseCase', () => {
  it('should create a pending convite', async () => {
    const repo = new JogadorRepositoryInMemory();
    const usecase = new ConvidarJogadorUseCase(repo);

    const convidante = repo.criar('Ana', 'ana@example.com', 25, 'F', 'Adulto');
    const convite = await usecase.execute(convidante.id, 'bruno@example.com');

    expect(convite).toBeDefined();
    expect(convite.status).toBe('PENDENTE');
    expect(convite.convidante.id).toBe(convidante.id);
  });
});
