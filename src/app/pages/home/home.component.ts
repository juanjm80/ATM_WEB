import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import {ToastrService} from 'ngx-toastr'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DataService]
})
export class HomeComponent {
  tarjetaMask: string = "0000-0000-0000-0000";
  loginObj: any = {
    "NumeroTarjeta": ""
  };
  constructor(private http: HttpClient, private router: Router,
    private dataSrv: DataService,
    public toastr: ToastrService){}

  onHome() {
    this.getVerificar();
  }

  getVerificar() {
    this.dataSrv.getVerificar(this.loginObj).subscribe(res => {
      if(res.resultado) {
        this.toastr.success('Tarjeta Verificada.', 'ATM', { timeOut: 5000 });  //error info  warning
        localStorage.setItem('NumeroTarjeta', this.loginObj.NumeroTarjeta);
        this.router.navigateByUrl('/login');        
      } else {
      }
    },
    (error) => {
      this.loginObj.NumeroTarjeta = "";
      this.toastr.error(error.error.msg, 'ATM', { timeOut: 5000 });
      this.router.navigateByUrl('/home');
    })
  }

  onClear() {
    this.loginObj.NumeroTarjeta = "";
  }
}
