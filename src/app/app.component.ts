import {Component} from '@angular/core';
import {Event as RouterEvent, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {StateService} from "./_shared/services/state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Sets initial value to true to show loading spinner on first load
  loading: boolean = true;

  constructor(private router: Router, private stateService: StateService) {
    /*this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });*/
    this.stateService.getState()
      .subscribe(
        state => {
          this.loading = state.isLoading;
        }
      );
  }

  // Shows and hides the loading spinner during RouterEvent changes
  /*navigationInterceptor(event: RouterEvent): void {

    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }*/
}
