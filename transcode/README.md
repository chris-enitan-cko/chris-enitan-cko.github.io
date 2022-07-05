# Transcode UI

Combined events ID encode and decode assistive UI with quick/linked access to Event Store streams

- Based on `https://devapi.ckotech.co/webhooktester/events/<conversion_type>/<code>`
- Domain: https://chris-enitan-cko.github.io/transcode/

## Approach

- Javascript
- Fetch API at
  - `https://devapi.ckotech.co/webhooktester/events/<method>`

### In-browser Permissions Required

- Browser: Clipboard `asks/allow on first run`

## How to use

- It copies text from your clipboard when you click in the text field
  - or you can paste your code string in
- Click desired transform option
- Click `Copy` button to copy result back to your clipboard
  - or click to open new code-ID on other evs endpoints

### Upcoming additions

- Add option to turn of code auto-paste
- Put this in a tiny browser extension
