import {NgModule} from "@angular/core";
import {JwtModule, JwtModuleOptions} from "@auth0/angular-jwt";
import {environment} from "../environments/environment";

export function getToken() {
  return localStorage.getItem('token');
}

const jwtConfig: JwtModuleOptions = {
  config: {
    tokenGetter: getToken,
    whitelistedDomains: [environment.origin]
  }
};

@NgModule({
    imports: [
      JwtModule.forRoot(jwtConfig)
    ],
    exports: [JwtModule]
  }
)
export class AppJwtModule {}
