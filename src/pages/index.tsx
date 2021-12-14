import { Button, Box, Heading } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    async ({ pageParam }) => {
      const response = await api.get('/api/images', {
        params: {
          after: pageParam,
        },
      });

      return response.data;
    },
    {
      getNextPageParam: (lastPage, pages) => {
        console.log(lastPage, pages);
        return lastPage.after;
      },
    }
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    if (!data) {
      return [];
    }

    return data.pages.reduce((prevArr, currPage) => {
      prevArr = [...prevArr, ...currPage.data];

      return prevArr;
    }, []);
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <>
      <Header />
      <div style={{display: "none"}}>
      <img alt="Doge" src="https://i.ibb.co/K6DZdXc/minh-pham-LTQMgx8t-Yq-M-unsplash.jpg" className="chakra-image css-1xe2yo5"/>
      <h1>Doge</h1>
      <header>
        <h2 aria-role="reading" aria-level={2} >Doge</h2>
        <Heading>Doge</Heading>
      </header>
      {/* <heading>Doge</heading> */}
      <h4>Doge</h4>
      <p className="chakra-text css-dvmqi6">The best doge</p>
      </div>
      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <Button
            role="button"
            type="button"
            mt="6"
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage || isLoading ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
      </Box>
    </>
  );
}