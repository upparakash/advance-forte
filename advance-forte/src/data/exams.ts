import { Exam } from '../types';

export const examData: Exam[] = [
  {
    id: '1',
    name: 'IIT-JEE',
    fullName: 'Joint Entrance Examination (Main & Advanced)',
    description: 'Entrance exam for admission to IITs, NITs, and other premier engineering institutions in India.',
    image: 'https://images.pexels.com/photos/256401/pexels-photo-256401.jpeg?auto=compress&w=800&q=80',
    eligibility: 'Class 12 with Physics, Chemistry, Mathematics. No age limit for JEE Main. For JEE Advanced, born on or after Oct 1, 2004 (with relaxation for SC/ST/PwD).',
    features: [
      'JEE Main: Multiple attempts, JEE Advanced: 2 attempts',
      'Subjects: Physics, Chemistry, Mathematics',
      'JEE Main: Computer-based, JEE Advanced: Pen & Paper',
      'Eligibility: Top 2,50,000 JEE Main rank holders for Advanced',
      'Minimum 75% in Class 12 (65% for SC/ST/PwD) for IITs',
      'Indian citizens, NRIs, PIOs, OCIs, and foreign nationals eligible'
    ],
    importantDates: [
      'JEE Main: January, April, May, June',
      'JEE Advanced: May/June',
      'Results: June',
      'Counseling: July'
    ]
  },
  {
    id: '2',
    name: 'NEET',
    fullName: 'National Eligibility cum Entrance Test',
    description: 'National level entrance exam for admission to undergraduate medical courses (MBBS/BDS/AYUSH) in India.',
    image: 'https://images.pexels.com/photos/3376790/pexels-photo-3376790.jpeg?auto=compress&w=800&q=80',
    eligibility: 'Class 12 with Physics, Chemistry, Biology/Biotechnology, and English. Minimum age 17 years as of Dec 31 of admission year.',
    features: [
      'No upper age limit as per latest guidelines',
      'Minimum 50% aggregate in PCB (40% for OBC/SC/ST, 45% for PwD)',
      'Subjects: Physics, Chemistry, Biology, English',
      'No limit on number of attempts',
      'Indian citizens, NRIs, PIOs, OCIs, and foreign nationals eligible'
    ],
    importantDates: [
      'Application: December-March',
      'Exam: May',
      'Result: June',
      'Counseling: July'
    ]
  }
]; 