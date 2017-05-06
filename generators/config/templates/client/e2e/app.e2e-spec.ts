import { CoreUiPage } from './app.po';

describe('core-ui App', function () {
  let page: CoreUiPage;

  beforeEach(() => {
    page = new CoreUiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
