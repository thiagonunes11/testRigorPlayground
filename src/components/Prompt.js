function Prompt({title, instructions}){
    return(
        <div className="border p-2 pt-4">
            <h1>{title}</h1>
            <p><small>{instructions}</small></p>
        </div>
    )
}

export default Prompt;