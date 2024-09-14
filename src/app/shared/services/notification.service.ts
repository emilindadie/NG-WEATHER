import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class LocationNotificationService {
  private currentLocationsSubject: Subject<string[]> = new Subject();
  readonly currentLocations$ = this.currentLocationsSubject.asObservable();
  public notifyCurrentLocations(locations: string[]) {
    this.currentLocationsSubject.next(locations);
  }
}
