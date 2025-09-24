# /plan.md

## Development Plan: Personal Portfolio Website

### 1. Project Phases
- **Phase 1: Planning & Setup (1-2 days)**
  - Review CV and finalize requirements (based on specify.md).
  - Set up Next.js project: `npx create-next-app@latest --typescript --eslint --tailwind --app --src-dir --import-alias "@/*"`.
  - Install ShadCN: `npx shadcn@latest init`.
  - Add necessary components: Card, Button, Separator, Badge.
  - Configure Tailwind and global CSS.

- **Phase 2: Component Development (3-5 days)**
  - Build reusable components:
    - Header.tsx (navigation).
    - Section.tsx (wrapper for sections).
    - ExperienceCard.tsx (for experience entries).
    - EducationCard.tsx (similar for education).
    - SkillsBadge.tsx (for skills display).
  - Implement sections:
    - Hero/About.
    - Education.
    - Experience (with sub-sections for roles at Grab).
    - Skills.
    - Additional/Interests.
    - Contact/Footer.
  - Add interactivity: Scroll links, hover effects.

- **Phase 3: Styling & Responsiveness (2-3 days)**
  - Apply ShadCN styles and Tailwind classes.
  - Ensure mobile responsiveness using media queries.
  - Add animations if time allows (e.g., fade-in on scroll).

- **Phase 4: Testing & Optimization (1-2 days)**
  - Write unit tests for key components.
  - Test on multiple devices/browsers.
  - Optimize images/assets.
  - SEO setup: Update metadata in layout.tsx.

- **Phase 5: Deployment & Review (1 day)**
  - Deploy to Vercel.
  - Review for accuracy against CV.
  - Gather feedback and iterate if needed.

### 2. Timeline
- Total Estimated Time: 8-13 days (assuming part-time effort).
- Start Date: September 25, 2025.
- End Date: October 8, 2025.
- Milestones:
  - Day 2: Project setup complete.
  - Day 7: All sections implemented.
  - Day 10: Testing done.
  - Day 13: Deployed.

### 3. Resources
- **Tools**: VS Code, Git for version control.
- **Dependencies**: Next.js, ShadCN, Tailwind CSS.
- **Team**: Solo developer (user or assistant-guided).
- **Risks & Mitigations**:
  - Risk: ShadCN integration issues – Mitigation: Follow official docs.
  - Risk: Time overruns – Mitigation: Prioritize core sections.
  - Risk: Data inaccuracies – Mitigation: Double-check against CV.

### 4. Next Steps
- Initialize Git repository.
- Begin coding Header and layout.
- Commit changes regularly with descriptive messages.