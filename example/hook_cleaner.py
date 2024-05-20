import re
import argparse

def remove_import_export_statements(file_path: str, output_path: str = None) -> str:
    # Read the content of the file
    with open(file_path, 'r') as file:
        ts_code = file.read()
    
    # Regular expression patterns for import and export statements
    import_pattern = re.compile(r'^\s*import\s+.*?;\s*$', re.MULTILINE)
    export_pattern = re.compile(r'^\s*export\s*\{[^}]*\};?\s*$', re.MULTILINE)
    comment_pattern = re.compile(r'^\s*//.*$', re.MULTILINE)
    
    # Remove import statements
    ts_code = re.sub(import_pattern, '', ts_code)
    
    # Remove export statements
    ts_code = re.sub(export_pattern, '', ts_code)
    
    # Remove comment statements
    ts_code = re.sub(comment_pattern, '', ts_code)
    
    cleaned_code = ts_code.strip()
    
    # If an output path is provided, write the cleaned content to the output file
    if output_path:
        with open(output_path, 'w') as file:
            file.write(cleaned_code)
    
    return cleaned_code

def main():
    # Set up argument parser
    parser = argparse.ArgumentParser(description='Remove import and export statements from a TypeScript file.')
    parser.add_argument('input_file', type=str, help='Path to the input TypeScript file')
    parser.add_argument('output_file', type=str, nargs='?', help='Path to the output file (optional)')
    
    # Parse command-line arguments
    args = parser.parse_args()
    
    # Call the function with the provided arguments
    cleaned_code = remove_import_export_statements(args.input_file, args.output_file)
    
    # Print the cleaned code if no output file is specified
    if not args.output_file:
        print(cleaned_code)

if __name__ == '__main__':
    main()

# python3 hook_cleaner.py contracts/dist/index.js