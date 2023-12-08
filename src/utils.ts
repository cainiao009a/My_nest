import { parse } from 'yaml'
const path = require('path');
const fs = require('fs');

// 获取项目运行环境
export const getEnv = () => {
  console.log("process.env", process.env)
  return process.env.RUNNING_ENV
}

// 读取项目配置
export const getConfig = () => {
  const environment = getEnv()
  console.log("🚀 ~ file: utils.ts:13 ~ getConfig ~ environment:", environment)
  
  const yamlPath = path.join(process.cwd(), `./.config/.${environment}.yaml`)
  const file = fs.readFileSync(yamlPath, 'utf8')
  const config = parse(file)
  return config
}
