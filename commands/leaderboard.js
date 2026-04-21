import { SlashCommandBuilder } from 'discord.js'
import { getLeaderboard } from '../modules/level/level.service.js'

export default {
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('Top server'),

	async execute(interaction) {
		const data = await getLeaderboard(interaction.guild.id)

		const desc = data
			.map((u, i) => `#${i + 1} <@${u.userId}> - Lv.${u.level} (${u.xp})`)
			.join('\n')

		await interaction.reply({
			embeds: [{ title: 'Leaderboard', description: desc }],
		})
	},
}
