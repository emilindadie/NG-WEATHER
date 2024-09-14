import { inject, Injectable, OnDestroy, Signal, signal } from "@angular/core";
import { forkJoin, Observable, partition, Subject } from "rxjs";
import { filter, map, switchMap, takeUntil } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { LocationNotificationService } from "./notification.service";
import { Forecast } from "app/features/forecasts/components/forecasts-list/forecast.type";
import { ConditionsAndZip } from "../types/conditions-and-zip.type";
import { CurrentConditions } from "../types/current-conditions.type";

@Injectable({ providedIn: "root" })
export class WeatherService implements OnDestroy {
  static URL = "https://api.openweathermap.org/data/2.5";
  static APPID = "5a4b2d457ecbef9eb2a71e480b947604";
  static ICON_URL =
    "https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/";

  private currentConditions = signal<ConditionsAndZip[]>([]);
  private locationNotificationService = inject(LocationNotificationService);
  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient) {
    // create two observable from one , if currentConditions().length < result of observable .length it's add case else it's remove case
    const [addCase$, removeCase$] = partition(
      this.locationNotificationService.currentLocations$,
      (data) => this.currentConditions().length < data.length,
    );

    // filter one each observable to be sure its only one who could subscribe
    addCase$
      .pipe(
        filter(
          (data) => !!data && this.currentConditions().length < data.length,
        ),
        switchMap((zipcodes) => {
          // Determine the new zipcodes compared to stored zipcodes in currentConditions()
          const newZipcodes = this.currentConditions().length
            ? zipcodes.filter(
                (zipcode) =>
                  !this.currentConditions()
                    .map((condition) => condition.zip)
                    .includes(zipcode),
              )
            : zipcodes;
          return forkJoin(
            newZipcodes.map((zipcode) =>
              this.addCurrentCondition(zipcode).pipe(
                map((data) => ({ data, zip: zipcode }) as ConditionsAndZip),
              ),
            ),
          );
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((currentConditionsAndZip) => {
        this.updateCurrentConditions(currentConditionsAndZip);
      });

    removeCase$
      .pipe(
        filter(
          (data) => !!data && this.currentConditions().length > data.length,
        ),
        takeUntil(this.destroy$),
      )
      .subscribe((zipcodes: string[]) => {
        // Determine the deleted zipcode compared to stored zipcodes in currentConditions()
        const itemToRemove = this.currentConditions().find(
          (condition) => !zipcodes.includes(condition.zip),
        );
        if (!!itemToRemove) this.removeCurrentConditions(itemToRemove.zip);
      });
  }

  private updateCurrentConditions(datas: ConditionsAndZip[]): void {
    this.currentConditions.update((conditions) => [...conditions, ...datas]);
  }

  addCurrentCondition(zipcode: string): Observable<CurrentConditions> {
    return this.http.get<CurrentConditions>(
      `${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`,
    );
  }

  removeCurrentConditions(zipcode: string) {
    this.currentConditions.update((conditions) =>
      conditions.filter((data) => data.zip != zipcode),
    );
  }

  getCurrentConditions(): Signal<ConditionsAndZip[]> {
    return this.currentConditions.asReadonly();
  }

  getForecast(zipcode: string): Observable<Forecast> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get<Forecast>(
      `${WeatherService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherService.APPID}`,
    );
  }

  getWeatherIcon(id: number): string {
    if (id >= 200 && id <= 232)
      return WeatherService.ICON_URL + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return WeatherService.ICON_URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return WeatherService.ICON_URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return WeatherService.ICON_URL + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return WeatherService.ICON_URL + "art_clouds.png";
    else if (id === 741 || id === 761)
      return WeatherService.ICON_URL + "art_fog.png";
    else return WeatherService.ICON_URL + "art_clear.png";
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
