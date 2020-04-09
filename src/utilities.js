class Concurrently {
  constructor(taskLimit) {
    this.taskLimit = taskLimit;
    this.taskQueue = [];
    this.tasksActive = 0;
    this.finished = false;
    this.finishedCallback = null;
  }

  registerTask(handler) {
    this.taskQueue.push(handler);
  }

  executeTasks() {
    const self = this;

    if (this.taskQueue.length === 0 && this.tasksActive === 0 && this.finished === false) {
      this.finished = true;
      if (this.finishedCallback) {
        this.finishedCallback();
      }

      return;
    }

    while (this.taskQueue.length && this.tasksActive < this.taskLimit) {
      const task = this.taskQueue[0];
      this.taskQueue = this.taskQueue.slice(1);
      this.tasksActive += 1;

      task()
        .then((result) => {
          self.tasksActive -= 1;
          self.executeTasks();

          return result;
        });
    }
  }

  run() {
    this.finished = false;
    this.executeTasks();
  }

  onComplete(callback) {
    this.finishedCallback = callback;
  }

  task(handler) {
    const self = this;
    return new Promise((resolve => self.registerTask(() => handler()
      .then(resolve))));
  }
}

module.exports = {
  Concurrently,
  Limiter(n, list) {
    if (!list || !list.length) {
      return;
    }

    const tail = list.splice(n);
    const head = list;
    const resolved = [];
    let processed = 0;

    return new Promise(resolve => {
      head.forEach(x => {
        const res = x();
        resolved.push(res);
        res.then(y => {
          runNext();
          return y;
        });
      });
      function runNext() {
        if (processed == tail.length) {
          resolve(Promise.all(resolved));
        } else {
          resolved.push(tail[processed]().then(x => {
            runNext();
            return x;
          }));
          processed++;
        }
      }
    });
  },
};
