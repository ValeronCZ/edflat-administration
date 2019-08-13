import Vue from '@/init';

const uriBase = 'client/account';

let customActions = {
    history: {method: 'GET', url: `${uriBase}/history`}
};

export const AccountResource = Vue.resource(uriBase, {}, customActions);