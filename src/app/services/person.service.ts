import { Injectable } from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import {PeopleResponse, Person, PersonResponse} from "../entity/person";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../enviroments/environment";
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private peopleUrl = `${environment.baseUrl}/person`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }
  /** GET people from the server */
  getPeople(): Observable<PeopleResponse> {
    return this.http.get<PeopleResponse>(this.peopleUrl)
      .pipe(
        tap(_ => console.warn('fetched people')),
        catchError(this.handleError<PeopleResponse>('getPeople', {} as PeopleResponse))
      );
  }

  /* GET People whose name contains search term */
  searchPeople(term: string): Observable<PeopleResponse> {
    if (!term.trim()) {
      return of({ data:[] });
    }
    return this.http.get<PeopleResponse>(`${this.peopleUrl}/?name=${term}`).pipe(
      tap(x => x.data.length ?
        console.warn(`found people matching "${term}"`) :
        console.warn(`no people matching "${term}"`)),
      catchError(this.handleError<PeopleResponse>('searchPeople', {} as PeopleResponse))
    );
  }

  /** GET person from the server */
  getPerson(id: string): Observable<PersonResponse> {
    return this.http.get<PersonResponse>(`${this.peopleUrl}/${id}`)
      .pipe(
        tap(_ => console.warn('fetched person')),
        catchError(this.handleError<PersonResponse>('getPeroson', {} as PersonResponse))
      );
  }

  /** POST: create the person on the server */
  createPerson(person: Person): Observable<any> {
    return this.http.post(`${this.peopleUrl}`, person, this.httpOptions).pipe(
      tap(_ =>
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Contato criado com sucesso!'}
        )),
      catchError(this.handleError<any>('createPerson'))
    );
  }

  /** PUT: update the person on the server */
  updatePerson(person: Person): Observable<any> {
    return this.http.put(`${this.peopleUrl}/${person.id}`, person, this.httpOptions).pipe(
      tap(_ =>
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Contato atualizado com sucesso!'}
        )),
      catchError(this.handleError<any>('updatePerson'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (e: any): Observable<T> => {
      if (e.error.data) {
        Object.values(e.error.data).forEach((errorMessage) => {
          console.warn('errorMessage', errorMessage);
          this.messageService.add({severity: 'error', summary: 'Error', detail: errorMessage as string})
        });
      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: e.error.message})
      }

      return of(result as T);
    };
  }
}
