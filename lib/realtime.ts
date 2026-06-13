import 'server-only'

type Listener = () => void

declare global {
  var __weflowRealtimeListeners: Set<Listener> | undefined
}

function getListeners(): Set<Listener> {
  globalThis.__weflowRealtimeListeners ??= new Set<Listener>()
  return globalThis.__weflowRealtimeListeners
}

export function subscribeRealtime(listener: Listener): () => void {
  const listeners = getListeners()
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}

export function publishRealtimeUpdate(): void {
  for (const listener of getListeners()) {
    listener()
  }
}
