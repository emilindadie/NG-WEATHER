import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ZipcodeEntryComponent } from "../zipcode-entry/zipcode-entry.component";
import { CurrentConditionsComponent } from "../current-conditions/current-conditions.component";

@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  standalone: true,
  imports: [ZipcodeEntryComponent, CurrentConditionsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {
  constructor() {}
}
