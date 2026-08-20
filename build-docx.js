const fs = require('fs');
const path = require('path');
const docx = require('docx');
const {
    Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
    PageBreak, Table, TableRow, TableCell, WidthType, BorderStyle,
    Header, Footer, PageNumber, TableOfContents, ShadingType
} = docx;

const BASE_DIR = __dirname;
const OUTPUT_DIR = path.join(BASE_DIR, 'docx');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function parseInlineFormatting(text) {
    const runs = [];
    const codeRegex = /`([^`]+)`/g;
    const boldRegex = /\*\*([^*]+)\*\*/g;
    const parts = [];
    let cursor = 0, match;
    while ((match = codeRegex.exec(text)) !== null) {
        if (match.index > cursor) parts.push({ type: 'text', content: text.slice(cursor, match.index) });
        parts.push({ type: 'code', content: match[1] });
        cursor = match.index + match[0].length;
    }
    if (cursor < text.length) parts.push({ type: 'text', content: text.slice(cursor) });
    for (const part of parts) {
        if (part.type === 'code') {
            runs.push(new TextRun({ text: part.content, font: 'Consolas', size: 18, color: 'c7254e', shading: { type: ShadingType.SOLID, color: 'f9f2f4' } }));
        } else {
            let textPart = part.content, boldCursor = 0;
            while ((match = boldRegex.exec(textPart)) !== null) {
                if (match.index > boldCursor) runs.push(new TextRun({ text: textPart.slice(boldCursor, match.index), size: 20 }));
                runs.push(new TextRun({ text: match[1], bold: true, size: 20 }));
                boldCursor = match.index + match[0].length;
            }
            if (boldCursor < textPart.length) runs.push(new TextRun({ text: textPart.slice(boldCursor), size: 20 }));
        }
    }
    if (runs.length === 0) runs.push(new TextRun({ text, size: 20 }));
    return runs;
}

function parseMarkdown(md) {
    const lines = md.split('\n');
    const elements = [];
    let inCodeBlock = false, codeLines = [], inTable = false, tableRows = [];
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim().startsWith('```')) {
            if (inCodeBlock) {
                elements.push(new Paragraph({
                    children: [new TextRun({ text: codeLines.join('\n'), font: 'Consolas', size: 16, color: '1e1e1e' })],
                    shading: { type: ShadingType.SOLID, color: 'f5f5f5' },
                    spacing: { before: 100, after: 100 },
                    border: { top: { style: BorderStyle.SINGLE, size: 1, color: 'dddddd' }, bottom: { style: BorderStyle.SINGLE, size: 1, color: 'dddddd' }, left: { style: BorderStyle.SINGLE, size: 1, color: 'dddddd' }, right: { style: BorderStyle.SINGLE, size: 1, color: 'dddddd' } }
                }));
                inCodeBlock = false; codeLines = [];
            } else { inCodeBlock = true; codeLines = []; }
            continue;
        }
        if (inCodeBlock) { codeLines.push(line); continue; }
        if (line.includes('|') && line.trim().startsWith('|')) {
            if (line.includes('---') || line.includes('===')) continue;
            tableRows.push(line.split('|').filter(c => c.trim()).map(c => c.trim()));
            inTable = true; continue;
        } else if (inTable) {
            if (tableRows.length > 0) {
                const rows = tableRows.map((cells, rowIdx) => new TableRow({
                    children: cells.map(cellText => new TableCell({
                        children: [new Paragraph({ children: [new TextRun({ text: cellText, bold: rowIdx === 0, size: 20 })] })],
                        shading: rowIdx === 0 ? { type: ShadingType.SOLID, color: 'e8e8e8' } : undefined,
                    }))
                }));
                elements.push(new Table({ rows, width: { size: 100, type: WidthType.PERCENTAGE } }));
                tableRows = [];
            }
            inTable = false;
        }
        if (line.startsWith('# ')) {
            elements.push(new Paragraph({ children: [new TextRun({ text: line.slice(2), bold: true, size: 36, color: '8B0000' })], heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 }, pageBreakBefore: true }));
        } else if (line.startsWith('## ')) {
            elements.push(new Paragraph({ children: [new TextRun({ text: line.slice(3), bold: true, size: 28, color: 'B22222' })], heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 150 } }));
        } else if (line.startsWith('### ')) {
            elements.push(new Paragraph({ children: [new TextRun({ text: line.slice(4), bold: true, size: 24, color: 'CD5C5C' })], heading: HeadingLevel.HEADING_3, spacing: { before: 200, after: 100 } }));
        } else if (line.startsWith('#### ')) {
            elements.push(new Paragraph({ children: [new TextRun({ text: line.slice(5), bold: true, size: 22, color: 'DC143C' })], heading: HeadingLevel.HEADING_4, spacing: { before: 150, after: 80 } }));
        } else if (line.trim() === '---') {
            elements.push(new Paragraph({ children: [new TextRun({ text: '─────────────────────────────────', color: 'cccccc', size: 16 })], alignment: AlignmentType.CENTER, spacing: { before: 100, after: 100 } }));
        } else if (line.trim() === '') {
            elements.push(new Paragraph({ spacing: { before: 60, after: 60 } }));
        } else {
            elements.push(new Paragraph({ children: parseInlineFormatting(line), spacing: { before: 60, after: 60 } }));
        }
    }
    if (tableRows.length > 0) {
        const rows = tableRows.map((cells, rowIdx) => new TableRow({
            children: cells.map(cellText => new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: cellText, bold: rowIdx === 0, size: 20 })] })]
            }))
        }));
        elements.push(new Table({ rows, width: { size: 100, type: WidthType.PERCENTAGE } }));
    }
    return elements;
}

async function main() {
    console.log('Building Ethical Hacking complete book...\n');
    let allElements = [];

    // === TITLE PAGE ===
    allElements.push(new Paragraph({ spacing: { before: 3000 } }));
    allElements.push(new Paragraph({
        children: [new TextRun({ text: 'ETHICAL HACKING', bold: true, size: 72, color: '8B0000' })],
        alignment: AlignmentType.CENTER, spacing: { after: 200 }
    }));
    allElements.push(new Paragraph({
        children: [new TextRun({ text: 'From Computer Basics to Advanced Cybersecurity', size: 32, color: 'B22222' })],
        alignment: AlignmentType.CENTER, spacing: { after: 100 }
    }));
    allElements.push(new Paragraph({
        children: [new TextRun({ text: 'A Practical Beginner-to-Advanced Guide Using Kali Linux & VirtualBox', size: 24, color: '7f8c8d' })],
        alignment: AlignmentType.CENTER, spacing: { after: 500 }
    }));
    allElements.push(new Paragraph({
        children: [new TextRun({ text: 'Designed by Mukamyi Izere Arcange', bold: true, size: 28, color: '8B0000' })],
        alignment: AlignmentType.CENTER, spacing: { after: 300 }
    }));
    allElements.push(new Paragraph({
        children: [new TextRun({ text: '2026 Edition', size: 24, color: '95a5a6' })],
        alignment: AlignmentType.CENTER, spacing: { after: 200 }
    }));
    allElements.push(new Paragraph({ children: [new PageBreak()] }));

    // === TABLE OF CONTENTS ===
    allElements.push(new Paragraph({
        children: [new TextRun({ text: 'Table of Contents', bold: true, size: 36, color: '8B0000' })],
        heading: HeadingLevel.HEADING_1, spacing: { after: 200 }
    }));
    allElements.push(new TableOfContents('Table of Contents', { hyperlink: true, headingStyleRange: '1-3' }));
    allElements.push(new Paragraph({ children: [new PageBreak()] }));

    // === ALL CONTENT ===
    const allFiles = [
        '00-front-matter.md',
        'level0-computer-basics.md',
        'level1-networking.md',
        'level2-linux.md',
        'level3-python.md',
        'level4-security-fundamentals.md',
        'level5-methodology.md',
        'level6-reconnaissance.md',
        'level7-enumeration.md',
        'level8-web-hacking.md',
        'level9-web-tools.md',
        'level10-exploitation.md',
        'level11-privesc.md',
        'level12-wireless.md',
        'level13-social-engineering.md',
        'level14-reverse-engineering.md',
        'level15-malware.md',
        'level16-active-directory.md',
        'level17-blue-team.md',
        'level18-advanced.md',
        'appendix-a-lab-setup.md',
        'appendix-b-troubleshooting.md',
        'appendix-c-projects.md',
        'appendix-d-glossary.md',
        'appendix-e-roadmap.md',
        'appendix-f-references.md',
    ];

    for (const file of allFiles) {
        const fullPath = path.join(BASE_DIR, file);
        if (fs.existsSync(fullPath)) {
            const md = fs.readFileSync(fullPath, 'utf-8');
            allElements.push(...parseMarkdown(md));
            console.log(`  ✓ ${file}`);
        } else {
            console.warn(`  ✗ Missing: ${file}`);
        }
    }

    // === BUILD DOCUMENT ===
    const doc = new Document({
        creator: 'Mukamyi Izere Arcange',
        title: 'Ethical Hacking: From Computer Basics to Advanced Cybersecurity',
        description: 'A Practical Beginner-to-Advanced Guide Using Kali Linux & VirtualBox',
        styles: { default: { document: { run: { font: 'Calibri', size: 20 } } } },
        sections: [{
            properties: {
                page: { margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }, size: { width: 12240, height: 15840 } }
            },
            headers: {
                default: new Header({
                    children: [new Paragraph({
                        children: [new TextRun({ text: 'Ethical Hacking — Designed by Mukamyi Izere Arcange', size: 16, color: '999999', italics: true })],
                        alignment: AlignmentType.RIGHT
                    })]
                })
            },
            footers: {
                default: new Footer({
                    children: [new Paragraph({
                        children: [
                            new TextRun({ text: 'Designed by Mukamyi Izere Arcange  |  Page ', size: 16, color: '999999' }),
                            new TextRun({ children: [PageNumber.CURRENT], size: 16, color: '999999' }),
                            new TextRun({ text: ' of ', size: 16, color: '999999' }),
                            new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: '999999' }),
                        ],
                        alignment: AlignmentType.CENTER
                    })]
                })
            },
            children: allElements,
        }],
    });

    const buffer = await Packer.toBuffer(doc);
    const outputPath = path.join(OUTPUT_DIR, 'Ethical_Hacking_Complete_Book.docx');
    fs.writeFileSync(outputPath, buffer);
    console.log(`\n✓ Complete book saved: ${outputPath}`);
    console.log(`  Size: ${(buffer.length / 1024 / 1024).toFixed(2)} MB`);
}

main().catch(console.error);
