import Vue from "vue";

export default {
    image(image) {
        return Vue.http.post("client/upload/image", image)
            .then(response => response.data);
    }
};