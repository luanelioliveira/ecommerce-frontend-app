import { PedidoDTO } from './../../models/pedido.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-pedido-pagamento',
  templateUrl: 'pedido-pagamento.html',
})
export class PedidoPagamentoPage {

  pedido: PedidoDTO;

  parcelas: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.pedido = this.navParams.get('pedido');
      this.formGroup = this.formBuilder.group({
        numberPayments: [1, Validators.required],
        "@type": ["paymentCard"]
      });

  }

  proximaPagina() {
    this.pedido.payment = this.formGroup.value;
    this.navCtrl.push('PedidoConfirmacaoPage', {pedido: this.pedido});
  }

}
