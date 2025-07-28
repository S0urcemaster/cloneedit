'use client'
import './css/globals.css'
// import './lexical.css'
import App from './app'

export default function Page() {
	return (
		<div className='page' style={{position: 'relative'}}>
			<App />
		</div>
	)
}