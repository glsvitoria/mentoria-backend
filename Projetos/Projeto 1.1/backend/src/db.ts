import fs from 'fs'
import path from 'path'
import { ICrypto } from './controllers/CryptoController'

const dbPath = path.join(__dirname, '../', 'database', 'test.json')

export class Database {
	data!: ICrypto[]
	async connect() {
		try {
			this.data = JSON.parse(await fs.promises.readFile(dbPath, 'utf-8'))
		} catch (error) {
			throw new Error("Can't connect to database")
		}
	}
}

// Para ter acesso à database basta utilizar db.connect();
