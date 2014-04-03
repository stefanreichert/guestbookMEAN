exports.newInstance =
    function(author, text){
        return {
            _id: null,
            author: author,
            date: new Date(),
            text: text
        }
    }