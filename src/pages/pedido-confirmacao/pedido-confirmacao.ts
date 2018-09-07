import { ClienteService } from './../../services/domain/cliente.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { CartService } from './../../services/domain/cart.service';
import { PedidoDTO } from './../../models/pedido.dto';
import { CartItem } from './../../models/cart-item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';
import { PedidoService } from '../../services/domain/pedido.service';

@IonicPage()
@Component({
  selector: 'page-pedido-confirmacao',
  templateUrl: 'pedido-confirmacao.html',
})
export class PedidoConfirmacaoPage {

  pedido: PedidoDTO;
  cartItems: CartItem[];
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public clientService: ClienteService,
    public pedidoService: PedidoService) {
    this.pedido = this.navParams.get('pedido');
    console.log(this.pedido);
  }

  ionViewDidLoad() {

    this.cartItems = this.cartService.getCart().items;
    this.clientService.findById(this.pedido.client.id)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findAddress(this.pedido.shippingAddress.id, response['addresses']);
      },
      error => {
        this.navCtrl.setRoot('HomePage');
      });
    console.log();
  }

  private findAddress(id: string, enderecos: EnderecoDTO[]): EnderecoDTO {
    let position = enderecos.findIndex(x => x.id == id);
    return enderecos[position];
  }

  total(){
    return this.cartService.total();
  }

  checkout() {
    this.pedidoService.insert(this.pedido)
      .subscribe(response => {
        this.cartService.createOrClearCart();
        console.log(response.headers.get('location'));
      },
      error => {
        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }
      });
  }

  back() {
    this.navCtrl.setRoot('CarrinhoPage');
  }

}
