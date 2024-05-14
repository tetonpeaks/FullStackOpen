import { useState, React } from "react"

const Display = ({ text }) => {
	return (
		<div><h4>{text}</h4></div>
	)
}

const Button = ({ onClick, text }) => {
	return (
		<div>
			<button onClick={onClick}>{text}</button>
		</div>
	)
}

const App = () => {
	const anecdotes = [
		"If it hurts, do it more often.",
		"Adding manpower to a late software project makes it later!",
		"The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		"Premature optimization is the root of all evil.",
		"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		"Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients."
	]

	const [selected, setSelected] = useState(0)
	const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

	const setSelectedIdx = () => {
		let ranidx = Math.floor(Math.random()*anecdotes.length)
		setSelected(ranidx)
	}

	const updateVotes = () => {
		const newVotes = [...votes]
		newVotes[selected] += 1
		setVotes(newVotes)
	}

	let maxVotes = Math.max(...votes)
	let idx = votes.indexOf(maxVotes)

	return (
		<div>
			<h2>Anecdotes of the Day</h2>
			<Display text={anecdotes[selected]} />
			<div style={{ display: "flex" }}>
				<Button onClick={updateVotes} text='Vote' />
				<Button onClick={setSelectedIdx} text='Next Anecdote' />
			</div>
			<h2>Anecdote with the most votes</h2>
			<Display text={anecdotes[idx]} />
		</div>
	)
}

export default App
