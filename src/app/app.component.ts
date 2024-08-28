import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { routingAnimation } from './shared/animations/routing-animation';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routingAnimation],
  host: { '[@routingAnimation]': '' }
})

export class AppComponent implements OnInit {
  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data)
    ).subscribe(event => {
      const title = event['title'] || 'BLACKLIST.UA'; // Default title if not set in route data
      this.titleService.setTitle(title);
    });
  }
}
