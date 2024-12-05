function Prompt({title, instructions}){
    return(
        <div className="border p-2 pt-4 text-center">
            <h1>{title}</h1>
            {instructions && <p><small style={{ whiteSpace: 'pre-wrap' }}>{instructions}</small></p>}
        </div>
    )
}

export default Prompt;