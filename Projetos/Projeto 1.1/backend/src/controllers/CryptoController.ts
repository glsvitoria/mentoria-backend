import { Request, Response } from 'express'
import { Database } from '../db'
import { CryptoService } from '../services/CryptoService'

const db = new Database()
db.connect()

const cryptoService = new CryptoService()

export interface ICrypto {
	id: string
	name: string
	coin: string
	value: number
	max: number
	yearCreated: number
}

export interface IPostProps {
	name: string
	coin: string
	value: number
	max: number
	yearCreated: number
}

export default {
	async index(_req: Request, res: Response) {
		await db.connect()
		res.json(db.data)
	},

	async selectId(req: Request, res: Response) {
		await db.connect()
		const { id } = req.params

		const criptoSelected = db.data.filter((cri: ICrypto) => cri.id == id)

		if (!criptoSelected)
			return res.status(404).json({ message: 'Elemento não encontrado' })

		return res.json(criptoSelected)
	},

	async create(req: Request, res: Response) {
		const { name, coin, value, max, yearCreated }: IPostProps = req.body

		const newID = db.data[db.data.length - 1].id + 1

		const object: ICrypto = {
			id: newID,
			name,
			coin,
			value,
			max,
			yearCreated,
		}

		const newDb: ICrypto[] = [...db.data, object]

		cryptoService.writeInDatabase(newDb)

		res.status(201).json(object)
	},

	async update(req: Request, res: Response) {
		const { id } = req.params
		const { value } = req.body

		let isUpdated = false

		db.data.forEach((cry: ICrypto) => {
			if (cry.id == id) {
				cry.value = value
				isUpdated = true
			}
		})
		if (isUpdated) {
			cryptoService.writeInDatabase(db.data)

			return res.json({
				message: `Foi atualizado o valor atual e máximo da criptomoeda`,
			})
		}

		return res.status(204).json({ message: 'Criptomoeda não encontrada' })
	},

	async delete(req: Request, res: Response) {
		const { id } = req.params

		const cryptoWithDelete: ICrypto[] = db.data.filter(
			(cri: ICrypto) => cri.id != id
		)

		await cryptoService.writeInDatabase(cryptoWithDelete)

		return res.json({ message: 'Criptomoeda deletada com sucesso' })
	},
}
