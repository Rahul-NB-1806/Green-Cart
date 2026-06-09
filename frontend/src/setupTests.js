import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

global.IntersectionObserver = class {
  constructor(callback, options) { this.callback = callback; this.options = options; }
  observe() { this.callback([{ isIntersecting: true }]); }
  unobserve() {}
  disconnect() {}
};

global.scrollTo = () => {};
