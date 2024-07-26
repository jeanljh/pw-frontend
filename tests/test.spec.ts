import { test, expect } from '../fixtures/base'
import { user, transferData } from '../fixtures/data';
import Utils from './helpers/utils';

test.describe('Test Suite - Transfer', () => {
  test.beforeEach(async ({ page, connect, account }) => {
    // go to dYdX testnet and connect with MetaMask wallet for receiver account
    await page.goto('')
    await account.buttonConnectWallet.click()
    await connect.connectMetamask()
  })

  test('E2E - Portfolio > Transfer', async ({ wallet, page, connect, account, portfolio, transfer }) => {
    // format dYdX chain address
    const senderChain = Utils.formatChainAddress(user.senderChain)
    const receiverChain = Utils.formatChainAddress(user.receiverChain)

    // get the current Dv4TNT balance for receiver account
    await account.textChainAddress(receiverChain).click()
    const currentBalance = parseFloat(await account.textDv4tntBalance.textContent() as string)
    await account.disconnectAccount()

    // switch to sender account in MetaMask wallet and connect again
    await wallet.switchAccount(1)
    await page.bringToFront()
    await account.buttonConnectWallet.click()
    await connect.connectMetamask()

    // go to Portfolio page to transfer a Dv4TNT amount to receiver account
    await portfolio.linkPortfolio.click()
    await page.waitForTimeout(2000)
    await portfolio.buttonTransfer.click()

    await expect.poll(async () => {
      await transfer.inputDestination.fill(user.receiverChain)
      return await transfer.inputDestination.inputValue()
    }).toBe(user.receiverChain)

    await transfer.inputAmount.fill(transferData.amount)
    await transfer.inputMemo.fill(transferData.memo)
    await transfer.buttonConfirmTransfer.click()
    await transfer.dialogTransfer.waitFor({ state: 'hidden' })

    await account.textChainAddress(senderChain).click()
    await account.disconnectAccount()

    // switch to receiver account in MetaMask wallet and connect again
    await wallet.switchAccount(2)
    await page.bringToFront()
    await account.buttonConnectWallet.click()
    await connect.connectMetamask()
 
    // verify the current Dv4TNT balance for receiver account shows the added amount received from the sender
    const updateBalance = (currentBalance + 0.0001).toFixed(4)
    await account.textChainAddress(receiverChain).click()
    await expect.poll(async () => parseFloat(await account.textDv4tntBalance.textContent() as string).toFixed(4), { timeout: 5000 }).toBe(updateBalance)
  })
})
