import { ReactElement, useCallback, useEffect, useState } from 'react';
import { PoolsPage } from './pools-page';
import { Section } from 'shared/components';
import { Button } from '@mui/material';

export const PoolList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pools, setPools] = useState<ReactElement[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const updateTotalPages = useCallback((amount: number) => {
    setTotalPages(amount);
  }, []);

  const handleLoadPoolsPage = useCallback(() => {
    const nextPage = currentPage + 1;
    // https://swr.vercel.app/docs/pagination 🤷‍
    setPools((prev) => [
      ...prev,
      <PoolsPage
        key={nextPage}
        index={nextPage}
        setTotalPages={!totalPages ? updateTotalPages : undefined}
      />,
    ]);
    setCurrentPage((prev) => prev + 1);
  }, [currentPage, totalPages, updateTotalPages]);

  // first pools adding
  useEffect(() => {
    if (currentPage === 0) handleLoadPoolsPage();
  }, [currentPage, handleLoadPoolsPage]);

  return (
    <Section spacing={2} mt={3.5}>
      {pools}

      {currentPage < totalPages && (
        <Button
          onClick={handleLoadPoolsPage}
          sx={{ width: 'fit-content', margin: '18px auto' }}
        >
          Load more
        </Button>
      )}
    </Section>
  );
};
