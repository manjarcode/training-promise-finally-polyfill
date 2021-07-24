/* eslint-disable */

Promise.prototype.finally = function (callback) {
  return this.then(
    function success(v) {
      debugger;
      return Promise.resolve(callback()).then(function t() {
        console.log("I'm resolving the promise and returning", v);
        return v;
      });
    },
    function fail(e) {
      debugger;
      return Promise.resolve(callback()).then(function t() {
        console.log("I'm resolving the promise but throwing the error", e);
        throw e;
      });
    }
  );
};

function attachFinally(promise) {
  if (!promise instanceof Promise) {
    throw new Error("parameter must be a promise", promise);
  }

  promise
    .finally(function theCallback() {
      console.log(
        "Inside the finally but I can't access to theValue nor theError"
      );
    })
    .then((v) => console.log("After finally I resolved the value", v))
    .catch((e) => console.log("After finally I resolved the error", e));
}

async function mainTask() {
  await attachFinally(Promise.resolve({ theValue: 42 }));
  await attachFinally(Promise.reject(new Error("theError")));
}

mainTask();
