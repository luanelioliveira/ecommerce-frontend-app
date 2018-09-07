import { CartService } from './../../services/domain/cart.service';
import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/auth/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';

@IonicPage()
@Component({
  selector: 'page-pedido-endereco',
  templateUrl: 'pedido-endereco.html',
})
export class PedidoEnderecoPage {

  items: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['addresses'];

          let cart = this.cartService.getCart();

          this.pedido = {
            client: {id: response['id']},
            shippingAddress: null,
            payment: null,
            itens: cart.items.map(x => { return {quantity: x.quantidade, product: {id: x.produto.id}} })
          }

        },
        error => {
          if(error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        }
      )
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  proximaPagina(endereco: EnderecoDTO) {
    this.pedido.shippingAddress = {id: endereco.id};
    this.navCtrl.push('PedidoPagamentoPage', {'pedido': this.pedido});
  }



}
