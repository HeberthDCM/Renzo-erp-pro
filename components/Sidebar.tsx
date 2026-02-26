
import React from 'react';
import { ModuleType } from '../types';
import { MODULES_CONFIG } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  activeModule: ModuleType;
  onModuleSelect: (mod: ModuleType) => void;
  userPermissions: ModuleType[];
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  activeModule, 
  onModuleSelect, 
  userPermissions 
}) => {
  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 transition-transform transform md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="h-20 flex items-center justify-center border-b border-zinc-800 px-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-bold text-white">R</div>
          <span className="text-xl font-bold text-white tracking-wider">DB_RENZO</span>
        </div>
      </div>

      <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-5rem)]">
        <div className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4 px-2">Apps Principales</div>
        {MODULES_CONFIG.filter(m => userPermissions.includes(m.type)).map((module) => (
          <button
            key={module.type}
            onClick={() => onModuleSelect(module.type)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              activeModule === module.type 
                ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <span className="text-xl">{module.icon}</span>
            <span className="font-medium">{module.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
