const mongoose = require('mongoose'); 

const verbSchema = mongoose.Schema({
    verb: { type: String, required: true, unique: true}, 
    meaning: { type: String, required: true, unique: true }, 
}); 


const vocabSchema = mongoose.Schema({
    vocab: { type: String, required: true, unique: true}, 
    lexCat: { type: String, required: true, unique: false}, 
    meaning: { type: String, required: true, unique: true }, 
}); 

const grammarSchema = mongoose.Schema({
    rule: { type: String, required: true, unique: true}, 
    example: { type: String, required: true, unique: true}, 
}); 


// module.exports = mongoose.model('Verb', verbSchema); 
// module.exports = mongoose.model('Vocab', vocabSchema); 
// module.exports = mongoose.model('Grammar Rules', grammarSchema); 

module.exports = {
    Verb: mongoose.model('Verb', verbSchema), 
    Vocab: mongoose.model('Vocab', vocabSchema), 
    Grammar: mongoose.model('Grammar Rules', grammarSchema)
}; 