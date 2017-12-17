import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss']
})
export class ImagePreviewComponent implements OnInit {

  public files: any[] = [];
  public index: number = 0;
  public errorOccured: boolean = false;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    window.addEventListener('keydown', (e: any) => {
      this.moveLeftRight(e.keyCode);
    })
  }

  moveLeftRight(keyCode) {
    switch (keyCode) {
      case 39:
        this.next();
        break;
      case 37:
        this.prev();
      default:
        break;
    }
  }

  ngOnDestroy() {
    window.removeEventListener('keydown', (e: any) => {
      this.moveLeftRight(e.keyCode);
    })
  }

  get currentImage() {
    return this.files[this.index];
  }

  close() {
    this.activeModal.dismiss();
  }

  next() {
    this.errorOccured = false;
    this.index++;
    if (this.index >= this.files.length) {
      this.index = 0;
    }
  }

  prev() {
    this.errorOccured = false;
    this.index--;
    if (this.index < 0) {
      this.index = this.files.length - 1;
    }
  }

  videoError($event) {
    this.errorOccured = true;
  }

}
