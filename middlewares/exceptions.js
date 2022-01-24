const catchError = async (ctx, next) => {
	try {
		await next();
	} catch (error) {
		// error 简化 清晰明了的信息给前端
		// HTTP Status Code 2xx,4xx,5xx
		if (error.errorCode) {
			ctx.body = {
				msg: error.message,
				error_code: error.errorCode,
				request: error.requestUrl,
			};
			ctx.status = error.status;
		}
	}
};

module.exports = catchError;
