import { render, screen } from '@testing-library/react';
import { TableUserList } from './index';

describe('TableUserList', () => {
  const mockUsers = [
    {
      id: '1',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      avatar: 'https://example.com/avatar1.jpg',
    },
    {
      id: '2',
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane@example.com',
      avatar: 'https://example.com/avatar2.jpg',
    },
  ];

  it('renders without crashing', () => {
    render(<TableUserList users={mockUsers} />);
    expect(screen.getByRole('table')).toBeTruthy();
  });

  it('renders correct table headers', () => {
    render(<TableUserList users={mockUsers} />);

    expect(screen.getByText('ID')).toBeTruthy();
    expect(screen.getByText('User')).toBeTruthy();
    expect(screen.getByText('Email')).toBeTruthy();
  });

  it('displays correct number of users', () => {
    render(<TableUserList users={mockUsers} />);
    const rows = screen.getAllByRole('row');
    // Add 1 to account for header row
    expect(rows.length).toBe(mockUsers.length + 1);
  });

  it('displays user information correctly', () => {
    render(<TableUserList users={mockUsers} />);

    mockUsers.forEach(user => {
      expect(screen.getByText(user.id)).toBeTruthy();
      expect(screen.getByText(`${user.first_name} ${user.last_name}`)).toBeTruthy();
    });
  });

  it('renders user avatars', () => {
    render(<TableUserList users={mockUsers} />);

    const avatars = screen.getAllByRole('img');
    expect(avatars.length).toBe(mockUsers.length);

    avatars.forEach((avatar, index) => {
      expect(avatar.getAttribute('src')).toBe(mockUsers[index].avatar);
    });
  });

  it('renders empty table when no users provided', () => {
    render(<TableUserList />);
    const tbody = screen.getByRole('rowgroup');
    expect(tbody.children).toHaveLength(0);
  });

  it('renders TextEmailMask component for each email', () => {
    render(<TableUserList users={mockUsers} />);
    mockUsers.forEach(user => {
      expect(screen.getByText(user.email)).toBeTruthy();
    });
  });
});
