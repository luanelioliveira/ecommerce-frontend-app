import { CartService } from './../../services/domain/cart.service';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produto-detalhe',
  templateUrl: 'produto-detalhe.html',
})
export class ProdutoDetalhePage {

  item: ProdutoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public produtoService: ProdutoService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    this.item = this.navParams.get('produto');
    //this.getImageUrlIfExists();  
  }

  getImageUrlIfExists() {
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = this.produtoService.getUrlImage(this.item.id);
      },
      error => {});
  }

  addToCart(produto: ProdutoDTO) {
      this.cartService.addProduct(produto);
      this.navCtrl.setRoot('CarrinhoPage');
  }

}
