# Description
Practice ui testing with jest and puppeteer. Follow this tutorial: [Practice ui testing with jest and puppeteer. Follow this tutorial: valentinog.com/blog/ui-testing-jest-puppetteer](https://valentinog.com/blog/ui-testing-jest-puppetteer)

# setup
``` bash
$ mkdir option/
$ cd option/
$ echo [your port number] > port
$ echo [your host name or ip] > host
$ cd ..
$ yarn (or npm i)
```

# command

## run express + webpack middlewares
``` bash
$ yarn start (or npm start)
```

## run webpack-dev-tool
``` bash
$ yarn run dev (or npm run dev) # if you don't want to invoke gulp (pure front-end)
```

## build bundle files to disk
``` bash
$ yarn run build (or npm run build)
```

## test (dev mode)
``` bash
$ yarn test
```

## test (prod mode)
``` bash
$ NODE_ENV=debug npm test 
```
