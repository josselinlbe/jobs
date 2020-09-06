export default {
    infoBridge: function (context, obj) {
        obj.created = new Date().toISOString();

        if (obj.color && !obj.silent) {
            context.commit("showSnackbar", obj);
        }

        if (obj.color && !obj.level) {
            const translation = {
                primary: 'info',
                info: 'info',
                secondary: 'info',
                success: 'success',
                error: 'error',
                warning: 'warn',
            };
            obj.level = translation[obj.color];
        }

        if (!obj.level) {
            obj.level = 'info';
        }

        if (obj.level === 'error') {
            console.warn('Job Info Bridge reports an error: ', JSON.stringify(obj));
        }

        context.commit('addSessionLog', obj)
    }
}
