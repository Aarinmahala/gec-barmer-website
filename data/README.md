# Direct Announcement Updates

This system allows you to update announcements on the website by simply editing a JSON file, without needing to rebuild the application or use the admin interface.

## How to Update Announcements

1. Edit the `announcements.json` file in this directory
2. Run the `update-announcements.bat` script in the root directory
3. The changes will be immediately visible on the website

## Announcement JSON Format

Each announcement should follow this format:

```json
{
  "id": "unique_id",
  "title": "Announcement Title",
  "content": "Detailed content of the announcement...",
  "date": "YYYY-MM-DD",
  "category": "academics|admissions|exams|placements|events|general",
  "important": true|false,
  "link": "https://optional-link.com"
}
```

### Fields Explanation

- `id`: A unique identifier for the announcement
- `title`: The title of the announcement
- `content`: The main content/body of the announcement
- `date`: The date in YYYY-MM-DD format
- `category`: One of the predefined categories
- `important`: Boolean flag for high-priority announcements
- `link`: Optional URL for more information

## Example

```json
{
  "id": "6",
  "title": "New Computer Lab Opening",
  "content": "The new computer lab with 50 workstations will be open from next week.",
  "date": "2025-05-20",
  "category": "academics",
  "important": true,
  "link": ""
}
```

## Notes

- Make sure the JSON is valid (proper quotes, commas, etc.)
- The website will automatically display the most recent announcements
- Changes are immediate and don't require restarting the server 