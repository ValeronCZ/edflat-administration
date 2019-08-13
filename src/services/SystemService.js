import Vue from "vue";

export default {
    category() {
        return Vue.http.get("system/category").then(response => response.data);
    },
    kind() {
        return Vue.http.get("system/kind").then(response => response.data);
    },
    type() {
        return Vue.http.get("system/type").then(response => response.data);
    },
    servicePrices() {
        return Vue.http.get("system/service-prices").then(response => response.data);
    }
};