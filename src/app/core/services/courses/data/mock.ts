import { Course, CourseStatus } from '../model/Course';

export const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Diseño UI con Figma',
    description:
      'Este curso te introduce al diseño de interfaces modernas utilizando Figma. Aprenderás a crear layouts responsivos, manejar componentes reutilizables y aplicar principios de diseño visual para mejorar la experiencia del usuario.',
    beginDate: new Date('2023-03-01'),
    endDate: new Date('2023-06-30'),
    status: CourseStatus.CANCELLED,
  },
  {
    id: 2,
    title: 'Introducción a UX Research',
    description:
      'Explorá las técnicas fundamentales de investigación de usuarios: entrevistas, encuestas, pruebas de usabilidad y análisis de comportamiento. Este curso te ayudará a tomar decisiones basadas en evidencia real.',
    beginDate: new Date('2023-04-15'),
    endDate: new Date('2023-08-15'),
    status: CourseStatus.STARTED,
  },
  {
    id: 3,
    title: 'Testing Automatizado con Cypress',
    description:
      'Aprendé a escribir pruebas automatizadas para aplicaciones web usando Cypress. Desde pruebas de integración hasta validaciones visuales, este curso te prepara para mejorar la calidad de tus desarrollos.',
    beginDate: new Date('2022-09-01'),
    endDate: new Date('2022-12-01'),
    status: CourseStatus.FINISHED,
  },
  {
    id: 4,
    title: 'Análisis de Datos con Python',
    description:
      'Descubrí cómo procesar, visualizar y analizar datos con Python. Usarás librerías como Pandas, Matplotlib y Seaborn para extraer insights y construir reportes interactivos.',
    beginDate: new Date('2023-05-01'),
    endDate: new Date('2023-11-30'),
    status: CourseStatus.SCHEDULED,
  },
];
