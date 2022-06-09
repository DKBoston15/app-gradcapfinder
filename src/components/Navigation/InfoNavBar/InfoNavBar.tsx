import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import {
  Container,
  ItemList,
  Item,
  Title,
  CustomSearch,
  CustomSearchContainer,
  ButtonContainer,
} from './styles';

export default function InfoNavBar({
  items,
  setSearchParams,
  selectedProject,
  options,
  header,
  searchQueryTitle,
}: any) {
  const [searchValue, setSearchValue] = useState('');
  const [searchedItems, setSearchedItems] = useState<any[]>([]);

  useEffect(() => {
    setSearchedItems(items);
  }, [items]);

  useEffect(() => {
    if (searchValue !== '') {
      const fuse = new Fuse(items, options);
      type FuseResult = Fuse.FuseResult<any>;
      const data: FuseResult[] = fuse.search(searchValue);
      const arr = data.map((item) => {
        return item.item;
      });
      setSearchedItems(arr);
    } else {
      setSearchedItems(items);
    }
  }, [searchValue]);

  return (
    <Container>
      <Title>{header}</Title>
      <ButtonContainer>
        <CustomSearchContainer className="p-input-icon-left">
          <i className="pi pi-search" />
          <CustomSearch
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
          />
        </CustomSearchContainer>
      </ButtonContainer>

      <ItemList>
        {searchedItems.map((item) => (
          <Item
            onClick={() =>
              setSearchParams({
                [searchQueryTitle]: item.id,
                projectId: selectedProject,
              })
            }
            key={item.id}>
            {item.first_name
              ? `${item.first_name} ${item.last_name != null ? item.last_name : ''}`
              : item.title || item.name}
          </Item>
        ))}
      </ItemList>
    </Container>
  );
}
