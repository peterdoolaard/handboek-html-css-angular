import { Component } from '@angular/core';
import { AppSharedService } from "../../services/app-shared.service";
import { Subscription } from "rxjs";
import { Voorbeeld } from "../../models";


@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent {
  voorbeelden: Voorbeeld[] = [];
  subs = new Subscription();

  constructor(
    private sharedService: AppSharedService,
  ) {
  }

  ngOnInit() {

    this.subs.add(
      this.sharedService.getVoorbeelden().subscribe(voorbeelden => {
          this.voorbeelden = voorbeelden;
          console.log(this.voorbeelden);
        }
      )
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }



  onPaste() {
    return
  }

}
