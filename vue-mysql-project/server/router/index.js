// import { request } from 'http';

const mysql = require('../controller/mysql.js');
const Router = require('koa-router');

const childRouter = new Router();

//checkToken作为中间件存在

const checkToken = require('../token/checkToken.js');
const createToken = require('../token/createToken.js');

childRouter.post('/signin', async(ctx,next)=>{
    
    let sno=ctx.request.body.login_id;
    let password=ctx.request.body.login_password;
    let role=ctx.request.body.role;
    let token;
    let users;
    if(role=='student')
    {
        await mysql.selectAllStudent().then(result=>{
            users=JSON.parse(JSON.stringify(result));
        })
    }
    else
    {
        await mysql.selectAllManager().then(result=>{
            users=JSON.parse(JSON.stringify(result));
        })
    }
    
    
    let isok=0;
    for(let i=0;i<users.length;i++)
    {
        
        if(users[i].no==sno&&users[i].password==password)
        {
            
            isok=1;
            token=createToken(sno,role);
            break;
        }
        
    }
    if(isok===1)
    {
        ctx.response.body={
            isok:1,
            role:role,
            token:token
        }
    }
    else
    {
        ctx.response.body={
            isok:0
        }
    }
    

});
childRouter.post('/signup', async(ctx,next)=>{
    
    let no=ctx.request.body.no;
    let password=ctx.request.body.password;
    let role=ctx.request.body.identity;
   
    
    await mysql.signUp(no,password,role).then(result=>{
        ctx.response.body='OK';
    })
 
    
    
  
});

childRouter.get('/oppointment',checkToken,async(ctx,next)=>{
    let imformation;
  
    let login_id=ctx.request.query.login_id || ctx.state.user_id;
    let currentPage=ctx.request.query.currentPage;
    let page_size=ctx.request.query.page_size;
    await mysql.selectAppointment(login_id,currentPage,page_size).then(result=>{
        imformation=JSON.parse(JSON.stringify(result));
    })
    ctx.response.body=imformation;
})


childRouter.get('/stuinventory',checkToken,async(ctx,next)=>{
    let imformation;
    await mysql.selectStuInventory().then(result=>{
      
        imformation=JSON.parse(JSON.stringify(result));
    })
   
    ctx.response.body=imformation;
})
childRouter.get('/east_badminton',checkToken,async(ctx,next)=>{
    let imformation;
    await mysql.selectEastBadminton().then(result=>{
      
        imformation=JSON.parse(JSON.stringify(result));
    })
   
    ctx.response.body=imformation;
})
childRouter.get('/east_tennis',checkToken,async(ctx,next)=>{
    let imformation;
    await mysql.selectEastTennis().then(result=>{
      
        imformation=JSON.parse(JSON.stringify(result));
    })
   
    ctx.response.body=imformation;
})
childRouter.get('/south_badminton',checkToken,async(ctx,next)=>{
    let imformation;
    await mysql.selectSouthBadminton().then(result=>{
      
        imformation=JSON.parse(JSON.stringify(result));
    })
   
    ctx.response.body=imformation;
})
childRouter.get('/south_tennis',checkToken,async(ctx,next)=>{
    let imformation;
    await mysql.selectSouthTennis().then(result=>{
      
        imformation=JSON.parse(JSON.stringify(result));
    })
   
    ctx.response.body=imformation;
})

childRouter.get('/gym',checkToken,async(ctx,next)=>{
  
    let imformation;
    await mysql.selectGym().then(result=>{
      
        imformation=JSON.parse(JSON.stringify(result));
    })
   
    ctx.response.body=imformation;
})

childRouter.get('/managerinventory',checkToken,async(ctx,next)=>{
    let imformation;
    if(ctx.state.role!=='manager') 
    {
        ctx.status = 401;
        ctx.body = {
            message: '权限不足'
        }
    }
    await mysql.selectManagerInventory().then(result=>{
      
        imformation=JSON.parse(JSON.stringify(result));
    })
   
    ctx.response.body=imformation;
})

childRouter.get('/balance',checkToken,async(ctx,next)=>{
    let imformation;
    // ctx.state.user_id是checkToken中设置的
    let login_id=ctx.request.query.login_id  || ctx.state.user_id ;
    await mysql.selectBlance(login_id).then(result=>{
      
        imformation=JSON.parse(JSON.stringify(result));
    })
   
    ctx.response.body=imformation;
})

childRouter.get('/insertorder',checkToken,async(ctx,next)=>{
    let imformation;
    let site_id=ctx.request.query.site_id;
    let date=ctx.request.query.date;
    let time=ctx.request.query.time;
    let sno=ctx.request.query.sno;
    let state=ctx.request.query.state;
    let price=ctx.request.query.price;
    await mysql.insertOrder(site_id,date,time,sno,state,price).then(result=>{
      
        if(result[0]===1)
            imformation='OK';
        else imformation='Fail'
    })
    
    ctx.response.body=imformation;
})

childRouter.get('/changepassword',checkToken,async(ctx,next)=>{
  
    let imformation;
    let sno=ctx.request.query.sno;
    let oldpassword=ctx.request.query.oldpassword;
    let newpassword=ctx.request.query.newpassword;
    let password;
    await mysql.checkPassword(sno).then(result=>{
        
        password=JSON.parse(JSON.stringify(result))[0].password;
    });
    if(password!==oldpassword)
    {
        
        ctx.response.body="Fail";
    }
    else{
        await mysql.changePassword(sno,newpassword).then(res=>{
      
        ctx.response.body="OK";
        })
    }


})

childRouter.get('/closegym',checkToken,async(ctx,next)=>{
    if(ctx.state.role!=='manager') 
    {
        ctx.status = 401;
        ctx.body = {
            message: '权限不足'
        }
    }
    let imformation;
    let gym_id=ctx.request.query.gym_id;
    await mysql.closeGym(gym_id).then(result=>{
        imformation='OK';
    })

    
    ctx.response.body=imformation;
})

childRouter.get('/opengym',checkToken,async(ctx,next)=>{
    if(ctx.state.role!=='manager') 
    {
        ctx.status = 401;
        ctx.body = {
            message: '权限不足'
        }
    }
    let imformation;
   
    let gym_id=ctx.request.query.gym_id;
    await mysql.openGym(gym_id).then(result=>{
        imformation='OK';
    })

    ctx.response.body=imformation;
})
childRouter.get('/getnotice',checkToken,async(ctx,next)=>{
    
    
    let imformation;
   
    await mysql.getNotice().then(result=>{
      
        imformation=JSON.parse(JSON.stringify(result));
    })
   
    ctx.response.body=imformation;
    
})
childRouter.get('/deletenotice',checkToken,async(ctx,next)=>{
    if(ctx.state.role!=='manager') 
    {
        ctx.status = 401;
        ctx.body = {
            message: '权限不足'
        }
    }
    let imformation;
    
    let id=ctx.request.query.id;
    
    await mysql.deleteNotice(id).then(result=>{
      
        imformation='OK';
    })
   
    ctx.response.body=imformation;
    
})
childRouter.get('/insertnotice',checkToken,async(ctx,next)=>{
    if(ctx.state.role!=='manager') 
    {
        ctx.status = 401;
        ctx.body = {
            message: '权限不足'
        }
    }
    let imformation;
    let title=ctx.request.query.title;
    let content=ctx.request.query.content;
    
    await mysql.insertNotice(title,content).then(result=>{
      
        imformation={
            
        };
    })
    
    ctx.response.body=imformation;
    
})
childRouter.get('/', async(ctx,next)=>{
    ctx.response.body="hello";
});
childRouter.get('/deposit',checkToken,async(ctx,next)=>{
  
    let imformation;
    let sno=ctx.request.query.sno;
    let money=ctx.request.query.money;
    

    await mysql.deposit(sno,money).then(result=>{
        imformation='OK';
    })
    
    ctx.response.body=imformation;
    
})

module.exports = childRouter;