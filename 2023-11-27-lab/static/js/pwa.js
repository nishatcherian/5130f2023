document.addEventListener('DOMContentLoaded', init, false);
function init() {
  console.log("got in")
  if ('serviceWorker' in navigator) {
    console.log("yes")
    navigator.serviceWorker.register('/service-worker.js')
      .then((reg) => {
        console.log('Service worker registered -->', reg);
      }, (err) => {
        console.error('Service worker not registered -->', err);
      });
  }
}