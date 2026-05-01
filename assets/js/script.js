function addMessage(sender, text) {
    let chatBox = document.getElementById("chatBox");

    let div = document.createElement("div");

    // Convert ```code``` into formatted blocks
    text = text.replace(/```(.*?)```/gs, function(match, code) {
        return `<pre><code>${code}</code></pre>`;
    });

    div.innerHTML = `<b>${sender}:</b><br>${text}`;

    chatBox.appendChild(div);

    // Highlight code
    document.querySelectorAll("pre code").forEach((block) => {
        hljs.highlightElement(block);
    });
}