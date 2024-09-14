import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { TabComponent } from "../tab/tab.component";
import { NgFor, NgIf, NgTemplateOutlet } from "@angular/common";
import { TabItem } from "app/shared/types/tab-item.type";

@Component({
  selector: "app-tab-group",
  templateUrl: "./tab-group.component.html",
  styleUrls: ["./tab-group.component.css"],
  standalone: true,
  imports: [TabComponent, NgTemplateOutlet, NgFor, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabGroupComponent<T> {
  @Output() tabRemoved = new EventEmitter<number>();
  @Input() tabsArray: TabItem<T>[] = [];
  activeTab: number | null = 0;

  public onRemove(index: number): void {
    this.tabsArray = this.tabsArray.filter((elem, idx) => idx !== index);
    this.tabRemoved.emit(index);
  }

  public setActiveTab(index: number): void {
    this.activeTab = index;
  }
}
