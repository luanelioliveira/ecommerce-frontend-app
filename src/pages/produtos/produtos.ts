import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {
        id : "1",
        name : "Mouse",
        preco : 35.99
      },
      {
        id : "2",
        name : "Teclado",
        preco : 53.43
      },
      {
        id : "1",
        name : "Monitor",
        preco : 350.56
      },
    ]
  }

}