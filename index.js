import { createBareServer } from "@tomphttp/bare-server-node";
import { createServer } from "node:http";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import useragent from "express-useragent";
import cookieParser from "cookie-parser";
import { check } from './inj.js';

dotenv.config();

const bare = createBareServer("/bare/");
const __dirname = process.cwd();
const httpServer = createServer();
const app = express(httpServer);

app.use(useragent.express());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/edu/", express.static(path.join(__dirname, "/assets/uv")));
app.use(express.static(path.join(__dirname, "/static")));

// security checkpoint, don't delete
const checkpoint = async (req, res, next) => {
    const license = req.cookies['license'];
    const host = req.headers.host || '';

    if (req.path.endsWith('.css') || req.path.endsWith('.js') || req.path.endsWith('.png') || req.path.endsWith('.jpg') || req.path.endsWith('.svg') || req.path.endsWith('.ico')) {
        return next();
    }

    try {
        if (license) {
            return next();
        } else {
            const isAllowed = await check(host);
            if (isAllowed) {
                return next();
            } else {
                return res.sendFile(path.join(__dirname, '/static/wall.html'));
            }
        }
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
};

app.use(checkpoint);

const routes = [
    { path: "/", file: "/static/home.html" },
    { path: "/v", file: "/static/home.html" },
    { path: "/s", file: "/static/search.html" },
    { path: "/ut", file: "/static/utils.html" },
    { path: "/op", file: "/static/settings.html" },
    { path: "/tos", file: "/static/tos.html" },
    { path: "/creds", file: "/static/credits.html" }
];

routes.forEach(route => {
    app.get(route.path, (req, res) => {
        if (req.useragent.isMobile && !req.useragent.isTablet) {
            return res.sendFile(path.join(__dirname, "/static/mobile/not-supported.html"));
        }

        res.sendFile(path.join(__dirname, route.file));
    });
});

app.use((_, res) => res.status(404).sendFile(path.join(__dirname, "/static/404.html")));

httpServer.on("request", (req, res) => {
    if (bare.shouldRoute(req)) {
        bare.routeRequest(req, res);
    } else {
        app(req, res);
    }
});

httpServer.on("error", (err) => console.log('Server error:', err));
httpServer.on("upgrade", (req, socket, head) => {
    if (bare.shouldRoute(req)) bare.routeUpgrade(req, socket, head);
    else socket.end();
});

httpServer.listen({ port: 3000 }, () => {
    const addr = httpServer.address();
    console.log(`
    ███████╗░██████╗░██╗░░░██╗██╗███╗░░██╗░█████╗░██╗░░██╗
    ██╔════╝██╔═══██╗██║░░░██║██║████╗░██║██╔══██╗╚██╗██╔╝
    █████╗░░██║██╗██║██║░░░██║██║██╔██╗██║██║░░██║░╚███╔╝░
    ██╔══╝░░╚██████╔╝██║░░░██║██║██║╚████║██║░░██║░██╔██╗░
    ████	███╗░╚═██╔═╝░╚██████╔╝██║██║░╚███║╚█████╔╝██╔╝╚██╗
    ╚══════╝░░░╚═╝░░░░╚═════╝░╚═╝╚═╝░░╚══╝░╚════╝░╚═╝░░╚═╝\n
                        Port: ${addr.port}`);
});
	
