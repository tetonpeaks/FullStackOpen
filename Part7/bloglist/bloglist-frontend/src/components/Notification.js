import { connect } from "react-redux"

const Notification = ( props ) => {
    if (props.notification === null) return null
    return <div className='msg'>{props.notification}</div>
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

export default connect(mapStateToProps, null)(Notification)