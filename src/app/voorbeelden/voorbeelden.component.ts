import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

import { Hoofdstuk, Voorbeeld } from "../models";
import { AppSharedService } from "../services/app-shared.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-voorbeelden',
  templateUrl: './voorbeelden.component.html',
  styleUrls: ['./voorbeelden.component.scss']
})
export class VoorbeeldenComponent implements OnInit, OnDestroy {
  sub = new Subscription()
  voorbeelden: Voorbeeld[] = [];
  hoofdstukken: Hoofdstuk[] = [];
  currentChapter: Hoofdstuk | undefined;

  formGroup = new FormGroup({
    selectedHoofdstuk: new FormControl(1, {nonNullable: true})
  })

  constructor(
    private sharedService: AppSharedService,
  ) {}

  ngOnInit() {
    this.sub.add(
      this.sharedService.getVoorbeelden()
        .subscribe((value: Voorbeeld[]) => this.voorbeelden = value)
    );

    this.sub.add(
      this.sharedService.getHoofdstukken().subscribe((hoofdstukken) => {
        this.hoofdstukken = hoofdstukken;
        this.currentChapter = this.hoofdstukken.find((hoofdstuk: Hoofdstuk) => hoofdstuk.hoofdstukNummer === 1);
      })
    );

    this.sub.add(
      this.sharedService.currentChapter$.subscribe(value => {
        this.currentChapter = value;
      })
    );
  }

  onChange() {
    this.currentChapter = this.hoofdstukken.find((hoofdstuk: Hoofdstuk) =>
        hoofdstuk.hoofdstukNummer == this.formGroup.controls.selectedHoofdstuk.value
    );
    this.sharedService.setCurrentChapter(this.currentChapter);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
