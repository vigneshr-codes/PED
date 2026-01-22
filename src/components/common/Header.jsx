import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LayoutDashboard, PlusCircle, User } from 'lucide-react';
import { setCurrentUser } from '../../redux/slices/usersSlice';

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { items: users, currentUser } = useSelector((state) => state.users);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/projects/new', label: 'New Project', icon: PlusCircle }
  ];

  const handleUserChange = (e) => {
    const user = users.find((u) => u.id === e.target.value);
    dispatch(setCurrentUser(user));
  };

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Nav */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center group">
              <img
                src="/AT&T.svg"
                alt="AT&T Logo"
                className="h-8 w-8"
              />
              <span className="ml-3 text-lg font-semibold text-gray-900">
                AT&T Project Estimates
              </span>
            </Link>

            <nav className="flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mr-2 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User Selector */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-50 rounded-xl px-3 py-2">
              <User className="w-4 h-4 text-gray-400" />
              <select
                value={currentUser?.id || ''}
                onChange={handleUserChange}
                className="text-sm bg-transparent border-none focus:outline-none focus:ring-0 text-gray-700 font-medium cursor-pointer"
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.role})
                  </option>
                ))}
              </select>
            </div>

            {currentUser && (
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-sm font-medium text-white">
                  {currentUser.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
