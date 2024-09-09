export const registerGlobalComponents = ({ app, components }): void => {
	components.forEach(({ name, component }) => {
		app.component(name, component);
	});
};
