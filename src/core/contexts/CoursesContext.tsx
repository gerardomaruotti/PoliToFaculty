import React, { createContext, useContext, ReactNode, useState } from 'react';

interface Course {
  id: number;
  title: string;
  subtitle: string;
  period: number;
}

interface Exam {
  id: number;
  subject: string;
  date: string;
  status: string;
}

interface Grade {
  subject: string;
  grade: string;
}

interface CoursesContextType {
  fakeCourses: Course[];
  fakeExams: Exam[];
  fakeGrades: Grade[];
  selectedCourse: Course | null;
  addCourse: (course: Course) => void;
  removeCourse: (courseId: number) => void;
  addExam: (exam: Exam) => void;
  removeExam: (examId: number) => void;
  addGrade: (grade: Grade) => void;
  removeGrade: (subject: string) => void;
  setSelectedCourse: (course: Course | null) => void; // Metodo per aggiornare selectedCourse
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

interface CoursesProviderProps {
  children: ReactNode;
}

export const CoursesProvider = ({ children }: CoursesProviderProps) => {
  // Stato per i corsi, esami, voti e il corso selezionato
  const [fakeCourses, setFakeCourses] = useState<Course[]>([
    { id: 1, title: 'Matematica', subtitle: 'Iscritti: 120', period: 1 },
    { id: 2, title: 'Fisica', subtitle: 'Iscritti: 95', period: 1 },
    { id: 3, title: 'Programmazione', subtitle: 'Iscritti: 210', period: 2 },
    { id: 4, title: 'Chimica', subtitle: 'Iscritti: 78', period: 2 },
  ]);

  const [fakeExams, setFakeExams] = useState<Exam[]>([
    { id: 1, subject: 'Analisi 1', date: '10 Aprile 2024', status: 'Superato' },
    { id: 2, subject: 'Fisica 1', date: '15 Aprile 2024', status: 'Non superato' },
    { id: 3, subject: 'Programmazione', date: '20 Aprile 2024', status: 'In attesa' },
  ]);

  const [fakeGrades, setFakeGrades] = useState<Grade[]>([
    { subject: 'Analisi 1', grade: '28/30' },
    { subject: 'Fisica 1', grade: '24/30' },
    { subject: 'Programmazione', grade: '30/30' },
  ]);

  // Stato per il corso selezionato
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Funzioni per aggiungere e rimuovere corsi, esami, voti
  const addCourse = (course: Course) => {
    setFakeCourses(prevCourses => [...prevCourses, course]);
  };

  const removeCourse = (courseId: number) => {
    setFakeCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
  };

  const addExam = (exam: Exam) => {
    setFakeExams(prevExams => [...prevExams, exam]);
  };

  const removeExam = (examId: number) => {
    setFakeExams(prevExams => prevExams.filter(exam => exam.id !== examId));
  };

  const addGrade = (grade: Grade) => {
    setFakeGrades(prevGrades => [...prevGrades, grade]);
  };

  const removeGrade = (subject: string) => {
    setFakeGrades(prevGrades => prevGrades.filter(grade => grade.subject !== subject));
  };

  return (
    <CoursesContext.Provider
      value={{
        fakeCourses,
        fakeExams,
        fakeGrades,
        selectedCourse,
        addCourse,
        removeCourse,
        addExam,
        removeExam,
        addGrade,
        removeGrade,
        setSelectedCourse, // Passiamo anche la funzione per modificare selectedCourse
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }
  return context;
};
