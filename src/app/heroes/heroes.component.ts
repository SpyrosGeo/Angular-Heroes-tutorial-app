import { Component, OnInit } from '@angular/core';
import { Hero } from 'src/hero';
import { MessageService } from '../message.service';
import { HeroService } from '../hero.service';
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
 heroes:Hero[] = [];
//  selectedHero?:Hero;

  constructor(private heroService:HeroService, private messageService:MessageService) { }
  //similar to componentDidMount executes at start
  ngOnInit(): void {
    this.getHeroes()
  }


  // onSelect(hero:Hero):void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`HeroesComponent: Selected hero with id: $`)
  // }
  getHeroes(): void {
    // this.heroes = this .heroService.getHeroes()//bind the method as it was in class based react
    //because we use Observables now we need to use subscribe to get data every time the change. this is something like promises and is async
    this.heroService.getHeroes().subscribe(heroes=> this.heroes = heroes)
  }
  add(name:string):void{
    name =name.trim();
    if(!name){return ;}
    this.heroService.addHero({name} as Hero).subscribe(hero=>{
      this.heroes.push(hero)
    })
  }
  delete(hero:Hero):void{
    this.heroes = this.heroes.filter(h=> h!== hero)
    this.heroService.deleteHero(hero.id).subscribe()
  }
}
