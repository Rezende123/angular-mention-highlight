import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

/*

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {

  constructor(public http: Http) {
  }

  findForLetter(creadential) {
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
}
