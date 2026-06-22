import { Page, Locator } from '../../fixtures/base'

export default class Portfolio {
    readonly linkPortfolio: Locator
    readonly buttonTransfer: Locator
    readonly buttonClose: Locator

    constructor(readonly page: Page) {
        this.linkPortfolio = page.getByRole('link', { name: /Portfolio/ })
        this.buttonTransfer = page.getByRole('button', { name: /Transfer/ })
        this.buttonClose = page.locator("button[shape='square']")
    }
}
