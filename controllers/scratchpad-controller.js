import Scratchpad from '../models/scratchpad.js';

const getScratchpads = async (req, res) => {
  try {
    const { userId } = req;

    const scratchpads = await Scratchpad.find({
      userId,
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
      userId,
      title,
    });

    return res.status(201).json({ message: 'Scratchpad created successfully.', success: true, scratchpad });
  } catch (error) {
    console.error('[NEW_SCRATCHPAD]', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getScratchpads, newScratchpad };
