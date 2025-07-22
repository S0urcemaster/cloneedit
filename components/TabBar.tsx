export function TabBar({
	vertical = false, buttonNames, onTabClick
}: {
	vertical?: boolean
	buttonNames: string[]
	onTabClick: (tabName: string) => void
}) {
	return (
		<div style={vertical ? { display: 'flex', flexDirection: 'column', gap: 1 } : { display: 'flex', gap: 1 }}>
			{buttonNames.map((name, index) => (
				<button key={index} onMouseDown={() => onTabClick(name)} style={{}}>
					{name}
				</button>
			))}
		</div>
	)
}