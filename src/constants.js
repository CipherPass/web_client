let BACKEND_URL = process.env.BACKEND_URL

if (BACKEND_URL === undefined) {
  BACKEND_URL = ''
}
console.log(BACKEND_URL)
export { BACKEND_URL }
