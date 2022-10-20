import { Request, Response } from 'express'
import EmailService from '../services/EmailService'

const users = [{ name: 'Guilherme', email: 'guivitoria2010@hotmail.com' }]

export default {
	async index(req: Request, res: Response) {
		return res.json(users)
	},

	async create(req: Request, res: Response) {
		const emailService = new EmailService()

		emailService.sendMail({
			to: { name: 'Guilherme Vitória', email: 'guivitoria2010@hotmail.com' },
			message: { subject: 'Bem-vindo ao sistema', body: 'Seja bem-vindo' },
		})

		return res.send()
	},
}
