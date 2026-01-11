/**
 * Microsoft Clarity API Type Declarations
 */

interface Window {
  clarity?: {
    (method: 'event', eventName: string): void
    (method: 'set', key: string, value: string): void
    (method: 'identify', userId: string, sessionId?: string, pageId?: string, friendlyName?: string): void
    (method: 'upgrade', reason: string): void
    q?: Array<unknown>
  }
}

