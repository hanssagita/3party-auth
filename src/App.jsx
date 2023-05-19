import Discord from './3party/Discord'
import Twitter from './3party/Twitter'

const App = () => {
  return (
    <div className='flex flex-col space-y-5'>
      <Discord/>
      <div>-------------</div>
      <Twitter />
    </div>
  )
}

export default App