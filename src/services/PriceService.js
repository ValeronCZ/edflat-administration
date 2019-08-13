import Vue from '@/init';

const uriBase = 'admin/service-price{/id}';

export const ServicePriceResource = Vue.resource(uriBase, {}, {});