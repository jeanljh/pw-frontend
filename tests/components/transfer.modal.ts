import { Page, Locator } from '../../fixtures/base'

export default class Transfer {
    dialogTransfer: Locator
    inputDestination: Locator
    inputAmount: Locator
    buttonConfirmTransfer: Locator
    
    constructor(readonly page: Page) {
        this.dialogTransfer = page.getByRole('dialog')
        this.inputDestination = page.locator('#destination')
        this.inputAmount = page.getByPlaceholder('0.0000')
        this.buttonConfirmTransfer = page.getByRole('button', { name: /Confirm transfer/ })
    }
}
