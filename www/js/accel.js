function notifyOnTrembleThreshold(threshold, callback) {
  var accPrev = undefined
  navigator.accelerometer.watchAcceleration(onSuccess, function(e) {
    alert('Error in accelerometer. Can not detect pint slams.', e)
  }, {frequency: 10})

  function onSuccess(acceleration) {
    var acc = [acceleration.x, acceleration.y, acceleration.z]
    if (accPrev) {
      var change = _.zip(accPrev, acc).map(function(vals) {
        return _.reduce(vals, function(sum, num) {
          return sum - num
        })
      })
      var max = Math.max.apply(Math, _.map(change, Math.abs))
      if (max > threshold) {
        callback(Date.now())
      }
    }
    accPrev = acc
  }
}
