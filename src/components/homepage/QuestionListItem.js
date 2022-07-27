import { useState } from "react";
import ButtonUi from "../UI/ButtonUi"
import classes from "./QuestionListItem.module.css"
import btnClasses from "../UI/Buttons.module.css"
import { motion, AnimatePresence } from "framer-motion"

const QuestionListItem = (props) => {
  const [showAnswer, setShowAnswer] = useState(false)

  const toggleAnswerHandler = () => {
    setShowAnswer(prevState => !prevState)
  }

  return (
    <div  className={classes["question-answer-container"]} onClick={toggleAnswerHandler}>
      <ButtonUi type="qa">
        <p className={classes.question}>{props.question}</p>
        <p className={classes["expand-icon"]}>+</p>
      </ButtonUi>

      <AnimatePresence>
        {showAnswer &&
          <motion.div
          layout
            initial={{ y: -80, opacity: 0, scale: 1 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            exit={{ y: -80, opacity: 0 }}
            className={classes.answer}>
            <p>{props.answer}</p>
          </motion.div>}
      </AnimatePresence>
    </div>
  );
}

export default QuestionListItem;
