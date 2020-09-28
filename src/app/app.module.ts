import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { FireBaseModules } from './common-modules';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppComponent } from './components/app-root/app.component';
import { AuthGuard } from "./modules/auth/guards/auth.guard";
import { NoAuthGuard } from "./modules/auth/guards/no-auth.guard";
import { HashLocationStrategy, LocationStrategy, APP_BASE_HREF } from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        ...FireBaseModules,
        AppRoutingModule,
    ],
    providers: [
        AuthGuard,
        NoAuthGuard,
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
