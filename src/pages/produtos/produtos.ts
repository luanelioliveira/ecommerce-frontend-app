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
  items : ProdutoDTO[] = [];
  page: number = 0;

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
    this.produtoService.findByCategoria(categoriaId, this.page, 10)
      .subscribe(response => {
        let start = this.items.length;
        this.items = this.items.concat(response['content']);
        let end = this.items.length - 1;
        this.loadSmallImages(start, end);
        loading.dismiss();
      },
      errors => {
        loading.dismiss();
      });
  }

  loadSmallImages(start: number, end: number) {
    for(var i = start ; i <= end; i++) {
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
      this.items = [];
      this.page = 0;
      this.loadProdutos();
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;   
    this.loadProdutos();
    setTimeout(() => {   
      infiniteScroll.complete();
    }, 1000);
  }

}
