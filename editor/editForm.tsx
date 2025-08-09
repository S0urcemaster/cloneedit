import { useState } from "react";
import { useCloneEditContext } from "../app/context";
import { MemoryButton } from "../components/MemoryButton";
import { RotateButton } from "../components/RotateButton";
import { charsets } from "../static/charsets";
import { log } from "../static/constants";
import { lib } from "../static/lib";
import { FeedbackButton } from "../components/FeedbackButton";

const otherButtons = ['·', '', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7']

const menu = ['类',]

export function EditForm() {

	const { setEditorActions, settings } = useCloneEditContext()
	const [currentMenu, setCurrentMenu] = useState(0)
	const [currentSubmenu, setCurrentSubmenu] = useState(0)

	function getMemory(n: number) {
		log('EditForm/getMemory/n', n)
	}

	function setMemory(n: number) {
		log('EditForm/setMemory/n', n)
	}

	function insertSmiley(smiley: string): boolean {
		setEditorActions([['insert', smiley]])
		return true
	}

	function rotateMenu() {
		setCurrentMenu(lib.getRotatedOffset(menu.length, currentMenu, 1))
	}

	function evaluation(ix: number) {

	}

	return (
		<div id='editForm' style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem', justifyContent: 'unset' }}>
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
				<RotateButton values={menu} timeout={750} style={{fontSize: 24}} callback={rotateMenu} />
				{charsets.smileys.map((charGroup, ix) => (
					<button key={ix} style={{border: currentSubmenu === ix ? `2px solid ${settings.cloneeditColor}` : '', marginTop: 1, height: 38}} onMouseDown={() => setCurrentSubmenu(ix)}>{charGroup[0]}</button>
				))}
			</div>
			<div style={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
				{charsets.smileys[currentSubmenu][1].map((smiley, ix) => (
					<FeedbackButton duration={500} className="bigSmileyButton" style={{ fontSize: 26 }} evaluation={() => true} evaluated={(to) => insertSmiley(smiley)} successNode={<span style={{color: settings.greenColor}}>☺</span>} failureNode={<span style={{color: settings.redColor}}>☹</span>}>{smiley}</FeedbackButton>

					// <button key={ix}>{smiley}</button>
				))}
			</div>
		</div>
	)
}