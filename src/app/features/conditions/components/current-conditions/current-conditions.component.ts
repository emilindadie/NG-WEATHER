import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { LocationService } from "../../services/location.service";
import { Router, RouterLink } from "@angular/router";
import { DecimalPipe } from "@angular/common";
import { TabGroupComponent } from "app/shared/components/tab-group/tab-group.component";
import { WeatherService } from "app/shared/services/weather.service";
import { ConditionsAndZip } from "app/shared/types/conditions-and-zip.type";
import { TabItem } from "app/shared/types/tab-item.type";

@Component({
  selector: "app-current-conditions",
  templateUrl: "./current-conditions.component.html",
  styleUrls: ["./current-conditions.component.css"],
  standalone: true,
  imports: [TabGroupComponent, DecimalPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrentConditionsComponent {
  @ViewChild("tabContent", { static: true })
  tabContent!: TemplateRef<ConditionsAndZip>;
  @ViewChild("activeTabContent", { static: true })
  activeTabContent!: TemplateRef<ConditionsAndZip>;

  private router = inject(Router);
  protected locationService = inject(LocationService);
  protected weatherService = inject(WeatherService);
  protected currentConditionsByZip: Signal<ConditionsAndZip[]> =
    this.weatherService.getCurrentConditions();

  // Set tabsItems signal from each updated of currentConditionsByZip()
  protected tabsItems: Signal<TabItem<ConditionsAndZip>[]> = computed(() =>
    this.currentConditionsByZip().map((data) => ({
      id: data.zip,
      labelTemplate: this.tabContent,
      contentTemplate: this.activeTabContent,
      context: data,
    })),
  );

  public showForecast(zipcode: string) {
    this.router.navigate(["/forecast", zipcode]);
  }

  public onTabRemoved(index: number) {
    this.locationService.removeLocation(
      this.currentConditionsByZip()[index].zip,
    );
  }
}
