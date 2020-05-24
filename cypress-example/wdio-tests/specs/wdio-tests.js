function getByDataTest(attr) {
    return browser.$(`[data-test='${attr}']`);
}

describe('wdio tests', () => {
    beforeEach(() => {
        browser.url('/');
    });

    it('can open a modal and close it', () => {
        expect(getByDataTest('modal')).not.toBeExisting();

        getByDataTest('open-button').click();
        
        expect(getByDataTest('modal')).toBeExisting();

        getByDataTest('close-button').click();

        expect(getByDataTest('modal')).not.toBeExisting();
    });

    it('can navigate through the tabs', () => {
        getByDataTest('second-page-link')
          .click();
        
        expect(getByDataTest('second-page')).toBeExisting();
        
        getByDataTest('third-page-link')
          .click();
        
        expect(getByDataTest('third-page')).toBeExisting();
        
        getByDataTest('first-page-link')
          .click();
        
        expect(getByDataTest('first-page')).toBeExisting();
    });
});