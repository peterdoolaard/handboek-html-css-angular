import { Component, Input } from '@angular/core';
import { Chapter } from "../../models";

@Component({
  selector: 'app-hoofdstuk',
  templateUrl: './hoofdstuk.component.html',
  styleUrls: ['./hoofdstuk.component.scss']
})
export class HoofdstukComponent {
  @Input() hoofdstuk: Chapter | undefined | null = undefined;

  constructor() {}

}

