export interface PrimeNgNode {
  key: string; // id único (puede ser string)
  label: string; // texto que mostrará el nodo
  data?: any; // cualquier payload que quieras guardar
  parent?: PrimeNgNode | null; // referencia al padre (opcional)
  children?: PrimeNgNode[]; // hijos
  // campos opcionales de PrimeNG que puedes usar:
  leaf?: boolean;
  expanded?: boolean;
  selectable?: boolean;
  [prop: string]: any;
}
