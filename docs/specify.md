# /specify.md

## Project Specification: Personal Portfolio Website

### 1. Project Overview
- **Project Name**: Gabriel Ivan Setyaputra Portfolio
- **Description**: A responsive, single-page personal portfolio website built with Next.js and ShadCN UI components. The site will showcase the user's professional background based on the provided CV, including education, work experience, skills, and contact information. It aims to present the information in a clean, modern, and interactive manner to attract potential employers or collaborators.
- **Target Audience**: Recruiters, hiring managers, potential clients, and professional networks in software engineering.
- **Technologies**:
  - Framework: Next.js (with TypeScript)
  - UI Library: ShadCN (with Tailwind CSS for styling)
  - Additional: React hooks for state management, potential integration of icons (e.g., Lucide React), and basic animations if needed (e.g., Framer Motion).
- **Deployment**: Vercel or similar for easy Next.js hosting.
- **Version**: 1.0

### 2. Functional Requirements
#### 2.1 Core Features
- **Header/Navigation**:
  - Sticky navigation bar with links to sections: About, Education, Experience, Skills, Contact.
  - Include the user's name as the logo/brand.
  - Responsive design: Hamburger menu on mobile.
- **Hero/About Section**:
  - Display full name, title (Software Engineer), location (Tulungagung, Indonesia), phone, and email.
  - Brief bio summarizing career highlights (e.g., "Experienced Software Engineer with expertise in Flutter, React.js, and web/mobile development. Improved user engagement and optimized processes at Grab.").
- **Education Section**:
  - List education details: Tarumanagara University, Bachelor of Science in Informatics Engineering, GPA 3.6, Jakarta, Indonesia, 2022.
  - Use cards or timeline format for readability.
- **Experience Section**:
  - Chronological list of experiences, each in a card format:
    - Software Engineer (Full-time) at PT. Kudo Teknologi Indonesia (Grab), Jakarta, Indonesia (Remote), May 2022 - June 2025.
      - Subsections: Mobile Engineer - Flutter (Mex App), Software Engineer - Web (Mex Onboarding), Software Engineer - Web & Flutter (POS).
      - Bullet points for achievements (e.g., "Improved user feedback positive response rates from 79% to 91%...").
    - Web Developer (Internship) at PT Global Media Utama Teknologi, Jakarta, Indonesia (Remote), Jan 2021 - Feb 2022.
      - Project details: Customer Relationship Management with MERN Stack.
  - Highlight quantifiable achievements (e.g., metrics like 91% response rate, 53% reduction in tickets).
- **Skills Section**:
  - Display skills as badges or tags: Flutter, Dart, React.js, JavaScript, TypeScript, PHP, Laravel, Web Engineering, MongoDB, ExpressJS, Node JS.
  - Additional: Language Skills (English & Indonesian).
  - Group by category if applicable (e.g., Mobile, Web, Languages).
- **Additional/Interests Section**:
  - List interests/hobbies: Playing Guitar, Gaming, Traveling.
- **Contact Section**:
  - Form for inquiries (name, email, message) – optional, using Formspree or similar for submission.
  - Direct links: Email, Phone, LinkedIn/GitHub if provided (assume placeholders if not in CV).
- **Footer**:
  - Copyright notice with current year (dynamic).
  - Social links if applicable.

#### 2.2 User Interactions
- Smooth scrolling to sections via navigation.
- Hover effects on cards/badges for interactivity.
- Responsive layouts: Mobile-first design, ensuring all content is accessible on devices from 320px to 1440px.
- Accessibility: ARIA labels, keyboard navigation, alt text for images (e.g., if adding profile photo).

#### 2.3 Data Sources
- All content sourced from the provided CV. No dynamic data fetching required; static generation with Next.js.
- Potential future enhancement: Integration with a CMS (e.g., Contentful) for easy updates.

### 3. Non-Functional Requirements
- **Performance**:
  - Page load time < 2 seconds.
  - Use Next.js Image optimization and static exports where possible.
- **Security**:
  - No user authentication needed.
  - Sanitize any form inputs if implemented.
- **SEO**:
  - Meta tags for title, description, keywords (e.g., "Software Engineer Portfolio, Flutter Developer, React.js").
  - Open Graph tags for social sharing.
- **Design Principles**:
  - Clean, minimalist theme using ShadCN defaults (e.g., slate color scheme).
  - Typography: Inter font (as in Next.js default).
  - Colors: Neutral palette with accents for highlights (e.g., green for achievements).
- **Browser Compatibility**: Latest versions of Chrome, Firefox, Safari, Edge.
- **Testing**:
  - Unit tests for components using Jest/React Testing Library.
  - Manual testing for responsiveness and accessibility.
- **Scalability**: Low; single-user static site.

### 4. Assumptions and Constraints
- **Assumptions**:
  - No additional assets (e.g., profile photo) provided; use placeholders.
  - CV data is static; updates require code changes.
  - User has basic knowledge of Next.js for deployment.
- **Constraints**:
  - Timeline: Quick prototype (1-2 weeks development).
  - Budget: Open-source tools only.
  - No backend required unless contact form is added.

### 5. Acceptance Criteria
- Site renders all CV sections accurately.
- Responsive on mobile/desktop.
- Navigation works without errors.
- No console warnings/errors.
- Deployed version accessible via URL.