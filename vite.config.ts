import {defineConfig} from 'vite';

export default defineConfig({
    build: {
        target: "ES2022", // cél verzió
        outDir: "./dist", // build-elt alk. mappája
        emptyOutDir: true // dist mappát törli
    },
    base: "./", // relatív elérési út
    appType: "spa" // Single Page Application
});