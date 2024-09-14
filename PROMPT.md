# PROMPT.md - Project Specification: AIGen Gallery

## 1. Introduction
AIGen Gallery is a web platform showcasing AI-generated images curated by Paweł Żentała. The project aims to highlight trends and possibilities in AI image generation across various domains.

## 2. Business Context
- **Project Goal:** Create a platform presenting trends and possibilities in AI-generated images and videos, with expert commentary and the author's perspective.
- **Target Audience:** AI enthusiasts, designers, artists, and tech innovators.
- **User Value:** 
  - Overview of AI image generation trends
  - Expert commentary on AI capabilities and applications in various fields
  - Inspiration and ideas for personal projects
  - Access to prompts used for image generation
  - Recommendations for AI content creation groups, fan pages, and authors

## 3. System Architecture
- **Frontend:** Static site using Vue.js, hosted on GitHub Pages
- **Backend:** 
  - Script synchronizing data between Facebook and Airtable (manually triggered or daily)
  - Script building static site based on Airtable data
- **Database:** Airtable
- **Integrations:** Facebook API, GPT-4 API (for tag generation)

## 4. Technologies
- **Frontend:** Vue.js, Tailwind CSS
- **Backend:** TypeScript/JavaScript
- **Database:** Airtable
- **Deployment:** GitHub Actions, GitHub Pages
- **AI:** GPT-4, GPT-4 Vision (for image analysis)

## 5. Project Structure
# AIGen Gallery Project File Structure

```
aigengallery/
│
├── .github/
│   └── workflows/
│       ├── deploy.yml
│       └── sync.yml
│
├── .vscode/
│   ├── settings.json
│   ├── extensions.json
│   └── launch.json 
│
├── src/
│   ├── assets/
│   │   └── logo.png
│   ├── components/
│   │   ├── ImageCard.vue
│   │   ├── ImageGrid.vue
│   │   ├── CategoryCloud.vue
│   │   └── AuthorComment.vue
│   ├── views/
│   │   ├── Home.vue
│   │   ├── Gallery.vue
│   │   ├── About.vue
│   │   └── ImageDetails.vue
│   ├── router/
│   │   └── index.js
│   ├── store/
│   │   └── index.js
│   ├── utils/
│   │   └── api.js
│   ├── App.vue
│   └── main.js
│
├── public/
│   ├── index.html
│   └── favicon.ico
│
├── scripts/
│   ├── sync/
│   │   ├── facebookSync.ts
│   │   ├── airtableSync.ts
│   │   └── gptAnalysis.ts
│   └── build/
│       └── generateStaticSite.ts
│
├── tests/
│   ├── unit/
│   └── e2e/
│
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── .nvmrc
├── babel.config.js
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── vue.config.js
├── README.md
└── PROMPT.md
```

## Directory Explanation:

1. `.github/workflows/`: Contains GitHub Actions workflow files for deployment and synchronization.

2. `src/`: The main directory for the Vue.js frontend application.
   - `assets/`: Static assets like images.
   - `components/`: Reusable Vue components.
   - `views/`: Vue components that represent entire pages.
   - `router/`: Vue Router configuration.
   - `store/`: Vuex store for state management.
   - `utils/`: Utility functions, including API calls.

3. `public/`: Public assets that will be served as-is.

4. `scripts/`: Backend scripts for synchronization and site generation.
   - `sync/`: Scripts for syncing data from Facebook to Airtable and performing GPT analysis.
   - `build/`: Script for generating the static site from Airtable data.

5. `tests/`: Directory for unit and end-to-end tests.

6. Configuration files: Various configuration files for the project, linting, etc.

7. `README.md`: Project documentation and setup instructions.

8. `PROMPT.md`: The detailed project specification we created earlier.

This structure separates concerns between the frontend (Vue.js application) and backend (synchronization and build scripts), while keeping all the code in a single repository for easier management. The GitHub Actions workflows can be set up to run the synchronization script and deploy the built static site to GitHub Pages.

## 5b. updated files 

# AIGen Gallery Project Structure Detailed Description

## Root Directory

- `.github/workflows/`: GitHub Actions workflows
  - `deploy.yml`: Workflow for deploying the static site to GitHub Pages
  - `sync.yml`: Workflow for running the synchronization script

- `.vscode/`: VS Code configuration
  - `settings.json`: Project-specific VS Code settings
  - `extensions.json`: Recommended extensions for the project
  - `launch.json`: Debugging configuration

- `src/`: Main source code directory for the Vue.js application

- `public/`: Public assets
  - `index.html`: Entry HTML file
  - `favicon.ico`: Site favicon

- `scripts/`: Backend scripts for data synchronization and site generation

- `tests/`: Test files

- `docs/`: Project documentation

- Configuration files: Various configuration files for the project (e.g., `.eslintrc.js`, `tsconfig.json`)

## Source Code (`src/`)

### Components (`components/`)

1. `ImageCard.vue`:
   - Props: `image: Image`
   - Methods:
     - `openImageDetails()`
     - `handleLike()`
   - Displays individual image with basic info and interactions

2. `ImageGrid.vue`:
   - Props: `images: Image[]`
   - Methods:
     - `loadMoreImages()`
   - Displays a grid of ImageCard components with infinite scroll

3. `CategoryCloud.vue`:
   - Props: `categories: string[]`
   - Emits: `categorySelected`
   - Interactive cloud of category tags

4. `AuthorComment.vue`:
   - Props: `comment: Comment`
   - Displays author's comment with formatting and metadata

5. `CollectionView.vue`:
   - Props: `collection: Collection`
   - Methods:
     - `navigateToImage(image: Image)`
   - Displays a collection of related images with description

### Views (`views/`)

1. `Home.vue`:
   - Components: CategoryCloud, FeaturedCollections
   - Methods:
     - `fetchFeaturedContent()`
   - Entry point of the application, showcasing featured content

2. `Gallery.vue`:
   - Components: ImageGrid, FilterPanel
   - Methods:
     - `applyFilters(filters: FilterOptions)`
     - `sortImages(sortOption: SortOption)`
   - Main gallery view with filtering and sorting options

3. `About.vue`:
   - Static content about the project and author

4. `ImageDetails.vue`:
   - Components: ImageCard (enlarged), AuthorComment
   - Methods:
     - `fetchImageDetails(id: string)`
     - `fetchRelatedImages()`
   - Detailed view of a single image with comments and related images

5. `Collections.vue`:
   - Components: CollectionView
   - Methods:
     - `fetchCollections()`
   - Displays all available collections

### Store (`store/`)

1. `index.ts`:
   - Vuex store configuration
   - Imports and combines modules

2. `images.ts`:
   - State:
     - `images: Image[]`
     - `currentImage: Image | null`
   - Mutations:
     - `SET_IMAGES(state, images: Image[])`
     - `SET_CURRENT_IMAGE(state, image: Image)`
   - Actions:
     - `fetchImages({ commit }, filters: FilterOptions)`
     - `fetchImageById({ commit }, id: string)`

3. `collections.ts`:
   - State:
     - `collections: Collection[]`
   - Mutations:
     - `SET_COLLECTIONS(state, collections: Collection[])`
   - Actions:
     - `fetchCollections({ commit })`

### Utils (`utils/`)

1. `api.ts`:
   - Functions for API calls to the backend
   - Methods:
     - `fetchImages(filters: FilterOptions): Promise<Image[]>`
     - `fetchImageById(id: string): Promise<Image>`
     - `fetchCollections(): Promise<Collection[]>`

2. `imageProcessing.ts`:
   - Utility functions for image processing
   - Methods:
     - `optimizeImage(image: File): Promise<File>`
     - `generateThumbnail(image: File): Promise<File>`

### Types (`types/`)

1. `image.ts`:
   ```typescript
   interface Image {
     id: string;
     url: string;
     prompt: string;
     generator: string;
     author: string;
     sourceUrl: string;
     tags: string[];
     createdAt: Date;
   }
   ```

2. `collection.ts`:
   ```typescript
   interface Collection {
     id: string;
     name: string;
     description: string;
     imageIds: string[];
   }
   ```

### Services (`services/`)

1. `airtable.ts`:
   - Class: `AirtableService`
   - Methods:
     - `fetchImages(filters: FilterOptions): Promise<Image[]>`
     - `fetchCollections(): Promise<Collection[]>`
     - `updateImage(image: Image): Promise<void>`

## Scripts (`scripts/`)

### Sync (`sync/`)

1. `facebookSync.ts`:
   - Class: `FacebookSyncer`
   - Methods:
     - `fetchNewPosts(): Promise<FacebookPost[]>`
     - `processPost(post: FacebookPost): ProcessedPost`

2. `airtableSync.ts`:
   - Class: `AirtableSyncer`
   - Methods:
     - `syncPosts(posts: ProcessedPost[]): Promise<void>`
     - `updateExistingRecords(): Promise<void>`

3. `gptAnalysis.ts`:
   - Functions:
     - `analyzeImage(image: Image): Promise<AnalysisResult>`
     - `generateTags(text: string): Promise<string[]>`

### Build (`build/`)

1. `generateStaticSite.ts`:
   - Class: `StaticSiteGenerator`
   - Methods:
     - `fetchData(): Promise<SiteData>`
     - `generatePages(data: SiteData): Promise<void>`
     - `optimizeAssets(): Promise<void>`

### Utils (`utils/`)

1. `imageOptimization.ts`:
   - Functions:
     - `compressImage(image: Buffer): Promise<Buffer>`
     - `resizeImage(image: Buffer, dimensions: Dimensions): Promise<Buffer>`

2. `dataValidation.ts`:
   - Functions:
     - `validateImage(image: any): boolean`
     - `validateCollection(collection: any): boolean`

## Tests (`tests/`)

- Unit tests for components and utilities
- E2E tests for critical user flows

## Documentation (`docs/`)

- `API.md`: Description of backend API endpoints
- `CONTRIBUTING.md`: Guidelines for contributing to the project

This structure provides a solid foundation for the AIGen Gallery project. It separates concerns, promotes reusability, and allows for easy expansion. The Vue.js frontend is organized into components, views, and a Vuex store, while the backend scripts handle data synchronization and static site generation. 

Key interactions include:
- The Vuex store manages the application state, with actions fetching data from the Airtable service.
- Components and views use the Vuex store to access and display data.
- Backend scripts sync data between Facebook and Airtable, and generate the static site.

As development progresses, you may need to adjust this structure or add new components and services. Remember to keep the single responsibility principle in mind and update the documentation as the project evolves.


## 6. Business Logic
- Manual or automatic (daily) fetching of new posts and images from Facebook
- Processing Facebook post data:
  - Extracting post content, author, date, group/fan page
  - Identifying and extracting images from posts
- Updating Airtable database with new posts and images
- Checking and removing images deleted from Facebook (last 24h)
- Automatic tagging and categorization using GPT-4
- Grouping images into collections (e.g., same author, same post)
- Building static site based on Airtable data

## 7. User Interface (UI)
- Responsive gallery of posts and images
- Homepage with "image clouds" on various themes and author comments
- Filtering and sorting of images/posts
- Grid/list view display options
- Lazy loading of images
- Infinite scroll
- Display of AI generator info, used prompts, source, author, group/fan page
- Links to original sources
- Statistics on groups, categories, authors

## 8. API and Integrations
- Facebook API integration
- Airtable API integration
- GPT-4 API integration for automatic tagging and categorization
- Future integration with comment system (e.g., Disqus)

## 9. Database
Airtable will be used as the main database with the following structure:

### Table: Posts
- id (Autonumber): Unique identifier for the post
- facebook_post_id (Text): ID of the Facebook post
- source_url (URL): Link to the original Facebook post
- source_group (Text): Name of the Facebook group or fan page
- author (Text): Post author's name
- author_url (URL): Link to the author's Facebook profile
- post_content (Long text): Content of the post
- created_at (Date): Date of entry creation in Airtable
- updated_at (Date): Date of last update in Airtable
- facebook_post_date (Date): Original post date on Facebook
- is_published (Checkbox): Whether the post should be displayed on the site
- category (Single select): Main category of the post
- tags (Multiple select): Tags assigned to the post
- collection (Text): Name of the collection (if applicable)
- notes (Long text): Additional notes or comments
- ai_analysis (Long text): GPT-4 analysis and generated tags

### Table: Images
- id (Autonumber): Unique identifier for the image
- post (Link): Relation to the Posts table
- image_url (URL): Link to the image on Facebook
- prompt (Long text): Full text of the prompt used to generate the image
- generator (Single select): Name of the AI generator (e.g., Midjourney, DALL-E, Stable Diffusion)
- tags (Multiple select): Tags assigned to the image
- order (Number): Order of the image in the post
- ai_analysis (Long text): GPT-4 Vision analysis and generated tags

## 10. Security
- Secure storage of Facebook API credentials in GitHub Secrets
- Limited access to synchronization script
- Regular security audits

## 11. Scaling and Performance
- Image optimization before publication
- Efficient Airtable queries
- CDN usage for image distribution

## 12. Testing
- Unit tests for synchronization and site-building scripts
- Integration tests for Facebook API and Airtable API interactions
- UI tests for frontend
- Performance tests for site-building process

## 13. Deployment
- **Frontend:** GitHub Pages
- **Backend (scripts):** 
  - Option 1: Google Cloud Functions (Free Tier)
  - Option 2: Personal VPS
  - Option 3: Manual execution via Chrome extension

## 14. Monitoring and Logs
- Logging of synchronization and site-building script actions
- Monitoring of synchronization and site-building status
- Alerts for errors or failures

## 15. Documentation
(To be completed with user guides and technical documentation)

## 16. Development Roadmap
- Phase 1: Basic functionality (Facebook synchronization, static site building)
- Phase 2: UI/UX enhancement, implementation of advanced filtering and search functions
- Phase 3: GPT-4 integration for automatic tagging and categorization
- Phase 4: Comment system integration (e.g., Disqus)
- Phase 5: Image rating system implementation

## 17. Copyright and Disclaimer
- Copyright information crediting original creators
- Clear attribution of prompt authors and AI generators
- Links to original sources (Facebook post, group/fan page)
- Disclaimer explaining the site's purpose (showcasing AI trends and possibilities)
- Statement that selection and comments represent the site author's subjective perspective

## 18. Additional Features
- Grouping images into collections
- Presentation of statistics on groups, categories, authors
- Recommendations for groups, fan pages, and authors
- Site author's comments on AI trends and applications in various fields


## 19. Project Philosophy
- Goal: Showcase trends and possibilities in AI image generation
- Perspective: Subjective selection and commentary by the author (Paweł Żentała)
- Added value: Trend analysis, thematic grouping, business context

## 20. Content Management
- Data source: Posts from Facebook groups and fan pages
- Selection process: Manual selection of interesting posts by the author
- Categorization: Automatic (GPT-4) with possibility of manual correction
- Grouping: Thematic collections (e.g., cars, houses, horror, political icons)

## 21. Analysis and Commentary
- AI trends: Identification and description of new trends in image generation
- Industry context: E.g., impact of AI on car design, architecture
- Potential and applications: Discussion of possible applications in various fields
- Ethics and society: Discussion on the impact of AI on art, design, work

## 22. User Interactions
- Comments: Implementation of a comment system (e.g., Disqus) in future phases
- Ratings: Possibility for users to rate images (to be considered)
- Sharing: Easy sharing of images and analyses on social media

## 23. Community Development
- Recommendations: Recommending valuable groups, fan pages, and creators
- Education: Basic information about prompts and image generation techniques
- Inspiration: Encouraging users to experiment with AI

## 24. Technical Aspects
- Synchronization: Manual or automatic (daily) fetching of new posts
- Content removal: Checking and removing images deleted from Facebook (last 24h)
- Optimization: Lazy loading, infinite scroll for smooth gallery browsing
- Responsiveness: Adaptation to different devices and screen sizes

## 25. Monetization (Future Considerations)
- Sponsored posts: Possibility to highlight posts from partners
- Courses/Webinars: Potential paid training on AI image generation
- Consultations: Offering individual consultations in AI in design

## 26. Project Expansion
- Language versions: Possibility to add other language versions in the future
- New data sources: Considering integration with other platforms (e.g., Instagram, Twitter)
- Generating own images: Potential addition of image generation feature on the site

## 27. Metrics and Analytics
- Popularity tracking: Analysis of most popular images, categories, prompts
- User behavior: Analysis of user paths, time spent on site
- Reports: Regular summaries of trends and statistics for the author and users


## 28. Copyright and Ethical Considerations
- The site strongly respects copyright and does not aim to "steal" content.
- Linking to original sources and authors is a key element of the project.
- Each image or post will be clearly attributed to its original creator and source.
- The project aims to showcase and celebrate AI-generated art, not to exploit it.
- A clear disclaimer will be present, explaining the project's purpose and approach to copyright.

## 29. Author's Perspective
- All selections and commentaries represent the subjective perspective of Paweł Żentała.
- The value of the project lies in the curation and analysis provided by the author.
- Personal comments and analyses can be added to individual images or collections.
- The author's background and expertise in AI and design will be highlighted to provide context for the commentary.
- Users will be encouraged to form their own opinions and engage in discussions about the presented content.

## 30. Data Structure Flexibility
- The Airtable structure is designed to be easily expandable and modifiable as the project evolves.
- New fields can be added to accommodate emerging trends or additional metadata.
- The frontend will be built with this flexibility in mind, able to adapt to changes in the data structure.
- Regular reviews of the data structure will be conducted to ensure it meets the project's evolving needs.
- Documentation will be maintained to track changes in the data structure and their implications for the project.