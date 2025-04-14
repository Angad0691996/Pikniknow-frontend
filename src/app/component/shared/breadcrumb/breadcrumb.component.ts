import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  routeData: any;
  showComponent: boolean = true;
  constructor(private router: Router, private route: ActivatedRoute) {
    router.events
      .forEach(e => {
        if (e instanceof NavigationEnd) {
          if (route.root.firstChild.snapshot.data) {
            this.routeData = route.root.firstChild.snapshot.data;
          }
          this.showComponent = true;
        }
      })
  }

  ngOnInit() {
  }

}
