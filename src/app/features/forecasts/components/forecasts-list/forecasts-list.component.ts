import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Forecast } from "./forecast.type";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { AsyncPipe, DatePipe, DecimalPipe, NgFor, NgIf } from "@angular/common";
import { WeatherService } from "app/shared/services/weather.service";

@Component({
  selector: "app-forecasts-list",
  templateUrl: "./forecasts-list.component.html",
  styleUrls: ["./forecasts-list.component.css"],
  standalone: true,
  imports: [RouterLink, AsyncPipe, DatePipe, DecimalPipe, NgIf, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastsListComponent {
  forecast$: Observable<Forecast>;

  constructor(
    protected weatherService: WeatherService,
    route: ActivatedRoute,
  ) {
    this.forecast$ = route.params.pipe(
      switchMap(({ zipcode }) => weatherService.getForecast(zipcode)),
    );
  }
}
