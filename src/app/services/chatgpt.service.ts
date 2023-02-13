import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../responseDTO';


const API_URL = 'http://localhost:8080/chat';


@Injectable({ providedIn: 'root' })
export class ChatgptService {

  constructor(private http: HttpClient) { }


  obterResposta(texto: string): Observable<ResponseDTO> {
    const params = new HttpParams()
      .set('texto', texto);
    return this.http.get<ResponseDTO>(API_URL + "?" + params.toString());
  }


}
