import { createBareServer } from "@tomphttp/bare-server-node";
import { createServer } from "node:http";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { dynamicPath } from "@nebula-services/dynamic";
import express from "express";
import path from "path";
import dotenv from "dotenv";
import useragent from "express-useragent";

dotenv.config();

const bare = createBareServer("/bare/");
const __dirname = process.cwd();
const httpServer = createServer();
const app = express(httpServer);

app.use(useragent.express());

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "/public")));
app.use("/uv/", express.static(uvPath));
app.use("/dynamic/", express.static(dynamicPath));

app.set("views", path.join(__dirname, "/views"));

app.get('/', (req, res) => {
    const userAgent = req.useragent;

    if (userAgent.isMobile || userAgent.isTablet) {
        res.set('Content-Type', 'text/html');
        res.sendFile(path.join(process.cwd(), './views/mobile/index.ejs'), { version: process.env.VERSION });
    } else {
        res.set('Content-Type', 'text/html');
        res.sendFile(path.join(process.cwd(), './views/index.ejs'), { version: process.env.VERSION });
    }
});

app.get('/a', (req, res) => {
    const userAgent = req.useragent;

    if (userAgent.isMobile || useragent.isTablet) {
        res.set('Content-Type', 'text/html');
        res.sendFile(path.join(process.cwd(), './views/mobile/apps.ejs'));
    } else {
        res.set('Content-Type', 'text/html');
        res.sendFile(path.join(process.cwd(), './views/apps.ejs'));
    }
});

app.get('/g', (req, res) => {
    const userAgent = req.useragent;

    if (userAgent.isMobile || useragent.isTablet) {
        res.set('Content-Type', 'text/html');
        res.sendFile(path.join(process.cwd(), './views/mobile/games.ejs'));
    } else {
        res.set('Content-Type', 'text/html');
        res.sendFile(path.join(process.cwd(), './views/games.ejs'));
    }
});

app.get('/o', (req, res) => {
    const userAgent = req.useragent;

    if (userAgent.isMobile || useragent.isTablet) {
        res.set('Content-Type', 'text/html');
        res.sendFile(path.join(process.cwd(), './views/mobile/options.ejs'));
    } else {
        res.set('Content-Type', 'text/html');
        res.sendFile(path.join(process.cwd(), './views/options.ejs'));
    }
});

app.use((_, res) => res.status(404).render("404"));



httpServer.on("request", (req, res) => {
    if (bare.shouldRoute(req)) bare.routeRequest(req, res);
    else app(req, res);
});


httpServer.on("error", (err) => console.log(err));
httpServer.on("upgrade", (req, socket, head) => {
    if (bare.shouldRoute(req)) bare.routeUpgrade(req, socket, head);
    else socket.end();
});

httpServer.listen({ port: process.env.PORT || 8000 }, () => {
    const addr = httpServer.address();
    console.log(`
    ███████╗░██████╗░██╗░░░██╗██╗███╗░░██╗░█████╗░██╗░░██╗
    ██╔════╝██╔═══██╗██║░░░██║██║████╗░██║██╔══██╗╚██╗██╔╝
    █████╗░░██║██╗██║██║░░░██║██║██╔██╗██║██║░░██║░╚███╔╝░
    ██╔══╝░░╚██████╔╝██║░░░██║██║██║╚████║██║░░██║░██╔██╗░
    ███████╗░╚═██╔═╝░╚██████╔╝██║██║░╚███║╚█████╔╝██╔╝╚██╗
    ╚══════╝░░░╚═╝░░░░╚═════╝░╚═╝╚═╝░░╚══╝░╚════╝░╚═╝░░╚═╝\n
                        Version ${process.env.VERSION}
                        Port: ${addr.port}`);
});