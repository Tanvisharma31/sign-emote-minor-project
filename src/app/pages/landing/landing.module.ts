import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingComponent} from './landing.component';
import {AboutComponent} from './about/about.component';
import {LanguagesComponent} from './languages/languages.component';
import {ContributeComponent} from './contribute/contribute.component';
import {ToolsComponent} from './tools/tools.component';
import {AppTranslocoModule} from '../../core/modules/transloco/transloco.module';
import {LandingRoutingModule} from './landing-routing.module';
import {StoresComponent} from '../../components/stores/stores.component';
import {MatTreeModule} from '@angular/material/tree';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatExpansionModule} from '@angular/material/expansion';
import {SettingsPageModule} from '../settings/settings.module';
import {IonicModule} from '@ionic/angular';
import {I18NLanguageSelectorComponent} from '../../components/i18n-language-selector/i18n-language-selector.component';
import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [
    LandingComponent,
    AboutComponent,
    LanguagesComponent,
    ContributeComponent,
    ToolsComponent,
    I18NLanguageSelectorComponent,
    StoresComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    AppTranslocoModule,
    LandingRoutingModule,
    MatTreeModule,
    CdkTreeModule,
    MatExpansionModule,
    MatTabsModule,
    SettingsPageModule,
    IonicModule,
  ],
  bootstrap: [LandingComponent],
})
export class LandingModule {}
