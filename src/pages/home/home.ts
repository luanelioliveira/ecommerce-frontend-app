import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { LoginDTO } from '../../models/login.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  login : LoginDTO = {
    username: "",
    password: ""
  };

  constructor(public navCtrl: NavController, public menu: MenuController) {
    
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
  

  loginAction(){
    console.log(this.login)
    this.navCtrl.setRoot('CategoriasPage')
  }

}
