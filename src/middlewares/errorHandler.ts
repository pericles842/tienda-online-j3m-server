// src/middlewares/errorHandler.ts
import { ErrorRequestHandler } from "express";
import {
  UniqueConstraintError,
  ValidationError,
  DatabaseError,
} from "sequelize";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof UniqueConstraintError) {
    const value = err.errors[0]?.value;
    res.status(400).json({
      message: err.errors[0].message,
      error: `El valor '${value}' ya está registrado, por favor ingresa otro.`,
    });

    return;
  }

  if (err instanceof ValidationError) {
    res.status(400).json({
      message: err.errors.map((e) => e.message).join(", "),
    });
    return;
  }

  if (err instanceof DatabaseError) {
    res.status(500).json({
      message: "Error en la base de datos.",
      error: err,
    });
    return;
  }

  res.status(500).json({
    message: "Error interno del servidor",
    error: err,
  });
};
