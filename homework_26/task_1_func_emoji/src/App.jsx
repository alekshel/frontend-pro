import React, { useState, useEffect } from 'react';
import Button from "./components/Button.jsx";

const App = () => {
    const initialVotes = JSON.parse(localStorage.getItem('votes')) || [0, 0, 0, 0, 0];
    const [votes, setVotes] = useState(initialVotes);
    const [resultsVisible, setResultsVisible] = useState(false);

    useEffect(() => {
        localStorage.setItem('votes', JSON.stringify(votes));
    }, [votes]);

    const handleVote = (index) => {
        const newVotes = [...votes];
        newVotes[index] += 1;
        setVotes(newVotes);
    };

    const handleClear = () => {
        setVotes([0, 0, 0, 0, 0]);
        setResultsVisible(false);
    };

    const getWinnerIndex = () => {
        return votes.indexOf(Math.max(...votes));
    };

    const toggleResults = () => {
        setResultsVisible(!resultsVisible);
    };

    const emojis = ['😀', '😊', '😎', '🤩', '😍'];

    return (
        <div style={{ textAlign: 'center', fontFamily: 'Comic Sans MS, cursive, sans-serif' }}>
            <h1>Select the best of emoji</h1>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                {emojis.map((emoji, index) => (
                    <div key={index} style={{ textAlign: 'center' }} onClick={() => handleVote(index)}>
                        <span style={{ fontSize: '2rem', cursor: 'pointer' }}>{emoji}</span>
                        <div>{votes[index]}</div>
                    </div>
                ))}
            </div>

            <Button
                className="btn-success"
                handle={toggleResults}
            >Show Results</Button>
            <Button
                className="btn-danger"
                handle={handleClear}
            >Clear</Button>

            {resultsVisible && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Results:</h2>
                    <div>Winner:</div>
                    <div style={{ fontSize: '2rem' }}>{emojis[getWinnerIndex()]}</div>
                    <div>Vote count: {votes[getWinnerIndex()]}</div>
                </div>
            )}
        </div>
    );
};

export default App;
