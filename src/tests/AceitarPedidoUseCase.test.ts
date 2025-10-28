import { Partida } from "../domain/entities/Partida";
import { Jogador } from "../domain/entities/Jogador";
import { PedidoDeAdesao } from "../domain/entities/PedidoDeAdesao";
import { AceitarPedidoUseCase } from "../application/usecases/AceitarPedidoUseCase";

describe("AceitarPedidoUseCase", () => {
  it("should accept a pedido and add participant", () => {
    const jogador = new Jogador("1", "Alice", "Alice@.com", 25, "F", "Adulto");
    const partida = new Partida("10", "Quadra A", String(new Date()), "Adulto", "FEMININA", new Jogador("2", "Ana", "Ana@.com", 25, "F", "Adulto"));
    
    partida.situacao = "ADESAO";

    const pedido = PedidoDeAdesao.criar(jogador, partida);
    const usecase = new AceitarPedidoUseCase();
    usecase.execute(pedido);

    expect(pedido.status).toBe("ACEITO");
    expect(partida.participantes.length).toBe(1);
  });
});
