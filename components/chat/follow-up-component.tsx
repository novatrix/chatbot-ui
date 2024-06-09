import { IconPlus } from "@/components/icons/search-engine-icons"

// 1. Defines the FollowUp interface with a 'choices' property that contains an array of objects with a 'message' property, which in turn has a 'content' property of type string.
interface FollowUp {
  choices: {
    message: {
      content: string
    }
  }[]
}

// 2. Defines the FollowUpComponent functional component that takes 'followUp' and 'handleFollowUpClick' as props.
const FollowUpComponent = ({
  followUp,
  handleFollowUpClick
}: {
  followUp: FollowUp
  handleFollowUpClick: (question: string) => void
}) => {
  const handleQuestionClick = (question: string) => {
    handleFollowUpClick(question)
  }

  return (
    <div className="mt-4 rounded-lg bg-white p-4 shadow-lg dark:bg-slate-800">
      <div className="flex items-center">
        <h2 className="grow text-lg font-semibold text-black dark:text-white">
          Follow-Up
        </h2>
      </div>
      <ul className="mt-2">
        {followUp.choices[0].message.content &&
          JSON.parse(followUp.choices[0].message.content).followUp.map(
            (question: string, index: number) => (
              <li
                key={index}
                className="mt-2 flex cursor-pointer items-center"
                onClick={() => handleQuestionClick(question)}
              >
                <span
                  role="img"
                  aria-label="link"
                  className="mr-2 text-black dark:text-white"
                >
                  <IconPlus />
                </span>
                <p className="text-black hover:underline dark:text-white">{`${question}`}</p>
              </li>
            )
          )}
      </ul>
    </div>
  )
}

export default FollowUpComponent
