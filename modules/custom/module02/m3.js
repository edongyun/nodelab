console.log('m3 로딩 시작');

console.log(__dirname);
console.log(__filename);

var m2 = require('./m2');  
// 이미 m1에서 m2를 require() 했기(캐싱되었기) 때문에 이 m2는 로딩되지 않는다. 
// 이미 캐싱된 모듈은 다시 require() 되지 않는다.

// console.dir(require.cache, {depth: 0});  // cache된 모듈들의 정보를 출력
// console.dir(require.main, {depth: 1});  // 현재 실행된 모듈이 main이 된다.
console.log(require.main == module);  //m2에서 실행하면 true, 다른 모듈에서 실행하면 false
console.log('main', require.main.filename);
console.log('filename', module.filename);
console.log('parent', module.parent && module.parent.filename);
console.log('children', module.children[0] && module.children[0].filename);

console.log('m3 로딩 완료');