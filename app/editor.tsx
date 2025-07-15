import { App as AppState } from './model'

export default function Editor({ appState }: { appState: AppState }) {

	// unique inside each editor so we can share the editor state by placing this component inside Editor
	// instead of passing the appState as a prop
	function Head() {
		return (
			<div style={{ display: 'flex', justifyContent: 'space-between', height: 25, overflow: 'hidden', paddingTop: 0, paddingBottom: 2 }}>
				<h1 style={{ position: 'relative', top: -5, left: 1, fontSize: 28 }}>Clone Edit</h1>
				<div>
					<button style={{ marginRight: 3, width: 35 }}>Del</button>
					<button style={{ marginRight: 3, width: 50 }}>Dupl</button>
					<button style={{ marginRight: 3, width: 55 }}>New</button>
					<button style={{ marginRight: 3, width: 20 }}>I</button>
				</div>
			</div>
		)
	}
	function Source({ appState }: { appState: AppState }) {
		return (
			<>
				<div style={{ display: 'flex', flexDirection: 'column', paddingTop: 1 }}>
					<textarea
						rows={4}
						cols={50}
						placeholder={'Guess what'}
						style={{
							height: '100%',
							resize: 'none',
							background: 'linear-gradient(to top, #1d1a22, #3a3a3a)', // Gradient background
							color: '#f5efff', // Text color
							border: 'none', // Remove border
							padding: '6px', // Padding
							margin: 0
						}}
					/>
				</div>
			</>
		);
	}
	return (
		<>
			<div style={{ display: 'grid', gridTemplateRows: '0fr 1fr', padding: 5, backgroundColor: '#25597C' }}>
				<Head appState={appState} showConfig={() => { }} />
				<Source appState={appState} />
			</div>
		</>
	)
}