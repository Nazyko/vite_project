import { useState } from 'react';
import { Modal } from './Search';
import "./Style.css"
import { IconSearch } from '@tabler/icons-react';
import { NavLink } from 'react-router-dom';


const Header = () => {
  const [modalActive, setModalActive] = useState(false)

  return (
    <header className="header">
      <div className="inner">
        <NavLink to='' style={{fontFamily: 'Sans-serif', fontSize: 32}}>Dummy JSON</NavLink>

        <div className={modalActive ? 'search-container-none' : 'search-container'} onClick={() => {setModalActive(true)}}>
          <IconSearch stroke={1} />
          <input className='searchInput' placeholder='Search' readOnly/>
        </div>
      </div>

      <Modal active={modalActive} setActive={setModalActive} />
    </header>
  );
}

export { Header }