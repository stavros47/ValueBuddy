const database = require('../database');

function validUser(user){
    const validPassword = typeof user.password == 'string' &&
                            user.password.trim() != '' &&
                            user.password.trim().length >= 6;
  
    const validEmail = typeof user.email == 'string' &&
                        user.email.trim() != '';

    return validEmail && validPassword;
}

function validate(user){ 
    const validPassword = typeof user.password == 'string' &&
                            user.password.trim() != '' &&
                            user.password.trim().length >= 6;   

    const validEmail = typeof user.email == 'string' &&
    user.email.trim() != '';

    const result = {
        allValid:(validPassword && validEmail),       
        password: validPassword,
        email: validEmail
    }
    
    return result;
}

function getByEmail(email){
     return database('users').where('email',email).first();    
}

function getCustomerByUserID(user_id){
    return database('customer').where('user_id', user.user_id).select('customer_id').first();
}

function getBusinessByUserID(user_id){
    return database('business').where('user_id', user.user_id).select('business_id').first()
}

function getRole(email){
    return database('users').where('email',email).first()
    .then(user =>{
        return database('customer').where('user_id', user.user_id).select('customer_id')
        .then(customerID =>{
            return database('business').where('user_id', user.user_id).select('business_id')
            .then(businessID =>{  
                if(customerID[0]){
                    let {customer_id} = customerID[0];
                    return {...user, role:'customer', role_id:customer_id}
                }else if(businessID[0]){
                    let {business_id} = businessID[0];
                    return {...user, role:'business', role_id:business_id}
                }          
                    
            }).catch(e => console.log(e));
        }).catch(e => console.log(e));
    }).catch(e => console.log(e));    
           
}

module.exports = {
    validate,
    validUser,  
    getByEmail,
    getRole
}