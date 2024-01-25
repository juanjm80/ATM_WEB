import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  NumeroTarjeta: any;
  FechaExpiracion: any;
  Disponible: any;
  isBalance: boolean = false;
  isRetiro: boolean = false;
  obj: any = {
    "NumeroTarjeta": "",
    "Pin": "",
    "Retiro": ""    
  };
  retiroMask: string = "000.000";

  constructor(private http: HttpClient, private router: Router,
    private dataSrv: DataService,
    public toastr: ToastrService){}
    
  onBalance() {
    this.isBalance = true;
    this.isRetiro = false;
    this.NumeroTarjeta = localStorage.getItem('NumeroTarjeta');
    this.FechaExpiracion = localStorage.getItem('FechaExpiracion');
    this.Disponible = localStorage.getItem('Disponible');      
  }

  onRetiro() {
    this.isBalance = false;
    this.isRetiro = true;
  }

  onClear() {
    this.obj.Retiro = "";
  }

  onExtraer() {
    this.obj.NumeroTarjeta = localStorage.getItem('NumeroTarjeta');
    this.obj.Pin = localStorage.getItem('Pin');
    this.dataSrv.setRetiro(this.obj).subscribe(res => {
      if(res) {
        this.toastr.success('Retiro Exitoso', 'ATM', { timeOut: 5000 });
        localStorage.removeItem('loginTOken');
        localStorage.removeItem('NumeroTarjeta');
        localStorage.removeItem('Pin');
        localStorage.removeItem('FechaExpiracion');
        localStorage.removeItem('Disponible');
        this.router.navigateByUrl('/home');
      } else {
      }
    },
    (error) => {
      /* this.loginObj.Pin = "";
      this.contador = this.contador + 1;
      this.toastr.error(error.error.msg, 'ATM', { timeOut: 5000 });
      if (this.contador == 4) {
        this.loginBloqueo.NumeroTarjeta = this.loginObj.NumeroTarjeta;
        this.setBloquear();  
      } */
    })
  }
}
