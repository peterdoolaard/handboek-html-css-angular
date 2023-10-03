import { Component } from '@angular/core';

interface Hoofdstuk {
  nummer: number;
  titel: string;
  links: Link[];
  voorbeelden: Voorbeeld[];
}

interface Link {
  titel: string;
  url: string;
}

interface Voorbeeld {
  nummer: number;
  titel: string;
  codeHtml: string;
  codeCss: string;
}

@Component({
  selector: 'app-hoofdstuk',
  templateUrl: './hoofdstuk.component.html',
  styleUrls: ['./hoofdstuk.component.scss']
})
export class HoofdstukComponent {

}
