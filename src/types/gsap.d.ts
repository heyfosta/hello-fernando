import { Plugin } from 'gsap';

declare module 'gsap/all' {
  interface GSAPPlugins {
    TextPlugin: Plugin;
  }
}