import { Page, Locator, BrowserContext } from '../../fixtures/base'

export default class Connect {
    buttonMetamask: Locator
    buttonSendRequest: Locator
    
    constructor(readonly wallet: any, readonly context: BrowserContext, readonly page: Page) {
        this.buttonMetamask = page.getByRole('button', { name: /MetaMask/ })
        this.buttonSendRequest = page.getByRole('button', { name: /Send request/ })
    }

    async connectMetamask() {
        await this.buttonMetamask.click()
        await Promise.all([ 
            this.context.waitForEvent('page'),
            this.wallet.approve()
        ])

        await this.buttonSendRequest.click()
        await Promise.all([
          this.context.waitForEvent('page'),
          this.wallet.sign()
        ])

        await this.page.waitForTimeout(2000)
    }
}
