// Rascunho da reserva em andamento, guardado em sessionStorage enquanto o
// usuário passa pelas telas Calendário → Revisão → Confirmação. Some
// automaticamente ao fechar a aba, o que é o comportamento certo pra um
// fluxo que não deve "sobreviver" entre sessões.

const DRAFT_KEY = 'reservalab_draft'

export interface PartialDraft {
  spaceId: string
  spaceName: string
  date?: string
  time?: string
}

export function getDraft(): PartialDraft | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY)
    return raw ? (JSON.parse(raw) as PartialDraft) : null
  } catch {
    return null
  }
}

export function saveDraft(draft: PartialDraft) {
  sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft))
}

export function clearDraft() {
  sessionStorage.removeItem(DRAFT_KEY)
}
