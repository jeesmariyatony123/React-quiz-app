import React, { useRef, useState } from 'react'
import Col from 'react-bootstrap/Col';
import { data } from '../data';

const Quiz = () => {

  let [index, setIndex] = useState(0)
  let [question, setQuestion] = useState(data[index])
  let [lock, setLock] = useState(false)
  let [score, setScore] = useState(0)
  let [result, setResult] = useState(false)

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);
  const option_array = [Option1, Option2, Option3, Option4]

  const checkAns = (e, answer) => {
    if (lock === false) {
      if (question.answer === answer) {
        e.target.classList.add("correct")
        setLock(true)
        setScore(prev => prev + 1)
      } else {
        e.target.classList.add("wrong")
        setLock(true)
        option_array[question.answer - 1].current.classList.add("correct")
      }
    }
  }
  const next = () => {
    if (lock === true) {
      if (index === data.length - 1) {
        setResult(true)
        return 0
      }
      setIndex(++index)
      setQuestion(data[index])
      setLock(false)
      option_array.map((option) => {
        option.current.classList.remove("wrong")
        option.current.classList.remove("correct")
        return null

      })
    }
  }

  const playAgain = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  }

  return (
    <div>
      <div >

        <div className='d-flex align-items-center justify-content-center bg-success' style={{ height: '100vh', width: '100%',flexDirection:'column' }}>
        <h1 className='text-center pb-4'>Quiz App</h1>

          <div className=" pt-5 w-50 shadow p-5 mb-5 bg-secondary rounded" >
            {result ?
              <></>
              :
              <>
                <h1 className='text-success' style={{float:'right'}}>{index + 1}<span className='fs-5 text-secondary'>/{data.length}</span></h1>
                <h2 className='text-dark my-4 pt-5'>{index + 1}. {question.Question}</h2>
                <ul>
                  <li ref={Option1} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
                  <li ref={Option2} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
                  <li ref={Option3} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
                  <li ref={Option4} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
                </ul>
  
                <div className='text-center'>
                  <button onClick={next} className='btn btn-success w-25 mt-2'>Next</button>
                </div>
              </>
            }
            {result ?
              <>
                <h2 className='text-center py-5 text-success'>You Scored {score} out of {data.length}</h2>
                <div className='text-center'>
                  <button onClick={playAgain} className='btn btn-outline-success w-25 mt-2'>Reset</button>
                </div>
              </> :
              <></>}
  
          </div>
        </div >
      </div>

    </div>
  )
}

export default Quiz