import React, { createContext, useContext, ReactNode, useState } from 'react';

interface File {
  id: number;
  name: string;
  type: 'file' | 'directory'; // Indica se è un file o una directory
  files?: File[]; // Se è una directory, può contenere altri file
}

interface Notice {
  id: number;
  title : string; 
  content: string;
  date: string;
}

interface Assign {
  id : number;
  content : string;
  date : string;
}

interface Staff {
  id : number;
  name : string;
  role : string;
}

interface ExamCall {
  id: number;
  name: string;
  date: string;
  professor: string;
}
interface Course {
  id: number;
  title: string;
  subtitle: string;
  period: number;
  registered : number;
  teacherId: string;
  year: string;
  cfu: number;
  files: File[]; // Aggiungiamo i file al corso
  notices: Notice[]; // Aggiungiamo le notifiche per ogni corso
  assignments : Assign[];
  staff : Staff[];
  examcalls : ExamCall[];
  guide : string; 
}

interface Exam {
  id: number;
  subject: string;
  date: string;
  status: string;
}


interface CoursesContextType {
  fakeCourses: Course[];
  managedCourses: Course[];
  fakeExams: Exam[];
  selectedCourse: Course | null;
  addCourse: (course: Course) => void;
  removeCourse: (courseId: number) => void;
  addManagedCourse: (course: Course) => void;
  removeManagedCourse: (courseId: number) => void;
  addExam: (exam: Exam) => void;
  removeExam: (examId: number) => void;
  setSelectedCourse: (course: Course | null) => void;
  addNoticeToCourse: (courseId: number, notice: Notice) => void; // Funzione per aggiungere una notifica
  removeNoticeFromCourse: (courseId: number, noticeId: number) => void; // Funzione per rimuovere una notifica
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

interface CoursesProviderProps {
  children: ReactNode;
}

export const CoursesProvider = ({ children }: CoursesProviderProps) => {
  // Stato per i corsi, esami e appelli d'esame
  const [fakeCourses, setFakeCourses] = useState<Course[]>([
    {
      id: 1,
      title: 'Matematica',
      subtitle: 'Iscritti: 120',
      period: 1,
      registered : 120,
      teacherId: 'Prof. Rossi',
      year: '2023/2024',
      cfu: 6,
      files: [
        { id: 1, name: 'Appunti lezioni', type: 'file' },
        { id: 2, name: 'Esercizi', type: 'directory', files: [{ id: 3, name: 'Esercizio 1', type: 'file' }, { id: 4, name: 'Esercizio 2', type: 'file' }] }
      ],
      notices: [
        { id: 1, title : "Avviso" ,content: 'Esame di Matematica rinviato al 20 Aprile.', date: '2024-04-10' },
        { id: 2,  title : "Avviso" ,content: 'Lezione di Matematica sospesa per il ponte del 1 Maggio.', date: '2024-04-25' }
      ],
      assignments: [
        { id: 1, content: 'Esame di F rinviato al 20 Aprile.', date: '2024-04-10' },
        { id: 2, content: 'Lezione di Matematica sospesa per il ponte del 1 Maggio.', date: '2024-04-25' }
      ],
      staff : [
        {id : 1, name : "Tu", role: "Titolare"},
        {id : 2, name : "Mario Rossi", role: "Collaboratore"}
      ],
      examcalls : [
        {id : 1, name : "Matematica", date: '2024-04-10', professor : "Tu" },
        {id : 2, name : "Matematica", date: '2024-05-10', professor : "Tu" }
      ],
      guide: "this is the course guide"
    },
    {
      id: 2,
      title: 'Fisica',
      subtitle: 'Iscritti: 95',
      period: 1,
      registered : 95,
      teacherId: 'Prof. Bianchi',
      year: '2023/2024',
      cfu: 8,
      files: [
        { id: 1, name: 'Teoria', type: 'file' },
        { id: 2, name: 'Laboratorio', type: 'directory', files: [{ id: 3, name: 'Report laboratorio 1', type: 'file' }] }
      ],
      notices: [
        { id: 1, title : "Avviso" , content: 'Esame di Fisica annullato per problemi tecnici.', date: '2024-04-15' }
      ],
      assignments: [
        { id: 1, content: 'Esame di Matematica rinviato al 20 Aprile.', date: '2024-04-10' },
        { id: 2, content: 'Lezione di Matematica sospesa per il ponte del 1 Maggio.', date: '2024-04-25' }
      ],
      staff : [
        {id : 1, name : "Tu", role: "Titolare"},
        {id : 2, name : "Mario Rossi", role: "Collaboratore"}
      ],
      examcalls : [
        {id : 1, name : "Fisica", date: '2024-04-10', professor : "Tu" },
        {id : 2, name : "Fisica", date: '2024-05-10', professor : "Tu" }
      ],
      guide: "this is the course guide"
    },
    {
      id: 3,
      title: 'Programmazione',
      subtitle: 'Iscritti: 210',
      period: 2,
      registered : 210,
      teacherId: 'Prof. Verdi',
      year: '2023/2024',
      cfu: 9,
      files: [
        { id: 1, name: 'Introduzione alla programmazione', type: 'file' },
        { id: 2, name: 'Esercizi pratici', type: 'directory', files: [{ id: 3, name: 'Esercizio 1', type: 'file' }, { id: 4, name: 'Esercizio 2', type: 'file' }] }
      ],
      notices: [
        { id: 1,  title : "Avviso" ,content: 'Nuove esercitazioni caricate sulla piattaforma.', date: '2024-03-30' }
      ],
      assignments: [
        { id: 1, content: 'Esame di Matematica rinviato al 20 Aprile.', date: '2024-04-10' },
        { id: 2, content: 'Lezione di Matematica sospesa per il ponte del 1 Maggio.', date: '2024-04-25' }
      ],
      staff : [
        {id : 1, name : "Tu", role: "Titolare"},
        {id : 2, name : "Mario Rossi", role: "Collaboratore"}
      ],
      examcalls : [
        {id : 1, name : "Programmazione", date: '2024-04-10', professor : "Tu" },
        {id : 2, name : "Programmazione", date: '2024-05-10', professor : "Tu" }
      ],
      guide: "this is the course guide"
    },
    {
      id: 4,
      title: 'Chimica',
      subtitle: 'Iscritti: 78',
      period: 2,
      registered : 78,
      teacherId: 'Prof. Neri',
      year: '2023/2024',
      cfu: 6,
      files: [
        { id: 1, name: 'Lezione 1', type: 'file' },
        { id: 2, name: 'Laboratorio', type: 'directory', files: [{ id: 3, name: 'Report laboratorio 1', type: 'file' }] }
      ],
      notices: [
        { id: 1,  title : "Avviso" ,content: 'Aggiornamenti sul laboratorio di Chimica disponibili.', date: '2024-04-01' }
      ],
      assignments: [
        { id: 1, content: 'Esame di Matematica rinviato al 20 Aprile.', date: '2024-04-10' },
        { id: 2, content: 'Lezione di Matematica sospesa per il ponte del 1 Maggio.', date: '2024-04-25' }
      ],
      staff : [
        {id : 1, name : "Tu", role: "Titolare"},
        {id : 2, name : "Mario Rossi", role: "Collaboratore"}
      ],
      examcalls : [
        {id : 1, name : "Chimica", date: '2024-04-10', professor : "Tu" },
        {id : 2, name : "Chimica", date: '2024-05-10', professor : "Tu" }
      ],
      guide: "this is the course guide"
    }
  ]);

  const [managedCourses, setManagedCourses] = useState<Course[]>([
    {
      id: 5,
      title: 'Informatica Teorica',
      subtitle: 'Gestito da te',
      period: 1,
      registered : 120,
      teacherId: 'Prof. Gialli',
      year: '2023/2024',
      cfu: 6,
      files: [
        { id: 1, name: 'Teoria', type: 'file' },
        { id: 2, name: 'Esercizi pratici', type: 'directory', files: [{ id: 3, name: 'Esercizio 1', type: 'file' }] }
      ],
      notices: [
        { id: 1,  title : "Avviso" ,content: 'Rinviato il test di Informatica Teorica.', date: '2024-03-28' }
      ],
      assignments: [
        { id: 1, content: 'Esame di Matematica rinviato al 20 Aprile.', date: '2024-04-10' },
        { id: 2, content: 'Lezione di Matematica sospesa per il ponte del 1 Maggio.', date: '2024-04-25' }
      ],
      staff : [
        {id : 1, name : "Tu", role: "Titolare"},
        {id : 2, name : "Mario Rossi", role: "Collaboratore"}
      ],
      examcalls : [
        {id : 1, name : "Informatica Teorica", date: '2024-04-10', professor : "Tu" },
        {id : 2, name : "Informatica Teorica", date: '2024-05-10', professor : "Tu" }
      ],
      guide: "this is the course guide"
    },
    {
      id: 6,
      title: 'Intelligenza Artificiale',
      subtitle: 'Gestito da te',
      period: 2,
      registered : 95,
      teacherId: 'Prof. Blu',
      year: '2023/2024',
      cfu: 9,
      files: [
        { id: 1, name: 'Teoria IA', type: 'file' },
        { id: 2, name: 'Laboratorio IA', type: 'directory', files: [{ id: 3, name: 'Progetto IA', type: 'file' }] }
      ],
      notices: [
        { id: 1, title : "Avviso" , content: 'Prolungato il termine per la consegna del progetto.', date: '2024-04-02' }
      ],
      assignments: [
        { id: 1, content: 'Esame di Matematica rinviato al 20 Aprile.', date: '2024-04-10' },
        { id: 2, content: 'Lezione di Matematica sospesa per il ponte del 1 Maggio.', date: '2024-04-25' }
      ],
      staff : [
        {id : 1, name : "Tu", role: "Titolare"},
        {id : 2, name : "Mario Rossi", role: "Collaboratore"}
      ],
      examcalls : [
        {id : 1, name : "Intelligenza Artificiale", date: '2024-04-10', professor : "Tu" },
        {id : 2, name : "Intelligenza Artificiale", date: '2024-05-10', professor : "Tu" }
      ],
      guide: "this is the course guide"
    }
  ]);

  const [fakeExams, setFakeExams] = useState<Exam[]>([
    { id: 1, subject: 'Analisi 1', date: '10 Aprile 2024', status: 'Superato' },
    { id: 2, subject: 'Fisica 1', date: '15 Aprile 2024', status: 'Non superato' },
    { id: 3, subject: 'Programmazione', date: '20 Aprile 2024', status: 'In attesa' }
  ]);

  

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Funzioni per aggiungere e rimuovere corsi, esami, appelli d'esame
  const addCourse = (course: Course) => {
    setFakeCourses(prevCourses => [...prevCourses, course]);
  };

  const removeCourse = (courseId: number) => {
    setFakeCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
  };

  const addManagedCourse = (course: Course) => {
    setManagedCourses(prevCourses => [...prevCourses, course]);
  };

  const removeManagedCourse = (courseId: number) => {
    setManagedCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
  };

  const addExam = (exam: Exam) => {
    setFakeExams(prevExams => [...prevExams, exam]);
  };

  const removeExam = (examId: number) => {
    setFakeExams(prevExams => prevExams.filter(exam => exam.id !== examId));
  };

  

  // Funzioni per aggiungere e rimuovere notifiche
  const addNoticeToCourse = (courseId: number, notice: Notice) => {
    setFakeCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId
          ? { ...course, notices: [...course.notices, notice] }
          : course
      )
    );
  };

  const removeNoticeFromCourse = (courseId: number, noticeId: number) => {
    setFakeCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === courseId
          ? { ...course, notices: course.notices.filter(notice => notice.id !== noticeId) }
          : course
      )
    );
  };

  return (
    <CoursesContext.Provider
      value={{
        fakeCourses,
        managedCourses,
        fakeExams,
        selectedCourse,
        addCourse,
        removeCourse,
        addManagedCourse,
        removeManagedCourse,
        addExam,
        removeExam,
        setSelectedCourse,
        addNoticeToCourse,
        removeNoticeFromCourse
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
