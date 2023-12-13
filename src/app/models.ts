export interface Chapter {
  hoofdstukNummer: number;
  hoofdstukTitel: string;
}

export interface Link {
  hoofdstukNummer: number;
  titel: string;
  url: string;
}

export interface CodeExample {
  hoofdstukNummer: number;
  codeNummer: number;
  codeTitel: string;
  codeHtml: string;
  codeCss: string;
}

export interface Article {
  url: string;
  title: string,
  date: string,
  summary: string
}
