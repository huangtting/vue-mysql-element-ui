<template>
  <div>
    <div class="tabs">
            <ul>
              <li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
                <a href="#" @click="selectTab(tab)">{{ tab.name }}</a>
              </li>
            </ul>
          
      </div>
      <div class="tabs-details">
          <slot></slot>
      </div>
</div>


</template>
<script>
export default {
  
  data() {
    return { tabs: [] };
  },
  
  created() {
    this.tabs = this.$children;
  },
  
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name == selectedTab.name);
      });
    }
  }
  
}

</script>

<style scoped>
div{
  width:100%;
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
            color: #000;
            text-decoration: none;
            font-family: arial, sans-serif;
            padding: 15px;
            transition: all 0.5s ease;
            border-radius: 2px;
        }

        a:hover, a:focus {
            background: #fff;
           
        }
</style>
