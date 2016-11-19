if ('serviceWorker' in navigator) {
  // Install service worker
  navigator.serviceWorker.register('./src/service-workers/sw.js', {scope: '/'})
  	.then(reg => console.log('Service Worker enregistré !'))
  	.catch(e => console.log(`${e.toString()}\nErreur lors de l'installation du Service Worker, votre navigateur n'est peut être pas compatible / à jour.`))
}
