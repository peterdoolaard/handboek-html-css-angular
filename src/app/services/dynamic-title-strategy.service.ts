import { Injectable } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DynamicTitleStrategy extends TitleStrategy {
  override updateTitle(snapshot: RouterStateSnapshot) {
    if (snapshot.url.indexOf('#') > 0) return;
    if (snapshot.url === '/') {
      document.title = 'Home | Handboek HTML5 en CSS';
    } else {
      if (snapshot.root.firstChild?.url[0].path === 'downloads') {
        document.title = 'Downloads | Handboek HTML5 en CSS';
      }
      if (snapshot.root.firstChild?.url[0].path === 'artikelen') {
        document.title = 'Artikelen | Handboek HTML5 en CSS';
        if (snapshot.root.firstChild.params['articleUrl']) {
          document.title = `${snapshot.root.firstChild.params['articleUrl']} | Handboek HTML5 en CSS`;
        }
      }
      if (snapshot.root.firstChild?.url[0].path === 'voorbeelden') {
        const nummer = snapshot.root.queryParams['hoofdstuk'];
        document.title = `Voorbeelden hoofdstuk ${nummer} | Handboek HTML5 en CSS`;
      }
    }
  }
}
