import { useState, useEffect } from 'react'
import fetchProblemSet from '../repository/fetchProblemSet'

const useProblemSetModel = () => {
  console.log('useProblemSetModel')
  const [problems, setProblems] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProblemSet()
      setProblems(data)
    }
    fetchData()
  }, [])
  return problems
}

export default useProblemSetModel

