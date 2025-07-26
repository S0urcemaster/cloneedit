import { smileys } from "../app/constants";
import { useCloneEditContext } from "../app/context";

export function EditForm() {

	const { setInsert } = useCloneEditContext()
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 1, paddingLeft: 5 }}>

			<fieldset style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 2 }}>

				<label htmlFor="letters">Letters</label>
				<span>10,546</span>
				<label htmlFor="words">Words</label>
				<span>1984</span>

				<label htmlFor="memory">Memory</label>
				<div id={'memory'} style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
					<button style={{}}>M1</button>
					<button style={{}}>M2</button>
					<button style={{}}>M3</button>
					<button style={{}}>M4</button>
					<button style={{}}>M5</button>
					<button style={{}}>M6</button>
				</div>

				<label htmlFor="snippets">Snippets</label>
				<div id={'snippets'} style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
					<button style={{}}>S1</button>
					<button style={{}}>S2</button>
					<button style={{}}>S3</button>
					<button style={{}}>S4</button>
					<button style={{}}>S5</button>
					<button style={{}}>S6</button>
				</div>

				<label htmlFor="snippets">Smileys</label>
				<div id={'snippets'} style={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
					{smileys.map((smiley, ix) => (
						<button key={ix} style={{}} onClick={() => setInsert(smiley)}>{smiley}</button>
					))}
				</div>

			</fieldset>
		</div>
	)
}