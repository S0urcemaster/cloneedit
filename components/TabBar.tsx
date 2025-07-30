import { CSSProperties } from "react"

export function TabBar({
	vertical = false, buttonNames, onTabClick, buttonStyle
}: {
	vertical?: boolean
	buttonNames: string[]
	onTabClick: (tabName: string) => void
	buttonStyle?: CSSProperties
}) {
	return (
		<div style={vertical ? { display: 'flex', flexDirection: 'column', gap: '0.1rem' } : { display: 'flex', gap: '0.1rem' }}>
			{buttonNames.map((name, index) => (
				<button key={index} onMouseDown={() => onTabClick(name)} style={{...buttonStyle}}>
					{name}
				</button>
			))}
		</div>
	)
}