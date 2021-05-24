export default {
    filters: {
        capitalize: function(value) {
            if (value) {
                return value.toUpperCase();
            }
            return null;
        },
        abbreviation: function(value) {
            if (value) {
                const nameArr = value.split(' ');
                if (nameArr.length > 1) {
                    return nameArr[0][0].toUpperCase() + nameArr[1][0].toUpperCase();
                } else {
                    return value[0].toUpperCase();
                }
            }
            return null;
        },
    },
};
