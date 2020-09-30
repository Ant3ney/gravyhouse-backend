var utilities = {
    getRandomIndexFromArray: (arr) => {
        var ret = (Math.round(Math.random() * arr.length) - 1);
        while(ret < 0){
            ret = (Math.round(Math.random() * arr.length) - 1);
        }
        return ret;
    }
}

module.exports = utilities;