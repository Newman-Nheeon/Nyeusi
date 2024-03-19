const mongoose = require('mongoose');
const Participant = require('../models/participant');
const Vote = require('../models/votes');

exports.submitVote = async (req, res) => {
    const { voterHandle, voterPlatform, participantId } = req.body;
  
    try {
      // Check if the voter has already voted for this participant
      const existingVoteForParticipant = await Vote.findOne({ voterHandle, participant: mongoose.Types.ObjectId(participantId) });
      if (existingVoteForParticipant) {
        return res.status(400).send({ message: 'You have already voted for this participant.' });
      }
  
      // Check the total number of votes cast by this voter
      const totalVotesByVoter = await Vote.countDocuments({ voterHandle });
      if (totalVotesByVoter >= 3) {
        return res.status(400).send({ message: 'You have reached the maximum allowed vote count.' });
      }
  
      // Proceed with voting
      const vote = new Vote({ voterHandle, voterPlatform, participant: participantId });
      await vote.save();
  
      // Optionally increment the participant's total votes (if you're tracking this separately)
      await Participant.findByIdAndUpdate(participantId, { $inc: { totalVotes: 1 } });
  
      res.send({ message: 'Your vote has been cast successfully.' });
    } catch (error) {
      console.error('Error submitting vote:', error);
      res.status(500).send({ message: 'Failed to submit vote.' });
    }
  };
  

exports.showParticipant = async (req, res) => {
    try {
        const participants = await Participant.find({}).select();
        res.json(participants);
      } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve participants.' });
      }

};