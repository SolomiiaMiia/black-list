import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routingAnimation } from '../shared/animations/routing-animation';
import { AdminService } from '../shared/services/admin.service';

@Component({
  selector: 'app-finish-dossier',
  templateUrl: './finish-dossier.component.html',
  styleUrls: ['./finish-dossier.component.scss'],
  animations: [routingAnimation],
  host: { '[@routingAnimation]': '' }
})
export class FinishDossierComponent implements OnInit {


  constructor(private adminService: AdminService,
    private router: Router, @Inject(DOCUMENT) private document: Document) {

  }
  ngOnInit(): void {
    console.log('created');
  }

  private addScripts(url: string) {
    var scriptUrl = url;
    let node = this.document.createElement('script');
    node.src = scriptUrl;
    node.type = 'text/javascript';
    node.async = true;
    node.charset = 'utf-8';
    this.document.getElementsByTagName('head')[0].appendChild(node);
  }

  ngAfterViewInit() {
    this.addScripts('/assets/eusign.js');
    this.addScripts('/assets/sign.processor.js');
  }

}
