const mysql=require('mysql');

let pool =mysql.createPool(
    {
        host:'localhost',
        user:'root',
        password:'1234',
        database:'gym'
        // host:'172.18.1.194',
        // user:'root',
        // password:'123',
        // database:'gym_schema'
    }
);

let query=function(sql,values)
{
    return new Promise((resolve,reject)=>{
        pool.getConnection(function(error,connection)
        {
            if(error)
            {
                console.log("连接数据库异常");
                resolve(error);
            }   
            else{
                connection.query(sql,values,(err,rows)=>
                {
                  if(err) reject(err);
                  else resolve(rows);  
                })
                connection.release();
            }
        })  
    });
}
let selectAllStudent=function()
{
    let sql='select * from student ';
    return query(sql);
}
let openGym=function(gym_id)
{
    let sql="update gym set state='avail' where gym_id='"+gym_id+"';";
    console.log(sql);
   
    return query(sql);
}


let selectAppointment=function(stuId)
{
    let sql="select date,campus,time,kind,site_no,appointment.price,appointment.state from appointment,gym,sites where appointment.site_id=sites.site_id && sites.gym_id=gym.gym_id && sno= "+stuId;
    return query(sql);
}

let selectStuInventory=function()
{
    let sql="SELECT * FROM stuinventory;"
    return query(sql);
}
let selectGym=function()
{
    let sql="select * from gym; ";
    return query(sql);
}
let selectManagerInventory=function()
{
    let sql="select * from avail_sites_num;"
    return query(sql);
}
let selectBlance=function(stuId)
{
    let sql="select balance from student where sno= "+stuId;
    return query(sql);
}
let insertOrder=function(site_id,date,time,sno,state,price)
{
    let checkdate=date.substring(0,9)+(parseInt(date[9])+1);
    console.log(checkdate);
    let sql="select add_appointment("+site_id+",'"+checkdate+"','"+time+"','"+sno+"')";
    // 返回1 ，预约成功.返回0,余额不足
    return query(sql);
}
let changePassword=function(sno,password)
{
    
    let sql="update student set password='"+password+"' where sno='"+sno+"';";
    console.log(sql);
    // 返回1 ，预约成功.返回0,余额不足
    return query(sql);
}


let closeGym=function(gym_id)
{
    
    let sql="update gym set state='non-avail' where gym_id='"+gym_id+"';";
    console.log(sql);
    // 返回1 ，预约成功.返回0,余额不足
    return query(sql);
}

let getNotice=function(gym_id)
{
    
    let sql="SELECT * FROM notice;";
   
    return query(sql);
}
let deleteNotice=function(id)
{
    
    let sql="delete from notice where id="+id;
   console.log(sql);
    return query(sql);
}
let insertNotice=function(title,content)
{
    let sql="insert into notice(title,content,date) values('"+title+"','"+content+"',curdate());"
    
    return query(sql);
}
module.exports={
    selectAllStudent,
    selectAppointment,
    selectStuInventory,
    selectGym,
    selectManagerInventory,
    selectBlance,
    insertOrder,
    changePassword,
    closeGym,
    openGym,
    getNotice,
    deleteNotice,
    insertNotice
}