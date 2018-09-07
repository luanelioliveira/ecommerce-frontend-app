import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  items : ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoriaId = this.navParams.get('categoriaId');
    this.produtoService.findByCategoria(categoriaId)
      .subscribe(response => {
        this.items = response['content'];
        this.loadSmallImages();
      },
      errors => {});
  }

  loadSmallImages() {
    for(var i = 0 ; i < this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
      .subscribe(reponse => {
        item.imageUrl = this.produtoService.getUrlSmallImage(item.id);
      },
      error => {});
    }
  }

  showDetalhe(produtoId: string) {
    this.navCtrl.push('ProdutoDetalhePage');
  }

}
