import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';
import { isEmpty } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers:[HttpService],
})
export class LoginPage {
  constructor(
      private authSvc: AuthService,
      private router: Router,
      private http: HttpService) {}

  async onLogin(email, password) {
    try {
      const user = await this.authSvc.login(email.value, password.value);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        const key = user.uid;
        const correo = user.email;
        const nombre = user.displayName; 
        // this.update(key, correo, nombre);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }
  //enrique.pelaez.garcia@gmail.com
  async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        const uid = user.uid;
        const correo = user.email;
        const nombre = user.displayName; 
        // this.BuscarUsuario(uid, correo, nombre);
        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }
  //metodos para peticiones
  update(key, correo, nombre): void{
    this.http.updateDatos(key, correo, nombre).then(res=>{
      alert(JSON.stringify(res));
    })
  }

  BuscarUsuario(key,correo, nombre){
    this.http.getUsuario(key).subscribe(res => {
        console.log(res)
       // const key_id = JSON.stringify(res)
        // console.log(key_id)
        if(res === '' || res === null || res === undefined){
          this.guardarUsuario(key, correo, nombre);
          console.log('Usuario nuevo Guardado')
        }else{
          this.update(key, correo, nombre);
          console.log('Usuario Atualizado')
        }
      },
      (error) =>{
        console.error(error);
      }
    );
  }

  guardarUsuario(key, correo, nombre) {
      this.http.postDatos(key, correo, nombre).then(res=>{
        alert(JSON.stringify(res));
      })
    }

    LoginFacebook(){
      alert('facebook');
    }


}
