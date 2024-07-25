export const user = {
    seedPhrase: process.env.SEED_PHRASE as string,
    privateKey: process.env.PRIVATE_KEY as string,
    senderChain: process.env.SENDER_CHAIN as string,
    receiverChain: process.env.RECEIVER_CHAIN as string
}

export default user
