
import React from 'react';
import { ModuleType } from '../types';
import { MODULES_CONFIG } from '../constants';

interface NavbarProps {
  activeModule: ModuleType;
  activeSubMenu: string;
  onSubMenuSelect: (id: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onLogout: () => void;
  username: string;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  activeModule, 
  activeSubMenu, 
  onSubMenuSelect, 
  isDarkMode, 
  toggleDarkMode, 
  onLogout, 
  username,
  toggleSidebar
}) => {
  const currentModule = MODULES_CONFIG.find(m => m.type === activeModule);

  return (
    <header className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 sticky top-0 z-40 transition-colors">
      <div className="px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div>
            <h1 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
              <span className="text-red-600 mr-2">{currentModule?.icon}</span>
              {currentModule?.label}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3 md:space-x-6">
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 hover:text-red-600 transition-colors"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
          <div className="h-8 w-px bg-gray-200 dark:bg-zinc-800 hidden md:block"></div>
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-semibold text-gray-800 dark:text-white capitalize">{username}</div>
              <div className="text-xs text-gray-500 dark:text-zinc-500">Administrador</div>
            </div>
            <button 
              onClick={onLogout}
              className="p-2 rounded-lg text-gray-500 dark:text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Dynamic Menu */}
      <div className="px-4 md:px-8 bg-gray-50 dark:bg-zinc-950 flex space-x-2 md:space-x-8 overflow-x-auto scrollbar-hide">
        {currentModule?.subMenus.map((sub) => (
          <button
            key={sub.id}
            onClick={() => onSubMenuSelect(sub.id)}
            className={`whitespace-nowrap px-4 py-3 text-sm font-medium border-b-2 transition-all ${
              activeSubMenu === sub.id 
                ? 'border-red-600 text-red-600' 
                : 'border-transparent text-gray-500 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300'
            }`}
          >
            <span className="mr-2 opacity-70">{sub.icon}</span>
            {sub.label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
