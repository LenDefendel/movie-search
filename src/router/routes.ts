import type { RouteRecordRaw } from 'vue-router';
import { RouterNames } from 'src/router/routerNames';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: RouterNames.MAIN_PAGE,
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: '/movie/:imdbID',
        name: RouterNames.MOVIE_PAGE,
        component: () => import('pages/MoviePage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
