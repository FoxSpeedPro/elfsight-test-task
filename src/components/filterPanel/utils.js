import { API_URL } from '../providers/DataProvider';
import { defaultFilters } from './constants';

function buildSearchParams(filters, page = 1) {
  const searchParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });

  searchParams.set('page', page);

  return searchParams;
}

export function getFiltersFromSearch() {
  const searchParams = new URLSearchParams(window.location.search);

  return {
    status: searchParams.get('status') || '',
    gender: searchParams.get('gender') || '',
    species: searchParams.get('species') || '',
    name: searchParams.get('name') || '',
    type: searchParams.get('type') || ''
  };
}

export function buildApiUrl(filters, page = 1) {
  const url = new URL(API_URL);
  const searchParams = buildSearchParams(filters, page);

  url.search = searchParams.toString();

  return url.toString();
}

export function syncBrowserUrl(filters, page = 1) {
  const searchParams = buildSearchParams(filters, page);
  const queryString = searchParams.toString();
  const nextUrl = `${window.location.pathname}?${queryString}`;

  window.history.replaceState(null, '', nextUrl);
}

export function getInitialFilters() {
  return {
    ...defaultFilters,
    ...getFiltersFromSearch()
  };
}
