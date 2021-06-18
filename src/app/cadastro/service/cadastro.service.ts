import { cadastro } from './../models/cadastro.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  cadastroUrl = environment.urlDaApi + '/cadastro';

  constructor(private http: HttpClient) {}

  public getCadastro(): Observable<any> {
    return this.http.get(this.cadastroUrl);
  }

  public postCadastro(cadastro: cadastro) {
    const HttpHeader = new HttpHeaders({
      'content-type': 'application/json',
    });
    console.log("CADASTRO", cadastro);
    return this.http.post(this.cadastroUrl, cadastro);
  }

  public getCadastroWithId(id: number): Observable<any> {
    return this.http.get(this.cadastroUrl + '/' + id);
  }

  public putCadastro(
    cadastro: cadastro,
    id: number
  ): Observable<any> {
    cadastro.id = id;
    const HttpHeader = new HttpHeaders({
      'content-type': 'application/json',
    });

    return this.http.put(this.cadastroUrl + '/' + id, cadastro, {
      headers: HttpHeader,
    });
  }

  public deleteCadastro(id: number) {
    return this.http.delete(this.cadastroUrl + '/' + id);
  }
}
