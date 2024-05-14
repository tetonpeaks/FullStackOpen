import React from "react"
import Header from "./components/Header"
import Total from "./components/Total"
import Part from "./components/Part"

const Content = ({ courseinfo }) => {
	return (
		<div>
			<Part part={courseinfo.part} ex={courseinfo.ex} />
		</div>
	)
}

const App = () => {

	const courseinfo = {
		name: "Half Stack Application Development",
		parts: [
			{
				part: "Fundamentals of React",
				ex: 10
			},
			{
				part: "Using props to pass data",
				ex: 7
			},
			{
				part: "State of a component",
				ex: 14
			}
		]
	}

	return (
		<div>
			<Header course={courseinfo.name} />
			{courseinfo.parts.map((info, idx) => (
				<Content key={idx} courseinfo={info} />
			))
			}
			<Total exs={courseinfo.parts}/>
		</div>
	)
}

export default App
