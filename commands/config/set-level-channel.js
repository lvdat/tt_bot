import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js'
import { setLevelChannel } from '../../modules/level/config/guild.service.js.js'

export default {
	data: new SlashCommandBuilder()
		.setName('set-level-channel')
		.setDescription('Set kênh thông báo level')
		.addChannelOption((o) => o.setName('channel').setRequired(true))
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

	async execute(interaction) {
		const ch = interaction.options.getChannel('channel')

		await setLevelChannel(interaction.guild.id, ch.id)

		await interaction.reply(`✅ Đã set kênh ${ch}`)
	},
}
