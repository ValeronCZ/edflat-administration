import Vue from "vue";

export default {
    sendRealEstate(estate) {
        return Vue.http.post("client/real-estate", estate);
    },
    getRealEstate() {
        return Vue.http.get("client/real-estate").then(response => response.data);
    },
    getUsersRealEstate(id) {
        return Vue.http.get("admin/real-estate{/id}", {params: {id: id}}).then(response => response.data);
    },
    getUsersFilteredRealEstate(id, filter) {
        return Vue.http.get("admin/real-estate{/id}", {params: {id: id, ...filter}}).then(response => response.data);
    },
    getFilteredRealEstate(filter) {
        return Vue.http.get("client/real-estate", {params: filter}).then(response => response.data);
    },
    deleteRealEstate(id) {
        return Vue.http.delete("client/real-estate{/id}", {params: {id: id}});
    },
    updateRealEstate(estate) {
        return Vue.http.put("client/real-estate{/id}", estate, {params: {id: estate.id}});
    },
    prolongRealEstate(prolong) {
        return Vue.http.post("client/real-estate/prolong{/id}", prolong, {params: {id: prolong.id}});
    },
    getRealEstateById(id) {
        return Vue.http.get("client/real-estate{/id}", {params: {id: id}}).then(response => {
            let advert = response.data;
            advert.photos = advert.photos.map(photo => photo.url);
            advert.price = advert.price / 100;
            delete advert.active;
            delete advert.ad_placed;
            delete advert.created_at;
            delete advert.currency;
            delete advert.estate_source_id;
            delete advert.files;
            delete advert.link;
            delete advert.is_top;
            delete advert.show_from;
            delete advert.show_to;
            delete advert.source;
            delete advert.source_id;
            delete advert.updated_at;
            delete advert.user_id;
            return advert;
        });
    }
};