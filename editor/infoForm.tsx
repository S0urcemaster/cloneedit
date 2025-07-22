import * as constants from '../app/constants'

export function InfoForm() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
			<p>
				Clone Edit is a DTW / Digital Text Workstation where you can apply multiple Effects
				to a source text for use in Social Media or with AI . Walk through the examples folder
				to see some use cases
			</p>
			<table style={{ width: '100%', borderCollapse: 'collapse', }}>
				<tbody>
					<tr>
						<td>Idea<br />Design<br />Programming</td>
						<td className={'cloneedit-color'}>
							<a className={'cloneedit-color'} href="https://digi-craft.de" target="_blank" rel="noopener noreferrer">
								Digi Craft
							</a>
						</td>
					</tr>
					<tr>
						<td>Buy me a coffee</td>
						<td>
							<a href="https://coff.ee/sebastianteister" target="_blank" rel="noopener noreferrer">
								coff.ee/sebastianteister
							</a>
						</td>
					</tr>
					<tr>
						<td>Donate at Paypal</td>
						<td>
							<a href="https://paypal.me/snteister" target="_blank" rel="noopener noreferrer">
								paypal.me/snteister
							</a>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

	)
}