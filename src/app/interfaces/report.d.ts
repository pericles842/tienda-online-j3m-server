export interface ColumnsReport {
  label: string;
  key: string;
  width: number | '*' | 'auto';
  dataType: 'string' | 'date' | 'number' | 'boolean';
  columns?: ColumnsReport[];
}

export interface DataReport {
  title: string;
  columns: ColumnsReport[];
  data: any[];
  modulesMap?: any;
}

/**
 *Data usara para generar el pdf
 *
 * @export
 * @interface PdfMakeCell
 */
export interface PdfMakeCell {
  text: string;
  fillColor?: string;
  margin?: number[];
  bold?: boolean;
}
