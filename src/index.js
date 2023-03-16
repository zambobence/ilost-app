import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'
import { UserDataContextProvider } from './context/UserDataContext'
import { LoadingContextProvider } from './context/LoadingContext'
import { ItemDataContextProvider } from './context/ItemDataContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<Router>
		<LoadingContextProvider>
			<AuthContextProvider>
				<UserDataContextProvider>
					<ItemDataContextProvider>
						<App />
						</ItemDataContextProvider>
				</UserDataContextProvider>
			</AuthContextProvider>
		</LoadingContextProvider>
	</Router>
)
