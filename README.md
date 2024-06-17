# Next.js PDF Generator with ChatGPT Integration

This project demonstrates how to create a PDF download functionality in a Next.js application using Puppeteer and integrates OpenAI's ChatGPT for generating content.

## Features

- Generate PDFs on the server-side using Puppeteer.
- Download PDFs via an API route in Next.js.
- Integrate ChatGPT to generate content for the PDFs.
- Example usage of environment variables for configuration.

## Getting Started

### Prerequisites

- Node.js (v12.x or higher)
- npm or yarn
- OpenAI API key

### Installation

1. **Clone the repository**:

    ```sh
    git clone https://github.com/srikrishna212/pdf-generator.git
    cd pdf-generator.git
    ```

2. **Install the dependencies**:

    ```sh
    npm install
    # or
    yarn install
    ```

3. **Set up environment variables**:

    Create a `.env.local` file in the root of your project and add the following environment variables:

    ```sh
    OPENAI_API_KEY=your-openai-api-key
    ```

### Running the Development Server

To start the development server, run:

```sh
npm run dev
# or
yarn dev