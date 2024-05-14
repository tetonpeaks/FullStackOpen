import { useState, useImperativeHandle, forwardRef } from "react"
import PropTypes from "prop-types"

import { Button } from "react-bootstrap"

const Togglable = forwardRef((props, ref) => {
    //console.log("props: ", props)
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? "none" : "" }
    const showWhenVisible = { display: visible ? "" : "none" }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility // return as an object
        }
    })

    return (
        <div>
            <div className="div-login" style={hideWhenVisible}><Button onClick={toggleVisibility}>{props.buttonLabel}</Button></div>

            <div style={showWhenVisible}>
                {props.children}
                <div className='div-cancel'>
                    <Button variant="primary" onClick={toggleVisibility}>Cancel</Button>
                </div>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = "Togglable"

export default Togglable