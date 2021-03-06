import React, {Component} from 'react';
import classes from './quizList.css'
import {NavLink} from "react-router-dom";
import Loader from "../../components/UI/loader/loader";
import axios from '../../axios/axios-quiz'

class QuizList extends Component {

    state = {
        quizes: [],
        loading: true
    }

    renderQuizes() {
        return this.state.quizes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={`/quiz/${quiz.id}`}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            const res = await axios.get('/quizes.json')
            const quizes = []

            Object.keys(res.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест № ${index + 1}`
                })

                this.setState({
                    quizes,
                    loading: false
                })
            })
        } catch (e) {
            console.log('QuizList', e)
        }
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>

                    {
                        this.state.loading ? <Loader/> :
                            <ul>
                                {
                                    this.renderQuizes()
                                }
                            </ul>
                    }


                </div>

            </div>
        );
    }
}

export default QuizList;
