import React from "react"

const Total = ({ parts }) => {

	const total = parts.reduce((sum, part) => {
		return sum + part.exercises
	}, 0)

	return <strong>Total number of exercises: {total}</strong>
}

const Part = ({part}) => {
	return (
		<p>{part.name}: {part.exercises}</p>
	)
}
const Course = ({name, parts}) => {
	return (
		<div>
			<h2>{name}</h2>
			{parts.map(part =>
				<Part key={part.id} part={part} />
			)}
			<Total parts={parts} />
		</div>
	)
}

export default Course