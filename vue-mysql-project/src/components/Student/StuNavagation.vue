<template>
  <div>
      <header>
        <nav>
            <h1 class="logo">Logo</h1>
            <ul>
                <li><router-link to="/student/notice">通知中心</router-link></li>
                <li><router-link to="/student/order">我要预约</router-link></li>
                <li><router-link to="/student/myoppointment">我的订单</router-link></li>
                <li><router-link to="/student/center">个人中心</router-link></li>
            </ul>
        </nav>
        </header>
        
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
 *{
            margin:0;
            padding:0;
        }
        header {
            background: #423f42;
            width: 100%;
            height: 50px;
            box-shadow: 0 5px 5px rgba(0,0,0,0.2);
            border-radius: 5px;
        }
        nav{
            display: flex;
            align-items:center;
            justify-content: space-between;
            height: 100%;
        }
        ul {
            display: flex;
        }

        li {
            list-style: none;
            padding-left: 20px;
            padding-right: 20px;
            border-right: 1px solid #2e2d2e;
        }

        a {
            color: #fff;
            text-decoration: none;
            font-family: arial, sans-serif;
            padding: 15px;
            transition: all 0.5s ease;
            border-radius: 2px;
        }

        a:hover, a:focus {
            background: #6e6a6e;
            text-shadow: 0 0 1px #fff;
        }
        .logo{
            color:#fff;
            padding-left:20px;
        }
        
</style>

