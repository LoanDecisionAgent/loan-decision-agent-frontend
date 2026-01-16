import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import '@testing-library/jest-dom';
import { User } from '../types';

// Mock user data
const mockUser: User = {
  name: 'Test User',
  email: 'test@example.com',
  role: 'admin',
};

describe('Header', () => {
  it('renders the header with the correct title for the dashboard page', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Header 
          user={mockUser}
          toggleDarkMode={() => {}}
          isDarkMode={false}
        />
      </MemoryRouter>
    );

    // Check if the title "Overview" is rendered
    expect(screen.getByText('Overview')).toBeInTheDocument();
    
    // Check for breadcrumbs
    expect(screen.getByText('Portal')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders the header with the correct title for the batch upload page', () => {
    render(
      <MemoryRouter initialEntries={['/batch-upload']}>
        <Header 
          user={mockUser}
          toggleDarkMode={() => {}}
          isDarkMode={false}
        />
      </MemoryRouter>
    );

    // Check if the title "Batch Submission" is rendered
    expect(screen.getByText('Batch Submission')).toBeInTheDocument();

    // Check for breadcrumbs
    expect(screen.getByText('Portal')).toBeInTheDocument();
    expect(screen.getByText('Batch upload')).toBeInTheDocument();
  });

  it('renders the dark mode button correctly', () => {
    const { rerender } = render(
      <MemoryRouter>
        <Header 
          user={mockUser}
          toggleDarkMode={() => {}}
          isDarkMode={false}
        />
      </MemoryRouter>
    );

    // Check for the dark mode icon
    expect(screen.getByText('dark_mode')).toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <Header 
          user={mockUser}
          toggleDarkMode={() => {}}
          isDarkMode={true}
        />
      </MemoryRouter>
    );

    // Check for the light mode icon
    expect(screen.getByText('light_mode')).toBeInTheDocument();
  });
});
