export class Notifier {
  notify(message) {
    throw new Error("Cada notificador debe implementar notify(message)");
  }
}
