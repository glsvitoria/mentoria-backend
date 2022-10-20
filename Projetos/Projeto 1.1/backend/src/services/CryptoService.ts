import fs from 'fs'
import path from 'path'
import { ICrypto } from '../controllers/CryptoController'

const dbPath = path.join(__dirname, '../', '../', 'database', 'test.json')


interface ICryptoService {
   writeInDatabase(request: ICrypto[]): void
}

export class CryptoService implements ICryptoService {
	async writeInDatabase(databaseUpdated: ICrypto[]) {
		await fs.promises.writeFile(
			dbPath,
			JSON.stringify(databaseUpdated, null, 4)
		)
	}
}
