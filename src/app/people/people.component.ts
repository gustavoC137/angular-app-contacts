import { Component } from '@angular/core';
import {Person} from "../entity/person";
import {PersonService} from "../services/person.service";
import {debounce, debounceTime} from "rxjs";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent {
  selectedPerson?: Person;

  people: Person[] = [];

  constructor(
    private personService: PersonService,
  ) {}

  ngOnInit(): void {
    this.getPeople();
  }

  onSelect(person: Person): void {
    /*
    * A regex is applied on each iteration and the pattern found is stripped from the string.
    * If at the end of the loop the string is empty, true is returned to the validator.
    * */

    this.selectedPerson = person;
  }

  getPeople(): void {
    this.personService.getPeople().subscribe((people) => (this.people = people.data));
  }

  search(value: string): void {
    if (!value.length) return;

    this.personService.searchPeople(value)
      .subscribe((people) => (this.people = people.data));
  }

}
