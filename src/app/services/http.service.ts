import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  loadUsers(): Observable<any>{
    return this.http.get('http://localhost:3001/51BnAEnzr5PJ1oVIDYVyQjcNJjB2') 
    // https://randomuser.me/api/?results=25
  }
  
  postDatos(KEY, correo, nombre) {
    const datos = { ID: '0', CORREO: correo, NOMBRE:nombre, KEY_ID:KEY};
    const options = {
        headers: {
        'Content-Type': 'application/json'
      }
    };  
    const url = 'http://localhost:3001/';  
    return this.http.post(url, JSON.stringify(datos), options).toPromise();
  }

  updateDatos(KEY_ID, correo, nombre) {
    const datos = {CORREO: correo, NOMBRE:nombre};
    // const KEY_ID = JSON.stringify(key)
    
    const options = {
        headers: {
        'Content-Type': 'application/json'
      }
    };  
    const url = `http://localhost:3001/${KEY_ID}`;  
    return this.http.put(url, JSON.stringify(datos), options).toPromise();
  }

  getUsuario(KEY_ID): Observable<any>{
    // console.log('prueba ley',KEY_ID);
    return this.http.get<any>( `http://localhost:3001/${KEY_ID}`) 
    // https://randomuser.me/api/?results=25
  }
  
  

}
