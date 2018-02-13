const jwt=require('jsonwebtoken');

module.exports=async (ctx,next)=>{
    
    const authorization =ctx.get('Authorization');
    if(authorization === ""){
        ctx.throw(401,'Token 验证失败');
    }
    const token =authorization.split(" ")[1];
    // console.log(token);
    let tokenContent;
    try{
        // console.log("验证Token中");
        tokenContent=await jwt.verify(token,'testtesttesttesthuangtting');
        console.log(tokenContent);
        await next();
    }
    catch(err)
    {
        console.log("验证失败checkToken");
        // ctx.response.body={
        //     status:401,
        //     msg:'token验证失败'
        // }
        // ctx.throw(401,'Token 验证失败');
        ctx.status = 401;
        ctx.body = {
            message: 'token'
        }
    }
    
}