// 목 데이터 - 실제 운영시에는 백엔드 API로 대체
export const companies = [
  {
    id: 1,
    name: '테크스타트업',
    status: '제안/견적',
    users: 50,
    revenue: 120000000,
    expectedRevenue: 150000000,
    source: '웹',
    needs: 'SaaS 솔루션 도입, 업무 자동화',
    memo: '중소기업 대상 SaaS 플랫폼 운영 중',
    contactName: '김영수',
    contactPhone: '010-1234-5678',
    contactEmail: 'kim@techstartup.com',
    createdAt: '2024-01-15',
    files: []
  },
  {
    id: 2,
    name: '글로벌코퍼레이션',
    status: '검토',
    users: 200,
    revenue: 500000000,
    expectedRevenue: 600000000,
    source: '소개',
    needs: '엔터프라이즈 솔루션, 글로벌 확장',
    memo: '대기업 고객, 의사결정 프로세스 복잡',
    contactName: '이민정',
    contactPhone: '010-9876-5432',
    contactEmail: 'lee@globalcorp.com',
    createdAt: '2024-01-20',
    files: []
  },
  {
    id: 3,
    name: '이커머스플랫폼',
    status: '계약체결',
    users: 100,
    revenue: 300000000,
    expectedRevenue: 300000000,
    source: '전화',
    needs: '고객관리 시스템, 마케팅 자동화',
    memo: '계약 완료, 구축 단계 진행 중',
    contactName: '박철수',
    contactPhone: '010-5555-1234',
    contactEmail: 'park@ecommerce.com',
    createdAt: '2024-02-01',
    files: []
  },
  {
    id: 4,
    name: '핀테크솔루션',
    status: '니즈파악',
    users: 75,
    revenue: 0,
    expectedRevenue: 200000000,
    source: '기타',
    needs: '금융 API 연동, 보안 강화',
    memo: '핀테크 스타트업, 보안 요구사항 높음',
    contactName: '최은영',
    contactPhone: '010-7777-8888',
    contactEmail: 'choi@fintech.com',
    createdAt: '2024-02-10',
    files: []
  },
  {
    id: 5,
    name: '헬스케어테크',
    status: '접촉',
    users: 30,
    revenue: 0,
    expectedRevenue: 80000000,
    source: '웹',
    needs: '환자 관리 시스템, 의료진 협업',
    memo: '의료 분야 특화 요구사항 많음',
    contactName: '정수현',
    contactPhone: '010-3333-4444',
    contactEmail: 'jung@healthcare.com',
    createdAt: '2024-02-15',
    files: []
  }
];

export const contactHistory = [
  {
    id: 1,
    companyId: 1,
    companyName: '테크스타트업',
    contactDate: '2024-02-20 14:30',
    method: '미팅',
    content: '제품 데모 및 견적 협의',
    memo: '긍정적 반응, 다음 주 최종 검토',
    assignee: '김영업',
    files: []
  },
  {
    id: 2,
    companyId: 1,
    companyName: '테크스타트업',
    contactDate: '2024-02-15 10:00',
    method: '전화',
    content: '니즈 파악 및 일정 조율',
    memo: '예산 범위 확인 필요',
    assignee: '김영업',
    files: []
  },
  {
    id: 3,
    companyId: 2,
    companyName: '글로벌코퍼레이션',
    contactDate: '2024-02-18 16:00',
    method: '이메일',
    content: '제안서 발송 및 검토 요청',
    memo: '내부 검토 2주 소요 예정',
    assignee: '박영업',
    files: []
  }
];

export const tasks = [
  {
    id: 1,
    companyId: 1,
    companyName: '테크스타트업',
    content: '최종 견적서 발송',
    memo: '할인 조건 포함하여 발송',
    dueDate: '2024-02-25 09:00',
    reminderDate: '2024-02-24 18:00',
    assignee: '김영업',
    completed: false
  },
  {
    id: 2,
    companyId: 2,
    companyName: '글로벌코퍼레이션',
    content: '의사결정권자 미팅 일정 조율',
    memo: 'C-level 참석 미팅 필요',
    dueDate: '2024-02-28 14:00',
    reminderDate: '2024-02-27 10:00',
    assignee: '박영업',
    completed: false
  },
  {
    id: 3,
    companyId: 3,
    companyName: '이커머스플랫폼',
    content: '프로젝트 킥오프 미팅',
    memo: '계약 체결 완료 후 첫 미팅',
    dueDate: '2024-03-01 10:00',
    reminderDate: '2024-02-29 17:00',
    assignee: '이영업',
    completed: true
  }
];

export const statusOptions = [
  { value: '리드', label: '리드' },
  { value: '접촉', label: '접촉' },
  { value: '니즈파악', label: '니즈파악' },
  { value: '제안/견적', label: '제안/견적' },
  { value: '검토', label: '검토' },
  { value: '계약체결', label: '계약체결' },
  { value: '실패', label: '실패' },
  { value: '보류', label: '보류' }
];

export const sourceOptions = [
  { value: '웹', label: '웹' },
  { value: '전화', label: '전화' },
  { value: '소개', label: '소개' },
  { value: '기타', label: '기타' }
];

export const contactMethodOptions = [
  { value: '전화', label: '전화' },
  { value: '이메일', label: '이메일' },
  { value: '미팅', label: '미팅' },
  { value: '기타', label: '기타' }
];