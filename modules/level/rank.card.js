import { createCanvas, loadImage } from 'canvas'

export default async (member, data) => {
	const canvas = createCanvas(800, 250)
	const ctx = canvas.getContext('2d')

	ctx.fillStyle = '#0f172a'
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	const avatar = await loadImage(
		member.user.displayAvatarURL({ extension: 'png' }),
	)
	ctx.drawImage(avatar, 30, 50, 150, 150)

	ctx.fillStyle = '#fff'
	ctx.font = '30px sans-serif'
	ctx.fillText(member.user.username, 220, 80)

	ctx.font = '20px sans-serif'
	ctx.fillText(`Level: ${data.level}`, 220, 140)
	ctx.fillText(`XP: ${data.xp}`, 220, 180)

	return canvas.toBuffer()
}
