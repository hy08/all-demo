import Vue from 'vue';
import { Route, NavigationGuardNext } from 'vue-router';
declare module 'vue/types/vue' {
  // Augment component instance type
  interface Vue {
    a: string;
    beforeRouteEnter?(to: Route, from: Route, next: NavigationGuardNext<Vue>): void;

    beforeRouteLeave?(to: Route, from: Route, next: NavigationGuardNext<Vue>): void;

    beforeRouteUpdate?(to: Route, from: Route, next: NavigationGuardNext<Vue>): void;
  }
}
