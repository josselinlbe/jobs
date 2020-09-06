export default {
    isLeftDrawerOpen: state => {
        return state.leftDrawer
    },

    isRightDrawerOpen: state => {
        return state.rightDrawer
    },

    loaderState: state => {
        return state.loaderActive
    },

    getData: state => {
        return state.data
    },

    appBarTabs: state => {
        return state.appBarTabs
    },

    sessionLogs: state => {
        return state.sessionLogs
    },
}
