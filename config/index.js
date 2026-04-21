import dotenv from 'dotenv'
dotenv.config()

export default {
	token: process.env.DISCORD_TOKEN,
	mongo: process.env.MONGO_URI,
	redis: process.env.REDIS_URL,
	clientId: process.env.CLIENT_ID,
}
