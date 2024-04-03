const Participant = require('../models/participant');


// Show all Participant || total Participant
exports.totalParticipant = async (req, res) => {
  try {
      const participants = await Participant.find({}).select();
      res.json(participants);
    } catch (error) {
      res.status(500).send({ message: 'Failed to retrieve participants.' });
    }

};


exports.approveParticipant = async (req, res) => {
  try {
    const { participantId } = req.params;
    const participant = await Participant.findByIdAndUpdate(participantId, { status: 'approved' }, { new: true });

    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    res.json({ message: 'Participant approved successfully', participant });
  } catch (error) {
    console.error('Failed to approve participant:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.declineParticipant = async (req, res) => {
  try {
    const { participantId } = req.params;
    const participant = await Participant.findByIdAndUpdate(participantId, { status: 'declined' }, { new: true });

    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    res.json({ message: 'Participant declined successfully', participant });
  } catch (error) {
    console.error('Failed to decline participant:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
