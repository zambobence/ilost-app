import React, { createContext, useState } from 'react'

const LoadingContext = createContext()

function LoadingContextProvider({ children }) {
	const [isLoading, setIsLoading] = useState(false)
	return (
		<LoadingContext.Provider value={{ isLoading, setIsLoading }}>
			{children}
		</LoadingContext.Provider>
	)
}

export { LoadingContext, LoadingContextProvider }
