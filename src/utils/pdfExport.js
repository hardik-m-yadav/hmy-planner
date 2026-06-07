import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportTasksPDF = (tasks) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(24);
  doc.setTextColor(90, 50, 255);
  doc.text("Hmy Planner", 14, 20);

  doc.setFontSize(12);
  doc.setTextColor(120);
  doc.text(
    `Generated on ${new Date().toLocaleDateString()}`,
    14,
    28
  );

  // Stats
  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;

  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text(`Total Tasks: ${tasks.length}`, 14, 42);
  doc.text(`Completed: ${completed}`, 14, 50);
  doc.text(`Pending: ${pending}`, 14, 58);

  // Table
  autoTable(doc, {
    startY: 70,
    head: [["Task", "Date", "Priority", "Progress", "Status"]],
    body: tasks.map((task) => [
      task.subject,
      task.date || "-",
      task.priority || "Medium",
      `${task.progress}%`,
      task.completed ? "Completed" : "Pending",
    ]),
    styles: {
      fontSize: 10,
    },
    headStyles: {
      fillColor: [120, 80, 255],
    },
  });

  doc.save("HmyPlanner_Tasks_Report.pdf");
};

export const exportNotesPDF = (notes) => {
  const doc = new jsPDF();

  doc.setFontSize(24);
  doc.setTextColor(90, 50, 255);
  doc.text("Hmy Planner Notes", 14, 20);

  doc.setFontSize(12);
  doc.setTextColor(120);
  doc.text(
    `Generated on ${new Date().toLocaleDateString()}`,
    14,
    28
  );

  let y = 45;

  notes.forEach((note, index) => {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }

    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text(`${index + 1}. ${note.title}`, 14, y);

    if (note.content) {
      doc.setFontSize(10);
      doc.setTextColor(80);
      const lines = doc.splitTextToSize(note.content, 170);
      doc.text(lines, 20, y + 8);
      y += lines.length * 5 + 15;
    } else {
      y += 15;
    }
  });

  doc.save("HmyPlanner_Notes_Report.pdf");
};