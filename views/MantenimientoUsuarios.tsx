
import React, { useState } from 'react';
import { ModuleType, User } from '../types';

interface UserData extends User {
  password?: string;
  status: 'active' | 'inactive';
}

const MantenimientoUsuarios: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([
    { id: 1, username: 'admin', role: 'admin', permissions: [ModuleType.CAJA, ModuleType.ASISTENCIA, ModuleType.BANDEJAS, ModuleType.CONFIGURACION, ModuleType.MANTENIMIENTO], status: 'active' },
    { id: 2, username: 'renzo', role: 'user', permissions: [ModuleType.CAJA, ModuleType.BANDEJAS], status: 'active' },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<UserData> | null>(null);

  const handleEdit = (user: UserData) => {
    setCurrentUser(user);
    setIsEditing(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Está seguro de eliminar este usuario de DB_Renzo?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser?.id) {
      setUsers(users.map(u => u.id === currentUser.id ? (currentUser as UserData) : u));
    } else {
      setUsers([...users, { ...currentUser, id: Date.now(), status: 'active' } as UserData]);
    }
    setIsEditing(false);
    setCurrentUser(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mantenimiento de Usuarios</h2>
          <p className="text-gray-500 dark:text-zinc-400">Administración de accesos a la base de datos DB_Renzo</p>
        </div>
        <button 
          onClick={() => { setCurrentUser({}); setIsEditing(true); }}
          className="bg-black dark:bg-red-600 text-white px-6 py-2 rounded-xl font-bold shadow-lg transition-transform hover:scale-105"
        >
          + Agregar Usuario
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-zinc-800/50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Usuario</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Rol</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Accesos</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 font-bold uppercase">
                        {u.username.charAt(0)}
                      </div>
                      <span className="font-bold text-gray-900 dark:text-white">{u.username}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${u.role === 'admin' ? 'bg-black text-white' : 'bg-gray-200 text-gray-700'}`}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {u.permissions.map(p => (
                        <span key={p} className="bg-gray-100 dark:bg-zinc-800 text-[10px] px-2 py-0.5 rounded text-gray-500 dark:text-zinc-400 border border-gray-200 dark:border-zinc-700">{p}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center text-sm text-green-500">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      Activo
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                        <button onClick={() => handleEdit(u)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg">✏️</button>
                        <button onClick={() => handleDelete(u.id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-3xl p-8 shadow-2xl animate-scaleUp border border-zinc-800">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
              {currentUser?.id ? 'Editar Usuario' : 'Nuevo Usuario'}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-zinc-400 mb-1">Nombre de Usuario</label>
                <input 
                  type="text" 
                  required
                  value={currentUser?.username || ''}
                  onChange={(e) => setCurrentUser({...currentUser, username: e.target.value})}
                  className="w-full p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border-none dark:text-white ring-1 ring-gray-200 dark:ring-zinc-700 focus:ring-2 focus:ring-red-600" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-zinc-400 mb-1">Rol</label>
                  <select 
                    value={currentUser?.role || 'user'}
                    onChange={(e) => setCurrentUser({...currentUser, role: e.target.value as any})}
                    className="w-full p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border-none dark:text-white ring-1 ring-gray-200 dark:ring-zinc-700"
                  >
                    <option value="user">Usuario</option>
                    <option value="admin">Administrador</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-zinc-400 mb-1">Contraseña</label>
                  <input type="password" placeholder="••••••••" className="w-full p-3 rounded-xl bg-gray-50 dark:bg-zinc-800 border-none dark:text-white ring-1 ring-gray-200 dark:ring-zinc-700" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-zinc-400 mb-2">Permisos de Módulos</label>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 bg-gray-50 dark:bg-zinc-800 rounded-xl">
                  {Object.values(ModuleType).map(mod => (
                    <label key={mod} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-zinc-300">
                      <input 
                        type="checkbox" 
                        className="rounded text-red-600 focus:ring-red-600"
                        checked={currentUser?.permissions?.includes(mod) || false}
                        onChange={(e) => {
                          const perms = currentUser?.permissions || [];
                          if(e.target.checked) setCurrentUser({...currentUser, permissions: [...perms, mod]});
                          else setCurrentUser({...currentUser, permissions: perms.filter(p => p !== mod)});
                        }}
                      />
                      <span>{mod}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex space-x-3 mt-8">
                <button type="button" onClick={() => setIsEditing(false)} className="flex-1 py-3 bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors">Cancelar</button>
                <button type="submit" className="flex-1 py-3 bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-900/20 hover:bg-red-700 transition-colors">Guardar Cambios</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MantenimientoUsuarios;
