const jwt=require('jsonwebtoken');

module.exports =function(user_id,role){
    const token=jwt.sign({
        user_id:user_id,
        role:role
    },'testtesttesttesthuangtting',{
        expiresIn:10*60
    });

    return token;
}