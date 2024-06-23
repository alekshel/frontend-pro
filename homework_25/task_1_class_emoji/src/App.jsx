import React, { Component } from 'react';
import Button from "./components/Button.jsx";

class App extends Component {
    constructor(props) {
        super(props);
        const initialVotes = JSON.parse(localStorage.getItem('votes')) || [0, 0, 0, 0, 0];
        this.state = {
            votes: initialVotes,
            resultsVisible: false,
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.votes !== this.state.votes) {
            localStorage.setItem('votes', JSON.stringify(this.state.votes));
        }
    }

    handleVote = (index) => {
        const newVotes = [...this.state.votes];
        newVotes[index] += 1;
        this.setState({ votes: newVotes });
    };

    handleClear = () => {
        this.setState({ votes: [0, 0, 0, 0, 0], resultsVisible: false });
    };

    getWinnerIndex = () => {
        return this.state.votes.indexOf(Math.max(...this.state.votes));
    };

    toggleResults = () => {
        this.setState({ resultsVisible: !this.state.resultsVisible });
    };

    render() {
        const emojis = ['😀', '😊', '😎', '🤩', '😍'];
        const { votes, resultsVisible } = this.state;

        return (
            <div style={{ textAlign: 'center', fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
                <h1>Select the best of emoji</h1>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                    {emojis.map((emoji, index) => (
                        <div key={index} style={{ textAlign: 'center' }} onClick={() => this.handleVote(index)}>
                            <span style={{ fontSize: '2rem', cursor: 'pointer' }}>{emoji}</span>
                            <div>{votes[index]}</div>
                        </div>
                    ))}
                </div>

                <Button
                    className="btn-success"
                    handle={this.toggleResults}
                >Show Results</Button>
                <Button
                    className="btn-danger"
                    handle={this.handleClear}
                >Clear</Button>

                {resultsVisible && (
                    <div style={{ marginTop: '20px' }}>
                        <h2>Results:</h2>
                        <div>Winner:</div>
                        <div style={{ fontSize: '2rem' }}>{emojis[this.getWinnerIndex()]}</div>
                        <div>Vote count: {votes[this.getWinnerIndex()]}</div>
                    </div>
                )}
            </div>
        );
    }
}

export default App;
