import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from '../hero'
import { HEROES } from '../seeds'
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes' //URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-type': 'application/json' })
  }
  constructor(private messageService: MessageService, private http: HttpClient) { }



  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //TODO:set the error to remote loggin
      console.error(error)

      //TODO: better job of transforming error for user consumption
      this.log(`${operation} failed ${error.message}`)

      //Let the app keep running by returning an empty results
      return of(result as T)
    }
  }


  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl) //<Hero[]> type gives the untyped JSON object  typscript capabilities
      .pipe(
        tap(_ => this.log('fetched heroes ')),
        catchError(this.handleError<Hero[]>(`getHeroes`, []))
      ) //like try/catch block in React
  }
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url)
    .pipe(
      tap(_=>this.log(`fetched hero id: ${id}`)),
      catchError(this.handleError<Hero>(`getHero id: ${id}`))
    )
  }
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id:${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  addHero(hero:Hero):Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl,hero,this.httpOptions).pipe(
      tap((newHero:Hero)=> this.log(`added hero with id: ${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )

    //error handling
  
  }
}