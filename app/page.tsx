'use client'
import '../static/css/globals.css'
// import './lexical.css'
import App from './app'
import { CloneEditContextProvider } from './context'

export default function Page() {
	return (
		<div className='page' style={{ position: 'relative' }}>
			<CloneEditContextProvider>
				<App />
			</CloneEditContextProvider>
		</div>
	)
}