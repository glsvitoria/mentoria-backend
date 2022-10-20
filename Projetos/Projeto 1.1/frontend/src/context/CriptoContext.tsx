import React, { createContext, useState } from 'react'

export const CriptoContext = createContext({})

interface TickerData {
   ticker: {
      high: number
      low: number
      vol: number
      last: number
      buy: number
      sell: number
      date: number
   }
}

export const CriptoProvider = (props: any) => {
	const [newCriptoValue, setNewCriptoValue] = useState<TickerData | undefined>()

	return (
		<CriptoContext.Provider value={{ newCriptoValue, setNewCriptoValue }}>
			{props.children}
		</CriptoContext.Provider>
	)
}
