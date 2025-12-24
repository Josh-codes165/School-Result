import { handleResult } from './script.js';

function App(){
  return (
    <>
      <input type="file" accept=".xlsx, .xls" onChange={handleResult} />
    </>
    
  )
}

export default App;