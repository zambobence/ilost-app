export default function Modal({modalMessage, error}){
    return (
        <div className={error ? 'modal error' : 'modal success'}>
                <div className="modal-header">
                <h3>{error ? 'Error' : 'Success!'}</h3>
            </div>
            <h4>{modalMessage}</h4>
        </div>
    )
}