## Securely     
Securely is a CLI tool that helps developers to optimize and analyze their project's security issues and performance pitfalls more efficiently.

### Installation
```bash
npm install -g securely
```

### Usage
```bash
    securely test               # Analyze your project's health
    securely audit              # Check for NPM audit vulnerabilities
    securely secure-check       # Check for security vulnerabilities
```

### Example
```bash
    securely test
    securely audit
    securely secure-check
```

### Options
```bash
    securely test --help
    securely audit --help
    securely secure-check --help
```

### License

Securely is [MIT licensed](./LICENSE).

### Contributing

Pull requests are welcome. For contributions, please create a new branch and submit a pull request for review.

Please make sure you have vite or webpack installed on your system. 
Once you have vite or webpack installed, you can run `securely` test to analyze your project's health and check for security vulnerabilities.


# Dependencies

- **ajv**: Fast JSON Schema validator for validating data structures.
- **better-ajv-errors**: Enhances AJV error messages for better readability.
- **chalk**: Library for styling terminal string output with colors.
- **cli-table3**: Easy-to-use table generation for command-line interfaces.
- **cosmiconfig**: Configuration loader for various formats (JSON, YAML, etc.).
- **debug**: Utility for enabling/disabling debug output in applications.
- **pidusage**: Retrieves CPU and memory usage of a process.
- **pkg-up**: Finds the nearest `package.json` file in the directory hierarchy.

# DevDependencies

- **@babel/parser**: Parses JavaScript code into an Abstract Syntax Tree (AST).
- **@babel/traverse**: Traverses and manipulates the AST for code analysis and transformation.


