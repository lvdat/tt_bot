import { log } from '../../utils/logger.js'
import { getConfig } from './config/guild.service.js'

export default async (client, guildId, userId, newLevel) => {
	const guild = await client.guilds.fetch(guildId)
	const member = await guild.members.fetch(userId)

    log(`[LEVEL UP] ${member.user.tag} → Level ${newLevel}`)

	const config = await getConfig(guildId)

	// 🎖️ Auto role
	const role = config.levelRoles.find((r) => r.level === newLevel)
	if (role) {
		const r = guild.roles.cache.get(role.roleId)
		if (r) {
            await member.roles.add(r).catch(() => {})
            log(`[ROLE] ${member.user.tag} added role ${r.name}`)
        }
	}

	// 🔔 Thông báo
	let channel = null

	if (config.levelUpChannel) {
		channel = guild.channels.cache.get(config.levelUpChannel)
	}

	if (!channel) {
		channel =
			member.guild.systemChannel ||
			member.guild.channels.cache.find((c) => c.isTextBased())
	}

	if (channel) {
		channel
			.send({
				content: `🎉 <@${userId}> đã lên level **${newLevel}**!`,
			})
			.catch(() => {})
	}
}
