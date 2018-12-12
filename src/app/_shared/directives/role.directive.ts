import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {StateService} from "../services/state.service";

@Directive({
  selector: '[appRole]'
})
export class RoleDirective {
  username: string;
  @Input() set appRole(owner: string) {
    if (this.username === owner) {
      this.view.createEmbeddedView(this.template);
    } else {
      this.view.clear();
    }
  }

  constructor(private template: TemplateRef<any>,
              private view: ViewContainerRef,
              private stateService: StateService) {

    this.username = this.stateService.getUsername();
  }

}
