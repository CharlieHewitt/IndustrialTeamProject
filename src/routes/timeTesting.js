const express = require('express');
const router = express.Router();

router.post('/setTimeTarget', (req, res) => {
  const { name, secondsFromNow } = req.body;

  req.app.locals.timers.addTimer(name, secondsFromNow);
  console.log(req.app.locals.timers);
  console.log(req.app.locals.timers.getTimer(name));

  console.log('timer set');
  res.json({
    name: name,
    target: req.app.locals.timers.getTimer(name).target
  });
});

router.post('/pollTimeTarget', (req, res) => {
  const time = req.body.time || Date.now();
  const { name } = req.body;

  const timer = req.app.locals.timers.getTimer(name);

  if (!timer) {
    res.json({ error: 'Timer not defined' });
  }

  const hasPassed = timer.hasTargetTimePassed(time);
  const timeRemaining = timer.timeToTarget(time);

  res.json({ hasPassed, timeRemaining });
});

module.exports = router;
