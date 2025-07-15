import { useCloneEditContext } from './context';

export default function Editor() {

	const { state } = useCloneEditContext()

	// unique inside each editor so we can share the editor state by placing this component inside Editor
	// instead of passing the appState as a prop
	function Head() {
		return (
			<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden', paddingTop: 0, paddingBottom: 2 }}>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					<h1 style={{ position: 'relative', top: -5, left: 1, fontSize: 28, color: 'black' }}>Clone Edit</h1>
					<div style={{ display: 'flex', gap: 5 }}>
						<button>Tab1</button>
						<button>Tab2</button>
						<button>Tab3</button>
					</div>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
					<button style={{}}>Del</button>
					<button style={{}}>Dupl</button>
					<button style={{}}>New</button>
					<button style={{}}>I</button>
				</div>
			</div>
		)
	}

	function Source() {
		return (
			<>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<textarea
						value={state.editors[0].text}
						rows={4}
						cols={50}
						placeholder={'Guess what'}
						style={{
							height: '100%',
							resize: 'none',
							background: state.settings.editorBackgroundColor, // Gradient background
							color: state.settings.textColor, // Text color
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
			<div style={{ display: 'grid', gridTemplateColumns: '3fr 7fr', padding: 5, gap: 5, backgroundColor: state.settings.componentColor }}>
				<Head />
				<Source />
			</div>
		</>
	)
}