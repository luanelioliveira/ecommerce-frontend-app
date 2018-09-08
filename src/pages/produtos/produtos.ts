import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadProdutos();
  }

  loadProdutos() {
    let loading = this.presentLoading();
    let categoriaId = this.navParams.get('categoriaId');
    this.produtoService.findByCategoria(categoriaId)
      .subscribe(response => {
        this.items = response['content'];
        this.loadSmallImages();
        loading.dismiss();
      },
      errors => {
        loading.dismiss();
      });
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

  showDetail(produto: ProdutoDTO) {
    this.navCtrl.push('ProdutoDetalhePage', {produto : produto});
  }

  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
  
    loading.present();
    return loading;
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.loadProdutos();
      refresher.complete();
    }, 1000);
  }

}
