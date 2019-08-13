import Vue from '@/init';

const uriBase = 'admin/parser';
const uriSource = `${uriBase}/source{/id}`;

let customActions = {
    statistics: {method: 'GET', url: `${uriBase}/statistics`}
};

export const ParserResource = Vue.resource(uriSource, {}, customActions);