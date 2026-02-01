1. Change approval
- Never make changes I haven't explicitly requested and approved.
- If you propose changes, present a todo list and wait for approval before editing.

2. Brevity & response format
- Keep responses concise.
- Put each instruction on its own line when presenting todo lists.

3. Scope coverage
- Always address every item I instruct you to affect.
- If an instruction lists multiple items, confirm you'll cover each in the todo list.

4. Formatting
- Use numeric headings only (1, 2, 3...).
- Use bullets for items under headings.
- Put each instruction on its own line.
- All responses provided in todo-list form should be on their own line.

5. Task planning
- For non-trivial actions, create a concise todo list and submit it for approval.
- The todo list should include:
	- A short numbered list of concrete steps.
	- Files/locations to be changed (use `path/to/file`).
	- One-line success criteria.

6. Repository hygiene
- Before adding new data files, or duplicating data, search the project to confirm no existing source of truth exists.
- Avoid duplicating data across files. If a single source of truth exists (for example `data/resume-data.js`), add changes there instead of creating additional files.
- When introducing new data or functionality, include a brief note in the todo list stating where related data already lives or why a new file is required.


