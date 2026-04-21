import { bufferXP } from './buffer.js'

export default async (message, redis) => {
	if (!message.guild || message.author.bot) return

	const cdKey = `cd:${message.author.id}`
	if (await redis.get(cdKey)) return

	let xp = 15
	if (message.content.length > 100) xp += 5

	await redis.set(cdKey, 1, 'EX', 60)

	await bufferXP(redis, message.guild.id, message.author.id, xp)
}
