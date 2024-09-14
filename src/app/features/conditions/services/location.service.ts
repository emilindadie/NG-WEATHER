import { effect, inject, Injectable, signal } from "@angular/core";
import { StorageService } from "../../../shared/services/storage.service";
import { LocationNotificationService } from "app/shared/services/notification.service";

export const LOCATIONS: string = "locations";

@Injectable({ providedIn: "root" })
export class LocationService {
  private storageService: StorageService<string[]> = inject(
    StorageService<string[]>,
  );
  private locationNotificationService = inject(LocationNotificationService);
  private locationSignal = signal<string[]>(
    this.storageService.get(LOCATIONS) ?? [],
  );
  readonly locations = this.locationSignal.asReadonly();

  constructor() {
    effect(
      () => {
        // save location in storage and notify each sucribers of locationNotificationService that ccurrent location change each time when locationSignal() updated
        const loc = this.locationSignal();
        this.storageService.set(LOCATIONS, loc);
        this.locationNotificationService.notifyCurrentLocations(loc);
      },
      { allowSignalWrites: true },
    );
  }

  public addLocation(zipcode: string) {
    let index = this.locations().indexOf(zipcode);
    if (index === -1) {
      this.locationSignal.update((locations) => [...locations, zipcode]);
    }
  }

  public removeLocation(zipcode: string) {
    let index = this.locations().indexOf(zipcode);
    if (index !== -1) {
      this.locationSignal.update((locations) =>
        locations.filter((value) => value != zipcode),
      );
    }
  }
}
