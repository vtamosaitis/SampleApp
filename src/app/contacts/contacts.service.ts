import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Contact } from '../models/Contact'

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private contacts!: Contact[];

  constructor(private http: HttpClient) {}

  private target = 'http://localhost:3000/graphql';

  getContacts(): Promise<Contact[]> {
    return new Promise<Contact[]>((resolve, reject) => {
      this.http.post<{data: {getContacts: Contact[]}}>(this.target, {
        query: "query {getContacts{id, name, phoneNumber}}"
      }).subscribe(data => {
        this.contacts = data.data.getContacts;
        resolve(this.contacts);
      });
    });
  }

  deleteContact(id: String): void {
    // Should I unsubscribe?
    this.http.post(this.target, {
      query: `mutation {deleteContact(id: "${id}"){id}}`
    }).subscribe();
  }

  updateContact(contact: Contact): Promise<Contact> {
    if (!contact || !contact.name) {
      throw 'Invalid contact';
    }
    let inputStr: String = `name: "${contact.name}"`;
    if (contact.phoneNumber) {
      inputStr += `, phoneNumber: "${contact.phoneNumber}"`;
    } else {
      inputStr += `, phoneNumber: ""`
    }
    return new Promise<Contact>((resolve, reject) => {
      this.http.post<{data:{updateContact: Contact}}>(this.target, {
        query: `mutation {updateContact(id: "${contact.id}", input:{${inputStr}}){id, name, phoneNumber}}`
      }).subscribe(data => {
        let contact = data.data.updateContact;
        resolve(contact);
      });
    });
  }

  addContact(contact: Contact): Promise<Contact> {
    if (!contact || !contact.name) {
      throw 'Invalid contact';
    }
    let inputStr: String = `name: "${contact.name}"`;
    if (contact.phoneNumber) {
      inputStr += `, phoneNumber: "${contact.phoneNumber}"`;
    }
    return new Promise<Contact>((resolve, reject) => {
      this.http.post<{data:{createContact: Contact}}>(this.target, {
        query: `mutation {createContact(input:{${inputStr}}){id, name, phoneNumber}}`
      }).subscribe(data => {
        let contact = data.data.createContact;
        resolve(contact);
      });
    });
  }
}
