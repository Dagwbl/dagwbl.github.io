"""
Script to rename assignment output files with unified naming convention.
Format: CourseName_AssignmentNo_StudentName_StudentID.pdf
"""

import yaml
import json
from pathlib import Path
import shutil
import sys


def read_metadata(metadata_path):
    """Read course and student information from _metadata.yml"""
    with open(metadata_path, 'r', encoding='utf-8') as f:
        metadata = yaml.safe_load(f)
    return metadata


def sanitize_filename(text):
    """Remove or replace characters that are not suitable for filenames"""
    # Replace spaces with underscores
    text = text.replace(' ', '_')
    # Remove special characters
    invalid_chars = '<>:"/\\|?*'
    for char in invalid_chars:
        text = text.replace(char, '')
    return text


def rename_output_file(rendered_file_path):
    r"""
    Rename the output file based on metadata and folder structure.
    
    Args:
        rendered_file_path: Path to the rendered file (e.g., 'D:\UA\Winter-2026\CIV-E-665\Assignment-2\index.pdf')
    """
    rendered_path = Path(rendered_file_path)
    
    if not rendered_path.exists():
        print(f"Error: Rendered file not found: {rendered_path}")
        return False
    
    # Get assignment folder (parent directory of rendered file)
    assignment_path = rendered_path.parent
    
    # Find _quarto.yml in the root directory (2 levels up from assignment folder)
    root_path = assignment_path.parent.parent
    quarto_path = root_path / '_quarto.yml'
    
    if not quarto_path.exists():
        print(f"Error: _quarto.yml not found at {quarto_path}")
        return False
    
    # Read metadata
    try:
        quarto_config = read_metadata(quarto_path)
    except Exception as e:
        print(f"Error reading metadata: {e}")
        return False
    
    # Extract information
    course_folder_name = assignment_path.parent.name  # e.g., 'CIV-E-665'
    course_name = quarto_config.get('courses', {}).get(course_folder_name, course_folder_name)
    assignment_no = assignment_path.name  # e.g., 'Assignment-2'
    student_name = quarto_config.get('student', {}).get('name', 'UNKNOWN')
    student_id = quarto_config.get('student', {}).get('id', 'UNKNOWN')
    
    # Sanitize all components
    course_name = sanitize_filename(course_name)
    assignment_no = sanitize_filename(assignment_no)
    student_name = sanitize_filename(student_name)
    student_id = sanitize_filename(str(student_id))
    
    # Get file extension from rendered file
    file_ext = rendered_path.suffix
    
    # Create new filename
    new_filename = f"{course_name}_{assignment_no}_{student_name}_{student_id}{file_ext}"
    new_path = assignment_path / new_filename
    
    # Rename the file
    try:
        shutil.move(str(rendered_path), str(new_path))
        print(f"Successfully renamed:")
        print(f"  From: {rendered_path.name}")
        print(f"  To:   {new_filename}")
        print(f"  Path: {new_path}")
        return True
    except Exception as e:
        print(f"Error renaming file: {e}")
        return False


def find_latest_pdf(search_path):
    """Find the most recently modified PDF file in the given path (within 1 minute)"""
    import time
    
    pdf_files = list(Path(search_path).rglob('*.pdf'))
    if not pdf_files:
        return None
    
    # Get current time
    current_time = time.time()
    
    # Filter PDFs modified within the last 60 seconds
    recent_pdfs = [p for p in pdf_files if (current_time - p.stat().st_mtime) < 60]
    
    if not recent_pdfs:
        return None
    
    # Get the most recently modified PDF
    latest_pdf = max(recent_pdfs, key=lambda p: p.stat().st_mtime)
    return latest_pdf


def main():
    """Main function to handle input from Quarto post-render"""
    import select
    import os
    
    # Check if there's data available on stdin (non-blocking)
    # On Windows, select doesn't work with stdin, so we check if stdin is a TTY
    has_stdin_input = not sys.stdin.isatty()
    
    files = []
    
    if has_stdin_input:
        # Try to read JSON input from stdin
        try:
            input_data = json.load(sys.stdin)
            
            # Extract files from the input
            files = input_data.get('files', [])
            if not files:
                # Try alternative structure
                output_file = input_data.get('output')
                if output_file:
                    files = [output_file]
            
            if not files:
                print("Warning: No rendered file found in JSON input")
                print(f"Received input: {json.dumps(input_data, indent=2)}")
                
        except json.JSONDecodeError as e:
            print(f"Warning: Could not parse JSON from stdin: {e}")
    
    # Fallback: use command line arguments
    if not files and len(sys.argv) > 1:
        files = sys.argv[1:]
    
    # Final fallback: search for the most recently modified PDF in current directory
    if not files:
        cwd = Path.cwd()
        print(f"Searching for recently modified PDF files in: {cwd}")
        
        # Look for PDF files in course assignment folders
        latest_pdf = find_latest_pdf(cwd)
        
        if latest_pdf:
            print(f"Found latest PDF: {latest_pdf}")
            files = [str(latest_pdf)]
        else:
            print("Error: No PDF files found")
            exit(1)
    
    success_count = 0
    for rendered_file in files:
        print(f"\nRenaming rendered file: {rendered_file}")
        if rename_output_file(rendered_file):
            success_count += 1
    
    if success_count == len(files):
        print(f"\n[SUCCESS] All {success_count} file(s) renamed successfully!")
    else:
        print(f"\n[WARNING] {success_count}/{len(files)} file(s) renamed successfully.")
        exit(1)


if __name__ == '__main__':
    main()