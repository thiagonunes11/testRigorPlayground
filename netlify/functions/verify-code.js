let randomnum = -1; 

exports.handler = async (event) => {
    const { typedCode } = JSON.parse(event.body);

    if (parseInt(typedCode) === randomnum) {
        randomnum = -1; // Reset code after successful verification
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "The auth code is correct!" }),
        };
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Invalid auth code. Try again." }),
        };
    }
};
