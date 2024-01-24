import { BACKEND_URL } from '../constants'

const fetchProblemDetails = (slug) => {
  const url = `${BACKEND_URL}/api/problems/${slug}`
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(url)
      const data = await response.json()
      resolve(data)
    } catch (error) {
      reject(error)
    }
  })
}

export default fetchProblemDetails
