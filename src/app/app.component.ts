import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, CanActivate, Router, RoutesRecognized} from "@angular/router";
import {AuthGuard} from "./_shared/guards/auth.guard";
import {StateService} from "./_shared/services/state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isLoading: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authGuard: AuthGuard,
    private stateService: StateService) { }

  ngOnInit() {
    this.router.events
      .subscribe(event => {
        if (event instanceof RoutesRecognized) {
          this.guardRoute(event);
        }
      });

    this.stateService.getState()
      .subscribe((state) => {
        this.isLoading = state.isLoading;
      })
}

  private guardRoute(event: RoutesRecognized): void {
    if (this.isPublic(event)) {
      return;
    }

    if (!this.callCanActivate(event, this.authGuard)) {
      return;
    }
  }

  private callCanActivate(event: RoutesRecognized, guard: CanActivate) {
    return guard.canActivate(this.route.snapshot, event.state);
  }

  private isPublic(event: RoutesRecognized) {
    return event.state.root.firstChild.data.isPublic;
  }
}
