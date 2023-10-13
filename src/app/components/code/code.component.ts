import { Component, OnInit } from '@angular/core';
import { AppSharedService } from "../../services/app-shared.service";
import { CodeExample } from "../../models";


@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {
  voorbeelden: CodeExample[] = [];
  currentChapter: number = 1; // observable komt uit keuzelijst hoofdstukken

  constructor(
    private sharedService: AppSharedService,
  ) {
  }

  ngOnInit() {
    this.sharedService.getVoorbeelden()
  }


  onPaste() {
    return
  }

}
