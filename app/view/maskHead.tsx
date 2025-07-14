import { App } from "../model";

export default function MenuHead({appState, showConfig}: {appState: App, showConfig: () => void}) {
	return (
		<div style={{display: 'flex', justifyContent: 'space-between', height: 25, overflow: 'hidden', paddingTop: 3}}>
			<h1 style={{position: 'relative', top: -5, left: -1}}>Contex Desk</h1>
			<div>
				<button onClick={showConfig} style={{marginRight: 3, width: 35}}>Del</button>
				<button onClick={showConfig} style={{marginRight: 3, width: 50}}>Dupl</button>
				<button onClick={showConfig} style={{marginRight: 3, width: 55}}>New</button>
				<button onClick={showConfig} style={{marginRight: 3, width: 20}}>I</button>
			</div>
		</div>
	)
}