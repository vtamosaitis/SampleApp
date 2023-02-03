import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { ContactsService } from './contacts.service'
import { Contact } from '../models/Contact'
import { CreateDialogComponent } from './dialogs/create-dialog/create-dialog.component';
import { EditDialogComponent } from './dialogs/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { subscribe } from 'graphql';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  contacts!:Contact[];
  sortedData!:Contact[];

  constructor(
    private contactsService: ContactsService,
    public dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.contactsService.getContacts().then(data => {
      this.contacts=data;
      this.sortedData=this.contacts.slice();
    });
  }

  sortData(sort: Sort) {
    const data = this.contacts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'phoneNumber':
          return compare(a.phoneNumber, b.phoneNumber, isAsc);
        default:
          return 0;
      }
    });
  }

  createContact() {
    let dialogRef = this.dialog.open(CreateDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if (data) { 
        let contact = new Contact(null!, data.name, data.phoneNumber);
        this.contactsService.addContact(contact).then(contact => {
          this.contacts.push(contact);
          this.sortedData = this.contacts.slice();
        });
      }
    });
  }

  editContact(contact: Contact) {
    let dialogRef = this.dialog.open(EditDialogComponent, 
      {
        data: {
          id: contact.id, 
          name: contact.name, 
          phoneNumber: contact.phoneNumber
        }
      });

      dialogRef.afterClosed().subscribe(dialogData => {
        this.contactsService.updateContact(dialogData).then(data => {
          if (data.id == dialogData.id) {
            this.contacts = this.contacts.map(c => {
              return c.id == data.id ? data : c;
            });
            this.sortedData = this.contacts.slice();
          }
        });
      });
  }

  confirmDelete(contact: Contact) {
    let dialogRef = this.dialog.open(DeleteDialogComponent);

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.contactsService.deleteContact(contact.id);

        // remove contact
        this.contacts = this.contacts.filter(c => c != contact);
        this.sortedData = this.contacts.slice();
      }
    });
  }
}

function compare(a: String, b: String, isAsc: boolean) {
  if (a === null) a = "";
  if (b === null) b = "";
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}