import { Component, Input, OnInit } from '@angular/core';
import { FileDto } from '../models/fileDto';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.scss']
})
export class FilePreviewComponent implements OnInit {

  @Input() files: FileDto[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
