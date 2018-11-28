import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AudienceInfoComponent } from './pages/audience-info/audience-info.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: AudienceInfoComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
