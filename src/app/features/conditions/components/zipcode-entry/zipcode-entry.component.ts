import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LocationService } from "app/features/conditions/services/location.service";

@Component({
  selector: "app-zipcode-entry",
  templateUrl: "./zipcode-entry.component.html",
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZipcodeEntryComponent {
  protected locationService = inject(LocationService);

  addLocation(zipcode: string) {
    this.locationService.addLocation(zipcode);
  }
}
