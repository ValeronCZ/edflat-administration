export function numberValidator(length) {
    return (rule, value, callback) => {
        if(value.toString().length > length) {
            callback(new Error(this.$t('validation.max', {number: length})));
        } else {
            callback();
        }
    };
}