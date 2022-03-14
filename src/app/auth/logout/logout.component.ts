import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NbAuthService, NbLogoutComponent, NbTokenService, NB_AUTH_OPTIONS } from '@nebular/auth';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
})
export class NgxLogoutComponent extends NbLogoutComponent {
    constructor(
        private nbTokenService:NbTokenService, 
        protected service: NbAuthService,
        @Inject(NB_AUTH_OPTIONS) protected options = {},
        protected router: Router) {
            super(service,options,router);
    }

    ngOnInit() {
        super.ngOnInit();
    }
        
    logout(strategy: string){
        super.logout(strategy);
        this.nbTokenService.clear();
    }
}