<template>
  <div class="ssf-vue-navbar" :class="{'open': full, 'ssf-fixed-top': fixed}"
       :style="{height: `${height ? height+'px' : 'auto'}`}">

    <!--<div class="ssf-vue-navbar-toggle cursor-pointer" @click="toggleFull()">
      <i class="fal fa-times fa-1x5" v-if="full"></i>
      <i :class="`${toggleIcon ? toggleIcon : 'fal fa-bars fa-1x5'}`" v-else></i>
    </div>-->
    <div class="ssf-vue-navbar-brand ssf-w-15">
      <slot name="brand" @click="$emit('click')"></slot>
    </div>

    <div class="ssf-vue-navbar-list ssf-w-85">
      <ul class="pl-0 mb-0" :class="{'ml-auto': right}">
        <li class="ssf-vue-navbar-item" v-for="(link, idx) in links" :class="{'active-item': isActive(link)}">
          <div @click.prevent="action(link)" class="ssf-vue-navbar-link" v-if="!link.children">
            <i :class="`${link.icon} ${showTitle ? 'mr-1' : ''}`" class="ssf-vue-navbar-icon"></i>
            <span v-if="showTitle">{{ link.title }}</span>
          </div>
          <div class="ssf-vue-navbar-link ssf-vue-navbar-dropdown"
               :class="{'active-item': dropdowns[idx]}" @click="toggleDropdown(idx)"
               v-else>
            <i :class="`${link.icon} ${showTitle ? 'mr-1' : ''}`" class="ssf-vue-navbar-icon"></i>
            <span>
              <span v-if="showTitle">{{ link.title }}</span>
              <i class="fal ssf-vue-dropdown-icon"
                 :class="{'fa-angle-up': dropdowns[idx], 'fa-angle-down': !dropdowns[idx]}"></i>
            </span>

            <div class="ssf-vue-dropdown-menu" :class="{'open': dropdowns[idx]}"
                 :style="`height: ${getHeight(link.children.length)}px`" @click.stop>
              <ul class="pl-0 mb-0">
                <li v-for="child in link.children" @click="toggleDropdown(idx)">
                  <router-link :to="{'name': child.name}" class="ssf-vue-navbar-link ssf-vue-dropdown-item"
                               ref="vueDropdownItem" :class="{'active-item': isActive(child)}">
                    <div class="ssf-w-15"><i :class="`${child.icon}`"></i></div>
                    <div class="ssf-w-85">{{ child.title }}</div>
                  </router-link>
                </li>
              </ul>
            </div>

          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>

    require('./static/css/font-awesome.css')
    require('./static/css/fonts.css')
    require('./static/css/main.css')

    export default {
        name: "VueSidebar",

        props: {
            links     : { type: Array, required: true },
            height    : { type: Number, required: false },
            right     : { type: Boolean, required: false },
            toggleIcon: { type: String, required: false },
            fixed     : { type: Boolean, required: false },
            showTitle : { type: Boolean, required: false, default: true },
        },

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
                return nb * (($('.ssf-vue-dropdown-item')[0] || {}).height || 50);
            }
        }
    }
</script>
