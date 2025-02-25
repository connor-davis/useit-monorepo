# 🎉 Welcome to the Use-It Ecosystem Monorepo! 🎉

![GitHub repo size](https://img.shields.io/github/repo-size/connor-davis/useit-monorepo)
![GitHub top language](https://img.shields.io/github/languages/top/connor-davis/useit-monorepo)
![GitHub license](https://img.shields.io/github/license/connor-davis/useit-monorepo)
![GitHub last commit](https://img.shields.io/github/last-commit/connor-davis/useit-monorepo)

Hey there, awesome developer! Welcome to the Use-It Ecosystem Monorepo, your one-stop shop for all things Use-It. This repository is packed with multiple projects that come together to create the Use-It application. Each project is neatly organized into different packages and apps, each with its own unique role in the grand scheme of things.

## 🚀 Projects

### Apps

- **threereco-frontend**: 🌐 The frontend application built with React, TypeScript, and Vite. This is where the magic happens for the user interface of the Use-It application.
- **threereco-backend**: 🛠️ The backend application built with Node.js and Hono. This is the brain of the Use-It application, handling the API and business logic.
- **threereco-go**: ⚙️ A Go application that plays a crucial part in the Use-It system.

### Packages

- **ui**: 🎨 A shared UI component library used across the frontend application. It includes all the reusable components like buttons, inputs, forms, and more to make your UI shine.

## 🛠️ Getting Started

Ready to dive in? Follow these steps to get started with the Use-It monorepo:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/connor-davis/useit-monorepo.git
   cd useit-monorepo
   ```

2. **Install dependencies** (we highly recommend using Bun for a smoother experience):

   ```sh
   bun install
   ```

3. **Run the frontend application**:

   ```sh
   cd apps/threereco-frontend
   bun run dev
   ```

4. **Run the backend application**:

   ```sh
   cd apps/threereco-backend
   bun start
   ```

5. **Run the Go application**:
   ```sh
   cd apps/threereco-go
   go run main.go
   ```

## 📂 Project Structure

Here's a quick overview of how things are organized in this monorepo:

```
useit/
├── apps/
│   ├── threereco-frontend/
│   ├── threereco-backend/
│   └── threereco-go/
├── packages/
│   └── ui/
└── README.md
```

## 🖼️ Language Badges

Here are the languages used in this monorepo:

<table>
  <tr>
    <td align="center"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" /></td>
    <td align="center"><img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></td>
    <td align="center"><img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" /></td>
  </tr>
  <tr>
    <td align="center"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" /></td>
    <td align="center"><img src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white" alt="Go" /></td>
    <td align="center"><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></td>
  </tr>
</table>

## 🤝 Contributing

We love contributions! If you'd like to contribute, please check out the guidelines in the `CONTRIBUTING.md` file. Whether it's a bug fix, new feature, or improvement, we welcome all contributions.

## 📜 License

This project is licensed under the GPL-3.0 License. See the `LICENSE` file for more details.

## 🎉 Join the Fun!

We hope you enjoy working with the Use-It Ecosystem as much as we do. If you have any questions, feel free to reach out. Happy coding! 🚀
