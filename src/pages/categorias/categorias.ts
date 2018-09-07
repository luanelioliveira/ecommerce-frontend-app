import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;
  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService : CategoriaService,
    public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    let loading = this.presentLoading();
    this.categoriaService.findAll()
      .subscribe(response => {
        this.items = response;
        loading.dismiss();
      }, 
      error => {
        loading.dismiss();
      });
  }

  showProdutosPage(categoriaId : string) {
    this.navCtrl.push('ProdutosPage', {categoriaId : categoriaId});
  }

  presentLoading() {
    let loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
  
    loading.present();
    return loading;
  }

}
