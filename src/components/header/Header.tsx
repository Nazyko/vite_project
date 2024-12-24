import { useState } from 'react';
import { Modal } from './Search';
import "./Style.css"
import { NavLink } from 'react-router-dom';
import { MdOutlineShoppingCart } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { Flex } from '@mantine/core';


const Header = () => {
  const [modalActive, setModalActive] = useState(false)

  return (
    <Flex justify='center'>
      <Flex align='center' justify='space-around' className="header">
        
        <NavLink to='/' style={{fontFamily: 'Sans-serif', fontSize: 32, color: '#000'}}>Dummy JSON</NavLink>

        <Flex align='center' gap={20}>
          <div className={modalActive ? 'search-btn-none' : ''} onClick={() => {setModalActive(true)}}>
            <FiSearch style={{cursor: 'pointer'}} size={30} />
          </div>
          <NavLink to='/cart' style={{color: '#000'}}>
            <MdOutlineShoppingCart size={30} />
          </NavLink>
        </Flex>

      </Flex>

      <Modal active={modalActive} setActive={setModalActive} />
    </Flex>
  );
}

export { Header }