importScripts('/uv/uv.bundle.js')
importScripts('/uv/uv.config.js')
importScripts('/uv/uv.sw.js')

let userKey = new URL(location).searchParams.get('userkey')
const sw = new UVServiceWorker();


self.addEventListener("fetch", (event) => event.respondWith(sw.fetch(event)));