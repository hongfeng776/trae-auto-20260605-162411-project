import { defineStore } from 'pinia'
import type { Alert } from '@/types'
import { alerts as mockAlerts } from '@/mock'

export const useAlertStore = defineStore('alert', {
  state: () => ({
    alerts: [] as Alert[],
    loading: false,
  }),

  getters: {
    activeAlerts(state): Alert[] {
      return state.alerts.filter(a => !a.dismissed)
    },

    activeAlertsCount(state): number {
      return state.alerts.filter(a => !a.dismissed).length
    },

    getAlertsByApplicationId(state) {
      return (applicationId: string): Alert[] => {
        return state.alerts.filter(a => a.applicationId === applicationId)
      }
    },
  },

  actions: {
    fetchAlerts() {
      this.loading = true
      try {
        this.alerts = mockAlerts.map(a => ({ ...a }))
      } finally {
        this.loading = false
      }
    },

    dismissAlert(alertId: string) {
      const alert = this.alerts.find(a => a.id === alertId)
      if (alert) {
        alert.dismissed = true
      }
    },

    dismissAllAlerts() {
      this.alerts.forEach(a => {
        a.dismissed = true
      })
    },

    addAlert(alert: Alert) {
      this.alerts.unshift({ ...alert })
    },
  },
})
