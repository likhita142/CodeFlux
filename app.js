JAVASCRIPT

document.getElementById("meetingForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const title = document.getElementById("title").value;
    const notes = document.getElementById("notes").value;

    const response = await fetch('http://localhost:3000/submit-meeting', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, notes })
    });

    const result = await response.json();
    document.getElementById("message").innerText = result.message;
const axios = require("axios");

app.post("/submit-meeting", async (req, res) => {
    const { title, notes } = req.body;

    try {
        const meeting = new Meeting({ title, notes });
        await meeting.save();

        // Send a Slack notification (replace with your Slack Webhook URL)
        await axios.post('https://hooks.slack.com/services/your/webhook/url', {
            text: New Meeting Record: ${title}\n${notes}
        });

        res.json({ message: "Meeting recorded and Slack notified!" });
    } catch (err) {
        res.status(500).json({ message: "Error saving meeting" });
    }
});