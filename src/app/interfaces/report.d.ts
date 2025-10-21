export interface ColumnsReport {
  label: string;
  key: string;
  width: number;
  dataType: 'string' | 'date' | 'number' | 'boolean'|'array';
  columns?: ColumnsReport[]
}


export interface DataReport {
    title: string;
    columns: ColumnsReport[];
    data: any[];
    
}