import {Component} from '@angular/core';
import {Person} from "../entity/person";
import {PersonService} from "../services/person.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Contact} from "../entity/contact";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
})
export class PersonComponent {
  // @Input() person?: Person;

  person: Person;

  isEditMode = this.route.snapshot.data['action'] === 'new';

  contactTypeOptions = [
    {tooltip: 'Celular', value: 'cellphone', icon: 'pi pi-fw pi-phone'},
    {tooltip: 'WhatsApp', value: 'whatsapp', icon: 'pi pi-fw pi-whatsapp'},
    {tooltip: 'Telefone Fixo', value: 'landline', icon: 'pi pi-fw pi-phone'},
    {tooltip: 'E-mail', value: 'email', icon: 'pi pi-fw pi-inbox'}
  ];

  selectedContact?: Contact;

  emptyContact = {
    contact: '',
    contact_type: 'cellphone'
  } as Contact

  formGroup: FormGroup;

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private location: Location,
    public formBuilder: FormBuilder,
  ) {
    this.person = { contacts: [this.emptyContact] as Contact[] } as Person;
    this.selectedContact = this.person.contacts[0];
    this.formGroup = this.formBuilder.group({
      contact: ['', [Validators.required]],
      contacts: [[], [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.route.snapshot.data['action'] === 'edit') {
      this.getPerson(this.route.snapshot.paramMap.get('id') as string);
    }
  }

  getIconContact(contact: Contact): string {
    return this.contactTypeOptions.find(opt => opt.value === contact.contact_type)?.icon ?? '';
  }

  getPerson(id: string): void {
    console.warn('call get person');
    this.personService.getPerson(id).subscribe((person) => (this.person = person.data));
  }

  goBack(): void {
    this.location.back();
  }

  addContact(): void {
    if (this.person?.contacts.length) {
      this.person.contacts = [...this.person.contacts, {
        contact: '',
        contact_type: 'cellphone'
      } as Contact];
    } else {
      this.person.contacts = [this.emptyContact];
    }

    this.selectedContact = this.person.contacts[this.person.contacts.length -1];
  }

  toggleEditMode() {
    console.log('toogle edit');
    this.isEditMode = !this.isEditMode;
  }

  save(): void {
    if (this.person) {
      this.person.contacts.forEach(c => {
        if (c.contact_type !== 'email') {
          c.contact = c.contact.replace(/\D/g, '');
        }

        if (c.contact_type === 'whatsapp') {
          c.contact = '+' + c.contact;
        }
      })

      if (this.route.snapshot.data['action'] === 'new') {
        this.personService.createPerson(this.person)
          .subscribe(     {
            next: (v) => {
              if (!v) return;
              this.goBack();
            },
            error: (e) => {
              console.warn(e);
            },
        });
      } else {
        this.personService.updatePerson(this.person)
          .subscribe(     {
            next: (v) => {
              if (!v) return;
              this.goBack();
            },
            error: (e) => {
              console.warn(e);
            },
        });
      }
    }
  }
}
