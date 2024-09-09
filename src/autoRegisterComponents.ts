export default {
	install(app) {
		const componentFiles = import.meta.glob("./**/*.vue", { eager: true });

		// biome-ignore lint/complexity/noForEach: <explanation>
		Object.entries(componentFiles).forEach(([path, m]) => {
			const componentName = path
				.split("/")
				.pop()
				.replace(/\.\w+$/, "");

			app.component(componentName, m.default);
		});
	},
};
