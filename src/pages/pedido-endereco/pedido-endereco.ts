import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
  selector: 'page-pedido-endereco',
  templateUrl: 'pedido-endereco.html',
})
export class PedidoEnderecoPage {

  items: EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.items = [
      {
        id: "1",
        address: "Rua Adalberto",
        number: "544",
        complement: "Sobrado",
        district: "Glória",
        zipCode: "89219-160",
        city: {
          id: "1",
          name: "Joinville",
          state: {
            id: "1",
            name: "Santa Catarina"
          }
        }
      },
      {
        id: "2",
        address: "Rua Felix",
        number: "537",
        complement: "APTO 401",
        district: "Costa e Silva",
        zipCode: "89218-321",
        city: {
          id: "1",
          name: "Joinville",
          state: {
            id: "1",
            name: "Santa Catarina"
          }
        }
      },
    ]
  }

}
