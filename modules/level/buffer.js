export const bufferXP = async (redis, guildId, userId, xp) => {
	const key = `xp:${guildId}:${userId}`
	await redis.incrBy(key, xp)
	await redis.expire(key, 120)
}

export const flushXP = (redis, addXP) => {
	setInterval(async () => {
		const keys = await redis.keys('xp:*')

		for (const key of keys) {
			const xp = await redis.get(key)
			if (!xp) continue

			const [, guildId, userId] = key.split(':')

			await addXP(guildId, userId, parseInt(xp))
			await redis.del(key)
		}
	}, 30000)
}
