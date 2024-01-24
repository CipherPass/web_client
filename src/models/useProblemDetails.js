import { useState, useEffect } from 'react'
import fetchProblemDetails from '../repository/fetchProblemDetails'

const useProblemDetails = (problemSlug) => {
  console.log('useProblemDetails called')
  const [problem, setProblem] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)

    fetchProblemDetails(problemSlug)
      .then((data) => {
        setLoading(false)
        setError(null)
        setProblem(data)
      })
      .catch((error) => {
        setError({
          title: 'Something went wrong',
          message: 'error',
        })
        setLoading(false)
        setProblem(null)
      })
  }, [])

  return {
    problem,
    loading,
    error,
  }
}

export default useProblemDetails
