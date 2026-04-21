import { bufferXP } from './buffer.js'
import { log } from '../../utils/logger.js'

export default async (oldState, newState, redis) => {
	const id = newState.id

	if (!oldState.channel && newState.channel) {
		await redis.set(`voice:${id}`, Date.now())
        log(`[VOICE JOIN] ${newState.member.user.tag}`)
	}

	if (oldState.channel && !newState.channel) {
		const start = await redis.get(`voice:${id}`)
		if (!start) return

		const duration = (Date.now() - start) / 60000

		if (oldState.channel.members.size < 2) {
            log(`[VOICE IGNORE] ${oldState.member.user.tag} (alone)`)
            return
        }

		const xp = Math.floor(duration * 10)

		await bufferXP(redis, oldState.guild.id, id, xp)
		await redis.del(`voice:${id}`)

        log(`[VOICE] ${oldState.member.user.tag} ${duration.toFixed(1)}m → +${xp} XP`)
	}
}
