import { createBareServer } from "@tomphttp/bare-server-node";
import { createServer } from "node:http";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { dynamicPath } from "@nebula-services/dynamic";
import express from "express";
import path from "path"
import dotenv from "dotenv";

dotenv.config();


const navItems = [
    ["/", "Home"],
    ["/a", "Apps"],
    ["/g", "Games"],
];

const bare = createBareServer("/bare/");
const __dirname = process.cwd();
const httpServer = createServer();
const app = express(httpServer);

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);


app.set("view engine", "ejs")


app.use(express.static(path.join(__dirname, "/public")));

app.use("/uv/", express.static(uvPath));
app.use("/dynamic/", express.static(dynamicPath))

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');

    res.sendFile(path.join(process.cwd(), './views/index.ejs'), { version: process.env.VERSION });
});
app.get('/a', (req, res) => {
    res.set('Content-Type', 'text/html');

    res.sendFile(path.join(process.cwd(), './views/apps.ejs'));
});
app.get('/g', (req, res) => {
    res.set('Content-Type', 'text/html');

    res.sendFile(path.join(process.cwd(), './views/games.ejs'));
});
app.get('/o', (req, res) => {
    res.set('Content-Type', 'text/html');

    res.sendFile(path.join(process.cwd(), './views/options.ejs'));
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