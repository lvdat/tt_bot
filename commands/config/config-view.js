import { SlashCommandBuilder } from 'discord.js'
import { getConfig } from '../../modules/level/config/guild.service.js'

export default {
	data: new SlashCommandBuilder()
		.setName('level-config')
		.setDescription('Xem config level'),

	async execute(interaction) {
		const cfg = await getConfig(interaction.guild.id)

		const roles =
			cfg.levelRoles
				.map((r) => `Level ${r.level}: <@&${r.roleId}>`)
				.join('\n') || 'Không có'

		await interaction.reply({
			embeds: [
				{
					title: '⚙️ Level Config',
					description:
						`Channel: ${cfg.levelUpChannel ? `<#${cfg.levelUpChannel}>` : 'Auto'}\n\n` +
						`Roles:\n${roles}`,
				},
			],
		})
	},
}
