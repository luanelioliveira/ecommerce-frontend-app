import { PagamentoDTO } from './pagamento.dto';
import { RefDTO } from './ref.dto';
import { ItemPedidoDTO } from './item-pedido.dto';
export interface PedidoDTO {
    client: RefDTO;
    shippingAddress: RefDTO;
    payment: PagamentoDTO;
    itens: ItemPedidoDTO[];
}