// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const queryForm = document.getElementById('queryForm');
    const queryInput = document.getElementById('query');
    const responseContainer = document.getElementById('responseContainer');
    const responseText = document.getElementById('responseText');

    // Handle form submission
    queryForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent page reload on form submit

        const query = queryInput.value;

        // Clear the response text while waiting for the answer
        responseText.textContent = "Processing your query...";

        try {
            const response = await fetch("http://127.0.0.1:8000/query/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ query: query })
            });

            if (response.ok) {
                const data = await response.json();
                responseText.textContent = data.response;
            } else {
                responseText.textContent = "Error: Unable to get a response.";
            }
        } catch (error) {
            responseText.textContent = "Error: Unable to connect to the API.";
            console.error("Error:", error);
        }
    });
});
