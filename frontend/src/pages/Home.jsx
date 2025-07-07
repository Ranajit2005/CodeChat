import Sidebar from '../components/Sidebar'
import MessageArea from '../components/MessageArea'

const Home = () => {
  return (
    <div className='flex w-full h-screen'>
      <Sidebar/>
      <MessageArea/>
    </div>
  )
}

export default Home
