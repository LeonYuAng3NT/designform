import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { HomeAuthResolver } from './home-auth-resolver.service';
import { SharedModule } from '../shared';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const homeRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: '',
        component: HomeComponent,
        resolve: {
            isAuthenticated: HomeAuthResolver
        }
    }
]);

@NgModule({
    imports: [
        homeRouting,
        SharedModule,
        NgbModule
    ],
    declarations: [
        HomeComponent
    ],
    providers: [
        HomeAuthResolver
    ]
})
export class HomeModule { }