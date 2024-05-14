import { useState, React } from "react"

const Header = ({ text }) => <div><h1>{text}</h1></div>

const Button = ({ onClick, text }) => {
	return <div><button onClick={onClick}>{text}</button></div>
}

const Stats = ({ good, neutral, bad }) => {
	const total = good + neutral + bad
	const avg = total > 0 ? ((good-bad)/total).toFixed(2) : 0
	const sentiment = total > 0 ? `${(good/total*100).toFixed(2)} %` : 0

	if (total === 0) return <div>No feedback given</div>

	return (
		<div>
			<Stat text='Good' stat={good} />
			<Stat text='Neutral' stat={neutral} />
			<Stat text='Bad' stat={bad} />
			<Stat text='Total' stat={total} />
			<Stat text='Average' stat={avg} />
			<Stat text='Sentiment' stat={sentiment} />
		</div>
	)
}

const Stat = ({text, stat}) => {
	return <div>{text}: {stat}</div>
}

function App() {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const setToGood = () => setGood(good+1)
	const setToNeutral = () => setNeutral(neutral+1)
	const setToBad = () => setBad(bad+1)

	return (
		<div className="App">
			<Header text='Give Feedback' />
			<Button onClick={setToGood} text='Good' />
			<Button onClick={setToNeutral} text='Neutral' />
			<Button onClick={setToBad} text='Bad' />
			<Header text='Statistics'/>
			<Stats good={good} neutral={neutral} bad={bad}/>
		</div>
	)
}

export default App