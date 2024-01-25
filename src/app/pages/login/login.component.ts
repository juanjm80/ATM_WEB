import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import {ToastrService} from 'ngx-toastr'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DataService]
})
export class LoginComponent implements OnInit{
  tarjetaPinMask: string = "0000";
  contador: number = 0;
  loginObj: any = {
    "NumeroTarjeta": "",
    "Pin": ""
  };
  loginBloqueo: any = {
    "NumeroTarjeta": ""
  };
  constructor(private http: HttpClient, private router: Router,
    private dataSrv: DataService,
    public toastr: ToastrService){}

  ngOnInit() {
    this.contador = 0;
  }

  onLogin() {
    this.getLogin();
  }

  getLogin() {
    this.loginObj.NumeroTarjeta = localStorage.getItem('NumeroTarjeta');
    this.dataSrv.getLogin(this.loginObj).subscribe(res => {
      if(res) {
        this.toastr.success('Ingreso Exitoso', 'ATM', { timeOut: 5000 });
        localStorage.setItem('loginTOken', res.token);
        localStorage.setItem('Pin', this.loginObj.Pin);
        localStorage.setItem('FechaExpiracion', res.fechaExpiracion);
        localStorage.setItem('Disponible', res.disponible);
        this.router.navigateByUrl('/dashboard');
      } else {
      }
    },
    (error) => {
      this.loginObj.Pin = "";
      this.contador = this.contador + 1;
      this.toastr.error(error.error.msg, 'ATM', { timeOut: 5000 });
      if (this.contador == 4) {
        this.loginBloqueo.NumeroTarjeta = this.loginObj.NumeroTarjeta;
        this.setBloquear();  
      }
    })
  }

  setBloquear() {    
    this.dataSrv.setBloquear(this.loginBloqueo).subscribe(res => {
      if(res.resultado) {
        this.toastr.error(res.msg, 'ATM', { timeOut: 5000 });
        this.router.navigateByUrl('/home');
      } else {
      }
    })
  }

  onClear() {
    this.loginObj.Pin = "";
  }

  onSalir() {
    this.loginObj.Pin = "";
    this.router.navigateByUrl('/home');
  }
}


