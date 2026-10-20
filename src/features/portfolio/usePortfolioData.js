import { fallbackProjects, fallbackSkills } from './queries';

const staticPortfolioData = {
  skills: fallbackSkills,
  projects: fallbackProjects,
  loading: false,
};

export function usePortfolioData() {
  return staticPortfolioData;
}
