const jwt=require('jsonwebtoken');

module.exports =function(user_id){
    const token=jwt.sign({
        user_id:user_id
    },'testtesttesttesthuangtting',{
        expiresIn:10*60
    });

    return token;
}