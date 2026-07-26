const getPayloadData = (payload) => payload?.data ?? payload ?? {};

const getLocalizedText = (value, locale = 'it') => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  return value[locale] || value.it || value.en || Object.values(value).find(Boolean) || '';
};

export const formatEnrollmentDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('it-IT');
};

export const formatEnrollmentDateTime = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return date.toLocaleString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

export const formatDurationFromSeconds = (totalSeconds = 0) => {
  const secs = Math.max(0, Number(totalSeconds) || 0);
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = secs % 60;
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, '0')).join(':');
};

const getTrainerName = (course) => {
  if (!course) return '—';
  const teacher = course.teacher;
  const tutor = course.tutor || course.tutorUser;
  const fromTeacher = teacher
    ? `${teacher.firstName || ''} ${teacher.lastName || ''}`.trim()
    : '';
  if (fromTeacher) return fromTeacher;
  const fromTutor = tutor ? `${tutor.firstName || ''} ${tutor.lastName || ''}`.trim() : '';
  if (fromTutor) return fromTutor;
  return getLocalizedText(course.tutorName) || '—';
};

const getBestQuizAttempt = (enrollment) => {
  const source = enrollment?.raw || enrollment;
  const byType = source?.quizzes?.byType || {};
  const bestMap = source?.quizAttempts?.best || {};
  const types = ['FINAL_TEST', 'POST_TEST', 'PRE_TEST'];

  for (const type of types) {
    const entry = byType[type];
    if (entry?.attempts?.length) {
      const best = entry.attempts.reduce((acc, item) =>
        (item.scorePercent ?? 0) > (acc?.scorePercent ?? 0) ? item : acc,
      entry.attempts[0]);
      return best;
    }
    if (entry?.bestScore != null) {
      return {
        quizTitle: entry.attempts?.[0]?.quizTitle || type,
        scorePercent: entry.bestScore,
        passed: entry.passed,
        attemptedAt: entry.attempts?.[0]?.attemptedAt,
      };
    }

    const fromBest = bestMap[type];
    if (fromBest) {
      return {
        quizTitle: fromBest.quizTitle || fromBest.quiz?.quizTitle || type,
        scorePercent: fromBest.scorePercent,
        passed: fromBest.passed,
        attemptedAt: fromBest.attemptedAt,
        timeSpentSecs: fromBest.timeSpentSecs,
      };
    }
  }

  const all = source?.quizAttempts?.all || source?.quizAttempts;
  if (Array.isArray(all) && all.length) {
    return all.reduce((acc, item) =>
      (item.scorePercent ?? 0) > (acc?.scorePercent ?? 0) ? item : acc,
    );
  }

  return null;
};

const mapEnrollmentCourseRow = (enrollment, locale = 'it') => {
  const course = enrollment.course || {};
  const bestQuiz = getBestQuizAttempt(enrollment);
  const courseTitle = course.courseTitle;
  const title =
    typeof courseTitle === 'string'
      ? courseTitle
      : getLocalizedText(courseTitle, locale) || course.slug || '—';

  return {
    enrollmentId: enrollment.enrollmentId || enrollment.id,
    courseId: course.id,
    courseName: title,
    startDate: formatEnrollmentDate(enrollment.startedAt || enrollment.createdAt),
    endDate: formatEnrollmentDate(enrollment.completedAt),
    totalTime: formatDurationFromSeconds(enrollment.progress?.totalTimeSpentSecs),
    score: bestQuiz?.scorePercent != null ? `${Math.round(bestQuiz.scorePercent)}%` : '—',
    trainer: getTrainerName(course),
    feedback: '—',
    status: enrollment.status,
    progress: enrollment.progress?.percentage ?? 0,
    certificate: enrollment.certificate || null,
    raw: enrollment,
  };
};

export const mapLicenseeStudentsResponse = (payload, locale = 'it') => {
  const data = getPayloadData(payload);
  const students = (data.students || []).map((row) => {
    const student = row.student || {};
    const enrollments = row.enrollments || [];
    const earliest = enrollments.reduce((acc, item) => {
      const date = new Date(item.startedAt || item.createdAt || 0).getTime();
      if (!acc || date < acc) return date;
      return acc;
    }, null);

    const certificate =
      enrollments.find((item) => item.certificate?.id && item.certificate?.status === 'ISSUED')
        ?.certificate ||
      enrollments.find((item) => item.certificate?.id)?.certificate ||
      null;

    return {
      id: student.id,
      name: student.fullName || `${student.firstName || ''} ${student.lastName || ''}`.trim() || student.email,
      email: student.email || '—',
      startDate: earliest ? formatEnrollmentDate(new Date(earliest).toISOString()) : '—',
      progress: row.summary?.averageProgress ?? 0,
      summary: row.summary,
      enrollments,
      certificate,
      raw: row,
    };
  });

  return {
    meta: data.meta || {},
    stats: data.stats || {},
    students,
  };
};

export const mapLicenseeStudentDetailResponse = (payload, locale = 'it') => {
  const data = getPayloadData(payload);
  const student = data.student || {};
  const courses = (data.courses || []).map((enrollment) => mapEnrollmentCourseRow(enrollment, locale));

  return {
    student: {
      id: student.id,
      fullName: student.fullName || `${student.firstName || ''} ${student.lastName || ''}`.trim() || student.email,
      email: student.email || '—',
      phone: student.contactNumber || '—',
      companyName: student.companyName || '—',
      birthDate: formatEnrollmentDate(student.birthDate),
      hireDate: formatEnrollmentDate(student.createdAt),
      taxCode: student.traineeTaxCode || '—',
      raw: student,
    },
    summary: data.summary || {},
    courses,
    raw: data,
  };
};

export const mapEnrollmentTrainingReport = ({ student, enrollment }, locale = 'it') => {
  const course = enrollment?.course || enrollment?.raw?.course || {};
  const progress = enrollment?.progress || enrollment?.raw?.progress || {};
  const bestQuiz = getBestQuizAttempt(enrollment?.raw || enrollment);
  const certificate = enrollment?.certificate || enrollment?.raw?.certificate;

  const teacherName = getTrainerName(course);
  const courseTitle = getLocalizedText(course.courseTitle, locale);
  const subject =
    getLocalizedText(course.description, locale) || courseTitle || '—';

  return {
    top: {
      courseTitle,
      company: student?.companyName || getLocalizedText(course.financingCompany, locale) || '—',
      firstName: student?.raw?.firstName || student?.fullName?.split(' ')?.[0] || '—',
      lastName: student?.raw?.lastName || student?.fullName?.split(' ')?.slice(1).join(' ') || '—',
      cig: course.cig || '—',
      cup: course.cup || '—',
      cip: course.cip || '—',
    },
    subject,
    structure: {
      trainingPlanTitle: getLocalizedText(course.trainingPlanTitle, locale) || '—',
      trainingPlanId: course.trainingPlanId || '—',
      trainingActionId: course.trainingActionId || '—',
      courseTitle: getLocalizedText(course.courseTitle, locale) || '—',
      company: student?.companyName || getLocalizedText(course.financingCompany, locale) || '—',
      lastName: student?.raw?.lastName || '—',
      firstName: student?.raw?.firstName || '—',
      taxCode: student?.taxCode || student?.raw?.traineeTaxCode || '—',
      birthDate: student?.birthDate || formatEnrollmentDate(student?.raw?.birthDate),
      courseStartDate: formatEnrollmentDate(course.courseStartDate || enrollment?.raw?.startedAt),
      courseEndDate: formatEnrollmentDate(course.courseEndDate || enrollment?.raw?.completedAt),
      durationMinutes: course.durationMinutes || course.duration || '—',
      courseLocation: getLocalizedText(course.courseLocation, locale) || '—',
      sector: getLocalizedText(course.sector, locale) || '—',
      fund: getLocalizedText(course.fund, locale) || '—',
      methodology: getLocalizedText(course.methodology, locale) || '—',
      projectManager: getLocalizedText(course.trainingProjectManager, locale) || '—',
      tutor: getLocalizedText(course.tutorName, locale) || teacherName,
      type: getLocalizedText(course.type, locale) || course.format || '—',
    },
    quiz: {
      name: bestQuiz?.quizTitle || '—',
      accessDate: formatEnrollmentDateTime(bestQuiz?.attemptedAt || enrollment?.raw?.startedAt),
      score: bestQuiz?.scorePercent != null ? `${Math.round(bestQuiz.scorePercent)}%` : '—',
      result: bestQuiz?.passed ? 'Superato' : bestQuiz ? 'Non superato' : '—',
      totalTime: formatDurationFromSeconds(bestQuiz?.timeSpentSecs),
    },
    progress: {
      percentage: progress.percentage ?? enrollment?.progress ?? 0,
      accessDate: formatEnrollmentDate(enrollment?.raw?.startedAt || enrollment?.startDate),
      timeSpent: formatDurationFromSeconds(progress.totalTimeSpentSecs),
    },
    certificate: certificate
      ? {
          id: certificate.id,
          issuedAt: formatEnrollmentDateTime(certificate.issuedAt),
          lastDownloadedAt: formatEnrollmentDateTime(certificate.lastDownloadedAt),
          status: certificate.status,
        }
      : null,
    totalLearningTime: formatDurationFromSeconds(progress.totalTimeSpentSecs),
  };
};
