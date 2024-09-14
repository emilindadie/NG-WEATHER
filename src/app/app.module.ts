import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { routing } from "./app.routing";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { CacheInterceptor } from "./core/interceptors/cache-interceptor.service";
import { CurrentConditionsComponent } from "./features/conditions/components/current-conditions/current-conditions.component";
import { MainPageComponent } from "./features/conditions/components/main-page/main-page.component";
import { ZipcodeEntryComponent } from "./features/conditions/components/zipcode-entry/zipcode-entry.component";
import { ForecastsListComponent } from "./features/forecasts/components/forecasts-list/forecasts-list.component";
import { TabGroupComponent } from "./shared/components/tab-group/tab-group.component";
import { TabComponent } from "./shared/components/tab/tab.component";

@NgModule({
  declarations: [AppComponent],
  imports: [
    MainPageComponent,
    ZipcodeEntryComponent,
    CurrentConditionsComponent,
    TabGroupComponent,
    TabComponent,
    ForecastsListComponent,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    routing,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production,
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  ],
})
export class AppModule {}
