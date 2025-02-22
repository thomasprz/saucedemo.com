import winston from 'winston';

// Configuration du format des logs
const options = winston.format.combine(
  winston.format.label({ label: '[E2E]' }),
  winston.format.timestamp({ format: 'YY-MM-DD HH:mm:ss' }),
  winston.format.printf((info) => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`),
  winston.format.colorize({ all: true }),
);

// Création du logger
export const logger = winston.createLogger({
  level: 'info', // Capture tous les logs de niveau info et supérieur (info, warn, error).
  format: winston.format.json(), // Les logs sont formatés en JSON.
  transports: [
    // Transport pour la console
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), options),
    }),
    // Transport pour les fichiers d'erreur
    new winston.transports.File({
      filename: 'src/output/logs/error.log',
      maxFiles: 5,
      maxsize: 5 * 1024, // 5 Mo
      level: 'error', // Seuls les logs de niveau error sont enregistrés ici.
      format: winston.format.combine(winston.format.colorize(), options),
    }),
    // Transport pour les logs combinés
    new winston.transports.File({
      filename: 'src/output/logs/combined.log',
      maxFiles: 5,
      maxsize: 5 * 1024, // 5 Mo
      format: winston.format.combine(options),
    }),
  ],
});