import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  //Per la reactive form creo due proprietà che conterranno i valori delle caselle di testo
  form = new FormGroup({
    "name": new FormControl(),
    "type": new FormControl(),
  });
  //Mi faccio iniettare l'animal servce
  constructor(private animalService : AnimalsService)
  {
    //Mi sottoscrivo al servizio
    this.animalService.getAnimals().subscribe(
      (data: VettAnimal)=>{this.data = data['animals']}
    )
  }
  onSubmit() {
    console.log("reactive form submitted");
    console.log(this.form.controls['name'].value);
    console.log(this.form.controls['type'].value);
    let a : Animal = {
      "id": '0',
      "name":this.form.controls['name'].value,
      "type": this.form.controls['type'].value
    };

    //Quando ricevo una risposta dal server aggiorno l'id dell'animale e lo invio al vettore data
    this.animalService.sendNewAnimal(a).subscribe(
      (data)=>{
        console.log(data);
        a.id = data['id'];
        this.data.push(a);
      }
    )
  }
}