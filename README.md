# TaskFlow Dashboard

TaskFlow is a calm, standalone team task board presented as a **local demo**. It is built with plain HTML, CSS, and browser JavaScript, with no build step or network dependency. The board starts with clearly identified synthetic sample tasks and teammates; this is not a live team workspace.

## Implemented interactions

- View sample tasks grouped into To do, In progress, In review, and Done columns, with priority, assignee, due-date, description, and category details.
- Drag and drop cards between columns. Keyboard users can focus a card and use the left/right arrow keys to change its status.
- Add tasks with a title, optional description, priority, assignee, and starting status. Each column also has an Add task shortcut that preselects that column.
- Search task titles, descriptions, assignees, and categories; filter by status and priority; clear filters in one action.
- Persist task additions and status changes in this browser using `localStorage`. Data stays on this device/browser profile; it is not synchronized or sent elsewhere. If browser storage is unavailable, the board still works for the current session.
- Use `/` as a keyboard shortcut to focus search.

## Sample-data and integration boundary

Every initial task and teammate is synthetic sample data. Tasks added by the user are local demo entries only. The app does not connect to a database, a team account, invitations, or any external service. There are no live integrations or network requests.

The reference technology list—**React, TypeScript, PostgreSQL, and drag and drop**—describes a potential full-stack version only. Those technologies are not connected or used in this no-build browser demo: this project uses plain HTML, CSS, and JavaScript, browser-native drag and drop, and local browser storage. PostgreSQL is not connected; no account, payment, or other sensitive information is needed.

## Launch

1. Open a terminal in this folder.
2. Run `python3 -m http.server 8765`.
3. Open [http://localhost:8765](http://localhost:8765) in your browser.

You can also open `index.html` directly in a modern browser. The local server command above is the recommended launch path.
