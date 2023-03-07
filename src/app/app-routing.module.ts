import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PeopleComponent} from "./people/people.component";
import {PersonComponent} from "./person/person.component";

const routes: Routes = [
  { path: '', component: PeopleComponent },
  { path: 'person/:id', component: PersonComponent, data: { action: 'edit' } },
  { path: 'person', component: PersonComponent, data: { action: 'new' } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
