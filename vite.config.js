import { defineConfig } from "vite";
import * as path from "path";
// import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
    base:"/",
    preview: {
        host: true,
        port: 4173,
    },
    // server: { https: true },
    resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, ".") }],
    },
});
