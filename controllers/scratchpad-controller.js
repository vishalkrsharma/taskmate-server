import Scratchpad from '../models/scratchpad.js';
import User from '../models/user.js';

const getScratchpads = async (req, res) => {
  try {
    const { userId } = req;

    const scratchpads = await Scratchpad.find({
      $or: [
        { admin: userId },
        {
          members: {
            $in: [userId],
          },
        },
      ],
    });

    return res.status(200).json({ scratchpads });
  } catch (error) {
    console.error('[GET_SCRATCHPADS]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const newScratchpad = async (req, res) => {
  try {
    const { title } = req.body;
    const { userId } = req;

    const scratchpad = await Scratchpad.create({
      admin: userId,
      title,
    });

    return res.status(201).json({ message: 'Scratchpad created successfully.', success: true, scratchpad });
  } catch (error) {
    console.error('[NEW_SCRATCHPAD]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getScratchpad = async (req, res) => {
  try {
    const { scratchpadId } = req.query;
    const { userId } = req;

    if (!scratchpadId) {
      return res.status(400).json({ error: 'Scratchpad Id is required.' });
    }

    const scratchpad = await Scratchpad.findOne({ _id: scratchpadId });

    if (scratchpad) {
      await scratchpad.populate('members');
      await scratchpad.populate('admin');
    }

    const hasAccess = scratchpad.members.findIndex((member) => member._id.toString() === userId) >= 0 || scratchpad.admin._id.toString() === userId;

    console.log(hasAccess);

    if (!hasAccess) {
      return res.status(401).json({
        error: 'Access denied.',
      });
    }

    return res.status(200).json(scratchpad);
  } catch (error) {
    console.error('[GET_SCRATCHPAD]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addMember = async (req, res) => {
  try {
    const { scratchpadId, memberIds } = req.body;

    if (!scratchpadId) {
      return res.status(400).json({ error: 'Scratchpad Id is required.' });
    }

    if (!Array.isArray(memberIds) || memberIds.length === 0) {
      return res.status(400).json({ error: 'Member Ids are required and should be an array.' });
    }

    const members = await User.find({ _id: { $in: memberIds } });

    if (members.length !== memberIds.length) {
      return res.status(404).json({ error: 'One or more users not found.' });
    }

    const scratchpad = await Scratchpad.findOne({ _id: scratchpadId });

    scratchpad.members.push(memberId);
    await scratchpad.save();

    return res.status(200).json({ message: 'Scratchpad edited successfully.', success: true, scratchpad });
  } catch (error) {
    console.error('[ADD_MEMBER]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getScratchpads, newScratchpad, getScratchpad, addMember };
