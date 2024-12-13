const Models = require('./models'); 

const Controller = {

    // post added verb to the database 
    addVerb(req, res, next) {
        // destructure body properties of the request obj 
        const { verb, meaning } = req.body; 

        // check if any of the required properties are missing 
        if(!verb || !meaning) {
            // if they're missing, send a detailed error message to the global error handler 
            return next({
                log: 'Malformed request received', 
                status: 400, 
                message: { err: 'Request is missing an input field'}, 
            }); 
        }

        Models.Verb.create({ verb, meaning })
          .then((verb) => {
            res.locals.newVerb = verb; 
            return next(); 
          })
          .catch((err) => {
            console.log('This is the err object from the addVerb controller:', err); 
            return next({
                log: `Error adding verb to the database: ${err}`, 
                status: 500, 
                message: { err: 'Failed to add verb to the database' }, 
            }); 
          }); 
    }, 

    sendVerbs(req, res, next) {

        Models.Verb.find({}, { _id: 0, __v: 0 })
          .then((verbs) => {
            // console.log('This is the retrieved verbs object:', verbs); 
            res.locals.sendVerbs = verbs; 
            return next(); 
          })
          .catch((err) => {
            // console.log('This is the err object from the sendVerbs controller:', err); 
            return next({
                log: `Error retrieving verbs from the database: ${err}`, 
                status: 500, 
                message: { err: 'Failed to retrieve verbs from the database' }, 
            });
          });
    }, 

    deleteVerb(req, res, next) {

      const { verb } = req.params; 

      Models.Verb.deleteOne({ verb })
      .then((res) => {

        if(res.acknowledged === true && res.deletedCount > 0) {
          return next(); 
        } else {
          return next({
            log: 'Unable to find verb in the database',
            status: 404,
            message: { err: 'Failed to find verb in the database' },
          });
        }
      })
      .catch((err) => {
        return next({
          log: `Error deleting verb from the database: ${err}`,
          status: 500,
          message: { err: 'Failed to delete verb from the database' },
        });
      });
    }, 

    addVocab(req, res, next) {

      const { vocab, lexCat, meaning } = req.body; 
      console.log(req.body); 
      // check if any of the required properties are missing 
      if(!vocab || !lexCat || !meaning) {
        // if they're missing, send a detailed error message to the global error handler 
        return next({
          log: 'Malformed request received', 
          status: 400, 
          message: { err: 'Request is missing an input field'}, 
        }); 
      }

      Models.Vocab.create({ vocab, lexCat, meaning })
        .then((vocab) => {
          res.locals.newVocab = vocab; 
          return next(); 
        })
        .catch((err) => {
          return next({
            log: `Error adding vocab to the database: ${err}`, 
            status: 500, 
            message: { err: 'Failed to add vocab to the database' }, 
          }); 
        }); 
    }, 

    sendVocabs(req, res, next) {

      Models.Vocab.find({}, { _id: 0, __v: 0 })
      .then((vocabs) => {
        // console.log('This is the retrieved vocabs object:', vocabs); 
        res.locals.sendVocabs = vocabs; 
        return next(); 
      })
      .catch((err) => {
        console.log('This is the err object from the sendVocabs controller:', err); 
        return next({
          log: `Error retrieving vocab from the database: ${err}`, 
          status: 500, 
          message: { err: 'Failed to retrieve vocab from the database' }, 
        })
      })
    }
}

module.exports = Controller; 
