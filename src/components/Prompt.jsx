function Prompt({title, instructions}){
    return(
        <div className="prompt-container">
            <h1 className="prompt-title">{title}</h1>
            {instructions && <p className="prompt-instructions"><small>{instructions}</small></p>}
        </div>
    )
}

export default Prompt;