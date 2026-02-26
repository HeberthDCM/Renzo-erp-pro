
import React, { useState } from 'react';
import { User, ModuleType } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, isDarkMode, toggleDarkMode }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock authentication
    if (username === 'admin' && password === 'admin') {
      onLogin({
        id: 1,
        username: 'admin',
        role: 'admin',
        permissions: [ModuleType.CAJA, ModuleType.ASISTENCIA, ModuleType.BANDEJAS, ModuleType.CONFIGURACION, ModuleType.MANTENIMIENTO]
      });
    } else if (username === 'renzo' && password === '123') {
        onLogin({
          id: 2,
          username: 'renzo',
          role: 'user',
          permissions: [ModuleType.CAJA, ModuleType.BANDEJAS]
        });
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-zinc-800">
        <div className="relative h-48 bg-black flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="relative z-10 w-20 h-20 bg-red-600 rounded-2xl flex items-center justify-center text-white text-4xl font-black shadow-lg">R</div>
            <h2 className="relative z-10 mt-4 text-white text-xl font-bold tracking-widest uppercase">Renzo ERP</h2>
        </div>
        
        <div className="p-8 md:p-12">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Iniciar Sesión</h3>
            <button onClick={toggleDarkMode} className="text-xl">
               {isDarkMode ? '🌞' : '🌙'}
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-zinc-400 mb-2">Usuario</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-red-600 transition-all dark:text-white"
                placeholder="Ingresa tu usuario"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 dark:text-zinc-400 mb-2">Contraseña</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-red-600 transition-all dark:text-white"
                placeholder="••••••••"
                required
              />
            </div>
            
            {error && <p className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-center">{error}</p>}
            
            <button 
              type="submit"
              className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-900/20 transform hover:-translate-y-1 transition-all"
            >
              ENTRAR AL SISTEMA
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-gray-100 dark:border-zinc-800 flex justify-between text-xs text-gray-400">
            <span>v1.0.4 Platinum Edition</span>
            <span>DB_Renzo connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
