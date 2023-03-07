import {Contact} from "./contact";

export interface Person {
  id: number;
  name: string;
  contacts: Contact[];
}

export interface PeopleResponse {
  data: Person[]
}
export interface PersonResponse {
  data: Person
}
