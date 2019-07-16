import dev from './Root.dev'
import prod from './Root.prod'
const ROOT = process.env.NODE_ENV === 'production' ? prod : dev;
export default ROOT;

