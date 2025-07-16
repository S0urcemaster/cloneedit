# Clone Edit Development Tag 3

- Fonts hinzufügen
- Tabs Komponente

Es soll eine Komponente geschrieben werden die Buttons erzeugt , horizontal oder vertikal anordnet und einen Klick zurückgibt #ersterentwurf
```
// /components/tabbar.tsx
export function TabBar({
	vertical = false, buttonNames, onTabClick
}: {
	vertical?: boolean
	buttonNames: string[]
	onTabClick: (tabName: string) => void
}) {
	return (
		<div style={vertical ? { display: 'flex', flexDirection: 'column', gap: 5 } : { display: 'flex', gap: 5 }}>
			{buttonNames.map((name, index) => (
				<button key={index} onClick={() => onTabClick(name)} style={{}}>
					{name}
				</button>
			))}
		</div>
	)
}
```
Parameter : 
vertical : Für die Klone werden die Tabs wahrscheinlich vertikal deswegen schon mal die Berücksichtigung
buttonNames : Sie sollen sich ja unterscheiden
onTabClick : hier schreibt man seine eigene Funktion rein . Etwa so :
```
<TabBar buttonNames={['Tab 1', 'Tab 2', 'Settings']} onTabClick={(tabName: string) => setTab(tabName)} />
```
- UI Anpassungen
- Erste Formularentwürfe für die drei Tabs Edit, Files und Settings

Die erste Implementierung drängt sich auf und gleich was schwieriges : Ein Klon soll den eingestellten Filter ändern . Kindelemente dürfen den State nicht ändern also müssen wir aus dem Kontext heraus eine Funktion anbieten damit das hier geht :

```
const { state, filterChanged } = useCloneEditContext()
```

Wir holen uns einfach die Funktion die wir brauchen aus dem Kontext aber noch gibt es die nicht . Sie wird im CloneEdit Provider bereitgestellt der auf eine Funktion gleichen Namens im Kontext verweist

```
<CloneEditContext.Provider value={{
			state: state,
			filterChanged: filterChanged
		}}>
```
So sieht das für KI aus
```
function filterChanged(clone: CloneModel, filterName: string) {
		// find the clone / update its value and update the state
		const updatedClones = state.documents[0].clones.map(c => {
			if (c.id === clone.id) {
				return { ...c, filter: filterName }
			}
			return c
		})
		const updatedDocument = { ...state.documents[0], clones: updatedClones }
	}
```