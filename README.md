# NexusFlow

 Nexus Flow is an intelligent, multi-modal AI agent orchestration platform. It operates seamlessly across different interfaces, currently supporting a Command Line Interface (CLI) and a Telegram Bot interface, with a flexible architecture designed for executing complex tasks, researching, and autonomous planning.

## 🚀 Features

* **Multi-Modal Interfaces:** Interact with the AI through a rich CLI experience or remotely via Telegram.
* **Intelligent Agents:** Built-in modes for open-ended asking, autonomous task planning, and direct agent execution.
* **Web Crawling & Research:** Capable of scraping and understanding web content to inform its actions and answers.
* **Rich Terminal UI:** Beautifully rendered markdown, interactive prompts, and diff-views directly in your terminal.

## 💻 Tech Stack

This project is built using modern tooling and libraries, focusing on speed and developer experience.

### Core & Runtime
* **[Bun](https://bun.sh/):** Fast all-in-one JavaScript runtime, bundler, test runner, and package manager.
* **[TypeScript](https://www.typescriptlang.org/):** For robust, statically typed code.

### AI & LLM Orchestration
* **[Vercel AI SDK (`ai`)](https://sdk.vercel.ai/docs):** The core framework for building AI-powered applications.
* **OpenAI Provider (`@ai-sdk/openai`):** Integration with OpenAI models.

### Interfaces
* **[Telegraf](https://telegraf.js.org/):** Modern Telegram Bot API framework for Node.js/Bun to handle the Telegram interface.
* **[Commander](https://github.com/tj/commander.js):** The complete solution for building node.js command-line interfaces.

### Terminal & UI
* **[Clack](https://github.com/natemoo-re/clack) (`@clack/prompts` & `@clack/core`):** Effortless, beautiful interactive command-line prompts.
* **[Chalk](https://github.com/chalk/chalk):** Terminal string styling.
* **[Figlet](https://github.com/patorjk/figlet.js):** Creating ASCII Art from text for the CLI welcome screen.
* **[Marked](https://marked.js.org/) & [Marked-Terminal](https://github.com/mikaelbr/marked-terminal):** Parsing and rendering Markdown directly inside the terminal interface.

### Tools & Utilities
* **[Firecrawl](https://firecrawl.dev/) (`@mendable/firecrawl-js`):** Advanced web scraping and crawling for the AI's research capabilities.
* **[Diff](https://github.com/kpdecker/jsdiff):** Text differentiation utility, used for showing before/after states of code or text modifications.

## 🛠️ Getting Started

### Prerequisites
Make sure you have [Bun](https://bun.sh/) installed on your system.

### Installation

```bash
git clone [https://github.com/yourusername/nexusflow.git](https://github.com/yourusername/nexusflow.git)
cd nexusflow
bun install
```

## ⚙️ Environment Variables Setup

To run NexusFlow, you need to configure your environment variables. 

Create a `.env` file in the root directory of your project and add the following keys. Replace the placeholder values with your actual credentials.

```env
OPENAI_API_KEY="<YOUR_OPENAI_API_KEY>"
OPENAI_DEFAULT_MODEL="<Your Model name>"
FIRECRAWL_API_KEY="<YOUR_FIRECRAWL_API_KEY>"
TELEGRAM_BOT_TOKEN="<YOUR_TELEGRAM_BOT_TOKEN>"
TELEGRAM_OWNER_ID="<YOUR_TELEGRAM_OWNER_ID>"
```
