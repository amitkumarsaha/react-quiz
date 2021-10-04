import { shuffleArray } from './Utils';

export type Question = {
    category: string;
    correct_answer: string;
    incorrect_answers: string[];
    difficulty: string;
    question: string;
    typr: string;
}


export type QuestionState = Question & { answers: string[] }


export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await (await fetch(endpoint)).json());
    console.log("DATA");
    console.log(data);
    return data.results.map((question: Question) => (
        {
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }
    ))
}