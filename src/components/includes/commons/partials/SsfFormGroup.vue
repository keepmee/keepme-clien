<template>
  <div :class="`${row ? 'row ' : ''}${col}`">
    <div class="ssf-form-group" :class="`${select ? 'input-select ' : ''}${formGroupClass}`">

      <!--<select class="form-control" :class="`${error ? 'is-invalid' : '' }`" :id="name" :name="name" :required="required"
              v-if="select">
        <option value="" selected disabled>{{ required ? '(*)' : '' }} {{ title }}</option>
        <option v-if="options" v-for="option in options" :value="option[optionValue]"
                :selected="`${ !!(value && option[optionValue] === value)}`">
          {{ option[optionLabel] }}
        </option>
      </select>-->


      <input :type="type || 'text'" :id="name" :name="name" class="form-control" :required="required"
             :disabled="disabled" v-model="value" @input="updateValue($event.target.value)"
             @focusin="updateValue($event.target.value)" @focusout="updateValue($event.target.value)"
             :placeholder="`${placeholder ? label : ''}`"
             :autocomplete="`${autocomplete ? autocomplete === true ? name : autocomplete : 'off'}`" v-focus>
      <label :for="name" :class="{'input-active': helpers.isLabelActive(object, name)}" v-show="!placeholder">
        <i :class="icon" class="mr-1"></i>&nbsp;<span v-html="label"></span>&nbsp;{{ required ? ' (*)' : '' }}
      </label>
      <!--      {{ helpers.isLabelActive(data, name) ? 'true' : 'false' }}-->

      <!--<div class="invalid-feedback" v-if="error">
        {{ error }}
      </div>-->
    </div>
  </div>
</template>

<script>
    import {formatNumber} from "../../../../app/utils";

    export default {
        name: "SsfFormGroup",

        props: {
            select        : { required: false },
            type          : { type: String, required: false },
            name          : { type: String, required: true },
            label         : { type: String, required: false },
            placeholder   : { type: Boolean, required: false },
            required      : { type: Boolean, required: false },
            disabled      : { type: Boolean, required: false },
            object        : { type: Object || String, required: true },
            col           : { type: String, required: false },
            row           : { type: Boolean, required: false },
            icon          : { type: String, required: false },
            autocomplete  : { required: false },
            formGroupClass: { type: String, required: false },
            // value      : { required: true }
        },

        /*props: [
            'title',
            'name',
            'type',
            'required',
            'model',
            'value',
            'select',
            'options',
            'optionValue',
            'optionLabel',
            'mclass',
            'error',
            'disabled',
        ],*/

        data() {
            return {
                value: null
            }
        },

        directives: {
            focus: {
                // définition de la directive
                inserted(el, binding, vnode) {
                    if (vnode.context.helpers.isLabelActive(vnode.context.object, vnode.context.name))
                        el.focus()
                }
            }
        },

        watch: {
            object(value) {
                this.value = value[this.name]
            }
        },

        methods: {

            getClass() {
                return this.helpers.isLabelActive(this.object, this.name) ? 'input-active' : ''
            },

            updateValue() {

                if (this.value === null)
                    this.value = this.object[this.name] || null

                if (this.name === 'phone')
                    this.value = formatNumber(this.value)
                this.$emit('inputted', this.name, this.value)
                this.$forceUpdate()
                // Émettre la valeur du nombre à travers l'évènement input
                // this.$emit('input', value ? value.toUpperCase() : value)
            }
        }
    }
</script>

<style scoped>

</style>
