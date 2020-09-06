export default {
    setLeftDrawer(state, payload) {
        state.leftDrawer = payload
    },

    showSnackbar(state, payload) {
        state.snackbar.text = payload.text
        state.snackbar.multiline = (payload.text.length > 50) ? true : false

        if (payload.multiline) {
            state.snackbar.multiline = payload.multiline
        }

        if (payload.color) {
            state.snackbar.color = payload.color
        } else {
            state.snackbar.color = ''
        }

        if (payload.timeout) {
            state.snackbar.timeout = payload.timeout
        }

        state.snackbar.visible = true
    },

    addDataArray(state, arr) {
        state.data = arr;
    },

    setGenericStateBooleanFalse(state, payload) {
        state[payload] = false
    },

    loadLocalSettings(state) {
        const s = window.localStorage.getItem('grtLocalSettings');
        if (s) {
            const j = JSON.parse(s);
            state.localSettings = j;
        }
    },

    appBarTabs(state, payload) {
        state.appBarTabs = payload;
    },

    addSessionLog(state, doc) {
        state.sessionLogs.push(doc)
    },
}
