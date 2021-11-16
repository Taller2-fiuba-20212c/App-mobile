export const UnitMockup = {
  name: 'Unit Name',
  // PDFS, TEXT or VIDEO
  contentType: str,
  // Video: {videoId: xxx}
  // Text: {text: xxx}
  // PDFs: {fileId: xxx}
  content: 'Content Object',
  creatorId: 'CreatorID',
  creationDate: 'creationDate',
  lastModificationDate: 'CreationDate'
}

export const ExamAnswer = {
  question: ExamQuestion,
  // # Text: {answer: xxx}
  value: 'value',
  // #NULL: sin corregir, OK, WRONG
  state: 'state',
  creationDate: 'creationDate',
  lastModificationDate: 'CreationDate'
}

export const ExamQuestion = {
  // #TEXT
  questionType: 'QuestionType',
  // # Text: {question: xxx}
  question: 'question', 
  creationDate: 'creationDate',
  lastModificationDate: 'CreationDate'
}

export const ExamResolution = {
  answers: [],
  grade: 'Grade',
  // #APPROVED, DISAPPROVED 
  state: 'State',
  creatorId: 'creatorId',
  creationDate: 'creationDate',
  lastModificationDate: 'CreationDate'
}

export const ExamMockup = {
  name: 'Exam Name',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  examQuestions: [ExamQuestion, ],
  examResolutions: List[ExamResolution] = [],
  // CREATED, PUBLISHED, CLOSED
  state: 'State',
  creatorId: 'CreatorID',
  creationDate: 'creationDate',
  lastModificationDate: 'CreationDate'
}

export const courseMockup = {
  imgsrc: require('../../../assets/python.jpg'),
  name: 'COURSE NAME',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  subType: 'Normal',
  tags: ['Tag1', 'Tag2', 'Tag3', 'Tag4'],
  units: List[Unit] = [],
  exams: List[ExamModel] = [],
  consults: List[Consult] = [],
  teachers: ['Teacher1', 'Teacher2', 'Teacher3'],
  colaborators: ['Colaborator1', 'Colaborator2', 'Colaborator3'],
  students: ['Student1', 'Student2', 'Student3'],
  creatorId: 'CreatorID',
  creationDate: 'ceationDate',
  lastModificationDate: 'lastModificationDate'
}

export const courses = [
  courseMockup, courseMockup, courseMockup, courseMockup, courseMockup
]