import Vue from "vue";

export default {
    getUsers() {
        return Vue.http.get("admin/user").then(response => response.data);
    },
    getUsersPaginated(pagination) {
        return Vue.http.get("admin/user", {params: pagination}).then(response => response.data);
    },
    getUser(id) {
        return Vue.http.get("admin/user{/id}", {params: {id: id}}).then(response => response.data);
    },
    getClientUser(id) {
        return Vue.http.get("client/user{/id}", {params: {id: id}}).then(response => response.data);
    },
    updateUser(user) {
        return Vue.http.put("admin/user{/id}", user, {params: {id: user.id}});
    },
    updateClientUser(user) {
        return Vue.http.put("client/profile{/id}", user, {params: {id: user.id}});
    }
};