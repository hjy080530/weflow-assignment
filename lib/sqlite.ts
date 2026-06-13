import 'server-only'

import { randomUUID } from 'node:crypto'
import { mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'

const DATABASE_PATH =
  process.env.SQLITE_DATABASE_PATH ?? join(process.cwd(), 'data', 'weflow.sqlite')

declare global {
  var __weflowDb: DatabaseSync | undefined
}

function createDatabase(): DatabaseSync {
  mkdirSync(dirname(DATABASE_PATH), { recursive: true })

  const db = new DatabaseSync(DATABASE_PATH)

  db.exec(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS reservations (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      service_type TEXT NOT NULL,
      business_type TEXT NOT NULL DEFAULT '',
      note TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT '대기' CHECK (status IN ('대기', '진행중', '완료'))
    );

    CREATE TABLE IF NOT EXISTS inquiries (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      service_type TEXT NOT NULL,
      business_type TEXT NOT NULL DEFAULT '',
      note TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT '대기' CHECK (status IN ('대기', '진행중', '완료'))
    );
  `)

  return db
}

export function getDatabase(): DatabaseSync {
  globalThis.__weflowDb ??= createDatabase()
  return globalThis.__weflowDb
}

export function createRecordId(): string {
  return randomUUID()
}

export function createTimestamp(): string {
  return new Date().toISOString()
}
