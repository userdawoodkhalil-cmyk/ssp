const API_KEY = "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";

export async function askAI(message) {

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful AI teacher for students. Explain everything in simple words."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ]
            })
        });

        const data = await response.json();

        return data.choices?.[0]?.message?.content || "No response from AI.";
    } catch (error) {
        console.error(error);
        return "Error connecting to AI server.";
    }
}