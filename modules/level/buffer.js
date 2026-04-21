import { log } from '../../utils/logger.js'

export const bufferXP = async (redis, guildId, userId, xp) => {
	const key = `xp:${guildId}:${userId}`
	await redis.incrBy(key, xp)
	await redis.expire(key, 120)

    log(`[BUFFER] ${userId} +${xp} XP (cached)`)
}

export const flushXP = (redis, addXP, client) => {
	setInterval(async () => {
		const keys = await redis.keys('xp:*')

        if (keys.length > 0) {
            log(`[FLUSH] Processing ${keys.length} users`)
        }

		for (const key of keys) {
			const xp = await redis.get(key)
			if (!xp) continue

			const [, guildId, userId] = key.split(':')

			await addXP(client, guildId, userId, parseInt(xp))
			await redis.del(key)

            log(`[FLUSH] ${userId} +${xp} XP → DB`)
		}
	}, 30000)
}
