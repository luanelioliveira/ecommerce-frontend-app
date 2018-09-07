import { ProdutoDTO } from './../../models/produto.dto';
import { CartItem } from './../../models/cart-item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoService } from '../../services/domain/produto.service';
import { CartService } from '../../services/domain/cart.service';

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  items: CartItem[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadSmallImages();
  }

  loadSmallImages() {
    for(var i = 0 ; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id)
      .subscribe(reponse => {
        item.produto.imageUrl = this.produtoService.getUrlSmallImage(item.produto.id);
      },
      error => {});
    }
  }

  adicionarItem(produto: ProdutoDTO) {
    this.items = this.cartService.addProduct(produto).items;
  }

  excluirItem(produto: ProdutoDTO) {
    this.items = this.cartService.removeProduct(produto).items;
  }

  excluirTodoItem(produto: ProdutoDTO) {
    this.items = this.cartService.removeAllProduct(produto).items;
  }

  total(): number {
    return this.cartService.total();
  }

  continuarComprando() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  finalizarPedido() {
    this.navCtrl.push('PedidoEnderecoPage');
  }

}
