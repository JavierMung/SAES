function Loading() {
    return (
        <>
            <div className="spinner-grow text-primary m-1" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-secondary m-1" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-success m-1" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <div className="spinner-grow text-danger m-1" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>

        </>);
}

export default Loading;