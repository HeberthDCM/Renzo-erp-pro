
import { ModuleType, ModuleConfig } from './types';

export const MODULES_CONFIG: ModuleConfig[] = [
  {
    type: ModuleType.CAJA,
    label: 'Caja',
    icon: '💰',
    subMenus: [
      { id: 'apertura', label: 'Apertura de Caja', icon: '🔓' },
      { id: 'movimientos', label: 'Movimientos Diarios', icon: '📝' },
      { id: 'cierre', label: 'Cierre de Caja', icon: '🔒' },
      { id: 'reportes-caja', label: 'Reportes de Ventas', icon: '📊' }
    ]
  },
  {
    type: ModuleType.ASISTENCIA,
    label: 'Control Asistencia',
    icon: '👤',
    subMenus: [
      { id: 'marcado', label: 'Registro de Marcado', icon: '🕒' },
      { id: 'horarios', label: 'Gestión de Horarios', icon: '📅' },
      { id: 'permisos', label: 'Solicitud Permisos', icon: '📄' }
    ]
  },
  {
    type: ModuleType.BANDEJAS,
    label: 'Control Bandejas',
    icon: '📥',
    subMenus: [
      { id: 'stock', label: 'Stock de Bandejas', icon: '📦' },
      { id: 'entregas', label: 'Entregas Realizadas', icon: '🚚' },
      { id: 'devoluciones', label: 'Devoluciones', icon: '🔄' }
    ]
  },
  {
    type: ModuleType.CONFIGURACION,
    label: 'Configuración',
    icon: '⚙️',
    subMenus: [
      { id: 'perfil', label: 'Mi Perfil', icon: '👤' },
      { id: 'apariencia', label: 'Apariencia System', icon: '🎨' },
      { id: 'notificaciones', label: 'Alertas y Avisos', icon: '🔔' }
    ]
  },
  {
    type: ModuleType.MANTENIMIENTO,
    label: 'Mantenimiento DB',
    icon: '🛠️',
    subMenus: [
      { id: 'usuarios', label: 'Gestión de Usuarios', icon: '👥' },
      { id: 'roles', label: 'Roles y Accesos', icon: '🛡️' },
      { id: 'backup', label: 'Respaldos DB_Renzo', icon: '💾' }
    ]
  }
];
