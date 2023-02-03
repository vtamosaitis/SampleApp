import { Routes, RouterModule } from '@angular/router';

import { ContactsComponent } from './contacts/contacts.component';
import { HelloworldComponent } from './helloworld/helloworld.component';

const appRoutes: Routes = [
    { path: '', component: ContactsComponent },
    { path: 'hello', component: HelloworldComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(appRoutes);