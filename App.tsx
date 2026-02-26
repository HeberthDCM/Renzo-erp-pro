
import React, { useState, useEffect } from 'react';
import { ModuleType, User } from './types';
import Login from './views/Login';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './views/Dashboard';
import MantenimientoUsuarios from './views/MantenimientoUsuarios';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [activeModule, setActiveModule] = useState<ModuleType>(ModuleType.CAJA);
  const [activeSubMenu, setActiveSubMenu] = useState<string>('apertura');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogin = (u: User) => {
    setUser(u);
    setIsAuthenticated(true);
    // Set default module based on permissions
    if (u.permissions.length > 0) {
      setActiveModule(u.permissions[0]);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'dark bg-black' : 'bg-gray-100'} transition-all`}>
        <Login onLogin={handleLogin} isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${isDarkMode ? 'dark bg-zinc-950 text-white' : 'bg-gray-50 text-black'} transition-all`}>
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        activeModule={activeModule}
        onModuleSelect={(mod) => {
          setActiveModule(mod);
          setActiveSubMenu(''); // Reset sub menu on module change
          if (window.innerWidth < 768) setIsSidebarOpen(false);
        }}
        userPermissions={user?.permissions || []}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Navbar 
          activeModule={activeModule}
          activeSubMenu={activeSubMenu}
          onSubMenuSelect={setActiveSubMenu}
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onLogout={handleLogout}
          username={user?.username || ''}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto animate-fadeIn">
            {activeModule === ModuleType.MANTENIMIENTO && activeSubMenu === 'usuarios' ? (
              <MantenimientoUsuarios />
            ) : (
              <Dashboard module={activeModule} subMenu={activeSubMenu} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
