import { Component, Input } from '@angular/core';
import { Hoofdstuk } from "../../models";

@Component({
  selector: 'app-hoofdstuk',
  templateUrl: './hoofdstuk.component.html',
  styleUrls: ['./hoofdstuk.component.scss']
})
export class HoofdstukComponent {
  @Input() hoofdstuk: Hoofdstuk | undefined = undefined;

  constructor() {}

}
