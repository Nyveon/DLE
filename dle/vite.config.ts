import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: [
			{ find: "@/css", replacement: "/src/css" },
			{ find: "@/data", replacement: "/src/data" },
			{ find: "@/components", replacement: "/src/components" },
		],
	},
});
