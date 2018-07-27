


const handleProfileGet  = (req,res,db) => 
{

const {id} = req.params;
   
     

    db.select('*').from('users').where({id}).then(user => {
       if (user.length){
      res.json(user[0])
      }
      else{res.status(400).json('not found')} // user[0] because the response is an array of user objects
    }).catch(err => {
      res.json('error retrieving the user ')
    })
   
   }

   module.exports = {


    handleProfileGet
   }