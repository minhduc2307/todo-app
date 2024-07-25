import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    base: "https://minhduc2307.github.io/todo-app",
    plugins: [react()],
});
