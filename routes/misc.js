module.exports = {
    getDatabaseMessages: function(err) {
        var errorMessage = '';
        for (var key in err.errors) {
            if (err.errors[key].message) errorMessage += err.errors[key].message + ", ";
        }
        return errorMessage;
    }
}