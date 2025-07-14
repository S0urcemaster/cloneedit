import { App } from "../model";

export default function Mask({ appState, appEvents }: { appState: App, appEvents: any }) {
	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'column', paddingTop: 1 }}>
				<textarea
					// value={appState.systems[appState.currentSystem].definition}
					onChange={(e) => appEvents.definitionChanged(e.target.value)}
					rows={4}
					cols={50}
					placeholder={'system'}
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
				<input
					type='text'
					onChange={(e) => appEvents.nameChanged(e.target.value)}
					placeholder="name"
				/>
			</div>
		</>
	);
}