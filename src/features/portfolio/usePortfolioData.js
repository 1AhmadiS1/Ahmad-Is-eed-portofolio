import { useEffect, useState } from 'react';
import { fallbackProjects, fallbackSkills, getPortfolioData } from './queries';

const initialPortfolioState = {
  skills: fallbackSkills,
  projects: fallbackProjects,
  loading: true,
};

export function usePortfolioData() {
  const [data, setData] = useState(initialPortfolioState);

  useEffect(() => {
    const controller = new AbortController();

    async function loadPortfolio() {
      try {
        const portfolio = await getPortfolioData({ signal: controller.signal });
        setData({ ...portfolio, loading: false });
      } catch (error) {
        if (error.name !== 'AbortError') {
          setData({ ...initialPortfolioState, loading: false });
        }
      }
    }

    loadPortfolio();

    return () => {
      controller.abort();
    };
  }, []);

  return data;
}
