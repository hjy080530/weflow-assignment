declare module 'node:sqlite' {
  export class StatementSync {
    run(...anonymousParameters: unknown[]): {
      changes: number
      lastInsertRowid: number | bigint
    }

    all(...anonymousParameters: unknown[]): unknown[]
    get(...anonymousParameters: unknown[]): unknown
  }

  export class DatabaseSync {
    constructor(location: string)
    exec(sql: string): void
    prepare(sql: string): StatementSync
  }
}
