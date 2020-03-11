import { Component } from '@angular/core';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import { UploadFileService } from './services/upload-file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };
  selectedFile = null;
  changeImage = false;

  constructor(private uploadService: UploadFileService) { }

  uploadFile() {
    this.progress.percentage = 0;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService
      .pushFileToStorage(this.currentFileUpload)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
          console.log('uploading percentage: ' + this.progress.percentage);
        } else if (event instanceof HttpResponse) {
          console.log('File Successfully Uploaded');
        }
        this.selectedFiles = undefined;
      }
      );
  }

  uploadFilesOneByOne() {
    this.progress.percentage = 0;
    Array.from(this.selectedFiles).forEach(currentFileUpload => {
      this.uploadService
      .pushFileToStorage(this.currentFileUpload)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
          console.log('uploading percentage: ' + this.progress.percentage);
        } else if (event instanceof HttpResponse) {
          console.log('File Successfully Uploaded');
        }
        this.selectedFiles = undefined;
      }
      );
    });
  }

  uploadFiles() {
    this.progress.percentage = 0;
    console.log("amount of files to be uploaded: " + this.selectedFiles.length);
    this.uploadService
      .pushFilesToStorage(this.selectedFiles)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
          console.log('uploading percentage: ' + this.progress.percentage);
        } else if (event instanceof HttpResponse) {
          console.log('Files Successfully Uploaded');
        }
        this.selectedFiles = undefined;
      }
      );
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

}