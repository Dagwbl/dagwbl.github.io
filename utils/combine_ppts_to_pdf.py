import os
import sys
import tempfile
import shutil
from pathlib import Path


def convert_pptx_to_pdf(source_dir: Path, temp_pdf_dir: Path):
    try:
        import win32com.client  # type: ignore
    except ImportError:
        print("Error: 'pywin32' is required for PowerPoint automation.")
        sys.exit(1)

    powerpoint = win32com.client.Dispatch("PowerPoint.Application")
    powerpoint.Visible = True

    ppt_files = sorted([p for p in source_dir.glob("*.pptx")])
    if not ppt_files:
        print(f"No .pptx files found in {source_dir}")
        sys.exit(1)

    temp_pdf_dir.mkdir(parents=True, exist_ok=True)
    pdf_paths = []

    # 32 is the 'ppSaveAsPDF' format constant
    pp_save_as_pdf = 32

    try:
        for ppt_path in ppt_files:
            # Name PDF same as PPTX, in temp dir
            pdf_path = temp_pdf_dir / (ppt_path.stem + ".pdf")
            print(f"Converting: {ppt_path} -> {pdf_path}")
            presentation = powerpoint.Presentations.Open(str(ppt_path), WithWindow=False)
            presentation.SaveAs(str(pdf_path), pp_save_as_pdf)
            presentation.Close()
            pdf_paths.append(pdf_path)
    finally:
        powerpoint.Quit()

    return pdf_paths


def merge_pdfs(pdf_paths, output_pdf: Path):
    try:
        from PyPDF2 import PdfMerger, PdfReader  # type: ignore
    except ImportError:
        print("Error: 'PyPDF2' is required to merge PDFs.")
        sys.exit(1)

    merger = PdfMerger()
    current_page = 0
    for p in pdf_paths:
        # Determine number of pages to place bookmark at start of this file
        try:
            reader = PdfReader(str(p))
            num_pages = len(reader.pages)
        except Exception:
            num_pages = None

        start_page = current_page
        print(f"Appending: {p}")
        # Disable importing internal bookmarks to avoid slide-level entries
        merger.append(str(p), import_outline=False)
        # Add a top-level bookmark using the filename (stem)
        try:
            merger.add_outline_item(title=Path(p).stem, page_number=start_page)
        except Exception:
            # Fallback: skip bookmark if unsupported, continue merge
            pass
        if num_pages is not None:
            current_page += num_pages

    output_pdf.parent.mkdir(parents=True, exist_ok=True)
    print(f"Writing merged PDF: {output_pdf}")
    with open(output_pdf, "wb") as f:
        merger.write(f)
    merger.close()


def main():
    if len(sys.argv) < 3:
        print("Usage: python combine_ppts_to_pdf.py <source_dir> <output_pdf>")
        sys.exit(1)

    source_dir = Path(sys.argv[1]).resolve()
    output_pdf = Path(sys.argv[2]).resolve()

    if not source_dir.exists() or not source_dir.is_dir():
        print(f"Source directory does not exist or is not a directory: {source_dir}")
        sys.exit(1)

    temp_dir = Path(tempfile.mkdtemp(prefix="pptx2pdf_"))
    temp_pdf_dir = temp_dir / "pdfs"

    try:
        pdfs = convert_pptx_to_pdf(source_dir, temp_pdf_dir)
        merge_pdfs(pdfs, output_pdf)
        print("Done.")
        print(f"Combined PDF created at: {output_pdf}")
    finally:
        # Cleanup temporary PDFs
        try:
            shutil.rmtree(temp_dir)
        except Exception:
            pass


if __name__ == "__main__":
    main()
