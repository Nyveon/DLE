import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: [
			{ find: "@/css", replacement: "/src/css" },
			{ find: "@/ts", replacement: "/src/ts" },
			{ find: "@/components", replacement: "/src/components" },
			{ find: "@/assets", replacement: "/src/assets" },
		],
	},
});
