import { CardList } from '../components/cards/cardlist/CardList'
import { PaginationMantine } from '../components/cards/cardlist/PaginationMantine';
import { Status } from '../components/status/Status';


const Home = () => {

  return (
    <>
      <Status />
      <CardList />
      {/* <PaginationMantine /> */}
    </>
  )
}

export default Home
