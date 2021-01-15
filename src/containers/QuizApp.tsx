import React, { useState } from 'react';
import { genreMap } from '../api';
import { fetchQuizQuestions, QuestionState } from '../api/fetchQuizQuestions';
import QuestionCard from '../components/QuestionCard';
import {
	Button,
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Typography,
} from '@material-ui/core';
import NetworkUnavailable from '../components/NetworkUnavailable';

export type AnswerObject = {
	question: string;
	answer: string;
	correct: boolean;
	correctAnswer: string;
};

export type Genre = number;

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: '360px',
		margin: '0 auto',
	},
	formControl: {
		marginRight: '20px',
		minWidth: 200,
	},
	formRoot: {
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'center',
	},
}));

const TOTAL_QUESTIONS = 10;

const QuizApp: React.FC = () => {
	const styles = useStyles();
	const [loading, setLoading] = useState(false);
	const [questions, setQuestions] = useState<QuestionState[]>([]);
	const [number, setNumber] = useState(0);
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(true);
	const [genre, setGenre] = useState<Genre>(0);
	const [networkError, setNetworkError] = useState(false);

	const genreKeys: string[] = Object.keys(genreMap);

	const handleGenreChange = (
		e: React.ChangeEvent<{
			name?: string | undefined;
			value: unknown;
		}>
	) => {
		setGenre(Number(e.target.value));
	};

	const startQuiz = async () => {
		setLoading(true);
		setGameOver(false);

		const newQuestions = await fetchQuizQuestions(
			TOTAL_QUESTIONS,
			genre
		).catch(() => setNetworkError(true));

		// fetchQuizQuestions(TOTAL_QUESTIONS, genre).then(qs=>{setQuestions(qs)})

		setQuestions(newQuestions);
		setScore(0);
		setUserAnswers([]);
		setNumber(0);
		setLoading(false);
	};

	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!gameOver) {
			// User Answer
			const answer = e.currentTarget.value;
			// Check Answer
			const correct = questions[number].correct_answer === answer;
			// Handle the result
			if (correct) setScore((prev) => prev + 1);
			// Save answer in the array "userAnswer"
			const answerObject: AnswerObject = {
				question: questions[number].question,
				answer,
				correct,
				correctAnswer: questions[number].correct_answer,
			};
			setUserAnswers((prev) => [...prev, answerObject]);
		}
	};

	const nextQuestion = () => {
		// move to next question if not at last question
		const nextQuestion = number + 1;
		if (nextQuestion === TOTAL_QUESTIONS) {
			setGameOver(true);
		} else {
			setNumber(nextQuestion);
		}
	};

	return (
		<div className={`${styles.root}`}>
			<Typography variant="h2" color="primary" component="h1" align="center">
				Quiz
			</Typography>
			{gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
				<div className={styles.formRoot}>
					<FormControl className={`${styles.formControl}`}>
						<InputLabel id="genre-selector-label">Select Genre</InputLabel>
						<Select
							labelId="genre-selector-label"
							onChange={handleGenreChange}
							value={genre}
						>
							{genreKeys.map((key: string) => (
								<MenuItem value={genreMap[key]} key={key}>
									{key}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Button
						variant="contained"
						color="primary"
						className="start"
						onClick={startQuiz}
					>
						Start
					</Button>
				</div>
			) : null}
			<div style={{ textAlign: 'center' }}>
				{!gameOver ? (
					<Typography variant="body1" className="score">
						Score: {score}
					</Typography>
				) : null}
				{loading ? (
					<Typography variant="button">Loading Questions...</Typography>
				) : null}
			</div>

			{!loading && !gameOver ? (
				<>
					{networkError ? (
						<NetworkUnavailable />
					) : (
						<QuestionCard
							questionNumber={number + 1}
							totalQuestions={TOTAL_QUESTIONS}
							question={questions[number].question}
							answers={questions[number].answers}
							userAnswer={userAnswers ? userAnswers[number] : undefined}
							callback={checkAnswer}
						/>
					)}
				</>
			) : null}
			{!gameOver &&
			!loading &&
			userAnswers.length === number + 1 &&
			number !== TOTAL_QUESTIONS - 1 ? (
				<div style={{ textAlign: 'center', marginTop: 10 }}>
					<Button
						variant="contained"
						className="next"
						onClick={nextQuestion}
						color="primary"
					>
						Next Question
					</Button>
				</div>
			) : null}
		</div>
	);
};

export default QuizApp;
