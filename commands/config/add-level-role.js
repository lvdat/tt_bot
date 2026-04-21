import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'
import { addLevelRole } from '../../modules/level/config/guild.service.js'

export default {
	data: new SlashCommandBuilder()
		.setName('add-level-role')
		.setDescription('Gán role theo level')
		.addIntegerOption((o) => o.setName('level').setRequired(true))
		.addRoleOption((o) => o.setName('role').setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction) {
		const level = interaction.options.getInteger('level')
		const role = interaction.options.getRole('role')

		await addLevelRole(interaction.guild.id, level, role.id)

		await interaction.reply(`✅ Level ${level} → ${role}`)
	},
}
