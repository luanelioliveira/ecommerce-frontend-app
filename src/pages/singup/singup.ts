import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoService } from '../../services/domain/estado.service';
import { CidadeService } from '../../services/domain/cidade.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';

@IonicPage()
@Component({
  selector: 'page-singup',
  templateUrl: 'singup.html',
})
export class SingupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public estadoService: EstadoService,
    public cidadeService: CidadeService,
    public clienteService: ClienteService,
    public alertController: AlertController) {

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

  ionViewDidLoad() {
    this.getEstados();
  }

  signupUser() {
    this.clienteService.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOK();
      },
      error => {});
  }

  showInsertOK() {
    let alert = this.alertController.create({
      title: "Sucesso!",
      message: "Cadastro efetuado com sucesso",
      enableBackdropDismiss: false,
      buttons : [
        {
          text : 'Ok',
          handler : () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }


  getEstados() {
    this.estadoService.getEstados()
      .subscribe(response => {
        this.estados = response;
        this.formGroup.controls.stateId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error => {});
  }

  updateCidades() {
    let estadoId = this.formGroup.value.stateId;
    this.cidadeService.getCidades(estadoId)
    .subscribe(response => {
      this.cidades = response;
      this.formGroup.controls.cityId.setValue(null);
    },
    error => {});
  }

}
