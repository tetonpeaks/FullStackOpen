import "../styles/styles.css"

const Notification = ({ msg }) => {
    if (msg === null) return null
    return <div className='msg'>{msg}</div>
}

export default Notification