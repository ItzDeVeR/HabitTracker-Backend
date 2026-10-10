const Database = require("better-sqlite3");

const db = new Database("habbit.db");

db.pragma('journal_mode = WAL');

db.exec(`PRAGMA foreign_keys = ON;

-- 1. Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Таблица привычек
CREATE TABLE IF NOT EXISTS habits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  frequency TEXT CHECK(frequency IN ('DAILY', 'WEEKLY')) DEFAULT 'DAILY',
  target_count INTEGER DEFAULT 1,
  color TEXT DEFAULT '#4F46E5',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- 3. Таблица отметок о выполнении (Logs)
CREATE TABLE IF NOT EXISTS habit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  habit_id INTEGER NOT NULL,
  log_date DATE NOT NULL,
  completed INTEGER DEFAULT 1 CHECK(completed IN (0, 1)), -- SQLite не имеет типа BOOLEAN, хранит 0 или 1
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (habit_id) REFERENCES habits (id) ON DELETE CASCADE,
  UNIQUE(habit_id, log_date) -- Защита от дублей: нельзя сделать 2 отметки на одну дату для одной привычки
);

-- Индексы для ускорения выборок
CREATE INDEX IF NOT EXISTS idx_habits_user_id ON habits(user_id);
CREATE INDEX IF NOT EXISTS idx_logs_habit_id_date ON habit_logs(habit_id, log_date);`);

module.exports = db;