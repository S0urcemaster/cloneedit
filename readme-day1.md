# Clone Edit Tag 1

- Fehlende Arbeitsplätze installieren
- Git - Strategie
- ```npm install next react react-dom typescript @types/react @types/node```
- ContexDesk klonen so weit sinnvoll
- Layout nach vertikal drehen
- App model
- Refactoring .. morgen

---

Anforderungen aus X rauskopiert

Globale Anforderungen #CloneEdit
- Editor Tabs ( multi document )
- Local Storage mit Upload / Download von Einzeldokumenten und Gesamtbackup
- Filter ( Caesar , replaceText , replaceList , substring )
- UI Funktionen ( Schriftgröße Source und Klone einzeln , Editorhöhe einzeln , Klon Position )
- Ein Filter pro Klon ->
- Source - Auswahl pro Klon / Clone - Pipes so möglich
- Checkliste statt Tests
- Kein DragAndDrop
- Erst mal Kein Server ( API - Filter möglich / zB KI )
- Responsive Breite einstellbar : Ohne Rand li/re , 25% Rand , 50% , für widescreen 66% Rand
-> Layout drehen ; Haupteditor mit Texteinstellungen -> Allgemeine Editorzeile -> Klon Editorzeile ; Klone hinzufügen / entfernen ; Klone ordnen mit Buttons ; Source Auswahl und Duplizierung ; Caesar Filter -> Einstellung update nach timeout oder manuell ; alle Klone manuell in Reihe starten ; Generalisierter Filter -> Weitere Filter -> Checkliste erstellen -> Build mit Checkliste ; Wie erforderlich models bauen / gleich mit LocalStorage ( Context von DigiCraft2 nehmen ) ; Sparsamer Tree - Update ; Checkliste anpassen und mit finalem Build ausliefern

---


## model.ts
Nicht der einzige / aber ein guter Punkt um anzufangen . Das App Model ist wie eine Anforderungsbeschreibung aus Sicht der App : Was muss sie denn für Werte speichern über ihre Lebensdauer ? Alles was der Benutzer einstellen und eingeben kann wird im einer Instanz des App Models gespeichert
Die App startet mit Standardwerten die sofort in den Browserspeicher geschrieben werden . Es gibt kein Dokument speichern sondern alles wird instant ins Browser - RAM geschrieben . Um die lokale Sicherung der Daten wird dann zu gegebener Zeit der Benutzer gebeten
( Persönlich schreibe ich Models immer im Text wo sie sich entwickeln . Das Ergebnis mache ich also nicht fertig im Kopf sondern ich schreibe eher an einer mathematischen Gleichung rum die möglichst wohlgeformt ist )
Nach dem ersten Entwurf wird daran orientiert das UI gebaut und gegenseitig bei Bedarf angepasst . Das UI erweitert das jeweilige Model und nutzt eine Instanz davon direkt um Eingaben zu speichern : Im React State

```// Ganz oben weiter oben geht nicht
export type App = {
	// Multi Document
	editors: Editor[]
	settings: Settings // Globale Einstellungen : Schriftart , Rand
	// Filter werden hart kodiert
}

export type Editor = {
	name: String
	text: String
	fontSize: number
	clones: Clone[]
}

export type Clone = {
	id: number // unique id benötigt pro Objekt
	source: number // id 0 für editor und 1 bis x für Klone
	filter: Filter // Konstantenname / id da hart kodiert . K.A. wie das generalisiert / lass ich mich überraschen
}

export type Filter = string

export const CAESAR_FILTER = 'caesar'
export const REPLACE_TEXT_FILTER = 'replaceText'
export const REPLACE_LIST_FILTER = 'replaceList'

export type Settings = {
}

// Und testen wir ob das ganze funktioniert im defaultModel
export const defaultModel: App = {
	editors: [
		{
			name: 'Default',
			text: '',
			fontSize: 16,
			clones: [
				{
					id: 1,
					source: 0,
					filter: CAESAR_FILTER
				},
				{
					id: 2,
					source: 1,
					filter: REPLACE_TEXT_FILTER
				}
			]
		},
		{
			name: 'Editor 2',
			text: 'Dies ist der Text des Editors 2.',
			fontSize: 16,
			clones: []
		}
	],
	settings: {}
}
```