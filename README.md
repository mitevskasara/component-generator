# Component Generator

## Overview

The **Component Generator** is a command-line tool designed to help automate the creation of reusable components in React projects. It makes the process of setting up new components easier by generating files from customizable templates. This allows developers to quickly create components with consistent structures and names, improving their workflow.

### Prerequisites

- Node.js (v12 or higher)
- NPM (Node Package Manager)

## Installation

To test drive the component generator you can clone this repository and try it out by following the steps bellow.

### 1. Clone the repository:

   ```bash
   git clone https://github.com/mitevskasara/component-generator
   ```

### 2. Setup configuration

A configuration file named <code>cg.config.json</code> is already created in the project root directory. The configuration file includes the following structure:

```json
{
  "COMPONENTS_DIR": "the path to your components folder, e.g., src/components",
  "TEMPLATE_DIR": "the path to your template folder",
  "COMPONENT_NAME_PLACEHOLDER": "The placeholder to be replaced with the actual component name in the template"
}
```

#### Example:

```json
{
  "COMPONENTS_DIR": "./src/components",
  "TEMPLATE_DIR": "./template",
  "COMPONENT_NAME_PLACEHOLDER": "COMPONENT_NAME"
}
```

### 3. Create Template Directory Structure

The <code>TEMPLATE_DIR</code> should contain your template files, which are used to generate new components. Here’s an example of how the template directory could be organized:
```javascript
template/
├── COMPONENT_NAME.js
├── COMPONENT_NAME.css
└── COMPONENT_NAME.test.js
```

You can use a different placeholder than <code>COMPONENT_NAME</code> by configuring the <code>COMPONENT_NAME_PLACEHOLDER</code> in the <code>cg.config.json</code>.
<br/>
You can also have any number of files you need and they will all be copied in the generated component in the same structure as defined in the template directory. All occurencies of <code>COMPONENT_NAME</code> inside the files will be replaced the actual component name from your input when running the script.

### 4. Run the script

To create a new component, run the following command in your terminal:

```bash
npm run create
```

You will be prompted to enter the name of the component. Upon providing the name, the generator will create the component directory and populate it with files based on the specified templates.

## License

This project is licensed under the MIT License.