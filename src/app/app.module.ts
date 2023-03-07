import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestecomponentComponent } from './testecomponent/testecomponent.component';
import { FormsModule } from "@angular/forms";
import {ListboxModule} from "primeng/listbox";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ToolbarModule} from "primeng/toolbar";
import { PeopleComponent } from './people/people.component';
import {HttpClientModule} from "@angular/common/http";
import {InputTextModule} from "primeng/inputtext";
import {KeyFilterModule} from "primeng/keyfilter";
import { PersonComponent } from './person/person.component';
import {MenuModule} from "primeng/menu";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DropdownModule} from "primeng/dropdown";
import {SelectButtonModule} from "primeng/selectbutton";
import {InputMaskModule} from "primeng/inputmask";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

@NgModule({
  declarations: [
    AppComponent,
    TestecomponentComponent,
    PeopleComponent,
    PersonComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ListboxModule,
    CardModule,
    ButtonModule,
    RippleModule,
    ToolbarModule,
    HttpClientModule,
    InputTextModule,
    KeyFilterModule,
    MenuModule,
    DropdownModule,
    SelectButtonModule,
    InputMaskModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
