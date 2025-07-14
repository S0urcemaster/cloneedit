import { App } from "../model";

export default function ModelHead({appState, showConfig}: {appState: App, showConfig: () => void}) {
	return (
		<div style={{display: 'flex', justifyContent: 'space-between', height: 25, overflow: 'hidden', paddingTop: 3}}>
			<div>
				<button onClick={showConfig} style={{marginRight: 3, width: 90}}>Run</button>
				<button onClick={showConfig} style={{marginRight: 3}}>Delete</button>
			</div>
			<select>
				<option value="gpt-2">Llama 3</option>
				<option value="gpt-3">Vicuna-13B</option>
				<option value="gpt-4">h2oGPT</option>
			</select>
		</div>
	)
}