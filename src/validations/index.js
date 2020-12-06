import Vue from 'vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import './rules'

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);