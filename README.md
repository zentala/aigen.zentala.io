# AIGen Gallery

AIGen Gallery is a static website generator that showcases AI-generated images curated by Paweł Żentała. The project aims to highlight trends and possibilities in AI image generation across various domains.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- Automatic synchronization with Facebook posts containing AI-generated images
- Integration with Airtable for data management
- GPT-4 powered image analysis and tagging
- Static site generation with optimized performance
- Responsive image gallery with lazy loading
- Category and tag-based navigation
- RSS feed for latest posts
- SEO optimizations including sitemap generation

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version specified in `.nvmrc`)
- npm or yarn
- Facebook Developer Account with necessary permissions
- Airtable account with a base set up for the project
- OpenAI API key for GPT-4 integration

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/aigen-gallery.git
   cd aigen-gallery
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   ```
   cp .env.example .env
   ```
   Then, edit the `.env` file with your actual credentials and configuration.

4. Install backend dependencies:
   ```
   cd scripts
   npm install
   cd ..
   ```

## Usage

### Development

To run the development server:

```
npm run dev
```

This will start a local development server at `http://localhost:3000`.

### Building the Static Site

To generate the static site:

```
npm run generate
```

This will create a `dist` folder with the generated static files.

### Syncing Data

To sync data from Facebook to Airtable:

```
cd scripts
npm run sync
cd ..
```

### Running Tests

To run the test suite:

```
npm run test
```

## Project Structure

```
aigen-gallery/
│
├── src/                  # Vue.js source files
├── scripts/              # Backend scripts for syncing and site generation
├── public/               # Public assets
├── dist/                 # Generated static site (after build)
├── tests/                # Test files
└── ... (configuration files)
```

## Configuration

- `.env`: Environment variables (see `.env.example` for required variables)
- `vite.config.ts`: Vite configuration
- `tsconfig.json`: TypeScript configuration
- `.eslintrc.js`: ESLint configuration
- `.prettierrc`: Prettier configuration

## Deployment

The static site is designed to be deployed to GitHub Pages. A GitHub Action is set up to automatically build and deploy the site when changes are pushed to the main branch.

To deploy manually:

1. Build the site: `npm run generate`
2. Deploy the contents of the `dist` folder to your web hosting service

## Contributing

Contributions to AIGen Gallery are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-branch-name`
5. Create a pull request

Please ensure your code adheres to the existing style and passes all tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Created by Paweł Żentała - [GitHub Profile](https://github.com/yourusername)