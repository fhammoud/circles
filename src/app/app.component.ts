import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {StateService} from "./_shared/services/state.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewChecked{
  // Sets initial value to true to show loading spinner on first load
  @ViewChild("main") window: ElementRef;
  loading: boolean = true;

  constructor(private router: Router, private stateService: StateService) { }

  ngOnInit(): void {
    this.stateService.getState()
      .subscribe(
        state => {
          this.loading = state.isLoading;
        }
      );
  }

  ngAfterViewChecked(): void {
    this.window.nativeElement.scrollTop = this.window.nativeElement.scrollHeight;
  }
}
