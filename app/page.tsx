'use client'
import './globals.css'
import App from './app'
import { useEffect } from 'react';

export default function Page() {
	return (
		<div style={{
			display: 'grid', gridTemplateRows: '1fr auto', backgroundColor: '#25293C', width: 1280, minWidth: 1280,
			overflowY: 'hidden', boxShadow: '0 0 10px 10px rgba(0, 0, 0, 0.2)'
		}}>
			<App />
		</div>
	)
}