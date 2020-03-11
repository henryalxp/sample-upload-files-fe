import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UploadFileService {

    constructor(private https: HttpClient) { }

    pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
        const data: FormData = new FormData();
        data.append('file', file);
        const newRequest = new HttpRequest(
            'POST',
            'http://localhost:8080/savefile',
            data,
            {
                reportProgress: true,
                responseType: 'text'
            });
        return this.https.request(newRequest);
    }

    pushFilesToStorage(files: FileList): Observable<HttpEvent<{}>> {
        const data: FormData = new FormData();
        // var values = [];
        Array.from(files).forEach(file => {
            console.log(file);
            // var value = {
            //     name: file.name,
            //     file: file
            // };
            // values.push(value);
            data.append('files',file);
        });
        const newRequest = new HttpRequest(
            'POST',
            'http://localhost:8080/savefiles',
            data,
            {
                reportProgress: true,
                responseType: 'text'
            });
        return this.https.request(newRequest);
    }

}