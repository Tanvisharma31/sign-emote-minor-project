import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingComponent} from './landing.component';
import {LanguagesComponent} from './languages/languages.component';
import {ContributeComponent} from './contribute/contribute.component';
import {ToolsComponent} from './tools/tools.component';
import {AppTranslocoModule} from '../../core/modules/transloco/transloco.module';
import {LandingRoutingModule} from './landing-routing.module';
import {StoresComponent} from '../../components/stores/stores.component';
import {LazyMapComponent} from './languages/lazy-map/lazy-map.component';
import {LicensesComponent} from './licenses/licenses.component';
import {MatTreeModule} from '@angular/material/tree';
import {CdkTreeModule} from '@angular/cdk/tree';
import {MatExpansionModule} from '@angular/material/expansion';
import {SettingsPageModule} from '../settings/settings.module';
import {IonicModule} from '@ionic/angular';
import {I18NLanguageSelectorComponent} from '../../components/i18n-language-selector/i18n-language-selector.component';

import {PrivacyComponent} from './privacy/privacy.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MermaidChartComponent} from './mermaid-chart/mermaid-chart.component';
import {LandingFooterComponent} from './landing-footer/landing-footer.component';

@NgModule({
  declarations: [
    LandingComponent,
    LanguagesComponent,
    ContributeComponent,
    ToolsComponent,
    I18NLanguageSelectorComponent,
    StoresComponent,
    LazyMapComponent,
    LicensesComponent,
    LandingFooterComponent,
    PrivacyComponent,
  ],
  imports: [
    CommonModule,
    AppTranslocoModule,
    LandingRoutingModule,
    MatTreeModule,
    CdkTreeModule,
    MatExpansionModule,
    SettingsPageModule,
    IonicModule,
    MermaidChartComponent,
  ],
  bootstrap: [LandingComponent],
  exports: [I18NLanguageSelectorComponent],
})
export class LandingModule {}
