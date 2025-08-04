import { CSSProperties } from "react"

export function TabBar({
	vertical = false, buttonNames, onTabClick, buttonStyle, disabled
}: {
	vertical?: boolean
	buttonNames: string[]
	onTabClick: (tabName: string) => void
	buttonStyle?: CSSProperties
	disabled?: boolean
}) {
	return (
		<div style={vertical ? { display: 'flex', flexDirection: 'column', gap: '0.1rem' } : { display: 'flex', gap: '0.1rem' }}>
			{buttonNames.map((name, index) => (
				<button disabled={disabled} key={index} onMouseDown={() => onTabClick(name)} style={{...buttonStyle}}>
					{name}
				</button>
			))}
		</div>
	)
}