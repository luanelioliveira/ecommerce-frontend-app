import { ClienteService } from './../../services/domain/cliente.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { CartService } from './../../services/domain/cart.service';
import { PedidoDTO } from './../../models/pedido.dto';
import { CartItem } from './../../models/cart-item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';

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
    public carService: CartService,
    public clientService: ClienteService) {
    this.pedido = this.navParams.get('pedido');
    console.log(this.pedido);
  }

  ionViewDidLoad() {

    this.cartItems = this.carService.getCart().items;
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
    return this.carService.total();
  }

  proximaPagina() {

  }

  voltar() {

  }

}
