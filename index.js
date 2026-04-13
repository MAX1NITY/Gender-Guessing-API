const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

app.get(['/check-gender', '/check-gender/:endpoint*'], async (req, res) => {
    try{
        const nameToSearch = req.params.endpoint || "";
        const cleanName = nameToSearch ? nameToSearch.split('/')[0] : "";
        const response = await fetch(`https://api.genderize.io?name=${cleanName}`);

        const data = await response.json();
        console.log(data);

        const date = new Date().toISOString();

        if(data.probability >= 0.7 && data.count >=100){
            confident = true
        } else {
            confident = false
        }

        if (!data.name || data.name.trim() === "" || data.name === "undefined") {
            return res.status(400).json({ status : "error", message : "400 Bad Request: Missing or empty name parameter"})
        } 
        
        if(!isNaN(data.name)) {
            return res.status(422).json({ status : "error", message : "422 Unprocessable Entity: name is not a string"})
        }

        if (!response.ok) {
            return res.status(502).json({ status : "error", message : "502: Upstream or server failure"})
        }

        if (data.gender === null || data.count === 0) {
            return res.json({status: "error", message: "No prediction available for the provided name"})
        }

        await res.json({
            status: "success",
            data: {
                name: data.name,
                gender: data.gender,
                probability: data.probability,
                sample_size: data.count,
                is_confident: confident,
                processed_at: date
            }
        })

        
    } catch (error) {
        res.status(500).json({ status : "error", message : "500: Upstream or server failure"})
    }
});

if (process.env.NODE_ENV !== "production") {
const PORT = 8000;
app.listen(
    PORT,
    () => console.log(`server live on http://localhost:${PORT}`)
)
}

module.exports = app;