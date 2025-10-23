import ejs from 'ejs';
import path from 'path';
// @ts-ignore
import pdf from 'html-pdf-node';
import moment from 'moment';
import { DataReport } from '../app/interfaces/report';

/**
 * GENERA UN PDF
 * @param templateName
 * @param data
 * @returns
 */
export const generatePDF = async (templateName: string, data: DataReport) => {
  const filePath = path.join(__dirname, '..', 'views', `${templateName}.ejs`);
  const html = await ejs.renderFile(filePath, data);

  const options = {
    format: 'A4',
    margin: { top: '20mm', bottom: '20mm' },
    printBackground: true
  };

  const file = { content: html };
  const pdfBuffer = await pdf.generatePdf(file, options);

  return pdfBuffer;
};

/**
 *  Setea las cabeceras en los headers de los reportes
 * @param title
 * @param res
 */
export const setHeadersForPdf = async (title: string, res: any) => {
  const dateStr = moment().format('MM-DD-YYYY');

  // Crear filename
  const filename = title.toLowerCase().split(' ').join('_') + '_' + dateStr + '.pdf';

  //attachment para que se descargue
  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `inline; filename=${filename}.pdf`
  });
};
