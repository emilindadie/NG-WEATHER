import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from "@angular/core";

@Component({
  selector: "app-tab",
  templateUrl: "./tab.component.html",
  styleUrls: ["./tab.component.css"],
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent<T> {
  @Input() content!: TemplateRef<T>;
  @Input() context!: T;
  @Input() index!: number;
  @Output() removeTab = new EventEmitter<number>();
  @Output() selectTab = new EventEmitter<number>();
}
