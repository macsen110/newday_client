import development from './development';
import production from './production';
function getEnv() {
  var env = '';
  if (typeof process != 'undefined' && process.env) {
    env = process.env.NODE_ENV === 'development' ? development : production
  }
  else env = production
  return env
}
export default getEnv()