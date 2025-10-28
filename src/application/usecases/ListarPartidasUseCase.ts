import { PartidaRepositoryInMemory } from '../../infrastructure/repositories/PartidaRepositoryInMemory';

export class ListarPartidasUseCase {
  constructor(private partidaRepo: PartidaRepositoryInMemory) {}

  execute(): any[] {
    return Array.from(this.partidaRepo['storage'].values());
  }
}
