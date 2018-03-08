import { NetworkService } from '../network.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Lightbox } from 'angular2-lightbox/lightbox.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagePreviewComponent } from './image-preview/image-preview.component';

const PAGE_SIZE: number = 10;

@Component({
  selector: 'app-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FileBrowserComponent implements OnInit {

  public paths: any = {
    files: [], currentPath: null, previousPath: null
  };
  public breadcrumb: any[] = [];
  public dirs: any[] = [];
  public files: any[] = [];
  constructor(private network: NetworkService,
    private modalService: NgbModal) {
  }

  videoAnimation(file) {
    if (file.type != 'video') {
      return null;
    }
    return `${file.thumb}?id=animation`;
  }

  ngOnInit() {
    this.getPaths('');
  }

  getPaths(path) {
    this.dirs = [];
    this.files = [];
    this.network.getPaths(path).then((result) => {
      this.paths = result;
      let fileBlocks = this.prepareFileBlocks(path, this.paths.files);
      this.getFileInfo(path, fileBlocks, 0);
    });
  }

  prepareFileBlocks(path, files) {
    let resultFiles = [];
    let page = 0;
    let pages = Math.ceil(files.length / PAGE_SIZE);
    for (let index = 0; index < pages; index++) {
      let start = index * PAGE_SIZE;
      let partlyFiles = files.slice(start, start + PAGE_SIZE);
      resultFiles.push(partlyFiles);
    }

    return resultFiles;
  }
  getFileInfo(path, filesBlocks, index) {
    if (index < filesBlocks.length) {
      this.network.getFileInfo(path, filesBlocks[index]).then((result: any) => {
        this.dirs.push(...result.dirs);
        this.files.push(...result.files);
        this.getFileInfo(path, filesBlocks, ++index);
      })
    }
  }

  openPath(dir) {
    this.breadcrumb.push(dir);
    this.getPaths(dir.path);
  }

  goToPath(part, i) {
    this.breadcrumb.splice(i);
    this.openPath(part);
  }

  get disableBack() {
    return this.paths.previousPath === null;
  }

  back() {
    if (this.paths.previousPath === null) {
      return;
    }
    this.breadcrumb.splice(this.breadcrumb.length - 1);
    this.getPaths(this.paths.previousPath);
  }

  openPreview(index: number) {
    const modalRef = this.modalService.open(ImagePreviewComponent, { windowClass: 'image-preview-modal' });
    modalRef.componentInstance.files = this.files;
    modalRef.componentInstance.index = index;
    //this.lightbox.open(this.files, index);
  }

  imageLoaded($event, file) {
    file.isLoaded = true;
  }

}
