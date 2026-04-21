import Config from '../../../models/guild.model.js'

export const getConfig = async (guildId) => {
	let cfg = await Config.findOne({ guildId })
	if (!cfg) cfg = await Config.create({ guildId })
	return cfg
}

export const setLevelChannel = async (guildId, channelId) => {
	return Config.findOneAndUpdate(
		{ guildId },
		{ levelUpChannel: channelId },
		{ upsert: true, new: true },
	)
}

export const addLevelRole = async (guildId, level, roleId) => {
	const cfg = await getConfig(guildId)

	cfg.levelRoles = cfg.levelRoles.filter((r) => r.level !== level)
	cfg.levelRoles.push({ level, roleId })

	await cfg.save()
}

export const removeLevelRole = async (guildId, level) => {
	const cfg = await getConfig(guildId)

	cfg.levelRoles = cfg.levelRoles.filter((r) => r.level !== level)
	await cfg.save()
}
