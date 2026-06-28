import React, { useState } from 'react'
import Card from '../../../components/ui/layouts/Card'
import { Heading, Paragraph, Button } from '../../../components/ui'
import { FaChevronLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const sampleQuestion = {
    id: 1,
    text: 'What is the primary objective of safety training for hazardous environments?',
    choices: [
        { id: 'a', label: 'Improve productivity only' },
        { id: 'b', label: 'Minimize risk and prevent incidents' },
        { id: 'c', label: 'Reduce costs by cutting staff' },
        { id: 'd', label: 'Fulfil paperwork requirements' },
    ],
}

const QuizesView = () => {
    // default answers: fill with 'b' (the correct choice in our sample) so result page can be previewed
    const questions = new Array(10).fill(sampleQuestion)
    const defaultAnswers = new Array(questions.length).fill('b')
    const [answers, setAnswers] = useState(defaultAnswers)
    /* eslint-disable-next-line no-unused-vars */
    const [current, setCurrent] = useState(0)
    const navigate = useNavigate()

    // for demo purposes, questions array created above

    return (
        <div className="p-6 md:p-10">
            <div className="max-w-5xl mx-auto">
                <div className="bg-[#F1FBF7] rounded-2xl p-16">
                    <div className="  mb-6">

                        <Heading level={3}>Quiz Preview (Student)</Heading>

                        <Paragraph className="text-base mt-5 text-gray-700">You must score at least <span className="font-semibold">70%</span> to pass this quiz.</Paragraph>
                    </div>
                    <div className=" ">
                        <div className="border bg-white border-[#DFF5E9] rounded-md p-6 relative">
                            <h4 className="text-base text-gray-500 mb-3">Question {current + 1} of {questions.length}</h4>
                            <div className="absolute right-6 top-6">
                                <span className="inline-block bg-[#F6FBF9] text-[#2f7f66] text-xs py-1 px-3 rounded-full">Single choice</span>
                            </div>

                            <div className="mb-6  text-lg text-gray-800">{sampleQuestion.text}</div>

                            <div className="space-y-4">
                                {questions[current].choices.map((c) => (
                                    <label
                                        key={c.id}
                                        className={`flex items-center gap-3 p-3 rounded-md ${answers[current] === c.id ? 'bg-[#F6FBF9] border border-[#DFF5E9]' : ''}`}
                                    >
                                        <input
                                            type="radio"
                                            name={`q${current}`}
                                            value={c.id}
                                            checked={answers[current] === c.id}
                                            onChange={() => {
                                                const copy = [...answers]
                                                copy[current] = c.id
                                                setAnswers(copy)
                                            }}
                                            className="form-radio h-4 w-4 text-[#73BFA1]"
                                        />
                                        <span className="text-base text-gray-700">{c.label}</span>
                                    </label>
                                ))}
                            </div>
                            <div className="flex items-center justify-between mt-6">
                                <Button
                                    variant="outline"
                                    label="Back"
                                    className="rounded-full"
                                    onClick={() => navigate(-1)}
                                />

                                <Button
                                    label="Next"
                                    className="rounded-full bg-[#73BFA1]"
                                    onClick={() => {
                                        // Immediately show result preview when Next is clicked
                                        const total = questions.length
                                        const correctCount = answers.filter((a) => a === 'b').length
                                        const scorePercentage = Math.round((correctCount / total) * 100)
                                        const timeTaken = '10 min'

                                        navigate('/dash/student/quiz-result', {
                                            state: {
                                                scorePercentage,
                                                correct: correctCount,
                                                total,
                                                time: timeTaken,
                                            },
                                        })
                                    }}
                                />
                            </div>
                        </div>
                        <div className="mt-6 bg-[#F6FBF9] border border-[#73BFA1] rounded-lg p-4 text-base text-[#68AC91]">
                            <strong className="text-[#68AC91]">Tip:</strong>{' '}
                            Navigate using Previous/Next. On the last question press Submit to finish.
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuizesView
