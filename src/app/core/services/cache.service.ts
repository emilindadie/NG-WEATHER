import { inject, Injectable } from "@angular/core";
import { StorageService } from "app/shared/services/storage.service";
import { CacheData } from "app/shared/types/cache-data.type";

@Injectable({ providedIn: "root" })
export class CacheService {
  private storageService: StorageService<CacheData> = inject(StorageService);
  private cacheDuration = 2 * 60 * 60 * 1000;

  set<T>(key: string, data: T): void {
    const expirationTime = Date.now() + this.cacheDuration;
    const cacheData = {
      data,
      expirationTime,
    } as CacheData;
    this.storageService.set(key, cacheData);
  }

  get<T>(key: string): T | null {
    const cacheData = this.storageService.get(key);
    if (!cacheData) {
      return null;
    }
    const currentTime = Date.now();
    if (currentTime > cacheData.expirationTime) {
      this.storageService.remove(key);
      return null;
    }
    return cacheData.data;
  }
}
