import { App } from "../model";

export default function MaskList ({appState}: {appState: App}) {
	return (
		<div>
		{appState.systems.map((system, index) => (
			<div key={index}>
				{system.name}
			</div>
		))}
		</div>
	)
}