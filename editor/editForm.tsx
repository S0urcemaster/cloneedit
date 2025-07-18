export function EditForm() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>

			<div id={'memory'} style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
				<button style={{}}>Undo</button>
				<button style={{}}>Redo</button>
			</div>
			<fieldset style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 5, paddingLeft: 4 }}>

				<label htmlFor="letters">Letters</label>
				<span>10,546</span>
				<label htmlFor="words">Words</label>
				<span>1984</span>

				<label htmlFor="memory">Memory</label>
				<div id={'memory'} style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
					<button style={{}}>M1</button>
					<button style={{}}>M2</button>
					<button style={{}}>M3</button>
					<button style={{}}>M4</button>
					<button style={{}}>M5</button>
					<button style={{}}>M6</button>
				</div>

				<label htmlFor="snippets">Snippets</label>
				<div id={'snippets'} style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
					<button style={{}}>S1</button>
					<button style={{}}>S2</button>
					<button style={{}}>S3</button>
					<button style={{}}>S4</button>
					<button style={{}}>S5</button>
					<button style={{}}>S6</button>
				</div>

			</fieldset>
		</div>
	)
}