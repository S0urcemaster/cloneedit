import { useCloneEditContext } from "../app/context"
import CircleClickGame from "../components/CircleClickGame"
import { account_section_height } from "../static/constants"

export default () => {

   const { account, setAccount } = useCloneEditContext()

   function update(points: number) {
      setAccount({...account, tokens: account.tokens +points})
   }

   return (
		<div id='accountForm' style={{ position: 'relative', display: 'flex', gap: '0.1rem', flexWrap: 'wrap' }}>
         <div style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
            <CircleClickGame update={update} />
         </div>
         <div style={{display: 'flex', flexDirection: 'column', height: account_section_height, padding: '5px 0 0 10px'}}>
            <h1>Name: {account.name}</h1>
            <div>Id: {account.id}</div>
            <div>Type: {account.type}</div>
            <div>Tokens: {account.tokens}</div>
         </div>
      </div>
   )
}