import { BACKEND_URL } from '../constants'

const fetchProblemSet = async (page = 0, size = 20) => {
  console.log('fetchProblemSet')
  const url = `${BACKEND_URL}/api/problemset/all?page=${page}&size=${size}`
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
