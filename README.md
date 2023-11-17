# Handboek HTML5 en CSS, de Angular-versie

De [oorspronkelijke website](https://handboek-html-css.nl) is gebouwd met vanilla HTML, CSS en JavaScript, aangevuld met PrismJS voor codekleuring.

Deze repo bevat globaal dezelfde site, maar nu gebouwd met Angular (en ook weer PrismJS).

Het is work in progress, maar de belangrijkste functionaliteit zit erin: een eigen implementatie van bewerkbare code en instant feedback in de view, zoals bij CodePen.

Een belangrijk verschil met de oorsponkelijke site is dat er meer voorbeelden zijn en worden toegevoegd.

![Scherm­afbeelding 2023-10-20 om 20 06 56](https://github.com/peterdoolaard/handboek-html-css-angular/assets/12380954/09459552-2b26-4fc5-8626-bc3ee0384001)

![Scherm­afbeelding 2023-10-20 om 20 07 29](https://github.com/peterdoolaard/handboek-html-css-angular/assets/12380954/b1d91d5c-1951-408c-9ffd-fddadff6a786)

## De oorspronkelijke databron

Alle voorbeelden staan in een json-bestand met per voorbeeld bij welk hoofdstuk het hoort, wat het volgnummer is en de bijbehorende HTML- en CSS-code.
Bij het laden van de voorbeelden-pagina wordt het json-bestand opgehaald (of de versie in de cache). Het resultaat wordt gefilterd op het gekozen hoofdstuk, standaard 1. Elk voorbeeld wordt gerenderd in een eigen component.

Het gekozen hoofdstuk wordt ook toegevoegd aan de browsergeschiedenis. Bij het terug- of vooruitnavigeren (back-button) wordt de bijbehorende voorbeelddata opgehaald.

## Aangepaste databron

Deze oorspronkelijke methode werkt prima, maar het beheer van de HTML- en CSS-code in een json-bestand is geen feestje.

In de nieuwe versie bevat het json-bestand voor de code geen HTML en CSS meer, maar paden naar afzonderlijke HTML- en CSS-bestanden voor de voorbeelden. Bijvoorbeeld 1.1.html en 1.1.css. De inhoud van deze bestanden wordt gerenderd in de voorbeeld-componenten.

## De flow bij het weergeven van voorbeelden

### De component Voorbeelden 

De component Voorbeelden toont de introductietekst en is de container voor de component Hoofdstuk. 

1. Maakt in OnInit een observable `chapters$!: Observable<Chapter[]>` en laadt de inhoud van hoofdstukken.json.
2. Rendert een form-element `select` met een `option` voor elk hoofdstuk. De initiële waarde is (hoofdstuk) 1. 
3. Met de initiële waarde wordt het desbetreffende hoofdstuk gevonden in de observable `chapters$`.
4. Dat hoofdstuk wordt `currentChapter` en wordt doorgegeven naar de observable `currentChapter$`.
5. Navigeert naar `voorbeelden/hoofdstuk/:hoofdstukNummer`.
6. Laadt de component Hoofdstuk.

### De component Hoofdstuk

De component Hoofdstuk toont hoofdstuknummer en -naam en is de container voor de componenten Code en Links.

1. Subscribed in de constructor op `currentChapter$`.
2. Rendert in de view de hoofdstuktitel.
3. Laadt de componenten Code en Links.

### De component Code

De component Code is verantwoordelijk voor de weergave van de bewerkbare HTML- en CSS-codeblokken en de codekleuring van de code (PrismJS). Bevat ook de logica voor de knoppen Bewerken, Herstellen en Kopiëren.  

1. Maakt OnInit een observable `codeExamples$: Observable<CodeExample[]> | undefined` met een combineLatest van het `currentChapter$` en laadt de inhoud van voorbeelden.json. Met een switchMap worden de voorbeelden gefilterd op het juiste hoofdstuk.
2. Aansluitend wordt de codekleuring geactiveerd.
3. Toont de HTML- en CSS-code in de bewerkbare blokken.
4. Laadt de component CodeExampleView.
5. Via ElementRefs worden de codeblokken doorgegeven aan CodeExampleView.

### De component CodeExampleView

De component CodeExampleView rendert in shadowDOM de HTML- en CSS-code uit de component Code. Bij elk voorbeeld wordt een child-element `style` gemaakt en toegevoegd aan de shadow root. Zo blijft de CSS geïsoleerd. Wijzigingen worden geobserveerd met een MutationObserver. Event-observables houden de knoppen Bewerken en Herstellen in de gaten.

1. OnInit worden de codeblokken gevuld met de inhoud uit de component Code.
2. In de bewerkmodus worden de componenten Code en ExampleCodeView constant gesynchroniseerd via de MutationObserver.
3. De knop Herstel plaatst de oorspronkelijke HTML en CSS terug uit de codeExample$-observable.
