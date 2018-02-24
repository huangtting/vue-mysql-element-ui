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
  require.ensure(['../components/Manager/GymTable'],()=>{
    resolve(require('../components/Manager/GymTable'));
  })
};
const ManagerOrder=resolve=>{
  require.ensure(['../components/Manager/ManagerOrder'],()=>{
    resolve(require('../components/Manager/ManagerOrder'));
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
const StuCenter = resolve => {
  require.ensure(['../components/student/StuCenter.vue'], () => {
    resolve(require('../components/student/StuCenter.vue'));
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
      path:'/student',
      name:'Student',
      component:Student,
      meta: {
        requiresAuth: true,
        role:'student'
      },
      children:[
        {
          path:'notice',
          name:'StuNotice',
          component:StuNotice,
          meta: {
            requiresAuth: true,
            role:'student'
          }
        },
        {
          path:'myoppointment',
          name:'MyOppointmentTable',
          component:MyOppointmentTable,
          meta: {
            requiresAuth: true,
            role:'student'
          }
        },
        {
          path:'order',
          name:'StuInventory',
          component:StuInventory,
          meta: {
            requiresAuth: true,
            role:'student'
          }
        },
        {
          path:'center',
          name:'StuCenter',
          component:StuCenter,
          meta: {
            requiresAuth: true,
            role:'student'
          }
        }
      ]
    },
    {
      path:'/manager',
      name:'Manager',
      component:Manager,
      meta: {
        requiresAuth: true,
        role:'manager'
      },
      children:[
        {
          path: 'notice',
          name: 'ManagerNotice',
          component: ManagerNotice,
          meta: {
            requiresAuth: true,
            role:'manager'
          }
        },  
        {
          path:'gym',
          name:'GymTable',
          component:GymTable,
          meta: {
            requiresAuth: true,
            role:'manager'
          }
        },
        {
          path:'order',
          name:'Order',
          component:ManagerOrder,
          meta: {
            requiresAuth: true,
            role:'manager'
          }
          
        }
     
      ]
    },
    {
      path: '/test',
      name: 'error',
      component: Error404,
    }
  ]
})

router.beforeEach((to,from,next)=>{
  let token=store.state.token;
  
  if(to.meta.requiresAuth)
  {
    if(store.state.role===to.meta.role && token){
      next();
    }
    else{
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


