import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainPageComponent } from "./features/conditions/components/main-page/main-page.component";
import { ForecastsListComponent } from "./features/forecasts/components/forecasts-list/forecasts-list.component";

const appRoutes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import(
        "./features/conditions/components/main-page/main-page.component"
      ).then((m) => MainPageComponent),
  },
  {
    path: "forecast/:zipcode",
    loadComponent: () =>
      import(
        "./features/forecasts/components/forecasts-list/forecasts-list.component"
      ).then((m) => ForecastsListComponent),
  },
];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(
  appRoutes,
  {},
);
