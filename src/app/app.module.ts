import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LazyLoadImageModule } from "ng-lazyload-image";

import { AppComponent } from './app.component';
import { NetworkService } from "./network.service";
import { HttpClientModule } from '@angular/common/http';
import { FileBrowserComponent } from './file-browser/file-browser.component';
import { LightboxModule } from "angular2-lightbox";

@NgModule({
  declarations: [
    AppComponent,
    FileBrowserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LazyLoadImageModule,
    LightboxModule,
    RouterModule.forRoot([
      {
        path: 'browser',
        component: FileBrowserComponent
      },
      { path: '', redirectTo: '/browser', pathMatch: 'full' }
    ])
  ],
  providers: [NetworkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
