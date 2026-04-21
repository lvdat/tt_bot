import { SlashCommandBuilder, AttachmentBuilder } from 'discord.js'
import { getUser } from '../modules/level/level.service.js'
import render from '../modules/level/rank.card.js'

export default {
	data: new SlashCommandBuilder().setName('rank').setDescription('Xem level'),

	async execute(interaction) {
		const data = await getUser(interaction.guild.id, interaction.user.id)
		if (!data) return interaction.reply('Chưa có XP')

		const buffer = await render(interaction.member, data)

		await interaction.reply({
			files: [new AttachmentBuilder(buffer, { name: 'rank.png' })],
		})
	},
}
