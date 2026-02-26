
import React from 'react';
import { ModuleType } from '../types';

interface DashboardProps {
  module: ModuleType;
  subMenu: string;
}

const Dashboard: React.FC<DashboardProps> = ({ module, subMenu }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Panel de {module}</h2>
          <p className="text-gray-500 dark:text-zinc-400 italic">Sub-área: {subMenu || 'General'}</p>
        </div>
        <div className="flex space-x-2">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">Nuevo Registro</button>
            <button className="bg-white dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 px-4 py-2 rounded-lg font-medium border border-gray-200 dark:border-zinc-700 transition-colors">Exportar PDF</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Transacciones Hoy', value: '1,240', color: 'text-blue-500', trend: '+12%' },
          { label: 'Ingresos Totales', value: 'S/ 12,450.00', color: 'text-green-500', trend: '+5.4%' },
          { label: 'Alertas Sistema', value: '3', color: 'text-red-500', trend: '-1' },
          { label: 'Usuarios Activos', value: '18', color: 'text-purple-500', trend: 'Online' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800">
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{stat.label}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="mt-2 text-xs text-gray-400">{stat.trend} respecto a ayer</div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-zinc-800 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 dark:text-white">Historial Reciente</h3>
            <button className="text-red-600 text-sm hover:underline">Ver todo</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-zinc-800/50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase">ID</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase">Descripción</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase">Fecha</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase">Monto</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 dark:text-zinc-400 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="hover:bg-gray-50 dark:hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-gray-400">#RX-908{item}</td>
                  <td className="px-6 py-4 font-medium">Operación {module} - {subMenu}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">24 May 2024, 14:30</td>
                  <td className="px-6 py-4 font-bold text-red-600">S/ {(item * 125.5).toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-xs font-bold">Completado</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
