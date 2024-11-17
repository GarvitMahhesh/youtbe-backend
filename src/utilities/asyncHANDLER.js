const asynhandle = (reqhandle) => {
    return (req, res, next) => {
      Promise.resolve(reqhandle(req, res, next))
        .catch((err) => next(err)); // Corrected parentheses here
    };
  };
  
  export { asynhandle };
  