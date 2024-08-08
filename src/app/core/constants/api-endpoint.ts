export const API_ENDPOINTS = {
  login: '/auth/login',
  register: {
    organizer: '/auth/register/organizer',
    secondHandDealer: '/auth/register/secondhanddealer',
  },
  fleaMarket: {
    fleaMarketGetAll: '/fleamarkets',
    fleaMarketGetAllByOrganizer: '/fleamarkets/organizer',
    fleaMarketCreate: '/fleamarkets/create',
    fleaMarketUpdate: '/fleamarkets/update',
  },
  zipCity: {
    zipCity: '/zipcity',
    zipCityAll: '/zipcity/all',
  },
};
