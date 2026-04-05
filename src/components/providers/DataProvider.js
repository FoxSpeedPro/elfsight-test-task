import axios from 'axios';
import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const SPECIES_STORAGE_KEY = 'character-species-options';

const DEFAULT_SPECIES_OPTIONS = [
  'Alien',
  'Animal',
  'Cronenberg',
  'Disease',
  'Human',
  'Humanoid',
  'Mythological Creature',
  'Poopybutthole',
  'Robot',
  'unknown'
];

export const API_URL = 'https://rickandmortyapi.com/api/character/';

const DataContext = createContext({});

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);
  const [speciesOptions, setSpeciesOptions] = useState([]);

  const fetchData = useCallback(async (url) => {
    setIsFetching(true);
    setIsError(false);

    axios
      .get(url)
      .then(({ data }) => {
        setIsFetching(false);
        setCharacters(data.results || []);
        setInfo(data.info || {});
      })
      .catch((e) => {
        setIsFetching(false);
        setIsError(true);
        setCharacters([]);
        setInfo({});
        console.error(e);
      });
  }, []);

  const fetchSpeciesOptions = useCallback(async () => {
    const cachedSpecies = sessionStorage.getItem(SPECIES_STORAGE_KEY);

    if (cachedSpecies) {
      setSpeciesOptions(JSON.parse(cachedSpecies));

      return;
    }

    const uniqueSpecies = new Set(DEFAULT_SPECIES_OPTIONS);

    try {
      let nextUrl = API_URL;

      while (nextUrl) {
        const { data } = await axios.get(nextUrl);

        data.results.forEach((character) => {
          if (character.species) {
            uniqueSpecies.add(character.species);
          }
        });

        nextUrl = data.info.next;

        if (nextUrl) {
          //FYI: Попытка не ронять апи, он то стабильно возвращает, то падает с tooManyRequests
          await sleep(250);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      const nextSpeciesOptions = Array.from(uniqueSpecies).sort((a, b) =>
        a.localeCompare(b)
      );

      sessionStorage.setItem(
        SPECIES_STORAGE_KEY,
        JSON.stringify(nextSpeciesOptions)
      );

      setSpeciesOptions(nextSpeciesOptions);
    }
  }, []);

  useEffect(() => {
    fetchData(apiURL);
  }, [apiURL, fetchData]);

  useEffect(() => {
    fetchSpeciesOptions();
  }, [fetchSpeciesOptions]);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      fetchData,
      isFetching,
      isError,
      info,
      speciesOptions
    }),
    [
      activePage,
      apiURL,
      characters,
      fetchData,
      isFetching,
      isError,
      info,
      speciesOptions
    ]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
