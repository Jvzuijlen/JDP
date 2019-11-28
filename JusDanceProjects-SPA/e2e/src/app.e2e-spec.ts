import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  const testEmail = 'test@test.com';
  const testPassword = 'Test123!';

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(page.getText('nav-title')).toEqual('JusDanceProjects');
  });

  it('should be able to login/logout', () => {

    // Arrange: Is on homepage
    page.navigateTo();

    // Act: Click login button
    page.clickButton('nav-login-button');

    // Assert: Check if on login page
    expect(page.getText('login-title')).toContain('Login');

    // Act: Fill in login info
    page.enterText('login-email', testEmail);
    page.enterText('login-password', testPassword);

    // Act: Click login button
    page.clickButton('login-button');

    // Wait for request to happen
    browser.waitForAngular();

    // Assert: If on homepage
    expect(browser.getCurrentUrl()).toContain('/home');

    // Assert: If my classes button appeared
    expect(page.getText('nav-myclasses-menu-button')).toContain('Mijn Lessen');

    // Act: Log out user
    page.clickButton('nav-account-menu-button');

    // Wait for menu to open
    browser.sleep(100);
    page.clickButton('nav-logout-button');
    browser.waitForAngular();
    expect(page.getText('nav-login-button')).toContain('Inloggen');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
