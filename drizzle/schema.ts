import {
  bigserial,
  date,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// 학교 구분: 고등학교 / 대학교 / 대학원
export const educationSchoolType = pgEnum("education_school_type", [
  "high_school", // 고등학교
  "university", // 대학교
  "graduate", // 대학원
]);

// 학위: 학사 / 석사 / 박사
export const educationDegree = pgEnum("education_degree", [
  "bachelor", // 학사
  "master", // 석사
  "doctorate", // 박사
]);

// 학위 상태: 졸업 / 수료
export const educationCompletion = pgEnum("education_completion", [
  "graduated", // 졸업
  "completed", // 수료
]);

// 경력 (Experience) — docs/db/erd.md 참고
export const experiences = pgTable("experiences", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  orgKo: text("org_ko").notNull(),
  orgEn: text("org_en").notNull(),
  roleKo: text("role_ko").notNull(),
  roleEn: text("role_en").notNull(),
  startDate: date("start_date").notNull(), // 입사일
  endDate: date("end_date"), // 퇴사일 (null = 재직 중)
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// 학력 (Education) — docs/db/erd.md 참고
export const education = pgTable("education", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  schoolKo: text("school_ko").notNull(), // 학교명
  schoolEn: text("school_en").notNull(),
  schoolType: educationSchoolType("school_type").notNull(), // 학교 구분
  majorKo: text("major_ko"), // 전공 (고등학교는 null)
  majorEn: text("major_en"),
  degree: educationDegree("degree"), // 학위 (고등학교는 null)
  startDate: date("start_date").notNull(), // 입학일자
  endDate: date("end_date"), // 졸업일자 (null = 재학 중)
  completionStatus: educationCompletion("completion_status"), // 졸업 / 수료
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Experience = typeof experiences.$inferSelect;
export type Education = typeof education.$inferSelect;
