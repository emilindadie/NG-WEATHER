import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class StorageService<T> {
  set(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): T | null {
    const item = localStorage.getItem(key);
    return !!item ? JSON.parse(item) : null;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
