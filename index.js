var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var routes = require('./routes');	// 引入路由文件
var pkg = require('./package');

var app = express();

// 设置模板目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎为ejs
app.set('view engine', 'ejs');

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// session 中间件，保存用户信息
app.use(session({
	name: config.session.key,	// 设置 cookie 中保存 session id 的字段名称
	secret: config.session.secret,	// 通过设置 secret 来计算 hash 的值并放在 cookie 中，使产生的 signedCookie 防篡改
	cookie: {
		maxAge: config.session.maxAge	// 过期时间，过期后 cookie 中的 session id 自动删除
	},
	store: new MongoStore({	// 将 session 存储到 mongodb
		url: config.monbodb	// monbodb 地址
	})
}));

// flash 中间件，用来显示通知
app.use(flash());

// 启动路由
routes(app);

app.listen(config.post, function() {
	console.log('${pkg.name} is listening on port ${config.port}');
});