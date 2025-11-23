import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';
import path from 'path';
import { optimizeImage, ResizeOptions } from './ImageOptimize';

dotenv.config();

// Inicialización del cliente S3
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

// Nombre del bucket desde el .env
const BUCKET = process.env.AWS_BUCKET || '';

/* ---------------------------------------------------------
   SUBIR ARCHIVO A UNA CARPETA
----------------------------------------------------------*/
export const uploadToS3 = async (
  file: any,
  folder: string,
  format?: 'png' | 'jpg' | 'webp',
  width?: ResizeOptions
): Promise<{ key: string; url: string }> => {
  if (!file) throw new Error('No se recibió el archivo');

  const { buffer: optimized, mimeType, extension } = await optimizeImage(file.buffer, format, width);

  //extensión del archivo segun la optimization
  const fileKey = `${folder}/${Date.now()}.${extension}`;

  //parametros para la subida
  const uploadParams = {
    Bucket: BUCKET,
    Key: fileKey,
    Body: optimized,
    ContentType: mimeType
  };

  await s3.send(new PutObjectCommand(uploadParams));

  return {
    key: fileKey,
    url: `https://${BUCKET}.s3.amazonaws.com/${fileKey}`
  };
};

/* ---------------------------------------------------------
   OBTENER URL FIRMADA PARA ARCHIVOS PRIVADOS
----------------------------------------------------------*/
export const getSignedFileUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: key
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1 hora
  return signedUrl;
};

/* ---------------------------------------------------------
   LISTAR ARCHIVOS DE UNA CARPETA
----------------------------------------------------------*/
export const listFiles = async (folder: string) => {
  const command = new ListObjectsV2Command({
    Bucket: BUCKET,
    Prefix: `${folder}/`
  });

  const data = await s3.send(command);
  return data.Contents || [];
};

/* ---------------------------------------------------------
   ELIMINAR UN ARCHIVO
----------------------------------------------------------*/
export const deleteFile = async (key: string) => {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET,
    Key: key
  });

  await s3.send(command);
  return { deleted: true, key };
};

/* ---------------------------------------------------------
   OBTENER URL PÚBLICA (solo para carpeta public/)
----------------------------------------------------------*/
export const getPublicUrl = (key: string) => {
  return `https://${BUCKET}.s3.amazonaws.com/${key}`;
};
