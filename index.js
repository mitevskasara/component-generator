const fs = require('fs');
const path = require('path');
const readline = require('readline');

/**
 * Reads and parses the JSON configuration file located at the project root.
 *
 * This function performs the following steps:
 * 1. Constructs the path to the configuration file, `cg.config.json`, using the current working directory.
 * 2. Checks if the configuration file exists. If the file is not found, it logs an error message to the console,
 *    detailing the necessary structure of the configuration file and the expected paths for the `COMPONENTS_DIR` 
 *    and `TEMPLATE_DIR` properties. The process then exits with a failure code (1).
 * 3. If the file exists, it attempts to read the file's content and parse it as JSON. If any error occurs during 
 *    reading or parsing (e.g., file format issues), it logs the error message to the console and exits the process 
 *    with a failure code (1).
 *
 * @returns {Object} The parsed configuration object containing the component and template directory paths.
 */
const readConfig = () => {
  const configPath = path.resolve(process.cwd(), 'cg.config.json');

  if (!fs.existsSync(configPath)) {
    console.error(`
  ❌ Config file not found!
  Please create a "cg.config.json" in your project root directory and add the following config:
  
  {
    "COMPONENTS_DIR": "the path to your components folder, e.g., src/components",
    "TEMPLATE_DIR": "the path to your template folder",
    COMPONENT_NAME_PLACEHOLDER: "The placeholder to be replaced with the actual component name in the template"
  }

  Example:
    "COMPONENTS_DIR": "./src/components",
    "TEMPLATE_DIR": "./templates",
    COMPONENT_NAME_PLACEHOLDER: "COMPONENT_NAME"
`);
    process.exit(1);
  }

  try {
    const configFile = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(configFile);
  } catch (error) {
    console.error('Error reading the config file:', error);
    process.exit(1);
  }
};

/**
 * Initializes a readline interface for capturing user input.
 *
 * This readline interface enables interactive communication with the user by reading input from the 
 * standard input stream (stdin) and displaying prompts or messages to the standard output stream (stdout).
 * It is specifically utilized to gather the user's input, such as the name of a component, directly from 
 * the terminal.
 *
 * @type {readline.Interface} 
 * An instance of the readline interface that facilitates the management of user input and output.
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Creates a new component directory and populates it with files based on predefined templates.
 *
 * This function performs the following steps:
 * 1. Reads the configuration settings to determine the component and template directories.
 * 2. Constructs the path for the new component directory using the provided `componentName` and the 
 *    configured components directory.
 * 3. Ensures that the component directory exists, creating it if it does not (no error is thrown if it 
 *    already exists).
 * 4. Reads all template files from the specified template directory.
 * 5. Iterates over each template file, replacing occurrences of the placeholder `COMPONENT_NAME` 
 *    with the actual `componentName`.
 * 6. Writes the processed content to new files in the component directory, overwriting any existing files 
 *    with the same name.
 *
 * Upon successful creation or update of the component, a confirmation message is logged to the console.
 *
 * @param {string} componentName - The name of the component to be created or updated.
 */
const createComponent = (componentName) => {
  const config = readConfig();

  const componentDir = path.join(__dirname, config.COMPONENTS_DIR, componentName);
  const templateDir = path.join(__dirname, config.TEMPLATE_DIR);
  const placeholder = config.COMPONENT_NAME_PLACEHOLDER;

  fs.mkdirSync(componentDir, { recursive: true });

  const templateFiles = fs.readdirSync(templateDir);

  templateFiles.forEach((file) => {
    const templateFilePath = path.join(templateDir, file);
    const componentFilePath = path.join(componentDir, file.replace(placeholder, componentName));

    const templateContent = fs.readFileSync(templateFilePath, 'utf-8');

    const componentContent = templateContent.replace(new RegExp(placeholder, 'g'), componentName);

    fs.writeFileSync(componentFilePath, componentContent);
  });

  console.log(`Component ${componentName} created/updated successfully!`);
};

/**
 * Prompts the user to enter the name of the component to be created.
 * Upon receiving the input, it calls the `createComponent` function with 
 * the specified component name to initiate the component creation process. 
 * Finally, it closes the readline interface to terminate user input.
 */
rl.question('Enter the component name: ', (componentName) => {
  createComponent(componentName);
  rl.close();
});
