import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  providers:[HttpService],
})
export class AdminPage implements OnInit {
  // usuarios: any[];
  constructor(
    private authservice: AuthService,
    private http: HttpService
  ) { }

  ngOnInit() {
  }

  logout(){
    this.authservice.logout();
  }

  cargarUsuarios(){
    this.http.loadUsers().subscribe(res => {
        console.log(res)
      },
      (error) =>{
        console.error(error);
      }
    );
  }


  // post() {
  //   this.http.postDatos().then(res=>{
  //     alert(JSON.stringify(res));
  //   })
  // }

  // update(){
  //   this.http.updateDatos().then(res=>{
  //     alert(JSON.stringify(res));
  //   })
  // }


}
