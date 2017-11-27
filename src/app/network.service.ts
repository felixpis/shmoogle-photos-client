import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NetworkService {
    constructor(private httpClient: HttpClient) { }

    getPaths(path) {
        return this.httpClient.post('/api/browser', { path }).toPromise();
    }

    getFileInfo(path, files) {
        return this.httpClient.post('/api/fileInfo', { path, files }).toPromise();
    }
}