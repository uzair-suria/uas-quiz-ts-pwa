import React from 'react';

import parse from 'html-react-parser';
import { AnswerObject } from '../containers/QuizApp';
import {
	Button,
	Card,
	LinearProgress,
	makeStyles,
	Typography,
} from '@material-ui/core';
import { blue, green, red } from '@material-ui/core/colors';

const useStyles = makeStyles({
	root: {
		padding: 20,
	},
	questionText: {
		marginTop: 20,
	},
	correctAnswer: {
		'&:disabled': {
			backgroundColor: green[400],
		},
	},
	wrongAnswer: {
		'&:disabled': {
			backgroundColor: red[400],
		},
	},
	otherAnswer: {
		'&:disabled': {
			backgroundColor: blue[400],
		},
	},
	answerButton: {
		marginTop: 10,
		'& span': {
			justifyContent: 'center',
		},
	},
});

type Props = {
	question: string;
	answers: string[];
	callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
	userAnswer: AnswerObject | undefined;
	questionNumber: number;
	totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
	question,
	answers,
	callback,
	userAnswer,
	questionNumber,
	totalQuestions,
}) => {
	const styles = useStyles();
	return (
		<Card className={styles.root} raised>
			<Typography variant="body1">
				Question: {questionNumber} / {totalQuestions}
			</Typography>
			<LinearProgress
				variant="determinate"
				value={(questionNumber / totalQuestions) * 100}
			/>
			<Typography variant="body2" className={styles.questionText}>
				{parse(question)}
			</Typography>
			{/* <p dangerouslySetInnerHTML={{ __html: question }} /> */}
			<div>
				{answers.map((ans) => (
					<div
						className="AnswerWrapper"
						key={ans}
						// correct={userAnswer?.correctAnswer === ans}
						// userClicked={userAnswer?.answer === ans}
					>
						<Button
							disabled={userAnswer ? true : false}
							value={ans}
							onClick={callback}
							variant="contained"
							color="primary"
							fullWidth
							className={`${
								userAnswer?.correctAnswer === ans
									? styles.correctAnswer
									: !(userAnswer?.correctAnswer === ans) &&
									  userAnswer?.answer === ans
									? styles.wrongAnswer
									: styles.otherAnswer
							} ${styles.answerButton}`}
							style={{ textTransform: 'none', textAlign: 'left' }}
						>
							<span>{parse(ans)}</span>
						</Button>
					</div>
				))}
			</div>
		</Card>
	);
};

export default QuestionCard;
