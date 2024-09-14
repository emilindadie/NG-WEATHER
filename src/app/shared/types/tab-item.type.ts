import { TemplateRef } from "@angular/core";

export interface TabItem<T> {
  id: string;
  labelTemplate: TemplateRef<T>;
  contentTemplate: TemplateRef<T>;
  context: T;
}
