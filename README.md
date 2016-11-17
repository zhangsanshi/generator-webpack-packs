## 安装

download 下来, 然后在目录执行 `npm link`

也可以 ` npm install git+ssh://git@gitlab.dxy.net:biz-developer/generator-webpack-pack.git -g`

但貌似第二种比较慢,卸载

`npm unlink`

` npm uninstall git+ssh://git@gitlab.dxy.net:biz-developer/generator-webpack-pack.git -g`
上面一条卸载不成功的话,可以执行下面这句
` npm uninstall generator-webpack-pack -g`

## 使用

在目标目录 `yo webpack-pack`

## 运行
在目标目录查看 `package.json` 文件

### `npm run start`
开发时使用,开启一个服务器,端口是 `8080`

### `npm run test`
可以写测试代码进行测试

### `npm run watch`
开发时使用

### `npm run publish`
上线时使用
