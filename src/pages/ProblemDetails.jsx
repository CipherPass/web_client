import React, { useState } from 'react'
import ProblemTabs from '../components/ProblemTabs'
import ProblemDescription from '../components/ProblemDescription'
import ProblemEditor from '../components/ProblemEditor'
import ProblemSubmission from '../components/ProblemSubmission'
import useProblemDetails from '../models/useProblemDetails'
import { useParams } from 'react-router-dom'
import Progress from '../components/Progress'
import WebSocketUtil from '../models/submitCode'

const failedResult = {
  status: 'Failed',
  title: 'Compilation Error',
  testcases: [
    {
      input: '5\n2 3 4\n',
      output: '10\n',
      expectedoutput: '8\n',
      status: 'Failed',
    },
    {
      input: '3\n1 2 3\n',
      output: '6\n',
      expectedoutput: '5\n',
      status: 'Failed',
    },
  ],
}

const successResult = {
  status: 'Success',
  timeTaken: '40ms',
  memoryTaken: '128 MB',
}
const ProblemDetails = () => {
  console.log('ProblemDetails Component')

  const { problemSlug } = useParams()
  const { problem, error } = useProblemDetails(problemSlug)
  const isLoading = !(problem || error)
  console.log(`isLoading: ${isLoading}`)
  const [code, setCode] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('java')
  const [runResult, setRunResult] = useState(null)

  const languageOptions = ['java', 'python']

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language)
  }

  const handleRun = () => {
    setRunResult(null)
    WebSocketUtil.sendCodeSubmissionRequest(
      problemSlug,
      {
        code,
        languageSlug: selectedLanguage,
      },
      (result) => {
        if (result.judgement === 'Accepted') {
          setRunResult({
            status: 'Success',
            timeTaken: '40ms',
            memoryTaken: '128 MB',
          })
        } else if (result.judgement === 'CompilationError') {
          setRunResult({
            status: 'Failed',
            title: 'Compilation Error',
            testcases: [],
          })
        } else if (result.judgement === 'NotAccepted') {
          setRunResult({
            status: 'Failed',
            title: 'Not Accepted',
            testcases: [],
          })
        } else {
          setRunResult({
            status: 'Unknown response',
            title: `Judgement: ${result.judgement}`,
            testcases: [],
          })
        }
      },
      () => {
        setRunResult(null)
      }
    )
  }

  const handleSubmit = () => {
    handleRun()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white min-h-screen shadow-md rounded-md p-2 w-full flex flex-col md:flex-row">
        {isLoading ? (
          <Progress />
        ) : (
          <>
            <div className="w-full md:w-1/2 md:mr-8">
              <ProblemTabs />

              <ProblemDescription problem={problem} />
            </div>
            <div className="w-full md:w-1/2">
              <ProblemEditor
                code={code}
                setCode={setCode}
                languageOptions={languageOptions}
                selectedLanguage={selectedLanguage}
                handleLanguageChange={handleLanguageChange}
              />
              <ProblemSubmission
                handleRun={handleRun}
                handleSubmit={handleSubmit}
                runResult={runResult}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ProblemDetails
