import { useState } from "react";
import { useCloneEditContext } from "../app/context";
import { MemoryButton } from "../components/MemoryButton";
import { RotateButton } from "../components/RotateButton";
import { charsets } from "../static/charsets";
import { log } from "../static/constants";

const otherButtons = ['·', '', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7']

const menu = ['A',]

export function EditForm() {

	const { setEditorActions } = useCloneEditContext()
	const [currentMenu, setCurrentMenu] = useState(0)
	const [currentSubmenu, setCurrentSubmenu] = useState(0)

	function getMemory(n: number) {
		log('EditForm/getMemory/n', n)
	}

	function setMemory(n: number) {
		log('EditForm/setMemory/n', n)
	}

	function insertSmiley(smiley: string) {
		setEditorActions([['insert', smiley]])
	}

	function rotateMenu() {
		// setCurrentMenu(currentMenu + 1)
	}

	return (
		<div id='editForm' style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', justifyContent: 'unset' }}>
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
				<RotateButton values={menu} timeout={750} className={""} callback={rotateMenu} />
				{charsets.smileys.map((charGroup, ix) => (
					<button key={ix} style={{}} onMouseDown={() => setCurrentSubmenu(ix)}>{charGroup[0]}</button>
				))}
			</div>
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
				{charsets.smileys[currentSubmenu][1].map((smiley, ix) => (
					<button key={ix}>{smiley}</button>
				))}
			</div>
		</div>
	)
}