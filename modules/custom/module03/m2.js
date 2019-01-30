console.log('m2는 function()를 exports하는 모듈');

function fn(name, age){
    return{name: name, 
      age: age
    };
}

module.exports = fn;