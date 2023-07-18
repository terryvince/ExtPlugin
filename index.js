const fs = require('fs')
const path = require('path')
function build(jsonArr,platFormEnv){
  	for(let i =0,ennable=false,isExcute=false; i< jsonArr.length ; i++){
  		if(/(#ifdef)|(#ifndef)/.test(jsonArr[i])){
  			isExcute = true
  			let str = jsonArr[i].split('//')[1].trim()
  			let condition = str.split(' ')[0]
  			let platForm = str.split(' ')[1].toLowerCase()
  			
  			let isInclude = condition=='#ifdef'
  			// 匹配平台
  			if( (isInclude && platFormEnv==platForm) || (!isInclude && platFormEnv!=platForm) ){
  				ennable = true
  				jsonArr[i]=''
  			}else{
  				ennable = false
  				jsonArr[i]=''
  			}
  			continue
  		}
  		if(/#endif/.test(jsonArr[i])){
  			isExcute  = false
  			jsonArr[i]=''
  			continue
  		}
  		if(isExcute && ennable) continue
  		if(isExcute && !ennable) {
  			jsonArr[i]=''
  			continue
  		}
  	}
  	return jsonArr.join('\r\n')
}


class ExtPlugin {
  constructor(options){
    this.options = options || {};
  }
  apply(compiler) {
    compiler.hooks.done.tap(
      'ExtPlugin',
      (
        stats /* 绑定 done 钩子后，stats 会作为参数传入。 */
      ) => {
		let extPath = path.join(__dirname, '../unpackage/dist', process.env.NODE_ENV === 'production' ? 'build' : 'dev', process.env.UNI_PLATFORM,'ext.json')
		let extJson = fs.readFileSync(extPath,{encoding:'utf-8'})
		fs.writeFileSync(extPath,build(extJson.split('\r\n'),process.env.UNI_PLATFORM))
		console.log(`ExtPlugin:${extPath}编译完成：)`)
      }
    );
  }
}

module.exports = ExtPlugin;