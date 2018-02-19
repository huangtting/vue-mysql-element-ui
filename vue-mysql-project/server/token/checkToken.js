const jwt=require('jsonwebtoken');

module.exports=async (ctx,next)=>{
   
    // console.log(ctx);
    const authorization =ctx.get('Authorization');
    if(authorization === ""){
        ctx.status = 401;
        ctx.body = {
            message: 'token验证失败'
        }
    }
    const token =authorization.split(" ")[1];
    // console.log(token);
    let tokenContent;
    try{
        // console.log("验证Token中");
        tokenContent=await jwt.verify(token,'testtesttesttesthuangtting');
        console.log(tokenContent.user_id);

        ctx.state.user_id = tokenContent.user_id;
        ctx.state.role=tokenContent.role;
        await next();
    }
    catch(err)
    {
        console.log(err);
        console.log("验证失败checkToken");

        ctx.status = 401;
        ctx.body = {
            message: 'token验证失败'
        }
    }
    
}