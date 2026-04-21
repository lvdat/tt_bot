import Level from '../../models/level.model.js'
import { xpRequired } from './xp.util.js'

export const addXP = async (guildId, userId, amount) => {
	let user = await Level.findOne({ guildId, userId })

	if (!user) user = await Level.create({ guildId, userId })

	user.xp += amount

	while (user.xp >= xpRequired(user.level)) {
		user.xp -= xpRequired(user.level)
		user.level++
	}

	await user.save()
}

export const getUser = (guildId, userId) => {
	return Level.findOne({ guildId, userId })
}

export const getLeaderboard = (guildId) => {
	return Level.find({ guildId }).sort({ level: -1, xp: -1 }).limit(10)
}
