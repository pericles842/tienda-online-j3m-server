import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).addVirtualFileSystem(pdfFonts);



import moment from 'moment';
import { DataReport } from '../app/interfaces/report';

(<any>pdfMake).addVirtualFileSystem(pdfFonts);

export const generatePDF = async (templateName: string, data: DataReport) => {
  // Definimos el contenido del PDF
  const docDefinition = {
    content: [
      { text: data.title, style: 'header' },
      {
        table: {
          widths: ['*', '*', '*'],
          body: [
            ['Nombre', 'Edad', 'Ciudad'],
            ['Luis', '21', 'Madrid'],
            ['Ana', '30', 'Barcelona'],
            ['Pedro', '25', 'Sevilla']
          ]
        },
        layout: 'lightHorizontalLines'
      }
    ],
    styles: {
      header: { fontSize: 22, bold: true, marginBottom: 10 }
    },
    defaultStyle: { fontSize: 12 }
  };

  // Generamos el PDF como Buffer
  return new Promise<Buffer>((resolve) => {
    pdfMake.createPdf(docDefinition).getBuffer((buffer: Buffer) => {
      resolve(buffer);
    });
  });
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
