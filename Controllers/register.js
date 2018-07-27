
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

const handleRegister = (req,res,db,bcrypt)=> {
   
    
  const {name,email,password} = req.body;

   if (!name || !email || !password) {

   	return res.status(400).json('incorrect form submission')
   }
  const salt = bcrypt.genSaltSync(saltRounds);
   const hash = bcrypt.hashSync(password,salt);



  // when we want to add data to multiple tables in a database we use transactions (in our case 'user' and 'login').
  // Transactions make sure
  // if data cant be entered into one table, it stop the data entry to other table as well

  db.transaction(trx=> {

   trx.insert({

    hash: hash,
    email: email

   }).into('login')
     .returning('email')
     .then(loginEmail => {
       
       return trx('users')
       .returning('*')
        .insert({

       email: loginEmail[0],
       name:name,
       joined: new Date()

        })
          .then(user => {

            res.json(user[0]);
          })
        })
     
     .then(trx.commit)
     .catch(trx.rollback)
  

  }).catch(err => res.status(400).json('unable to register'))
}


module.exports = {


	handleRegister: handleRegister
};


   