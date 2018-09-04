import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-singup',
  templateUrl: 'singup.html',
})
export class SingupPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

      this.formGroup = this.formBuilder.group({
        name: ['Joaquim', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['joaquim@gmail.com', [Validators.required, Validators.email ]],
        typeClient: ['1', [Validators.required ]],
        cpfOrCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        password : ['123', [Validators.required]],
        typeAdress: ['1', [Validators.required ]],
        address : ['Rua Via', [Validators.required]],
        number : ['25', [Validators.required]],
        complement : ['Apto 3', []],
        district : ['Copacabana', []],
        zipCode : ['10828333', [Validators.required]],
        phone1 : ['977261827', [Validators.required]],
        phone2 : ['', []],
        phone3 : ['', []],
        stateId : [null, [Validators.required]],
        cityId : [null, [Validators.required]]   
      });

  }

  signupUser() {
    console.log('Enviou formulário')
  }

  updateCidades() {
    console.log('Atualiza cidades')
  }

}
