import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LanguagesComponent} from './languages/languages.component';
import {ContributeComponent} from './contribute/contribute.component';
import {ToolsComponent} from './tools/tools.component';
import {LandingComponent} from './landing.component';
import {LicensesComponent} from './licenses/licenses.component';
import {PrivacyComponent} from './privacy/privacy.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {path: 'about', redirectTo: ''},
      {path: 'languages', component: LanguagesComponent},
      {path: 'contribute', component: ContributeComponent},
      {path: 'tools', component: ToolsComponent},
      {path: 'privacy', component: PrivacyComponent},
      {path: 'licenses', component: LicensesComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
