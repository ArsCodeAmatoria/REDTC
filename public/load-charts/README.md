# Load Charts Folder

Place PDF load charts in this folder. Files should be named to match the `pdfFile` field in `/src/data/load-chart-questions.json`.

## Expected Files

- `liebherr-280ec-h.pdf` - Liebherr 280 EC-H 12 load chart
- `potain-mdt-219.pdf` - Potain MDT 219 load chart
- `terex-ctt-472.pdf` - Terex CTT 472-20 load chart

## Adding New Charts

1. Add the PDF file to this folder
2. Add a new entry in `/src/data/load-chart-questions.json` with:
   - `id`: URL-friendly identifier
   - `name`: Display name
   - `manufacturer`: Manufacturer name
   - `model`: Model number
   - `pdfFile`: Filename of the PDF (must match file in this folder)
   - `description`: Brief description
   - `questions`: Array of quiz questions

## Question Format

```json
{
  "id": 1,
  "question": "Question text here?",
  "options": [
    { "id": "a", "text": "Option A", "explanation": "Why this is correct/incorrect" },
    { "id": "b", "text": "Option B", "explanation": "Why this is correct/incorrect" },
    { "id": "c", "text": "Option C", "explanation": "Why this is correct/incorrect" },
    { "id": "d", "text": "Option D", "explanation": "Why this is correct/incorrect" }
  ],
  "correctAnswer": "b"
}
```

## Sources for Load Charts

- Manufacturer websites (Liebherr, Potain, Terex, etc.)
- Crane rental company documentation
- Training materials (with permission)
