import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index.js'

Vue.use(Router)

const SignIn=resolve=>{
  require.ensure(['../components/pages/SignIn'],()=>{
    resolve(require('../components/pages/SignIn'));
  })
};


const MyOppointmentTable=resolve=>{
  require.ensure(['../components/Student/MyOppointmentTable'],()=>{
    resolve(require('../components/Student/MyOppointmentTable'));
  })

};

const GymTable=resolve=>{
  require.ensure(['../components/common/GymTable'],()=>{
    resolve(require('../components/common/GymTable'));
  })
};

const ManagerNotice=resolve=>{
  require.ensure(['../components/Manager/ManagerNotice'],()=>{
    resolve(require('../components/Manager/ManagerNotice'));
  })
};
const StuNotice=resolve=>{
  require.ensure(['../components/Student/StuNotice'],()=>{
    resolve(require('../components/Student/StuNotice'));
  })
};
const StuInventory=resolve=>{
  require.ensure(['../components/Student/StuInventoryTable'],()=>{
    resolve(require('../components/Student/StuInventoryTable'));
  })
};
const Student=resolve=>{
  require.ensure(['../components/pages/Student'],()=>{
    resolve(require('../components/pages/Student'));
  })
};
const Manager=resolve=>{
  require.ensure(['../components/pages/Manager'],()=>{
    resolve(require('../components/pages/Manager'));
  })
};
const HelloWorld = resolve => {
  require.ensure(['../components/pages/HelloWorld.vue'], () => {
    resolve(require('../components/pages/HelloWorld.vue'));
  });
};

const Error404 = resolve => {
  require.ensure(['../components/pages/404.vue'], () => {
      resolve(require('../components/pages/404.vue'));
  }); 
};

const router= new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/signin',
      name:'signin',
      component:SignIn
    },
 
    {
      path: '/myOppointment',
      name: 'MyOppointmentTable',
      component: MyOppointmentTable,
      meta: {
        requiresAuth: true
      }
    },
    {
      path:'/student',
      name:'Student',
      component:Student,
      meta: {
        requiresAuth: true
      },
      children:[
        {
          path:'notice',
          name:'StuNotice',
          component:StuNotice
        },
        {
          path:'myoppointment',
          name:'MyOppointmentTable',
          component:MyOppointmentTable
        },
        {
          path:'order',
          name:'StuInventory',
          component:StuInventory
        }
      ]
    },
    {
      path:'/manager',
      name:'Manager',
      component:Manager,
      meta: {
        requiresAuth: true
      },
      children:[
        {
          path: 'notice',
          name: 'ManagerNotice',
          component: ManagerNotice,
          meta: {
            requiresAuth: true
          }
        },  
        {
          path:'gym',
          name:'GymTable',
          component:GymTable,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '/test',
      name: 'error',
      component: Error404,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to,from,next)=>{
  // console.log(to);
  // console.log(from);
  let token=store.state.token;
  
  if(to.meta.requiresAuth)
  {
    if(token){
      console.log("have token");
      next();
    }
    else{
      console.log("no token");
      next({
        path:'/signin',
        query:{redirect:to.fullPath}
      });
    }
  }
  else
  {
    next();
  }
  
});
export default router;


