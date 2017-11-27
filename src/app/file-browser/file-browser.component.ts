import { NetworkService } from '../network.service';
import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'angular2-lightbox/lightbox.service';

@Component({
  selector: 'app-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.scss']
})
export class FileBrowserComponent implements OnInit {

  public paths: any = {
    files: [], currentPath: null, previousPath: null
  };
  public dirs: any[] = [];
  public files: any[] = [];
  constructor(private network: NetworkService, private lightbox: Lightbox) { }

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
    let pages = Math.ceil(files.length / 5);
    for (let index = 0; index < pages; index++) {
      let start = index * 5;
      let partlyFiles = files.slice(start, start + 5);
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
    this.getPaths(dir.path);
  }

  get disableBack() {
    return this.paths.previousPath === null;
  }

  back() {
    if (this.paths.previousPath === null) {
      return;
    }

    this.getPaths(this.paths.previousPath);
  }

  openPreview(index: number) {
    this.lightbox.open(this.files, index);
  }

}
