import { PrismaClient } from "../src/generated/prisma/client.ts";
import { TaskStatus, UserRole, TaskPriority } from "../src/generated/prisma/enums.ts";

const prisma = new PrismaClient();

async function main() {
  console.log(" Starting seed...");

  // --- Users ---
  const [alice, bob, charlie, diana, eve] = await Promise.all([
    prisma.user.create({
      data: { name: "Alice Johnson", email: "alice@company.com", role: UserRole.MANAGER },
    }),
    prisma.user.create({
      data: { name: "Bob Smith", email: "bob@company.com" },
    }),
    prisma.user.create({
      data: { name: "Charlie Brown", email: "charlie@company.com" },
    }),
    prisma.user.create({
      data: { name: "Diana Prince", email: "diana@company.com", role: UserRole.MANAGER },
    }),
    prisma.user.create({
      data: { name: "Eve Adams", email: "eve@company.com" },
    }),
  ]);

  // --- Teams ---
  const [teamAlpha, teamBeta] = await Promise.all([
    prisma.team.create({
      data: {
        name: "Team Alpha",
        managerId: alice.id,
      },
    }),
    prisma.team.create({
      data: {
        name: "Team Beta",
        managerId: diana.id,
      },
    }),
  ]);

  // --- Team Members ---
  await prisma.teamMember.createMany({
    data: [
      // Team Alpha
      { teamId: teamAlpha.id, userId: bob.id, roleInTeam: "member" },
      { teamId: teamAlpha.id, userId: charlie.id, roleInTeam: "lead" },
      { teamId: teamAlpha.id, userId: alice.id, roleInTeam: "manager" },
      // Team Beta
      { teamId: teamBeta.id, userId: eve.id, roleInTeam: "member" },
      { teamId: teamBeta.id, userId: diana.id, roleInTeam: "manager" },
    ],
  });

  // --- Tasks ---
  const [task1, task2, task3, task4] = await Promise.all([
    prisma.task.create({
      data: {
        title: "Implement Authentication",
        description: "Add JWT-based login flow to the backend.",
        status: TaskStatus.TODO,
        priority: TaskPriority.HIGH,
        teamId: teamAlpha.id,
        createdBy: alice.id,
        assignedTo: bob.id,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      },
    }),
    prisma.task.create({
      data: {
        title: "Setup CI/CD Pipeline",
        description: "Integrate GitHub Actions for automated deployment.",
        status: TaskStatus.IN_PROGRESS,
        priority: TaskPriority.MEDIUM,
        teamId: teamAlpha.id,
        createdBy: charlie.id,
        assignedTo: alice.id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Design Marketing Landing Page",
        description: "Collaborate with the design team for layout approval.",
        status: TaskStatus.TODO,
        priority: TaskPriority.MEDIUM,
        teamId: teamBeta.id,
        createdBy: diana.id,
        assignedTo: eve.id,
      },
    }),
    prisma.task.create({
      data: {
        title: "Implement Notification System",
        description: "Add email and Slack alerts for task updates.",
        status: TaskStatus.BLOCKED,
        priority: TaskPriority.HIGH,
        teamId: teamBeta.id,
        createdBy: eve.id,
      },
    }),
  ]);

  // --- Comments ---
    await prisma.taskComment.createMany({
        data: [
            {
                content: "Let's use Passport.js for authentication.",
                taskId: task1.id,
                userId: bob.id,
            },
            {
                content: "We should add rate limiting middleware too.",
                taskId: task1.id,
                userId: alice.id,
            },
            {
                content: "CI/CD looks good, but add staging tests.",
                taskId: task2.id,
                userId: charlie.id,
            },
            {
                content: "Can we finalize hero section copy today?",
                taskId: task3.id,
                userId: eve.id,
            },
            {
                content: "Blocked due to missing SMTP credentials.",
                taskId: task4.id,
                userId: diana.id,
            },
        ],
    });

  console.log("✅ Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
