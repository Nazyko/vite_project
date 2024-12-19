import React, { useEffect, useState } from 'react'
import "./Style.css"
import { fetchProducts, searchProduct } from '../../store/cardsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hook'
import { IconSearch } from '@tabler/icons-react';
import { Link } from "react-router-dom";
import { FilteredList } from './FilteredList';
import { Flex } from '@mantine/core';
import '@mantine/core/styles.css';
import { Status } from '../status/Status';


interface SearchProps {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: React.FC<SearchProps> = ({ active, setActive }) => {
  const [value, setValue] = useState<string>("")
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.cards.filteredList);


  

  const search: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const searchValue = e.target.value
    setValue(searchValue)
    dispatch(searchProduct(searchValue))
  }

  return (
    <div className={active ? "modal active" : "modal" } onClick={()=> setActive(false)}>
      <div className={active ? "modal__content active" : "modal__content" } onClick={(e)=> e.stopPropagation()}>
        <div className='search-container' style={{marginBottom: 20}}>
          <IconSearch stroke={1} />
          <input 
            className='searchInput' 
            type='text' 
            placeholder='Search' 
            value={value} 
            onChange={search}
          />
        </div>
        {items ? (
          <Flex mih={50} gap="md" justify="center" align="flex-start" direction="row" wrap="wrap">
            {items.map((item) => (
              <Link key={item.id} to={`/${item.id}`}>
                <FilteredList 
                  title={item.title} 
                  thumbnail={item.thumbnail} 
                  price={item.price}
                  discountPercentage={item.discountPercentage}
                />
              </Link>
            ))}
          </Flex>
          ) : (<Status />)
        }
      </div>
    </div>
  )
}

export { Modal } 
