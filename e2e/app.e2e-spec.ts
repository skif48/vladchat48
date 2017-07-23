import { VladchatPage } from './app.po';

describe('vladchat App', () => {
  let page: VladchatPage;

  beforeEach(() => {
    page = new VladchatPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
