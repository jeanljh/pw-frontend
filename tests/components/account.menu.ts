import { Page, Locator } from '../../fixtures/base'

export default class Account {
    buttonConnectWallet: Locator
    textDv4tntBalance: Locator
    menuItemDisconnect: Locator
    buttonDisconnect: Locator
    
    constructor(readonly page: Page) {
        this.buttonConnectWallet = page.getByRole('banner').getByRole('button', { name: /Connect wallet/ })
        this.textDv4tntBalance = page.getByText('Dv4TNT Balance').locator('+ output')
        this.menuItemDisconnect = page.getByRole('menuitem', { name: /Disconnect/ })
        this.buttonDisconnect = page.getByRole('button', { name: /Disconnect/ })
    }

    textChainAddress = (address: string) => this.page.getByRole('button', { name: new RegExp(address) })

    async disconnectAccount() {
        await this.menuItemDisconnect.click()
        await this.buttonDisconnect.click()
    }
}