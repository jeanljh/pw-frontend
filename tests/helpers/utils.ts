export default class Utils {
	static wait = async (duration: number) => new Promise(resolve => setTimeout(resolve, duration));
	static formatChainAddress(address: string) {
    const prefix = address.slice(0, 8)
    const suffix = address.slice(-4)
    const middle = '.'.repeat(3)
    return prefix + middle + suffix
  }
}
