Gender Guessing API

A GET endpoint that predicts gender based on a first name using the Genderize.io API.

Features
- Data Accuracy: Extracts name, gender, and probability from Genderize.io API.
- Accessibility: Fully configured CORS headers for cross-origin requests.
- Performance: Internal processing latency kept under 500ms.

Endpoints
GET `/check-gender/:username`
Returns gender prediction data for a specific name.
- Success (200): Returns predicted gender, probability, name and sample_size.
- Error (400): Missing or empty name parameter.
- Error (422): Name is not a string.
- Error (500/502): Upstream or server failure.

Setup
1. Duplicate the repo.
2. Run `npm install`.
3. Start the server with `node .`
