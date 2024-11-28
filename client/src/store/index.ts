import { create } from "zustand"
import {persist, createJSONStorage} from 'zustand/middleware'

interface storeProps {
  selectedLeads: any[]
  isOpen: boolean
  outreachBlockModalOpen: boolean
  onOpen: () => void
  onClose: () => void
  addLead: () => void
  updateLead: (leads: any[]) => void
  removeLead: (id: string) => void
  sourceBlockId: string | null
  outreachBlockId: string | null
}

const initialState = {
  selectedLeads: [],
  isOpen: false,
  sourceBlockId: null,
  outreachBlockId: null,
  outreachBlockModalOpen: false,
  outreachMainModalOpen: false,
  outreachConditionModalOpen: false,
}

const useStore = create(
  persist(
    (set, get) => ({
      ...initialState,
      onOutreachBlockModalOpen: () => set({ outreachBlockModalOpen: true }),
      onOutreachMainModalOpen: (data:any) => set({ outreachMainModalOpen: data || true }),
      onOutreachConditionModalOpen: (data:any) => set({ outreachConditionModalOpen: data || true }),
      onOutreachBlockModalClose: () => set({ outreachBlockModalOpen: false }),
      onOutreachMainModalClose: () => set({ outreachMainModalOpen: false }),
      onOutreachConditionModalClose: () => set({ outreachConditionModalOpen: false }),
      onOpen: () => set({ isOpen: true }),
      onClose: () => set({ isOpen: false }),
      updateLead: (leads: any[]) => set({ selectedLeads: leads }),
      addLead: (lead:any) => set({ selectedLeads: [...(get() as storeProps ).selectedLeads, lead] }),
      removeLead: (id: string) => set({ selectedLeads: (get() as storeProps ).selectedLeads?.filter((lead) => lead.id !== id) }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default useStore