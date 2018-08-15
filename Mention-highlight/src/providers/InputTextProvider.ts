import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

/*

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputTextProvider {

  constructor(public http: Http) {
  }
  postText(creadential) {
    return new Promise((resolve, reject) => {
      const cabecalho = new Headers();
      cabecalho.append('Content-Type', 'application/json');
      this.http.post('http://localhost:8080/text_highlight/', JSON.stringify(creadential), {headers: cabecalho})
        .subscribe(res => {
          const data = res.json();
          //console.log(data);
          resolve(data);
        }, err => {
          reject(err);
        });
    });
  }

  putText(creadential, input_id) {
    return new Promise((resolve, reject) => {
      const cabecalho = new Headers();
      cabecalho.append('Content-Type', 'application/json');
      this.http.put('http://localhost:8080/text_highlight/update/'+ input_id, JSON.stringify(creadential), {headers: cabecalho})
        .subscribe(res => {
          const data = res.json();
          //console.log(data);
          resolve(data);
        }, err => {
          reject(err);
        });
    });
  }

  getText() {
    return new Promise((resolve, reject) => {
      const cabecalho = new Headers();
      cabecalho.append('Content-Type', 'application/json');

      this.http.get('http://localhost:8080/text_highlight/all/', {headers: cabecalho})
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