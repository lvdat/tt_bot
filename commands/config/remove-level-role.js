import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'
import { removeLevelRole } from '../../modules/level/config/guild.service.js'

export default {
	data: new SlashCommandBuilder()
		.setName('remove-level-role')
		.setDescription('Xóa role theo level')
		.addIntegerOption((o) =>
			o.setName('level').setDescription('Level cần gỡ role').setRequired(true),
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction) {
		const level = interaction.options.getInteger('level')

		await removeLevelRole(interaction.guild.id, level)

		await interaction.reply(`🗑️ Đã xóa role level ${level}`)
	},
}
