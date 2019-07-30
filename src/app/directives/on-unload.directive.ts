import { Directive, HostListener } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Directive({
  selector: '[OnUnload]',
})
export class OnUnloadDirective {
  constructor(private authService: AuthenticationService) {}

  @HostListener('window:beforeunload') onDestroy() {
    if (this.authService.getMaintainance()) return;
    this.authService.logout();
  }
}
