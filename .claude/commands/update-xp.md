You are updating Sumant Bagri's personal website from a Google Drive source-of-truth document.

Follow these steps exactly, in order:

---

## Step 1 — Read the source document from Google Drive

Use the `mcp__claude_ai_Google_Drive__read_file_content` tool to read the Record of Career Development document.

The file URL is: https://docs.google.com/document/d/1orZMhFoUBdUBUhcdOMVZo_1peRZtXNCmZ0joQpskjrE/edit?tab=t.0

If the MCP tool is unavailable or returns an error, stop and report the error to the user. Do not proceed with guessed data.

---

## Step 2 — Read all website HTML files

Read the current content of all four content-driven HTML files:

- `/home/y2k/SumantBagri.github.io/career.html`
- `/home/y2k/SumantBagri.github.io/index.html`
- `/home/y2k/SumantBagri.github.io/projects.html`
- `/home/y2k/SumantBagri.github.io/publications.html`

Also read the experience memory snapshot at:
`/home/y2k/.claude/projects/-home-y2k-SumantBagri-github-io/memory/experience_state.md`

If the memory file does not exist, treat the current HTML files as the baseline and proceed.

---

## Step 3 — Diff: identify what is new or changed

Compare the Google Drive document against both the memory snapshot and the current HTML. Identify changes in each of the following areas:

**career.html** — work experience, education, career stats:
- New roles or positions not yet on the website
- Updated achievements or bullet points for existing roles
- New or updated skill tags for existing roles
- New or changed education entries
- Changes to career stats (years of experience, companies count, countries count, degrees count)
- Any role title, date range, or role-type label changes

**index.html** — hero, about, skills:
- Hero description paragraph
- About-card paragraphs
- Skills section tags

**projects.html** — project cards:
- New projects not yet on the website
- Updated descriptions, highlights, or stack tags for existing projects
- New or changed links (GitHub, report, poster, demo)

**publications.html** — publication cards:
- New publications not yet on the website
- Updated abstracts, keywords, or metadata for existing publications
- New or changed links (DOI, full paper, Google Scholar)

If nothing has changed in any file since the last snapshot, tell the user and stop (do not make any edits).

---

## Step 4 — Update only the files that have changes

Edit only the HTML files that correspond to changes identified in Step 3. Do not touch files with no changes.

**Template rules — read carefully and do not violate them:**

### career.html templates

**Career stat card** (repeat for each stat):
```html
<div class="stat-card fade-up">
    <div class="stat-number">N</div>
    <div class="stat-label">Label</div>
</div>
```
(Second stat card adds `fade-up-delay-1`, third adds `fade-up-delay-2`, etc.)

**Company block** (one per employer):
```html
<div class="company-block fade-up">
    <div class="company-header">
        <div class="company-logo co-SLUG"><img src="assets/LOGO_FILE" alt="COMPANY NAME" /></div>
        <div>
            <div class="company-name">COMPANY NAME</div>
            <div class="company-location"><i class="fas fa-map-marker-alt"></i> CITY, COUNTRY</div>
        </div>
    </div>
    <div class="company-roles">
        <!-- role-entry blocks go here -->
    </div>
</div>
```

**Role entry** (one per distinct title within a company):
```html
<div class="role-entry">
    <div class="role-header">
        <span class="role-title">TITLE</span>
        <span class="role-period">MMM YYYY – MMM YYYY</span>
    </div>
    <div class="role-type"><i class="fas fa-circle" style="font-size: 0.5rem; margin-right: 4px;"></i> TYPE LABEL</div>
    <ul class="role-achievements">
        <li>Achievement bullet. Use <strong>bold</strong> for key terms and metrics.</li>
    </ul>
    <div class="role-skills">
        <span class="role-skill">SkillName</span>
    </div>
</div>
```

**Education card** (inside `.edu-grid`):
```html
<div class="edu-card fade-up fade-up-delay-N">
    <div class="edu-logo-header">
        <img src="assets/LOGO_FILE" alt="INSTITUTION" class="edu-logo" />
        <div class="edu-institution">INSTITUTION NAME</div>
    </div>
    <div class="edu-degree">DEGREE TITLE</div>
    <div class="edu-conc">Concentration: CONCENTRATION · Minor: MINOR</div>
    <div class="edu-meta">
        <span class="edu-meta-item"><i class="far fa-calendar"></i> DATE RANGE</span>
        <span class="edu-meta-item"><i class="fas fa-map-marker-alt"></i> CITY, COUNTRY</span>
    </div>
    <div class="edu-gpa">GPA: X.X / Y.Y</div>
    <div class="coursework">
        <div class="coursework-title">Relevant Coursework</div>
        <div class="course-tags">
            <span class="course-tag">Course Name</span>
        </div>
    </div>
</div>
```

### index.html templates

**Skill group** (inside `.skills-grid-compact`):
```html
<div class="skill-group">
    <div class="skill-group-header">
        <div class="skill-group-icon COLOR"><i class="fas fa-ICON"></i></div>
        <span class="skill-group-title">CATEGORY</span>
    </div>
    <div class="skill-tags">
        <span class="skill-tag">SkillName</span>
    </div>
</div>
```

**About card paragraph** — plain `<p>` with `<strong>` for emphasis. No other wrappers.

**Hero description** — plain `<p>` inside `.hero-description`. No other wrappers.

### projects.html templates

**Project card** (inside `.projects-grid`):
```html
<article class="project-card fade-up [fade-up-delay-N]">
    <div class="project-visual pv-SLUG">
        <!-- SVG visual — preserve existing; only add for new projects -->
    </div>
    <div class="project-body">
        <div class="project-institution">
            <i class="fas fa-university"></i> INSTITUTION
        </div>
        <h2 class="project-title">PROJECT TITLE</h2>
        <p class="project-description">
            Description text. Use <strong>bold</strong> for key metrics.
        </p>
        <details class="project-details">
            <summary><i class="fas fa-chevron-down" style="margin-right: 4px; font-size:0.7rem;"></i> Key Technical Highlights</summary>
            <ul class="project-highlights">
                <li>Highlight bullet.</li>
            </ul>
        </details>
        <div class="project-stack">
            <span class="project-tag">TechName</span>
        </div>
        <div class="project-links">
            <a href="URL" target="_blank" rel="noopener" class="project-link primary">
                <i class="fab fa-github"></i> GitHub
            </a>
        </div>
    </div>
</article>
```

For new projects without a designed SVG visual, use a simple placeholder `<div class="project-visual pv-SLUG"></div>` and note it in the summary.

### publications.html templates

**Publication card** (inside `.container`):
```html
<article class="pub-card fade-up [fade-up-delay-N]">
    <div class="pub-card-inner">
        <div class="pub-content">
            <div class="pub-journal-badge">
                <i class="fas fa-book-open"></i> JOURNAL / VENUE NAME
            </div>
            <h2 class="pub-title">
                PUBLICATION TITLE
            </h2>
            <p class="pub-authors">
                <span class="self">Sumant Bagri</span>, CO-AUTHOR, ...
            </p>
            <p class="pub-meta">
                <span><i class="fas fa-journal-whills"></i> VOLUME / PAGES / PUBLISHER</span>
                <span><i class="far fa-calendar-alt"></i> DATE</span>
                <span><i class="fas fa-fingerprint"></i> DOI: DOI_STRING</span>
            </p>
            <details class="pub-abstract-section" open>
                <summary class="pub-abstract-toggle">
                    <i class="fas fa-align-left" style="margin-right: 6px; font-size: 0.7rem;"></i> Abstract
                </summary>
                <p class="pub-abstract-text">
                    Abstract text.
                </p>
            </details>
            <div class="pub-keywords">
                <span class="pub-keyword">Keyword</span>
            </div>
            <div class="pub-links">
                <a href="DOI_URL" target="_blank" rel="noopener" class="pub-link doi">
                    <i class="fas fa-external-link-alt"></i> DOI
                </a>
                <a href="DOI_URL" target="_blank" rel="noopener" class="pub-link">
                    <i class="fas fa-file-pdf"></i> Full Paper
                </a>
                <a href="SCHOLAR_URL" target="_blank" rel="noopener" class="pub-link">
                    <i class="fas fa-graduation-cap"></i> Google Scholar
                </a>
            </div>
        </div>
        <div class="pub-visual pv-pubN">
            <!-- SVG visual — preserve existing; omit for new if no design available -->
        </div>
    </div>
</article>
```

### Global rules (apply to all files)

Do NOT:
- Add new CSS classes
- Add inline styles not already present in the file
- Change the navbar, footer, page hero, SVG orbit diagram, or contact section
- Restructure sections or reorder entries (maintain reverse-chronological order for roles, chronological for education)
- Invent content not present in the Google Drive document

---

## Step 5 — Update the experience memory snapshot

Overwrite (or create) the file:
`/home/y2k/.claude/projects/-home-y2k-SumantBagri-github-io/memory/experience_state.md`

with the following frontmatter and a full structured summary of all content now represented on the website:

```markdown
---
name: experience-state
description: Snapshot of all work experience, education, projects, and publications currently represented on the website, synced from Google Drive source of truth
metadata:
  type: project
---

Last synced: YYYY-MM-DD

## Work Experience

### COMPANY NAME (CITY, COUNTRY)
#### ROLE TITLE — TYPE LABEL
- Period: MMM YYYY – MMM YYYY
- Achievements: (brief summary of bullets)
- Skills: skill1, skill2, ...

(repeat for all roles)

## Education

### INSTITUTION
- Degree: ...
- Period: ...
- GPA: ...
- Coursework: ...

## Career Stats
- Years of Experience: N+
- Companies: N
- Countries: N
- Graduate Degrees: N

## Projects

### PROJECT TITLE
- Institution: ...
- Stack: ...
- Links: ...

## Publications

### PUBLICATION TITLE
- Journal/Venue: ...
- Date: ...
- DOI: ...
```

Also update the MEMORY.md index at:
`/home/y2k/.claude/projects/-home-y2k-SumantBagri-github-io/memory/MEMORY.md`

Ensure this line is present:
```
- [experience_state.md](experience_state.md) — Snapshot of website experience content, last synced from Google Drive
```

---

## Step 6 — Display a change summary

Print a clear summary to the user in this format:

```
## Experience Update Summary

### Files changed
- career.html — [what changed, or "no changes"]
- index.html — [what changed, or "no changes"]
- projects.html — [what changed, or "no changes"]
- publications.html — [what changed, or "no changes"]

### Content changes
- [Section / Item]: [what was added or updated]
- ...

### Memory snapshot updated
- experience_state.md updated with new baseline
```

If nothing was changed (Step 3 found no diff), print:
```
No changes detected. The website is already up to date with the Google Drive document.
```

---

## Step 7 — Commit and push

Stage only the files that were actually modified:
```
git add career.html index.html projects.html publications.html
```
(Only add files that were actually changed.)

Then construct a commit message summarising what changed (one line), and commit with:
```
git commit -m "update(xp): <summary of changes>"
```

Before running `git push`, ask the user:
> "Changes committed. Push to remote (origin/main)? [y/N]"

Only push if the user confirms with "y" or "yes". If they decline, stop and inform them the commit is local only.
