
export enum ModuleType {
  CAJA = 'CAJA',
  ASISTENCIA = 'ASISTENCIA',
  BANDEJAS = 'BANDEJAS',
  CONFIGURACION = 'CONFIGURACION',
  MANTENIMIENTO = 'MANTENIMIENTO'
}

export interface User {
  id: number;
  username: string;
  role: 'admin' | 'user';
  permissions: ModuleType[];
}

export interface SubMenu {
  id: string;
  label: string;
  icon: string;
}

export interface ModuleConfig {
  type: ModuleType;
  label: string;
  icon: string;
  subMenus: SubMenu[];
}
