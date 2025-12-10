const utilityModel = require('../models/utility.model')
const utilityService = require('../services/utility.service')
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model');

module.exports.registerUtility = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, contact, profession, experience , status} = req.body;

  const isUtilityAlreadyExist = await utilityModel.findOne({ email });
  if (isUtilityAlreadyExist) {
    return res.status(400).json({ message: 'Utility already exist' });
  }

  const hashedPassword = await utilityModel.hashPassword(password);

  const utility = await utilityService.createUtility({
    firstname: fullname.firstname,  
    lastname: fullname.lastname,     
    email,
    password: hashedPassword,
    contact,
    profession,
    experience,
    status
  });

  const token = await utility.generateAuthToken();

  res.status(201).json({ token, utility });
};


module.exports.loginUtility = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const utility = await utilityModel.findOne({ email }).select('+password');

    if (!utility) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await utility.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = await utility.generateAuthToken();
   
    res.cookie('token', token);

    res.status(200).json({ token, utility });
}

module.exports.getUtilityProfile = async (req, res, next) => {
    res.status(200).json({ utility: req.utility });
}

module.exports.logoutUtility = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    await blackListTokenModel.create({ token });

    res.clearCookie('token');

    res.status(200).json({ message: 'Logout successfully' });
}
// controllers/utility.controller.js

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body; // "active" or "inactive"
    const utilityId = req.params.id;

    // Declare first, then check
    const utility = await utilityModel.findByIdAndUpdate(
      utilityId,
      { status },
      { new: true }
    );

    if (!utility) {
      return res.status(404).json({ message: "Utility not found" });
    }

    res.status(200).json({ message: "Status updated", utility });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.updateProfile = async (req, res) => {
    try {
        const { fullname, email, contact, profileImage, profession } = req.body;
        const utilityId = req.utility._id;
        
        const updatedUtility = await utilityModel.findByIdAndUpdate(
            utilityId,
            {
                fullname,
                email,
                contact,
                profileImage,
                profession
            },
            { new: true }
        );
        
        res.status(200).json({ utility: updatedUtility });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
}

