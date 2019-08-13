import Vue from "vue";

export default {
    getProfile() {
        return Vue.http.get("client/profile").then(response => response.data);
    }
};