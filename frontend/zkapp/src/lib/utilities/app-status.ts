import { writable } from "svelte/store";

export let appStatus = writable({
  messages: [],
  state: 0
})

type StatusMessage = {
  code: number,
  message: string;
}

let statusQueue: StatusMessage[] = [];

export class AppStatus {

  static update(state: number) {
    appStatus.set({
      state: state,
      messages: statusQueue.map((t) => t.message) as any
    })
  }

  static push(message: string, code?: number) {
    statusQueue.push({
      code: code || 1,
      message: message
    })
    AppStatus.update(1);
  }

  static done(message: string, code?: number) {
    statusQueue = [{
      code: 2,
      message: message
    }];
    AppStatus.update(2);
    setTimeout(() => {
      statusQueue = [];
      AppStatus.update(0); // close it
    }, 1000*4) ; // 5 secs
  }

  static error(message: string, code?: number) {
    statusQueue = [{
      code: 2,
      message: message
    }];
    AppStatus.update(3);
    setTimeout(() => {
      statusQueue = [];
      AppStatus.update(0); // close it
    }, 1000*4) ; // 5 secs
  }
}
