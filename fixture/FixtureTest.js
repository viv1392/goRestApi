const { test: base} = require('@playwright/test');
const { ClientApi } = require('../client/clientApi');

const test = base.extend({
  userApi: async ({ request }, use) => {
    use(new ClientApi(request));
  }
});

const SLA={Get:200,Post:201,Put:200,Delete:204,responeTime:3000};

module.exports={test,SLA}