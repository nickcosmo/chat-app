export default {
    filters: {
        capitalize: function(value) {
            if (value) value.toUpperCase();
        },
        abbreviation: function(value) {
            const nameArr = value.split(' ');
            if (nameArr.length > 1) {
                return nameArr[0][0].toUpperCase() + nameArr[1][0].toUpperCase();
            } else {
                return value[0].toUpperCase();
            }
        },
    },
};
