/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  onSnapshot, 
  query, 
  where, 
  serverTimestamp, 
  increment,
  updateDoc,
  arrayUnion
} from 'firebase/firestore';
import { db } from './lib/firebase';
import { CHAPTERS } from './constants';
import { 
  Chapter, 
  Activity, 
  Student, 
  Teacher, 
  Batch, 
  StudentProgress 
} from './types';
import { cn, getFormattedDate, getTimeAgo, handleFirestoreError, OperationType } from './lib/utils';
import { 
  LogOut, 
  Flame, 
  Star, 
  BookOpen, 
  CheckCircle, 
  ChevronRight, 
  ArrowLeft,
  Search,
  Plus,
  Users,
  BarChart3,
  Copy,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Components ---

const Button = ({ 
  children, 
  className, 
  variant = 'primary', 
  onClick, 
  disabled,
  type = 'button'
}: { 
  children: React.ReactNode; 
  className?: string; 
  variant?: 'primary' | 'secondary' | 'student' | 'teacher' | 'ghost' | 'success' | 'error';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
}) => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-opacity-90',
    secondary: 'bg-white border border-border text-gray-700 hover:bg-gray-50',
    student: 'bg-accent-student text-primary font-black hover:bg-opacity-90',
    teacher: 'bg-accent-teacher text-white hover:bg-opacity-90',
    ghost: 'hover:bg-gray-100 text-gray-600',
    success: 'bg-success text-white hover:bg-opacity-90',
    error: 'bg-error text-white hover:bg-opacity-90',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'px-6 py-3 rounded-xl font-bold flex items-center justify-center transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100',
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
};

const Card = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void, key?: React.Key }) => (
  <div 
    onClick={onClick}
    className={cn(
      'bg-card rounded-2xl border border-border shadow-sm overflow-hidden',
      onClick && 'cursor-pointer hover:border-primary transition-colors',
      className
    )}
  >
    {children}
  </div>
);

// --- App Logic ---

export default function App() {
  const [view, setView] = useState<'landing' | 'student-login' | 'teacher-login' | 'teacher-register' | 'student-dashboard' | 'teacher-dashboard' | 'chapter-view' | 'activity-view' | 'student-progress' | 'student-profile' | 'teacher-overview' | 'teacher-profile'>('landing');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [userType, setUserType] = useState<'student' | 'teacher' | null>(null);
  const [session, setSession] = useState<{ batchCode?: string; name?: string; teacherCode?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Student Data
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [progress, setProgress] = useState<StudentProgress>({});
  
  // Teacher Data
  const [batches, setBatches] = useState<(Batch & { studentCount: number; totalStars: number })[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [batchStudents, setBatchStudents] = useState<Student[]>([]);
  
  // Navigation State
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  useEffect(() => {
    // Seed teacher codes if necessary (Demo only)
    const seed = async () => {
      const t1 = await getDoc(doc(db, 'teachers', 'TCH-001'));
      if (!t1.exists()) {
        await setDoc(doc(db, 'teachers', 'TCH-001'), { name: 'Dr. Karima', batches: [] });
        await setDoc(doc(db, 'teachers', 'TCH-002'), { name: 'Mr. Rafiq', batches: [] });
      }
    };
    seed();

    // Restore Session
    const savedSession = localStorage.getItem('sej_session');
    if (savedSession) {
      const parsed = JSON.parse(savedSession);
      setSession(parsed);
      if (parsed.teacherCode) {
        setUserType('teacher');
        setView('teacher-dashboard');
      } else {
        setUserType('student');
        setView('student-dashboard');
      }
    }
    setLoading(false);
  }, []);

  // Sync Student Data
  useEffect(() => {
    if (userType === 'student' && session?.batchCode && session?.name) {
      const studentId = session.name; // Simplified ID as per requirement
      const studentRef = doc(db, 'batches', session.batchCode, 'students', studentId);
      
      const unsub = onSnapshot(studentRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data() as Student;
          setCurrentStudent(data);
          
          // Update streak logic
          const today = new Date().toISOString().split('T')[0];
          if (data.lastActivityDate !== today) {
            // Check if it was yesterday
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            
            if (data.lastActivityDate !== yesterdayStr && data.lastActivityDate) {
              // Streak broken
              updateDoc(studentRef, { streak: 0 });
            }
          }
        }
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, `batches/${session.batchCode}/students/${studentId}`);
      });

      // Sync Progress
      const progressQuery = collection(db, 'batches', session.batchCode, 'students', studentId, 'progress');
      const unsubProgress = onSnapshot(progressQuery, (snapshot) => {
        const newProgress: StudentProgress = {};
        snapshot.forEach(doc => {
          newProgress[doc.id] = doc.data() as any;
        });
        setProgress(newProgress);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, `batches/${session.batchCode}/students/${studentId}/progress`);
      });

      return () => { unsub(); unsubProgress(); };
    }
  }, [userType, session]);

  // Sync Teacher Data
  useEffect(() => {
    if (userType === 'teacher' && session?.teacherCode) {
      const teacherRef = doc(db, 'teachers', session.teacherCode);
      const unsub = onSnapshot(teacherRef, async (snapshot) => {
        if (snapshot.exists()) {
          const teacherData = snapshot.data() as Teacher;
          const batchCodes = teacherData.batches || [];
          
          const batchDataPromises = batchCodes.map(async (code) => {
            try {
              const bDoc = await getDoc(doc(db, 'batches', code));
              const studentsSnap = await getDocs(collection(db, 'batches', code, 'students'));
              
              let totalStars = 0;
              const students: Student[] = [];
              
              for (const sDoc of studentsSnap.docs) {
                const sData = sDoc.data() as Student;
                students.push(sData);
                const pSnap = await getDocs(collection(db, 'batches', code, 'students', sDoc.id, 'progress'));
                pSnap.forEach(pDoc => {
                  const pData = pDoc.data();
                  Object.values(pData).forEach(val => { if (val === true) totalStars++; });
                });
              }

              return {
                batchCode: code,
                teacherId: session.teacherCode!,
                createdAt: bDoc.exists() ? bDoc.data().createdAt : Date.now(),
                studentCount: studentsSnap.size,
                totalStars
              };
            } catch (e) {
              handleFirestoreError(e, OperationType.GET, `batches/${code}`);
              return null;
            }
          });

          const results = (await Promise.all(batchDataPromises)).filter(b => b !== null) as any[];
          setBatches(results);
          if (results.length > 0 && !selectedBatch) {
            setSelectedBatch(results[0].batchCode);
          }
        }
      }, (error) => {
        handleFirestoreError(error, OperationType.GET, `teachers/${session.teacherCode}`);
      });
      return unsub;
    }
  }, [userType, session]);

  // Sync Batch Students
  useEffect(() => {
    if (selectedBatch && userType === 'teacher') {
      const unsub = onSnapshot(collection(db, 'batches', selectedBatch, 'students'), (snapshot) => {
        const students: Student[] = [];
        snapshot.forEach(doc => students.push(doc.data() as Student));
        setBatchStudents(students);
      }, (error) => {
        handleFirestoreError(error, OperationType.LIST, `batches/${selectedBatch}/students`);
      });
      return unsub;
    }
  }, [selectedBatch, userType]);

  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: { type: 'student' | 'teacher', code: string, name: string }) => {
    setLoading(true);
    setError(null);
    try {
      if (data.type === 'student') {
        const batchRef = doc(db, 'batches', data.code);
        const batchSnap = await getDoc(batchRef);
        if (!batchSnap.exists()) {
          setError("This batch code is not recognised. Please ask your teacher.");
          setLoading(false);
          return;
        }

        const studentId = data.name;
        const studentRef = doc(db, 'batches', data.code, 'students', studentId);
        const studentSnap = await getDoc(studentRef);

        if (!studentSnap.exists()) {
          await setDoc(studentRef, {
            name: data.name,
            batchCode: data.code,
            joinedAt: Date.now(),
            lastActive: Date.now(),
            streak: 0,
            lastActivityDate: ''
          });
        } else {
          await updateDoc(studentRef, { lastActive: Date.now() });
        }

        const newSession = { batchCode: data.code, name: data.name };
        localStorage.setItem('sej_session', JSON.stringify(newSession));
        setSession(newSession);
        setUserType('student');
        setView('student-dashboard');
      } else {
        const teacherRef = doc(db, 'teachers', data.code);
        const teacherSnap = await getDoc(teacherRef);
        if (!teacherSnap.exists()) {
          setError("Teacher code not recognised. Please contact the programme coordinator.");
          setLoading(false);
          return;
        }

        const newSession = { teacherCode: data.code, name: data.name };
        localStorage.setItem('sej_session', JSON.stringify(newSession));
        setSession(newSession);
        setUserType('teacher');
        setView('teacher-dashboard');
      }
    } catch (e) {
      console.error(e);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (name: string, customCode: string) => {
    setLoading(true);
    setError(null);
    try {
      const teacherId = customCode.trim().toUpperCase();
      
      if (!teacherId) {
        setError("Please enter a valid teacher code.");
        setLoading(false);
        return;
      }

      const teacherRef = doc(db, 'teachers', teacherId);
      const teacherSnap = await getDoc(teacherRef);

      if (teacherSnap.exists()) {
        setError("This teacher code is already taken. Please try another one.");
        setLoading(false);
        return;
      }

      await setDoc(teacherRef, {
        name,
        teacherCode: teacherId,
        batches: []
      });
      
      const newSession = { teacherCode: teacherId, name };
      localStorage.setItem('sej_session', JSON.stringify(newSession));
      setSession(newSession);
      setUserType('teacher');
      setView('teacher-dashboard');
      setSuccessMessage(`Welcome! Your teacher code is ${teacherId}`);
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (e) {
      console.error(e);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sej_session');
    setSession(null);
    setUserType(null);
    setView('landing');
  };

  const markActivityDone = async (chapterId: string, activityId: string) => {
    if (!currentStudent || !session?.batchCode) return;
    
    const today = new Date().toISOString().split('T')[0];
    const studentRef = doc(db, 'batches', session.batchCode, 'students', currentStudent.name);
    const progressRef = doc(db, 'batches', session.batchCode, 'students', currentStudent.name, 'progress', chapterId);
    
    try {
      await setDoc(progressRef, { [activityId]: true }, { merge: true });
      
      // Update streak and activity date
      const updates: any = { 
        lastActive: Date.now(),
        lastActivityDate: today
      };

      if (currentStudent.lastActivityDate !== today) {
        updates.streak = increment(1);
      }

      await updateDoc(studentRef, updates);
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `batches/${session.batchCode}/students/${currentStudent.name}/progress/${chapterId}`);
    }
  };

  const createBatch = async (code: string) => {
    if (!session?.teacherCode) return;
    try {
      const batchRef = doc(db, 'batches', code);
      await setDoc(batchRef, { createdAt: Date.now(), teacherId: session.teacherCode });
      const teacherRef = doc(db, 'teachers', session.teacherCode);
      await updateDoc(teacherRef, { batches: arrayUnion(code) });
      setSuccessMessage(`Batch ${code} created successfully!`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (e) {
      console.error(e);
      setError("Failed to create batch. Please try a different code.");
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center font-bold text-primary">Loading...</div>;

  return (
    <div className="min-h-screen bg-bg-base flex flex-col max-w-md mx-auto relative shadow-2xl">
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <LandingScreen key="landing" onStart={(type) => { setView(type === 'student' ? 'student-login' : 'teacher-login'); }} />
        )}

        {view === 'student-login' && (
          <LoginScreen 
            key="s-login"
            type="student" 
            onBack={() => setView('landing')} 
            onSubmit={(code, name) => handleLogin({ type: 'student', code, name })} 
            error={error}
          />
        )}

        {view === 'teacher-login' && (
          <LoginScreen 
            key="t-login"
            type="teacher" 
            onBack={() => setView('landing')} 
            onSubmit={(code, name) => handleLogin({ type: 'teacher', code, name })} 
            error={error}
            onRegisterRequest={() => setView('teacher-register')}
          />
        )}

        {view === 'teacher-register' && (
          <RegisterScreen 
            key="t-reg"
            onBack={() => setView('teacher-login')}
            onSubmit={handleRegister}
            error={error}
          />
        )}

        {/* Notifications and Success */}
        {successMessage && (
          <motion.div 
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-success text-white px-6 py-3 rounded-full font-bold shadow-2xl z-50 whitespace-nowrap"
          >
            {successMessage}
          </motion.div>
        )}

        {view === 'student-dashboard' && currentStudent && (
          <StudentDashboard 
            key="s-dash"
            student={currentStudent} 
            progress={progress}
            onLogout={handleLogout}
            onSelectChapter={(ch) => { setSelectedChapter(ch); setView('chapter-view'); }}
            currentTab="chapters"
            onTabChange={(tab) => setView(tab === 'chapters' ? 'student-dashboard' : tab === 'progress' ? 'student-progress' : 'student-profile')}
          />
        )}

        {view === 'student-progress' && currentStudent && (
          <StudentDashboard 
            key="s-progress"
            student={currentStudent} 
            progress={progress}
            onLogout={handleLogout}
            onSelectChapter={(ch) => { setSelectedChapter(ch); setView('chapter-view'); }}
            currentTab="progress"
            onTabChange={(tab) => setView(tab === 'chapters' ? 'student-dashboard' : tab === 'progress' ? 'student-progress' : 'student-profile')}
          />
        )}

        {view === 'student-profile' && currentStudent && (
          <StudentDashboard 
            key="s-profile"
            student={currentStudent} 
            progress={progress}
            onLogout={handleLogout}
            onSelectChapter={(ch) => { setSelectedChapter(ch); setView('chapter-view'); }}
            currentTab="profile"
            onTabChange={(tab) => setView(tab === 'chapters' ? 'student-dashboard' : tab === 'progress' ? 'student-progress' : 'student-profile')}
          />
        )}

        {view === 'chapter-view' && selectedChapter && (
          <ChapterView 
            key="ch-view"
            chapter={selectedChapter}
            progress={progress[selectedChapter.id] || {}}
            onBack={() => setView('student-dashboard')}
            onSelectActivity={(act) => { 
              if (selectedChapter.isComingSoon) return;
              setSelectedActivity(act); 
              setView('activity-view'); 
            }}
          />
        )}

        {view === 'activity-view' && selectedChapter && selectedActivity && (
          <ActivityViewer 
            key="act-view"
            activity={selectedActivity}
            onBack={() => setView('chapter-view')}
            onComplete={() => {
              markActivityDone(selectedChapter.id, selectedActivity.id);
              setView('chapter-view');
            }}
          />
        )}

        {view === 'teacher-dashboard' && session && (
          <TeacherDashboard 
            key="t-dash"
            teacherName={session.name || ''}
            teacherCode={session.teacherCode || ''}
            batches={batches}
            selectedBatchId={selectedBatch}
            onSelectBatch={setSelectedBatch}
            onCreateBatch={createBatch}
            batchStudents={batchStudents}
            onLogout={handleLogout}
            currentTab="batches"
            onTabChange={(tab) => setView(tab === 'batches' ? 'teacher-dashboard' : tab === 'overview' ? 'teacher-overview' : 'teacher-profile')}
          />
        )}

        {view === 'teacher-overview' && session && (
          <TeacherDashboard 
            key="t-overview"
            teacherName={session.name || ''}
            teacherCode={session.teacherCode || ''}
            batches={batches}
            selectedBatchId={selectedBatch}
            onSelectBatch={setSelectedBatch}
            onCreateBatch={createBatch}
            batchStudents={batchStudents}
            onLogout={handleLogout}
            currentTab="overview"
            onTabChange={(tab) => setView(tab === 'batches' ? 'teacher-dashboard' : tab === 'overview' ? 'teacher-overview' : 'teacher-profile')}
          />
        )}

        {view === 'teacher-profile' && session && (
          <TeacherDashboard 
            key="t-profile"
            teacherName={session.name || ''}
            teacherCode={session.teacherCode || ''}
            batches={batches}
            selectedBatchId={selectedBatch}
            onSelectBatch={setSelectedBatch}
            onCreateBatch={createBatch}
            batchStudents={batchStudents}
            onLogout={handleLogout}
            currentTab="profile"
            onTabChange={(tab) => setView(tab === 'batches' ? 'teacher-dashboard' : tab === 'overview' ? 'teacher-overview' : 'teacher-profile')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Screens ---

function LandingScreen({ onStart }: { onStart: (type: 'student' | 'teacher') => void, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="flex-1 flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="mb-8">
        <h1 className="text-4xl font-black text-primary tracking-tight leading-none">SEJ PRACTICE</h1>
        <p className="text-xs font-semibold uppercase tracking-widest mt-2 text-gray-500">Spoken English Journey</p>
      </div>
      
      <div className="relative mb-8 text-6xl">🌍</div>
      
      <h2 className="text-2xl font-bold mb-2">Practice English.</h2>
      <p className="text-gray-600 mb-12">Track your progress live as you learn.</p>
      
      <div className="w-full space-y-4">
        <Button variant="student" className="w-full text-lg shadow-lg" onClick={() => onStart('student')}>
          I am a Student
        </Button>
        <Button variant="teacher" className="w-full text-lg shadow-lg" onClick={() => onStart('teacher')}>
          I am a Teacher
        </Button>
      </div>
    </motion.div>
  );
}

function LoginScreen({ type, onBack, onSubmit, error, onRegisterRequest }: { 
  type: 'student' | 'teacher', 
  onBack: () => void, 
  onSubmit: (code: string, name: string) => void, 
  error: string | null, 
  onRegisterRequest?: () => void,
  key?: React.Key 
}) {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');

  return (
    <motion.div 
      initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}
      className="flex-1 flex flex-col p-8"
    >
      <button onClick={onBack} className="self-start mb-12 flex items-center text-gray-600 font-bold hover:text-primary">
        <ArrowLeft className="w-5 h-5 mr-1" /> Back
      </button>

      <h2 className="text-3xl font-black text-primary mb-2 tracking-tight">
        {type === 'student' ? 'Student Login' : 'Teacher Login'}
      </h2>
      <p className="text-xs text-gray-500 mb-8 font-bold">
        {type === 'student' ? 'Use a Batch Code provided by your teacher.' : 'Log in with your Teacher Code.'}
      </p>

      {error && (
        <div className="bg-error/10 text-error p-4 rounded-xl text-sm font-bold mb-6 border border-error/20">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">
            {type === 'student' ? 'Batch Code' : 'Teacher Code'}
          </label>
          <input 
            type="text" 
            placeholder={type === 'student' ? 'e.g. DH-A1' : 'e.g. SEJ-1234'}
            className="w-full px-4 py-4 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Full Name</label>
          <input 
            type="text" 
            placeholder="Enter your name"
            className="w-full px-4 py-4 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-bold"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <Button 
          variant={type === 'student' ? 'student' : 'teacher'} 
          className="w-full py-5 text-xl mt-4 shadow-xl"
          onClick={() => onSubmit(code, name)}
          disabled={!code || !name}
        >
          {type === 'student' ? 'Start Practising' : 'Go to Dashboard'}
        </Button>

        {type === 'teacher' && onRegisterRequest && (
          <div className="text-center pt-4">
             <p className="text-sm text-gray-500 font-bold mb-2">Don't have a code?</p>
             <button 
               onClick={onRegisterRequest}
               className="text-accent-teacher font-black uppercase text-xs hover:underline tracking-widest"
             >
               Register as a New Teacher
             </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function RegisterScreen({ onBack, onSubmit, error }: { onBack: () => void, onSubmit: (name: string, code: string) => void, error: string | null, key?: React.Key }) {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  return (
    <motion.div 
      initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}
      className="flex-1 flex flex-col p-8"
    >
      <button onClick={onBack} className="self-start mb-12 flex items-center text-gray-600 font-bold hover:text-primary">
        <ArrowLeft className="w-5 h-5 mr-1" /> Back
      </button>

      <h2 className="text-4xl font-black text-accent-teacher mb-2 tracking-tight">Register</h2>
      <p className="text-sm text-gray-500 mb-8 font-bold italic">Create your teacher account to manage batches and students.</p>

      {error && (
        <div className="bg-error/10 text-error p-4 rounded-xl text-sm font-bold mb-6 border border-error/20">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-border text-center">
           <div className="text-4xl mb-3">🎓</div>
           <p className="font-bold text-gray-700">Set up your teacher profile to start creating batches.</p>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Your Full Name</label>
          <input 
            autoFocus
            type="text" 
            placeholder="e.g. Dr. Karima Ahmed"
            className="w-full px-4 py-4 rounded-xl border-2 border-border focus:border-accent-teacher outline-none transition-all font-black text-xl"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">Choose Teacher Code</label>
          <input 
            type="text" 
            placeholder="e.g. KARIMA-01"
            className="w-full px-4 py-4 rounded-xl border-2 border-border focus:border-accent-teacher outline-none transition-all font-black text-xl"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
          />
          <p className="text-[10px] text-gray-400 mt-1 font-bold">This code will be used to log in as a teacher.</p>
        </div>

        <Button 
          variant="teacher" 
          className="w-full py-5 text-xl shadow-xl"
          onClick={() => onSubmit(name, code)}
          disabled={!name.trim() || !code.trim()}
        >
          Create My Teacher Account
        </Button>
      </div>
    </motion.div>
  );
}

function StudentDashboard({ student, progress, onLogout, onSelectChapter, currentTab, onTabChange }: { 
  student: Student, 
  progress: StudentProgress, 
  onLogout: () => void,
  onSelectChapter: (ch: Chapter) => void,
  currentTab: 'chapters' | 'progress' | 'profile',
  onTabChange: (tab: 'chapters' | 'progress' | 'profile') => void,
  key?: React.Key
}) {
  const stats = useMemo(() => {
    let stars = 0;
    let chaptersStarted = 0;
    let fullyCompleted = 0;

    Object.entries(progress).forEach(([chId, acts]) => {
      const actCount = Object.values(acts).filter(v => v === true).length;
      stars += actCount;
      if (actCount > 0) chaptersStarted++;
      if (actCount === 5) fullyCompleted++;
    });

    return { stars, chaptersStarted, fullyCompleted };
  }, [progress]);

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <header className="bg-primary text-white p-6 shadow-md shrink-0">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tight leading-none uppercase">SEJ PRACTICE</h1>
            <p className="text-[10px] font-semibold opacity-70 uppercase tracking-widest mt-1">Learner Dashboard</p>
          </div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-accent-student text-primary px-3 py-1.5 rounded-full flex items-center shadow-sm"
          >
            <Flame className="w-4 h-4 mr-1 fill-current" />
            <span className="font-black text-sm">{student.streak} Day Streak</span>
          </motion.div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">
              {student.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">{student.name}</p>
              <p className="text-[10px] opacity-70">Batch: {student.batchCode}</p>
            </div>
          </div>
          <button onClick={onLogout} className="opacity-60 hover:opacity-100 transition-opacity"><LogOut className="w-5 h-5" /></button>
        </div>
      </header>

      <div className="flex-1 p-4 overflow-y-auto pb-24">
        {currentTab === 'chapters' && (
          <>
            {/* Progress Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: 'Stars', val: `${stats.stars} / 115`, icon: '⭐' },
                { label: 'Started', val: stats.chaptersStarted, icon: '📚' },
                { label: 'Done', val: stats.fullyCompleted, icon: '✅' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-3 rounded-2xl border border-border shadow-sm flex flex-col items-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase mb-1">{stat.label}</span>
                  <span className="text-lg font-black text-primary">{stat.val}</span>
                </div>
              ))}
            </div>

            <div className="mb-4 flex justify-between items-end">
              <h2 className="text-lg font-black text-primary uppercase">Learning Journey</h2>
              <span className="text-[10px] font-bold text-gray-400">23 Chapters Available</span>
            </div>

            <div className="space-y-4">
              {CHAPTERS.map((ch) => {
                const chProgress = progress[ch.id] || {};
                const doneCount = Object.values(chProgress).filter(v => v === true).length;
                const isFullyDone = doneCount === 5;

                return (
                  <Card key={ch.id} onClick={() => onSelectChapter(ch)} className={cn("p-4", isFullyDone && "border-success bg-success/5")}>
                    <div className="flex items-start gap-4">
                      <div className={cn("text-3xl p-3 rounded-2xl shrink-0", ch.isComingSoon ? "bg-gray-100 opacity-50" : "bg-primary/5")}>
                        {ch.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-[10px] font-black text-primary uppercase mb-0.5">Chapter {ch.number}</p>
                          {isFullyDone && <span className="bg-success text-white text-[8px] font-black px-1.5 py-0.5 rounded-full">COMPLETED</span>}
                        </div>
                        <h3 className="text-lg font-bold leading-tight mb-1">{ch.title}</h3>
                        <p className={cn("text-xs text-gray-500 italic mb-3", ch.isComingSoon && "text-gray-400")}>
                          {ch.isComingSoon ? '🚧 Coming soon!' : `Goal: ${ch.goal}`}
                        </p>
                        
                        {!ch.isComingSoon && (
                          <div className="flex gap-1.5">
                            {ch.activities.map((act, i) => (
                              <div 
                                key={i} 
                                className={cn(
                                  "w-7 h-7 rounded-lg flex items-center justify-center text-[10px] transition-all",
                                  chProgress[act.id] ? "bg-success text-white shadow-sm" : "bg-gray-200 text-gray-400"
                                )}
                              >
                                {i === 0 ? 'W' : i === 1 ? 'S' : i === 2 ? 'G' : i === 3 ? 'P' : 'M'}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {currentTab === 'progress' && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center opacity-50">
             <div className="text-6xl mb-4">📊</div>
             <p className="font-bold uppercase tracking-widest text-primary">My Progress Analytics</p>
             <p className="text-sm">Detailed visualization of your learning journey is coming soon!</p>
          </div>
        )}

        {currentTab === 'profile' && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center opacity-50">
             <div className="text-6xl mb-4">👤</div>
             <p className="font-bold uppercase tracking-widest text-primary">Member Profile</p>
             <p className="text-sm">Profile customisation and badges coming soon!</p>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <nav className="shrink-0 bg-white border-t border-border px-8 py-3 flex justify-between shadow-lg">
        <button 
          onClick={() => onTabChange('chapters')} 
          className={cn("flex flex-col items-center transition-colors", currentTab === 'chapters' ? "text-primary" : "text-gray-300")}
        >
          <BookOpen className="w-6 h-6 mb-1" />
          <span className="text-[8px] font-black uppercase tracking-tighter">Chapters</span>
        </button>
        <button 
          onClick={() => onTabChange('progress')} 
          className={cn("flex flex-col items-center transition-colors", currentTab === 'progress' ? "text-primary" : "text-gray-300")}
        >
          <BarChart3 className="w-6 h-6 mb-1" />
          <span className="text-[8px] font-black uppercase tracking-tighter">My progress</span>
        </button>
        <button 
          onClick={() => onTabChange('profile')} 
          className={cn("flex flex-col items-center transition-colors", currentTab === 'profile' ? "text-primary" : "text-gray-300")}
        >
          <Users className="w-6 h-6 mb-1" />
          <span className="text-[8px] font-black uppercase tracking-tighter">Profile</span>
        </button>
      </nav>
    </div>
  );
}

function ChapterView({ chapter, progress, onBack, onSelectActivity }: { 
  chapter: Chapter, 
  progress: { [id: string]: boolean }, 
  onBack: () => void,
  onSelectActivity: (act: Activity) => void,
  key?: React.Key
}) {
  return (
    <motion.div 
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%', opacity: 0 }}
      className="flex-1 flex flex-col"
    >
      <header className="bg-white border-b border-border p-6 flex items-center gap-4">
        <button onClick={onBack} className="text-gray-400 hover:text-primary transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <p className="text-[10px] font-black text-primary uppercase">Chapter {chapter.number}</p>
          <h2 className="text-xl font-black">{chapter.title}</h2>
        </div>
      </header>

      <div className="flex-1 p-6 space-y-4">
        <div className="bg-primary/5 p-4 rounded-2xl mb-6">
          <p className="text-xs font-bold text-primary mb-1 inline-flex items-center">
            <CheckCircle className="w-3 h-3 mr-1" /> COMMUNICATIVE GOAL
          </p>
          <p className="text-sm font-semibold text-gray-700">{chapter.goal}</p>
        </div>

        {chapter.isComingSoon ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60">
             <div className="text-6xl mb-4">🚧</div>
             <p className="font-bold">Activities for this chapter are being prepared.</p>
             <p className="text-sm">Check back soon!</p>
             <Button className="mt-8" onClick={onBack}>Explore Other Chapters</Button>
          </div>
        ) : (
          <div className="space-y-3">
            {chapter.activities.map((act) => (
              <button 
                key={act.id} 
                onClick={() => onSelectActivity(act)}
                className={cn(
                  "w-full p-4 rounded-2xl border flex items-center justify-between transition-all active:scale-[0.98]",
                  progress[act.id] 
                    ? "bg-success/5 border-success text-success" 
                    : "bg-white border-border text-gray-700 hover:border-primary"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg", progress[act.id] ? "bg-success/10" : "bg-gray-100")}>
                    {act.type === 'word-match' && '📝'}
                    {act.type === 'grammar-builder' && '⚖️'}
                    {act.type === 'truth-seeker' && '🔍'}
                    {act.type === 'scenario-shuffle' && '🎭'}
                  </div>
                  <div className="text-left">
                    <span className="text-xs block opacity-60 font-bold uppercase">{act.name}</span>
                    <span className="font-bold">{act.name}</span>
                  </div>
                </div>
                {progress[act.id] ? (
                  <div className="flex items-center font-black text-xs">DONE <CheckCircle className="w-4 h-4 ml-1" /></div>
                ) : (
                  <ChevronRight className="w-5 h-5 opacity-40" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ActivityViewer({ activity, onBack, onComplete }: { activity: Activity, onBack: () => void, onComplete: () => void, key?: React.Key }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState<{ correct: boolean; show: boolean } | null>(null);

  const handleChoice = (choice: string, correct: string) => {
    if (feedback?.show) return;
    const isCorrect = choice === correct;
    setFeedback({ correct: isCorrect, show: true });
    
    setTimeout(() => {
      setFeedback(null);
      const newAnswers = [...answers, choice];
      setAnswers(newAnswers);
      
      const totalSteps = activity.type === 'word-match' ? activity.content.questions.length : 
                         activity.type === 'grammar-builder' ? activity.content.sentences.length :
                         activity.type === 'truth-seeker' ? activity.content.questions.length :
                         activity.type === 'scenario-shuffle' ? activity.content.questions.length : 1;
      
      if (step + 1 >= totalSteps) {
        setIsFinished(true);
      } else {
        setStep(step + 1);
      }
    }, 1500);
  };

  const currentContent = useMemo(() => {
    if (activity.type === 'word-match') return activity.content.questions[step];
    if (activity.type === 'grammar-builder') return activity.content.sentences[step];
    if (activity.type === 'truth-seeker') return activity.content.questions[step];
    if (activity.type === 'scenario-shuffle') return activity.content.questions[step];
    return null;
  }, [activity, step]);

  return (
    <motion.div 
      initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
      className="flex-1 flex flex-col bg-white"
    >
      <header className="p-4 border-b border-border bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400">
            <X />
          </button>
          <div className="text-center">
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-0.5">Practising</p>
              <h2 className="font-black text-gray-800">{activity.name}</h2>
          </div>
          <div className="w-10" />
        </div>
        
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ 
              width: `${((step + (isFinished ? 1 : 0)) / (
                activity.type === 'word-match' ? activity.content.questions.length : 
                activity.type === 'grammar-builder' ? activity.content.sentences.length :
                activity.type === 'truth-seeker' ? activity.content.questions.length :
                activity.type === 'scenario-shuffle' ? activity.content.questions.length : 1
              )) * 100}%` 
            }}
            className="h-full bg-primary transition-all duration-500 ease-out"
          />
        </div>
      </header>

      <div className="flex-1 p-6 overflow-y-auto">
        {!isFinished ? (
          <div className="flex flex-col h-full">
             {activity.type === 'word-match' && (
               <div className="space-y-8 flex-1">
                 <div className="text-center py-12">
                   <p className="text-sm font-bold text-gray-400 uppercase mb-2">How do you define...</p>
                   <h3 className="text-4xl font-black text-primary">"{currentContent.word}"</h3>
                 </div>
                 <div className="grid grid-cols-1 gap-3">
                   {currentContent.options.map((opt: string) => (
                     <button
                       key={opt}
                       onClick={() => handleChoice(opt, currentContent.answer)}
                       className={cn(
                        "w-full p-4 rounded-2xl border-2 font-bold text-left transition-all",
                        feedback?.show && opt === currentContent.answer && "border-success bg-success/10 text-success",
                        feedback?.show && feedback.correct === false && opt === answers[step] && "border-error bg-error/10 text-error",
                        !feedback?.show && "border-border hover:border-primary active:scale-95"
                       )}
                     >
                       {opt}
                     </button>
                   ))}
                 </div>
               </div>
             )}

             {activity.type === 'grammar-builder' && (
               <div className="space-y-8 flex-1">
                 <div className="bg-primary/5 p-8 rounded-2xl text-center">
                    <p className="text-2xl font-bold leading-relaxed">
                      {currentContent.text.split('___')[0]}
                      <span className={cn("mx-2 px-4 py-1 rounded-lg border-b-4 border-primary", feedback?.show && feedback.correct ? "bg-success/20 border-success" : "bg-white")}>
                        {feedback?.show ? currentContent.answer : '...'}
                      </span>
                      {currentContent.text.split('___')[1]}
                    </p>
                 </div>
                 <div className="grid grid-cols-1 gap-3">
                    {currentContent.options.map((opt: string) => (
                      <button
                        key={opt}
                        onClick={() => handleChoice(opt, currentContent.answer)}
                        className={cn(
                          "w-full p-4 rounded-xl border-2 font-black text-center text-lg",
                          feedback?.show && opt === currentContent.answer && "border-success bg-success/10 text-success",
                          !feedback?.show && "border-border hover:border-primary hover:bg-primary/5"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                 </div>
               </div>
             )}

             {activity.type === 'truth-seeker' && (
              <div className="space-y-8 flex-1">
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black text-gray-800 leading-tight">
                    "{currentContent.q}"
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {currentContent.options.map((opt: string) => (
                    <button
                      key={opt}
                      onClick={() => handleChoice(opt, currentContent.answer)}
                      className={cn(
                        "p-6 rounded-3xl border-4 font-black text-xl transition-all h-32 flex items-center justify-center text-center",
                        feedback?.show && opt === currentContent.answer && "border-success bg-success/10 text-success",
                        feedback?.show && feedback.correct === false && opt === answers[step] && "border-error bg-error/10 text-error",
                        !feedback?.show && "border-gray-100 bg-gray-50 hover:border-primary hover:bg-white shadow-sm"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activity.type === 'scenario-shuffle' && (
              <div className="space-y-6 flex-1">
                <div className="bg-primary/5 p-6 rounded-3xl border-2 border-primary/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5"><Users className="w-20 h-20" /></div>
                  <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-3">Scenario</p>
                  <p className="font-bold text-lg text-gray-700 italic border-l-4 border-primary pl-4">
                    {currentContent.scenario}
                  </p>
                </div>

                <div className="pt-4 space-y-4">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Choose the best response:</p>
                  <div className="space-y-3">
                    {currentContent.options.map((opt: any) => (
                      <button
                        key={opt.text}
                        onClick={() => handleChoice(opt.text, currentContent.answer)}
                        className={cn(
                          "w-full p-5 rounded-2xl border-2 text-left transition-all relative overflow-hidden",
                          feedback?.show && opt.text === currentContent.answer && "border-success bg-success/10",
                          !feedback?.show && "border-border hover:border-primary hover:bg-primary/5"
                        )}
                      >
                        <div className="flex gap-4">
                          <span className="font-black text-primary bg-primary/10 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                            {opt.label}
                          </span>
                          <p className="font-bold text-gray-700">{opt.text}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

             {feedback?.show && (
               <motion.div 
                 initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                 className={cn(
                   "fixed inset-0 pointer-events-none flex items-center justify-center z-50",
                   feedback.correct ? "text-success" : "text-error"
                 )}
               >
                 <div className="bg-white rounded-full p-8 shadow-2xl border-4 border-current">
                    {feedback.correct ? <CheckCircle className="w-24 h-24" /> : <X className="w-24 h-24" />}
                 </div>
               </motion.div>
             )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-gradient-to-b from-primary/5 to-white rounded-3xl">
            <motion.div 
              initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              className="text-8xl mb-8 filter drop-shadow-lg"
            >
              🌟
            </motion.div>
            <h2 className="text-4xl font-black text-primary mb-4">Excellent Work!</h2>
            <p className="text-gray-600 text-lg mb-10 max-w-xs mx-auto">You've mastered this activity and leveled up your English skills!</p>
            
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mb-10">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 italic">
                <p className="text-2xl font-black text-primary">+10</p>
                <p className="text-[10px] uppercase font-bold text-gray-400">Points</p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 italic">
                <p className="text-2xl font-black text-success">100%</p>
                <p className="text-[10px] uppercase font-bold text-gray-400">Accuracy</p>
              </div>
            </div>

            <Button onClick={onComplete} className="w-full py-4 text-xl shadow-lg font-black rounded-2xl h-16 shadow-primary/20">
              Continue Journey
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function WorkbookFlow({ starters, onFinish }: { starters: string[], onFinish: (answers: string[]) => void }) {
  const [values, setValues] = useState<string[]>(new Array(starters.length).fill(''));
  
  return (
    <div className="space-y-10 py-4">
      <div className="space-y-8">
        {starters.map((starter, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} className="flex flex-col gap-3 group"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black text-xs">
                {i+1}
              </span>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Sentence Starter</p>
            </div>
            <div className="bg-white border-2 border-gray-100 group-focus-within:border-primary/30 rounded-2xl p-6 transition-all shadow-sm group-focus-within:shadow-md">
               <p className="font-black text-xl text-gray-800 mb-4">{starter.replace('___', '')}</p>
               <input 
                 className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary rounded-xl p-4 outline-none font-bold text-lg transition-all"
                 placeholder="Complete the sentence..."
                 value={values[i]}
                 onChange={(e) => {
                   const v = [...values];
                   v[i] = e.target.value;
                   setValues(v);
                 }}
               />
            </div>
          </motion.div>
        ))}
      </div>
      <Button 
        className="w-full h-16 text-xl font-black rounded-2xl shadow-xl shadow-primary/20 mt-8" 
        disabled={values.some(v => v.trim().length === 0)}
        onClick={() => onFinish(starters.map((s, i) => s.replace('___', values[i])))}
      >
        Complete My Entry
      </Button>
    </div>
  );
}

function TeacherDashboard({ 
  teacherName, 
  teacherCode, 
  batches, 
  selectedBatchId, 
  onSelectBatch, 
  onCreateBatch, 
  batchStudents,
  onLogout,
  currentTab,
  onTabChange
}: {
  teacherName: string;
  teacherCode: string;
  batches: any[];
  selectedBatchId: string | null;
  onSelectBatch: (id: string) => void;
  onCreateBatch: (code: string) => void;
  batchStudents: Student[];
  onLogout: () => void;
  currentTab: 'batches' | 'overview' | 'profile';
  onTabChange: (tab: 'batches' | 'overview' | 'profile') => void;
  key?: React.Key;
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [newBatchCode, setNewBatchCode] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewedStudent, setViewedStudent] = useState<Student | null>(null);

  const selectedBatch = batches.find(b => b.batchCode === selectedBatchId);

  const filteredStudents = batchStudents.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      <header className="bg-accent-teacher text-white p-6 shadow-md shrink-0">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h1 className="text-xl font-black tracking-tight leading-none uppercase">SEJ PRACTICE</h1>
            <p className="text-[10px] font-semibold opacity-70 uppercase tracking-widest mt-1">Teacher Dashboard</p>
          </div>
          <button onClick={onLogout} className="opacity-60 hover:opacity-100"><LogOut className="w-5 h-5" /></button>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">
            {teacherName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-sm leading-tight">{teacherName}</p>
            <p className="text-[10px] opacity-70">Code: {teacherCode}</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 pb-24 space-y-6">
        {currentTab === 'batches' && (
          <>
            {/* Batch Overview */}
            <section>
              <div className="flex justify-between items-end mb-3">
                <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest">My Batches</h2>
              </div>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {batches.map(b => (
                  <Card 
                    key={b.batchCode} 
                    onClick={() => onSelectBatch(b.batchCode)}
                    className={cn(
                      "min-w-[140px] p-4 shrink-0 transition-all",
                      selectedBatchId === b.batchCode ? "border-accent-teacher bg-accent-teacher/5 scale-105 shadow-md" : ""
                    )}
                  >
                    <p className="text-[10px] font-black text-accent-teacher uppercase mb-1">Batch</p>
                    <h3 className="text-xl font-black mb-2">{b.batchCode}</h3>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center text-[10px] font-bold text-gray-500">
                        <Users className="w-3 h-3 mr-1" /> {b.studentCount} Students
                      </div>
                      <div className="flex items-center text-[10px] font-bold text-primary">
                        <Star className="w-3 h-3 mr-1 fill-current" /> {b.totalStars} Stars
                      </div>
                    </div>
                  </Card>
                ))}
                <button 
                  onClick={() => setIsCreating(true)}
                  className="min-w-[100px] border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-accent-teacher hover:text-accent-teacher transition-all"
                >
                  <Plus className="w-6 h-6 mb-1" />
                  <span className="text-[8px] font-black uppercase">Create New</span>
                </button>
              </div>
            </section>

            {/* Batch Detail */}
            {selectedBatch ? (
              <section className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-black text-accent-teacher">Batch {selectedBatchId}</h2>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Search student..."
                      className="pl-9 pr-4 py-2 rounded-full border border-border text-xs font-bold outline-none focus:border-accent-teacher"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 text-gray-400 font-black uppercase border-b border-border">
                      <tr>
                        <th className="px-4 py-3">Student</th>
                        <th className="px-4 py-3">Active</th>
                        <th className="px-4 py-3 text-center">⭐</th>
                        <th className="px-4 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredStudents.length === 0 ? (
                        <tr><td colSpan={4} className="px-4 py-12 text-center text-gray-400 font-bold italic">No students found</td></tr>
                      ) : filteredStudents.map((s) => (
                        <tr key={s.name} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="font-black text-gray-700">{s.name}</div>
                          </td>
                          <td className="px-4 py-3 text-gray-500 font-bold">
                            {getTimeAgo(s.lastActive)}
                          </td>
                          <td className="px-4 py-3 text-center text-primary font-black">
                            {s.streak} 🔥
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button 
                              onClick={() => setViewedStudent(s)}
                              className="px-3 py-1.5 bg-accent-teacher text-white rounded-lg font-bold hover:bg-opacity-90 active:scale-95"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Placeholder for Analytics */}
                <div className="bg-white p-6 rounded-2xl border border-border">
                   <h3 className="text-sm font-black text-gray-400 uppercase mb-4 flex items-center">
                     <BarChart3 className="w-4 h-4 mr-2" /> Class Overview
                   </h3>
                   <div className="h-40 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-xl">
                      <p className="text-gray-300 font-bold italic">Chapter progress visualization coming soon...</p>
                   </div>
                </div>
              </section>
            ) : batches.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-20 text-center opacity-50">
                 <div className="text-6xl mb-4">🏫</div>
                 <p className="font-bold">You haven't created a batch yet.</p>
                 <p className="text-sm">Tap + Create New Batch to get started.</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center py-20 text-center opacity-20">
                 <div className="text-6xl mb-4">👆</div>
                 <p className="font-bold">Select a batch to see details.</p>
              </div>
            )}
          </>
        )}

        {currentTab === 'overview' && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center opacity-50">
             <div className="text-6xl mb-4">📈</div>
             <p className="font-bold uppercase tracking-widest text-accent-teacher">Academic Overview</p>
             <p className="text-sm">Comprehensive performance metrics across all batches coming soon!</p>
          </div>
        )}

        {currentTab === 'profile' && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-center opacity-50">
             <div className="text-6xl mb-4">👤</div>
             <p className="font-bold uppercase tracking-widest text-accent-teacher">Faculty Profile</p>
             <p className="text-sm">Manage your teacher credentials and settings coming soon!</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isCreating && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50 backdrop-blur-sm"
          >
            <Card className="w-full max-w-xs p-6 shadow-2xl">
              <h3 className="text-xl font-black text-accent-teacher mb-4">Create New Batch</h3>
              <p className="text-xs text-gray-500 mb-4 font-bold">Type a code for your new batch (e.g. DH-B2)</p>
              <input 
                autoFocus
                type="text"
                className="w-full px-4 py-4 rounded-xl border border-border font-bold outline-none focus:border-accent-teacher mb-6"
                placeholder="BATCH CODE"
                value={newBatchCode}
                onChange={(e) => setNewBatchCode(e.target.value.toUpperCase())}
              />
              <div className="flex gap-3">
                <Button variant="ghost" className="flex-1" onClick={() => setIsCreating(false)}>Cancel</Button>
                <Button 
                  variant="teacher" 
                  className="flex-1" 
                  onClick={() => { onCreateBatch(newBatchCode); setIsCreating(false); setNewBatchCode(''); }}
                  disabled={!newBatchCode}
                >
                  Confirm
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {viewedStudent && (
          <StudentDetailDrawer 
            student={viewedStudent} 
            onClose={() => setViewedStudent(null)} 
          />
        )}
      </AnimatePresence>

      <nav className="bg-white border-t border-border px-8 py-3 flex justify-between shadow-lg shrink-0">
        <button 
          onClick={() => onTabChange('batches')}
          className={cn("flex flex-col items-center transition-colors", currentTab === 'batches' ? "text-accent-teacher" : "text-gray-300")}
        >
          <Users className="w-6 h-6 mb-1" />
          <span className="text-[8px] font-black uppercase tracking-tighter">My Batches</span>
        </button>
        <button 
          onClick={() => onTabChange('overview')}
          className={cn("flex flex-col items-center transition-colors", currentTab === 'overview' ? "text-accent-teacher" : "text-gray-300")}
        >
          <BarChart3 className="w-6 h-6 mb-1" />
          <span className="text-[8px] font-black uppercase tracking-tighter">Overview</span>
        </button>
        <button 
          onClick={() => onTabChange('profile')}
          className={cn("flex flex-col items-center transition-colors", currentTab === 'profile' ? "text-accent-teacher" : "text-gray-300")}
        >
          <Users className="w-6 h-6 mb-1" />
          <span className="text-[8px] font-black uppercase tracking-tighter">Profile</span>
        </button>
      </nav>
    </div>
  );
}

function StudentDetailDrawer({ student, onClose }: { student: Student, onClose: () => void }) {
  const [progress, setProgress] = useState<StudentProgress>({});

  useEffect(() => {
    const progressQuery = collection(db, 'batches', student.batchCode, 'students', student.name, 'progress');
    const unsub = onSnapshot(progressQuery, (snapshot) => {
      const p: any = {};
      snapshot.forEach(doc => { p[doc.id] = doc.data(); });
      setProgress(p);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `batches/${student.batchCode}/students/${student.name}/progress`);
    });
    return unsub;
  }, [student]);

  const totalDone = useMemo(() => {
    let count = 0;
    Object.values(progress).forEach(ch => {
      Object.values(ch).forEach(val => { if (val === true) count++; });
    });
    return count;
  }, [progress]);

  return (
    <motion.div 
      initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
      className="fixed inset-0 z-50 flex flex-col bg-bg-base"
    >
      <header className="bg-white p-6 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-accent-teacher">{student.name}</h2>
          <p className="text-xs font-bold text-gray-400 uppercase">Batch {student.batchCode} • Since {getFormattedDate(student.joinedAt)}</p>
        </div>
        <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X /></button>
      </header>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-white p-4 rounded-2xl border border-border flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black text-gray-400 mb-1 uppercase">Current Streak</p>
              <div className="flex items-center text-accent-student font-black text-xl">
                 <Flame className="w-5 h-5 mr-1 fill-current" /> {student.streak} Days
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 mb-1 uppercase">Total Stars</p>
              <div className="flex items-center text-primary font-black text-xl justify-end">
                 {totalDone} <Star className="w-4 h-4 ml-1 fill-current" />
              </div>
            </div>
        </div>

        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mt-6">Chapter Progress</h3>
        <div className="space-y-2">
          {CHAPTERS.map(ch => {
            const chProgress = progress[ch.id] || {};
            return (
              <div key={ch.id} className="bg-white p-3 rounded-xl border border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{ch.emoji}</span>
                  <div>
                    <p className="text-[8px] font-black text-gray-400 uppercase">CH {ch.number}</p>
                    <p className="text-xs font-bold">{ch.title}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <div 
                      key={i} 
                      className={cn(
                        "w-4 h-4 rounded-md", 
                        chProgress[`act${i}`] ? "bg-success" : "bg-gray-100"
                      )} 
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <footer className="bg-white p-6 border-t border-border">
         <Button variant="teacher" className="w-full" onClick={onClose}>Close Overview</Button>
      </footer>
    </motion.div>
  );
}
