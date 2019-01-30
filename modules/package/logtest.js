console.log('console.log');  //로그 메시지
console.info('console.info');  //정보 메시지
console.warn('console.warn');  //경고 메시지
console.error('console.error');  //에러 메시지

var clog = require('clog');

// display level configration:
clog.configure({'log level': 5});

clog.log('clog.log');
clog.error('clog.error');
clog.info('clog.info');
clog.warn('clog.warn');
clog.debug('clog.debug');

var tracer = require('tracer').colorConsole({
  format: '[{{timestamp}}] {{title}}: {{message}} ({{file}}):{{line}}', dateformat: 'HH:MM:ss'
});
tracer.debug('tracer.debug');
tracer.error('tracer.error');
tracer.info('tracer.info');
tracer.warn('tracer.warn');
tracer.log('tracer.log');
tracer.trace('tracer.trace');
