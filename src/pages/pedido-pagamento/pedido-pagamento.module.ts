import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidoPagamentoPage } from './pedido-pagamento';

@NgModule({
  declarations: [
    PedidoPagamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidoPagamentoPage),
  ],
})
export class PedidoPagamentoPageModule {}
