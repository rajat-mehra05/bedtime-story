// PDF generation utilities

import jsPDF from 'jspdf';
import { Chapter } from '@/lib/types';
import { sanitizeFileName } from './formatting';

interface PDFConfig {
  pageWidth: number;
  pageHeight: number;
  margin: number;
  maxWidth: number;
}

export class PDFBuilder {
  private pdf: jsPDF;
  private config: PDFConfig;
  private yPosition: number;

  constructor() {
    this.pdf = new jsPDF();
    this.config = {
      pageWidth: this.pdf.internal.pageSize.getWidth(),
      pageHeight: this.pdf.internal.pageSize.getHeight(),
      margin: 20,
      maxWidth: 0,
    };
    this.config.maxWidth = this.config.pageWidth - 2 * this.config.margin;
    this.yPosition = this.config.margin;
  }

  addText(text: string, fontSize: number, isBold: boolean = false): void {
    this.pdf.setFontSize(fontSize);
    if (isBold) {
      this.pdf.setFont('helvetica', 'bold');
    } else {
      this.pdf.setFont('helvetica', 'normal');
    }

    const lines = this.pdf.splitTextToSize(text, this.config.maxWidth);

    lines.forEach((line: string) => {
      if (this.yPosition > this.config.pageHeight - this.config.margin) {
        this.addPage();
      }
      this.pdf.text(line, this.config.margin, this.yPosition);
      this.yPosition += fontSize * 0.5;
    });

    this.yPosition += 10; // Extra spacing after paragraph
  }

  addPage(): void {
    this.pdf.addPage();
    this.yPosition = this.config.margin;
  }

  addTitlePage(title: string): void {
    this.pdf.setFontSize(24);
    this.pdf.setFont('helvetica', 'bold');
    const titleLines = this.pdf.splitTextToSize(title, this.config.maxWidth);
    const titleHeight = titleLines.length * 12;
    this.pdf.text(
      titleLines,
      this.config.pageWidth / 2,
      this.config.pageHeight / 2 - titleHeight / 2,
      { align: 'center' }
    );

    // Add decorative elements
    this.pdf.setFontSize(40);
    this.pdf.text('✨', this.config.pageWidth / 2 - 10, this.config.pageHeight / 2 - 40, {
      align: 'center',
    });
    this.pdf.text('🌙', this.config.pageWidth / 2 - 10, this.config.pageHeight / 2 + 40, {
      align: 'center',
    });

    this.addPage();
  }

  addChapter(chapter: Chapter, isLastChapter: boolean = false): void {
    // Chapter number
    this.addText(`Chapter ${chapter.chapterNumber}`, 12, true);

    // Chapter title
    this.addText(chapter.title, 16, true);

    // Chapter content
    this.addText(chapter.content, 11, false);

    // Add space between chapters
    this.yPosition += 10;

    // Add page break after each chapter except the last
    if (!isLastChapter) {
      this.addPage();
    }
  }

  addHappyEnding(happyEnding: string): void {
    if (this.yPosition > this.config.pageHeight - 100) {
      this.addPage();
    }

    this.yPosition += 20;
    this.addText('✨ The End ✨', 16, true);
    this.addText(happyEnding, 12, false);
  }

  save(filename: string): void {
    const sanitized = sanitizeFileName(filename);
    this.pdf.save(`${sanitized}.pdf`);
  }
}

export const generateStoryPDF = (
  title: string,
  chapters: Chapter[],
  happyEnding?: string
): void => {
  const builder = new PDFBuilder();

  // Add title page
  builder.addTitlePage(title);

  // Add chapters
  chapters.forEach((chapter, index) => {
    builder.addChapter(chapter, index === chapters.length - 1);
  });

  // Add happy ending if exists
  if (happyEnding) {
    builder.addHappyEnding(happyEnding);
  }

  // Save the PDF
  builder.save(title);
};

