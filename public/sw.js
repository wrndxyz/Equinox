importScripts('/uv/uv.bundle.js')
importScripts('/uv/uv.config.js')
importScripts('/uv/uv.sw.js')
importScripts('/dy/dynamic.config.js');
importScripts('/dy/dynamic.worker.js');

let userKey = new URL(location).searchParams.get('userkey')
const uv = new UVServiceWorker();

const dynamic = new Dynamic();
self.dynamic = dynamic;


self.addEventListener('fetch',
    event => {
        event.respondWith(
            (async function() {
                if (await dynamic.route(event)) {
                    return await dynamic.fetch(event);
                }

                if (event.request.url.startsWith(location.origin + "/edu/")) {
                    return await uv.fetch(event);
                }

                return await fetch(event.request);
            })()
        );
    }
);