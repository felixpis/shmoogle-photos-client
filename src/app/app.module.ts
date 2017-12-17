import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LazyLoadImageModule } from "ng-lazyload-image";

import { AppComponent } from './app.component';
import { NetworkService } from "./network.service";
import { FileBrowserComponent } from './file-browser/file-browser.component';
import { ThumbRotatorDirective } from './file-browser/video-thumb-rotate.directive';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ImagePreviewComponent } from './file-browser/image-preview/image-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    FileBrowserComponent,
    ThumbRotatorDirective,
    ImagePreviewComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    LazyLoadImageModule,
    RouterModule.forRoot([
      {
        path: 'browser',
        component: FileBrowserComponent
      },
      { path: '', redirectTo: '/browser', pathMatch: 'full' }
    ])
  ],
  entryComponents: [
    ImagePreviewComponent
  ],
  providers: [NetworkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
