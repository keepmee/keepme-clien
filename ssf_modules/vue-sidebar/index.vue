<template>
  <div class="vue-sidebar" :class="{'open': full}">

    <div class="vue-sidebar-toggle cursor-pointer" @click="toggleFull()">
      <i class="fal fa-times fa-1x5" v-if="full"></i>
      <i :class="`${toggleIcon ? toggleIcon : 'fal fa-bars fa-1x5'}`" v-else></i>
    </div>

    <div class="vue-sidebar-list">
      <div class="vue-sidebar-item" v-for="(link, idx) in links" :class="{'active-item': isActive(link)}">
        <!--<router-link :to="{'name': link.name, 'params': link.params}" class="vue-sidebar-link" v-if="!link.children">
          <i :class="`${link.icon} ${full ? 'mr-2' : ''}`" class="vue-sidebar-icon"></i>
          <span v-if="fullTitle">{{ link.title }}</span>
        </router-link>-->
        <a href="#" @click.prevent="action(link)" class="vue-sidebar-link" v-if="!link.children">
          <i :class="`${link.icon} ${full ? 'mr-2' : ''}`" class="vue-sidebar-icon"></i>
          <span v-if="fullTitle">{{ link.title }}</span>
        </a>
        <a href="#" class="vue-sidebar-link vue-sidebar-dropdown"
           :class="{'active-item': dropdowns[idx]}" @click="toggleDropdown(idx)"
           v-else>
          <i :class="`${link.icon} ${full ? 'mr-2' : ''}`" class="vue-sidebar-icon"></i>

          <span v-if="fullTitle">
            {{ link.title }}
            <i class="fal float-right vue-dropdown-icon"
               :class="{'fa-angle-up': dropdowns[idx], 'fa-angle-down': !dropdowns[idx]}"></i>
          </span>

          <div class="vue-dropdown-menu" :class="{'open': dropdowns[idx]}"
               :style="`height: ${getHeight(link.children.length)}px`" @click.stop>
            <ul class="pl-0">
              <li v-for="child in link.children">
                <router-link :to="{'name': child.name}" class="vue-sidebar-link vue-dropdown-item">
                  <div class="w-15"><i :class="`${child.icon}`"></i></div>
                  <div class="w-85" v-if="fullTitle">{{ child.title }}</div>
                </router-link>
              </li>
            </ul>
          </div>

        </a>
      </div>
    </div>

  </div>
</template>

<script>

    require('./static/css/font-awesome.css')
    require('./static/css/fonts.css')
    require('./static/css/main.css')

    export default {
        name: "VueSidebar",

        props: ["links", "toggleIcon"],

        data() {
            return {
                full     : false,
                fullTitle: false,
                dropdowns: {}
            }
        },

        methods: {

            action(link) {
                return link.action
                    ? this.$emit('custom-action', link.action)
                    : this.$router.push({ 'name': link.name, 'params': link.params })
            },

            isActive(link) {
                return link.routes
                    ? link.routes.includes((this.$route.name ? this.$route.name.toLowerCase() : ''))
                    : (link.name ? link.name.toLowerCase() : '') === (this.$route.name ? this.$route.name.toLowerCase() : '')
            },

            toggleFull() {
                this.full = !this.full
                if (this.full)
                    setTimeout(() => {
                        this.fullTitle = true
                    }, 400)
                else this.fullTitle = false

                this.$emit('collapse', this.full)
            },

            toggleDropdown(id) {
                this.dropdowns[id] = !this.dropdowns[id]
                this.dropdowns = JSON.parse(JSON.stringify(this.dropdowns))
            },

            getHeight(nb) {
                return nb * 60;
            }
        }
    }
</script>

<style scoped>

</style>
