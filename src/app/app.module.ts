/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbIconLibraries,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { NbAuthJWTToken, NbAuthModule, NbDummyAuthStrategy, NbPasswordAuthStrategy } from '@nebular/auth';
import { FormsModule } from '@angular/forms';
import { AutofocusFixModule } from 'ngx-autofocus-fix';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    AutofocusFixModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',

          baseEndpoint: 'https://localhost:5001',
              login: {
                endpoint: '/api/account/login',
                method: 'post',
              },
              logout: {
                redirect:
                {
                  success: '/',
                  failure: '/'
                },
              },
              register: {
                endpoint: '/api/account/register',
                method: 'post',
              },
              token: {
                class: NbAuthJWTToken,
                key: 'token',
              }
        }),
      ],
      forms: {},
    }),
    NgbModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private iconLibraries: NbIconLibraries) {
    this.iconLibraries.registerFontPack('fa-solid', {packClass: 'fa-solid', iconClassPrefix: 'fa' });
  }
}
