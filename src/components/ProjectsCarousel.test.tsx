import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectsCarousel from './ProjectsCarousel';
import { projectsData } from '../utils/projectData';

test('shows first project title and advances on next', async () => {
  const user = userEvent.setup();
  render(<ProjectsCarousel projects={projectsData} />);
  expect(screen.getByRole('heading', { name: projectsData[0].title })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /next project/i }));
  expect(screen.getByRole('heading', { name: projectsData[1].title })).toBeInTheDocument();
});

test('wraps from last to first', async () => {
  const user = userEvent.setup();
  render(<ProjectsCarousel projects={projectsData} />);
  const next = screen.getByRole('button', { name: /next project/i });
  for (let i = 0; i < projectsData.length; i += 1) {
    await user.click(next);
  }
  expect(screen.getByRole('heading', { name: projectsData[0].title })).toBeInTheDocument();
});
