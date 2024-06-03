
import { Component } from '@angular/core';
import { AnimalsService } from './animals.service';
import { Animal, VettAnimal } from './animals.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  data = new Array<Animal>();
  //Mi faccio iniettare l'animal servce
  constructor(private animalService : AnimalsService)
  {
    //Mi sottoscrivo al servizio
    this.animalService.getAnimals().subscribe(
      (data: VettAnimal)=>{this.data = data['animals']}
    )
  }
}