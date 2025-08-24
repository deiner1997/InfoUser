import React from 'react'
const Alert = (props) => {
    const {message,type} = props;
    if (!message) return null;
  return (
      <div
        className={`toast-container position-fixed bottom-0 end-0 p-3`}
        style={{ zIndex: 11 }}
      >
        <div
          className={`toast align-items-center ${type=="error"?"bg-danger":"bg-success"} text-white border-0 show`}
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body">{message}</div>
          </div>
        </div>
      </div>
  )
}

export default Alert