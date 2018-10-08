import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import {  DataService } from './service/data.service';
import { OverviewHubService } from './service/overview.hub.service';
import { PingHubService } from './service/ping.hub.service';
import { HttpRequestInterceptor } from './request.interceptor';
import { PagerService } from './service/pager.service';

@NgModule({
    imports: [HttpClientModule],
    exports: [],
    declarations: [],
    providers: []
})
export class CoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [
                DataService,
                OverviewHubService,
                PingHubService,
                PagerService/*,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HttpRequestInterceptor,
                    multi: true
                }*/
            ]
        };
    }
}
