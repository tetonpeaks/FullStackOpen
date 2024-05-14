import React from "react"

const Total = (exs) => {

	var total = 0

	exs.exs.map((ex) => {
		total += ex.ex
		return total
	})

	return (
		<div><p>Total number of exercises: {total}</p></div>
	)
}

export default Total

