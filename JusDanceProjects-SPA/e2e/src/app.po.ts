import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(url?: string) {
    return browser.get(browser.baseUrl + url) as Promise<any>;
  }

  getText(idName: string) {
    return element(by.id(idName)).getText() as Promise<string>;
  }

  clickButton(idName: string) {
    element(by.id(idName)).click();
  }

  enterText(idName: string, text: string) {
    element(by.id(idName)).sendKeys(text);
  }
}
