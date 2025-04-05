export const STATUS_CONFIG = {
  UNREACHABLE: {
    text: "Недоступен",
    className: "unreachable",
  },
  SHUTDOWN: {
    text: "Выключен",
    className: "shutdown",
  },
  UP: {
    text: "Работает",
    className: "up",
  },
  WARNING: {
    text: "Нестабильно работает",
    className: "warning",
  },
  CRITICAL: {
    text: "Критическая ошибка",
    className: "critical",
  },
  DOWN: {
    text: "Не работает",
    className: "down",
  },
};

export const STATUS_PRIORITY = {
  'UP': 0,
  'WARNING': 1,
  'CRITICAL': 2,
  'DOWN': 3,
  'SHUTDOWN': 4,
  'UNREACHABLE': 5
};