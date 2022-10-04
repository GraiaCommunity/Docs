module.exports = {
  // Maximum line length
  printWidth: 100,

  // Specify the number of spaces per indentation-level
  tabWidth: 2,

  // Indent lines with tabs instead of spaces
  useTabs: false,

  // Use semicolons or not
  semi: false,

  // Use single quotes instead of double quotes
  singleQuote: true,

  // Change when properties in objects are quoted
  quoteProps: 'consistent',

  // Use single quotes instead of double quotes in JSX
  jsxSingleQuote: false,

  // Print trailing commas wherever possible when multi-line
  trailingComma: 'es5',

  // Print spaces between brackets in object literals.
  bracketSpacing: true,

  // Put the > of a multi-line HTML (HTML, JSX, Vue, Angular) element at the end of the last line instead of being alone on the next line (does not apply to self closing elements)
  bracketSameLine: false,

  // Include parentheses around a sole arrow function parameter
  arrowParens: 'always',

  // Format only a segment of a file.
  rangeStart: 0,
  rangeEnd: Infinity,

  // Prettier can restrict itself to only format files that contain a special comment, called a pragma, at the top of the file.
  requirePragma: false,

  // Prettier can insert a special @format marker at the top of files specifying that the file has been formatted with prettier.
  insertPragma: false,

  // End of line
  endOfLine: 'lf',

  // By default, Prettier will wrap markdown text as-is since some services use a line-break-sensitive renderer, e.g. GitHub comment and BitBucket.
  proseWrap: 'preserve',

  // Specify the global whitespace sensitivity for HTML files
  htmlWhitespaceSensitivity: 'css',

  // Whether or not to indent the code inside <script> and <style> tags in Vue files
  vueIndentScriptAndStyle: false,

  // Control whether Prettier formats quoted code embedded in the file
  embeddedLanguageFormatting: 'auto',
}
