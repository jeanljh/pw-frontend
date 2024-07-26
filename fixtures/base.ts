import { BrowserContext, test as baseTest } from "@playwright/test";
import dappwright, { Dappwright, MetaMaskWallet } from "@tenkeylabs/dappwright";
import Connect from "../tests/components/connect.modal";
import Account from "../tests/components/account.menu";
import Portfolio from "../tests/pages/portfolio.page";
import Transfer from "../tests/components/transfer.modal";
import user from "./data";

export const test = baseTest.extend<{
  context: BrowserContext
  wallet: Dappwright
  connect: Connect
  account: Account
  portfolio: Portfolio
  transfer: Transfer
}>({
  context: async ({}, use) => {
    const [wallet, _, context] = await dappwright.bootstrap('', {
      wallet: 'metamask',
      version: MetaMaskWallet.recommendedVersion,
      seed: user.seedPhrase,
      headless: false,
    })

    await wallet.switchNetwork('Sepolia')
    await wallet.importPK(user.privateKey)

    await use(context)
  },
  wallet: async ({ context }, use) => {
    const metamask = await dappwright.getWallet('metamask', context)
    await use(metamask);
  },
  connect: async ({ wallet, context, page }, use) => {
    await use(new Connect(wallet, context, page))
  },
  account: async ({ page }, use) => {
    await use(new Account(page))
  },
  portfolio: async ({ page }, use) => {
    await use(new Portfolio(page))
  },
  transfer: async ({ page }, use) => {
    await use(new Transfer(page))
  }
})

export * from "@playwright/test";
