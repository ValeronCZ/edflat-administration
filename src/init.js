import Vue from "vue";
import VueResource from 'vue-resource';

Vue.use(VueResource);

Vue.http.options.root = '/api';

Vue.http.headers.common['X-Requested-With'] = 'XMLHttpRequest';
let token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    Vue.http.headers.common['X-CSRF-TOKEN'] = token.content;
}

export default Vue;