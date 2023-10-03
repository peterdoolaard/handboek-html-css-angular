export const voorbeelden = [
  {
    hoofdstuk: {
      titel: 'Webtalen, browsers en editors',
      nummer: 1,
      links: [
        {
          url: 'https://www.w3.org/TR/',
          titel: 'Webstandaarden en concepten'
        },
        {
          url: 'https://html.spec.whatwg.org/multipage/',
          titel: 'HTML The living standard'
        },
      ],
      voorbeelden: [
        {
          nummer: 1,
          titel: 'Kale HTML',
          codeHtml: `<article>
  <h1>De functie van HTML</h1>
  <p>HTML staat voor Hypertext Markup Language. Met HTML worden de <i>structuur</i> van de pagina en de <i>betekenis</i> van de elementen in die pagina aangegeven.</p>
</article>`,
          codeCss: ''
        },
        {
          nummer: 2,
          titel: 'HTML met CSS',
          codeHtml: `<article>
  <h1>De functie van HTML</h1>
  <p>HTML staat voor Hypertext Markup Language. Met HTML worden de <i>structuur</i> van de pagina en de <i>betekenis</i> van de elementen in die pagina aangegeven.</p>
</article>`,
          codeCss: `h1 {
  color: hsl(0 0% 15%);
  font-family: serif;
  font-weight: 500;
}
p {
  color: hsl(0 0% 5%);
  font-family: sans-serif;
  font-weight: 400;
}`
        },

      ]
    },
  }
]
