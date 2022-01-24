const requireDirectory = require("require-directory");
const Router = require("koa-router");

class InitManager {
	// 入口总方法
	static initCore(app) {
		InitManager.app = app;
		InitManager.initLoadRouters();
	}

	static initLoadRouters() {
		const apiDirectory = `${process.cwd()}/app/api`;
		requireDirectory(module, apiDirectory, { visit: whenLoadModule });
		function whenLoadModule(obj) {
			if (obj instanceof Router) {
				InitManager.app.use(obj.routes());
			}
		}
	}
}

module.exports = InitManager;
