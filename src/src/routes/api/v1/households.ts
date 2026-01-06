import { Router, Request, Response } from 'express';
import { asyncHandler } from '../../../middleware/errorHandler';
import { authenticateToken, requireHouseholdAccess } from '../../../middleware/auth';
import db from '../../../config/knex';
import logger from '../../../utils/logger';

const router = Router();

// All routes require authentication and household access
router.use(authenticateToken);
router.use(requireHouseholdAccess);

/**
 * GET /api/v1/households/current
 * Get current user's household information
 */
router.get('/current', asyncHandler(async (req: Request, res: Response) => {
  const householdId = req.user!.householdId!;

  // Get household information
  const household = await db('households')
    .where({ id: householdId })
    .first();

  if (!household) {
    return res.status(404).json({ error: 'Household not found' });
  }

  // Count household members
  const memberCount = await db('users')
    .where({ household_id: householdId })
    .count('* as count')
    .first();

  res.json({
    success: true,
    id: household.id,
    name: household.name,
    invitation_code: household.invitation_code,
    member_count: parseInt(memberCount?.count as string || '0'),
    setup_wizard_completed: household.setup_wizard_completed,
    setup_wizard_completed_at: household.setup_wizard_completed_at,
    created_at: household.created_at
  });
}));

/**
 * PATCH /api/v1/households/setup-wizard
 * Mark setup wizard as completed for the current household
 */
router.patch('/setup-wizard', asyncHandler(async (req: Request, res: Response) => {
  const householdId = req.user!.householdId!;

  await db('households')
    .where({ id: householdId })
    .update({
      setup_wizard_completed: true,
      setup_wizard_completed_at: db.fn.now()
    });

  res.json({
    success: true,
    message: 'Setup wizard marked as completed'
  });
}));

/**
 * GET /api/v1/households/members
 * Get all members of the current user's household
 */
router.get('/members', asyncHandler(async (req: Request, res: Response) => {
  const householdId = req.user!.householdId!;

  // Get all household members
  const members = await db('users')
    .where({ household_id: householdId })
    .select('id', 'email', 'first_name', 'last_name', 'role', 'created_at')
    .orderBy('created_at', 'asc');

  res.json({
    success: true,
    data: members.map(member => ({
      id: member.id,
      email: member.email,
      firstName: member.first_name,
      lastName: member.last_name,
      fullName: `${member.first_name} ${member.last_name}`,
      role: member.role,
      joinedAt: member.created_at
    }))
  });
}));

export default router;
