const mockedEstate = {
    "current_page": 1,
    "data": [
        { "id": 8, "city": "city", "district": "district", "street": "street", "region": "region", "municipality": "municip", "house": "house", "country": null, "zip": "zip", "flat": "flat", "square": 50, "price": 50000, "currency": "EUR", "ad_placed": null, "source_id": null, "title": "big flat", "short_description": null, "description": "long description", "main_photo": null, "is_top": 0, "link": null, "source": null, "active": 0, "show_from": null, "show_to": null, "category_id": 1, "type_id": 3, "kind_id": 1, "estate_source_id": null, "user_id": 2, "created_at": "2019-06-18 20:09:19", "updated_at": "2019-06-18 20:09:19", "category": { "id": 1, "type": "Predaj", "type_en": "Sale", "created_at": "2019-06-18 11:44:54", "updated_at": "2019-06-18 11:44:54" }, "type": { "id": 3, "estate_type": "2 izbový byt", "estate_type_en": "2 rooms", "kind_id": 1, "created_at": "2019-06-18 11:44:54", "updated_at": "2019-06-18 11:44:54" }, "estate_source": null }, { "id": 9, "city": "city", "district": "district", "street": "street", "region": "region", "municipality": "micip", "house": "house", "country": null, "zip": "zip", "flat": "flat", "square": 100, "price": 100000, "currency": "EUR", "ad_placed": null, "source_id": null, "title": "my villa", "short_description": null, "description": "long opa", "main_photo": null, "is_top": 0, "link": null, "source": null, "active": 0, "show_from": null, "show_to": null, "category_id": 2, "type_id": 11, "kind_id": 2, "estate_source_id": null, "user_id": 2, "created_at": "2019-06-18 20:10:15", "updated_at": "2019-06-18 20:10:15", "category": { "id": 2, "type": "Prenájom", "type_en": "Rent", "created_at": "2019-06-18 11:44:54", "updated_at": "2019-06-18 11:44:54" }, "type": { "id": 11, "estate_type": "Rodinná vila", "estate_type_en": "Villa", "kind_id": 2, "created_at": "2019-06-18 11:44:54", "updated_at": "2019-06-18 11:44:54" }, "estate_source": null }
    ],
    "first_page_url": "http://homestead.test/api/client/real-estate?page=1",
    "from": 1,
    "last_page": 1,
    "last_page_url": "http://homestead.test/api/client/real-estate?page=1",
    "next_page_url": null, "path": "http://homestead.test/api/client/real-estate",
    "per_page": 10,
    "prev_page_url": null,
    "to": 4,
    "total": 4
};

export default {
    getRealEstate() {
        return Promise.resolve(mockedEstate);
    }
};