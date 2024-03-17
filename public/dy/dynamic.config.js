self.__dynamic$config = {
    prefix: '/study/',
    encoding: 'xor',
    mode: 'production',
    logLevel: 0,
    bare: {
      version: 2,
      path: '/bare/',
    },
    tab: {
      title: null,
      icon: null,
      ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.3'
    },
    assets: {
      prefix: '/dy/',
      files: {
        handler: 'dynamic.handler.js',
        client: 'dynamic.client.js',
        worker: 'dynamic.worker.js',
        config: 'dynamic.config.js',
        inject: '',
      }
    },
    block: [
    
    ]
  };