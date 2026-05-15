/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Activity {
  id: string;
  type: 'word-match' | 'grammar-builder' | 'truth-seeker' | 'scenario-shuffle';
  name: string;
  content: any;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  emoji: string;
  goal: string;
  activities: Activity[];
  isComingSoon?: boolean;
}

export interface StudentProgress {
  [chapterId: string]: {
    [activityId: string]: boolean;
  };
}

export interface Student {
  name: string;
  batchCode: string;
  joinedAt: number;
  lastActive: number;
  streak: number;
  lastActivityDate?: string; // YYYY-MM-DD
  progress?: StudentProgress;
}

export interface Batch {
  batchCode: string;
  teacherId: string;
  createdAt: number;
}

export interface Teacher {
  teacherCode: string;
  name: string;
  batches: string[];
}
