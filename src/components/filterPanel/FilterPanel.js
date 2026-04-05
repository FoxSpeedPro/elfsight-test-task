import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useData } from '../providers';
import { FilterButton } from './components/FilterButton';
import { FilterInput } from './components/FilterInput';
import { FilterSelect } from './components/FilterSelect';
import { defaultFilters, genderOptions, statusOptions } from './constants';
import {
  buildApiUrl,
  getInitialFilters,
  getFiltersFromSearch,
  syncBrowserUrl
} from './utils';

export function FilterPanel() {
  const { setApiURL, setActivePage, speciesOptions } = useData();
  const [filters, setFilters] = useState(defaultFilters);

  useEffect(() => {
    const initialFilters = getInitialFilters();

    setFilters(initialFilters);
    setActivePage(0);
    setApiURL(buildApiUrl(initialFilters, 1));
  }, [setActivePage, setApiURL]);

  useEffect(() => {
    function handlePopState() {
      const nextFilters = getFiltersFromSearch();

      setFilters(nextFilters);
      setActivePage(0);
      setApiURL(buildApiUrl(nextFilters, 1));
    }

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [setActivePage, setApiURL]);

  function handleInputChange(key, value) {
    setFilters((prevState) => ({
      ...prevState,
      [key]: value
    }));
  }

  function handleApply() {
    setActivePage(0);
    syncBrowserUrl(filters, 1);
    setApiURL(buildApiUrl(filters, 1));
  }

  function handleReset() {
    setFilters(defaultFilters);
    setActivePage(0);
    syncBrowserUrl(defaultFilters, 1);
    setApiURL(buildApiUrl(defaultFilters, 1));
  }

  return (
    <FiltersWrapper>
      <FilterSelect
        placeholder="Status"
        value={filters.status}
        options={statusOptions}
        onChange={(value) => handleInputChange('status', value)}
      />

      <FilterSelect
        placeholder="Gender"
        value={filters.gender}
        options={genderOptions}
        onChange={(value) => handleInputChange('gender', value)}
      />

      <FilterSelect
        placeholder="Species"
        value={filters.species}
        options={speciesOptions}
        onChange={(value) => handleInputChange('species', value)}
      />

      <FilterInput
        placeholder="Name"
        value={filters.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />

      <FilterInput
        placeholder="Type"
        value={filters.type}
        onChange={(e) => handleInputChange('type', e.target.value)}
      />

      <FilterButton onClick={handleApply}>Apply</FilterButton>

      <FilterButton variant="reset" onClick={handleReset}>
        Reset
      </FilterButton>
    </FiltersWrapper>
  );
}

const FiltersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  max-width: 561px;

  @media (max-width: 530px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 15px;
  }
`;
