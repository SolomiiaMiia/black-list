import { Component, Input, OnInit } from '@angular/core';
import * as saveAs from 'file-saver';
import { FileDto } from '../models/fileDto';
import { APIService } from '../shared/services/api.service';


@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss']
})
export class FilePreviewComponent implements OnInit {

  @Input() files: FileDto[] = [];

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
  }

  download(url: string, name: string): void {
    this.apiService.downloadFile(url).subscribe(data => {
      const blob = new Blob([data]);
      saveAs(blob, name);
    });

  }


}
