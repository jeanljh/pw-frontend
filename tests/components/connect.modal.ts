import { Page, Locator, BrowserContext } from '../../fixtures/base'

export default class Connect {
    buttonMetamask: Locator
    buttonSendRequest: Locator
    buttonCloseDepositPopup: Locator
    
    constructor(readonly wallet: any, readonly context: BrowserContext, readonly page: Page) {
        this.buttonMetamask = page.getByRole('button', { name: /MetaMask/ })
        this.buttonSendRequest = page.getByRole('button', { name: /Send request/ })
        this.buttonCloseDepositPopup = page.getByLabel('Deposit').locator('header').getByRole('button')
    }

    async connectMetamask(newAccount = false) {
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
    
        // if (newAccount) {
        //     await Promise.all([
        //         this.context.waitForEvent('page', { timeout: 5000 }),
        //         this.wallet.sign()
        //     ])
        //     await this.buttonCloseDepositPopup.click()
        // }

        await this.page.waitForTimeout(2000)
    }
}
