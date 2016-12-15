module.exports = function(app) {
	app.get('/', function(req, res) {
		res.redirect('/posts');	//访问根目录默认重定向到posts页面
	});
	app.use('/signup', require('./signup'));	//'/signup'目录下的页面指向该文件
	app.use('/signin', require('./signin'));	//文件中不用重复前面的路径
	app.use('/signout'), require('./signout');
	app.use('/posts', require('./posts'));
};