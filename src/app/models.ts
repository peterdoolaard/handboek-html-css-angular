export interface Hoofdstuk {
  hoofdstukNummer: number;
  hoofdstukTitel: string;
}

export interface Link {
  hoofdstukNummer: number;
  titel: string;
  url: string;
}

export interface Voorbeeld {
  hoofdstukNummer: number;
  codeNummer: number;
  codeTitel: string;
  codeHtml: string;
  codeCss: string;
}
