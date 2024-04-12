const Participant = require('../models/participant');


// Show all Participant || total Participant
exports.totalParticipant = async (req, res) => {
  try {
      const participants = await Participant.find({}).select();
      const total = participants.length;
      res.json({participants, totalParticipants: total});
    } catch (error) {
      res.status(500).send({ message: 'Failed to retrieve participants.' });
    }

};


exports.approveParticipant = async (req, res) => {
  try {
    const { participantId } = req.params;
    // Update the participant and return the new document
    const participant = await Participant.findByIdAndUpdate(
      participantId, 
      { status: 'approved' }, 
      { new: true, runValidators: true }
    );

    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    // Return both the message and the updated participant data
    res.json({ 
      message: 'Participant approved successfully', 
      participant 
    });
  } catch (error) {
    console.error('Failed to approve participant:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message  // Including the error message can help with debugging
    });
  }
};


exports.declineParticipant = async (req, res) => {
  try {
    const { participantId } = req.params;
    // Update the participant and return the new document
    const participant = await Participant.findByIdAndUpdate(
      participantId, 
      { status: 'declined' }, 
      { new: true, runValidators: true }
    );

    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }

    // Return both the message and the updated participant data
    res.json({ 
      message: 'Participant declined successfully', 
      participant 
    });
  } catch (error) {
    console.error('Failed to decline participant:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: error.message  // Including the error message can help with debugging
    });
  }
};

// Count approved participants
exports.countApprovedParticipants = async (req, res) => {
  try {
    const countApproved = await Participant.countDocuments({ status: 'approved' });
    res.json({ approvedParticipants: countApproved });
  } catch (error) {
    res.status(500).send({ message: 'Failed to count approved participants.', error: error.message });
  }
};

// Count declined participants
exports.countDeclinedParticipants = async (req, res) => {
  try {
    const countDeclined = await Participant.countDocuments({ status: 'declined' });
    res.json({ declinedParticipants: countDeclined });
  } catch (error) {
    res.status(500).send({ message: 'Failed to count declined participants.', error: error.message });
  }
};

