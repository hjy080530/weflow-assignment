import { subscribeRealtime } from '@/lib/realtime'

export async function GET() {
  let cleanup = () => undefined

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder()
      const send = () => {
        controller.enqueue(encoder.encode(`data: refresh\n\n`))
      }

      send()
      const unsubscribe = subscribeRealtime(send)
      const heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode(': keep-alive\n\n'))
      }, 15000)

      cleanup = () => {
        clearInterval(heartbeat)
        unsubscribe()
      }
    },
    cancel() {
      cleanup()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  })
}
