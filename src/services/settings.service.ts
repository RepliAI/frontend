import { apiFetch } from "@/lib/api-client"
import { Preferences } from "@/types"

export const settingsService = {
    updatePrefs(prefs: Preferences): Promise<Preferences> {
        return apiFetch('/api/preferences/update', {
            method: 'PATCH',
            body: JSON.stringify(prefs)
        })
    },
    getGmailEmailStatus(){
        return apiFetch('/api/gmail/status', {
            method: 'GET',
        })
    }
}