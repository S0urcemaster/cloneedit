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
		<div style={vertical ? { display: 'flex', flexDirection: 'column', gap: 1 } : { display: 'flex', gap: 1 }}>
			{buttonNames.map((name, index) => (
				<button key={index} onMouseDown={() => onTabClick(name)} style={{...buttonStyle}}>
					{name}
				</button>
			))}
		</div>
	)
}