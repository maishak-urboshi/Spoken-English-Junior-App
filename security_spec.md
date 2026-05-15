# Security Specification - Spoken English Journey (SEJ)

## Data Invariants
1. **Teacher Identity**: A teacher is identified by a unique `teacherCode`.
2. **Batch Ownership**: Every batch must be linked to a valid `teacherId`.
3. **Student Belonging**: A student must be nested under a specific `batchCode`.
4. **Progress Integrity**: Progress records must accurately reflect a student's completion of activities.

## Access Control Matrix
| Resource | Read | Create | Update | Delete |
| :--- | :--- | :--- | :--- | :--- |
| `teachers/{teacherCode}` | Anyone (with unique code) | Anyone | Admin / Self (only batches) | Deny |
| `batches/{batchCode}` | Anyone (with unique code) | Connected Teacher | Admin | Deny |
| `batches/{batchCode}/students/{studentId}` | Anyone (in batch) | Anyone | Self (stats only) | Deny |
| `batches/{batchCode}/students/{studentId}/progress/{chapterId}` | Anyone (in batch) | Student | Student | Deny |

## The "Dirty Dozen" (Attack Payloads)
1. **ID Spoofing**: Attempting to create a teacher with a malicious ID (e.g., `../../hack`).
2. **Batch Hijacking**: Attempting to update a batch's `teacherId` to take ownership.
3. **Ghost Student**: Creating a student record in a batch that doesn't exist.
4. **Illegal Field Injection**: Adding an `isAdmin: true` field to a student document.
5. **Progress Erasure**: Overwriting progress with `false` values after completion.
6. **Relational Break**: Creating student progress for a student that doesn't exist.
7. **Mass Scraping**: Trying to list all teachers in the system.
8. **Identity Theft**: Updating another student's name.
9. **Streak Inflation**: Directly setting a streak to `9999`.
10. **Timestamp Faking**: Providing a client-side `lastActive` timestamp from 10 years in the future.
11. **Batch Code Tampering**: Moving a student to a different batch.
12. **Unauthorized Deletion**: A student trying to delete their batch or teacher record.

## Test Runner (Firestore Rules Test)
The rules will be verified against these invariants.
