const baseUrl = process.env.SERVER_ADDR;
module.exports = {
	baseUrl,
	test: baseUrl + '/test',
	photoUpload: baseUrl + '/photoUpload',
}
