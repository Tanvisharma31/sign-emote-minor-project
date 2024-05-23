import {ComponentFixture, TestBed} from '@angular/core/testing';
import {axe, toHaveNoViolations} from 'jasmine-axe';

import {TranslateComponent} from './translate.component';
import {NgxsModule, Store} from '@ngxs/store';
import {ngxsConfig} from '../../core/modules/ngxs/ngxs.module';
import {AppTranslocoTestingModule} from '../../core/modules/transloco/transloco-testing.module';
import {LanguageSelectorComponent} from './language-selector/language-selector.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {TranslateState} from '../../modules/translate/translate.state';
import {SettingsState} from '../../modules/settings/settings.state';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslocoService} from '@ngneat/transloco';
import {RouterTestingModule} from '@angular/router/testing';
import {VideoState} from '../../core/modules/ngxs/store/video/video.state';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTooltipModule} from '@angular/material/tooltip';

describe('TranslateComponent', () => {
  let store: Store;
  let component: TranslateComponent;
  let fixture: ComponentFixture<TranslateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TranslateComponent, LanguageSelectorComponent],
      imports: [
        AppTranslocoTestingModule,
        MatTabsModule,
        MatTooltipModule,
        NoopAnimationsModule,
        NgxsModule.forRoot([SettingsState, TranslateState, VideoState], ngxsConfig),
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass accessibility test', async () => {
    jasmine.addMatchers(toHaveNoViolations);
    const a11y = await axe(fixture.nativeElement);
    expect(a11y).toHaveNoViolations();
  });

  it('language change should change title', async () => {
    const transloco = TestBed.inject(TranslocoService);

    transloco.setActiveLang('he');
    expect(document.title).toEqual('תרגום סימנים');

    transloco.setActiveLang('en');
    expect(document.title).toEqual('Sign Translate');
  });

  });
