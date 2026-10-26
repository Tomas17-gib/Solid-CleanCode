import { Notifier } from "./Notifier.js";

export class MemoryNotifier extends Notifier {
  #messages = [];

  notify(message) {
    this.#messages.push(message);
  }

  get messages() {
    return [...this.#messages];
  }
}
