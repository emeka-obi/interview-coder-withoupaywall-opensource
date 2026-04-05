import React, { useEffect, useRef } from "react"
import { GeneralAnswerData } from "../types/solutions"
import { COMMAND_KEY } from "../utils/platform"

interface GeneralAnswerProps {
  data: GeneralAnswerData
  onReset: () => void
}

const GeneralAnswer: React.FC<GeneralAnswerProps> = ({ data, onReset }) => {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateDimensions = () => {
      if (contentRef.current) {
        window.electronAPI.updateContentDimensions({
          width: contentRef.current.scrollWidth,
          height: contentRef.current.scrollHeight
        })
      }
    }
    const resizeObserver = new ResizeObserver(updateDimensions)
    if (contentRef.current) resizeObserver.observe(contentRef.current)
    updateDimensions()
    return () => resizeObserver.disconnect()
  }, [])

  const { question, choices, correct_answer, explanation } = data

  return (
    <div ref={contentRef} className="relative">
      <div className="space-y-3 px-4 py-3">
        {/* Command bar */}
        <div className="text-xs text-white/90 backdrop-blur-md bg-black/60 rounded-lg py-2 px-4 flex items-center gap-4 w-fit">
          <div
            className="flex items-center gap-2 cursor-pointer rounded px-2 py-1.5 hover:bg-white/10 transition-colors"
            onClick={onReset}
          >
            <span className="text-[11px] leading-none">Reset</span>
            <div className="flex gap-1">
              <button className="bg-white/10 rounded-md px-1.5 py-1 text-[11px] leading-none text-white/70">
                {COMMAND_KEY}
              </button>
              <button className="bg-white/10 rounded-md px-1.5 py-1 text-[11px] leading-none text-white/70">
                R
              </button>
            </div>
          </div>
        </div>

        {/* Main content card */}
        <div className="w-full text-sm text-black bg-black/60 rounded-md">
          <div className="rounded-lg overflow-hidden">
            <div className="px-4 py-3 space-y-4 max-w-full">

              {/* Question */}
              <div className="space-y-2">
                <h2 className="text-[13px] font-medium text-white tracking-wide">
                  Question
                </h2>
                <p className="text-[13px] leading-[1.5] text-gray-100">
                  {question}
                </p>
              </div>

              {/* Answer Choices (MCQ) */}
              {choices && choices.length > 0 && (
                <div className="space-y-2">
                  <h2 className="text-[13px] font-medium text-white tracking-wide">
                    Answer Choices
                  </h2>
                  <div className="space-y-2">
                    {choices.map((choice) => {
                      const isCorrect =
                        choice.letter.toUpperCase() ===
                        correct_answer.toUpperCase()
                      return (
                        <div
                          key={choice.letter}
                          className={`flex items-start gap-3 rounded-md px-3 py-2 text-[13px] leading-[1.4] ${
                            isCorrect
                              ? "bg-green-500/20 border border-green-400/50 text-green-200"
                              : "bg-white/5 text-gray-300"
                          }`}
                        >
                          <span
                            className={`font-semibold shrink-0 ${
                              isCorrect ? "text-green-300" : "text-white/60"
                            }`}
                          >
                            {choice.letter}.
                          </span>
                          <span>{choice.text}</span>
                          {isCorrect && (
                            <span className="ml-auto shrink-0 text-green-300 text-[11px] font-medium">
                              Correct
                            </span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Answer (open-ended) */}
              {(!choices || choices.length === 0) && (
                <div className="space-y-2">
                  <h2 className="text-[13px] font-medium text-white tracking-wide">
                    Answer
                  </h2>
                  <div className="rounded-md px-3 py-2 bg-green-500/20 border border-green-400/50 text-green-200 text-[13px] leading-[1.4]">
                    {correct_answer}
                  </div>
                </div>
              )}

              {/* Explanation */}
              <div className="space-y-2">
                <h2 className="text-[13px] font-medium text-white tracking-wide">
                  Explanation
                </h2>
                <p className="text-[13px] leading-[1.5] text-gray-100 bg-white/5 rounded-md px-3 py-2">
                  {explanation}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GeneralAnswer
