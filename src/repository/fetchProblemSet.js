import { BACKEND_URL } from '../constants'

const fetchProblemSet = async () => {
  console.log('fetchProblemSet')
  const url = `${BACKEND_URL}/api/problemset/all`
  try {
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    // Handle error
    console.error('Error fetching problem set:', error)
    return []
  }
}

export default fetchProblemSet

