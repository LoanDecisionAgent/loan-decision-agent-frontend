import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';
import '@testing-library/jest-dom';
import { User, UserRole } from '../../types';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
}));

// Mock Next.js Link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

import { usePathname } from 'next/navigation';

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  role: UserRole.ADMIN,
  organization: 'Test Org',
  avatar: '',
};

describe('Header', () => {
  const mockToggleDarkMode = jest.fn();
  const mockOnMenuClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the header with the correct title for the dashboard page', () => {
    mockUsePathname.mockReturnValue('/dashboard');

    render(
        <Header 
          user={mockUser}
        toggleDarkMode={mockToggleDarkMode}
          isDarkMode={false}
        onMenuClick={mockOnMenuClick}
        />
    );

    // Check if the title "Overview" is rendered
    expect(screen.getByText('Overview')).toBeInTheDocument();
    
    // Check for breadcrumbs
    expect(screen.getByText('Portal')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders the header with the correct title for the batch upload page', () => {
    mockUsePathname.mockReturnValue('/batch-upload');

    render(
        <Header 
          user={mockUser}
        toggleDarkMode={mockToggleDarkMode}
          isDarkMode={false}
        onMenuClick={mockOnMenuClick}
        />
    );

    // Check if the title "Batch Submission" is rendered
    expect(screen.getByText('Batch Submission')).toBeInTheDocument();

    // Check for breadcrumbs
    expect(screen.getByText('Portal')).toBeInTheDocument();
    expect(screen.getByText('Batch Upload')).toBeInTheDocument();
  });

  it('renders the dark mode button correctly', () => {
    mockUsePathname.mockReturnValue('/dashboard');

    const { rerender, container } = render(
        <Header 
          user={mockUser}
        toggleDarkMode={mockToggleDarkMode}
          isDarkMode={false}
        onMenuClick={mockOnMenuClick}
      />
    );

    // Find dark mode button by finding the button that contains the dark_mode icon
    const darkModeButtons = container.querySelectorAll('button');
    const darkModeButton = Array.from(darkModeButtons).find(btn => 
      btn.querySelector('.material-symbols-outlined')?.textContent === 'dark_mode'
    );
    
    expect(darkModeButton).toBeInTheDocument();

    rerender(
        <Header 
          user={mockUser}
        toggleDarkMode={mockToggleDarkMode}
          isDarkMode={true}
        onMenuClick={mockOnMenuClick}
        />
    );

    // Check for the light mode icon
    const lightModeButtons = container.querySelectorAll('button');
    const lightModeButton = Array.from(lightModeButtons).find(btn => 
      btn.querySelector('.material-symbols-outlined')?.textContent === 'light_mode'
    );
    expect(lightModeButton).toBeInTheDocument();
  });

  it('calls toggleDarkMode when dark mode button is clicked', () => {
    mockUsePathname.mockReturnValue('/dashboard');

    const { container } = render(
      <Header 
        user={mockUser}
        toggleDarkMode={mockToggleDarkMode}
        isDarkMode={false}
        onMenuClick={mockOnMenuClick}
      />
    );

    const darkModeButtons = container.querySelectorAll('button');
    const darkModeButton = Array.from(darkModeButtons).find(btn => 
      btn.querySelector('.material-symbols-outlined')?.textContent === 'dark_mode'
    );
    
    expect(darkModeButton).toBeInTheDocument();
    darkModeButton?.click();

    expect(mockToggleDarkMode).toHaveBeenCalledTimes(1);
  });

  it('calls onMenuClick when menu button is clicked', () => {
    mockUsePathname.mockReturnValue('/dashboard');

    const { container } = render(
      <Header 
        user={mockUser}
        toggleDarkMode={mockToggleDarkMode}
        isDarkMode={false}
        onMenuClick={mockOnMenuClick}
      />
    );

    const menuButtons = container.querySelectorAll('button');
    const menuButton = Array.from(menuButtons).find(btn => 
      btn.querySelector('.material-symbols-outlined')?.textContent === 'menu'
    );
    
    expect(menuButton).toBeInTheDocument();
    menuButton?.click();

    expect(mockOnMenuClick).toHaveBeenCalledTimes(1);
  });

  it('renders default title when pathname is not in config', () => {
    mockUsePathname.mockReturnValue('/unknown-page');

    render(
      <Header 
        user={mockUser}
        toggleDarkMode={mockToggleDarkMode}
        isDarkMode={false}
        onMenuClick={mockOnMenuClick}
      />
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });
});
