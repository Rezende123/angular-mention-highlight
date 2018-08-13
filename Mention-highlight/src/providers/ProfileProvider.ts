import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'module_rxjs_provider/rxjs/add/operator/map';

/*

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  constructor(public http: Http) {
  }

  listAll() {
    return new Promise((resolve, reject) => {
      const cabecalho = new Headers();
      cabecalho.append('Content-Type', 'application/json');

      this.http.get('http://localhost:8080/perfil/all/', {headers: cabecalho})
        .subscribe(res => {
          const data = res.json();
          //console.log(data);
          resolve(data);
        }, err => {
          reject(err);
        });
    });
  }

  FindForLetter(creadential) {
    return new Promise((resolve, reject) => {
      const cabecalho = new Headers();
      cabecalho.append('Content-Type', 'application/json');

      this.http.get('http://localhost:8080/perfil/letter/' + creadential, {headers: cabecalho})
        .subscribe(res => {
          const data = res.json();
          //console.log(data);
          resolve(data);
        }, err => {
          reject(err);
        });
    });
  }

  FindForId(creadential){
    return new Promise((resolve, reject) => {
      const cabecalho = new Headers();
      cabecalho.append('Content-Type', 'application/json');

      this.http.get('http://localhost:8080/perfil/id/' + creadential, {headers: cabecalho})
        .subscribe(res => {
          const data = res.json();
          resolve(data);
        }, err => {
          reject(err);
        });
    });
  }
}
