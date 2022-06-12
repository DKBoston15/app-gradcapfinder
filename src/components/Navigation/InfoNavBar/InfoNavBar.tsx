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
  CustomSelect,
  SelectContainer,
} from './styles';
import useLocalStorage from '@app/hooks/useLocalStorage';

const categoryItems = [
  { label: 'All', value: 'all' },
  { label: 'Primary', value: 'primary' },
];

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
  const [category, setCategory] = useLocalStorage('category', 'all');

  useEffect(() => {
    if (category === 'primary') {
      const primaryItems = items.filter((item: any) => item.primary);
      if (searchValue !== '') {
        const fuse = new Fuse(primaryItems, options);
        type FuseResult = Fuse.FuseResult<any>;
        const data: FuseResult[] = fuse.search(searchValue);
        const arr = data.map((item) => {
          return item.item;
        });
        setSearchedItems(arr);
      } else {
        setSearchedItems(primaryItems);
      }
    } else {
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
    }
  }, [items, category, searchValue]);

  return (
    <Container className="literatureList">
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
        {(header === 'Journals' || header === 'People' || header === 'Key Terms') && (
          <SelectContainer>
            <CustomSelect
              value={category}
              options={categoryItems}
              onChange={(e) => setCategory(e.value)}
            />
          </SelectContainer>
        )}
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
